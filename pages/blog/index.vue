<template>
  <div class="py-12 md:py-20 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-4">

      <!-- Heading -->
      <SectionHeading
        eyebrow="Writing"
        title="blog.title"
        description="blog.description"
        align="left"
      >
        <template #icon>
          <PenTool class="w-3.5 h-3.5 text-brand-accent" />
        </template>
      </SectionHeading>

      <!-- Category Filter & Search -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-light-border dark:border-dark-border">
        <!-- Categories -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1.5 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            v-for="(cat, idx) in categories"
            :key="idx"
            @click="activeCategoryIndex = idx"
            class="whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200"
            :class="activeCategoryIndex === idx
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-sm'
              : 'bg-white dark:bg-dark-surface text-neutral-600 dark:text-neutral-400 border-light-border dark:border-dark-border hover:bg-light-elevated dark:hover:bg-dark-elevated'"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Search -->
        <div class="relative w-full sm:w-64">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
            <Search class="w-4 h-4" />
          </span>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('blog.searchPlaceholder')"
            class="w-full pl-9 pr-4 py-2 rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface text-neutral-850 dark:text-neutral-100 text-xs focus:ring-1 focus:ring-brand-accent focus:border-brand-accent outline-none transition-colors"
          />
        </div>
      </div>

      <!-- Articles List -->
      <div v-if="filteredArticles.length > 0" class="space-y-8">
        <article
          v-for="post in filteredArticles"
          :key="post._path || post.slug"
          class="group flex flex-col md:flex-row md:items-start gap-4 md:gap-6 p-6 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface/10 hover:border-brand-accent/30 transition-all duration-300"
        >
          <!-- Date / Tag Column -->
          <div class="md:w-32 shrink-0 text-left">
            <span class="block text-xs font-mono text-neutral-400 dark:text-neutral-500">
              {{ formatDate(post.date) }}
            </span>
            <span class="inline-flex mt-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-brand-accent/5 border border-brand-accent/20 text-brand-accent">
              {{ post.category }}
            </span>
          </div>

          <!-- Main Details -->
          <div class="flex-grow text-left">
            <h3 class="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-brand-accent transition-colors duration-200 leading-tight">
              <NuxtLink :to="post._path || `/blog/${post.slug}`">
                {{ post.title }}
              </NuxtLink>
            </h3>

            <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed line-clamp-3">
              {{ post.description }}
            </p>

            <div class="mt-4 flex items-center justify-between">
              <span class="text-xs text-neutral-400 dark:text-neutral-500 font-mono">
                {{ post.readingTime || '5' }} {{ t('blog.readTime') }}
              </span>

              <NuxtLink
                :to="post._path || `/blog/${post.slug}`"
                class="inline-flex items-center gap-1 text-xs font-semibold text-brand-accent hover:text-brand-accentHover"
              >
                <span>{{ t('blog.readFull') }}</span>
                <ArrowRight class="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20 border border-dashed border-light-border dark:border-dark-border rounded-xl">
        <BookOpen class="w-12 h-12 text-neutral-300 dark:text-neutral-700 mx-auto mb-4" />
        <h3 class="text-base font-bold text-neutral-800 dark:text-neutral-200">{{ t('blog.notFound') }}</h3>
        <p class="text-xs text-neutral-400 dark:text-neutral-500 mt-1 max-w-xs mx-auto">
          {{ t('blog.notFoundDesc') }}
        </p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { PenTool, Search, ArrowRight, BookOpen } from 'lucide-vue-next'
import { useI18n } from '~/composables/useI18n'
import { postToBlogListItem, type CmsPost } from '~/utils/cmsMappers'
import SectionHeading from '~/components/ui/SectionHeading.vue'

const { locale, t } = useI18n()

// Custom interface for local representation
interface BlogPost {
  _path?: string
  slug: string
  title: string
  description: string
  date: string
  category: string
  readingTime: string
}

useHead({
  title: 'Blog',
  meta: [
    { name: 'description', content: `Lu Tsung-Hsin (呂宗昕)'s technical journal covering backend development, cloud orchestration, and AI systems.` }
  ]
})

const searchQuery = ref('')
const activeCategoryIndex = ref(0)

const categories = computed(() => [
  t('blog.allCategories'),
  t('blog.catArchitecture'),
  t('blog.catRoboticsEngineering'),
  t('blog.catAIEngineering'),
  t('blog.catCloudNative'),
  t('blog.catSystemIntegration')
])

const filterKeys = ['all', 'architecture', 'robotics-engineering', 'ai-engineering', 'cloud-native', 'system-integration']

const categoryMatchesKey = (category: string, selectedKey: string) => {
  const normalized = category.toLowerCase()
  if (selectedKey === 'all') return true
  if (selectedKey === 'architecture') {
    return normalized.includes('architecture') || normalized.includes('系統架構')
  }
  if (selectedKey === 'robotics-engineering') {
    return normalized.includes('robotics') || normalized.includes('機器人')
  }
  if (selectedKey === 'ai-engineering') {
    return normalized.includes('ai engineering') || normalized.includes('ai 工程')
  }
  if (selectedKey === 'cloud-native') {
    return normalized.includes('cloud native') || normalized.includes('雲原生')
  }
  if (selectedKey === 'system-integration') {
    return normalized.includes('system integration') || normalized.includes('系統整合')
  }
  return normalized.includes(selectedKey)
}

// Fallback template articles matching the visual mockups
const fallbackPosts = computed<BlogPost[]>(() => {
  return [
    {
      slug: 'designing-scalable-microservices-with-event-driven-architecture',
      title: locale.value === 'zh-TW'
        ? '利用事件驅動架構設計高擴展性微服務'
        : 'Designing Scalable Microservices with Event-Driven Architecture',
      description: locale.value === 'zh-TW'
        ? '一篇工程筆記，整理雲原生後端系統中的服務邊界、事件流、冪等消費者與可觀測性設計。'
        : 'An engineering note on service boundaries, event streams, idempotent consumers, and observability for cloud-native backend systems.',
      date: '2024-05-10',
      category: locale.value === 'zh-TW' ? '系統架構' : 'Architecture',
      readingTime: '10'
    },
    {
      slug: 'gwm-uav-navigation-sparse-rewards',
      title: locale.value === 'zh-TW'
        ? 'GWM-UAV 導航系統的工程管線筆記'
        : 'GWM-UAV Navigation as an Engineering Pipeline',
      description: locale.value === 'zh-TW'
        ? '一篇工程 walkthrough，整理 UAV 導航管線如何結合稀疏獎勵學習、圖記憶、模擬環境與安全檢查。'
        : 'An engineering walkthrough for UAV navigation pipelines that combine sparse-reward learning, graph memory, simulation, and safety checks.',
      date: '2024-04-22',
      category: locale.value === 'zh-TW' ? '機器人工程' : 'Robotics Engineering',
      readingTime: '11'
    },
    {
      slug: 'diffusion-transformer-video-anomaly-detection',
      title: locale.value === 'zh-TW'
        ? '基於 Diffusion Transformer 的視訊異常偵測工程筆記'
        : 'Diffusion Transformer for Video Anomaly Detection',
      description: locale.value === 'zh-TW'
        ? '一篇 AI engineering 筆記，整理視訊異常偵測管線、時序表徵、anomaly score 與部署邊界設計。'
        : 'An AI engineering note on video anomaly detection pipelines, temporal representations, anomaly scoring, and deployment boundaries.',
      date: '2024-03-30',
      category: locale.value === 'zh-TW' ? 'AI 工程' : 'AI Engineering',
      readingTime: '12'
    }
  ]
})

const { data: apiPosts } = await useAsyncData<CmsPost[]>('blog-list-posts', () => $fetch('/api/posts'))

const displayPosts = computed(() => {
  if (apiPosts.value && apiPosts.value.length > 0) {
    return apiPosts.value.map(post => postToBlogListItem(post, locale.value))
  }
  return fallbackPosts.value
})

const filteredArticles = computed(() => {
  return displayPosts.value.filter(post => {
    // Category match
    const selectedKey = filterKeys[activeCategoryIndex.value]
    const categoryMatches = categoryMatchesKey(post.category, selectedKey)

    // Search query match
    const query = searchQuery.value.toLowerCase().trim()
    const searchMatches = !query ||
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query)

    return categoryMatches && searchMatches
  })
})

const formatDate = (dateStr: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateStr).toLocaleDateString('en-US', options)
}
</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
