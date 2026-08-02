export const en = {
  nav: {
    home: 'Home',
    projects: 'Projects',
    blog: 'Blog',
    about: 'About',
    contact: 'Contact'
  },
  hero: {
    hello: "Hello, I'm",
    name: "Lu Tsung-Hsin",
    chineseName: "呂宗昕",
    viewProjects: 'View Projects',
    downloadResume: 'Download Resume',
    calloutsLabel: 'Experience and research highlights',
    nstcLabel: 'NSTC Applied R&D',
    nstcText: 'Responsible, within my assigned scope, for overall system architecture development and integration across heterogeneous UAV, USV, and UGV platforms.',
    researchLabel: 'Independent Computer Vision Research',
    researchText: 'Image-processing research conducted separately from the NSTC projects; related work has been submitted to IEEE Transactions on Multimedia.',
    evidence: {
      label: 'Evidence status',
      project: 'Project-applied systems',
      research: 'Research-applied pipelines',
      focus: 'Edge AI / ROS 2 current focus'
    },
    stats: {
      experience: 'Backend Systems',
      projects: 'Full-stack Portfolio',
      research: 'IEEE TMM Submission',
      openSource: 'Public Repositories'
    }
  },
  projects: {
    title: 'Featured Projects',
    description: 'Selected backend, full-stack, research, and prototype work with repository-backed scope and status.',
    viewAll: 'View all projects',
    searchPlaceholder: 'Search projects by tag or name...',
    allCategories: 'All',
    categoryBackend: 'Backend Systems',
    categoryEdgeAI: 'Edge AI',
    categoryRobotics: 'Robotics Research',
    categoryUAV: 'UAV Systems',
    categoryAI: 'AI Research',
    categoryCloud: 'Cloud Native',
    categoryFullStack: 'Full-stack',
    categoryVision: 'Computer Vision',
    categoryLegacy: 'Legacy / Archive',
    backToProjects: 'Back to projects',
    matrixTitle: 'Project Matrix',
    role: 'Role',
    status: 'Status',
    stack: 'Primary Stack',
    resources: 'Resources',
    codeRepo: 'GitHub Repository',
    liveDemo: 'Live Demo',
    researchPaper: 'Research Paper',
    overview: 'Project Overview',
    highlights: 'Implemented Scope',
    challenges: 'Technical Challenges',
    results: 'Current Outcomes',
    loadError: 'Unable to Load Project',
    loadErrorDesc: 'The project request could not be completed. The local catalog remains available when the remote source is unavailable.',
    tryAgain: 'Try again',
    notFound: 'Project Not Found',
    notFoundDesc: 'The requested project URL does not match any current portfolio archives.',
    returnToProjects: 'Return to projects'
  },
  skills: {
    title: 'Core Capabilities',
    description: 'Four connected domains spanning distributed backend systems, edge AI, robotics middleware, and real-time interfaces.',
    viewDetailed: 'View detailed stack',
    groups: {
      distributedBackend: {
        title: 'Distributed Backend & Cloud Systems',
        description: 'High-concurrency services, transactional workflows, event processing, and containerized delivery.'
      },
      embeddedEdge: {
        title: 'Embedded Linux & Edge AI',
        description: 'Camera ingestion, image processing, model conversion, and edge-runtime integration.'
      },
      rosAutonomy: {
        title: 'ROS 2 & Autonomous Systems',
        description: 'Distributed robotics communication, simulation, vehicle telemetry, and safety-gated navigation.'
      },
      fullStackRealtime: {
        title: 'Full-Stack & Real-Time Interfaces',
        description: 'Bilingual web interfaces, dashboards, telemetry visualization, and real-time communication.'
      }
    }
  },
  research: {
    title: 'Research & Academic Highlights',
    description: 'Implementation-oriented NSTC applied R&D and independent image-processing research are presented as separate bodies of work.',
    appliedLabel: 'Applied R&D',
    independentLabel: 'Independent research',
    statusSubmitted: 'Submitted'
  },
  blog: {
    title: 'Technical Log & Articles',
    description: 'Engineering notes, system design walkthroughs, and implementation logs across cloud-native systems, robotics, AI engineering, and integration work.',
    searchPlaceholder: 'Search articles...',
    allCategories: 'All',
    catArchitecture: 'Architecture',
    catRoboticsEngineering: 'Robotics Engineering',
    catAIEngineering: 'AI Engineering',
    catCloudNative: 'Cloud Native',
    catSystemIntegration: 'System Integration',
    readTime: 'read',
    readFull: 'Read full article',
    backToArticles: 'Back to articles',
    onThisPage: 'On this page',
    notFound: 'Article Not Found',
    notFoundDesc: 'The requested article could not be found or is not available yet.',
    draftDisclaimer: 'Draft Document: This is a templated article placeholder. You can edit this file in your workspace under content/blog/'
  },
  about: {
    title: 'About Me',
    metaTitle: 'About · Embedded Linux and Distributed Real-Time Systems',
    metaDescription: 'Embedded Linux, distributed real-time systems, NSTC applied R&D, independent computer-vision research, Edge AI, ROS 2, and evidence-based capabilities.',
    downloadCV: 'Download Full CV (PDF)',
    education: 'Education Background',
    researchInterests: 'Research Interests',
    technicalMap: 'Technical Map',
    capabilitiesTitle: 'Detailed Capability Inventory',
    capabilitiesDescription: 'The complete six-domain view retains evidence status, implementation context, and current or planned engineering scope.',
    edgeSystemsTitle: 'Embedded Linux & Distributed Real-Time Systems',
    evidenceBoundaryTitle: 'Evidence boundary',
    evidenceBoundaryDescription: 'This architecture is a current engineering focus. A dedicated Jetson project will be added only after source and runtime evidence are available.',
    researchBoundaryEyebrow: 'Two distinct bodies of work',
    researchBoundaryTitle: 'Applied system integration and independent research',
    researchBoundaryDescription: 'The implementation-oriented NSTC projects and the IEEE TMM image-processing submission are intentionally separated in scope, status, and presentation.',
    independentResearchClarification: 'This image-processing research was conducted independently and is not derived from the NSTC projects described above.',
    architectureTitle: 'Edge vision reference pipeline',
    architectureDescription: 'A modular path from camera capture through ROS 2 message boundaries and edge inference to control, visualization, and cloud-facing telemetry.',
    referenceArchitecture: 'Reference architecture',
    rosResponsibilitiesTitle: 'ROS 2 responsibility map',
    rosResponsibilitiesDescription: 'Responsibilities are separated by interface and labeled with their present evidence status. Planned items are not presented as completed implementation.',
    component: 'Component',
    purpose: 'Purpose',
    capabilityStatus: 'Current status',
    qosTitle: 'Typical QoS configuration examples',
    qosDescription: 'These are practical starting points for different message paths, not universal rules. They must be validated against the actual network, sensor rate, and safety boundary.',
    qos: {
      reliability: 'Reliability',
      history: 'History',
      depth: 'Depth'
    },
    profilingTitle: 'Performance profiling capability',
    profilingDescription: 'The measurement plan covers pipeline, device, and ROS 2 transport behavior. Values are shown only after a repeatable run exists.',
    noBenchmarks: 'No benchmark values are claimed without measured evidence.',
    collaborations: 'Collaborations & Inquiries',
    collabDesc: 'Open to evidence-driven collaboration across backend systems, Edge AI deployment, ROS 2 integration, computer vision, and autonomous-systems research.',
    navContact: 'Navigate to Contact Page'
  },
  contact: {
    title: 'Get in Touch',
    description: 'Have a question or want to collaborate? Drop me a message below or contact me directly through my social channels.',
    emailMe: 'Email Me',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    sendMessage: 'Send a Message',
    name: 'Name',
    namePlaceholder: 'Enter your name',
    email: 'Email',
    emailPlaceholder: 'Enter your email address',
    message: 'Message',
    messagePlaceholder: 'Write your message here...',
    submitBtn: 'Send Message',
    offlineAlert: '(Form submission is currently offline. Please contact me directly via email.)'
  },
  footer: {
    rights: 'All rights reserved.',
    poweredBy: 'Powered by Nuxt 3 & Inspira UI'
  },
  three: {
    pipelineKicker: 'Distributed edge pipeline',
    pipelineTitle: 'Sensor to decision system',
    currentFocus: 'Current Focus',
    input: 'Input',
    processing: 'Processing',
    output: 'Output',
    messageFlow: 'ROS 2 topics · QoS-aware paths',
    profileCore: 'Systems Profile',
    profileCoreDescription: 'Cloud services, edge inference, and robotics integration',
    profileBackend: 'Backend Systems',
    profileEdgeAi: 'Edge AI',
    profileRobotics: 'ROS 2 / UAV'
  }
}
