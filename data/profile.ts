import type { Profile } from '~/types/project'

export const profileData: Profile = {
  name: 'Lu Tsung-Hsin',
  chineseName: '呂宗昕',
  title: {
    en: 'Cloud Native Backend Engineer · Full-stack Developer · AI Research Engineer · UAV Swarm System Architect',
    'zh-TW': '雲原生後端工程師 · 全端開發者 · AI 研究工程師 · 無人機群組系統架構師'
  },
  summary: {
    en: 'Focused on cloud architecture and high-concurrency systems, with extensive experience in Golang backend, Nuxt.js full-stack development, Kubernetes, Docker, and CI/CD pipelines. Possesses deep capabilities in AI research and system deployment. Actively contributed to and led large-scale research projects funded by the National Science and Technology Council (NSTC), including "Cybersecurity Experimental Field Integration" and "Development and Application of Heterogeneous UAV/USV/UGV Swarm Collaborative Systems". Deeply interested in computer vision, Vision-Language Navigation (VLN), multi-modal AI, and Deep Reinforcement Learning (DRL) for UAV navigation, with research findings submitted to IEEE Transactions on Multimedia. Dedicated to translating cutting-edge AI research into production-grade, highly available, and maintainable software systems.',
    'zh-TW': '專注於雲端架構與高併發系統，熟悉 Golang 後端、Nuxt.js 全端開發、Kubernetes、Docker 與 CI/CD 自動化流程。具備 AI 研究與系統落地能力，參與並主導國科會大型專案，包括「複合式資安研究與類真實實驗場域」以及「陸海空群組無人載具異質協同系統技術之研發與應用」。同時深耕影像處理、VLN、多模態 AI、DRL 與 UAV navigation，研究成果已投稿於 IEEE Transactions on Multimedia。目標是將前瞻 AI 演算法轉化為高可用、可部署、可維運的生產級系統。'
  },
  email: 'lutsunghsin@gmail.com', // TODO: user can customize this if needed
  phone: null, // TODO: user can customize this if needed
  location: 'Taiwan',
  website: 'https://github.com/Neura-Shadow',
  github: 'https://github.com/Neura-Shadow',
  linkedin: 'https://www.linkedin.com/in/tsung-hsin-lu-541476233/',
  education: [
    {
      institution: {
        en: 'National Yunlin University of Science and Technology',
        'zh-TW': '國立雲林科技大學'
      },
      degree: {
        en: 'Master of Science in Computer Science and Information Engineering',
        'zh-TW': '資訊工程系 碩士'
      },
      period: '2023-06 ~ 2026-06',
      gpa: 'GPA 4.0'
    }
  ],
  skills: [
    {
      category: {
        en: 'Cloud Native & Backend',
        'zh-TW': '雲原生與後端'
      },
      skills: [
        {
          name: 'Golang',
          level: 'Expert',
          description: {
            en: 'Used for building high-concurrency backend services and robust microservice architectures.',
            'zh-TW': '用於構建高併發後端服務與微服務架構。'
          }
        },
        {
          name: 'Python',
          level: 'Expert',
          description: {
            en: 'Used for deep learning research, data processing pipelines, and Flask microservices.',
            'zh-TW': '用於深度學習研究與 Flask 微服務開發。'
          }
        },
        {
          name: 'Kubernetes',
          level: 'Advanced',
          description: {
            en: 'Orchestrating container services, cluster management, ingress routing, and auto-scaling.',
            'zh-TW': '服務部署、負載均衡與叢集管理。'
          }
        },
        {
          name: 'Docker',
          level: 'Expert',
          description: {
            en: 'Containerizing applications for environmental consistency across development and production.',
            'zh-TW': '容器化封裝與環境一致性部署。'
          }
        },
        {
          name: 'CI/CD',
          level: 'Advanced',
          description: {
            en: 'Automated testing and deployment pipelines using GitHub Actions and container registries.',
            'zh-TW': '自動化測試與 GitHub Actions 流水線佈署。'
          }
        },
        {
          name: 'Flask / REST API',
          level: 'Expert',
          description: {
            en: 'Designing microservice core modules and high-performance API endpoints.',
            'zh-TW': '微服務核心模組與接口設計。'
          }
        }
      ]
    },
    {
      category: {
        en: 'Full-stack & Real-time Systems',
        'zh-TW': '全端與實時系統'
      },
      skills: [
        {
          name: 'Nuxt.js / Vue 3',
          level: 'Expert',
          description: {
            en: 'Full-stack web development, client-side state management, and reusable interactive UI components.',
            'zh-TW': '全端網頁開發、狀態管理與動態組件。'
          }
        },
        {
          name: 'TypeScript',
          level: 'Advanced',
          description: {
            en: 'Exposing type safety across front-end logic interfaces and database schemas.',
            'zh-TW': '強型別前端邏輯與系統介面定義。'
          }
        },
        {
          name: 'MQTT',
          level: 'Expert',
          description: {
            en: 'Low-latency pub/sub messaging broker implementation for UAV swarm telemetry.',
            'zh-TW': '無人載具遙測低延遲發布/訂閱協議。'
          }
        },
        {
          name: 'WebRTC',
          level: 'Advanced',
          description: {
            en: 'Real-time ultra-low latency video streaming and telemetry communication channels.',
            'zh-TW': '無人載具超低延遲即時視訊/控制串流。'
          }
        },
        {
          name: 'Tailwind CSS',
          level: 'Expert',
          description: {
            en: 'Building custom, responsive layouts with maximum design flexibility and fluid style structures.',
            'zh-TW': '快速構建高度客製化與美觀的響應式網頁。'
          }
        },
        {
          name: 'Firebase',
          level: 'Intermediate',
          description: {
            en: 'Rapid prototyping, cloud authentication modules, and real-time database endpoints.',
            'zh-TW': '快速原型開發、身份認證與即時資料庫。'
          }
        }
      ]
    },
    {
      category: {
        en: 'AI / Computer Vision & Research',
        'zh-TW': 'AI 與電腦視覺研究'
      },
      skills: [
        {
          name: 'Deep Reinforcement Learning (DRL)',
          level: 'Advanced',
          description: {
            en: 'Designing path planning, obstacle avoidance, and multi-agent coordination models (PPO, TD3).',
            'zh-TW': '無人機導航、避障策略與多智能體協同 (PPO, DDPG)。'
          }
        },
        {
          name: 'Vision-Language Navigation (VLN)',
          level: 'Advanced',
          description: {
            en: 'Combining LLM spatial logic and multi-modal models for target-oriented navigation.',
            'zh-TW': '結合 LLM 與多模態視覺指引的導航系統。'
          }
        },
        {
          name: 'Diffusion Transformers',
          level: 'Intermediate',
          description: {
            en: 'Generative modeling and temporal representation algorithms for video anomaly detection.',
            'zh-TW': '生成式建模與影像/視訊異常偵測。'
          }
        },
        {
          name: 'Graph Attention Networks (GAT)',
          level: 'Advanced',
          description: {
            en: 'Applying graph attention mechanisms to capture spatial topological relationship structures.',
            'zh-TW': '基於圖注意力機制的空間特徵提取。'
          }
        },
        {
          name: 'Computer Vision',
          level: 'Expert',
          description: {
            en: 'Real-time image processing, object detection (YOLO), and feature tracking algorithms.',
            'zh-TW': '實時影像處理、目標偵測 (YOLO) 與特徵匹配。'
          }
        },
        {
          name: 'IEEE TMM Submission Experience',
          level: 'Expert',
          description: {
            en: 'Writing and submitted research results to IEEE Transactions on Multimedia.',
            'zh-TW': '學術論文寫作，研究成果已投稿於 IEEE Transactions on Multimedia。'
          }
        }
      ]
    },
    {
      category: {
        en: 'UAV / System Architecture',
        'zh-TW': '無人機與系統架構'
      },
      skills: [
        {
          name: 'MAVLink',
          level: 'Expert',
          description: {
            en: 'Industry-standard telemetry communication protocol for vehicle control and status feedback.',
            'zh-TW': '開源無人機遙測通訊協議，狀態監控與航點控制。'
          }
        },
        {
          name: 'MAVLink-MQTT Bridge',
          level: 'Expert',
          description: {
            en: 'Bridging high-frequency telemetry streams into scalable backend cloud services.',
            'zh-TW': '將無人機遙測資料橋接至高併發雲端後端。'
          }
        },
        {
          name: 'Heterogeneous Swarm System',
          level: 'Expert',
          description: {
            en: 'Coordinating cooperative swarm layouts across unmanned planes (UAV), boats (USV), and cars (UGV).',
            'zh-TW': '陸海空 (UAV / USV / UGV) 異質載具協作系統架構。'
          }
        },
        {
          name: 'PX4 & ROS2',
          level: 'Advanced',
          description: {
            en: 'Integrating flight control stacks with Robot Operating System nodes for simulations.',
            'zh-TW': '無人機飛控系統整合與機器人操作系統模擬。'
          }
        },
        {
          name: 'Gazebo Simulation',
          level: 'Advanced',
          description: {
            en: 'Building precise physical simulation environments to validate navigation algorithm behaviors.',
            'zh-TW': '物理模擬環境構建與演算法驗證。'
          }
        },
        {
          name: 'Cybersecurity Fields',
          level: 'Advanced',
          description: {
            en: 'Evaluating communication vulnerabilities and defenses in NSTC experimental field designs.',
            'zh-TW': '國科會複合式資安實驗場域的異質系統防禦設計。'
          }
        }
      ]
    }
  ],
  research: [
    {
      title: {
        en: 'Research submitted to IEEE Transactions on Multimedia',
        'zh-TW': '研究成果投稿於 IEEE Transactions on Multimedia'
      },
      description: {
        en: 'Research findings on computer vision, multi-modal alignment, and spatio-temporal representations submitted to IEEE Transactions on Multimedia.',
        'zh-TW': '關於電腦視覺、多模態對齊與時空特徵表徵的研究成果已投稿於多媒體領域頂尖期刊 IEEE Transactions on Multimedia。'
      },
      link: null, // TODO: add IEEE paper link if available
      tags: ['Computer Vision', 'Multi-modal Processing', 'Academic Submission']
    },
    {
      title: {
        en: 'Development and Application of Heterogeneous UAV/USV/UGV Swarm Collaborative Systems (NSTC Project)',
        'zh-TW': '陸海空群組無人載具異質協同系統技術之研發與應用 (國科會大型計畫)'
      },
      description: {
        en: 'Served as the main system architect. Developed collaborative swarm layouts coordinating aerial, surface, and ground vehicles with low-latency telemetry paths.',
        'zh-TW': '擔任主要架構負責人，開發包含無人機、無人船、無人車的協同控制系統，實踐低延遲遙測資料流與跨領域決策鏈。'
      },
      link: null,
      tags: ['UAV Swarm', 'MAVLink-MQTT', 'WebRTC', 'Kubernetes']
    },
    {
      title: {
        en: 'Cybersecurity Research and Realistic Experimental Fields (NSTC Project)',
        'zh-TW': '複合式資安研究與類真實實驗場域 (國科會專案)'
      },
      description: {
        en: 'Integrated telemetry validation modules to analyze vulnerabilities and enforce network defenses across swarm communications.',
        'zh-TW': '參與實驗場域系統整合，確保高併發遙測資料處理的安全防禦，進行異質載具通訊資安漏洞分析與加固。'
      },
      link: null,
      tags: ['Cybersecurity', 'System Integration', 'Telemetry Security']
    }
  ]
}
