import type { Project } from '~/types/project'

export const projectsData: Project[] = [
  {
    slug: 'scalable-railway-ticketing-platform',
    title: {
      en: 'Scalable Railway Ticketing Platform',
      'zh-TW': '可擴展鐵路票務平台'
    },
    subtitle: {
      en: 'Single-region Go booking backend with bounded sharding pilots',
      'zh-TW': '具有限定分片試驗的單區域 Go 訂票後端'
    },
    category: 'Backend Systems',
    role: {
      en: 'Backend Architect / Developer',
      'zh-TW': '後端架構師 / 開發者'
    },
    status: {
      en: 'Active engineering project / bounded single-region pilot',
      'zh-TW': '持續開發中 / 有明確邊界的單區域試驗'
    },
    description: {
      en: 'A production-minded Go railway booking backend with route-segment seat allocation, durable idempotency, a transactional outbox, Redis admission control, and bounded logical and physical shard pilots.',
      'zh-TW': '以 Go 建構的 production-minded 鐵路訂票後端，涵蓋路段座位配置、持久化冪等、交易式 outbox、Redis 入場控制，以及有限範圍的邏輯與實體分片試驗。'
    },
    longDescription: {
      en: 'The repository is a modular monolith with separate API and worker processes. PostgreSQL remains authoritative for booking state and segment inventory. Redis supports the hot-train waiting room and versioned read caches without becoming booking authority. The project includes single-writer fencing, migration and rollback controls, Prometheus metrics, health endpoints, Docker Compose, and integration and concurrency tests. Its physical PostgreSQL topology is a fixed single-region pilot, not a national-scale or multi-region deployment.',
      'zh-TW': '此 repository 採 modular monolith，並將 API 與 worker 分為不同程序。PostgreSQL 是訂位狀態與路段座位庫存的唯一權威來源；Redis 僅支援熱門車次 waiting room 與版本化讀取快取，不具訂位權威。專案也包含 single-writer fencing、遷移與回復控制、Prometheus 指標、健康檢查、Docker Compose，以及整合與併發測試。實體 PostgreSQL 拓撲是固定的單區域試驗，不代表全國規模或多區域部署。'
    },
    tags: ['Backend Systems', 'Cloud Native', 'Railway', 'High Concurrency', 'Distributed Systems'],
    stack: ['Go', 'Gin', 'PostgreSQL', 'Redis', 'Prometheus', 'Docker', 'SQL Migrations', 'REST API', 'Worker Processes'],
    links: {
      demo: null,
      repo: 'https://github.com/Neura-Shadow/Scalable-Railway-Ticketing-Platform',
      paper: null
    },
    cover: '/images/projects/scalable-railway-ticketing-platform.svg',
    highlights: {
      en: [
        'Allocates physical seats by route-segment overlap with atomic all-or-nothing multi-passenger updates.',
        'Binds durable idempotency, booking state, quota, routing metadata, and outbox intent to controlled transaction boundaries.',
        'Adds Redis hot-train admission, versioned read caches, logical shard routing, and a bounded two-booking-database physical pilot.'
      ],
      'zh-TW': [
        '依路段重疊配置實體座位，並以原子交易完成多乘客的全有或全無更新。',
        '在受控交易邊界內整合持久化冪等、訂位狀態、配額、路由中繼資料與 outbox intent。',
        '加入 Redis 熱門車次入場控制、版本化讀取快取、邏輯分片路由，以及限定為兩個 booking database 的實體試驗。'
      ]
    },
    challenges: {
      en: [
        'Preserving one authoritative writer while train runs move between logical or physical storage boundaries.',
        'Keeping Redis admission and caches useful without allowing them to become seat or routing authority.',
        'Making online copy and catch-up resumable while retaining a measured final write pause and conservative rollback rules.'
      ],
      'zh-TW': [
        '在車次於邏輯或實體儲存邊界間移動時，持續維持單一權威 writer。',
        '讓 Redis admission 與快取提供效益，同時禁止其成為座位或路由權威。',
        '讓線上複製與追趕流程可續跑，並保留可量測的最終寫入暫停與保守回復規則。'
      ]
    },
    results: {
      en: [
        'Repository tests cover reservation lifecycle, concurrency, routing, fencing, migration, reconciliation, and failure boundaries.',
        'Milestone 5 records bounded disposable local correctness evidence for the fixed physical-shard pilot.',
        'The project explicitly excludes payment implementation, zero-downtime claims, multi-region active-active writes, and production-capacity certification.'
      ],
      'zh-TW': [
        'Repository 測試涵蓋訂位生命週期、併發、路由、fencing、遷移、reconciliation 與失效邊界。',
        'Milestone 5 記錄固定實體分片試驗在一次性本機環境中的有限正確性證據。',
        '專案明確排除付款實作、零停機宣稱、多區域 active-active 寫入與 production capacity 認證。'
      ]
    },
    featured: true
  },
  {
    slug: 'gwm-uav-navigation-sparse-rewards',
    title: {
      en: 'World-Model-Guided Digital-Twin UAV Navigation Research Framework',
      'zh-TW': '世界模型引導的數位孿生無人機導航研究框架'
    },
    subtitle: {
      en: 'Mock-first sparse-reward navigation and guarded runtime integration',
      'zh-TW': 'Mock-first 稀疏獎勵導航與受控 runtime 整合'
    },
    category: 'Robotics Research',
    role: {
      en: 'Research Engineer / Framework Developer',
      'zh-TW': '研究工程師 / 框架開發者'
    },
    status: {
      en: 'Archived v1.0.0 framework with optional post-v1 C2 extension',
      'zh-TW': '已封存 v1.0.0 框架，另含可選 post-v1 C2 延伸'
    },
    description: {
      en: 'A mock-first research engineering framework for sparse-reward UAV, UGV, and AMR navigation using latent world models, generated future rollouts, digital-twin descriptors, and guarded simulator and SITL paths.',
      'zh-TW': '面向 UAV、UGV 與 AMR 稀疏獎勵導航的 mock-first 研究工程框架，結合 latent world model、generated future rollout、數位孿生描述，以及受控的模擬器與 SITL 路徑。'
    },
    longDescription: {
      en: 'The repository connects world-model training, Real2Sim2Real scenario generation, OpenUSD-style descriptors, ROS2-style adapters, multi-agent coordination, and a CBF-style runtime filter. Normal tests run without GPU, ROS2, Isaac Sim, PX4, MAVSDK, Cosys-AirSim, or hardware. Optional integrations require explicit gates. The archived v1.0.0 artifact and the later C2 replay and planning extension remain simulation, SITL, replay, and readiness oriented; they do not establish real-flight validation, production readiness, or certified safety.',
      'zh-TW': '此 repository 串接 world-model 訓練、Real2Sim2Real 情境生成、OpenUSD-style 描述、ROS2-style adapter、多載具協調與 CBF-style runtime filter。一般測試不需要 GPU、ROS2、Isaac Sim、PX4、MAVSDK、Cosys-AirSim 或硬體；可選整合必須經明確 gate 才能啟用。封存的 v1.0.0 artifact 與後續 C2 replay / planning 延伸仍以模擬、SITL、replay 與 readiness 為定位，不能視為真實飛行驗證、production readiness 或安全認證。'
    },
    tags: ['Robotics Research', 'AI Research', 'Sparse Rewards', 'World Model', 'Digital Twin', 'Multi-agent'],
    stack: ['Python', 'PyTorch', 'ROS2 Interfaces', 'OpenUSD Descriptors', 'Isaac Sim (Guarded)', 'PX4 SITL', 'MAVSDK (Guarded)', 'Cosys-AirSim (Optional)'],
    links: {
      demo: null,
      repo: 'https://github.com/Neura-Shadow/GWM-UAV-Navigation-Sparse-Rewards',
      paper: null
    },
    cover: '/images/blog/gwm-uav-navigation-research-engineering.png',
    highlights: {
      en: [
        'Keeps normal development mock-first while isolating optional ROS2, simulator, SITL, and command paths behind explicit runtime gates.',
        'Combines generated future observations, Real2Sim2Real scenarios, digital-twin descriptors, shared world state, and safety-filtered command proposals.',
        'Adds an optional post-v1 C2 layer for mission data, replay, defensive risk mapping, route scoring, metrics, and benchmark readiness.'
      ],
      'zh-TW': [
        '一般開發維持 mock-first，並將 ROS2、模擬器、SITL 與指令路徑隔離於明確 runtime gate 後方。',
        '整合 generated future observation、Real2Sim2Real 情境、數位孿生描述、shared world state 與安全過濾後的指令提案。',
        '以可選 post-v1 C2 層補充任務資料、replay、防禦性風險映射、路徑評分、metrics 與 benchmark readiness。'
      ]
    },
    challenges: {
      en: [
        'Keeping optional robotics dependencies import-safe and testable on a plain Python environment.',
        'Separating research readiness from evidence of live simulator, SITL, HIL, or physical-flight execution.',
        'Maintaining command and safety boundaries while adding replay, planning, and multi-agent coordination.'
      ],
      'zh-TW': [
        '讓可選 robotics dependency 在純 Python 環境中仍可安全 import 與測試。',
        '明確區分 research readiness 與 live simulator、SITL、HIL 或實體飛行證據。',
        '在加入 replay、planning 與多載具協調時維持指令與安全邊界。'
      ]
    },
    results: {
      en: [
        'Archived the completed mock-first and guarded-runtime research framework as v1.0.0.',
        'Completed the optional post-v1 C2 extension in replay, planning, reporting, and readiness-oriented form.',
        'No unsupported success-rate, path-length, latency, real-flight, deployment, or certification claim is carried into the portfolio.'
      ],
      'zh-TW': [
        '以 v1.0.0 封存完成的 mock-first 與 guarded-runtime 研究框架。',
        '完成以 replay、planning、reporting 與 readiness 為定位的可選 post-v1 C2 延伸。',
        '作品集不再沿用未受證據支持的成功率、路徑長度、延遲、真實飛行、部署或認證宣稱。'
      ]
    },
    featured: true
  },
  {
    slug: 'scalable-ecommerce-platform',
    title: {
      en: 'Scalable E-Commerce Backend Platform',
      'zh-TW': '可擴展電商後端平台'
    },
    subtitle: {
      en: 'Single-region Go ordering and event-processing foundation',
      'zh-TW': '單區域 Go 訂單與事件處理基礎架構'
    },
    category: 'Backend Systems',
    role: {
      en: 'Backend Architect / Developer',
      'zh-TW': '後端架構師 / 開發者'
    },
    status: {
      en: 'v1.0.0 / production-minded backend foundation',
      'zh-TW': 'v1.0.0 / production-minded 後端基礎架構'
    },
    description: {
      en: 'A feature-oriented Go backend with transaction-safe ordering, atomic inventory deduction, durable idempotency, versioned Redis caches, JWT authentication, and a transactional outbox foundation.',
      'zh-TW': '採 feature-oriented 模組邊界的 Go 後端，包含交易安全訂單、原子庫存扣減、持久化冪等、版本化 Redis 快取、JWT authentication 與 transactional outbox 基礎。'
    },
    longDescription: {
      en: 'The v1.0.0 repository uses Gin REST APIs, a gRPC skeleton, PostgreSQL with GORM and explicit SQL migrations, Redis request protection and caches, access and refresh tokens, admin product and inventory routes, and coordinated API and worker lifecycles. Its Redis Streams publisher and consumer foundation includes retry, stale-claim, idempotent processing, and dead-letter handling. Payment, email, fulfillment, and analytics side-effect handlers are not implemented as a complete production workflow.',
      'zh-TW': 'v1.0.0 repository 採用 Gin REST API、gRPC skeleton、PostgreSQL / GORM、明確 SQL migration、Redis request protection 與快取、access / refresh token、管理員商品與庫存 route，以及協調式 API / worker lifecycle。Redis Streams publisher / consumer foundation 支援 retry、stale claim、冪等處理與 dead-letter；付款、email、fulfillment 與 analytics side-effect handler 尚未形成完整 production workflow。'
    },
    tags: ['Backend Systems', 'Cloud Native', 'E-Commerce', 'Idempotency', 'Event Processing'],
    stack: ['Go', 'Gin', 'gRPC', 'PostgreSQL', 'GORM', 'Redis', 'Redis Streams', 'Prometheus', 'Docker', 'SQL Migrations'],
    links: {
      demo: null,
      repo: 'https://github.com/Neura-Shadow/Scalable-E-Commerce-Platform',
      paper: null
    },
    cover: '/images/projects/scalable-ecommerce-platform.svg',
    highlights: {
      en: [
        'Places orders inside a transaction-scoped unit of work with conditional inventory deduction and durable request fingerprints.',
        'Uses versioned product caches and Redis-backed rate limiting without making Redis the authoritative order store.',
        'Provides outbox publisher and consumer-group foundations with bounded retry, stale-claim recovery, and dead-letter handling.'
      ],
      'zh-TW': [
        '以 transaction-scoped unit of work 建立訂單，搭配條件式庫存扣減與持久化 request fingerprint。',
        '使用版本化商品快取與 Redis rate limiting，同時不讓 Redis 成為訂單權威儲存。',
        '提供具有限 retry、stale-claim recovery 與 dead-letter handling 的 outbox publisher / consumer-group 基礎。'
      ]
    },
    challenges: {
      en: [
        'Preventing overselling while keeping order creation replay-safe after Redis records expire or fail.',
        'Separating committed order intent from asynchronous business side effects.',
        'Keeping migrations, readiness checks, and process shutdown explicit across API and worker paths.'
      ],
      'zh-TW': [
        '避免超賣，並在 Redis record 過期或失效後仍保持 order creation 可安全 replay。',
        '將已提交的訂單 intent 與非同步 business side effect 分離。',
        '讓 migration、readiness check 與 process shutdown 在 API / worker 路徑中保持明確。'
      ]
    },
    results: {
      en: [
        'The repository includes unit, HTTP integration, and concurrent limited-stock ordering tests.',
        'Release CI covers race detection, static analysis, vulnerability checks, migration gates, secret scanning, and Docker builds.',
        'No large-scale traffic, TPS, latency, user-count, multi-region, or complete downstream workflow claim is made.'
      ],
      'zh-TW': [
        'Repository 包含 unit test、HTTP integration test 與有限庫存併發下單測試。',
        'Release CI 涵蓋 race detector、static analysis、弱點檢查、migration gate、secret scanning 與 Docker build。',
        '不宣稱大規模商業流量、TPS、延遲、使用者數、多區域或完整 downstream workflow。'
      ]
    },
    featured: true
  },
  {
    slug: 'heterogeneous-uav-swarm-system',
    title: {
      en: 'Heterogeneous UAV/USV/UGV Swarm Collaborative System',
      'zh-TW': '陸海空群組無人載具異質協同系統'
    },
    subtitle: {
      en: 'Sanitized summary of a private research integration project',
      'zh-TW': 'Private 研究整合專案的公開摘要'
    },
    category: 'UAV Systems',
    role: {
      en: 'System Architecture / Integration',
      'zh-TW': '系統架構 / 整合'
    },
    status: {
      en: 'Private repository / sanitized portfolio summary',
      'zh-TW': 'Private repository / 僅公開去敏摘要'
    },
    description: {
      en: 'Research-system integration for coordinating aerial, surface, and ground vehicles, with public portfolio coverage limited to operator UI, telemetry, and system-boundary work.',
      'zh-TW': '陸海空異質載具協同的研究系統整合；公開作品集僅描述 operator UI、telemetry 與系統邊界工作。'
    },
    longDescription: {
      en: 'This entry consolidates the former control-panel card into the broader heterogeneous swarm project. The source repository is private, so the public summary intentionally omits clone URLs, branches, source details, private assets, credentials, and unverified runtime metrics.',
      'zh-TW': '此 entry 將舊 control-panel card 合併至較完整的異質載具系統專案。由於 source repository 為 private，公開摘要刻意省略 clone URL、branch、source detail、private asset、credential 與未驗證 runtime metric。'
    },
    tags: ['UAV Systems', 'System Integration', 'Telemetry', 'Operator UI', 'Private-Sanitized'],
    stack: ['Python', 'Flask', 'Nuxt.js', 'MQTT', 'MAVLink', 'WebRTC', 'Docker'],
    links: {
      demo: null,
      repo: null,
      paper: null
    },
    highlights: {
      en: [
        'Defines integration boundaries across heterogeneous vehicle telemetry and operator workflows.',
        'Keeps the private repository and all private implementation links out of the public portfolio.'
      ],
      'zh-TW': [
        '整理異質載具 telemetry 與 operator workflow 之間的整合邊界。',
        '公開作品集中不包含 private repository 或任何 private implementation link。'
      ]
    },
    challenges: {
      en: [
        'Normalizing telemetry and operator interactions across different vehicle classes.',
        'Describing the work publicly without exposing private implementation details.'
      ],
      'zh-TW': [
        '在不同載具類型間正規化 telemetry 與 operator interaction。',
        '在不揭露 private implementation detail 的前提下公開描述工作。'
      ]
    },
    results: {
      en: ['Public entry retained as a sanitized system-integration summary without performance or deployment claims.'],
      'zh-TW': ['保留為去敏後的系統整合摘要，不包含效能或部署宣稱。']
    },
    featured: false
  },
  {
    slug: 'thesis-code',
    title: {
      en: 'Master Thesis Code - Video Anomaly Detection',
      'zh-TW': '碩士研究代碼 - 視訊異常偵測'
    },
    subtitle: {
      en: 'Sanitized summary of private computer-vision research code',
      'zh-TW': 'Private 電腦視覺研究代碼的去敏摘要'
    },
    category: 'AI Research',
    role: {
      en: 'Graduate Researcher',
      'zh-TW': '研究生'
    },
    status: {
      en: 'Private research repository / academic submission',
      'zh-TW': 'Private 研究 repository / 論文投稿中'
    },
    description: {
      en: 'A private research codebase for video anomaly detection and spatio-temporal representation experiments, described only through already public thesis and portfolio material.',
      'zh-TW': '用於視訊異常偵測與時空表徵實驗的 private research codebase；此處僅使用既有公開論文與作品集資訊。'
    },
    longDescription: {
      en: 'The public summary covers the research topic and Diffusion Transformer experimentation without reproducing private source, branch names, assets, credentials, benchmark tables, or repository links. Research submitted to IEEE Transactions on Multimedia.',
      'zh-TW': '公開摘要僅說明研究主題與 Diffusion Transformer 實驗，不複製 private source、branch name、asset、credential、benchmark table 或 repository link。研究成果投稿於 IEEE Transactions on Multimedia。'
    },
    tags: ['AI Research', 'Computer Vision', 'Video Anomaly Detection', 'Diffusion Transformer', 'Private-Sanitized'],
    stack: ['Python', 'PyTorch', 'OpenCV', 'Transformer'],
    links: {
      demo: null,
      repo: null,
      paper: null
    },
    highlights: {
      en: [
        'Explores temporal representation and anomaly-scoring pipelines for video sequences.',
        'Keeps publication status explicitly at submitted, not accepted or published.'
      ],
      'zh-TW': [
        '探索視訊序列的時序表徵與 anomaly-scoring pipeline。',
        '論文狀態明確維持為已投稿，不宣稱已接受或已刊登。'
      ]
    },
    challenges: {
      en: [
        'Managing temporal context and memory cost in video-model experiments.',
        'Keeping public descriptions separate from private implementation and unverified benchmark claims.'
      ],
      'zh-TW': [
        '處理視訊模型實驗中的時序 context 與 memory cost。',
        '將公開描述與 private implementation、未驗證 benchmark claim 分離。'
      ]
    },
    results: {
      en: ['Research submitted to IEEE Transactions on Multimedia.'],
      'zh-TW': ['研究成果投稿於 IEEE Transactions on Multimedia。']
    },
    featured: false
  },
  {
    slug: 'analysis-website',
    title: {
      en: 'Data Analysis Website Archive',
      'zh-TW': '資料分析網站封存專案'
    },
    subtitle: {
      en: '2023 static showcase with notebook and SQL artifacts',
      'zh-TW': '包含 notebook 與 SQL artifact 的 2023 靜態展示站'
    },
    category: 'Legacy / Archive',
    role: {
      en: 'Developer',
      'zh-TW': '開發者'
    },
    status: {
      en: 'Legacy / archived',
      'zh-TW': 'Legacy / 已封存'
    },
    description: {
      en: 'A legacy static HTML showcase based on the Massively HTML5 UP template, with a Jupyter data-analysis notebook and a SQL script retained as historical artifacts.',
      'zh-TW': '以 Massively HTML5 UP template 建立的 legacy 靜態展示站，保留 Jupyter data-analysis notebook 與 SQL script 作為歷史 artifact。'
    },
    longDescription: {
      en: 'Repository inspection found a static HTML/CSS/JavaScript site, template assets, one data-analysis notebook, and one SQL query file.',
      'zh-TW': 'Repository tree 顯示此專案包含靜態 HTML/CSS/JavaScript 網站、template assets、一份 data-analysis notebook 與一份 SQL query。'
    },
    tags: ['Legacy / Archive', 'Data Analysis', 'Jupyter Notebook', 'SQL', 'Static Site'],
    stack: ['HTML5', 'CSS', 'JavaScript', 'Jupyter Notebook', 'SQL'],
    links: {
      demo: null,
      repo: 'https://github.com/Neura-Shadow/Analysis_website',
      paper: null
    },
    cover: '/images/projects/analysis-website-archive.svg',
    highlights: {
      en: ['Preserved as a transparent historical artifact rather than represented as a current full-stack system.'],
      'zh-TW': ['以透明的歷史 artifact 保留，不再描述為現行 full-stack system。']
    },
    challenges: {
      en: ['Separating original analysis artifacts from the third-party static-site template.'],
      'zh-TW': ['區分原始分析 artifact 與第三方靜態網站 template。']
    },
    results: {
      en: ['Archived without throughput, scale, export, or backend implementation claims.'],
      'zh-TW': ['封存項目不包含 throughput、scale、export 或 backend implementation 宣稱。']
    },
    featured: false
  },
  {
    slug: 'face-detect-realtime',
    title: {
      en: 'Real-time Face Recognition Prototype',
      'zh-TW': '即時人臉辨識原型'
    },
    subtitle: {
      en: '2023 webcam and Firebase experiment',
      'zh-TW': '2023 webcam 與 Firebase 實驗'
    },
    category: 'Legacy / Archive',
    role: {
      en: 'Developer',
      'zh-TW': '開發者'
    },
    status: {
      en: 'Legacy prototype',
      'zh-TW': 'Legacy prototype'
    },
    description: {
      en: 'A Python webcam prototype using OpenCV and face_recognition for face matching, with Firebase Realtime Database and Storage integration and an experimental SMTP alert path.',
      'zh-TW': 'Python webcam prototype，使用 OpenCV 與 face_recognition 進行人臉比對，並整合 Firebase Realtime Database、Storage 與實驗性 SMTP alert path。'
    },
    longDescription: {
      en: 'The public repository contains a small 2023 script-based prototype for webcam face matching, Firebase-backed records, and email alerts.',
      'zh-TW': '公開 repository 是 2023 年的小型 script-based prototype，涵蓋 webcam face matching、Firebase-backed records 與 email alerts。'
    },
    tags: ['Legacy / Archive', 'Computer Vision', 'Face Recognition', 'Firebase', 'Python'],
    stack: ['Python', 'OpenCV', 'face_recognition', 'Firebase Realtime Database', 'Firebase Storage', 'SMTP'],
    links: {
      demo: null,
      repo: 'https://github.com/Neura-Shadow/Face_Detect_Realtime',
      paper: null
    },
    cover: '/images/projects/face-detect-realtime.svg',
    highlights: {
      en: ['Combines local webcam capture and face encodings with Firebase-backed profile lookup and image storage.'],
      'zh-TW': ['結合本機 webcam capture、face encoding、Firebase profile lookup 與 image storage。']
    },
    challenges: {
      en: ['The prototype needs configuration hardening, packaging, tests, and explicit privacy controls before any broader use.'],
      'zh-TW': ['若要擴大使用，prototype 仍需 configuration hardening、packaging、test 與明確 privacy control。']
    },
    results: {
      en: ['Retained as a legacy learning prototype without performance or deployment claims.'],
      'zh-TW': ['保留為 legacy 學習 prototype，不包含效能或部署宣稱。']
    },
    featured: false
  },
  {
    slug: 'blogs',
    title: {
      en: 'Neura-Shadow Portfolio CMS',
      'zh-TW': 'Neura-Shadow 作品集 CMS'
    },
    subtitle: {
      en: 'Bilingual Nuxt 3 portfolio, engineering blog, and Supabase-ready CMS',
      'zh-TW': '雙語 Nuxt 3 作品集、工程 Blog 與 Supabase-ready CMS'
    },
    category: 'Full-stack',
    role: {
      en: 'Full-stack Developer',
      'zh-TW': '全端開發者'
    },
    status: {
      en: 'Active portfolio application',
      'zh-TW': '持續維護中的作品集應用'
    },
    description: {
      en: 'This Nuxt 3 application combines a bilingual project portfolio, Markdown engineering notes, local fallback data, and a server-side Supabase CMS path for posts, projects, and media.',
      'zh-TW': '此 Nuxt 3 應用整合雙語 project portfolio、Markdown 工程筆記、本機 fallback data，以及 posts、projects 與 media 的 server-side Supabase CMS 路徑。'
    },
    longDescription: {
      en: 'The current repository has replaced the earlier Vue 2-only framing. It uses Vue 3, TypeScript, Tailwind CSS, Nuxt Content, server API routes, Supabase Auth and PostgreSQL paths, and Mock Mode fallback when required environment configuration is missing. The public static site and the server-capable CMS deployment remain distinct deployment modes.',
      'zh-TW': '目前 repository 已取代舊有僅描述 Vue 2 的定位。專案採 Vue 3、TypeScript、Tailwind CSS、Nuxt Content、server API route、Supabase Auth / PostgreSQL 路徑，並在必要環境設定缺失時使用 Mock Mode fallback。公開靜態站與可執行 CMS 的 server deployment 仍是不同模式。'
    },
    tags: ['Full-stack', 'Cloud Native', 'Portfolio', 'CMS', 'Bilingual'],
    stack: ['Nuxt 3', 'Vue 3', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Nuxt Content'],
    links: {
      demo: null,
      repo: 'https://github.com/Neura-Shadow/Blogs',
      paper: null
    },
    cover: '/images/screenshots/home-hero.png',
    highlights: {
      en: [
        'Uses one typed project model across local fallback data, CMS mapping, cards, detail pages, and server routes.',
        'Keeps public Supabase configuration separate from the server-only service credential path.'
      ],
      'zh-TW': [
        '以同一套 typed project model 串接 local fallback、CMS mapping、card、detail page 與 server route。',
        '將 public Supabase config 與 server-only service credential 路徑分離。'
      ]
    },
    challenges: {
      en: ['Keeping static fallback content and remote CMS rows synchronized without exposing private links or service credentials.'],
      'zh-TW': ['同步 static fallback 與 remote CMS row，同時避免暴露 private link 或 service credential。']
    },
    results: {
      en: ['Provides a buildable local Mock Mode and a separately configured server-side CMS mode.'],
      'zh-TW': ['提供可 build 的 local Mock Mode，以及需獨立設定的 server-side CMS mode。']
    },
    featured: false
  }
]
