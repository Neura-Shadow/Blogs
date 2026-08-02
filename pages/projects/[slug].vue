<template>
  <div v-if="isLoading" class="min-h-[60dvh] bg-light-bg px-4 py-16 dark:bg-dark-bg" aria-live="polite">
    <div class="mx-auto max-w-6xl animate-pulse space-y-8">
      <div class="h-4 w-32 rounded bg-neutral-200 dark:bg-neutral-800" />
      <div class="rounded-2xl border border-light-border bg-light-surface p-8 dark:border-dark-border dark:bg-dark-surface/40 sm:p-10">
        <div class="h-5 w-40 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div class="mt-5 h-12 max-w-3xl rounded bg-neutral-200 dark:bg-neutral-800" />
        <div class="mt-8 aspect-[16/9] rounded-xl bg-[#F3EEE5] dark:bg-dark-elevated" />
      </div>
    </div>
  </div>

  <div v-else-if="project" class="py-12 md:py-20 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
    <div class="max-w-6xl mx-auto px-4">
      <NuxtLink
        to="/projects"
        class="inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-brand-accent transition-colors mb-8"
      >
        <ArrowLeft class="w-3.5 h-3.5" />
        <span>{{ t('projects.backToProjects') }}</span>
      </NuxtLink>

      <div class="p-8 sm:p-10 rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface/40 mb-10 text-left">
        <div class="flex flex-wrap gap-2.5 mb-4">
          <span class="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-accent/10 border border-brand-accent/20 text-brand-accent">
            {{ projectCategoryLabels[project.category]?.[locale] || project.category }}
          </span>
          <span class="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-linear/10 border border-brand-linear/20 text-brand-linear">
            {{ project.status[locale] }}
          </span>
        </div>

        <h1 class="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-[#1F1E1B] dark:text-white leading-tight">
          {{ project.title[locale] }}
        </h1>

        <p v-if="project.subtitle" class="mt-2 text-base sm:text-lg text-neutral-500 dark:text-neutral-400">
          {{ project.subtitle[locale] }}
        </p>

        <ProjectCover :src="project.cover" :alt="project.title[locale]" eager container-class="mt-8" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div class="lg:col-span-4 order-last lg:order-first">
          <div class="sticky top-24 space-y-6">
            <div class="p-6 rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface/30 text-left">
              <h3 class="text-sm font-bold text-neutral-800 dark:text-neutral-200 pb-3 border-b border-light-border dark:border-dark-border mb-4">
                {{ t('projects.matrixTitle') }}
              </h3>

              <ul class="space-y-4 text-xs">
                <li>
                  <span class="block text-[10px] text-neutral-400 uppercase tracking-wider">{{ t('projects.role') }}</span>
                  <span class="font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5 block leading-relaxed">{{ project.role[locale] }}</span>
                </li>
                <li>
                  <span class="block text-[10px] text-neutral-400 uppercase tracking-wider">{{ t('projects.status') }}</span>
                  <span class="font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5 block leading-relaxed">{{ project.status[locale] }}</span>
                </li>
                <li v-if="project.stack && project.stack.length > 0">
                  <span class="block text-[10px] text-neutral-400 uppercase tracking-wider mb-2">{{ t('projects.stack') }}</span>
                  <div class="flex flex-wrap gap-1.5">
                    <TechBadge v-for="item in project.stack" :key="item" variant="neutral">
                      {{ item }}
                    </TechBadge>
                  </div>
                </li>
              </ul>
            </div>

            <div
              v-if="project.links.repo || project.links.demo || project.links.paper"
              class="p-6 rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface/30 space-y-3 text-left"
            >
              <h3 class="text-sm font-bold text-neutral-800 dark:text-neutral-200 pb-2 mb-2">
                {{ t('projects.resources') }}
              </h3>
              <a v-if="project.links.repo" :href="project.links.repo" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between w-full p-2.5 rounded-lg border border-light-border dark:border-dark-border hover:bg-light-elevated dark:hover:bg-dark-elevated text-xs font-semibold transition-colors">
                <span class="flex items-center gap-2"><Github class="w-4 h-4 text-neutral-500" /><span>{{ t('projects.codeRepo') }}</span></span>
                <ArrowUpRight class="w-3.5 h-3.5 text-neutral-400" />
              </a>
              <a v-if="project.links.demo" :href="project.links.demo" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between w-full p-2.5 rounded-lg border border-light-border dark:border-dark-border hover:bg-light-elevated dark:hover:bg-dark-elevated text-xs font-semibold transition-colors">
                <span class="flex items-center gap-2"><Globe class="w-4 h-4 text-neutral-500" /><span>{{ t('projects.liveDemo') }}</span></span>
                <ArrowUpRight class="w-3.5 h-3.5 text-neutral-400" />
              </a>
              <a v-if="project.links.paper" :href="project.links.paper" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between w-full p-2.5 rounded-lg border border-light-border dark:border-dark-border hover:bg-light-elevated dark:hover:bg-dark-elevated text-xs font-semibold transition-colors">
                <span class="flex items-center gap-2"><BookOpen class="w-4 h-4 text-neutral-500" /><span>{{ t('projects.researchPaper') }}</span></span>
                <ArrowUpRight class="w-3.5 h-3.5 text-neutral-400" />
              </a>
            </div>
          </div>
        </div>

        <div class="lg:col-span-8 space-y-10 text-left">
          <div class="prose prose-neutral dark:prose-invert max-w-none">
            <h2 class="text-xl font-bold text-[#1F1E1B] dark:text-white mb-3">{{ t('projects.overview') }}</h2>
            <p class="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {{ project.longDescription ? project.longDescription[locale] : project.description[locale] }}
            </p>
          </div>

          <div v-if="project.highlights && project.highlights[locale] && project.highlights[locale].length > 0">
            <h2 class="text-xl font-bold text-[#1F1E1B] dark:text-white mb-4">{{ t('projects.highlights') }}</h2>
            <ul class="space-y-3">
              <li v-for="(item, idx) in project.highlights[locale]" :key="idx" class="flex items-start gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <CheckCircle2 class="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div v-if="project.challenges && project.challenges[locale] && project.challenges[locale].length > 0">
            <h2 class="text-xl font-bold text-[#1F1E1B] dark:text-white mb-4">{{ t('projects.challenges') }}</h2>
            <ul class="space-y-3">
              <li v-for="(item, idx) in project.challenges[locale]" :key="idx" class="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <AlertCircle class="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div v-if="project.results && project.results[locale] && project.results[locale].length > 0">
            <h2 class="text-xl font-bold text-[#1F1E1B] dark:text-white mb-4">{{ t('projects.results') }}</h2>
            <ul class="space-y-3">
              <li v-for="(item, idx) in project.results[locale]" :key="idx" class="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <Activity class="w-5 h-5 text-brand-linear shrink-0 mt-0.5" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="error" class="min-h-[60dvh] bg-light-bg px-4 py-24 text-center dark:bg-dark-bg" role="alert">
    <AlertCircle class="mx-auto mb-4 h-16 w-16 text-rose-500" />
    <h1 class="text-xl font-bold text-neutral-800 dark:text-neutral-200">{{ t('projects.loadError') }}</h1>
    <p class="mx-auto mt-2 max-w-md text-sm text-neutral-500">{{ t('projects.loadErrorDesc') }}</p>
    <button class="mt-6 rounded-lg bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-accentHover" @click="refresh()">
      {{ t('projects.tryAgain') }}
    </button>
  </div>

  <div v-else-if="isNotFound" class="py-24 text-center bg-light-bg dark:bg-dark-bg transition-colors duration-300">
    <FolderOpen class="w-16 h-16 text-neutral-300 dark:text-neutral-800 mx-auto mb-4" />
    <h1 class="text-xl font-bold text-neutral-800 dark:text-neutral-200">{{ t('projects.notFound') }}</h1>
    <p class="text-sm text-neutral-500 mt-1 mb-8">{{ t('projects.notFoundDesc') }}</p>
    <NuxtLink to="/projects" class="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-brand-accent hover:bg-brand-accentHover">
      {{ t('projects.returnToProjects') }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, ArrowUpRight, Github, Globe, BookOpen, CheckCircle2, AlertCircle, Activity, FolderOpen } from 'lucide-vue-next'
import { useI18n } from '~/composables/useI18n'
import TechBadge from '~/components/ui/TechBadge.vue'
import ProjectCover from '~/components/project/ProjectCover.vue'
import { fetchProjectBySlug } from '~/composables/useProjects'
import { projectCategoryLabels } from '~/data/engineering'

const route = useRoute()
const { locale, t } = useI18n()
const slug = computed(() => String(route.params.slug ?? '').trim())
const asyncKey = computed(() => `project-detail:${slug.value}`)

const { data: project, status, error, refresh } = await useAsyncData(
  asyncKey,
  () => fetchProjectBySlug(slug.value),
  {
    watch: [slug],
    server: true,
    lazy: false,
    immediate: true,
    dedupe: 'cancel',
    default: () => null
  }
)

const isLoading = computed(() => status.value === 'idle' || status.value === 'pending')
const isNotFound = computed(() => status.value === 'success' && !project.value)

useHead(() => ({
  title: project.value?.title[locale.value] || 'Project Details',
  meta: [{
    name: 'description',
    content: project.value?.description[locale.value] || 'Read about project details and systems architecture.'
  }]
}))
</script>
