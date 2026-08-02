<template>
  <section class="relative border-b border-light-border bg-light-bg py-16 transition-colors duration-300 dark:border-dark-border dark:bg-dark-bg md:py-20">
    <div class="mx-auto max-w-6xl px-4">
      <SectionHeading eyebrow="Skills" title="skills.title" description="skills.description" align="left">
        <template #icon>
          <Cpu class="h-4 w-4 text-brand-accent" />
        </template>
      </SectionHeading>

      <div data-testid="core-capabilities-grid" class="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        <article
          v-for="capability in coreCapabilities"
          :key="capability.id"
          data-testid="core-capability-card"
          class="group flex h-full flex-col rounded-2xl border border-light-border bg-light-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:border-brand-accent/35 dark:border-dark-border dark:bg-dark-surface/35 sm:p-6"
        >
          <div class="flex items-start gap-4">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-accent/20 bg-brand-accent/[0.07] text-brand-accent">
              <component :is="getCategoryIcon(capability.icon)" class="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 class="text-card-title font-display font-bold text-[#1F1E1B] dark:text-white">
                {{ t(capability.titleKey) }}
              </h3>
              <p data-testid="core-capability-description" class="text-card-body mt-2 text-neutral-550 dark:text-neutral-400">
                {{ t(capability.descriptionKey) }}
              </p>
            </div>
          </div>

          <ul class="mt-5 flex flex-wrap gap-2" :aria-label="t(capability.titleKey)">
            <li
              v-for="skill in capability.skills"
              :key="skill"
              class="text-chip rounded-md border border-light-border bg-light-elevated/70 px-3 py-2 font-semibold text-neutral-650 dark:border-dark-border dark:bg-dark-elevated/65 dark:text-neutral-300"
            >
              {{ skill }}
            </li>
          </ul>
        </article>
      </div>

      <NuxtLink
        :to="detailedStackHref"
        class="text-button mt-7 inline-flex min-h-10 items-center gap-2 font-semibold text-brand-accent transition-colors hover:text-brand-accentHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
      >
        {{ t('skills.viewDetailed') }}
        <ArrowRight class="h-4 w-4" aria-hidden="true" />
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Boxes, Cpu, LayoutDashboard, Network, Server } from 'lucide-vue-next'
import { useI18n } from '~/composables/useI18n'
import { coreCapabilities } from '~/data/engineering'
import SectionHeading from '~/components/ui/SectionHeading.vue'

const { t } = useI18n()

const categoryIcons = {
  server: Server,
  cpu: Cpu,
  network: Network,
  'layout-dashboard': LayoutDashboard
}

const detailedStackHref = coreCapabilities[0]?.href || '/about#capabilities'

const getCategoryIcon = (icon: string) => categoryIcons[icon as keyof typeof categoryIcons] || Boxes
</script>
