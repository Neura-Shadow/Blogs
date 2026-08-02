<template>
  <div
    ref="hostRef"
    data-testid="three-profile-orb"
    class="relative h-64 overflow-hidden rounded-2xl border border-light-border bg-light-surface/80 shadow-[0_18px_70px_rgba(31,30,27,0.07)] dark:border-dark-border dark:bg-dark-surface/60 sm:h-80"
  >
    <canvas
      ref="canvasRef"
      class="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />

    <div
      v-if="showFallback"
      class="absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <div class="profile-fallback-orb" />
    </div>

    <div class="pointer-events-none absolute left-5 top-5">
      <p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
        {{ t('three.profileCore') }}
      </p>
      <p class="mt-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
        {{ t('three.profileCoreDescription') }}
      </p>
    </div>

    <div class="pointer-events-none absolute inset-x-4 bottom-4 flex flex-wrap gap-2">
      <span
        v-for="item in orbitLabels"
        :key="item"
        class="rounded-full border border-brand-accent/15 bg-brand-accent/5 px-3 py-1 text-[10px] font-semibold text-brand-accent"
      >
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from '~/composables/useI18n'

const { t } = useI18n()
const orbitLabels = computed(() => [
  t('three.profileBackend'),
  t('three.profileEdgeAi'),
  t('three.profileRobotics')
])

const hostRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const showFallback = ref(true)

let three: typeof import('three') | null = null
let renderer: any = null
let scene: any = null
let camera: any = null
let orbGroup: any = null
let resizeObserver: ResizeObserver | null = null
let animationFrameId: number | null = null
let clock: any = null
let isPaused = false
let isMounted = false
let isMobile = false

const canUseWebGL = () => {
  if (typeof window === 'undefined') return false

  try {
    const testCanvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
      (testCanvas.getContext('webgl2') || testCanvas.getContext('webgl'))
    )
  } catch {
    return false
  }
}

const isReducedMotion = () => {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
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

const initScene = async () => {
  if (!canvasRef.value || !hostRef.value || isReducedMotion() || !canUseWebGL()) {
    showFallback.value = true
    return
  }

  try {
    three = await import('three')
    if (!isMounted || !canvasRef.value || !hostRef.value) return
    const THREE = three

  showFallback.value = false
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
  camera.position.set(0, 0.15, 4.4)

  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  })
  renderer.outputColorSpace = THREE.SRGBColorSpace

  orbGroup = new THREE.Group()
  scene.add(orbGroup)

  const ambient = new THREE.AmbientLight(0xffffff, 1.55)
  const key = new THREE.DirectionalLight(0xfff2d9, 1.9)
  key.position.set(2.3, 2.6, 4)
  const teal = new THREE.PointLight(0x00a884, 1.3, 5)
  teal.position.set(-1.8, 0.2, 2.1)
  scene.add(ambient, key, teal)

  const shell = new THREE.Mesh(
    new THREE.SphereGeometry(0.74, isMobile ? 24 : 42, isMobile ? 16 : 28),
    new THREE.MeshStandardMaterial({
      color: 0x00a884,
      roughness: 0.38,
      metalness: 0.08,
      transparent: true,
      opacity: 0.22
    })
  )
  orbGroup.add(shell)

  const lattice = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.02, isMobile ? 1 : 2),
    new THREE.MeshBasicMaterial({
      color: 0x00a884,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    })
  )
  orbGroup.add(lattice)

  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0x5e6ad2,
    transparent: true,
    opacity: 0.22
  })

  const ringCount = isMobile ? 2 : 3
  for (let i = 0; i < ringCount; i += 1) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.34 + i * 0.18, 0.006, 8, isMobile ? 72 : 120), ringMaterial.clone())
    ring.rotation.set(Math.PI / (2.45 + i * 0.18), i * 0.42, i * 0.72)
    orbGroup.add(ring)
  }

  const dotMaterial = new THREE.MeshStandardMaterial({
    color: 0x00a884,
    roughness: 0.52,
    metalness: 0.1
  })

  const dotPositions = [
    [-1.28, 0.48, 0.18],
    [1.18, 0.64, -0.08],
    [0.58, -1.1, 0.2],
    [-0.86, -0.88, -0.16]
  ]

  dotPositions.forEach(([x, y, z], index) => {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(index === 0 ? 0.08 : 0.06, isMobile ? 12 : 18, isMobile ? 8 : 12), dotMaterial.clone())
    dot.position.set(x, y, z)
    dot.userData = { baseScale: 1 + index * 0.05 }
    orbGroup.add(dot)
  })

  clock = new THREE.Clock()
  resizeScene()
  resizeObserver = new ResizeObserver(resizeScene)
  resizeObserver.observe(hostRef.value)
  document.addEventListener('visibilitychange', handleVisibilityChange)
    startAnimation()
  } catch (error) {
    console.warn('[ThreeProfileOrb] Interactive rendering unavailable; using the static profile visual.', error instanceof Error ? error.message : error)
    stopAnimation()
    resizeObserver?.disconnect()
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    disposeScene()
    showFallback.value = true
  }
}

const animate = () => {
  if (!renderer || !scene || !camera || !orbGroup || !clock || isPaused) return

  const elapsed = clock.getElapsedTime()
  orbGroup.rotation.y = elapsed * 0.16
  orbGroup.rotation.x = Math.sin(elapsed * 0.22) * 0.07

  orbGroup.children.forEach((child: any, index: number) => {
    if (child.userData?.baseScale) {
      const scale = child.userData.baseScale + Math.sin(elapsed * 1.4 + index) * 0.05
      child.scale.setScalar(scale)
    }
  })

  renderer.render(scene, camera)
  animationFrameId = requestAnimationFrame(animate)
}

const startAnimation = () => {
  if (animationFrameId !== null) return
  isPaused = false
  animationFrameId = requestAnimationFrame(animate)
}

const stopAnimation = () => {
  isPaused = true
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

const handleVisibilityChange = () => {
  if (document.hidden) {
    stopAnimation()
  } else if (!showFallback.value) {
    startAnimation()
  }
}

const disposeScene = () => {
  if (scene) {
    scene.traverse((object: any) => {
      if (object.geometry) object.geometry.dispose()
      if (object.material) {
        const materials = Array.isArray(object.material) ? object.material : [object.material]
        materials.forEach((material: any) => material.dispose())
      }
    })
  }

  renderer?.dispose()
  renderer?.forceContextLoss?.()
  renderer = null
  scene = null
  camera = null
  orbGroup = null
}

onMounted(() => {
  isMounted = true
  isMobile = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches
  initScene()
})

onBeforeUnmount(() => {
  isMounted = false
  stopAnimation()
  resizeObserver?.disconnect()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  disposeScene()
})
</script>

<style scoped>
.profile-fallback-orb {
  width: min(58%, 220px);
  aspect-ratio: 1;
  border-radius: 999px;
  border: 1px solid rgba(0, 168, 132, 0.22);
  background:
    radial-gradient(circle at 35% 32%, rgba(255, 255, 255, 0.88), transparent 18%),
    radial-gradient(circle at 50% 50%, rgba(0, 168, 132, 0.22), rgba(94, 106, 210, 0.12) 46%, transparent 68%);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.58), 0 22px 60px rgba(0, 168, 132, 0.12);
}
</style>
