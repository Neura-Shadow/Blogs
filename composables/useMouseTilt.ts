import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export interface MouseTiltOptions {
  maxTilt?: number
  perspective?: number
  glare?: boolean
}

export function useMouseTilt(targetRef: Ref<HTMLElement | null>, options: MouseTiltOptions = {}) {
  const maxTilt = options.maxTilt ?? 10
  const perspective = options.perspective ?? 1000

  const rotateX = ref(0)
  const rotateY = ref(0)
  const glareX = ref(0)
  const glareY = ref(0)
  const glareOpacity = ref(0)
  const isHovered = ref(false)

  let bounds: DOMRect | null = null
  let isReducedMotion = false

  const updatePosition = (e: MouseEvent) => {
    if (!targetRef.value || isReducedMotion) return

    if (!bounds) {
      bounds = targetRef.value.getBoundingClientRect()
    }

    const mouseX = e.clientX - bounds.left
    const mouseY = e.clientY - bounds.top

    // Normalize coordinates from -0.5 to 0.5
    const normalizedX = mouseX / bounds.width - 0.5
    const normalizedY = mouseY / bounds.height - 0.5

    // Calculate rotation angles
    rotateX.value = -normalizedY * maxTilt
    rotateY.value = normalizedX * maxTilt

    // Glare position (percentage)
    glareX.value = (mouseX / bounds.width) * 100
    glareY.value = (mouseY / bounds.height) * 100
  }

  const handleMouseEnter = () => {
    if (isReducedMotion) return
    isHovered.value = true
    glareOpacity.value = 0.4
    if (targetRef.value) {
      bounds = targetRef.value.getBoundingClientRect()
    }
  }

  const handleMouseLeave = () => {
    isHovered.value = false
    glareOpacity.value = 0
    // Reset rotation smoothly
    rotateX.value = 0
    rotateY.value = 0
    bounds = null
  }

  const checkReducedMotion = () => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      isReducedMotion = mediaQuery.matches
      // Also disable on screens without primary hover capability (like mobile)
      const hoverQuery = window.matchMedia('(hover: none)')
      if (hoverQuery.matches) {
        isReducedMotion = true
      }
    }
  }

  onMounted(() => {
    checkReducedMotion()
    if (!targetRef.value) return

    targetRef.value.addEventListener('mousemove', updatePosition)
    targetRef.value.addEventListener('mouseenter', handleMouseEnter)
    targetRef.value.addEventListener('mouseleave', handleMouseLeave)
  })

  onUnmounted(() => {
    if (!targetRef.value) return

    targetRef.value.removeEventListener('mousemove', updatePosition)
    targetRef.value.removeEventListener('mouseenter', handleMouseEnter)
    targetRef.value.removeEventListener('mouseleave', handleMouseLeave)
  })

  return {
    rotateX,
    rotateY,
    glareX,
    glareY,
    glareOpacity,
    isHovered,
    transformStyle: ref(`perspective(${perspective}px)`)
  }
}
