<template>
  <section class="relative overflow-hidden border-b border-light-border bg-light-bg py-10 transition-colors duration-300 dark:border-dark-border dark:bg-dark-bg md:py-14 lg:flex lg:min-h-[80vh] lg:items-center lg:py-16">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="absolute -right-28 top-4 h-80 w-80 rounded-full bg-brand-accent/[0.055] blur-3xl dark:bg-brand-accent/[0.035]" />
      <div class="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-amber-100/55 blur-3xl dark:bg-amber-900/10" />
      <div class="hero-grid absolute inset-0 opacity-45 dark:opacity-20" />
    </div>

    <div class="relative z-10 mx-auto w-full max-w-7xl px-4">
      <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.52fr)] lg:gap-10">
        <div data-testid="hero-copy" class="flex flex-col items-start text-left">
          <p class="text-sm font-semibold text-brand-accent">
            {{ t('hero.hello') }}
          </p>
          <p class="mt-1 font-display text-lg font-bold text-neutral-700 dark:text-neutral-200">
            {{ locale === 'en' ? profile.name : profile.chineseName }}
            <span class="ml-2 font-medium text-neutral-400">
              {{ locale === 'en' ? profile.chineseName : profile.name }}
            </span>
          </p>

          <h1 class="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-[#1F1E1B] dark:text-white sm:text-5xl">
            {{ profile.title[locale] }}
          </h1>

          <p data-testid="hero-capability-line" :aria-label="profile.capabilityLine[locale]" class="mt-4 hidden max-w-[740px] text-base font-semibold leading-7 text-brand-accent sm:block sm:text-lg">
            {{ profile.capabilityLine[locale] }}
          </p>
          <ul data-testid="hero-capability-line" class="mt-4 flex max-w-[740px] flex-wrap gap-2 sm:hidden" :aria-label="profile.capabilityLine[locale]">
            <li
              v-for="capability in capabilityChips"
              :key="capability"
              class="rounded-md border border-brand-accent/20 bg-brand-accent/[0.055] px-2.5 py-1.5 text-[13px] font-semibold leading-5 text-brand-accent"
            >
              {{ capability }}
            </li>
          </ul>

          <p data-testid="hero-summary" class="mt-4 max-w-[760px] text-base leading-[1.7] text-neutral-600 dark:text-neutral-300">
            {{ profile.summary[locale] }}
          </p>

          <div role="group" class="mt-5 grid w-full max-w-[820px] gap-3 sm:grid-cols-2" :aria-label="t('hero.calloutsLabel')">
            <article data-testid="hero-callout-nstc" class="rounded-xl border border-brand-accent/25 bg-brand-accent/[0.035] p-3.5">
              <div class="flex items-center gap-2.5">
                <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-accent/[0.09] text-brand-accent">
                  <Network class="h-4 w-4" aria-hidden="true" />
                </span>
                <h2 class="text-sm font-bold leading-5 text-brand-accent">{{ t('hero.nstcLabel') }}</h2>
              </div>
              <p data-testid="hero-callout-text" class="mt-2 text-[13px] leading-5 text-neutral-600 dark:text-neutral-300">{{ t('hero.nstcText') }}</p>
            </article>

            <article data-testid="hero-callout-research" class="rounded-xl border border-amber-300/70 bg-amber-50/55 p-3.5 dark:border-amber-800/55 dark:bg-amber-950/15">
              <div class="flex items-center gap-2.5">
                <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-900/35 dark:text-amber-300">
                  <ScanEye class="h-4 w-4" aria-hidden="true" />
                </span>
                <h2 class="text-sm font-bold leading-5 text-amber-800 dark:text-amber-300">{{ t('hero.researchLabel') }}</h2>
              </div>
              <p data-testid="hero-callout-text" class="mt-2 text-[13px] leading-5 text-neutral-600 dark:text-neutral-300">{{ t('hero.researchText') }}</p>
            </article>
          </div>

          <div class="relative z-20 mt-5 flex w-full flex-wrap gap-3 sm:w-auto">
            <NuxtLink
              to="/projects"
              class="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-brand-accentHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent sm:flex-initial"
            >
              <Layers class="h-4 w-4" />
              <span>{{ t('hero.viewProjects') }}</span>
            </NuxtLink>

            <a
              href="/resume.pdf"
              download
              class="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-light-border bg-white px-6 py-3 text-sm font-semibold text-neutral-700 transition duration-200 hover:-translate-y-0.5 hover:border-brand-accent/35 hover:bg-light-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent dark:border-dark-border dark:bg-dark-surface dark:text-neutral-200 dark:hover:bg-dark-elevated sm:flex-initial"
            >
              <FileDown class="h-4 w-4" />
              <span>{{ t('hero.downloadResume') }}</span>
            </a>
          </div>
        </div>

        <div data-testid="hero-visual" class="relative z-0 flex w-full select-none items-center justify-center">
          <ClientOnly>
            <ThreeHeroScene />
            <template #fallback>
              <div class="h-[360px] w-full max-w-[500px] rounded-2xl border border-light-border bg-light-elevated/60 shadow-[0_24px_80px_rgba(31,30,27,0.08)] dark:border-dark-border dark:bg-dark-surface/40 sm:h-[460px] lg:h-[590px]" />
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { FileDown, Layers, Network, ScanEye } from 'lucide-vue-next'
import { useI18n } from '~/composables/useI18n'
import { profileData as profile } from '~/data/profile'
import ThreeHeroScene from '~/components/three/ThreeHeroScene.vue'

const { locale, t } = useI18n()

const capabilityChips = computed(() => profile.capabilityLine[locale.value].split(' · '))
</script>

<style scoped>
.hero-grid {
  background-image:
    linear-gradient(rgba(0, 168, 132, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 168, 132, 0.055) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: linear-gradient(to bottom, transparent, black 24%, black 76%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  .transition,
  .duration-200 {
    transition-duration: 0.01ms !important;
  }
}
</style>
