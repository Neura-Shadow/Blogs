<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />

    <!-- Featured Projects Showcase (Dark Section -> Redesigned as Warm Beige/Elevated) -->
    <FeaturedProjects />

    <!-- Technical Skills Matrix -->
    <SkillMatrix />

    <!-- Research & Academic Highlights -->
    <ResearchHighlights />

    <!-- Latest Blog Posts -->
    <LatestArticles />

    <!-- Unified Contact Call to Action (CTA) Section -->
    <section class="py-16 md:py-24 bg-light-elevated dark:bg-dark-surface/10 border-t border-light-border dark:border-dark-border text-center select-none">
      <div class="max-w-4xl mx-auto px-4">
        <h2 class="text-section-title font-display font-bold text-[#1F1E1B] dark:text-white">
          {{ t('contact.title') }}
        </h2>
        <p class="text-section-description mx-auto mt-4 text-neutral-500 dark:text-neutral-400">
          {{ t('about.collaborations') }} — {{ t('about.collabDesc') }}
        </p>
        <div class="mt-8 flex justify-center gap-4">
          <NuxtLink
            to="/contact"
            class="text-button inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-accent px-6 py-3 font-semibold text-white shadow-md shadow-brand-accent/15 transition-colors hover:bg-brand-accentHover"
          >
            <Mail class="w-4 h-4" />
            <span>{{ t('contact.sendMessage') }}</span>
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="text-button inline-flex min-h-11 items-center gap-2 rounded-lg border border-light-border bg-white px-6 py-3 font-semibold text-neutral-700 transition-colors hover:bg-light-elevated dark:border-dark-border dark:bg-dark-surface dark:text-neutral-200 dark:hover:bg-dark-elevated"
          >
            <span>{{ t('about.navContact') }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Mail } from 'lucide-vue-next'
import { useI18n } from '~/composables/useI18n'
import HeroSection from '~/components/sections/HeroSection.vue'
import FeaturedProjects from '~/components/sections/FeaturedProjects.vue'
import SkillMatrix from '~/components/sections/SkillMatrix.vue'
import ResearchHighlights from '~/components/sections/ResearchHighlights.vue'
import LatestArticles from '~/components/sections/LatestArticles.vue'
import { profileData as profile } from '~/data/profile'

const { locale, t } = useI18n()

useHead(() => ({
  title: profile.title[locale.value],
  meta: [{ name: 'description', content: profile.summary[locale.value].split('\n\n')[0] }]
}))
</script>
