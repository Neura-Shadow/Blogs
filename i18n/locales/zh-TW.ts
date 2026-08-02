export const zhTW = {
  nav: {
    home: '首頁',
    projects: '專案作品',
    blog: '技術部落格',
    about: '關於我',
    contact: '聯絡方式'
  },
  hero: {
    hello: '你好，我是',
    name: '呂宗昕',
    chineseName: 'Lu Tsung-Hsin',
    viewProjects: '瀏覽作品集',
    downloadResume: '下載履歷檔案',
    calloutsLabel: '經驗與研究重點',
    nstcLabel: '國科會應用型研發',
    nstcText: '在所負責範圍內，負責異質 UAV／USV／UGV 平台的整體系統架構開發與整合。',
    researchLabel: '獨立電腦視覺研究',
    researchText: '此影像處理研究獨立於國科會計畫，相關成果已投稿至 IEEE Transactions on Multimedia。',
    evidence: {
      label: '證據狀態',
      project: '專案應用系統',
      research: '研究應用管線',
      focus: '邊緣 AI／ROS 2 目前方向'
    },
    stats: {
      experience: '後端系統',
      projects: '全端作品集',
      research: 'IEEE TMM 投稿',
      openSource: '公開 repositories'
    }
  },
  projects: {
    title: '精選專案作品',
    description: '依 repository 證據整理的後端、全端、研究與原型作品，並標示目前範圍與狀態。',
    viewAll: '瀏覽所有專案',
    searchPlaceholder: '輸入標籤或名稱搜尋專案...',
    allCategories: '全部',
    categoryBackend: '後端系統',
    categoryEdgeAI: '邊緣 AI',
    categoryRobotics: '機器人研究',
    categoryUAV: '無人載具系統',
    categoryAI: 'AI 演算法研究',
    categoryCloud: '雲原生 backend',
    categoryFullStack: '全端開發',
    categoryVision: '電腦視覺',
    categoryLegacy: '舊作 / 封存',
    backToProjects: '返回專案列表',
    matrixTitle: '專案矩陣細節',
    role: '擔任角色',
    status: '計畫狀態',
    stack: '主要技術棧',
    resources: '專案資源連結',
    codeRepo: 'GitHub 原始碼庫',
    liveDemo: '線上演示連結',
    researchPaper: '學術論文連結',
    overview: '專案概述',
    highlights: '已實作範圍',
    challenges: '面對的技術挑戰',
    results: '目前成果',
    loadError: '無法載入專案',
    loadErrorDesc: '專案請求未能完成；遠端來源無法使用時，系統仍會嘗試本機作品集資料。',
    tryAgain: '再試一次',
    notFound: '未找到該專案',
    notFoundDesc: '您所請求的專案路徑不存在於目前的作品集庫中。',
    returnToProjects: '返回專案歸檔頁'
  },
  skills: {
    title: '核心能力',
    description: '四個相互連結的核心領域，涵蓋分散式後端、邊緣 AI、機器人中介層與即時介面。',
    viewDetailed: '查看完整技術能力',
    groups: {
      distributedBackend: {
        title: '分散式後端與雲端系統',
        description: '高併發服務、交易流程、事件處理與容器化交付。'
      },
      embeddedEdge: {
        title: 'Embedded Linux 與邊緣 AI',
        description: '相機擷取、影像處理、模型轉換與邊緣執行環境整合。'
      },
      rosAutonomy: {
        title: 'ROS 2 與自主系統',
        description: '分散式機器人通訊、模擬、載具遙測與安全閘門導航。'
      },
      fullStackRealtime: {
        title: '全端與即時介面',
        description: '雙語網頁介面、儀表板、遙測視覺化與即時通訊。'
      }
    }
  },
  research: {
    title: '研究與學術成果',
    description: '以不同項目分別呈現偏實作的國科會應用型研發，以及獨立進行的影像處理研究。',
    appliedLabel: '應用型研發',
    independentLabel: '獨立研究',
    statusSubmitted: '已投稿'
  },
  blog: {
    title: '技術紀錄與文章',
    description: '整理雲原生系統、機器人工程、AI engineering 與系統整合的工程筆記、架構 walkthrough 與實作紀錄。',
    searchPlaceholder: '搜尋文章...',
    allCategories: '全部',
    catArchitecture: '系統架構',
    catRoboticsEngineering: '機器人工程',
    catAIEngineering: 'AI 工程',
    catCloudNative: '雲原生',
    catSystemIntegration: '系統整合',
    readTime: '分鐘',
    readFull: '閱讀全文',
    backToArticles: '返回文章列表',
    onThisPage: '文章目錄導覽',
    notFound: '未找到該文章',
    notFoundDesc: '您所請求的文章不存在或尚未開放。',
    draftDisclaimer: '草稿文件說明：這是一篇可編輯的技術文章範本。您可以直接在專案目錄修改 content/blog/'
  },
  about: {
    title: '關於我',
    metaTitle: '關於我 · Embedded Linux 與分散式即時系統',
    metaDescription: 'Embedded Linux、分散式即時系統、國科會應用型研發、獨立電腦視覺研究、Edge AI、ROS 2 與證據導向能力。',
    downloadCV: '下載完整履歷 (PDF)',
    education: '教育背景學歷',
    researchInterests: '主要研究興趣',
    technicalMap: '技術星圖',
    capabilitiesTitle: '完整能力與證據清單',
    capabilitiesDescription: '保留六個領域的完整技術、證據狀態、實作脈絡，以及目前或規劃中的工程範圍。',
    edgeSystemsTitle: 'Embedded Linux 與分散式即時系統',
    evidenceBoundaryTitle: '證據邊界',
    evidenceBoundaryDescription: '此架構屬於目前工程方向；具 source 與 runtime 證據後，才會新增專屬 Jetson 專案。',
    researchBoundaryEyebrow: '兩類清楚分流的工作',
    researchBoundaryTitle: '應用型系統整合與獨立研究',
    researchBoundaryDescription: '偏實作的國科會計畫與 IEEE TMM 影像處理投稿，在範圍、狀態與視覺呈現上均明確分開。',
    independentResearchClarification: '此影像處理研究為獨立研究，並非上述國科會計畫的衍生成果。',
    architectureTitle: '邊緣視覺參考管線',
    architectureDescription: '從相機擷取，經 ROS 2 訊息邊界與邊緣推論，延伸至控制、視覺化與雲端遙測的模組化路徑。',
    referenceArchitecture: '參考架構',
    rosResponsibilitiesTitle: 'ROS 2 職責對照',
    rosResponsibilitiesDescription: '依介面劃分職責並標示目前證據狀態；規劃項目不描述為已完成實作。',
    component: '元件',
    purpose: '用途',
    capabilityStatus: '目前狀態',
    qosTitle: '典型 QoS 設定範例',
    qosDescription: '以下是不同訊息路徑的實用起點，不是通用規則；仍需依實際網路、感測速率與安全邊界驗證。',
    qos: {
      reliability: '可靠性',
      history: '歷史策略',
      depth: '佇列深度'
    },
    profilingTitle: '效能剖析能力',
    profilingDescription: '量測規劃涵蓋管線、裝置與 ROS 2 傳輸行為；只有在可重現執行後才顯示數值。',
    noBenchmarks: '沒有量測證據時，不宣稱任何 benchmark 數值。',
    collaborations: '學術與產業合作洽談',
    collabDesc: '歡迎針對後端系統、邊緣 AI 部署、ROS 2 整合、電腦視覺與自主系統研究進行 evidence-driven 合作。',
    navContact: '前往聯絡我頁面'
  },
  contact: {
    title: '聯絡我',
    description: '有任何問題、技術交流或是合作機會？歡迎透過下方表單留言，或直接使用社群媒體與我聯絡。',
    emailMe: '電子信箱',
    linkedin: 'LinkedIn 領英',
    github: 'GitHub 帳號',
    sendMessage: '傳送線上訊息',
    name: '您的稱呼',
    namePlaceholder: '請輸入您的姓名',
    email: '電子信箱',
    emailPlaceholder: '請輸入您的聯絡 Email',
    message: '訊息內容',
    messagePlaceholder: '請在此輸入您的留言訊息...',
    submitBtn: '傳送訊息',
    offlineAlert: '（Phase 1 靜態展示階段表單未連接資料庫。請直接透過上方 Email 郵件聯絡我。）'
  },
  footer: {
    rights: '保留所有權利。',
    poweredBy: '基於 Nuxt 3 & Inspira UI 技術開發'
  },
  three: {
    pipelineKicker: '分散式邊緣管線',
    pipelineTitle: '從感測到決策的系統',
    currentFocus: '目前方向',
    input: '輸入',
    processing: '處理',
    output: '輸出',
    messageFlow: 'ROS 2 topics · QoS-aware 路徑',
    profileCore: '系統能力核心',
    profileCoreDescription: '雲端服務、邊緣推論與機器人整合',
    profileBackend: '後端系統',
    profileEdgeAi: '邊緣 AI',
    profileRobotics: 'ROS 2／無人載具'
  }
}
