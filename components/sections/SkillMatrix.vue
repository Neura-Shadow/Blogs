<template>
  <section class="relative border-b border-light-border bg-light-bg py-20 transition-colors duration-300 dark:border-dark-border dark:bg-dark-bg md:py-28">
    <div class="mx-auto max-w-6xl px-4">
      <SectionHeading eyebrow="Skills" title="skills.title" description="skills.description" align="left">
        <template #icon>
          <Cpu class="h-4 w-4 text-brand-accent" />
        </template>
      </SectionHeading>

      <div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(group, groupIndex) in profile.skills"
          :key="group.category.en"
          class="flex h-full flex-col rounded-2xl border border-light-border bg-light-surface p-6 shadow-[0_18px_50px_rgba(31,30,27,0.045)] transition-colors hover:border-brand-accent/35 dark:border-dark-border dark:bg-dark-surface/35 sm:p-7"
        >
          <header class="border-b border-light-border pb-5 dark:border-dark-border">
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-center gap-3">
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-accent/20 bg-brand-accent/[0.07] text-brand-accent">
                  <component :is="getCategoryIcon(group.icon)" class="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 class="font-display text-[23px] font-bold leading-tight text-[#1F1E1B] dark:text-white">
                  {{ group.category[locale] }}
                </h3>
              </div>
              <span class="font-mono text-sm text-neutral-400" aria-hidden="true">0{{ groupIndex + 1 }}</span>
            </div>
          </header>

          <div class="divide-y divide-light-border/80 dark:divide-dark-border">
            <div v-for="skill in group.skills" :key="skill.name.en" class="py-5 first:pt-6 last:pb-1">
              <div class="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between">
                <h4 class="font-display text-[18px] font-semibold leading-snug text-neutral-850 dark:text-neutral-100">
                  {{ skill.name[locale] }}
                </h4>
                <span
                  class="inline-flex w-fit shrink-0 rounded-full border px-3 py-1 text-sm font-semibold leading-5"
                  :class="getStatusClass(skill.status)"
                >
                  {{ capabilityStatusLabels[skill.status][locale] }}
                </span>
              </div>
              <p class="mt-2 text-[15px] leading-6 text-neutral-550 dark:text-neutral-400">
                {{ skill.description?.[locale] }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Boxes, Cpu, LayoutDashboard, Network, Route, ScanEye, Server } from 'lucide-vue-next'
import type { CapabilityStatus } from '~/types/project'
import { useI18n } from '~/composables/useI18n'
import { profileData as profile } from '~/data/profile'
import { capabilityStatusLabels } from '~/data/engineering'
import SectionHeading from '~/components/ui/SectionHeading.vue'

const { locale } = useI18n()

const categoryIcons = {
  server: Server,
  'layout-dashboard': LayoutDashboard,
  cpu: Cpu,
  network: Network,
  'scan-eye': ScanEye,
  route: Route
}

const getCategoryIcon = (icon?: string) => categoryIcons[icon as keyof typeof categoryIcons] || Boxes

const getStatusClass = (status: CapabilityStatus) => {
  if (status === 'project-applied' || status === 'research-applied') {
    return 'border-brand-accent/25 bg-brand-accent/[0.07] text-brand-accent'
  }
  if (status === 'prototype') {
    return 'border-amber-300/60 bg-amber-50 text-amber-800 dark:border-amber-800/50 dark:bg-amber-950/20 dark:text-amber-300'
  }
  if (status === 'planned-extension') {
    return 'border-neutral-300 bg-neutral-100 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800/70 dark:text-neutral-300'
  }
  return 'border-brand-linear/20 bg-brand-linear/[0.06] text-brand-linear dark:text-indigo-300'
}
</script>
