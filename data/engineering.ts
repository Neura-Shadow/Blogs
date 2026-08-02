import type {
  ArchitectureStep,
  CapabilityStatus,
  Multilingual,
  ProjectFilter,
  QosExample,
  RosResponsibility
} from '~/types/project'

export const capabilityStatusLabels: Record<CapabilityStatus, Multilingual> = {
  'project-applied': { en: 'Project Applied', 'zh-TW': '專案應用' },
  'research-applied': { en: 'Research Applied', 'zh-TW': '研究應用' },
  prototype: { en: 'Prototype', 'zh-TW': '工程原型' },
  'working-knowledge': { en: 'Working Knowledge', 'zh-TW': '實務理解' },
  'current-focus': { en: 'Current Focus', 'zh-TW': '目前方向' },
  'planned-extension': { en: 'Planned Extension', 'zh-TW': '規劃延伸' }
}

export const projectFilters: ProjectFilter[] = [
  { id: 'all', label: { en: 'All', 'zh-TW': '全部' }, matchTerms: [] },
  { id: 'backend', label: { en: 'Backend Systems', 'zh-TW': '後端系統' }, matchTerms: ['backend systems', 'cloud native'] },
  { id: 'edge-ai', label: { en: 'Edge AI', 'zh-TW': '邊緣 AI' }, matchTerms: ['edge ai', 'edge deployment', 'tensorRT', 'onnx', 'jetson', 'gstreamer'] },
  { id: 'robotics', label: { en: 'Robotics Research', 'zh-TW': '機器人研究' }, matchTerms: ['robotics research', 'ros 2', 'ros2', 'digital twin'] },
  { id: 'uav', label: { en: 'UAV Systems', 'zh-TW': '無人載具系統' }, matchTerms: ['uav systems', 'uav', 'mavlink', 'px4'] },
  { id: 'full-stack', label: { en: 'Full-Stack', 'zh-TW': '全端系統' }, matchTerms: ['full-stack', 'operator ui', 'nuxt'] },
  { id: 'ai', label: { en: 'AI Research', 'zh-TW': 'AI 研究' }, matchTerms: ['ai research', 'world model', 'diffusion transformer'] },
  { id: 'vision', label: { en: 'Computer Vision', 'zh-TW': '電腦視覺' }, matchTerms: ['computer vision', 'video anomaly detection', 'face recognition'] },
  { id: 'legacy', label: { en: 'Legacy / Archive', 'zh-TW': '舊作／封存' }, matchTerms: ['legacy / archive'] }
]

export const projectCategoryLabels: Record<string, Multilingual> = {
  'Backend Systems': { en: 'Backend Systems', 'zh-TW': '後端系統' },
  'Robotics Research': { en: 'Robotics Research', 'zh-TW': '機器人研究' },
  'UAV Systems': { en: 'UAV Systems', 'zh-TW': '無人載具系統' },
  'Full-Stack': { en: 'Full-Stack', 'zh-TW': '全端系統' },
  'AI Research': { en: 'AI Research', 'zh-TW': 'AI 研究' },
  'Computer Vision': { en: 'Computer Vision', 'zh-TW': '電腦視覺' },
  'Legacy / Archive': { en: 'Legacy / Archive', 'zh-TW': '舊作／封存' }
}

export const researchTagLabels: Record<string, Multilingual> = {
  'Computer Vision': { en: 'Computer Vision', 'zh-TW': '電腦視覺' },
  'Multi-modal Processing': { en: 'Multi-modal Processing', 'zh-TW': '多模態處理' },
  'Academic Submission': { en: 'Academic Submission', 'zh-TW': '學術投稿' },
  'UAV Swarm': { en: 'UAV Swarm', 'zh-TW': '無人載具群組' },
  'System Integration': { en: 'System Integration', 'zh-TW': '系統整合' },
  Cybersecurity: { en: 'Cybersecurity', 'zh-TW': '資安' },
  'Telemetry Security': { en: 'Telemetry Security', 'zh-TW': '遙測安全' }
}

export const edgeArchitectureSteps: ArchitectureStep[] = [
  { id: 'camera', lane: 'input', shortLabel: { en: 'Camera', 'zh-TW': '相機' }, label: { en: 'Camera / RGB-D Sensor', 'zh-TW': '相機／RGB-D 感測器' } },
  { id: 'capture', lane: 'input', shortLabel: { en: 'Capture', 'zh-TW': '擷取' }, label: { en: 'GStreamer / V4L2 Capture', 'zh-TW': 'GStreamer／V4L2 擷取' } },
  { id: 'camera-node', lane: 'processing', shortLabel: { en: 'ROS 2 Camera', 'zh-TW': 'ROS 2 相機' }, label: { en: 'ROS 2 Camera Node', 'zh-TW': 'ROS 2 相機節點' } },
  { id: 'preprocess', lane: 'processing', shortLabel: { en: 'Preprocess', 'zh-TW': '前處理' }, label: { en: 'OpenCV Preprocessing Node', 'zh-TW': 'OpenCV 影像前處理節點' } },
  { id: 'inference', lane: 'processing', shortLabel: { en: 'ONNX / TensorRT', 'zh-TW': 'ONNX／TensorRT' }, label: { en: 'ONNX / TensorRT Inference Node', 'zh-TW': 'ONNX／TensorRT 推論節點' } },
  { id: 'decision', lane: 'output', shortLabel: { en: 'Decision', 'zh-TW': '決策' }, label: { en: 'Decision / Control', 'zh-TW': '決策／控制' } },
  { id: 'visualization', lane: 'output', shortLabel: { en: 'Visualization', 'zh-TW': '視覺化' }, label: { en: 'Detection Visualization', 'zh-TW': '偵測結果視覺化' } },
  { id: 'gateway', lane: 'output', shortLabel: { en: 'MQTT / Socket', 'zh-TW': 'MQTT／Socket' }, label: { en: 'MQTT / Socket Gateway', 'zh-TW': 'MQTT／Socket 閘道' } },
  { id: 'dashboard', lane: 'output', shortLabel: { en: 'Dashboard', 'zh-TW': '儀表板' }, label: { en: 'Dashboard / Cloud', 'zh-TW': '儀表板／雲端' } }
]

export const rosResponsibilities: RosResponsibility[] = [
  { id: 'node', component: 'Node', status: 'current-focus', label: { en: 'Node', 'zh-TW': '節點' }, description: { en: 'Separate camera, inference, and control modules.', 'zh-TW': '分離相機、推論與控制模組。' } },
  { id: 'topic', component: 'Topic', status: 'current-focus', label: { en: 'Topic', 'zh-TW': '主題' }, description: { en: 'Stream images, detections, and sensor data.', 'zh-TW': '串流影像、偵測結果與感測資料。' } },
  { id: 'service', component: 'Service', status: 'current-focus', label: { en: 'Service', 'zh-TW': '服務' }, description: { en: 'Handle one-time operations such as switching a model.', 'zh-TW': '處理切換模型等一次性操作。' } },
  { id: 'action', component: 'Action', status: 'planned-extension', label: { en: 'Action', 'zh-TW': '動作' }, description: { en: 'Represent long-running cancellable tasks with feedback.', 'zh-TW': '表示可取消且能回傳進度的長時間任務。' } },
  { id: 'dds', component: 'DDS', status: 'working-knowledge', label: { en: 'DDS', 'zh-TW': 'DDS' }, description: { en: 'Provide distributed communication transport.', 'zh-TW': '提供分散式通訊傳輸層。' } },
  { id: 'qos', component: 'QoS', status: 'current-focus', label: { en: 'QoS', 'zh-TW': 'QoS' }, description: { en: 'Control reliability, history, and queues per data path.', 'zh-TW': '依資料路徑控制可靠性、歷史與佇列。' } },
  { id: 'cv-bridge', component: 'cv_bridge', status: 'planned-extension', label: { en: 'cv_bridge', 'zh-TW': 'cv_bridge' }, description: { en: 'Convert between ROS image messages and OpenCV matrices.', 'zh-TW': '轉換 ROS 影像訊息與 OpenCV 矩陣。' } },
  { id: 'rosbag2', component: 'rosbag2', status: 'planned-extension', label: { en: 'rosbag2', 'zh-TW': 'rosbag2' }, description: { en: 'Record and replay sensor and inference data.', 'zh-TW': '記錄並重播感測與推論資料。' } },
  { id: 'launch', component: 'Launch', status: 'current-focus', label: { en: 'Launch', 'zh-TW': 'Launch' }, description: { en: 'Start and configure multiple nodes together.', 'zh-TW': '共同啟動並設定多個節點。' } },
  { id: 'lifecycle', component: 'Lifecycle Node', status: 'planned-extension', label: { en: 'Lifecycle Node', 'zh-TW': '生命週期節點' }, description: { en: 'Initialize, activate, stop, and recover managed nodes.', 'zh-TW': '初始化、啟用、停止與復原受管理節點。' } }
]

export const qosExamples: QosExample[] = [
  {
    id: 'image-stream',
    title: { en: 'Low-latency image stream', 'zh-TW': '低延遲影像串流' },
    description: { en: 'A typical starting point when the newest frame matters more than retransmission.', 'zh-TW': '當最新畫面比重傳更重要時，可採用的典型起點。' },
    settings: [
      { key: 'reliability', value: { en: 'Best Effort', 'zh-TW': 'Best Effort' } },
      { key: 'history', value: { en: 'Keep Last', 'zh-TW': '保留最新資料' } },
      { key: 'depth', value: { en: '1', 'zh-TW': '1' } }
    ]
  },
  {
    id: 'control-command',
    title: { en: 'Reliable control command', 'zh-TW': '可靠控制命令' },
    description: { en: 'A typical starting point for commands that should not be silently dropped.', 'zh-TW': '對不應無聲遺失的控制命令，可採用的典型起點。' },
    settings: [
      { key: 'reliability', value: { en: 'Reliable', 'zh-TW': 'Reliable' } },
      { key: 'history', value: { en: 'Keep Last', 'zh-TW': '保留最新資料' } },
      { key: 'depth', value: { en: '10', 'zh-TW': '10' } }
    ]
  }
]

export const profilingMetrics: Array<{ id: string; label: Multilingual }> = [
  { id: 'end-to-end-latency', label: { en: 'End-to-end latency', 'zh-TW': '端到端延遲' } },
  { id: 'inference-latency', label: { en: 'Model inference latency', 'zh-TW': '模型推論延遲' } },
  { id: 'fps', label: { en: 'FPS', 'zh-TW': '每秒影格數' } },
  { id: 'cpu', label: { en: 'CPU utilization', 'zh-TW': 'CPU 使用率' } },
  { id: 'gpu', label: { en: 'GPU utilization', 'zh-TW': 'GPU 使用率' } },
  { id: 'memory', label: { en: 'Memory usage', 'zh-TW': '記憶體使用量' } },
  { id: 'power', label: { en: 'Power consumption', 'zh-TW': '功耗' } },
  { id: 'temperature', label: { en: 'Long-running temperature', 'zh-TW': '長時間運行溫度' } },
  { id: 'dropped-frames', label: { en: 'Dropped frames', 'zh-TW': '掉幀數' } },
  { id: 'topic-frequency', label: { en: 'ROS 2 topic frequency', 'zh-TW': 'ROS 2 topic 頻率' } },
  { id: 'message-delay', label: { en: 'Message delay', 'zh-TW': '訊息延遲' } }
]

export const currentEngineeringFocus = {
  title: { en: 'Current Engineering Focus', 'zh-TW': '目前工程方向' },
  description: {
    en: 'A deployment-oriented learning path that connects Embedded Linux camera input, ROS 2 message boundaries, OpenCV processing, ONNX / TensorRT inference, and remote telemetry. It is presented as current focus, not as a completed Jetson deployment.',
    'zh-TW': '以部署為導向的工程學習路徑，串接 Embedded Linux 相機輸入、ROS 2 訊息邊界、OpenCV 處理、ONNX／TensorRT 推論與遠端遙測；此處標示為目前方向，不代表已完成 Jetson 部署。'
  }
}
