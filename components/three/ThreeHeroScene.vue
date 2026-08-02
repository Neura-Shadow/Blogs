<template>
  <div
    ref="hostRef"
    data-testid="three-hero-scene"
    :data-pointer-active="pointerActive ? 'true' : 'false'"
    class="relative h-[390px] w-full max-w-[500px] overflow-hidden rounded-2xl border border-light-border bg-[#F6F1E8]/90 shadow-[0_28px_90px_rgba(31,30,27,0.10)] dark:border-dark-border dark:bg-dark-surface/55 sm:h-[480px] lg:h-[500px] xl:h-[660px]"
    @pointermove="handlePointerMove"
    @pointerleave="resetPointer"
  >
    <canvas ref="canvasRef" class="absolute inset-0 h-full w-full" aria-hidden="true" />

    <div v-if="showFallback" class="static-pipeline absolute inset-0" aria-hidden="true">
      <div class="static-board">
        <span v-for="index in 6" :key="index" />
      </div>
      <div class="static-route static-route-left" />
      <div class="static-route static-route-right" />
    </div>

    <div class="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-3 sm:inset-x-5 sm:top-5">
      <div>
        <p class="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-accent">
          {{ t('three.pipelineKicker') }}
        </p>
        <p class="mt-1 text-sm font-semibold text-neutral-700 dark:text-neutral-200">
          {{ t('three.pipelineTitle') }}
        </p>
      </div>
      <span class="rounded-full border border-amber-300/70 bg-amber-50/90 px-2.5 py-1 text-[11px] font-semibold text-amber-800 dark:border-amber-800/50 dark:bg-amber-950/40 dark:text-amber-300">
        {{ t('three.currentFocus') }}
      </span>
    </div>

    <div class="pointer-events-none absolute inset-x-3 bottom-4 grid grid-cols-3 gap-2 sm:inset-x-5 sm:bottom-5 sm:gap-3">
      <div v-for="lane in lanes" :key="lane.id" class="min-w-0 rounded-xl border border-white/80 bg-white/78 p-2.5 shadow-sm backdrop-blur-[2px] dark:border-white/10 dark:bg-dark-bg/72 sm:p-3">
        <p class="mb-2 text-[10px] font-bold uppercase tracking-[0.13em] text-neutral-400 sm:text-[11px]">
          {{ lane.label }}
        </p>
        <div class="space-y-1.5">
          <p v-for="step in lane.steps" :key="step.id" class="flex min-h-8 items-center rounded-md border border-light-border/80 bg-[#FCFAF6]/90 px-2 py-1.5 text-[10px] font-semibold leading-4 text-neutral-650 dark:border-dark-border dark:bg-dark-surface/85 dark:text-neutral-300 sm:text-xs">
            {{ step.shortLabel[locale] }}
          </p>
        </div>
      </div>
    </div>

    <div class="pointer-events-none absolute left-4 top-[82px] flex items-center gap-2 rounded-full border border-brand-accent/15 bg-white/70 px-2.5 py-1 text-[10px] font-semibold text-neutral-500 backdrop-blur-sm dark:bg-dark-bg/65 dark:text-neutral-400 sm:left-5 sm:top-[92px] sm:text-[11px]">
      <span class="h-1.5 w-1.5 rounded-full bg-brand-accent" />
      {{ t('three.messageFlow') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from '~/composables/useI18n'
import { edgeArchitectureSteps } from '~/data/engineering'

const { locale, t } = useI18n()

const hostRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const showFallback = ref(true)
const pointerActive = ref(false)

const lanes = computed(() => [
  { id: 'input', label: t('three.input'), steps: edgeArchitectureSteps.filter(step => step.lane === 'input') },
  { id: 'processing', label: t('three.processing'), steps: edgeArchitectureSteps.filter(step => step.lane === 'processing') },
  { id: 'output', label: t('three.output'), steps: edgeArchitectureSteps.filter(step => step.lane === 'output') }
])

let renderer: any = null
let scene: any = null
let camera: any = null
let rootGroup: any = null
let board: any = null
let resizeObserver: ResizeObserver | null = null
let animationFrameId: number | null = null
let clock: any = null
let packets: any[] = []
let nodeMeshes: any[] = []
let raycaster: any = null
let pointerNdc: any = null
let hoveredNode: any = null
let isPaused = false
let isReducedMotion = true
let isMobile = false
let scrollDepth = 0
let isMounted = false
const pointer = { x: 0, y: 0 }

const canUseWebGL = () => {
  try {
    const testCanvas = document.createElement('canvas')
    return Boolean(window.WebGLRenderingContext && (testCanvas.getContext('webgl2') || testCanvas.getContext('webgl')))
  } catch {
    return false
  }
}

const resizeScene = () => {
  if (!hostRef.value || !renderer || !camera) return
  const width = hostRef.value.clientWidth
  const height = hostRef.value.clientHeight
  if (!width || !height) return
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
  renderer.setSize(width, height, false)
}

const addNode = (THREE: typeof import('three'), position: [number, number, number], color: number, shape: 'box' | 'sphere' = 'box') => {
  const geometry = shape === 'sphere'
    ? new THREE.SphereGeometry(0.09, isMobile ? 12 : 20, isMobile ? 8 : 14)
    : new THREE.BoxGeometry(0.18, 0.18, 0.12)
  const node = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color, roughness: 0.48, metalness: 0.08 }))
  node.position.set(...position)
  node.userData.baseY = position[1]
  rootGroup.add(node)
  nodeMeshes.push(node)
  return node
}

const initScene = async () => {
  if (!canvasRef.value || !hostRef.value || isReducedMotion || !canUseWebGL()) {
    showFallback.value = true
    return
  }

  try {
    const THREE = await import('three')
    if (!isMounted || !canvasRef.value || !hostRef.value) return

  scene = new THREE.Scene()
  raycaster = new THREE.Raycaster()
  pointerNdc = new THREE.Vector2()
  camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
  camera.position.set(0, 0.3, 6.1)

  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    alpha: true,
    antialias: !isMobile,
    powerPreference: 'high-performance'
  })
  renderer.outputColorSpace = THREE.SRGBColorSpace
  showFallback.value = false

  rootGroup = new THREE.Group()
  rootGroup.position.y = 0.42
  scene.add(rootGroup)

  scene.add(new THREE.HemisphereLight(0xfffbf1, 0x8f9b97, 2.25))
  const key = new THREE.DirectionalLight(0xffedd0, 2.1)
  key.position.set(2.8, 3.4, 4.5)
  const teal = new THREE.PointLight(0x00a884, 1.55, 6)
  teal.position.set(-1.8, 0.4, 2.2)
  const amber = new THREE.PointLight(0xd59b43, 0.6, 4)
  amber.position.set(2, -0.5, 1.6)
  scene.add(key, teal, amber)

  board = new THREE.Group()
  const boardBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.62, 1.08, 0.24, 2, 2, 1),
    new THREE.MeshStandardMaterial({ color: 0xded7ca, roughness: 0.36, metalness: 0.12 })
  )
  board.add(boardBody)

  const processor = new THREE.Mesh(
    new THREE.BoxGeometry(0.66, 0.48, 0.12),
    new THREE.MeshStandardMaterial({ color: 0x3d4643, roughness: 0.42, metalness: 0.18, emissive: 0x003b31, emissiveIntensity: 0.34 })
  )
  processor.position.z = 0.18
  board.add(processor)

  const pinMaterial = new THREE.MeshStandardMaterial({ color: 0xb98b4d, roughness: 0.4, metalness: 0.4 })
  const pinCount = isMobile ? 4 : 8
  for (let index = 0; index < pinCount; index += 1) {
    const pin = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.1, 0.055), pinMaterial)
    const side = index % 2 === 0 ? -1 : 1
    pin.position.set(side * 0.88, -0.42 + Math.floor(index / 2) * 0.27, 0)
    board.add(pin)
  }
  rootGroup.add(board)

  const nodes = [
    addNode(THREE, [-2.05, 0.72, 0.1], 0x00a884, 'sphere'),
    addNode(THREE, [-2.15, -0.18, -0.05], 0x55716a),
    addNode(THREE, [2.05, 0.68, 0.05], 0xd59b43, 'sphere'),
    addNode(THREE, [2.18, -0.12, -0.08], 0x5e6ad2),
    addNode(THREE, [1.72, -0.86, 0.08], 0x00a884)
  ]

  const bestEffortPoints = [
    nodes[0].position, new THREE.Vector3(-0.82, 0.35, 0),
    nodes[1].position, new THREE.Vector3(-0.82, -0.16, 0)
  ]
  const reliablePoints = [
    new THREE.Vector3(0.82, 0.28, 0), nodes[2].position,
    new THREE.Vector3(0.82, 0, 0), nodes[3].position,
    new THREE.Vector3(0.68, -0.34, 0), nodes[4].position
  ]
  const bestEffortGeometry = new THREE.BufferGeometry().setFromPoints(bestEffortPoints)
  const dashedLine = new THREE.LineSegments(bestEffortGeometry, new THREE.LineDashedMaterial({ color: 0x57837a, transparent: true, opacity: 0.42, dashSize: 0.08, gapSize: 0.045 }))
  dashedLine.computeLineDistances()
  const reliableGeometry = new THREE.BufferGeometry().setFromPoints(reliablePoints)
  const reliableLine = new THREE.LineSegments(reliableGeometry, new THREE.LineBasicMaterial({ color: 0xc58b35, transparent: true, opacity: 0.46 }))
  rootGroup.add(dashedLine, reliableLine)

  const packetCount = isMobile ? 3 : 7
  for (let index = 0; index < packetCount; index += 1) {
    const packet = new THREE.Mesh(
      new THREE.SphereGeometry(0.038, 10, 8),
      new THREE.MeshBasicMaterial({ color: index % 3 === 0 ? 0xd59b43 : 0x00a884 })
    )
    packet.userData.offset = index / packetCount
    packet.userData.lane = index % 2
    rootGroup.add(packet)
    packets.push(packet)
  }

  clock = new THREE.Clock()
  resizeScene()
  resizeObserver = new ResizeObserver(resizeScene)
  resizeObserver.observe(hostRef.value)
  document.addEventListener('visibilitychange', handleVisibilityChange)
  window.addEventListener('scroll', handleScroll, { passive: true })
    startAnimation()
  } catch (error) {
    console.warn('[ThreeHeroScene] Interactive rendering unavailable; using the static pipeline.', error instanceof Error ? error.message : error)
    stopAnimation()
    resizeObserver?.disconnect()
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    window.removeEventListener('scroll', handleScroll)
    disposeScene()
    showFallback.value = true
  }
}

const animate = () => {
  if (!renderer || !scene || !camera || !rootGroup || !clock || isPaused) return
  const elapsed = clock.getElapsedTime()
  rootGroup.rotation.y += (pointer.x * 0.07 - rootGroup.rotation.y) * 0.045
  rootGroup.rotation.x += (-pointer.y * 0.035 - rootGroup.rotation.x) * 0.045
  rootGroup.position.z += (scrollDepth - rootGroup.position.z) * 0.04
  board.rotation.z = Math.sin(elapsed * 0.32) * 0.018

  packets.forEach((packet, index) => {
    const progress = (elapsed * 0.17 + packet.userData.offset) % 1
    packet.position.x = -2.05 + progress * 4.1
    packet.position.y = packet.userData.lane ? -0.18 + Math.sin(progress * Math.PI) * 0.24 : 0.58 - Math.sin(progress * Math.PI) * 0.2
    packet.position.z = 0.18 + Math.sin(progress * Math.PI * 2 + index) * 0.05
  })

  nodeMeshes.forEach((node, index) => {
    node.position.y = node.userData.baseY + Math.sin(elapsed * 0.75 + index) * 0.035
    const targetScale = node === hoveredNode ? 1.4 : 1
    node.scale.x += (targetScale - node.scale.x) * 0.12
    node.scale.y += (targetScale - node.scale.y) * 0.12
    node.scale.z += (targetScale - node.scale.z) * 0.12
  })

  renderer.render(scene, camera)
  animationFrameId = requestAnimationFrame(animate)
}

const startAnimation = () => {
  if (animationFrameId !== null || showFallback.value) return
  isPaused = false
  animationFrameId = requestAnimationFrame(animate)
}

const stopAnimation = () => {
  isPaused = true
  if (animationFrameId !== null) cancelAnimationFrame(animationFrameId)
  animationFrameId = null
}

const handleVisibilityChange = () => document.hidden ? stopAnimation() : startAnimation()

const handleScroll = () => {
  if (!hostRef.value) return
  const rect = hostRef.value.getBoundingClientRect()
  scrollDepth = Math.max(-0.18, Math.min(0.18, (window.innerHeight * 0.5 - rect.top) / window.innerHeight * 0.12))
}

const handlePointerMove = (event: PointerEvent) => {
  if (!hostRef.value || isReducedMotion) return
  pointerActive.value = true
  const rect = hostRef.value.getBoundingClientRect()
  pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
  pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
  if (raycaster && pointerNdc && camera && rootGroup) {
    pointerNdc.set(pointer.x, -pointer.y)
    rootGroup.updateMatrixWorld(true)
    raycaster.setFromCamera(pointerNdc, camera)
    hoveredNode = raycaster.intersectObjects(nodeMeshes, false)[0]?.object || null
  }
}

const resetPointer = () => {
  pointerActive.value = false
  pointer.x = 0
  pointer.y = 0
  hoveredNode = null
}

const disposeScene = () => {
  scene?.traverse((object: any) => {
    object.geometry?.dispose()
    const materials = object.material ? (Array.isArray(object.material) ? object.material : [object.material]) : []
    materials.forEach((material: any) => {
      Object.values(material).forEach((value: any) => value?.isTexture && value.dispose())
      material.dispose()
    })
  })
  renderer?.dispose()
  renderer?.forceContextLoss?.()
  renderer = null
  scene = null
  camera = null
  rootGroup = null
  board = null
  clock = null
  packets = []
  nodeMeshes = []
  raycaster = null
  pointerNdc = null
  hoveredNode = null
}

onMounted(() => {
  isMounted = true
  isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  isMobile = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches
  initScene()
})

onBeforeUnmount(() => {
  isMounted = false
  stopAnimation()
  resizeObserver?.disconnect()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  window.removeEventListener('scroll', handleScroll)
  disposeScene()
})
</script>

<style scoped>
.static-pipeline {
  background:
    radial-gradient(circle at 50% 38%, rgba(0, 168, 132, 0.14), transparent 28%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.62), rgba(239, 231, 216, 0.48));
}

.static-board {
  position: absolute;
  left: 50%;
  top: 43%;
  display: grid;
  width: 132px;
  height: 88px;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;
  padding: 18px;
  transform: translate(-50%, -50%) rotate(-4deg);
  border: 1px solid rgba(83, 92, 88, 0.18);
  border-radius: 18px;
  background: #ded7ca;
  box-shadow: 0 22px 50px rgba(47, 53, 50, 0.14);
}

.static-board span {
  border-radius: 4px;
  background: #3d4643;
  box-shadow: inset 0 0 0 1px rgba(0, 168, 132, 0.25);
}

.static-route {
  position: absolute;
  top: 41%;
  width: 25%;
  border-top: 1px dashed rgba(0, 168, 132, 0.48);
}

.static-route-left { left: 7%; }
.static-route-right { right: 7%; }

@media (prefers-reduced-motion: reduce) {
  .static-board { transform: translate(-50%, -50%); }
}
</style>
