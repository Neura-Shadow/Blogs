# GitHub Portfolio Sync Report

Snapshot date: 2026-08-01
Account: `Neura-Shadow`
Source: authenticated GitHub repository, commit, tree, tag, and release inspection

## Inventory summary

The authenticated account exposed 10 repositories: 8 public and 2 private. The public set contains seven account-owned repositories and one upstream fork. One private repository is also an upstream fork. Private entries are deliberately summarized without repository names, branches, file trees, commits, assets, credentials, or operational details.

| Repository or sanitized entry | Visibility / relationship | Repository evidence | Portfolio classification | Current state | Action |
| --- | --- | --- | --- | --- | --- |
| `Scalable-Railway-Ticketing-Platform` | Public, account-owned | Go; extensive docs; latest work covers a fixed physical-shard topology and bounded online rebalancing; no tags or GitHub releases | New standalone project | new | `ADD` |
| `GWM-UAV-Navigation-Sparse-Rewards` | Public, account-owned | Python; research-framework docs; tags and releases through `v1.0.0`; guarded mock-first and optional-runtime boundaries | Current standalone project | updated | `UPDATE` |
| `Scalable-E-Commerce-Platform` | Public, account-owned | Go; `v1.0.0` tag; transactional ordering, Redis cache/rate limit, SQL migrations, outbox and consumer foundations, CI security gates | Current standalone project | updated | `UPDATE` |
| `Blogs` | Public, account-owned | Vue/Nuxt portfolio and CMS repository | Self repository / inventory only | removed | `EXCLUDE_SELF` |
| `Face_Detect_Realtime` | Public, account-owned | Small 2023 Python/OpenCV/`face_recognition`/Firebase/SMTP prototype; no project docs or release evidence | Legacy / archive | updated | `ARCHIVE` |
| `Analysis_website` | Public, account-owned | Static HTML5 UP template site plus a Jupyter notebook and SQL file; old release labels only | Legacy / archive | updated | `ARCHIVE` |
| `Neura-Shadow` | Public, account-owned profile repository | Profile content rather than a standalone software product | Self profile / inventory only | removed | `EXCLUDE_SELF` |
| `developer-roadmap` | Public fork | Upstream learning-roadmap fork | External contribution / fork reference | unchanged | `EXCLUDE` |
| Private research repository | Private, account-owned | Confidential source inspected only to determine safe portfolio scope | Standalone confidential research summary | updated | `PRIVATE-SANITIZED` |
| Private control-panel repository | Private fork | Confidential source inspected only to determine safe portfolio scope | Fold into existing heterogeneous-systems entry | updated | `MERGE` |
| `control-panel-advanced` portfolio-only entry | No matching accessible repository | Obsolete duplicate portfolio record | Fold into existing heterogeneous-systems entry | removed | `MERGE` |

## Repository-to-portfolio decisions

### Added

- `Scalable-Railway-Ticketing-Platform` is now the first featured project.
- Its project entry covers Go, PostgreSQL, Redis, Prometheus metrics, workers, segment inventory, waiting-room admission, single-writer fencing, and fixed physical shards.
- Its limitation text explicitly excludes national-scale capacity, autoscaling, multi-region operation, payment processing, zero-downtime migration, disaster-recovery guarantees, and production SLO claims.
- Project-specific legacy PNG covers were normalized into local 1600×900 WebP files for all seven public projects. No external hotlink or third-party image was introduced.

### Updated

- `GWM-UAV-Navigation-Sparse-Rewards` now describes the guarded research framework, replay/readiness paths, graph-world-model scope, ROS 2/OpenUSD abstractions, optional simulators, and evidence limits.
- `Scalable-E-Commerce-Platform` now reflects the public `v1.0.0` repository: Gin REST, PostgreSQL/GORM, versioned Redis caching, JWT access/refresh flow, transactional ordering, durable idempotency, explicit migrations, outbox/consumer foundations, health endpoints, Prometheus, Docker, and release CI.

### Merged or excluded

- The obsolete `control-panel-advanced` item had no matching accessible repository. Its safe, non-confidential system-integration scope is folded into the existing heterogeneous UAV/USV/UGV project.
- The private control-panel fork is not linked and is not represented as a second project.
- `Neura-Shadow/Blogs` and `Neura-Shadow/Neura-Shadow` are classified as `EXCLUDE_SELF` and are not public Portfolio projects.
- The upstream roadmap fork is not presented as an authored standalone product.

### Archived

- `Analysis_website` is labeled as a legacy static-template/data-analysis artifact.
- `Face_Detect_Realtime` is labeled as a legacy script-based prototype.

## Claim audit

The content audit removed or replaced claims that the inspected repositories did not substantiate, including:

- latency, FPS, percentage-improvement, failover-time, vehicle-count, row-count, and throughput figures without reproducible evidence;
- real-flight, deployment-readiness, production-capacity, high-availability, zero-downtime, certification, and SLO implications;
- technologies or deployment platforms absent from the corresponding repository;
- private repository links and confidential implementation details;
- “accepted” or “published” research wording.

The required research wording is used exactly where relevant:

> Research submitted to IEEE Transactions on Multimedia

> 研究成果投稿於 IEEE Transactions on Multimedia

Local tests, mocked paths, simulation runs, and synthetic benchmark artifacts are described only within their documented boundaries. They are not promoted to production, field, route-completion, accuracy, or capacity evidence.

## Content and presentation changes

- Featured order: Railway, GWM, E-Commerce.
- Primary taxonomy: Backend Systems, Robotics Research, Full-stack, AI Research, Cloud Native, Computer Vision, Legacy / Archive.
- Secondary categories remain discoverable through tags.
- Project cards and details now display local covers when present.
- “Key Achievements” and “Results & Impact” were renamed to “Implemented Scope” and “Current Outcomes” to avoid implying unverified impact.
- The GWM article was rewritten against current public documentation.
- A Railway engineering draft was added because the public repository contains sufficient architectural and limitation documentation.

## Data safety

- Public repository URLs are included only for public, attributable repositories.
- Private project URLs are `null`.
- No private file tree, commit, branch, image, secret, credential, or benchmark detail is copied into this repository.
- URL rendering accepts only local root-relative assets or HTTP(S) links.
- The Supabase sync workflow defaults to dry-run, requires explicit confirmation for apply, and never deletes remote-only rows automatically.

## Verification snapshot

- `npm run sync:projects -- --dry-run`: passed; reported 7 additions, 0 updates, 0 unchanged rows, 0 remove candidates, and performed no writes or deletes.
- `npm run build`: passed after the final authenticated-data-boundary correction.
- Native Playwright verification passed against the production build in explicit Mock Mode. It covered all seven catalog-card navigations, the detail-to-detail regression seam, browser back/forward, direct routes, EN/zh-TW switching, responsive layout, unique local covers, public/private links, raw i18n-key guards, console errors, page errors, failed requests, and HTTP error checks.
- Optional manual Computer Use status: `blocked_by_browser_url_uncertainty`. The desktop helper could not determine Chrome's current URL confidently, so no safety check was weakened or bypassed; deterministic Playwright evidence is the acceptance source.
- Updated screenshot: `public/images/screenshots/projects-showcase.png`.
