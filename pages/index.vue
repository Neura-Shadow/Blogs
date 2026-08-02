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
        <h2 class="text-3xl font-display font-bold text-[#1F1E1B] dark:text-white">
          {{ t('contact.title') }}
        </h2>
        <p class="mt-4 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
          {{ t('about.collaborations') }} — {{ t('about.collabDesc') }}
        </p>
        <div class="mt-8 flex justify-center gap-4">
          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-brand-accent hover:bg-brand-accentHover transition-colors shadow-md shadow-brand-accent/15"
          >
            <Mail class="w-4 h-4" />
            <span>{{ t('contact.sendMessage') }}</span>
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-neutral-700 dark:text-neutral-200 border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors"
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
