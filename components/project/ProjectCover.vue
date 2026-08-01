<template>
  <div
    class="relative aspect-[16/9] overflow-hidden rounded-xl border border-light-border bg-[#F3EEE5] dark:border-dark-border dark:bg-dark-elevated"
    :class="containerClass"
  >
    <img
      :src="resolvedCover"
      :alt="alt"
      class="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-500"
      :class="imageClass"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      @error="handleCoverError"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { normalizeProjectCoverPath, PROJECT_COVER_PLACEHOLDER } from '~/composables/useProjects'

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

const { publicAssetPath } = usePublicAssetPath()
const fallbackCover = () => publicAssetPath(PROJECT_COVER_PLACEHOLDER, PROJECT_COVER_PLACEHOLDER)
const resolvedCover = ref(fallbackCover())

watch(
  () => props.src,
  (value) => {
    resolvedCover.value = publicAssetPath(
      normalizeProjectCoverPath(value),
      PROJECT_COVER_PLACEHOLDER
    )
  },
  { immediate: true }
)

function handleCoverError() {
  const fallback = fallbackCover()
  if (resolvedCover.value !== fallback) {
    resolvedCover.value = fallback
  }
}
</script>
