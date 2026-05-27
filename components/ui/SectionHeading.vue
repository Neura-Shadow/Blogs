<template>
  <div class="mb-10 text-left" :class="alignClass">
    <div
      v-if="eyebrow"
      class="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full text-xs font-semibold tracking-wide uppercase bg-brand-accent/5 border border-brand-accent/20 text-brand-accent"
    >
      <slot name="icon" />
      <span>{{ displayEyebrow }}</span>
    </div>

    <h2 class="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#1F1E1B] dark:text-white">
      <slot>{{ displayTitle }}</slot>
    </h2>

    <p
      v-if="description"
      class="mt-4 text-base sm:text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl"
      :class="{ 'mx-auto': align === 'center' }"
    >
      {{ displayDescription }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '~/composables/useI18n'

const props = withDefaults(defineProps<{
  title?: string
  eyebrow?: string
  description?: string
  align?: 'left' | 'center'
}>(), {
  align: 'left'
})

const { t } = useI18n()

const displayTitle = computed(() => {
  if (props.title && props.title.includes('.')) {
    return t(props.title)
  }
  return props.title
})

const displayEyebrow = computed(() => {
  if (props.eyebrow && props.eyebrow.includes('.')) {
    return t(props.eyebrow)
  }
  return props.eyebrow
})

const displayDescription = computed(() => {
  if (props.description && props.description.includes('.')) {
    return t(props.description)
  }
  return props.description
})

const alignClass = computed(() => {
  return props.align === 'center' ? 'text-center' : 'text-left'
})
</script>
