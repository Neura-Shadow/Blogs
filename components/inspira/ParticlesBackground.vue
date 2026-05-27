<template>
  <canvas
    ref="canvasRef"
    class="absolute inset-0 w-full h-full pointer-events-none z-0"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  particleColor?: string
  lineColor?: string
  maxParticles?: number
  connectDistance?: number
  speed?: number
}>(), {
  particleColor: 'rgba(0, 212, 164, 0.25)', // emerald tint
  lineColor: 'rgba(0, 212, 164, 0.08)',
  maxParticles: 45,
  connectDistance: 120,
  speed: 0.4
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number | null = null
let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let width = 0
let height = 0
let isReducedMotion = false

class Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number

  constructor() {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.vx = (Math.random() - 0.5) * props.speed
    this.vy = (Math.random() - 0.5) * props.speed
    this.size = Math.random() * 2 + 1.2
  }

  update() {
    this.x += this.vx
    this.y += this.vy

    // Bounce off walls
    if (this.x < 0 || this.x > width) this.vx *= -1
    if (this.y < 0 || this.y > height) this.vy *= -1
  }

  draw() {
    if (!ctx) return
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = props.particleColor
    ctx.fill()
  }
}

const resizeCanvas = () => {
  if (!canvasRef.value) return
  width = canvasRef.value.offsetWidth
  height = canvasRef.value.offsetHeight
  canvasRef.value.width = width
  canvasRef.value.height = height
}

const initParticles = () => {
  particles = Array.from({ length: props.maxParticles }, () => new Particle())
}

const drawConnections = () => {
  if (!ctx) return
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < props.connectDistance) {
        const opacity = (1 - dist / props.connectDistance) * 0.15
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = props.lineColor.replace(/[^,]+(?=\))/, opacity.toString())
        ctx.lineWidth = 0.8
        ctx.stroke()
      }
    }
  }
}

const animate = () => {
  if (isReducedMotion || !ctx) return
  ctx.clearRect(0, 0, width, height)

  particles.forEach(p => {
    p.update()
    p.draw()
  })

  drawConnections()
  animationFrameId = requestAnimationFrame(animate)
}

const checkReducedMotion = () => {
  if (typeof window !== 'undefined') {
    isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hoverQuery = window.matchMedia('(hover: none)')
    if (hoverQuery.matches) {
      isReducedMotion = true // disable in touch/mobile screens to save battery
    }
  }
}

onMounted(() => {
  checkReducedMotion()
  if (isReducedMotion) return

  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')

  resizeCanvas()
  initParticles()
  animate()

  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  window.removeEventListener('resize', resizeCanvas)
})
</script>
