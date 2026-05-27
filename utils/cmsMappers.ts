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
  reading_time?: string | number | null
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

const localizedCategory = (category: string | null | undefined, locale: LocaleCode) => {
  const normalized = (category || 'Writing').toLowerCase()

  if (locale !== 'zh-TW') {
    if (normalized === 'ai / research' || normalized === 'ai research') return 'AI Engineering'
    if (normalized === 'robotics / ai') return 'Robotics Engineering'
    return category || 'Writing'
  }

  if (normalized.includes('architecture')) return '系統架構'
  if (normalized.includes('robotics')) return '機器人工程'
  if (normalized.includes('ai engineering') || normalized.includes('ai research') || normalized.includes('research')) return 'AI 工程'
  if (normalized.includes('cloud native')) return '雲原生'
  if (normalized.includes('system integration')) return '系統整合'
  if (normalized === 'ai') return 'AI 工程'

  return category || 'Writing'
}

const estimateReadingTime = (content?: string | null) => {
  if (!content) return '5'
  const words = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  return String(Math.max(1, Math.ceil(words.length / 220)))
}

const normalizeReadingTime = (value?: string | number | null, content?: string | null) => {
  if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  if (typeof value === 'string') {
    const match = value.match(/\d+/)
    return match?.[0] || '5'
  }
  return estimateReadingTime(content)
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
  const content = pickLocalizedPostField(post, locale, 'content')

  return {
    _path: post._path,
    slug: post.slug,
    title: pickLocalizedPostField(post, locale, 'title') || 'Untitled Post',
    description: pickLocalizedPostField(post, locale, 'excerpt'),
    date: post.published_at || post.created_at || post.updated_at || new Date().toISOString(),
    category: localizedCategory(post.category, locale),
    readingTime: normalizeReadingTime(post.reading_time, content),
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

const escapeHtml = (value: string) => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const renderInlineMarkdown = (value: string) => {
  return escapeHtml(value)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
}

const isTableSeparator = (line: string) => {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line)
}

const splitTableRow = (line: string) => {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map(cell => cell.trim())
}

const renderTable = (rows: string[]) => {
  const [head, , ...body] = rows
  const headers = splitTableRow(head)
  const bodyRows = body.map(splitTableRow)

  const thead = `<thead><tr>${headers.map(cell => `<th>${renderInlineMarkdown(cell)}</th>`).join('')}</tr></thead>`
  const tbody = `<tbody>${bodyRows
    .map(row => `<tr>${row.map(cell => `<td>${renderInlineMarkdown(cell)}</td>`).join('')}</tr>`)
    .join('')}</tbody>`

  return `<div class="article-table-wrap"><table>${thead}${tbody}</table></div>`
}

export const renderBasicMarkdown = (markdown: string) => {
  if (!markdown) return ''

  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const html: string[] = []
  let paragraph: string[] = []
  let listItems: string[] = []
  let listType: 'ul' | 'ol' | null = null
  let quoteLines: string[] = []
  let codeLines: string[] = []
  let codeLang = ''
  let inCode = false
  let tableRows: string[] = []

  const flushParagraph = () => {
    if (!paragraph.length) return
    html.push(`<p>${renderInlineMarkdown(paragraph.join(' '))}</p>`)
    paragraph = []
  }

  const flushList = () => {
    if (!listItems.length || !listType) return
    html.push(`<${listType}>${listItems.map(item => `<li>${renderInlineMarkdown(item)}</li>`).join('')}</${listType}>`)
    listItems = []
    listType = null
  }

  const flushQuote = () => {
    if (!quoteLines.length) return
    html.push(`<blockquote>${quoteLines.map(line => renderInlineMarkdown(line)).join('<br />')}</blockquote>`)
    quoteLines = []
  }

  const flushTable = () => {
    if (!tableRows.length) return
    if (tableRows.length >= 2 && isTableSeparator(tableRows[1])) {
      html.push(renderTable(tableRows))
    } else {
      tableRows.forEach(row => paragraph.push(row))
    }
    tableRows = []
  }

  const flushBlocks = () => {
    flushParagraph()
    flushList()
    flushQuote()
    flushTable()
  }

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]
    const trimmed = line.trim()

    if (trimmed.startsWith('```')) {
      if (inCode) {
        html.push(`<pre><code class="language-${escapeHtml(codeLang)}">${escapeHtml(codeLines.join('\n'))}</code></pre>`)
        codeLines = []
        codeLang = ''
        inCode = false
      } else {
        flushBlocks()
        inCode = true
        codeLang = trimmed.replace(/^```/, '').trim()
      }
      continue
    }

    if (inCode) {
      codeLines.push(line)
      continue
    }

    if (!trimmed) {
      flushBlocks()
      continue
    }

    if (trimmed.startsWith('<!--') && trimmed.endsWith('-->')) {
      flushBlocks()
      html.push(trimmed)
      continue
    }

    if (trimmed.includes('|') && i + 1 < lines.length && (tableRows.length || isTableSeparator(lines[i + 1]))) {
      flushParagraph()
      flushList()
      flushQuote()
      tableRows.push(line)
      continue
    }

    if (tableRows.length && trimmed.includes('|')) {
      tableRows.push(line)
      continue
    }

    if (tableRows.length) flushTable()

    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/)
    if (heading) {
      flushBlocks()
      const level = heading[1].length
      html.push(`<h${level}>${renderInlineMarkdown(heading[2])}</h${level}>`)
      continue
    }

    if (trimmed.startsWith('>')) {
      flushParagraph()
      flushList()
      const quoteText = trimmed.replace(/^>\s?/, '')
      quoteLines.push(quoteText)
      continue
    }

    const unordered = trimmed.match(/^[-*]\s+(.+)$/)
    const ordered = trimmed.match(/^\d+\.\s+(.+)$/)
    if (unordered || ordered) {
      flushParagraph()
      flushQuote()
      const nextType = unordered ? 'ul' : 'ol'
      if (listType && listType !== nextType) flushList()
      listType = nextType
      listItems.push((unordered || ordered)?.[1] || '')
      continue
    }

    flushList()
    flushQuote()
    paragraph.push(line)
  }

  if (inCode) {
    html.push(`<pre><code class="language-${escapeHtml(codeLang)}">${escapeHtml(codeLines.join('\n'))}</code></pre>`)
  }
  flushBlocks()

  return html.join('\n')
}
