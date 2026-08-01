<template>
  <section class="py-20 md:py-28 bg-light-elevated dark:bg-[#121110] border-y border-light-border dark:border-dark-border relative overflow-hidden select-none">
    <!-- Grid pattern underneath to add technical feel -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 pointer-events-none" />

    <!-- Accent glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

    <div class="relative z-10 max-w-6xl mx-auto px-4">

      <!-- Heading Row -->
      <div class="flex items-end justify-between mb-12">
        <div class="text-left">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full text-xs font-semibold bg-brand-accent/10 border border-brand-accent/20 text-brand-accent">
            <Star class="w-3.5 h-3.5 fill-brand-accent" />
            <span>Showcase</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#1F1E1B] dark:text-white">
            {{ t('projects.title') }}
          </h2>
          <p class="mt-2 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-xl">
            {{ t('projects.description') }}
          </p>
        </div>

        <NuxtLink
          to="/projects"
          class="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-brand-accent hover:text-brand-accentHover transition-colors group"
        >
          <span>{{ t('projects.viewAll') }}</span>
          <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </NuxtLink>
      </div>

      <!-- Projects Grid -->
      <div v-if="isLoading" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        <div v-for="index in 3" :key="index" class="aspect-[4/3] animate-pulse rounded-2xl bg-white/70 dark:bg-dark-surface" />
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(project, idx) in featuredProjects"
          :key="project.slug"
          class="h-full"
        >
          <!-- Wrap in SpotlightCard for border & background highlight -->
          <SpotlightCard color="rgba(0, 168, 132, 0.04)" :radius="300" class="h-full">
            <ProjectCard :project="project" :index="idx" :dark="false" />
          </SpotlightCard>
        </div>
      </div>

      <!-- Mobile Footer Action -->
      <div class="mt-8 text-center sm:hidden">
        <NuxtLink
          to="/projects"
          class="inline-flex items-center gap-1 text-sm font-semibold text-brand-accent"
        >
          <span>{{ t('projects.viewAll') }}</span>
          <ArrowRight class="w-4 h-4" />
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Star, ArrowRight } from 'lucide-vue-next'
import { useI18n } from '~/composables/useI18n'
import ProjectCard from '~/components/project/ProjectCard.vue'
import SpotlightCard from '~/components/ui/SpotlightCard.vue'
import { fetchProjects } from '~/composables/useProjects'

const { t } = useI18n()

const { data: projects, status } = await useAsyncData(
  'featured-projects:public',
  fetchProjects,
  { default: () => [] }
)

const featuredProjects = computed(() => {
  return projects.value.filter(project => project.featured)
})

const isLoading = computed(() => status.value === 'idle' || status.value === 'pending')
</script>
