<template>
  <section class="py-20 md:py-28 bg-light-elevated dark:bg-[#121110] transition-colors duration-300 border-b border-light-border dark:border-dark-border relative">
    <div class="max-w-6xl mx-auto px-4">

      <!-- Heading -->
      <SectionHeading
        eyebrow="Research"
        title="research.title"
        description="research.description"
        align="left"
      >
        <template #icon>
          <BookOpen class="w-3.5 h-3.5 text-brand-accent" />
        </template>
      </SectionHeading>

      <!-- Highlights Timeline/Grid -->
      <div class="space-y-8 mt-12 max-w-4xl">
        <div
          v-for="(item, idx) in profile.research"
          :key="idx"
          class="relative pl-8 sm:pl-12 border-l border-light-border dark:border-dark-border pb-8 last:pb-0 text-left"
        >
          <!-- Timeline Bullet -->
          <div class="absolute -left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-brand-accent ring-4 ring-light-elevated dark:ring-dark-bg" />

          <!-- Content Card -->
          <div class="p-6 rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface/40 hover:border-brand-accent/30 transition-all duration-300">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 class="text-lg font-bold text-[#1F1E1B] dark:text-white leading-tight font-display">
                {{ item.title[locale] }}
              </h3>

              <!-- Paper Link if present -->
              <a
                v-if="item.link"
                :href="item.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-accent hover:text-brand-accentHover self-start"
              >
                <span>Read paper</span>
                <ArrowUpRight class="w-3.5 h-3.5" />
              </a>
              <span
                v-else
                class="text-[10px] px-2 py-0.5 rounded bg-light-elevated dark:bg-dark-elevated text-neutral-500 dark:text-neutral-400 font-mono self-start border border-light-border dark:border-dark-border"
              >
                {{ t('research.statusSubmitted') }}
              </span>
            </div>

            <p class="mt-3 text-sm text-neutral-550 dark:text-neutral-400 leading-relaxed">
              {{ item.description[locale] }}
            </p>

            <!-- Tags -->
            <div class="mt-5 flex flex-wrap gap-1.5">
              <TechBadge
                v-for="tag in item.tags"
                :key="tag"
                variant="neutral"
              >
                {{ tag }}
              </TechBadge>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { BookOpen, ArrowUpRight } from 'lucide-vue-next'
import { useI18n } from '~/composables/useI18n'
import { profileData as profile } from '~/data/profile'
import SectionHeading from '~/components/ui/SectionHeading.vue'
import TechBadge from '~/components/ui/TechBadge.vue'

const { locale, t } = useI18n()
</script>
