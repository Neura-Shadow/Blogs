<template>
  <div class="mb-10 text-left" :class="alignClass">
    <div
      v-if="eyebrow"
      class="text-public-micro mb-3 inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/5 px-3 py-1.5 font-semibold uppercase tracking-wide text-brand-accent"
    >
      <slot name="icon" />
      <span>{{ displayEyebrow }}</span>
    </div>

    <h2 class="text-section-title font-display font-bold tracking-tight text-[#1F1E1B] dark:text-white">
      <slot>{{ displayTitle }}</slot>
    </h2>

    <p
      v-if="description"
      class="text-section-description mt-4 text-neutral-500 dark:text-neutral-400"
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
