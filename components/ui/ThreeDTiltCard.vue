<template>
  <div
    ref="cardRef"
    class="relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-dark-surface overflow-hidden transition-all duration-300 ease-out preserve-3d"
    :style="cardStyle"
  >
    <!-- Glare Effect Overlay -->
    <div
      v-if="glare"
      class="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 ease-out"
      :style="glareStyle"
    />

    <div class="relative z-0 h-full w-full">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMouseTilt } from '~/composables/useMouseTilt'

const props = withDefaults(defineProps<{
  maxTilt?: number
  perspective?: number
  glare?: boolean
}>(), {
  maxTilt: 10,
  perspective: 1000,
  glare: true
})

const cardRef = ref<HTMLElement | null>(null)
const { rotateX, rotateY, glareX, glareY, glareOpacity, isHovered } = useMouseTilt(cardRef, {
  maxTilt: props.maxTilt,
  perspective: props.perspective
})

const cardStyle = computed(() => {
  if (!isHovered.value) {
    return {
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s ease-out, border-color 0.3s, background-color 0.3s'
    }
  }
  return {
    transform: `perspective(${props.perspective}px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)`,
    transition: 'transform 0.1s ease-out, border-color 0.3s, background-color 0.3s',
    borderColor: 'var(--card-hover-border, rgba(0, 212, 164, 0.4))'
  }
})

const glareStyle = computed(() => {
  return {
    opacity: glareOpacity.value,
    background: `radial-gradient(circle 180px at ${glareX.value}% ${glareY.value}%, rgba(0, 212, 164, 0.15), transparent 80%)`,
    mixBlendMode: 'screen' as const
  }
})
</script>

<style scoped>
.preserve-3d {
  transform-style: preserve-3d;
}
</style>
