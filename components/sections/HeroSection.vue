<template>
  <section class="relative overflow-hidden border-b border-light-border bg-light-bg py-12 transition-colors duration-300 dark:border-dark-border dark:bg-dark-bg md:py-16 lg:min-h-[86vh] lg:flex lg:items-center lg:py-20">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="absolute -right-28 top-4 h-80 w-80 rounded-full bg-brand-accent/[0.055] blur-3xl dark:bg-brand-accent/[0.035]" />
      <div class="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-amber-100/55 blur-3xl dark:bg-amber-900/10" />
      <div class="hero-grid absolute inset-0 opacity-45 dark:opacity-20" />
    </div>

    <div class="relative z-10 mx-auto w-full max-w-6xl px-4">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div data-testid="hero-copy" class="flex flex-col items-start text-left lg:col-span-7">
          <p class="inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/[0.07] px-3 py-1.5 text-sm font-semibold text-brand-accent">
            <span class="h-1.5 w-1.5 rounded-full bg-brand-accent" aria-hidden="true" />
            {{ t('hero.hello') }} {{ locale === 'en' ? profile.name : profile.chineseName }}
          </p>

          <h1 class="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-[#1F1E1B] dark:text-white sm:text-5xl">
            {{ profile.title[locale] }}
          </h1>

          <p class="mt-5 max-w-2xl text-base font-semibold leading-7 text-brand-accent sm:text-lg">
            {{ profile.capabilityLine[locale] }}
          </p>

          <div class="mt-5 max-w-[72ch] space-y-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300 sm:text-[15px]">
            <p
              v-for="(paragraph, index) in heroParagraphs"
              :key="paragraph"
              class="rounded-r-lg"
              :class="paragraphTone(index)"
            >
              {{ paragraph }}
            </p>
          </div>

          <div class="relative z-20 mt-8 flex w-full flex-wrap gap-3 sm:w-auto">
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

          <ul class="mt-9 grid w-full grid-cols-1 gap-3 border-t border-light-border pt-6 dark:border-dark-border sm:grid-cols-3" :aria-label="t('hero.evidence.label')">
            <li v-for="item in evidenceLabels" :key="item.value" class="flex items-center gap-2 text-sm">
              <span class="h-2 w-2 rounded-full" :class="item.dot" aria-hidden="true" />
              <span class="font-medium text-neutral-600 dark:text-neutral-300">{{ item.value }}</span>
            </li>
          </ul>
        </div>

        <div data-testid="hero-visual" class="relative z-0 flex w-full select-none items-center justify-center lg:col-span-5">
          <ClientOnly>
            <ThreeHeroScene />
            <template #fallback>
              <div class="h-[390px] w-full max-w-[500px] rounded-2xl border border-light-border bg-light-elevated/60 shadow-[0_24px_80px_rgba(31,30,27,0.08)] dark:border-dark-border dark:bg-dark-surface/40 sm:h-[480px]" />
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { FileDown, Layers } from 'lucide-vue-next'
import { useI18n } from '~/composables/useI18n'
import { profileData as profile } from '~/data/profile'
import ThreeHeroScene from '~/components/three/ThreeHeroScene.vue'

const { locale, t } = useI18n()

const heroParagraphs = computed(() => profile.summary[locale.value].split('\n\n'))

const paragraphTone = (index: number) => {
  if (index === 1) return 'border-l-2 border-brand-accent/55 bg-brand-accent/[0.045] px-3 py-2'
  if (index === 3) return 'border-l-2 border-amber-500/60 bg-amber-50/65 px-3 py-2 dark:bg-amber-950/15'
  return ''
}

const evidenceLabels = computed(() => [
  { value: t('hero.evidence.project'), dot: 'bg-brand-accent' },
  { value: t('hero.evidence.research'), dot: 'bg-brand-linear' },
  { value: t('hero.evidence.focus'), dot: 'bg-amber-500' }
])
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
