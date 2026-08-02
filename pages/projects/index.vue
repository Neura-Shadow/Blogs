<template>
  <div class="py-12 md:py-20 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
    <div class="max-w-6xl mx-auto px-4">

      <!-- Heading -->
      <SectionHeading
        eyebrow="Portfolio"
        title="projects.title"
        description="projects.description"
        align="left"
      >
        <template #icon>
          <Layers class="w-3.5 h-3.5 text-brand-accent" />
        </template>
      </SectionHeading>

      <!-- Search and Filter Bar -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-light-border dark:border-dark-border">

        <!-- Filter Tabs -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:flex-1 md:flex-wrap md:overflow-visible">
          <button
            v-for="filter in categories"
            :key="filter.id"
            :aria-pressed="activeFilterId === filter.id"
            @click="activeFilterId = filter.id"
            class="text-public-caption min-h-11 whitespace-nowrap rounded-lg border px-4 py-2 font-semibold transition-all duration-200"
            :class="activeFilterId === filter.id
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-sm'
              : 'bg-white dark:bg-dark-surface text-neutral-600 dark:text-neutral-400 border-light-border dark:border-dark-border hover:bg-light-elevated dark:hover:bg-dark-elevated'"
          >
            {{ filter.label }}
            <span class="text-public-micro ml-1 font-mono opacity-65" aria-hidden="true">{{ filter.count }}</span>
          </button>
        </div>

        <!-- Search Bar -->
        <div class="relative w-full md:w-72">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
            <Search class="w-4 h-4" />
          </span>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('projects.searchPlaceholder')"
            class="text-public-body-sm min-h-11 w-full rounded-lg border border-light-border bg-white py-2 pl-9 pr-4 text-neutral-800 outline-none transition-colors focus:border-brand-accent focus:ring-1 focus:ring-brand-accent dark:border-dark-border dark:bg-dark-surface dark:text-neutral-150"
          />
        </div>

      </div>

      <!-- Project Cards Grid -->
      <div v-if="isLoading" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        <div v-for="index in 6" :key="index" class="aspect-[4/3] animate-pulse rounded-2xl bg-light-elevated dark:bg-dark-surface" />
      </div>

      <div v-else-if="error" class="rounded-xl border border-rose-200 bg-rose-50 p-8 text-center dark:border-rose-900/40 dark:bg-rose-950/20" role="alert">
        <AlertCircle class="mx-auto mb-3 h-10 w-10 text-rose-500" />
        <h3 class="text-content-subheading font-bold text-neutral-800 dark:text-neutral-200">{{ t('projects.loadError') }}</h3>
        <button class="text-button mt-4 min-h-11 rounded-lg bg-brand-accent px-4 py-2 font-semibold text-white" @click="refresh()">
          {{ t('projects.tryAgain') }}
        </button>
      </div>

      <div v-else-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="project in filteredProjects"
          :key="project.slug"
        >
          <!-- Light card styling for normal project lists -->
          <SpotlightCard color="rgba(0, 168, 132, 0.03)" :radius="250" class="h-full">
            <ProjectCard :project="project" :dark="false" />
          </SpotlightCard>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20 border border-dashed border-light-border dark:border-dark-border rounded-xl">
        <FolderOpen class="w-12 h-12 text-neutral-300 dark:text-neutral-700 mx-auto mb-4" />
        <h3 class="text-content-subheading font-bold text-neutral-800 dark:text-neutral-200">{{ t('projects.notFound') }}</h3>
        <p class="text-public-body-sm mx-auto mt-2 max-w-sm text-neutral-500 dark:text-neutral-400">
          {{ t('projects.notFoundDesc') }}
        </p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Layers, Search, FolderOpen, AlertCircle } from 'lucide-vue-next'
import { useI18n } from '~/composables/useI18n'
import SectionHeading from '~/components/ui/SectionHeading.vue'
import SpotlightCard from '~/components/ui/SpotlightCard.vue'
import ProjectCard from '~/components/project/ProjectCard.vue'
import { fetchProjects } from '~/composables/useProjects'
import { projectFilters } from '~/data/engineering'

const { locale, t } = useI18n()

useHead({
  title: 'Projects',
  meta: [
    { name: 'description', content: 'Explore my projects in UAV Swarms, AI Navigation, cloud architectures, and computer vision.' }
  ]
})

const searchQuery = ref('')
const activeFilterId = ref('all')

const { data: projects, status, error, refresh } = await useAsyncData(
  'projects-list:public',
  fetchProjects,
  { default: () => [] }
)

const isLoading = computed(() => status.value === 'idle' || status.value === 'pending')

const matchesFilter = (project: (typeof projects.value)[number], filterId: string) => {
  const filter = projectFilters.find(item => item.id === filterId) || projectFilters[0]
  if (!filter.matchTerms.length) return true
  const searchable = [project.category, ...project.tags, ...project.stack].join(' ').toLowerCase()
  return filter.matchTerms.some(term => searchable.includes(term.toLowerCase()))
}

const categories = computed(() => projectFilters.map(filter => ({
  id: filter.id,
  label: filter.label[locale.value],
  count: projects.value.filter(project => matchesFilter(project, filter.id)).length
})))

const filteredProjects = computed(() => {
  return projects.value.filter(project => {
    const categoryMatches = matchesFilter(project, activeFilterId.value)

    // Search query match
    const query = searchQuery.value.toLowerCase().trim()
    const searchMatches = !query ||
      project.title[locale.value].toLowerCase().includes(query) ||
      (project.subtitle && project.subtitle[locale.value].toLowerCase().includes(query)) ||
      project.description[locale.value].toLowerCase().includes(query) ||
      project.tags.some(tag => tag.toLowerCase().includes(query)) ||
      project.stack.some(s => s.toLowerCase().includes(query))

    return categoryMatches && searchMatches
  })
})
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-none {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
