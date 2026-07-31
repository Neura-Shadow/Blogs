<template>
  <section class="py-20 md:py-28 bg-light-bg dark:bg-dark-bg transition-colors duration-300 border-b border-light-border dark:border-dark-border relative">
    <div class="max-w-6xl mx-auto px-4">

      <!-- Heading -->
      <SectionHeading
        eyebrow="Skills"
        title="skills.title"
        description="skills.description"
        align="left"
      >
        <template #icon>
          <Cpu class="w-3.5 h-3.5 text-brand-accent" />
        </template>
      </SectionHeading>

      <!-- Matrix Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div
          v-for="group in profile.skills"
          :key="group.category.en"
          class="flex flex-col h-full"
        >
          <!-- Category Card -->
          <div class="h-full p-8 sm:p-10 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface/40 hover:border-brand-accent/40 dark:hover:border-brand-accent/30 transition-all duration-300 hover:shadow-md flex flex-col justify-between">
            <div>
              <!-- Header -->
              <div class="flex items-center gap-3 mb-8">
                <component
                  :is="getCategoryIcon(group.category.en)"
                  class="w-6 h-6 text-brand-accent"
                />
                <h3 class="font-display font-bold text-xl sm:text-2xl text-[#1F1E1B] dark:text-white leading-tight">
                  {{ group.category[locale] }}
                </h3>
              </div>

              <!-- Skill Items -->
              <div class="space-y-6">
                <div
                  v-for="skill in group.skills"
                  :key="skill.name"
                  class="group/skill flex flex-col p-4 sm:p-5 rounded-lg border border-light-border dark:border-dark-border bg-light-elevated/40 dark:bg-dark-bg/60 hover:bg-light-elevated dark:hover:bg-dark-elevated transition-all duration-200"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-sm sm:text-base font-bold text-[#1F1E1B] dark:text-neutral-200 font-mono">
                      {{ skill.name }}
                    </span>
                    <span
                      class="text-xs px-2.5 py-0.5 rounded-md font-mono font-semibold"
                      :class="getLevelClass(skill.level || '')"
                    >
                      {{ skill.level }}
                    </span>
                  </div>
                  <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                    {{ skill.description ? skill.description[locale] : '' }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Subtle background branding link/logo indicator at the bottom -->
            <div class="mt-8 pt-6 border-t border-light-border dark:border-dark-border/20 flex items-center justify-between text-xs text-neutral-400">
              <span class="font-mono">Engineering Practice</span>
              <div class="w-2 h-2 rounded-full bg-brand-accent/60 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { Cpu, Server, Laptop, Compass } from 'lucide-vue-next'
import { useI18n } from '~/composables/useI18n'
import { profileData as profile } from '~/data/profile'
import SectionHeading from '~/components/ui/SectionHeading.vue'

const { locale, t } = useI18n()

const getCategoryIcon = (category: string) => {
  if (category.toLowerCase().includes('cloud') || category.toLowerCase().includes('backend')) {
    return Server
  }
  if (category.toLowerCase().includes('full-stack') || category.toLowerCase().includes('real-time')) {
    return Laptop
  }
  if (category.toLowerCase().includes('ai') || category.toLowerCase().includes('research') || category.toLowerCase().includes('vision')) {
    return Cpu
  }
  return Compass
}

const getLevelClass = (level: string) => {
  switch (level.toLowerCase()) {
    case 'expert':
      return 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20'
    case 'advanced':
      return 'bg-brand-linear/10 text-brand-linear border border-brand-linear/20'
    case 'intermediate':
      return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-light-border dark:border-dark-border'
    default:
      return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-light-border dark:border-dark-border'
  }
}
</script>
