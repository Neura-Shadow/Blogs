import type { Project } from '~/types/project'

export type LocaleCode = 'en' | 'zh-TW'

export interface CmsPost {
  id?: string
  slug: string
  title_en?: string | null
  title_zh?: string | null
  excerpt_en?: string | null
  excerpt_zh?: string | null
  content_en?: string | null
  content_zh?: string | null
  cover_url?: string | null
  category?: string | null
  tags?: string[] | null
  status?: 'draft' | 'published' | string
  language?: 'en' | 'zh-TW' | 'bilingual' | string
  published_at?: string | null
  created_at?: string | null
  updated_at?: string | null
  _path?: string
  _isMock?: boolean
}

export interface BlogListItem {
  _path?: string
  slug: string
  title: string
  description: string
  date: string
  category: string
  readingTime: string
  cover?: string | null
}

const fallbackString = (primary?: string | null, fallback?: string | null, defaultValue = '') => {
  return primary || fallback || defaultValue
}

export const pickLocalizedPostField = (
  post: CmsPost,
  locale: LocaleCode,
  field: 'title' | 'excerpt' | 'content'
) => {
  const en = post[`${field}_en` as keyof CmsPost] as string | null | undefined
  const zh = post[`${field}_zh` as keyof CmsPost] as string | null | undefined
  return locale === 'zh-TW'
    ? fallbackString(zh, en)
    : fallbackString(en, zh)
}

export const postToBlogListItem = (post: CmsPost, locale: LocaleCode): BlogListItem => {
  return {
    _path: post._path,
    slug: post.slug,
    title: pickLocalizedPostField(post, locale, 'title') || 'Untitled Post',
    description: pickLocalizedPostField(post, locale, 'excerpt'),
    date: post.published_at || post.created_at || post.updated_at || new Date().toISOString(),
    category: post.category || 'Writing',
    readingTime: '5',
    cover: post.cover_url
  }
}

export const dbProjectToProject = (row: any): Project => {
  return {
    slug: row.slug,
    title: {
      en: fallbackString(row.title_en, row.title_zh, 'Untitled Project'),
      'zh-TW': fallbackString(row.title_zh, row.title_en, '未命名專案')
    },
    subtitle: {
      en: fallbackString(row.subtitle_en, row.subtitle_zh),
      'zh-TW': fallbackString(row.subtitle_zh, row.subtitle_en)
    },
    category: row.category || '',
    role: {
      en: fallbackString(row.role_en, row.role_zh),
      'zh-TW': fallbackString(row.role_zh, row.role_en)
    },
    status: {
      en: fallbackString(row.status_en, row.status_zh),
      'zh-TW': fallbackString(row.status_zh, row.status_en)
    },
    description: {
      en: fallbackString(row.description_en, row.description_zh),
      'zh-TW': fallbackString(row.description_zh, row.description_en)
    },
    longDescription: {
      en: fallbackString(row.long_description_en, row.long_description_zh, row.description_en || row.description_zh || ''),
      'zh-TW': fallbackString(row.long_description_zh, row.long_description_en, row.description_zh || row.description_en || '')
    },
    tags: row.tags || [],
    stack: row.stack || [],
    links: {
      repo: row.repo_url || null,
      demo: row.demo_url || null,
      paper: row.paper_url || null
    },
    featured: !!row.featured,
    cover: row.cover_url || null,
    highlights: {
      en: row.highlights_en || [],
      'zh-TW': row.highlights_zh?.length ? row.highlights_zh : (row.highlights_en || [])
    },
    challenges: {
      en: row.challenges_en || [],
      'zh-TW': row.challenges_zh?.length ? row.challenges_zh : (row.challenges_en || [])
    },
    results: {
      en: row.results_en || [],
      'zh-TW': row.results_zh?.length ? row.results_zh : (row.results_en || [])
    }
  }
}

export const renderBasicMarkdown = (markdown: string) => {
  if (!markdown) return ''

  return markdown
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/\n/g, '<br />')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>')
    .replace(/<p><h([1-3])>/g, '<h$1>')
    .replace(/<\/h([1-3])><\/p>/g, '</h$1>')
}
