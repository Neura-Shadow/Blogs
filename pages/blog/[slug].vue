<template>
  <div v-if="pending" class="py-12 md:py-20 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
    <div class="max-w-5xl mx-auto px-4">
      <div class="max-w-3xl animate-pulse">
        <div class="h-4 w-32 rounded bg-neutral-200 dark:bg-neutral-800 mb-10" />
        <div class="h-4 w-72 rounded bg-neutral-200 dark:bg-neutral-800 mb-4" />
        <div class="h-12 w-full max-w-2xl rounded bg-neutral-200 dark:bg-neutral-800 mb-5" />
        <div class="h-5 w-full max-w-xl rounded bg-neutral-200 dark:bg-neutral-800 mb-10" />
        <div class="space-y-4">
          <div class="h-4 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
          <div class="h-4 w-11/12 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div class="h-4 w-4/5 rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="post" class="py-12 md:py-20 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
    <div class="max-w-5xl mx-auto px-4">
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-brand-accent transition-colors mb-8"
      >
        <ArrowLeft class="w-3.5 h-3.5" />
        <span>{{ t('blog.backToArticles') }}</span>
      </NuxtLink>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <article class="lg:col-span-8 text-left">
          <header class="mb-8 pb-6 border-b border-light-border dark:border-dark-border">
            <div class="flex items-center gap-2.5 text-xs text-neutral-400 dark:text-neutral-500 mb-3 font-mono">
              <time>{{ formatDate(postDate) }}</time>
              <span>/</span>
              <span class="text-brand-accent font-semibold">{{ category }}</span>
              <span>/</span>
              <span>{{ readingTime }} {{ t('blog.readTime') }}</span>
            </div>

            <h1 class="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-[#1F1E1B] dark:text-white leading-tight">
              {{ title }}
            </h1>

            <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-4 leading-relaxed italic">
              {{ excerpt }}
            </p>

            <div class="mt-6 overflow-hidden rounded-xl border border-light-border dark:border-dark-border bg-light-elevated dark:bg-neutral-900">
              <img
                :src="cover"
                :alt="title"
                class="h-56 w-full object-cover sm:h-72"
                loading="eager"
                @error="onImageError"
              />
            </div>
          </header>

          <div class="prose prose-neutral dark:prose-invert max-w-none prose-sm sm:prose-base leading-relaxed" v-html="contentHtml"></div>
        </article>
      </div>
    </div>
  </div>

  <div v-else class="py-24 text-center bg-light-bg dark:bg-dark-bg transition-colors duration-300">
    <BookOpen class="w-16 h-16 text-neutral-300 dark:text-neutral-800 mx-auto mb-4" />
    <h1 class="text-xl font-bold text-neutral-800 dark:text-neutral-200">{{ t('blog.notFound') }}</h1>
    <p class="text-sm text-neutral-500 mt-1 mb-8">{{ t('blog.notFoundDesc') }}</p>
    <NuxtLink
      to="/blog"
      class="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-brand-accent hover:bg-brand-accentHover"
    >
      {{ t('blog.backToArticles') }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, BookOpen } from 'lucide-vue-next'
import { useI18n } from '~/composables/useI18n'
import { BLOG_COVER_PLACEHOLDER, normalizeBlogCover, pickLocalizedPostField, postToBlogListItem, renderBasicMarkdown, type CmsPost } from '~/utils/cmsMappers'

const route = useRoute()
const { locale, t } = useI18n()
const { publicAssetPath } = usePublicAssetPath()
const slug = computed(() => String(route.params.slug || ''))

const fetchArticleBySlug = async (value: string) => {
  if (!value) return null

  try {
    return await $fetch<CmsPost>(`/api/posts/${value}`)
  } catch (err: any) {
    if (err?.statusCode === 404 || err?.status === 404) return null
    throw err
  }
}

const { data: post, pending } = await useAsyncData<CmsPost | null>(
  () => `blog-article-${slug.value}`,
  () => fetchArticleBySlug(slug.value),
  {
    watch: [slug],
    server: true,
    lazy: false,
    default: () => null
  }
)

const title = computed(() => post.value ? pickLocalizedPostField(post.value, locale.value, 'title') : '')
const excerpt = computed(() => post.value ? pickLocalizedPostField(post.value, locale.value, 'excerpt') : '')
const content = computed(() => post.value ? pickLocalizedPostField(post.value, locale.value, 'content') : '')
const contentHtml = computed(() => renderBasicMarkdown(content.value))
const cover = computed(() => publicAssetPath(normalizeBlogCover(post.value?.cover_url)))
const postDate = computed(() => post.value?.published_at || post.value?.created_at || post.value?.updated_at || new Date().toISOString())
const category = computed(() => post.value ? postToBlogListItem(post.value, locale.value).category : 'Writing')
const readingTime = computed(() => {
  const value = post.value?.reading_time
  if (typeof value === 'number') return String(value)
  if (typeof value === 'string') return value.match(/\d+/)?.[0] || '5'
  const words = content.value
    .replace(/```[\s\S]*?```/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  return String(Math.max(1, Math.ceil(words.length / 220)))
})

const onImageError = (event: Event) => {
  const image = event.target as HTMLImageElement
  const fallback = publicAssetPath(BLOG_COVER_PLACEHOLDER)
  if (image.src.endsWith(fallback)) return
  image.src = fallback
}

useHead({
  title: title.value || 'Blog Post',
  meta: [
    { name: 'description', content: excerpt.value || 'Read the technical article.' }
  ]
})

const formatDate = (dateStr: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateStr).toLocaleDateString('en-US', options)
}
</script>

<style>
.prose h1 {
  @apply text-2xl font-bold text-[#1F1E1B] dark:text-white mt-8 mb-4 font-display bg-transparent;
}
.prose h2 {
  @apply text-xl font-bold text-[#1F1E1B] dark:text-white mt-8 mb-4 font-display;
}
.prose h3 {
  @apply text-lg font-bold text-[#1F1E1B] dark:text-white mt-6 mb-3 font-display;
}
.prose p {
  @apply text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed;
}
.prose code {
  @apply font-mono text-xs px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-brand-accent;
}
.prose pre {
  @apply my-6 overflow-x-auto rounded-lg border border-light-border dark:border-dark-border bg-neutral-950 p-4 text-left shadow-sm;
}
.prose pre code {
  @apply border-0 bg-transparent p-0 text-xs text-neutral-100;
}
.prose blockquote {
  @apply my-6 border-l-4 border-brand-accent/60 bg-brand-accent/5 px-4 py-3 text-neutral-700 dark:text-neutral-300 rounded-r-lg;
}
.prose blockquote p {
  @apply mb-0;
}
.prose ul {
  @apply my-4 list-disc pl-5 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 space-y-2;
}
.prose ol {
  @apply my-4 list-decimal pl-5 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 space-y-2;
}
.prose li {
  @apply leading-relaxed;
}
.prose a {
  @apply font-semibold text-brand-accent hover:text-brand-accentHover underline underline-offset-4;
}
.article-table-wrap {
  @apply my-6 overflow-x-auto rounded-lg border border-light-border dark:border-dark-border;
}
.article-table-wrap table {
  @apply min-w-full border-collapse text-left text-sm;
}
.article-table-wrap th {
  @apply bg-light-elevated dark:bg-neutral-900 px-4 py-3 font-semibold text-neutral-800 dark:text-neutral-100 border-b border-light-border dark:border-dark-border;
}
.article-table-wrap td {
  @apply px-4 py-3 align-top text-neutral-600 dark:text-neutral-400 border-b border-light-border dark:border-dark-border;
}
.article-table-wrap tr:last-child td {
  @apply border-b-0;
}
</style>
