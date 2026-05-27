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
          <!-- Banner Image or Decorative Code Accent -->
          <div class="h-44 w-full bg-light-elevated dark:bg-neutral-900 border-b border-light-border dark:border-dark-border relative flex items-center justify-center overflow-hidden">
            <!-- Tech representation -->
            <div class="absolute inset-0 bg-gradient-to-tr from-brand-accent/10 to-brand-linear/10 opacity-60" />
            <div class="absolute inset-0 bg-[radial-gradient(#8080800d_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
            <Terminal class="w-12 h-12 text-neutral-400 dark:text-neutral-700 transition-transform group-hover:scale-110" />
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
import { PenTool, ArrowRight, Terminal } from 'lucide-vue-next'
import { useI18n } from '~/composables/useI18n'
import SectionHeading from '~/components/ui/SectionHeading.vue'
import { postToBlogListItem, type CmsPost } from '~/utils/cmsMappers'

const { locale, t } = useI18n()

// Custom interface for blog template posts
interface BlogPost {
  _path?: string
  slug: string
  title: string
  description: string
  date: string
  category: string
  readingTime: string
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
        ? '從構建高吞吐量電子商務平台以及將無人機遙測數據流與微服務架構同步中獲得的架構設計經驗。'
        : 'Lessons learned from building a high-throughput e-commerce platform and synchronizing telemetry datastreams with microservice architectures.',
      date: '2024-05-10',
      category: locale.value === 'zh-TW' ? '系統架構' : 'Architecture',
      readingTime: '6'
    },
    {
      slug: 'gwm-uav-navigation-sparse-rewards',
      title: locale.value === 'zh-TW'
        ? 'GWM-UAV 導航系統：從學術研究到真實場域部署'
        : 'GWM-UAV Navigation: From Research to Real-world Deployment',
      description: locale.value === 'zh-TW'
        ? '圖波前記憶（GWM）與深度強化學習（DRL）如何改善無人載具在未知與稀疏獎勵環境中的尋路與避障。'
        : 'How graph wavefront memory and deep reinforcement learning (DRL) improve UAV navigation and obstacle avoidance in complex, sparse-reward environments.',
      date: '2024-04-22',
      category: locale.value === 'zh-TW' ? '機器人 / AI' : 'Robotics / AI',
      readingTime: '8'
    },
    {
      slug: 'diffusion-transformer-video-anomaly-detection',
      title: locale.value === 'zh-TW'
        ? '基於 Diffusion Transformer 的視訊異常偵測'
        : 'Diffusion Transformer for Video Anomaly Detection',
      description: locale.value === 'zh-TW'
        ? '探索用於無監督視訊異常偵測的擴散模型，重點關注動態重建閾值與時空特徵表徵。'
        : 'Exploring diffusion models for unsupervised video anomaly detection, focusing on dynamic reconstruction thresholds and spatial-temporal representations.',
      date: '2024-03-30',
      category: locale.value === 'zh-TW' ? 'AI / 學術研究' : 'AI / Research',
      readingTime: '7'
    }
  ]
})

const { data: apiPosts } = await useAsyncData<CmsPost[]>('latest-blog-posts', () => $fetch('/api/posts'))

const displayPosts = computed(() => {
  if (apiPosts.value && apiPosts.value.length > 0) {
    return apiPosts.value.slice(0, 3).map(post => postToBlogListItem(post, locale.value))
  }
  return fallbackPosts.value
})

const formatDate = (dateStr: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateStr).toLocaleDateString('en-US', options)
}
</script>
