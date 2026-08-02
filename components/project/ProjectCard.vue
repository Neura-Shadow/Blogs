<template>
  <ThreeDTiltCard :max-tilt="8" class="h-full" :class="themeClasses">
    <NuxtLink
      :to="{ name: 'projects-slug', params: { slug: project.slug } }"
      class="group flex h-full flex-col justify-between p-6 text-left"
    >
      <div>
        <ProjectCover
          :src="project.cover"
          :alt="project.title[locale]"
          container-class="mb-6"
          image-class="group-hover:scale-[1.02]"
        />

        <!-- Top row: Number and Link Indicator -->
        <div class="flex items-center justify-between mb-6">
          <span class="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-mono font-bold bg-light-bg dark:bg-dark-bg text-neutral-500 dark:text-neutral-400 border border-light-border dark:border-dark-border">
            {{ index !== undefined ? String(index + 1).padStart(2, '0') : '•' }}
          </span>
          <div class="w-8 h-8 rounded-full flex items-center justify-center bg-light-elevated dark:bg-dark-surface text-neutral-600 dark:text-neutral-300 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
            <ArrowUpRight class="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        <!-- Project Title -->
        <h3 data-testid="project-card-title" class="text-card-title line-clamp-3 font-bold tracking-tight text-[#1F1E1B] transition-colors duration-300 group-hover:text-brand-accent dark:text-white">
          {{ project.title[locale] }}
        </h3>

        <p v-if="project.subtitle" data-testid="project-card-subtitle" class="mt-2 line-clamp-2 text-public-body-sm font-semibold text-brand-accent">
          {{ project.subtitle[locale] }}
        </p>

        <!-- Project Description -->
        <p data-testid="project-card-description" class="text-card-body mt-3.5 line-clamp-4 text-neutral-500 dark:text-neutral-400">
          {{ project.description[locale] }}
        </p>
      </div>

      <!-- Footer: Tech Badges -->
      <div class="mt-8">
        <div class="flex flex-wrap gap-1.5 pt-4 border-t border-light-border dark:border-dark-border/60">
          <TechBadge
            v-for="tag in project.tags.slice(0, 4)"
            :key="tag"
            :variant="tag === 'MAVLink' || tag === 'DRL' || tag === 'Go' || tag === 'Golang' ? 'brand' : 'neutral'"
          >
            {{ tag }}
          </TechBadge>
          <span v-if="project.tags.length > 4" class="text-public-micro flex items-center self-center px-1 font-mono text-neutral-400 dark:text-neutral-500">
            +{{ project.tags.length - 4 }}
          </span>
        </div>
      </div>
    </NuxtLink>
  </ThreeDTiltCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'
import type { Project } from '~/types/project'
import { useI18n } from '~/composables/useI18n'
import ProjectCover from '~/components/project/ProjectCover.vue'
import ThreeDTiltCard from '~/components/ui/ThreeDTiltCard.vue'
import TechBadge from '~/components/ui/TechBadge.vue'

const { locale } = useI18n()

const props = withDefaults(defineProps<{
  project: Project
  index?: number
  dark?: boolean
}>(), {
  dark: false
})

const themeClasses = computed(() => {
  if (props.dark) {
    return 'bg-dark-surface border-white/5 shadow-md hover:border-brand-accent/30 text-white'
  }
  return 'bg-white dark:bg-dark-surface border-light-border dark:border-dark-border shadow-sm hover:border-brand-accent/30'
})
</script>
