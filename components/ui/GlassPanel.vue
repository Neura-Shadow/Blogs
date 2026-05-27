<template>
  <div
    class="backdrop-blur-md bg-white/70 dark:bg-dark-surface/75 border border-neutral-200/50 dark:border-white/5 shadow-sm rounded-xl overflow-hidden"
    :class="className"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  className?: string
}>()
</script>
