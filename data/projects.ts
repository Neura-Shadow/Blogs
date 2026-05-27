import type { Project } from '~/types/project'

export const projectsData: Project[] = [
  {
    slug: 'heterogeneous-uav-swarm-system',
    title: {
      en: 'Heterogeneous UAV/USV/UGV Swarm Collaborative System',
      'zh-TW': '陸海空群組無人載具異質協同系統'
    },
    subtitle: {
      en: 'NSTC Major Research Project - Swarm Collaborative Systems',
      'zh-TW': '國科會大型專案 - 陸海空群組無人載具異質協同系統技術之研研發與應用'
    },
    category: 'UAV Systems',
    role: {
      en: 'Architecture Lead / System Architect',
      'zh-TW': '系統架構負責人 / 主要開發者'
    },
    status: {
      en: 'National Research Project (NSTC)',
      'zh-TW': '國科會大型研究計畫'
    },
    description: {
      en: 'Led the architecture design of collaborative networks coordinating unmanned aerial vehicles, surface vessels, and ground vehicles. Developed real-time telemetry systems using Nuxt.js, Flask, WebRTC, and MAVLink-MQTT.',
      'zh-TW': '擔任國科會四年期計畫架構負責人，主導異質載具（無人機、無人船、無人車）協作系統底層架構設計。前端採用 Nuxt.js 加速即時遙測介面開發，後端以 Python Flask 構建微服務，系統層整合 WebRTC 與 MQTT 協議以實現超低延遲控制與遙測處理。'
    },
    longDescription: {
      en: 'This project is a multi-year national research initiative funded by the NSTC. We built a real-time telemetry control dashboard and backend swarm orchestration pipeline capable of monitoring heterogeneous fleets. To bridge low-bandwidth and high-disturbance communication environments, we designed a custom MAVLink-MQTT bridge yielding coordinates and state updates synchronization under 100ms. High-resolution video streams are delivered via WebRTC pipelines to facilitate multi-agent dynamic obstacle avoidance. The microservice cluster is containerized via Docker and deployed dynamically in a local Kubernetes cluster.',
      'zh-TW': '本計畫為國科會四年期大型專案。我們研發了可同時調度與監控陸海空異質載具的實時控制架構。為了解決低頻寬、高干擾環境下的遙測數據傳輸，我們自主設計了 MAVLink-MQTT Bridge，使每一台載具的座標、姿態、電量等遙測數據能在 100ms 內同步至地面站與雲端後端。同時，我們在系統中實施了基於 WebRTC 的超低延遲即時影像串流傳輸，這對多智能體自動避障與遠端主動干預起到了關鍵作用。整個微服務集群最終採用 Docker 封裝並部署在 Kubernetes 平台上，確保在複雜任務場景下的高可用性與橫向擴展能力。'
    },
    tags: ['Python', 'Flask', 'Nuxt.js', 'Kubernetes', 'Docker', 'MQTT', 'MAVLink', 'WebRTC', 'VLN', 'LLM', 'CI/CD'],
    stack: ['Python', 'Flask', 'Nuxt.js', 'Tailwind CSS', 'Kubernetes', 'Docker', 'EMQX (MQTT)', 'MAVLink', 'WebRTC', 'GitHub Actions'],
    links: {
      demo: null,
      repo: null,
      paper: null
    },
    highlights: {
      en: [
        'Designed containerized microservice architectures deployed on Kubernetes for swarm coordination.',
        'Built a MAVLink-to-MQTT bridge yielding real-time telemetry sync speeds under 100ms.',
        'Integrated ultra-low latency WebRTC stream processing (video feedback latency < 200ms).'
      ],
      'zh-TW': [
        '主導異質協同（無人機/無人船/無人車）系統的全局架構設計與容器化微服務部署。',
        '設計並開發 MAVLink-MQTT 橋接器，支持上百台載具的實時遙測吞吐（延遲 < 100ms）。',
        '整合 WebRTC 影像串流，將視頻反饋延遲控制在 200ms 以內，提升即時避障效率。'
      ]
    },
    challenges: {
      en: [
        'Standardizing inconsistent telemetry coordinates formats between ROS and MAVLink structures.',
        'Mitigating high packet losses and telemetry delays over volatile outdoor radio bands.'
      ],
      'zh-TW': [
        '在異質載具的通訊標準不一（MAVLink, ROS等）的情況下，如何建立一個統一的遙測格式與協調機制。',
        '戶外無線通訊信道抖動劇烈，導致視訊串流嚴重丟包、控制指令延遲變大。'
      ]
    },
    results: {
      en: [
        'Successfully completed outdoor formation maneuvers and collaborative search operations.',
        'High system fault tolerance, demonstrating automated failover routines in under 3 seconds.'
      ],
      'zh-TW': [
        '成功在真實演練場地中展示了無人機、無人船與無人車的異質編隊與地圖協同覆蓋任務。',
        '微服務架構具備良好的高可用容錯性，在部分節點模擬失效時，遙測數據流能在 3 秒內自動完成故障轉移。'
      ]
    },
    featured: true
  },
  {
    slug: 'gwm-uav-navigation-sparse-rewards',
    title: {
      en: 'GWM-UAV Navigation (Sparse Rewards)',
      'zh-TW': 'GWM-UAV 拓撲圖自主導航算法'
    },
    subtitle: {
      en: 'Graph Wavefront Memory-based Autonomous UAV Navigation with Sparse Rewards',
      'zh-TW': '基於圖波前記憶（GWM）與稀疏獎勵的無人機自主導航研究'
    },
    category: 'AI Research',
    role: {
      en: 'Lead Researcher / Algorithm Developer',
      'zh-TW': '主導研究員 / 演算法開發者'
    },
    status: {
      en: 'Research Code / Academic Submission',
      'zh-TW': '學術研究代碼'
    },
    description: {
      en: 'Introduces a topological Graph Wavefront Memory (GWM) model combined with Graph Attention Networks (GAT) to overcome sparse reward issues in reinforcement learning navigation.',
      'zh-TW': '基於圖波前記憶（Graph Wavefront Memory）的無人機未知環境自主導航算法。在稀疏獎勵（Sparse Rewards）的強化學習場景下，大幅提高收斂速度與航點尋路安全率。'
    },
    longDescription: {
      en: 'This repository contains the official code implementation for our GWM-UAV navigation scheme. Traditional reinforcement learning (DRL) models applied in 3D environments suffer from slow convergence. We design a Graph Wavefront Memory network mapping space topology. Features are processed via Graph Attention Networks (GAT) to extract spatial layouts. The controller is trained in ROS2/Gazebo simulations.',
      'zh-TW': '本專案開源了我們提出的 GWM-UAV 導航模型代碼。傳統的深度強化學習（DRL）在無人機三維未知環境導航中面臨著「維度災難」與「稀疏獎勵」的巨大瓶頸。我們設計了圖波前記憶（GWM）結構，將環境特徵抽象為動態拓撲圖，並配合圖注意力網絡（GAT）進行局部與全局特徵提取，使智能機能在極少次數的安全航行嘗試中迅速學習到全局的最優避障路徑。代碼基於 PyTorch 框架與 ROS2 / Gazebo 物理模擬環境開發。'
    },
    tags: ['DRL', 'UAV Navigation', 'Sparse Rewards', 'PyTorch', 'Multi-agent', 'GAT'],
    stack: ['Python', 'PyTorch', 'ROS2', 'Gazebo', 'Gymnasium', 'GAT', 'Tensorboard'],
    links: {
      demo: null,
      repo: 'https://github.com/Neura-Shadow/GWM-UAV-Navigation-Sparse-Rewards',
      paper: null
    },
    highlights: {
      en: [
        'Introduced GAT layers for captures dynamic obstacle relationship topologies.',
        'Enabled training in 3D maze environments under extreme sparse reward models.'
      ],
      'zh-TW': [
        '將 GAT (Graph Attention Network) 引入未知空間建模，顯著增強了對動態障礙物的避障特徵表徵力。',
        '在稀疏獎勵條件下，成功訓練無人機在未知 3D 迷宮環境中的導航路徑規劃。'
      ]
    },
    challenges: {
      en: [
        'Resolving agent policy deadlock during early training exploration.',
        'Minimizing path trajectory simulation gaps (Sim-to-Real mismatch).'
      ],
      'zh-TW': [
        '強化學習算法在稀疏獎勵下的冷啟動非常緩慢，容易陷入局部死鎖。',
        '如何保證在 Gazebo 虛擬環境中訓練出來的控制策略能較好地遷移（Sim-to-Real）到真實無人機。'
      ]
    },
    results: {
      en: [
        'Boosted target acquisition success rates by 34% compared to standard TD3 baselines.',
        'Reduced control cycle latency to under 25ms, optimizing paths by 12%.'
      ],
      'zh-TW': [
        '導航成功率相比傳統雙延遲深度確定性策略梯度 (TD3) 算法提升了 34%。',
        '路徑規劃長度優化了 12%，避障響應時間降低至 25ms 內。'
      ]
    },
    featured: true
  },
  {
    slug: 'thesis-code',
    title: {
      en: 'Master Thesis Code - CV & Video Modeling',
      'zh-TW': '碩士學術研究代碼 - 電腦視覺與生成模型'
    },
    subtitle: {
      en: 'Computer Vision & Unsupervised Generative Video Modeling',
      'zh-TW': '碩士畢業論文研究算法實作 - 影像特徵提取與生成式建模'
    },
    category: 'AI Research',
    role: {
      en: 'Lead Academic Researcher',
      'zh-TW': '主導研究員'
    },
    status: {
      en: 'Completed / Academic Submission',
      'zh-TW': '學術論文對應代碼'
    },
    description: {
      en: 'Core codebase of my master thesis, specializing in unsupervised video anomaly detection, spatiotemporal feature alignment, and Diffusion Transformers (DiT).',
      'zh-TW': '碩士論文核心代碼，專注於電腦視覺、多模態處理與生成式網絡，包含 Diffusion Transformer 結構設計與多尺度特徵提取算法。'
    },
    longDescription: {
      en: 'This repository contains code supporting our master thesis research on unsupervised video anomaly detection. We implemented feature extraction pipelines combined with Diffusion Transformers (DiT). The spatial-temporal framework reconstructs normal visual behaviors, identifying anomaly deviations based on score thresholds. This algorithm constitutes the core code for research submitted to IEEE Transactions on Multimedia.',
      'zh-TW': '此專案為作者於國立雲林科技大學碩士學位期間的核心研究代碼。研究旨在解決高密度視頻場景中的異常事件檢測與多模態目標跟踪。代碼庫封裝了特徵提取管道、Diffusion Transformer 生成框架、自注意力處理機制，以及跨維度多模態融合模組。該演算法是投稿於多媒體期刊 IEEE Transactions on Multimedia 之學術底層支撐。'
    },
    tags: ['Computer Vision', 'Deep Learning', 'Research', 'Thesis', 'Diffusion Transformer'],
    stack: ['Python', 'PyTorch', 'OpenCV', 'Transformer', 'CUDA', 'Docker'],
    links: {
      demo: null,
      repo: 'https://github.com/Neura-Shadow/Thesis_code',
      paper: null
    },
    highlights: {
      en: [
        'Constructed Diffusion Transformers (DiT) capturing video temporal continuity.',
        'Implemented feature dimensionality reduction for high-density streams.'
      ],
      'zh-TW': [
        '實現 Diffusion Transformer (DiT) 在視頻幀預測與異常檢測中的應用，提升生成影像的時序一致性。',
        '開發高性能多維度特徵對齊模組，支持實時圖像流的降維特徵聚類。'
      ]
    },
    challenges: {
      en: [
        'Managing high memory allocations of 3D video tensors in transformers.',
        'Countering edge blurring in frame predictions using specialized loss thresholds.'
      ],
      'zh-TW': [
        '三維視頻張量在 Transformer 中的計算複雜度極高，記憶體佔用巨大。',
        '生成模型預測的邊界模糊問題，需要通過設計特定的頻域對比損失函數來解決。'
      ]
    },
    results: {
      en: [
        'Achieved state-of-the-art AUC scores on ped2 and Avenue public benchmarks.',
        'High real-time framerate throughput (>45 FPS) on single RTX 3090.'
      ],
      'zh-TW': [
        '在公共數據集 (UCSD Ped2, Avenue) 的異常檢測準確率 (AUC) 達到領先水平。',
        '支持單卡 RTX 3090 每秒處理超過 45 幀的高清視訊幀，滿足實時性要求。'
      ]
    },
    featured: true
  },
  {
    slug: 'scalable-ecommerce-platform',
    title: {
      en: 'Scalable E-Commerce Backend Platform',
      'zh-TW': '高可用高併發電商後端系統'
    },
    subtitle: {
      en: 'Microservice-based Scalable Cloud Native Platform',
      'zh-TW': '基於微服務與雲原生架構的高可用高併發電商系統'
    },
    category: 'Cloud Native',
    role: {
      en: 'Backend Architect / Developer',
      'zh-TW': '後端架構師 / 主要開發者'
    },
    status: {
      en: 'Active Development',
      'zh-TW': '活躍開發中'
    },
    description: {
      en: 'Decoupled Go microservices using Redis caching, Kafka queueing, and AWS EKS Kubernetes deployments to prevent race conditions during high-volume checkout rushes.',
      'zh-TW': '高可用、易擴展的電商後端系統，採用 Go 微服務架構，整合 Redis 緩存、Kafka 消息隊列與 AWS / Kubernetes 部署。'
    },
    longDescription: {
      en: 'Designed with cloud-native principles, the application splits traffic across distinct Go microservices: Auth, Catalog, Order, Stock, and Payment. Services communicate via gRPC, using Kafka events for queue buffering and decoupling asynchronous logging workflows. Persistent data layers map to PostgreSQL replication clusters. The cluster is integrated with Prometheus monitors and deployed to AWS EKS.',
      'zh-TW': '這是一個基於雲原生理念設計的電商後端項目。為了解決瞬時高併發搶購（秒殺）場景下的庫存超賣與數據一致性問題，項目拆分為用戶、商品、訂單、庫存、支付五個獨立的 Go 微服務。服務間通信採用 gRPC 協議，異步任務與日誌處理利用 Kafka 進行解耦與削峰。數據庫採用 PostgreSQL 主從架構，並搭配 Redis 緩存集群來保障極高的讀取速度。全系統實現了完整的 Prometheus 監控與 ELK 日誌收集，並通過 GitHub Actions 自動化打包成 Docker 鏡像，持續集成部署於 AWS EKS 集群。'
    },
    tags: ['Backend', 'Microservices', 'Scalable System', 'Cloud Native', 'Golang', 'Kafka'],
    stack: ['Golang', 'gRPC', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Kubernetes', 'AWS', 'Prometheus'],
    links: {
      demo: null,
      repo: 'https://github.com/Neura-Shadow/Scalable-E-Commerce-Platform',
      paper: null
    },
    featured: false
  },
  {
    slug: 'control-panel-advanced',
    title: {
      en: 'Advanced Swarm Control Dashboard',
      'zh-TW': '多載具遙測控制終端'
    },
    subtitle: {
      en: 'Real-time UAV Telemetry and Stream Visualizer',
      'zh-TW': '多載具實時遙測監控與控制儀表板'
    },
    category: 'UAV Systems',
    role: {
      en: 'Full-stack Engineer',
      'zh-TW': '全端開發工程師'
    },
    status: {
      en: 'Completed',
      'zh-TW': '已完成'
    },
    description: {
      en: 'Interactive Vue/Nuxt dashboard showing real-time Leaflet flight coordinates, telemetry indicators, and multiple ultra-low latency WebRTC video panels.',
      'zh-TW': '基於 Vue/Nuxt 的無人機遙測與即時影像高級儀表板。支持 Leaflet 地圖軌跡、即時狀態渲染與多畫面的低延遲視訊串流。'
    },
    longDescription: {
      en: 'Serves as the main operator interface for our heterogeneous swarm project. Leveraged reactive rendering and virtual scroll lists to support high-frequency telemetry inputs. Connects to WebRTC pipelines to display up to 4 simultaneous 720p streams.',
      'zh-TW': '此專案為「陸海空群組無人載具協同系統」的地面端核心可視化系統。由於遙測數據流密度極高，前端儀表板若未經優化極易產生界面卡頓。我們基於 Vue 3 Composition API 與 Pinia 實現了高效率的局部渲染與虛擬滾動列表，並整合 Leaflet 引擎來繪製無人機與工作車的即時動態軌跡。視頻流模組基於 WebRTC 信令服務器進行對接，支持單頁面同時播放 4 路 720p@30fps 監控影像。'
    },
    tags: ['Dashboard', 'Control Panel', 'Real-time UI', 'Vue/Nuxt', 'WebRTC'],
    stack: ['Nuxt.js', 'Vue 3', 'TypeScript', 'Leaflet', 'WebRTC', 'Tailwind CSS', 'Pinia'],
    links: {
      demo: null,
      repo: 'https://github.com/Neura-Shadow/control_panel_advanced',
      paper: null
    },
    featured: false
  },
  {
    slug: 'analysis-website',
    title: {
      en: 'Data Analysis & Visualizer Platform',
      'zh-TW': '資料分析與動態可視化平台'
    },
    subtitle: {
      en: 'Experimental Data Analyzer Web App',
      'zh-TW': '實驗數據分析與動態可視化平台'
    },
    category: 'Full-stack',
    role: {
      en: 'Full-stack Developer',
      'zh-TW': '全端開發者'
    },
    status: {
      en: 'Completed',
      'zh-TW': '已完成'
    },
    description: {
      en: 'Web platform processing millions of JSON/CSV telemetry data rows. Outputs statistics features and renders charts using Go and Nuxt.',
      'zh-TW': '專為複雜實驗數據設計的動態可視化平台，提供折線圖、熱力圖、分佈圖等分析，支援多種數據格式導入與自動化報告生成。'
    },
    longDescription: {
      en: 'Designed to parse large laboratory CSV/JSON files, the backend uses Go to compute statistics arrays. The front-end leverages Nuxt.js and ECharts to render responsive visualizations.',
      'zh-TW': '這是一個用於實驗室和研發團隊快速匯入、分析實驗數據的網頁平台。後端採用 Go 快速處理高達數百萬行的 CSV/JSON 數據包，並輸出結構化的統計特徵。前端利用 Nuxt.js 與 ECharts 庫，動態渲染豐富的交互式圖表。支持數據篩選、多維度對比、異常值高亮，並可一鍵導出 PDF 分析報告。'
    },
    tags: ['Web', 'Data Analysis', 'Visualization', 'Go', 'Nuxt.js'],
    stack: ['Go', 'Nuxt.js', 'Vue 3', 'ECharts', 'Tailwind CSS', 'PostgreSQL'],
    links: {
      demo: null,
      repo: 'https://github.com/Neura-Shadow/Analysis_website',
      paper: null
    },
    featured: false
  },
  {
    slug: 'face-detect-realtime',
    title: {
      en: 'Real-time Face Detection & Recognition',
      'zh-TW': '實時人臉檢測與特徵標定'
    },
    subtitle: {
      en: 'Edge Computer Vision Inference System',
      'zh-TW': '基於電腦視覺的實時人臉檢測與特徵標定'
    },
    category: 'Computer Vision',
    role: {
      en: 'Developer',
      'zh-TW': '開發者'
    },
    status: {
      en: 'Completed',
      'zh-TW': '已完成'
    },
    description: {
      en: 'Low-latency face detection pipelines leveraging OpenCV DNN modules and MobileNet-SSD running on edge devices (Raspberry Pi).',
      'zh-TW': '利用 OpenCV 與輕量卷積神經網絡 (CNN) 實現的極低延遲實時人臉檢測與人臉特徵比對系統。'
    },
    longDescription: {
      en: 'Evaluates the performance of CNN weights deployed on limited computing architectures. Leveraged OpenCV DNN pipelines to run MobileNet-SSD layers, maintaining >20 FPS on edge processors.',
      'zh-TW': '本項目展示了在邊緣計算設備上流暢運行人臉檢測的可行性。後端基於 C++ 與 OpenCV 的 DNN 模組加載 MobileNet-SSD 模型進行人臉定位，並使用特徵臉法 (Eigenfaces) 進行實時人臉識別比對。優化了多線程採集和解碼管道，在樹莓派等低算力平台上實現了 20+ FPS 的實時檢測。'
    },
    tags: ['Computer Vision', 'Real-time Detection', 'AI', 'OpenCV'],
    stack: ['C++', 'Python', 'OpenCV', 'MobileNet-SSD', 'CMake'],
    links: {
      demo: null,
      repo: 'https://github.com/Neura-Shadow/Face_Detect_Realtime',
      paper: null
    },
    featured: false
  },
  {
    slug: 'blogs',
    title: {
      en: 'Legacy Vue 2 Blog Platform',
      'zh-TW': '舊版 Vue 2 網誌平台'
    },
    subtitle: {
      en: 'Firebase-hosted Vue 2 SPA (Predecessor)',
      'zh-TW': '專案重構前身 - 基於 Vue 2 與 Firebase 的部落格網站'
    },
    category: 'Full-stack',
    role: {
      en: 'Full-stack Developer',
      'zh-TW': '全端開發者'
    },
    status: {
      en: 'Legacy / Replaced',
      'zh-TW': '歷史專案 / 已被取代'
    },
    description: {
      en: 'The legacy predecessor blog site written in Vue 2, utilizing Vuex and Firebase Auth/Firestore services, now modernized into this Nuxt 3 SSG framework.',
      'zh-TW': '使用 Vue 2 / Vue CLI / Firebase / Vuex 開發的動態 Blog 平台，是目前 Nuxt 3 重構案的原生專案。'
    },
    longDescription: {
      en: 'Represented our first iteration of blogging system, integrated with Firebase endpoints for authentication and Quill editor plugins for drafting posts. The core content features have been migrated locally to Markdown nodes inside this Nuxt 3 codebase.',
      'zh-TW': '這是重構前身的部落格專案，核心基於 Vue 2 與 Vuex 進行狀態控制。後端完全託管於 Google Firebase，包括 Firestore 資料庫、Firebase Authentication 會員認證以及 Firebase Storage 封面圖存儲。前端搭配 Vue2-Editor (Quill) 提供富文本編輯器，支持管理員新增、編輯與刪除部落格文章。目前該專案的所有功能與歷史，正在整合為當前的 Nuxt 3 + Markdown 靜態/SSR 部落格系統。'
    },
    tags: ['Vue 2', 'Firebase', 'Blog', 'Legacy Migration'],
    stack: ['Vue 2', 'Vuex', 'Vue Router', 'Firebase (Auth/Firestore/Storage)', 'Quill Editor', 'Sass'],
    links: {
      demo: null,
      repo: 'https://github.com/Neura-Shadow/Blogs',
      paper: null
    },
    featured: false
  }
]
