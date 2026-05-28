<template>
  <section class="py-20 md:py-28 bg-light-bg dark:bg-dark-bg transition-colors duration-300 relative">
    <div class="max-w-6xl mx-auto px-4">

      <!-- Heading Row -->
      <div class="flex items-end justify-between mb-12">
        <div class="text-left">
          <SectionHeading
            eyebrow="Writing"
            title="blog.title"
            description="blog.description"
            align="left"
            class="mb-0"
          >
            <template #icon>
              <PenTool class="w-3.5 h-3.5 text-brand-accent" />
            </template>
          </SectionHeading>
        </div>

        <NuxtLink
          to="/blog"
          class="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-brand-accent hover:text-brand-accentHover transition-colors group"
        >
          <span>{{ t('projects.viewAll') }}</span>
          <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </NuxtLink>
      </div>

      <!-- Articles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="post in displayPosts"
          :key="post._path || post.slug"
          class="flex flex-col h-full rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface/40 overflow-hidden hover:border-brand-accent/40 dark:hover:border-brand-accent/30 transition-all duration-300 hover:shadow-md group"
        >
          <!-- Banner Image -->
          <div class="h-44 w-full bg-light-elevated dark:bg-neutral-900 border-b border-light-border dark:border-dark-border relative flex items-center justify-center overflow-hidden">
            <img
              :src="coverSrc(post.cover)"
              :alt="post.title"
              class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              @error="onImageError"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-neutral-950/55 via-neutral-950/10 to-transparent"
            />
          </div>

          <!-- Content -->
          <div class="p-6 flex flex-col justify-between flex-grow text-left">
            <div>
              <!-- Meta Info -->
              <div class="flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500 mb-3 font-mono">
                <time>{{ formatDate(post.date) }}</time>
                <span>•</span>
                <span>{{ post.category }}</span>
                <span>•</span>
                <span>{{ post.readingTime || '5 min' }} {{ t('blog.readTime') }}</span>
              </div>

              <!-- Title -->
              <h3 class="text-lg font-bold text-[#1F1E1B] dark:text-white group-hover:text-brand-accent transition-colors duration-200 line-clamp-2">
                <NuxtLink :to="post._path || `/blog/${post.slug}`">
                  {{ post.title }}
                </NuxtLink>
              </h3>

              <!-- Description -->
              <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
                {{ post.description }}
              </p>
            </div>

            <!-- Read More Link -->
            <div class="mt-6 pt-4 border-t border-light-border dark:border-dark-border">
              <NuxtLink
                :to="post._path || `/blog/${post.slug}`"
                class="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-accent hover:text-brand-accentHover"
              >
                <span>{{ t('blog.readFull') }}</span>
                <ArrowRight class="w-3.5 h-3.5 group-hover/btn:translate-x-1" />
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <!-- Mobile Footer Action -->
      <div class="mt-8 text-center sm:hidden">
        <NuxtLink
          to="/blog"
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
import { PenTool, ArrowRight } from 'lucide-vue-next'
import { useI18n } from '~/composables/useI18n'
import SectionHeading from '~/components/ui/SectionHeading.vue'
import { BLOG_COVER_PLACEHOLDER, normalizeBlogCover, postToBlogListItem, type CmsPost } from '~/utils/cmsMappers'

const { locale, t } = useI18n()
const { publicAssetPath } = usePublicAssetPath()

// Custom interface for blog template posts
interface BlogPost {
  _path?: string
  slug: string
  title: string
  description: string
  date: string
  category: string
  readingTime: string
  cover: string
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
      readingTime: '10',
      cover: '/images/blog/microservices-event-driven-architecture.png'
    },
    {
      slug: 'gwm-uav-navigation-sparse-rewards',
      title: locale.value === 'zh-TW'
        ? 'GWM-UAV 導航研究工程筆記'
        : 'GWM-UAV Navigation as a Research Engineering Note',
      description: locale.value === 'zh-TW'
        ? '一篇關於稀疏獎勵無人機導航、圖記憶、模擬環境與工程限制的應用 AI 研究筆記。'
        : 'An applied AI research note on sparse-reward UAV navigation, graph memory, simulation, and engineering constraints.',
      date: '2026-04-22',
      category: locale.value === 'zh-TW' ? '機器人研究' : 'Robotics Research',
      readingTime: '11',
      cover: '/images/blog/gwm-uav-navigation-research-engineering.png'
    },
    {
      slug: 'diffusion-transformer-video-anomaly-detection',
      title: locale.value === 'zh-TW'
        ? '基於 Diffusion Transformer 的視訊異常偵測工程筆記'
        : 'Diffusion Transformer for Video Anomaly Detection',
      description: locale.value === 'zh-TW'
        ? '一篇 AI engineering 筆記，整理視訊異常偵測管線、時序表徵、anomaly score 與部署邊界設計。'
        : 'An AI engineering note on video anomaly detection pipelines, temporal representations, anomaly scoring, and deployment boundaries.',
      date: '2025-03-30',
      category: locale.value === 'zh-TW' ? 'AI 工程' : 'AI Engineering',
      readingTime: '12',
      cover: '/images/blog/diffusion-transformer-video-anomaly-detection.png'
    }
  ]
})

const { data: apiPosts } = await useAsyncData<CmsPost[]>('latest-blog-posts', () => $fetch('/api/posts'))

const displayPosts = computed(() => {
  if (apiPosts.value && apiPosts.value.length > 0) {
    return apiPosts.value.slice(0, 3).map(post => ({
      ...postToBlogListItem(post, locale.value),
      cover: normalizeBlogCover(post.cover_url)
    }))
  }
  return fallbackPosts.value
})

const onImageError = (event: Event) => {
  const image = event.target as HTMLImageElement
  const fallback = publicAssetPath(BLOG_COVER_PLACEHOLDER)
  if (image.src.endsWith(fallback)) return
  image.src = fallback
}

const coverSrc = (cover?: string | null) => {
  return publicAssetPath(cover || BLOG_COVER_PLACEHOLDER)
}

const formatDate = (dateStr: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateStr).toLocaleDateString('en-US', options)
}
</script>
