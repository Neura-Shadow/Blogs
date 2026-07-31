import os
import shutil
from pathlib import Path

from playwright.sync_api import Page, expect, sync_playwright


BASE_URL = os.environ.get("PORTFOLIO_BASE_URL", "http://127.0.0.1:3000")
SCREENSHOT = Path(__file__).resolve().parents[1] / "public" / "images" / "screenshots" / "projects-showcase.png"
PUBLIC_REPOSITORIES = [
    "https://github.com/Neura-Shadow/Scalable-Railway-Ticketing-Platform",
    "https://github.com/Neura-Shadow/GWM-UAV-Navigation-Sparse-Rewards",
    "https://github.com/Neura-Shadow/Scalable-E-Commerce-Platform",
    "https://github.com/Neura-Shadow/Analysis_website",
    "https://github.com/Neura-Shadow/Face_Detect_Realtime",
    "https://github.com/Neura-Shadow/Blogs",
]


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


def click_project(page: Page, slug: str) -> None:
    page.locator(f'a[href="/projects/{slug}"]').first.click()


def main() -> None:
    console_errors: list[str] = []
    page_errors: list[str] = []
    failed_requests: list[str] = []
    bad_responses: list[str] = []

    with sync_playwright() as playwright:
        launch_options: dict[str, object] = {"headless": True}
        executable = browser_executable()
        if executable:
            launch_options["executable_path"] = executable

        browser = playwright.chromium.launch(**launch_options)
        context = browser.new_context(viewport={"width": 1440, "height": 1000})
        page = context.new_page()
        expect.set_options(timeout=10_000)

        page.on("console", lambda message: console_errors.append(message.text) if message.type == "error" else None)
        page.on(
            "pageerror",
            lambda error: page_errors.append(f"{page.url}: {getattr(error, 'stack', None) or str(error)}"),
        )
        page.on("requestfailed", lambda request: failed_requests.append(f"{request.method} {request.url}"))
        page.on(
            "response",
            lambda response: bad_responses.append(f"{response.status} {response.url}")
            if response.status >= 400
            else None,
        )

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
        click_project(page, "scalable-railway-ticketing-platform")
        expect(page.get_by_role("heading", name="Scalable Railway Ticketing Platform", exact=True)).to_be_visible()
        expect(page.get_by_role("heading", name="Current Outcomes")).to_be_visible()
        assert_no_raw_i18n_keys(page)

        page.get_by_role("link", name="Projects", exact=True).click()
        expect(page.get_by_role("heading", name="Scalable Railway Ticketing Platform")).to_be_visible()

        # Locale switch, raw-key guard, covers, filters, and search.
        page.get_by_role("button", name="Toggle Language").click()
        expect(page.get_by_role("heading", name="可擴展鐵路票務平台")).to_be_visible()
        assert_no_raw_i18n_keys(page)
        page.get_by_role("button", name="Toggle Language").click()
        expect(page.get_by_role("heading", name="Scalable Railway Ticketing Platform")).to_be_visible()

        expected_cover_fragments = [
            "scalable-railway-ticketing-platform.svg",
            "gwm-uav-navigation-research-engineering.png",
            "scalable-ecommerce-platform.svg",
            "analysis-website-archive.svg",
            "face-detect-realtime.svg",
            "home-hero.png",
        ]
        for fragment in expected_cover_fragments:
            image = page.locator(f'img[src*="{fragment}"]').first
            expect(image).to_be_visible()
            assert image.evaluate("element => element.naturalWidth") > 0, f"Broken cover: {fragment}"

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

        SCREENSHOT.parent.mkdir(parents=True, exist_ok=True)
        page.screenshot(path=str(SCREENSHOT), full_page=True)

        # Public project details and repository CTAs via client navigation.
        click_project(page, "gwm-uav-navigation-sparse-rewards")
        expect(page.get_by_text("Archived v1.0.0 framework with optional post-v1 C2 extension", exact=True).first).to_be_visible()
        expect(page.get_by_role("link", name="GitHub Repository")).to_have_attribute(
            "href", PUBLIC_REPOSITORIES[1]
        )
        page.get_by_role("link", name="Projects", exact=True).click()
        click_project(page, "scalable-ecommerce-platform")
        expect(page.get_by_text("v1.0.0 / production-minded backend foundation", exact=True).first).to_be_visible()
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
        expect(page.get_by_role("link", name="GitHub Repository")).to_have_count(0)

        # Blog listing to article uses Nuxt client navigation.
        page.get_by_role("link", name="Blog", exact=True).click()
        article_link = page.locator('a[href="/blog/scalable-railway-ticketing-platform"]').first
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
        "public/private details, client navigation, blog, covers, public links, Mock Mode, and mobile layout."
    )


if __name__ == "__main__":
    main()
