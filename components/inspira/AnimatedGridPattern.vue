<template>
  <svg
    class="absolute inset-0 h-full w-full stroke-neutral-200/40 dark:stroke-neutral-800/40 [mask-image:radial-gradient(100%_100%_at_50%_0%,white,transparent_85%)]"
    aria-hidden="true"
  >
    <defs>
      <pattern
        :id="patternId"
        :width="width"
        :height="height"
        patternUnits="userSpaceOnUse"
        :x="x"
        :y="y"
      >
        <path :d="`M.5 ${height}V.5H${width}`" fill="none" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="`url(#${patternId})`" />

    <!-- Pulse grid squares -->
    <svg :x="x" :y="y" class="overflow-visible fill-brand-accent/10 dark:fill-brand-accent/[0.08]">
      <rect
        v-for="(square, idx) in squares"
        :key="idx"
        :width="width - 1"
        :height="height - 1"
        :x="square.x * width"
        :y="square.y * height"
        class="animate-grid-pulse"
        :style="{
          animationDelay: `${square.delay}s`,
          animationDuration: `${square.duration}s`
        }"
      />
    </svg>
  </svg>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  width?: number
  height?: number
  x?: number
  y?: number
  numSquares?: number
}>(), {
  width: 48,
  height: 48,
  x: -1,
  y: -1,
  numSquares: 15
})

const patternId = 'grid-pattern-' + Math.random().toString(36).substring(2, 9)
const squares = ref<{ x: number; y: number; delay: number; duration: number }[]>([])

onMounted(() => {
  // Generate random coordinates for highlighted grid blocks
  squares.value = Array.from({ length: props.numSquares }, () => ({
    x: Math.floor(Math.random() * 24) - 12,
    y: Math.floor(Math.random() * 16),
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4
  }))
})
</script>

<style scoped>
.animate-grid-pulse {
  animation: grid-pulse 6s ease-in-out infinite;
}

@keyframes grid-pulse {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
</style>
