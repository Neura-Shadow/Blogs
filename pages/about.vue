<template>
  <div class="py-12 md:py-20 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-4">

      <!-- Profile Header -->
      <div class="flex flex-col md:flex-row gap-8 items-start mb-12 pb-10 border-b border-light-border dark:border-dark-border">
        <!-- Text Details -->
        <div class="flex-grow text-left">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full text-xs font-semibold bg-brand-accent/5 border border-brand-accent/20 text-brand-accent">
            {{ t('about.title') }}
          </span>

          <h1 class="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-[#1F1E1B] dark:text-white">
            {{ locale === 'en' ? profile.name : profile.chineseName }}
            <span class="text-xl sm:text-2xl font-display font-medium text-neutral-500 dark:text-neutral-400 block sm:inline sm:ml-2 mt-2 sm:mt-0">
              {{ locale === 'en' ? profile.chineseName : profile.name }}
            </span>
          </h1>

          <p class="mt-3 text-sm font-semibold text-brand-accent font-mono leading-relaxed">
            {{ profile.title[locale] }}
          </p>

          <p class="mt-6 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {{ profile.summary[locale] }}
          </p>

          <div class="mt-8">
            <a
              href="/resume.pdf"
              download
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-brand-accent to-brand-accentHover shadow-md shadow-brand-accent/20"
            >
              <FileDown class="w-4 h-4" />
              <span>{{ t('about.downloadCV') }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Education Timeline -->
      <div class="mb-12 text-left">
        <h2 class="text-xl sm:text-2xl font-display font-bold text-[#1F1E1B] dark:text-white mb-6 flex items-center gap-2">
          <GraduationCap class="w-5 h-5 text-brand-accent" />
          <span>{{ t('about.education') }}</span>
        </h2>

        <div class="relative pl-6 border-l-2 border-light-border dark:border-dark-border ml-3">
          <div
            v-for="(edu, idx) in profile.education"
            :key="idx"
            class="relative mb-6 last:mb-0"
          >
            <!-- Bullet -->
            <div class="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-brand-accent ring-4 ring-light-bg dark:ring-dark-bg" />

            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <h3 class="text-base font-bold text-neutral-800 dark:text-neutral-200">
                {{ edu.institution[locale] }} — <span class="text-neutral-500 dark:text-neutral-400 font-medium text-sm">{{ edu.degree[locale] }}</span>
              </h3>
              <span class="text-xs font-mono text-neutral-400 dark:text-neutral-500">{{ edu.period }}</span>
            </div>
            <p v-if="edu.gpa" class="text-xs text-brand-accent font-semibold mt-1">{{ edu.gpa }}</p>
          </div>
        </div>
      </div>

      <!-- Research Interests -->
      <div class="mb-12 text-left">
        <h2 class="text-xl sm:text-2xl font-display font-bold text-[#1F1E1B] dark:text-white mb-6 flex items-center gap-2">
          <BrainCircuit class="w-5 h-5 text-brand-accent" />
          <span>{{ t('about.researchInterests') }}</span>
        </h2>

        <div class="flex flex-wrap gap-2.5">
          <div
            v-for="interest in researchInterests"
            :key="interest"
            class="px-4 py-2.5 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface/30 hover:border-brand-accent/30 transition-all duration-200"
          >
            <span class="text-xs font-semibold text-neutral-700 dark:text-neutral-300 font-mono">{{ interest }}</span>
          </div>
        </div>
      </div>

      <!-- Quick Contact Info -->
      <div class="p-6 rounded-xl border border-light-border dark:border-dark-border bg-light-elevated/40 dark:bg-dark-surface/10 text-center select-none">
        <h3 class="text-base font-bold text-neutral-850 dark:text-neutral-100">{{ t('about.collaborations') }}</h3>
        <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-2 max-w-md mx-auto leading-relaxed">
          {{ t('about.collabDesc') }}
        </p>
        <div class="mt-4">
          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-accent hover:text-brand-accentHover"
          >
            <span>{{ t('about.navContact') }}</span>
            <ArrowRight class="w-3.5 h-3.5" />
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { GraduationCap, BrainCircuit, FileDown, ArrowRight } from 'lucide-vue-next'
import { useI18n } from '~/composables/useI18n'
import { profileData as profile } from '~/data/profile'

const { locale, t } = useI18n()

useHead({
  title: 'About Me',
  meta: [
    { name: 'description', content: `Learn about Lu Tsung-Hsin (呂宗昕)'s academic achievements, education background, and research interests.` }
  ]
})

const researchInterests = [
  'Deep Reinforcement Learning',
  'UAV Navigation',
  'Vision-Language Navigation',
  'Diffusion Transformers',
  'Graph Attention Networks',
  'Multi-agent Collaboration',
  'Dynamic Obstacle Avoidance',
  'Computer Vision',
  'Multi-modal Processing'
]
</script>
