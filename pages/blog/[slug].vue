<template>
  <div v-if="post" class="py-12 md:py-20 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
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
              <span class="text-brand-accent font-semibold">{{ post.category || 'Writing' }}</span>
              <span>/</span>
              <span>5 {{ t('blog.readTime') }}</span>
            </div>

            <h1 class="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-[#1F1E1B] dark:text-white leading-tight">
              {{ title }}
            </h1>

            <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-4 leading-relaxed italic">
              {{ excerpt }}
            </p>
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
import { pickLocalizedPostField, renderBasicMarkdown, type CmsPost } from '~/utils/cmsMappers'

const route = useRoute()
const { locale, t } = useI18n()
const slug = computed(() => route.params.slug as string)

const { data: post } = await useAsyncData<CmsPost | null>(
  `blog-post-${slug.value}`,
  () => $fetch(`/api/posts/${slug.value}`)
)

const title = computed(() => post.value ? pickLocalizedPostField(post.value, locale.value, 'title') : '')
const excerpt = computed(() => post.value ? pickLocalizedPostField(post.value, locale.value, 'excerpt') : '')
const content = computed(() => post.value ? pickLocalizedPostField(post.value, locale.value, 'content') : '')
const contentHtml = computed(() => renderBasicMarkdown(content.value))
const postDate = computed(() => post.value?.published_at || post.value?.created_at || post.value?.updated_at || new Date().toISOString())

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
  @apply text-2xl font-bold text-[#1F1E1B] dark:text-white mt-8 mb-4 font-display;
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
</style>
