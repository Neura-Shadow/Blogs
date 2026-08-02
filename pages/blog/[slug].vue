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
        class="text-button mb-8 inline-flex min-h-10 items-center gap-1 font-semibold text-neutral-500 transition-colors hover:text-brand-accent"
      >
        <ArrowLeft class="w-3.5 h-3.5" />
        <span>{{ t('blog.backToArticles') }}</span>
      </NuxtLink>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <article class="text-left lg:col-span-9">
          <header class="mb-8 pb-6 border-b border-light-border dark:border-dark-border">
            <div class="text-public-caption mb-3 flex flex-wrap items-center gap-2.5 font-mono text-neutral-500 dark:text-neutral-400">
              <time>{{ formatDate(postDate) }}</time>
              <span>/</span>
              <span class="text-brand-accent font-semibold">{{ category }}</span>
              <span>/</span>
              <span>{{ readingTime }} {{ t('blog.readTime') }}</span>
            </div>

            <h1 class="text-page-title font-display font-extrabold tracking-tight text-[#1F1E1B] dark:text-white">
              {{ title }}
            </h1>

            <p class="text-public-lead mt-4 italic text-neutral-500 dark:text-neutral-400">
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

          <div data-testid="article-body" class="article-prose prose prose-neutral max-w-none dark:prose-invert" v-html="contentHtml"></div>
        </article>
      </div>
    </div>
  </div>

  <div v-else class="py-24 text-center bg-light-bg dark:bg-dark-bg transition-colors duration-300">
    <BookOpen class="w-16 h-16 text-neutral-300 dark:text-neutral-800 mx-auto mb-4" />
    <h1 class="text-content-heading font-bold text-neutral-800 dark:text-neutral-200">{{ t('blog.notFound') }}</h1>
    <p class="text-public-body mb-8 mt-2 text-neutral-500">{{ t('blog.notFoundDesc') }}</p>
    <NuxtLink
      to="/blog"
      class="text-button inline-flex min-h-11 items-center rounded-lg bg-brand-accent px-5 py-2.5 font-semibold text-white hover:bg-brand-accentHover"
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
.article-prose {
  max-width: 48.75rem;
  font-size: clamp(var(--text-body), 1.02rem + 0.2vw, var(--text-body-lg));
  line-height: 1.78;
}
.article-prose h1 {
  @apply mt-10 mb-5 bg-transparent font-display font-bold text-[#1F1E1B] dark:text-white;
  font-size: clamp(2.5rem, 1.9rem + 2.4vw, 4rem);
  line-height: 1.08;
}
.article-prose h2 {
  @apply mt-10 mb-5 font-display font-bold text-[#1F1E1B] dark:text-white;
  font-size: clamp(1.875rem, 1.5rem + 1.3vw, 2.625rem);
  line-height: 1.14;
}
.article-prose h3 {
  @apply mt-8 mb-4 font-display font-bold text-[#1F1E1B] dark:text-white;
  font-size: clamp(1.4375rem, 1.2rem + 0.8vw, 1.875rem);
  line-height: 1.2;
}
.article-prose p {
  @apply mb-5 text-neutral-600 dark:text-neutral-400;
  font-size: inherit;
  line-height: inherit;
}
.article-prose code {
  @apply rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 font-mono text-brand-accent dark:border-neutral-700 dark:bg-neutral-800;
  font-size: clamp(0.875rem, 0.84rem + 0.1vw, 1rem);
  line-height: 1.55;
}
.article-prose pre {
  @apply my-6 overflow-x-auto rounded-lg border border-light-border dark:border-dark-border bg-neutral-950 p-4 text-left shadow-sm;
}
.article-prose pre code {
  @apply border-0 bg-transparent p-0 text-neutral-100;
  font-size: clamp(0.875rem, 0.85rem + 0.06vw, 0.9375rem);
}
.article-prose blockquote {
  @apply my-7 rounded-xl border border-brand-accent/25 bg-brand-accent/5 px-5 py-4 text-neutral-700 dark:text-neutral-300;
  font-size: clamp(1.125rem, 1.05rem + 0.25vw, 1.3125rem);
  line-height: 1.7;
}
.article-prose blockquote p {
  @apply mb-0;
}
.article-prose ul {
  @apply my-5 list-disc space-y-2 pl-6 text-neutral-600 dark:text-neutral-400;
  font-size: inherit;
}
.article-prose ol {
  @apply my-5 list-decimal space-y-2 pl-6 text-neutral-600 dark:text-neutral-400;
  font-size: inherit;
}
.article-prose li {
  line-height: inherit;
}
.article-prose a {
  @apply font-semibold text-brand-accent hover:text-brand-accentHover underline underline-offset-4;
}
.article-table-wrap {
  @apply my-6 overflow-x-auto rounded-lg border border-light-border dark:border-dark-border;
}
.article-table-wrap table {
  @apply min-w-full border-collapse text-left;
  font-size: clamp(0.9375rem, 0.9rem + 0.12vw, 1.0625rem);
  line-height: 1.6;
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
