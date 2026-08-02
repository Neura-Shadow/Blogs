import os
import shutil
from pathlib import Path

from playwright.sync_api import Page, expect, sync_playwright


BASE_URL = os.environ.get("PORTFOLIO_BASE_URL", "http://127.0.0.1:3018").rstrip("/")
SCREENSHOT = Path(__file__).resolve().parents[1] / "public" / "images" / "screenshots" / "home-hero.png"

HERO = {
    "en": {
        "title": "Embedded Linux & Distributed Real-Time Systems Developer",
        "capability": "High-Concurrency Go · Cloud-Native Systems · Jetson Edge AI · ROS 2 · UAV Integration · Nuxt",
        "summary": "I build high-concurrency backends and distributed real-time systems, integrating Go services, Nuxt interfaces, Embedded Linux / Jetson edge AI, ROS 2, and UAV telemetry.",
        "nstc_label": "NSTC Applied R&D",
        "nstc_text": "Responsible, within my assigned scope, for overall system architecture development and integration across heterogeneous UAV, USV, and UGV platforms.",
        "research_label": "Independent Computer Vision Research",
        "research_text": "Image-processing research conducted separately from the NSTC projects; related work has been submitted to IEEE Transactions on Multimedia.",
    },
    "zh-TW": {
        "title": "Embedded Linux 與分散式即時系統開發者",
        "capability": "高併發 Go · 雲原生系統 · Jetson 邊緣 AI · ROS 2 · 無人載具整合 · Nuxt",
        "summary": "我建構高併發後端與分散式即時系統，整合 Go 服務、Nuxt 介面、Embedded Linux／Jetson 邊緣 AI、ROS 2 與無人載具遙測。",
        "nstc_label": "國科會應用型研發",
        "nstc_text": "在所負責範圍內，負責異質 UAV／USV／UGV 平台的整體系統架構開發與整合。",
        "research_label": "獨立電腦視覺研究",
        "research_text": "此影像處理研究獨立於國科會計畫，相關成果已投稿至 IEEE Transactions on Multimedia。",
    },
}

CORE_CAPABILITIES = {
    "en": [
        (
            "Distributed Backend & Cloud Systems",
            "High-concurrency services, transactional workflows, event processing, and containerized delivery.",
            ["Go", "PostgreSQL", "Redis", "Event-Driven", "Docker / Kubernetes", "CI/CD"],
        ),
        (
            "Embedded Linux & Edge AI",
            "Camera ingestion, image processing, model conversion, and edge-runtime integration.",
            ["NVIDIA Jetson", "V4L2 / GStreamer", "OpenCV", "ONNX / TensorRT", "Multithreading", "Runtime Profiling"],
        ),
        (
            "ROS 2 & Autonomous Systems",
            "Distributed robotics communication, simulation, vehicle telemetry, and safety-gated navigation.",
            ["ROS 2", "DDS / QoS", "MAVLink / PX4", "Digital Twin", "World Models", "Multi-Agent Systems"],
        ),
        (
            "Full-Stack & Real-Time Interfaces",
            "Bilingual web interfaces, dashboards, telemetry visualization, and real-time communication.",
            ["Nuxt 3 / Vue 3", "TypeScript", "Supabase", "MQTT", "WebRTC / WebSocket", "Dashboard UI"],
        ),
    ],
    "zh-TW": [
        ("分散式後端與雲端系統", "高併發服務、交易流程、事件處理與容器化交付。", ["Go", "PostgreSQL", "Redis", "Event-Driven", "Docker / Kubernetes", "CI/CD"]),
        ("Embedded Linux 與邊緣 AI", "相機擷取、影像處理、模型轉換與邊緣執行環境整合。", ["NVIDIA Jetson", "V4L2 / GStreamer", "OpenCV", "ONNX / TensorRT", "Multithreading", "Runtime Profiling"]),
        ("ROS 2 與自主系統", "分散式機器人通訊、模擬、載具遙測與安全閘門導航。", ["ROS 2", "DDS / QoS", "MAVLink / PX4", "Digital Twin", "World Models", "Multi-Agent Systems"]),
        ("全端與即時介面", "雙語網頁介面、儀表板、遙測視覺化與即時通訊。", ["Nuxt 3 / Vue 3", "TypeScript", "Supabase", "MQTT", "WebRTC / WebSocket", "Dashboard UI"]),
    ],
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
    capability = page.locator('[data-testid="hero-capability-line"]:visible')
    expect(capability).to_be_visible()
    assert capability.get_attribute("aria-label") == copy["capability"]
    expect(page.get_by_text(copy["summary"], exact=True)).to_be_visible()
    expect(page.get_by_role("heading", name=copy["nstc_label"], exact=True)).to_be_visible()
    expect(page.get_by_text(copy["nstc_text"], exact=True)).to_be_visible()
    expect(page.get_by_role("heading", name=copy["research_label"], exact=True)).to_be_visible()
    expect(page.get_by_text(copy["research_text"], exact=True)).to_be_visible()
    expect(page.locator('[data-testid="hero-summary"]')).to_have_count(1)
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


def assert_core_capabilities(page: Page, locale: str, expected_columns: int) -> None:
    heading_text = "Core Capabilities" if locale == "en" else "核心能力"
    heading = page.get_by_role("heading", name=heading_text, exact=True)
    heading.scroll_into_view_if_needed()
    section = heading.locator("xpath=ancestor::section")
    grid = section.locator('[data-testid="core-capabilities-grid"]')
    cards = section.locator('[data-testid="core-capability-card"]')
    expect(cards).to_have_count(4)
    assert grid_columns(grid) == expected_columns, f"Core Capabilities must render {expected_columns} columns"
    expect(section.locator('[data-testid="core-capability-description"]')).to_have_count(4)
    for title, description, chips in CORE_CAPABILITIES[locale]:
        expect(section.get_by_role("heading", name=title, exact=True)).to_be_visible()
        expect(section.get_by_text(description, exact=True)).to_be_visible()
        for chip in chips:
            expect(section.get_by_text(chip, exact=True)).to_be_visible()
    for forbidden in ("Project Applied", "Research Applied", "Current Focus", "Planned Extension"):
        expect(section.get_by_text(forbidden, exact=True)).to_have_count(0)
    clipping = cards.evaluate_all("elements => elements.map(element => ({ horizontal: element.scrollWidth > element.clientWidth, vertical: element.scrollHeight > element.clientHeight }))")
    assert not any(state["horizontal"] or state["vertical"] for state in clipping), f"Core capability text is clipped: {clipping}"
    boxes = cards.evaluate_all("elements => elements.map(element => { const box = element.getBoundingClientRect(); return { top: box.top, bottom: box.bottom, height: box.height }; })")
    assert all(box["height"] <= 360 for box in boxes), f"Core capability card exceeds 360px: {boxes}"
    if expected_columns == 2:
        assert all(boxes[index]["bottom"] <= boxes[index + 2]["top"] for index in range(2)), f"Core capability rows overlap: {boxes}"
    else:
        assert all(boxes[index]["bottom"] <= boxes[index + 1]["top"] for index in range(3)), f"Core capability cards overlap: {boxes}"


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
        callout_lines = desktop.locator('[data-testid="hero-callout-text"]').evaluate_all("elements => elements.map(element => Math.round(element.getBoundingClientRect().height / parseFloat(getComputedStyle(element).lineHeight)))")
        assert all(lines <= 3 for lines in callout_lines), f"Desktop Hero callout exceeds three lines: {callout_lines}"
        hero_copy_height, hero_visual_height = desktop.locator('[data-testid="hero-copy"], [data-testid="hero-visual"]').evaluate_all("elements => elements.map(element => element.getBoundingClientRect().height)")
        assert hero_copy_height <= hero_visual_height + 24, f"Hero copy is materially taller than the Three.js visual: copy={hero_copy_height}, visual={hero_visual_height}"
        assert desktop.get_by_role("link", name="View Projects", exact=True).bounding_box()["y"] < 1000, "Hero CTA is below the desktop fold"
        expect(desktop.locator('[data-testid="three-hero-scene"] canvas')).to_be_visible()
        expect(desktop.locator('[data-testid="three-hero-scene"] .static-pipeline')).to_have_count(0, timeout=15_000)
        hero_canvas = desktop.locator('[data-testid="three-hero-scene"] canvas')
        hero_canvas.hover(position={"x": 80, "y": 120})
        expect(desktop.locator('[data-testid="three-hero-scene"]')).to_have_attribute("data-pointer-active", "true")
        desktop.mouse.move(20, 80)
        expect(desktop.locator('[data-testid="three-hero-scene"]')).to_have_attribute("data-pointer-active", "false")
        expect(desktop.get_by_text("ROS 2 topics · QoS-aware paths", exact=True)).to_be_visible()
        expect(desktop.get_by_text("Dashboard", exact=True)).to_be_visible()
        expect(desktop.get_by_role("link", name="View Projects", exact=True)).to_be_visible()
        assert desktop.locator("html").get_attribute("lang") == "en"

        assert_core_capabilities(desktop, "en", 2)

        desktop.evaluate("window.scrollTo(0, 0)")
        desktop.wait_for_timeout(350)
        SCREENSHOT.parent.mkdir(parents=True, exist_ok=True)
        desktop.screenshot(path=str(SCREENSHOT), full_page=False)

        desktop.get_by_role("button", name="Toggle Language", exact=True).click()
        assert_hero_content(desktop, "zh-TW")
        assert_core_capabilities(desktop, "zh-TW", 2)
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
        expect(desktop.get_by_role("heading", name="Detailed Capability Inventory", exact=True)).to_be_visible()
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
        assert about_order == ["positioning", "nstc", "independent-research", "architecture", "capabilities", "profiling"], f"Unexpected About section order: {about_order}"
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
        assert_core_capabilities(compact_desktop, "en", 2)
        compact_desktop_context.close()

        tablet_context = browser.new_context(viewport={"width": 900, "height": 1000})
        tablet = tablet_context.new_page()
        monitor(tablet, errors)
        tablet.goto(BASE_URL, wait_until="domcontentloaded")
        assert_hero_content(tablet, "en")
        assert_hero_visual_does_not_overlap(tablet)
        assert_core_capabilities(tablet, "en", 2)
        tablet_context.close()

        mobile_context = browser.new_context(viewport={"width": 390, "height": 844})
        mobile = mobile_context.new_page()
        monitor(mobile, errors)
        mobile.goto(BASE_URL, wait_until="domcontentloaded")
        assert_hero_content(mobile, "en")
        assert_hero_visual_does_not_overlap(mobile)
        assert_core_capabilities(mobile, "en", 1)
        project_cta = mobile.get_by_role("link", name="View Projects", exact=True)
        resume_cta = mobile.get_by_role("link", name="Download Resume", exact=True)
        expect(project_cta).to_be_visible()
        expect(resume_cta).to_be_visible()
        project_box = project_cta.bounding_box()
        resume_box = resume_cta.bounding_box()
        assert project_box and resume_box and project_box["x"] + project_box["width"] <= resume_box["x"], "Mobile Hero CTAs overlap or clip"
        assert resume_cta.get_attribute("href") == "/resume.pdf"
        with mobile.expect_download() as download_info:
            resume_cta.click()
        assert download_info.value.suggested_filename, "Resume CTA did not initiate a download"
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
        "Edge portfolio browser verification passed: concise desktop/tablet/mobile Hero and four-card Core Capabilities, live Three.js, "
        "reduced-motion, no-WebGL, and renderer-failure fallbacks, EN/ZH scene labels and capabilities, separated NSTC/IEEE research, About architecture/detailed capabilities/ROS 2/QoS/profiling, "
        "Edge AI filtering, project and resume CTAs, no raw keys, clipping, overflow, console/page/request/HTTP errors, "
        f"and clean Hero screenshot at {SCREENSHOT}."
    )


if __name__ == "__main__":
    main()
