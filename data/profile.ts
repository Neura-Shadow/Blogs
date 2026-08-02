import type { Profile } from '~/types/project'

export const profileData: Profile = {
  name: 'Lu Tsung-Hsin',
  chineseName: '呂宗昕',
  title: {
    en: 'Embedded Linux & Distributed Real-Time Systems Developer',
    'zh-TW': 'Embedded Linux 與分散式即時系統開發者'
  },
  capabilityLine: {
    en: 'High-Concurrency Go Backend · Cloud-Native Architecture · Nuxt Full-Stack · NVIDIA Jetson / Edge AI · ROS 2 · UAV Systems · Computer Vision',
    'zh-TW': '高併發 Go 後端 · 雲原生架構 · Nuxt 全端 · NVIDIA Jetson / Edge AI · ROS 2 · 無人載具系統 · 電腦視覺'
  },
  summary: {
    en: 'I build high-concurrency distributed and real-time systems that connect Go backend services, Nuxt full-stack interfaces, Embedded Linux edge devices, ROS 2 communication, and AI inference pipelines.\n\nIn implementation-oriented NSTC applied R&D projects, I have been responsible, within my assigned scope, for architecture development and system integration across heterogeneous UAV, USV, and UGV platforms. My work includes operator interfaces, telemetry backends, MAVLink–MQTT communication, WebRTC video paths, and containerized services.\n\nMy current engineering focus includes camera ingestion with V4L2 and GStreamer, OpenCV processing, PyTorch-to-ONNX conversion, TensorRT edge inference, ROS 2 node-based pipelines, and MQTT or socket telemetry integration.\n\nSeparately from these NSTC projects, I have conducted independent image-processing and computer-vision research, with related work submitted to IEEE Transactions on Multimedia.',
    'zh-TW': '我專注於建構高併發、分散式與即時系統，整合 Go 後端服務、Nuxt 全端介面、Embedded Linux 邊緣裝置、ROS 2 通訊與 AI 推論管線。\n\n在偏實作與系統整合的國科會應用型研發計畫中，我在所負責的範圍內承擔異質 UAV、USV 與 UGV 系統的架構開發與整合，涵蓋操作介面、遙測後端、MAVLink–MQTT 通訊、WebRTC 視訊流程與容器化服務。\n\n目前的工程方向包含 V4L2 與 GStreamer 相機擷取、OpenCV 影像處理、PyTorch 轉 ONNX、TensorRT 邊緣推論、ROS 2 節點化管線，以及 MQTT 或 Socket 遙測整合。\n\n此外，我另有獨立於上述國科會計畫的影像處理與電腦視覺研究，相關成果已投稿至 IEEE Transactions on Multimedia。'
  },
  email: 'zongxinlu43@gmail.com',
  phone: null,
  location: 'Taiwan',
  website: 'https://github.com/Neura-Shadow',
  github: 'https://github.com/Neura-Shadow',
  linkedin: 'https://www.linkedin.com/in/tsung-hsin-lu-541476233/',
  education: [
    {
      institution: { en: 'National Yunlin University of Science and Technology', 'zh-TW': '國立雲林科技大學' },
      degree: { en: 'Master of Science in Computer Science and Information Engineering', 'zh-TW': '資訊工程系 碩士' },
      period: '2023-06 ~ 2026-06',
      gpa: 'GPA 4.0'
    }
  ],
  skills: [
    {
      category: { en: 'Cloud Native & Backend', 'zh-TW': '雲原生與後端' },
      icon: 'server',
      skills: [
        { name: { en: 'Go', 'zh-TW': 'Go' }, status: 'project-applied', description: { en: 'Concurrent services, transactional workflows, workers, and guarded distributed-system prototypes.', 'zh-TW': '應用於高併發服務、交易流程、背景工作與具防護邊界的分散式系統原型。' } },
        { name: { en: 'Python', 'zh-TW': 'Python' }, status: 'project-applied', description: { en: 'Research pipelines, data processing, robotics adapters, and Flask services.', 'zh-TW': '應用於研究管線、資料處理、機器人介接與 Flask 服務。' } },
        { name: { en: 'REST API', 'zh-TW': 'REST API' }, status: 'project-applied', description: { en: 'Resource-oriented APIs with validation, authorization boundaries, and stable error handling.', 'zh-TW': '具驗證、授權邊界與穩定錯誤處理的資源導向 API。' } },
        { name: { en: 'PostgreSQL / Redis', 'zh-TW': 'PostgreSQL／Redis' }, status: 'project-applied', description: { en: 'Transactional state, caching, streams, admission control, and idempotent workflows.', 'zh-TW': '應用於交易狀態、快取、串流、流量准入與冪等工作流程。' } },
        { name: { en: 'Docker', 'zh-TW': 'Docker' }, status: 'project-applied', description: { en: 'Repeatable local and CI environments for backend and full-stack systems.', 'zh-TW': '建立後端與全端系統可重現的本機及 CI 環境。' } },
        { name: { en: 'Kubernetes', 'zh-TW': 'Kubernetes' }, status: 'working-knowledge', description: { en: 'Deployment, service discovery, ingress, and operational concepts without a production-cluster claim.', 'zh-TW': '理解部署、服務發現、Ingress 與營運概念，不宣稱生產叢集經驗。' } },
        { name: { en: 'CI/CD', 'zh-TW': 'CI/CD' }, status: 'project-applied', description: { en: 'Automated tests, linting, builds, release checks, and container-oriented delivery gates.', 'zh-TW': '應用自動化測試、lint、建置、發布檢查與容器交付關卡。' } },
        { name: { en: 'Event-Driven / High Concurrency', 'zh-TW': '事件驅動／高併發' }, status: 'project-applied', description: { en: 'Outbox foundations, consumers, telemetry ingestion, workers, and contention-aware service design.', 'zh-TW': '涵蓋 outbox 基礎、consumer、遙測擷取、worker 與具競爭意識的服務設計。' } }
      ]
    },
    {
      category: { en: 'Full-Stack & Real-Time Systems', 'zh-TW': '全端與即時系統' },
      icon: 'layout-dashboard',
      skills: [
        { name: { en: 'Nuxt 3 / Vue 3', 'zh-TW': 'Nuxt 3／Vue 3' }, status: 'project-applied', description: { en: 'SSR-safe pages, reusable components, content flows, and bilingual application interfaces.', 'zh-TW': '應用於 SSR-safe 頁面、可重用元件、內容流程與雙語介面。' } },
        { name: { en: 'TypeScript', 'zh-TW': 'TypeScript' }, status: 'project-applied', description: { en: 'Typed UI state, API contracts, content models, and validation-oriented tooling.', 'zh-TW': '應用於型別化 UI 狀態、API 合約、內容模型與驗證工具。' } },
        { name: { en: 'Tailwind CSS', 'zh-TW': 'Tailwind CSS' }, status: 'project-applied', description: { en: 'Responsive layouts, design tokens, accessible states, and maintainable component styling.', 'zh-TW': '應用於響應式版面、設計 token、無障礙狀態與可維護元件樣式。' } },
        { name: { en: 'Supabase', 'zh-TW': 'Supabase' }, status: 'project-applied', description: { en: 'Auth, PostgreSQL CRUD, Storage, RLS-aware server routes, and safe local fallback paths.', 'zh-TW': '應用 Auth、PostgreSQL CRUD、Storage、考量 RLS 的 server route 與安全本機 fallback。' } },
        { name: { en: 'MQTT', 'zh-TW': 'MQTT' }, status: 'project-applied', description: { en: 'Publish/subscribe telemetry boundaries for heterogeneous vehicle system integration.', 'zh-TW': '應用於異質載具系統整合的發布／訂閱遙測邊界。' } },
        { name: { en: 'WebRTC', 'zh-TW': 'WebRTC' }, status: 'project-applied', description: { en: 'Browser-oriented video and real-time communication paths in sanitized project work.', 'zh-TW': '應用於已去敏專案中的瀏覽器視訊與即時通訊路徑。' } },
        { name: { en: 'WebSocket', 'zh-TW': 'WebSocket' }, status: 'working-knowledge', description: { en: 'Bidirectional browser communication and live dashboard update patterns.', 'zh-TW': '理解雙向瀏覽器通訊與即時儀表板更新模式。' } },
        { name: { en: 'Dashboard Integration', 'zh-TW': '儀表板整合' }, status: 'project-applied', description: { en: 'Operator-facing status, telemetry, media, and command-and-control interfaces.', 'zh-TW': '應用於面向操作人員的狀態、遙測、媒體與指揮控制介面。' } }
      ]
    },
    {
      category: { en: 'Embedded Linux & Edge AI', 'zh-TW': 'Embedded Linux 與邊緣 AI' },
      icon: 'cpu',
      skills: [
        { name: { en: 'NVIDIA Jetson / JetPack', 'zh-TW': 'NVIDIA Jetson／JetPack' }, status: 'current-focus', description: { en: 'Deployment-oriented study for Jetson-class edge devices; no production deployment is claimed.', 'zh-TW': '以 Jetson 類型邊緣裝置為目標的部署導向學習，不宣稱生產部署。' } },
        { name: { en: 'Embedded Linux / Ubuntu', 'zh-TW': 'Embedded Linux／Ubuntu' }, status: 'current-focus', description: { en: 'Device runtime, process, permission, networking, and service integration concerns.', 'zh-TW': '聚焦裝置 runtime、process、權限、網路與服務整合議題。' } },
        { name: { en: 'V4L2', 'zh-TW': 'V4L2' }, status: 'current-focus', description: { en: 'Linux camera capture controls and device-to-pipeline ingestion boundaries.', 'zh-TW': '聚焦 Linux 相機擷取控制與裝置至管線的輸入邊界。' } },
        { name: { en: 'GStreamer', 'zh-TW': 'GStreamer' }, status: 'current-focus', description: { en: 'Composable camera, decode, conversion, and streaming pipelines for edge vision.', 'zh-TW': '聚焦邊緣視覺的相機、解碼、轉換與串流管線。' } },
        { name: { en: 'OpenCV', 'zh-TW': 'OpenCV' }, status: 'research-applied', description: { en: 'Image preprocessing, video analysis, face-detection prototypes, and research workflows.', 'zh-TW': '應用於影像前處理、視訊分析、人臉偵測原型與研究流程。' } },
        { name: { en: 'Multithreading / Socket', 'zh-TW': '多執行緒／Socket' }, status: 'project-applied', description: { en: 'Concurrent processing and telemetry transport patterns across backend and vehicle systems.', 'zh-TW': '應用於後端與載具系統的併行處理及遙測傳輸模式。' } },
        { name: { en: 'Docker on Edge Devices', 'zh-TW': '邊緣裝置上的 Docker' }, status: 'current-focus', description: { en: 'Reproducible device services with hardware-aware runtime and image constraints.', 'zh-TW': '聚焦考量硬體 runtime 與映像限制的可重現裝置服務。' } },
        { name: { en: 'Device Runtime Profiling', 'zh-TW': '裝置 Runtime 效能剖析' }, status: 'current-focus', description: { en: 'Instrumentation plans for latency, utilization, memory, power, temperature, and dropped frames.', 'zh-TW': '規劃延遲、使用率、記憶體、功耗、溫度與掉幀的量測方法。' } }
      ]
    },
    {
      category: { en: 'ROS 2 & Robotics Middleware', 'zh-TW': 'ROS 2 與機器人中介軟體' },
      icon: 'network',
      skills: [
        { name: { en: 'ROS 2 Nodes / Topics', 'zh-TW': 'ROS 2 節點／Topics' }, status: 'current-focus', description: { en: 'Node-based camera, inference, control, and telemetry boundaries with topic-oriented data flow.', 'zh-TW': '聚焦節點化相機、推論、控制與遙測邊界，以及 topic 導向資料流。' } },
        { name: { en: 'Services / Launch', 'zh-TW': 'Services／Launch' }, status: 'current-focus', description: { en: 'One-time operations and coordinated startup configuration across multiple nodes.', 'zh-TW': '聚焦一次性操作與多節點協同啟動設定。' } },
        { name: { en: 'Actions / Lifecycle Nodes', 'zh-TW': 'Actions／生命週期節點' }, status: 'planned-extension', description: { en: 'Planned patterns for cancellable tasks and managed node state transitions.', 'zh-TW': '規劃用於可取消任務與受管理節點狀態轉換的模式。' } },
        { name: { en: 'DDS / QoS', 'zh-TW': 'DDS／QoS' }, status: 'working-knowledge', description: { en: 'Reliability, history, queue depth, and distributed transport trade-offs per message path.', 'zh-TW': '理解各訊息路徑的可靠性、歷史、佇列深度與分散式傳輸取捨。' } },
        { name: { en: 'rosbag2', 'zh-TW': 'rosbag2' }, status: 'planned-extension', description: { en: 'Planned sensor and inference recording for repeatable pipeline analysis.', 'zh-TW': '規劃記錄感測與推論資料，供可重現管線分析使用。' } },
        { name: { en: 'cv_bridge / sensor_msgs/Image', 'zh-TW': 'cv_bridge／sensor_msgs/Image' }, status: 'planned-extension', description: { en: 'Planned ROS image message and OpenCV conversion boundary.', 'zh-TW': '規劃 ROS 影像訊息與 OpenCV 轉換邊界。' } },
        { name: { en: 'image_transport', 'zh-TW': 'image_transport' }, status: 'planned-extension', description: { en: 'Planned image transport options for bandwidth-aware robotics pipelines.', 'zh-TW': '規劃用於考量頻寬的機器人影像傳輸選項。' } },
        { name: { en: 'ROS 2-style Adapters', 'zh-TW': 'ROS 2 風格 Adapters' }, status: 'research-applied', description: { en: 'Guarded adapter boundaries in the digital-twin UAV research framework.', 'zh-TW': '應用於數位孿生無人機研究框架中的 guarded adapter 邊界。' } }
      ]
    },
    {
      category: { en: 'Edge AI Deployment & Computer Vision', 'zh-TW': '邊緣 AI 部署與電腦視覺' },
      icon: 'scan-eye',
      skills: [
        { name: { en: 'PyTorch', 'zh-TW': 'PyTorch' }, status: 'research-applied', description: { en: 'Training and evaluation workflows for video anomaly detection and navigation research.', 'zh-TW': '應用於視訊異常偵測與導航研究的訓練及評估流程。' } },
        { name: { en: 'ONNX', 'zh-TW': 'ONNX' }, status: 'current-focus', description: { en: 'Model export and compatibility checks along a future edge deployment path.', 'zh-TW': '聚焦未來邊緣部署路徑中的模型匯出與相容性檢查。' } },
        { name: { en: 'TensorRT / FP16', 'zh-TW': 'TensorRT／FP16' }, status: 'current-focus', description: { en: 'Jetson-oriented inference optimization study; no measured acceleration is claimed.', 'zh-TW': '聚焦 Jetson 導向推論最佳化，不宣稱已量測加速成果。' } },
        { name: { en: 'INT8 Quantization', 'zh-TW': 'INT8 量化' }, status: 'planned-extension', description: { en: 'Planned calibration and accuracy validation before any acceleration claim.', 'zh-TW': '規劃先完成校準與準確度驗證，再評估加速成果。' } },
        { name: { en: 'Image Preprocessing', 'zh-TW': '影像前處理' }, status: 'research-applied', description: { en: 'Frame transforms, normalization, feature preparation, and video sampling workflows.', 'zh-TW': '應用影格轉換、正規化、特徵準備與視訊取樣流程。' } },
        { name: { en: 'Video Inference Pipeline', 'zh-TW': '視訊推論管線' }, status: 'prototype', description: { en: 'Legacy and research prototypes for frame ingestion, processing, and result handling.', 'zh-TW': '用於影格輸入、處理與結果處置的舊作及研究原型。' } },
        { name: { en: 'Latency / FPS Profiling', 'zh-TW': '延遲／FPS 效能剖析' }, status: 'current-focus', description: { en: 'Measurement design for end-to-end and inference latency without invented benchmark values.', 'zh-TW': '規劃端到端與推論延遲量測，不使用虛構 benchmark 數值。' } },
        { name: { en: 'GPU / Memory / Thermal Profiling', 'zh-TW': 'GPU／記憶體／熱度剖析' }, status: 'current-focus', description: { en: 'Measurement design for utilization, memory, power, and long-running temperature.', 'zh-TW': '規劃使用率、記憶體、功耗與長時間溫度量測。' } }
      ]
    },
    {
      category: { en: 'UAV, Autonomous Systems & Research', 'zh-TW': '無人載具、自主系統與研究' },
      icon: 'route',
      skills: [
        { name: { en: 'UAV Navigation / Sparse-Reward DRL', 'zh-TW': 'UAV 導航／稀疏獎勵 DRL' }, status: 'research-applied', description: { en: 'Planning and learning workflows within simulation and explicitly guarded research boundaries.', 'zh-TW': '應用於模擬環境與明確 guarded 研究邊界內的規劃及學習流程。' } },
        { name: { en: 'World Models / Digital Twins', 'zh-TW': '世界模型／數位孿生' }, status: 'research-applied', description: { en: 'Graph world models, replay, readiness, and simulator adapter architecture.', 'zh-TW': '應用圖世界模型、replay、readiness 與模擬器 adapter 架構。' } },
        { name: { en: 'MAVLink', 'zh-TW': 'MAVLink' }, status: 'project-applied', description: { en: 'Vehicle telemetry and command boundaries in sanitized heterogeneous-system integration.', 'zh-TW': '應用於已去敏異質系統整合的載具遙測與命令邊界。' } },
        { name: { en: 'PX4 SITL', 'zh-TW': 'PX4 SITL' }, status: 'research-applied', description: { en: 'Simulation integration only; no real hardware flight validation is claimed.', 'zh-TW': '僅限模擬整合，不宣稱真實硬體飛行驗證。' } },
        { name: { en: 'MAVSDK', 'zh-TW': 'MAVSDK' }, status: 'research-applied', description: { en: 'Guarded optional integration path with runtime gates and mock-first behavior.', 'zh-TW': '具 runtime gate 與 mock-first 行為的 guarded 選用整合路徑。' } },
        { name: { en: 'Multi-Agent Coordination', 'zh-TW': '多智能體協作' }, status: 'research-applied', description: { en: 'Coordination models and heterogeneous vehicle system boundaries in research and private work.', 'zh-TW': '應用於研究與私人專案中的協作模型及異質載具系統邊界。' } },
        { name: { en: 'Safety-Gated Control', 'zh-TW': '安全閘控' }, status: 'prototype', description: { en: 'Default-deny and runtime-gated research paths without certified-safety claims.', 'zh-TW': '採 default-deny 與 runtime-gated 研究路徑，不宣稱安全認證。' } },
        { name: { en: 'Computer Vision Research', 'zh-TW': '電腦視覺研究' }, status: 'research-applied', description: { en: 'Video modeling, anomaly detection, multimodal alignment, and submitted research work.', 'zh-TW': '應用於視訊建模、異常偵測、多模態對齊與已投稿研究。' } }
      ]
    }
  ],
  research: [
    {
      kind: 'applied-rd',
      title: { en: 'NSTC Applied R&D & System Integration', 'zh-TW': '國科會應用型研發與系統整合' },
      description: { en: 'Implementation- and system-integration-oriented work on heterogeneous UAV, USV, and UGV platforms, covering architecture development, operator interfaces, telemetry backends, MAVLink–MQTT communication, WebRTC video paths, and containerized services.', 'zh-TW': '以實作與系統整合為導向的國科會應用型研發工作，涵蓋異質 UAV、USV 與 UGV 平台的架構開發、操作介面、遙測後端、MAVLink–MQTT 通訊、WebRTC 視訊流程與容器化服務。' },
      link: null,
      tags: ['UAV Swarm', 'MAVLink-MQTT', 'WebRTC', 'System Integration']
    },
    {
      kind: 'independent-research',
      title: { en: 'Independent Image-Processing Research — IEEE TMM Submission', 'zh-TW': '獨立影像處理研究 — IEEE TMM 投稿' },
      description: { en: 'Independent image-processing and computer-vision research conducted separately from the NSTC projects described above. Related work has been submitted to IEEE Transactions on Multimedia.', 'zh-TW': '獨立進行的影像處理與電腦視覺研究，並非上述國科會計畫的衍生成果；相關成果已投稿至 IEEE Transactions on Multimedia。' },
      link: null,
      status: { en: 'Submitted', 'zh-TW': '已投稿' },
      tags: ['Computer Vision', 'Multi-modal Processing', 'Academic Submission']
    }
  ]
}
