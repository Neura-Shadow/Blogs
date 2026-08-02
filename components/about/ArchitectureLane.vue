<template>
  <section class="rounded-xl border border-light-border bg-white/80 p-4 dark:border-dark-border dark:bg-dark-bg/45">
    <h4 class="text-sm font-bold uppercase tracking-[0.12em] text-brand-accent">{{ title }}</h4>
    <ol class="mt-3 space-y-2">
      <li v-for="(step, index) in steps" :key="step.id" class="flex items-center gap-3 rounded-lg border border-light-border/80 bg-light-bg px-3 py-2.5 dark:border-dark-border dark:bg-dark-surface/55">
        <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-accent/[0.09] font-mono text-xs font-bold text-brand-accent">{{ index + 1 }}</span>
        <span class="text-[15px] font-semibold leading-5 text-neutral-700 dark:text-neutral-300">{{ step.label[locale] }}</span>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import type { ArchitectureStep } from '~/types/project'
import { useI18n } from '~/composables/useI18n'

defineProps<{ title: string; steps: ArchitectureStep[] }>()
const { locale } = useI18n()
</script>
