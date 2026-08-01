<template>
  <div
    class="aspect-[16/9] overflow-hidden rounded-xl border border-light-border bg-[#F3EEE5] dark:border-dark-border dark:bg-dark-elevated"
    :class="containerClass"
  >
    <img
      :src="resolvedCover"
      :alt="alt"
      class="pointer-events-none h-full w-full object-cover transition-transform duration-500"
      :class="imageClass"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      @error="handleCoverError"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { normalizeProjectCover, PROJECT_COVER_PLACEHOLDER } from '~/composables/useProjects'

const props = withDefaults(defineProps<{
  src?: string | null
  alt: string
  eager?: boolean
  containerClass?: string
  imageClass?: string
}>(), {
  src: null,
  eager: false,
  containerClass: '',
  imageClass: ''
})

const resolvedCover = ref(PROJECT_COVER_PLACEHOLDER)

watch(
  () => props.src,
  (value) => {
    resolvedCover.value = normalizeProjectCover(value) || PROJECT_COVER_PLACEHOLDER
  },
  { immediate: true }
)

function handleCoverError() {
  if (resolvedCover.value !== PROJECT_COVER_PLACEHOLDER) {
    resolvedCover.value = PROJECT_COVER_PLACEHOLDER
  }
}
</script>
