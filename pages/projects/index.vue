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
            v-for="(catName, idx) in categories"
            :key="idx"
            @click="activeCategoryIndex = idx"
            class="whitespace-nowrap px-4 py-2 rounded-lg text-xs font-semibold border transition-all duration-200"
            :class="activeCategoryIndex === idx
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-sm'
              : 'bg-white dark:bg-dark-surface text-neutral-600 dark:text-neutral-400 border-light-border dark:border-dark-border hover:bg-light-elevated dark:hover:bg-dark-elevated'"
          >
            {{ catName }}
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
            class="w-full pl-9 pr-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-neutral-800 dark:text-neutral-150 text-xs focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-colors"
          />
        </div>

      </div>

      <!-- Project Cards Grid -->
      <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <h3 class="text-base font-bold text-neutral-800 dark:text-neutral-200">{{ t('projects.notFound') }}</h3>
        <p class="text-xs text-neutral-400 dark:text-neutral-500 mt-1 max-w-xs mx-auto">
          {{ t('projects.notFoundDesc') }}
        </p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Layers, Search, FolderOpen } from 'lucide-vue-next'
import { useI18n } from '~/composables/useI18n'
import SectionHeading from '~/components/ui/SectionHeading.vue'
import SpotlightCard from '~/components/ui/SpotlightCard.vue'
import ProjectCard from '~/components/project/ProjectCard.vue'
import { dbProjectToProject } from '~/utils/cmsMappers'

const { locale, t } = useI18n()

useHead({
  title: 'Projects',
  meta: [
    { name: 'description', content: 'Explore my projects in UAV Swarms, AI Navigation, cloud architectures, and computer vision.' }
  ]
})

const searchQuery = ref('')
const activeCategoryIndex = ref(0)

const categories = computed(() => [
  t('projects.allCategories'),
  t('projects.categoryBackend'),
  t('projects.categoryRobotics'),
  t('projects.categoryUAV'),
  t('projects.categoryFullStack'),
  t('projects.categoryAI'),
  t('projects.categoryCloud'),
  t('projects.categoryVision'),
  t('projects.categoryLegacy')
])

const filterKeys = ['all', 'backend systems', 'robotics research', 'uav systems', 'full-stack', 'ai research', 'cloud native', 'computer vision', 'legacy / archive']

const { data: apiProjects } = await useAsyncData<any[]>('projects-list', () => $fetch('/api/projects'))

const projects = computed(() => {
  return (apiProjects.value || []).map(dbProjectToProject)
})

const filteredProjects = computed(() => {
  return projects.value.filter(project => {
    // Category match
    const selectedKey = filterKeys[activeCategoryIndex.value]
    const searchableCategories = [project.category, ...project.tags].join(' ').toLowerCase()
    const categoryMatches = selectedKey === 'all' || searchableCategories.includes(selectedKey)

    // Search query match
    const query = searchQuery.value.toLowerCase().trim()
    const searchMatches = !query ||
      project.title[locale.value].toLowerCase().includes(query) ||
      (project.subtitle && project.subtitle[locale.value].toLowerCase().includes(query)) ||
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
