<template>
  <span
    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors duration-200"
    :class="classes"
  >
    <span v-if="dot" class="w-1.5 h-1.5 rounded-full" :class="dotClass" />
    <slot>{{ name }}</slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  name?: string
  variant?: 'brand' | 'linear' | 'neutral'
  dot?: boolean
}>(), {
  variant: 'neutral',
  dot: false
})

const classes = computed(() => {
  if (props.variant === 'brand') {
    return 'bg-brand-accent/5 border-brand-accent/20 text-brand-accent hover:bg-brand-accent/10'
  }
  if (props.variant === 'linear') {
    return 'bg-brand-linear/5 border-brand-linear/20 text-brand-linear hover:bg-brand-linear/10'
  }
  return 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/80'
})

const dotClass = computed(() => {
  if (props.variant === 'brand') return 'bg-brand-accent'
  if (props.variant === 'linear') return 'bg-brand-linear'
  return 'bg-neutral-400 dark:bg-neutral-500'
})
</script>
