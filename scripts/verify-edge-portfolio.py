import os
import shutil
from pathlib import Path

from playwright.sync_api import Page, expect, sync_playwright


BASE_URL = os.environ.get("PORTFOLIO_BASE_URL", "http://127.0.0.1:3018").rstrip("/")
SCREENSHOT = Path(__file__).resolve().parents[1] / "public" / "images" / "screenshots" / "home-hero.png"

HERO = {
    "en": {
        "title": "Embedded Linux & Distributed Real-Time Systems Developer",
        "capability": "High-Concurrency Go Backend · Cloud-Native Architecture · Nuxt Full-Stack · NVIDIA Jetson / Edge AI · ROS 2 · UAV Systems · Computer Vision",
        "paragraphs": [
            "I build high-concurrency distributed and real-time systems that connect Go backend services, Nuxt full-stack interfaces, Embedded Linux edge devices, ROS 2 communication, and AI inference pipelines.",
            "In implementation-oriented NSTC applied R&D projects, I have been responsible, within my assigned scope, for architecture development and system integration across heterogeneous UAV, USV, and UGV platforms. My work includes operator interfaces, telemetry backends, MAVLink–MQTT communication, WebRTC video paths, and containerized services.",
            "My current engineering focus includes camera ingestion with V4L2 and GStreamer, OpenCV processing, PyTorch-to-ONNX conversion, TensorRT edge inference, ROS 2 node-based pipelines, and MQTT or socket telemetry integration.",
            "Separately from these NSTC projects, I have conducted independent image-processing and computer-vision research, with related work submitted to IEEE Transactions on Multimedia.",
        ],
    },
    "zh-TW": {
        "title": "Embedded Linux 與分散式即時系統開發者",
        "capability": "高併發 Go 後端 · 雲原生架構 · Nuxt 全端 · NVIDIA Jetson / Edge AI · ROS 2 · 無人載具系統 · 電腦視覺",
        "paragraphs": [
            "我專注於建構高併發、分散式與即時系統，整合 Go 後端服務、Nuxt 全端介面、Embedded Linux 邊緣裝置、ROS 2 通訊與 AI 推論管線。",
            "在偏實作與系統整合的國科會應用型研發計畫中，我在所負責的範圍內承擔異質 UAV、USV 與 UGV 系統的架構開發與整合，涵蓋操作介面、遙測後端、MAVLink–MQTT 通訊、WebRTC 視訊流程與容器化服務。",
            "目前的工程方向包含 V4L2 與 GStreamer 相機擷取、OpenCV 影像處理、PyTorch 轉 ONNX、TensorRT 邊緣推論、ROS 2 節點化管線，以及 MQTT 或 Socket 遙測整合。",
            "此外，我另有獨立於上述國科會計畫的影像處理與電腦視覺研究，相關成果已投稿至 IEEE Transactions on Multimedia。",
        ],
    },
}


def browser_executable() -> str | None:
    candidates = [
        os.environ.get("PLAYWRIGHT_CHROME_PATH"),
        shutil.which("google-chrome"),
        shutil.which("chromium"),
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    ]
    return next((candidate for candidate in candidates if candidate and Path(candidate).exists()), None)


def monitor(page: Page, errors: dict[str, list[str]], allowed_console_errors: tuple[str, ...] = ()) -> None:
    page.on(
        "console",
        lambda message: errors["console"].append(f"{page.url}: {message.text}")
        if message.type == "error" and not any(fragment in message.text for fragment in allowed_console_errors)
        else None,
    )
    page.on("pageerror", lambda error: errors["page"].append(f"{page.url}: {error}"))
    page.on("requestfailed", lambda request: errors["request"].append(f"{request.method} {request.url}"))
    page.on("response", lambda response: errors["response"].append(f"{response.status} {response.url}") if response.status >= 400 else None)


def assert_no_raw_keys(page: Page) -> None:
    body = page.locator("body").inner_text()
    prefixes = ("hero.", "skills.", "about.", "projects.", "three.")
    leaked = [prefix for prefix in prefixes if prefix in body]
    assert not leaked, f"Raw i18n keys are visible: {leaked}"


def grid_columns(locator) -> int:
    value = locator.evaluate("element => getComputedStyle(element).gridTemplateColumns")
    return len(value.split())


def assert_hero_content(page: Page, locale: str) -> None:
    copy = HERO[locale]
    expect(page.get_by_role("heading", name=copy["title"], exact=True)).to_be_visible()
    expect(page.get_by_text(copy["capability"], exact=True)).to_be_visible()
    for paragraph in copy["paragraphs"]:
        expect(page.get_by_text(paragraph, exact=True)).to_be_visible()
    expect(page.get_by_role("link", name="View Projects" if locale == "en" else "瀏覽作品集", exact=True)).to_be_visible()


def assert_hero_visual_does_not_overlap(page: Page) -> None:
    separated = page.evaluate(
        """
        () => {
          const copy = document.querySelector('[data-testid="hero-copy"]')?.getBoundingClientRect();
          const visual = document.querySelector('[data-testid="hero-visual"]')?.getBoundingClientRect();
          if (!copy || !visual) return false;
          return copy.right <= visual.left || visual.right <= copy.left || copy.bottom <= visual.top || visual.bottom <= copy.top;
        }
        """
    )
    assert separated, "Three.js Hero visual overlaps the Hero copy"


def main() -> None:
    errors = {"console": [], "page": [], "request": [], "response": []}
    launch_options: dict[str, object] = {
        "headless": True,
        "args": ["--enable-webgl", "--ignore-gpu-blocklist", "--use-angle=swiftshader"],
    }
    executable = browser_executable()
    if executable:
        launch_options["executable_path"] = executable

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(**launch_options)
        expect.set_options(timeout=30_000)

        desktop_context = browser.new_context(viewport={"width": 1440, "height": 1000})
        desktop = desktop_context.new_page()
        desktop.set_default_navigation_timeout(90_000)
        monitor(desktop, errors)
        desktop.goto(BASE_URL, wait_until="domcontentloaded")

        assert_hero_content(desktop, "en")
        assert_hero_visual_does_not_overlap(desktop)
        expect(desktop.locator('[data-testid="three-hero-scene"] canvas')).to_be_visible()
        expect(desktop.locator('[data-testid="three-hero-scene"] .static-pipeline')).to_have_count(0, timeout=15_000)
        expect(desktop.get_by_text("ROS 2 topics · QoS-aware paths", exact=True)).to_be_visible()
        expect(desktop.get_by_text("Dashboard", exact=True)).to_be_visible()
        expect(desktop.get_by_role("link", name="View Projects", exact=True)).to_be_visible()
        assert desktop.locator("html").get_attribute("lang") == "en"

        skill_heading = desktop.get_by_role("heading", name="Capability Matrix", exact=True)
        skill_heading.scroll_into_view_if_needed()
        skill_section = skill_heading.locator("xpath=ancestor::section")
        skill_grid = skill_section.locator("article").first.locator("xpath=parent::*")
        expect(skill_section.locator("article")).to_have_count(6)
        assert grid_columns(skill_grid) == 3, "Capability Matrix must render three columns on desktop"
        expect(skill_section.get_by_text("Expert", exact=True)).to_have_count(0)
        expect(skill_section.get_by_text("Current Focus", exact=True).first).to_be_visible()

        desktop.evaluate("window.scrollTo(0, 0)")
        desktop.wait_for_timeout(350)
        SCREENSHOT.parent.mkdir(parents=True, exist_ok=True)
        desktop.screenshot(path=str(SCREENSHOT), full_page=False)

        desktop.get_by_role("button", name="Toggle Language", exact=True).click()
        assert_hero_content(desktop, "zh-TW")
        expect(desktop.get_by_text("儀表板整合", exact=True).first).to_be_visible()
        expect(desktop.get_by_text("分散式邊緣管線", exact=True)).to_be_visible()
        assert desktop.locator("html").get_attribute("lang") == "zh-TW"
        assert_no_raw_keys(desktop)
        desktop.get_by_role("button", name="Toggle Language", exact=True).click()

        desktop.goto(f"{BASE_URL}/about", wait_until="domcontentloaded")
        expect(desktop.get_by_role("heading", name="Embedded Linux & Distributed Real-Time Systems", exact=True)).to_be_visible()
        expect(desktop.get_by_role("heading", name="NSTC Applied R&D & System Integration", exact=True)).to_be_visible()
        expect(desktop.get_by_role("heading", name="Independent Image-Processing Research — IEEE TMM Submission", exact=True)).to_be_visible()
        expect(desktop.get_by_text("This image-processing research was conducted independently and is not derived from the NSTC projects described above.", exact=True)).to_be_visible()
        expect(desktop.locator('[data-research-kind="applied-rd"]')).to_have_count(1)
        expect(desktop.locator('[data-research-kind="independent-research"]')).to_have_count(1)
        expect(desktop.get_by_role("heading", name="Edge vision reference pipeline", exact=True)).to_be_visible()
        expect(desktop.get_by_role("heading", name="Capability Matrix", exact=True)).to_be_visible()
        expect(desktop.get_by_text("GStreamer / V4L2 Capture", exact=True)).to_be_visible()
        expect(desktop.get_by_text("ONNX / TensorRT Inference Node", exact=True)).to_be_visible()
        expect(desktop.get_by_role("heading", name="ROS 2 responsibility map", exact=True)).to_be_visible()
        expect(desktop.get_by_text("Lifecycle Node", exact=True).first).to_be_visible()
        expect(desktop.get_by_role("heading", name="Typical QoS configuration examples", exact=True)).to_be_visible()
        expect(desktop.get_by_text("Best Effort", exact=True)).to_be_visible()
        expect(desktop.get_by_text("10", exact=True)).to_be_visible()
        expect(desktop.get_by_role("heading", name="Performance profiling capability", exact=True)).to_be_visible()
        expect(desktop.get_by_text("No benchmark values are claimed without measured evidence.", exact=True)).to_be_visible()
        about_order = desktop.locator("[data-about-section]").evaluate_all("elements => elements.map(element => element.dataset.aboutSection)")
        assert about_order == ["positioning", "nstc", "independent-research", "architecture", "capability-matrix", "profiling"], f"Unexpected About section order: {about_order}"
        assert_no_raw_keys(desktop)

        desktop.get_by_role("button", name="Toggle Language", exact=True).click()
        expect(desktop.get_by_role("heading", name="Embedded Linux 與分散式即時系統", exact=True)).to_be_visible()
        expect(desktop.get_by_role("heading", name="國科會應用型研發與系統整合", exact=True)).to_be_visible()
        expect(desktop.get_by_role("heading", name="獨立影像處理研究 — IEEE TMM 投稿", exact=True)).to_be_visible()
        expect(desktop.get_by_text("此影像處理研究為獨立研究，並非上述國科會計畫的衍生成果。", exact=True)).to_be_visible()
        expect(desktop.get_by_text("保留最新資料", exact=True).first).to_be_visible()
        expect(desktop.get_by_text("生命週期節點", exact=True).first).to_be_visible()
        expect(desktop.get_by_text("裝置 Runtime 效能剖析", exact=True).first).to_be_visible()
        expect(desktop.get_by_text("Actions／生命週期節點", exact=True).first).to_be_visible()
        assert desktop.locator("html").get_attribute("lang") == "zh-TW"
        assert_no_raw_keys(desktop)

        desktop.goto(f"{BASE_URL}/projects", wait_until="domcontentloaded")
        desktop.get_by_role("button", name="邊緣 AI", exact=True).click()
        expect(desktop.get_by_role("heading", name="基於 Diffusion Transformer 的視訊異常偵測", exact=True)).to_be_visible()
        desktop.get_by_role("button", name="Toggle Language", exact=True).click()
        desktop.get_by_role("button", name="Edge AI", exact=True).click()
        expect(desktop.get_by_role("heading", name="Diffusion Transformer Video Anomaly Detection", exact=True)).to_be_visible()
        expect(desktop.get_by_role("heading", name="Real-time Face Recognition Prototype", exact=True)).to_be_visible()
        expect(desktop.get_by_role("heading", name="Jetson Edge AI Vision & ROS 2 System", exact=True)).to_have_count(0)
        assert_no_raw_keys(desktop)

        compact_desktop_context = browser.new_context(viewport={"width": 1100, "height": 1000})
        compact_desktop = compact_desktop_context.new_page()
        monitor(compact_desktop, errors)
        compact_desktop.goto(BASE_URL, wait_until="domcontentloaded")
        assert_hero_content(compact_desktop, "en")
        assert_hero_visual_does_not_overlap(compact_desktop)
        compact_heading = compact_desktop.get_by_role("heading", name="Capability Matrix", exact=True)
        compact_heading.scroll_into_view_if_needed()
        compact_grid = compact_heading.locator("xpath=ancestor::section").locator("article").first.locator("xpath=parent::*")
        assert grid_columns(compact_grid) == 3, "Capability Matrix must render three columns on compact desktop"
        compact_desktop_context.close()

        tablet_context = browser.new_context(viewport={"width": 900, "height": 1000})
        tablet = tablet_context.new_page()
        monitor(tablet, errors)
        tablet.goto(BASE_URL, wait_until="domcontentloaded")
        assert_hero_content(tablet, "en")
        assert_hero_visual_does_not_overlap(tablet)
        tablet_skill_heading = tablet.get_by_role("heading", name="Capability Matrix", exact=True)
        tablet_skill_heading.scroll_into_view_if_needed()
        tablet_grid = tablet_skill_heading.locator("xpath=ancestor::section").locator("article").first.locator("xpath=parent::*")
        assert grid_columns(tablet_grid) == 2, "Capability Matrix must render two columns on tablet"
        tablet_context.close()

        mobile_context = browser.new_context(viewport={"width": 390, "height": 844})
        mobile = mobile_context.new_page()
        monitor(mobile, errors)
        mobile.goto(BASE_URL, wait_until="domcontentloaded")
        assert_hero_content(mobile, "en")
        assert_hero_visual_does_not_overlap(mobile)
        mobile_skill_heading = mobile.get_by_role("heading", name="Capability Matrix", exact=True)
        mobile_skill_heading.scroll_into_view_if_needed()
        mobile_grid = mobile_skill_heading.locator("xpath=ancestor::section").locator("article").first.locator("xpath=parent::*")
        assert grid_columns(mobile_grid) == 1, "Capability Matrix must render one column on mobile"
        assert not mobile.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth"), "Home has horizontal overflow at 390px"
        assert_no_raw_keys(mobile)
        mobile_context.close()

        reduced_context = browser.new_context(viewport={"width": 1280, "height": 900}, reduced_motion="reduce")
        reduced = reduced_context.new_page()
        monitor(reduced, errors)
        reduced.goto(BASE_URL, wait_until="domcontentloaded")
        expect(reduced.locator('[data-testid="three-hero-scene"] .static-pipeline')).to_be_visible()
        reduced_context.close()

        no_webgl_context = browser.new_context(viewport={"width": 1280, "height": 900})
        no_webgl_context.add_init_script(
            """
            Object.defineProperty(window, 'WebGLRenderingContext', { value: undefined, configurable: true });
            const original = HTMLCanvasElement.prototype.getContext;
            HTMLCanvasElement.prototype.getContext = function(type, ...args) {
              if (String(type).startsWith('webgl')) return null;
              return original.call(this, type, ...args);
            };
            """
        )
        no_webgl = no_webgl_context.new_page()
        monitor(no_webgl, errors)
        no_webgl.goto(BASE_URL, wait_until="domcontentloaded")
        expect(no_webgl.locator('[data-testid="three-hero-scene"] .static-pipeline')).to_be_visible()
        no_webgl_context.close()

        renderer_failure_context = browser.new_context(viewport={"width": 1280, "height": 900})
        renderer_failure_context.add_init_script(
            """
            const original = HTMLCanvasElement.prototype.getContext;
            HTMLCanvasElement.prototype.getContext = function(type, ...args) {
              if (String(type).startsWith('webgl') && this.closest('[data-testid="three-hero-scene"], [data-testid="three-profile-orb"]')) return null;
              return original.call(this, type, ...args);
            };
            """
        )
        renderer_failure = renderer_failure_context.new_page()
        monitor(renderer_failure, errors, ("THREE.WebGLRenderer: Error creating WebGL context.",))
        renderer_failure.goto(BASE_URL, wait_until="domcontentloaded")
        expect(renderer_failure.locator('[data-testid="three-hero-scene"] .static-pipeline')).to_be_visible()
        renderer_failure.goto(f"{BASE_URL}/about", wait_until="domcontentloaded")
        expect(renderer_failure.locator('[data-testid="three-profile-orb"] .profile-fallback-orb')).to_be_visible()
        renderer_failure_context.close()
        desktop_context.close()

        cta_context = browser.new_context(viewport={"width": 1440, "height": 900})
        cta_context.add_init_script(
            """
            window.__activeAnimationFrames = new Set();
            const nativeRequestAnimationFrame = window.requestAnimationFrame.bind(window);
            const nativeCancelAnimationFrame = window.cancelAnimationFrame.bind(window);
            window.requestAnimationFrame = callback => {
              let id = 0;
              id = nativeRequestAnimationFrame(time => {
                window.__activeAnimationFrames.delete(id);
                callback(time);
              });
              window.__activeAnimationFrames.add(id);
              return id;
            };
            window.cancelAnimationFrame = id => {
              window.__activeAnimationFrames.delete(id);
              nativeCancelAnimationFrame(id);
            };
            """
        )
        cta = cta_context.new_page()
        monitor(cta, errors)
        cta.goto(BASE_URL, wait_until="domcontentloaded")
        expect(cta.locator('[data-testid="three-hero-scene"]')).to_be_visible()
        cta.wait_for_timeout(500)
        assert cta.evaluate("window.__activeAnimationFrames.size") > 0, "Hero scene did not schedule animation frames"
        cta.get_by_role("link", name="View Projects", exact=True).click()
        cta.wait_for_url("**/projects")
        expect(cta.get_by_role("heading", name="Scalable Railway Ticketing Platform", exact=True)).to_be_visible()
        expect(cta.locator('[data-testid="three-hero-scene"]')).to_have_count(0)
        cta.wait_for_timeout(500)
        assert cta.evaluate("window.__activeAnimationFrames.size") == 0, "Animation frame remained active after Hero route unmount"

        browser.close()

    failures = [f"{label}: {values}" for label, values in errors.items() if values]
    if failures:
        raise AssertionError("\n".join(failures))

    print(
        "Edge portfolio browser verification passed: desktop/tablet/mobile Hero and matrix, live Three.js, "
        "reduced-motion, no-WebGL, and renderer-failure fallbacks, EN/ZH scene labels and capabilities, separated NSTC/IEEE research, About architecture/matrix/ROS 2/QoS/profiling, "
        "Edge AI filtering, CTA stacking, no raw keys, no overflow, no console/page/request/HTTP errors, "
        f"and clean Hero screenshot at {SCREENSHOT}."
    )


if __name__ == "__main__":
    main()
