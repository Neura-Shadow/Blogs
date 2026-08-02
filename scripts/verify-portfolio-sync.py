import os
import shutil
from pathlib import Path
from urllib.parse import urlparse

from playwright.sync_api import Page, expect, sync_playwright


BASE_URL = os.environ.get("PORTFOLIO_BASE_URL", "http://127.0.0.1:3000").rstrip("/")
APP_BASE_PATH = urlparse(BASE_URL).path.rstrip("/")
SCREENSHOT = Path(__file__).resolve().parents[1] / "public" / "images" / "screenshots" / "projects-showcase.png"
PUBLIC_REPOSITORIES = [
    "https://github.com/Neura-Shadow/Scalable-Railway-Ticketing-Platform",
    "https://github.com/Neura-Shadow/GWM-UAV-Navigation-Sparse-Rewards",
    "https://github.com/Neura-Shadow/Scalable-E-Commerce-Platform",
    "https://github.com/Neura-Shadow/Analysis_website",
    "https://github.com/Neura-Shadow/Face_Detect_Realtime",
]
PROJECT_TITLES = {
    "scalable-railway-ticketing-platform": "Scalable Railway Ticketing Platform",
    "gwm-uav-navigation-sparse-rewards": "World-Model-Guided Digital-Twin UAV Navigation Research Framework",
    "scalable-ecommerce-platform": "Scalable E-Commerce Backend Platform",
    "heterogeneous-uav-swarm-system": "Heterogeneous UAV/USV/UGV Swarm Collaborative System",
    "thesis-code": "Diffusion Transformer Video Anomaly Detection",
    "analysis-website": "Data Analysis Website Archive",
    "face-detect-realtime": "Real-time Face Recognition Prototype",
}


def browser_executable() -> str | None:
    override = os.environ.get("PLAYWRIGHT_CHROME_PATH")
    candidates = [
        override,
        shutil.which("google-chrome"),
        shutil.which("chromium"),
        shutil.which("chromium-browser"),
        shutil.which("chrome"),
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    ]
    return next((candidate for candidate in candidates if candidate and Path(candidate).exists()), None)


def assert_no_raw_i18n_keys(page: Page) -> None:
    text = page.locator("body").inner_text()
    forbidden_prefixes = ("projects.", "hero.", "nav.", "blog.", "about.", "common.")
    leaked = [prefix for prefix in forbidden_prefixes if prefix in text]
    assert not leaked, f"Raw i18n keys are visible: {leaked}"


def app_path(path: str) -> str:
    normalized = path if path.startswith("/") else f"/{path}"
    return f"{APP_BASE_PATH}{normalized}"


def click_project(page: Page, slug: str) -> None:
    page.locator(f'a[href="{app_path(f"/projects/{slug}")}"]').first.click()


def assert_real_cover(image, label: str) -> None:
    image.scroll_into_view_if_needed()
    expect(image).to_be_visible()
    image.evaluate("async element => { try { await element.decode() } catch {} }")
    state = image.evaluate(
        "element => ({ src: element.getAttribute('src'), currentSrc: element.currentSrc, "
        "naturalWidth: element.naturalWidth, naturalHeight: element.naturalHeight, complete: element.complete })"
    )
    assert state["complete"], f"Cover did not finish loading ({label}): {state}"
    assert state["naturalWidth"] > 0, f"Cover has no decoded width ({label}): {state}"
    assert state["naturalHeight"] > 0, f"Cover has no decoded height ({label}): {state}"
    assert "project-placeholder" not in (state["src"] or ""), f"Unexpected placeholder cover ({label}): {state}"
    assert app_path("/images/projects/") in state["currentSrc"], f"Cover escaped the app base path ({label}): {state}"


def arm_not_found_observer(page: Page) -> None:
    page.evaluate(
        """
        window.__projectNotFoundSeen = false;
        window.__projectNotFoundObserver?.disconnect();
        window.__projectNotFoundObserver = new MutationObserver(() => {
          if (document.body?.innerText.includes('Project Not Found')) {
            window.__projectNotFoundSeen = true;
          }
        });
        window.__projectNotFoundObserver.observe(document.body, {
          subtree: true,
          childList: true,
          characterData: true
        });
        """
    )


def assert_no_not_found_flash(page: Page, context: str) -> None:
    assert not page.evaluate("window.__projectNotFoundSeen"), f"Project Not Found flashed during {context}"


def main() -> None:
    console_errors: list[str] = []
    page_errors: list[str] = []
    failed_requests: list[str] = []
    bad_responses: list[str] = []

    with sync_playwright() as playwright:
        launch_options: dict[str, object] = {
            "headless": True,
            "args": ["--enable-webgl", "--ignore-gpu-blocklist", "--use-angle=swiftshader"],
        }
        executable = browser_executable()
        if executable:
            launch_options["executable_path"] = executable

        browser = playwright.chromium.launch(**launch_options)
        context = browser.new_context(viewport={"width": 1440, "height": 1000})
        expect.set_options(timeout=30_000)

        def monitor_page(browser_page: Page) -> None:
            browser_page.set_default_navigation_timeout(90_000)
            browser_page.on(
                "console",
                lambda message: console_errors.append(f"{browser_page.url}: {message.text}")
                if message.type == "error"
                else None,
            )
            browser_page.on(
                "pageerror",
                lambda error: page_errors.append(
                    f"{browser_page.url}: {getattr(error, 'stack', None) or str(error)}"
                ),
            )
            browser_page.on(
                "requestfailed",
                lambda request: failed_requests.append(f"{request.method} {request.url}"),
            )
            browser_page.on(
                "response",
                lambda response: bad_responses.append(f"{response.status} {response.url}")
                if response.status >= 400
                else None,
            )

        context.on("page", monitor_page)
        page = context.new_page()

        health = context.request.get(f"{BASE_URL}/api/cms/health")
        health_data = health.json()
        assert health.ok and health_data["mode"] == "mock", "UI suite must run in Mock Mode"
        if os.environ.get("EXPECT_UNCONFIGURED_FALLBACK") == "1":
            assert health_data["env"] == {
                "publicConfigured": False,
                "serverConfigured": False,
            }, f"Expected missing-env fallback, received: {health_data['env']}"

        # Homepage featured order and client-side project navigation.
        page.goto(BASE_URL, wait_until="domcontentloaded")
        expect(page.get_by_role("heading", name="Scalable Railway Ticketing Platform")).to_be_visible()
        expect(page.get_by_role("heading", name="World-Model-Guided Digital-Twin UAV Navigation Research Framework")).to_be_visible()
        expect(page.get_by_role("heading", name="Scalable E-Commerce Backend Platform")).to_be_visible()
        page.wait_for_timeout(1500)
        arm_not_found_observer(page)
        click_project(page, "scalable-railway-ticketing-platform")
        expect(page.get_by_role("heading", name="Scalable Railway Ticketing Platform", exact=True)).to_be_visible()
        expect(page.get_by_role("heading", name="Current Outcomes")).to_be_visible()
        assert_no_not_found_flash(page, "homepage-to-detail navigation")
        assert_no_raw_i18n_keys(page)

        # Same-component detail-to-detail transition is the regression seam for the former flash.
        arm_not_found_observer(page)
        page.evaluate(
            """
            const target = '/projects/thesis-code';
            const router = window.$nuxt?.$router;
            if (router) {
              void router.push(target);
            } else {
              history.pushState({}, '', target);
              window.dispatchEvent(new PopStateEvent('popstate'));
            }
            """
        )
        page.wait_for_url("**/projects/thesis-code")
        expect(page.get_by_role("heading", name="Diffusion Transformer Video Anomaly Detection", exact=True)).to_be_visible()
        assert_no_not_found_flash(page, "detail-to-detail navigation")

        page.get_by_role("link", name="Projects", exact=True).click()
        expect(page.get_by_role("heading", name="Scalable Railway Ticketing Platform")).to_be_visible()

        # Locale switch, raw-key guard, covers, filters, and search.
        page.get_by_role("button", name="Toggle Language").click()
        expect(page.get_by_role("heading", name="可擴展鐵路票務平台")).to_be_visible()
        assert_no_raw_i18n_keys(page)
        page.get_by_role("button", name="Toggle Language").click()
        expect(page.get_by_role("heading", name="Scalable Railway Ticketing Platform")).to_be_visible()

        expected_cover_fragments = [
            "scalable-railway-ticketing-platform.webp",
            "gwm-uav-navigation-sparse-rewards.webp",
            "scalable-ecommerce-platform.webp",
            "heterogeneous-uav-swarm-system.webp",
            "thesis-code.webp",
            "analysis-website.webp",
            "face-detect-realtime.webp",
        ]
        for fragment in expected_cover_fragments:
            image = page.locator(f'img[src*="{fragment}"]').first
            assert_real_cover(image, fragment)

        page.get_by_role("button", name="UAV Systems").click()
        expect(page.get_by_role("heading", name="Heterogeneous UAV/USV/UGV Swarm Collaborative System")).to_be_visible()
        page.get_by_role("button", name="Legacy / Archive").click()
        expect(page.get_by_role("heading", name="Real-time Face Recognition Prototype")).to_be_visible()
        expect(page.get_by_role("heading", name="Data Analysis Website Archive")).to_be_visible()
        expect(page.get_by_role("heading", name="Scalable Railway Ticketing Platform")).to_be_hidden()

        page.get_by_role("button", name="All", exact=True).click()
        search = page.get_by_placeholder("Search projects by tag or name...")
        search.fill("Railway")
        expect(page.get_by_role("heading", name="Scalable Railway Ticketing Platform")).to_be_visible()
        expect(page.get_by_role("heading", name="World-Model-Guided Digital-Twin UAV Navigation Research Framework")).to_be_hidden()
        search.fill("")
        expect(page.get_by_text("Neura-Shadow Portfolio CMS", exact=True)).to_have_count(0)

        card_covers = page.locator(f'a[href^="{app_path("/projects/")}"] img')
        assert card_covers.count() == len(PROJECT_TITLES), "Every public project must render exactly one card cover"
        cover_sources = card_covers.evaluate_all("images => images.map(image => image.getAttribute('src'))")
        assert len(set(cover_sources)) == len(PROJECT_TITLES), f"Project covers are not unique: {cover_sources}"
        for index in range(card_covers.count()):
            assert_real_cover(card_covers.nth(index), f"catalog card {index + 1}")

        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(300)
        SCREENSHOT.parent.mkdir(parents=True, exist_ok=True)
        page.screenshot(path=str(SCREENSHOT), full_page=True)

        # Every catalog card must perform a flash-free client-side navigation.
        for slug, title in PROJECT_TITLES.items():
            card_page = context.new_page()
            card_page.goto(f"{BASE_URL}/projects", wait_until="domcontentloaded")
            expect(card_page.get_by_placeholder("Search projects by tag or name...")).to_be_visible()
            arm_not_found_observer(card_page)
            click_project(card_page, slug)
            expect(card_page.get_by_role("heading", name=title, exact=True)).to_be_visible()
            assert_no_not_found_flash(card_page, f"projects-to-{slug} card navigation")
            card_page.close()

        # Public project details and repository CTAs via client navigation.
        arm_not_found_observer(page)
        click_project(page, "gwm-uav-navigation-sparse-rewards")
        expect(page.get_by_text("Archived v1.0.0 framework with optional post-v1 C2 extension", exact=True).first).to_be_visible()
        assert_no_not_found_flash(page, "projects-to-GWM navigation")
        expect(page.get_by_role("link", name="GitHub Repository")).to_have_attribute(
            "href", PUBLIC_REPOSITORIES[1]
        )
        page.go_back(wait_until="domcontentloaded")
        expect(page.get_by_role("heading", name="Scalable Railway Ticketing Platform")).to_be_visible()
        arm_not_found_observer(page)
        page.go_forward(wait_until="domcontentloaded")
        expect(page.get_by_role("heading", name="World-Model-Guided Digital-Twin UAV Navigation Research Framework", exact=True)).to_be_visible()
        assert_no_not_found_flash(page, "browser-forward navigation")
        page.go_back(wait_until="domcontentloaded")
        expect(page.get_by_placeholder("Search projects by tag or name...")).to_be_visible()
        arm_not_found_observer(page)
        click_project(page, "scalable-ecommerce-platform")
        expect(page.get_by_text("v1.0.0 / production-minded backend foundation", exact=True).first).to_be_visible()
        assert_no_not_found_flash(page, "projects-to-E-Commerce navigation")
        expect(page.get_by_role("link", name="GitHub Repository")).to_have_attribute(
            "href", PUBLIC_REPOSITORIES[2]
        )

        # Private-sanitized details must not expose any resource CTA.
        page.get_by_role("link", name="Projects", exact=True).click()
        click_project(page, "heterogeneous-uav-swarm-system")
        expect(page.get_by_text("Private repository / sanitized portfolio summary", exact=True).first).to_be_visible()
        expect(page.get_by_role("link", name="GitHub Repository")).to_have_count(0)
        page.get_by_role("link", name="Projects", exact=True).click()
        click_project(page, "thesis-code")
        expect(page.get_by_text("Research submitted to IEEE Transactions on Multimedia.", exact=True)).to_be_visible()
        expect(page.get_by_role("heading", name="Diffusion Transformer Video Anomaly Detection", exact=True)).to_be_visible()
        expect(page.get_by_role("link", name="GitHub Repository")).to_have_count(0)
        page.get_by_role("button", name="Toggle Language").click()
        expect(page.get_by_role("heading", name="基於 Diffusion Transformer 的視訊異常偵測", exact=True)).to_be_visible()
        page.get_by_role("button", name="Toggle Language").click()

        # Every direct public URL must render its matching project and real cover.
        for slug, title in PROJECT_TITLES.items():
            direct = context.new_page()
            direct.goto(f"{BASE_URL}/projects/{slug}", wait_until="domcontentloaded")
            expect(direct.get_by_role("heading", name=title, exact=True)).to_be_visible()
            cover = direct.locator(f'img[src*="{app_path(f"/images/projects/{slug}.")}"]').first
            assert_real_cover(cover, f"detail page {slug}")
            expect(direct.get_by_text("Project Not Found", exact=True)).to_have_count(0)
            direct.close()

        # Blog listing to article uses Nuxt client navigation.
        page.get_by_role("link", name="Blog", exact=True).click()
        article_link = page.locator(f'a[href="{app_path("/blog/scalable-railway-ticketing-platform")}"]').first
        expect(article_link).to_be_visible()
        article_link.click()
        expect(page.get_by_role("heading", name="Building a Sharded Railway Ticketing Platform", exact=True).first).to_be_visible()

        # Public GitHub URLs must resolve; no private repository URL is in this list.
        for repository_url in PUBLIC_REPOSITORIES:
            response = context.request.get(repository_url, timeout=20_000)
            assert response.status < 400, f"Broken public repository URL ({response.status}): {repository_url}"

        mobile = context.new_page()
        mobile.set_viewport_size({"width": 390, "height": 844})
        mobile.goto(f"{BASE_URL}/projects", wait_until="domcontentloaded")
        expect(mobile.get_by_role("heading", name="Scalable Railway Ticketing Platform")).to_be_visible()
        has_overflow = mobile.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
        assert not has_overflow, "Projects page has horizontal overflow at 390px"
        assert_no_raw_i18n_keys(mobile)
        expect(mobile.get_by_text("Neura-Shadow Portfolio CMS", exact=True)).to_have_count(0)
        mobile_covers = mobile.locator(f'a[href^="{app_path("/projects/")}"] img')
        assert mobile_covers.count() == len(PROJECT_TITLES), "Mobile catalog must render all seven project covers"
        for index in range(mobile_covers.count()):
            assert_real_cover(mobile_covers.nth(index), f"mobile catalog card {index + 1}")

        browser.close()

    problems = {
        "console errors": console_errors,
        "page errors": page_errors,
        "failed requests": failed_requests,
        "HTTP errors": bad_responses,
    }
    failures = [f"{label}: {values}" for label, values in problems.items() if values]
    if failures:
        raise AssertionError("\n".join(failures))

    print(
        "Portfolio browser verification passed: home featured order, EN/ZH, taxonomy, search, "
        "seven-project catalog, public/private details, flash-free client navigation, direct URLs, blog, "
        "unique base-aware local covers with positive natural dimensions and no unexpected placeholders, "
        "public links, Mock Mode, and mobile layout."
    )


if __name__ == "__main__":
    main()
