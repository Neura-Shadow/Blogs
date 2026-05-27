<template>
  <div
    ref="cardRef"
    class="relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-dark-surface overflow-hidden group transition-all duration-300"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Spotlight glow background -->
    <div
      class="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
      :style="spotlightStyle"
    />

    <!-- Hairline spotlight border overlay (requires absolute position and masking, or simplified border glow) -->
    <div class="relative z-10 h-full w-full">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  color?: string
  radius?: number
}>(), {
  color: 'rgba(0, 212, 164, 0.08)', // Default to emerald green accent
  radius: 350
})

const cardRef = ref<HTMLElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)
const isHovered = ref(false)
let isMobile = false

const handleMouseMove = (e: MouseEvent) => {
  if (isMobile || !cardRef.value) return
  const bounds = cardRef.value.getBoundingClientRect()
  mouseX.value = e.clientX - bounds.left
  mouseY.value = e.clientY - bounds.top
}

const handleMouseEnter = () => {
  if (isMobile) return
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
}

const spotlightStyle = computed(() => {
  if (!isHovered.value) return {}
  return {
    background: `radial-gradient(${props.radius}px circle at ${mouseX.value}px ${mouseY.value}px, ${props.color}, transparent 80%)`
  }
})

onMounted(() => {
  if (typeof window !== 'undefined') {
    isMobile = window.matchMedia('(hover: none)').matches
  }
})
</script>
