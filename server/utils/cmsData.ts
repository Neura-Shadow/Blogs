import fs from 'fs'
import path from 'path'
import { projectsData } from '~/data/projects'

export const isUuid = (value: string) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
}

export const removeUndefined = <T extends Record<string, any>>(input: T) => {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined)
  ) as Partial<T>
}

const toStringArray = (value: any) => {
  if (Array.isArray(value)) return value.map(String).filter(Boolean)
  if (typeof value === 'string') {
    return value.split(',').map((item) => item.trim()).filter(Boolean)
  }
  return []
}

export const normalizePostPayload = (body: any) => {
  const status = body.status === 'published' ? 'published' : 'draft'
  const language = ['en', 'zh-TW', 'bilingual'].includes(body.language)
    ? body.language
    : 'bilingual'

  return removeUndefined({
    slug: body.slug,
    title_en: body.title_en,
    title_zh: body.title_zh,
    excerpt_en: body.excerpt_en,
    excerpt_zh: body.excerpt_zh,
    content_en: body.content_en,
    content_zh: body.content_zh,
    cover_url: body.cover_url,
    category: body.category,
    tags: toStringArray(body.tags),
    status,
    language,
    published_at: status === 'published'
      ? (body.published_at || new Date().toISOString())
      : null
  })
}

export const normalizeProjectPayload = (body: any) => {
  return removeUndefined({
    slug: body.slug,
    title_en: body.title_en,
    title_zh: body.title_zh,
    subtitle_en: body.subtitle_en,
    subtitle_zh: body.subtitle_zh,
    description_en: body.description_en,
    description_zh: body.description_zh,
    long_description_en: body.long_description_en,
    long_description_zh: body.long_description_zh,
    category: body.category,
    role_en: body.role_en,
    role_zh: body.role_zh,
    status_en: body.status_en,
    status_zh: body.status_zh,
    tags: toStringArray(body.tags),
    stack: toStringArray(body.stack),
    repo_url: body.repo_url,
    demo_url: body.demo_url,
    paper_url: body.paper_url,
    cover_url: body.cover_url,
    featured: !!body.featured,
    sort_order: Number.isFinite(Number(body.sort_order)) ? Number(body.sort_order) : 0,
    highlights_en: toStringArray(body.highlights_en),
    highlights_zh: toStringArray(body.highlights_zh),
    challenges_en: toStringArray(body.challenges_en),
    challenges_zh: toStringArray(body.challenges_zh),
    results_en: toStringArray(body.results_en),
    results_zh: toStringArray(body.results_zh)
  })
}

function parseFrontmatter(content: string) {
  const match = content.match(/^---([\s\S]*?)---/)
  if (!match) return { attributes: {} as Record<string, string>, body: content }

  const frontmatter = match[1]
  const body = content.slice(match[0].length)
  const attributes: Record<string, string> = {}

  frontmatter.split('\n').forEach((line) => {
    const idx = line.indexOf(':')
    if (idx !== -1) {
      const key = line.slice(0, idx).trim()
      const val = line.slice(idx + 1).trim()
      attributes[key] = val.replace(/^['"]|['"]$/g, '')
    }
  })

  return { attributes, body }
}

export const getMockPosts = () => {
  const blogDir = path.join(process.cwd(), 'content/blog')
  if (!fs.existsSync(blogDir)) return []

  return fs.readdirSync(blogDir)
    .filter((file) => file.endsWith('.md'))
    .map((file, index) => {
      const filePath = path.join(blogDir, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const { attributes, body } = parseFrontmatter(content)
      const slug = file.replace(/\.md$/, '')

      return {
        id: `mock-uuid-${index}-${slug}`,
        slug,
        title_en: attributes.title || 'Untitled Post',
        title_zh: attributes.title || '未命名文章',
        excerpt_en: attributes.description || '',
        excerpt_zh: attributes.description || '',
        content_en: body.trim(),
        content_zh: body.trim(),
        cover_url: attributes.image || '/images/blog/coding.jpg',
        category: attributes.category || 'Development',
        tags: attributes.tags ? attributes.tags.split(',').map((tag) => tag.trim()) : [],
        status: attributes.draft === 'true' ? 'draft' : 'published',
        language: attributes.language || 'bilingual',
        published_at: attributes.date ? new Date(attributes.date).toISOString() : new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        _isMock: true
      }
    })
}

export const getMockPost = (idOrSlug: string) => {
  const slugMatch = idOrSlug.replace(/^mock-uuid-\d+-/, '')
  return getMockPosts().find((post) => post.slug === slugMatch || post.slug === idOrSlug)
}

export const getMockProjects = () => {
  return projectsData.map((project, index) => ({
    id: `mock-proj-uuid-${index}-${project.slug}`,
    slug: project.slug,
    title_en: project.title?.en || '',
    title_zh: project.title?.['zh-TW'] || '',
    subtitle_en: project.subtitle?.en || '',
    subtitle_zh: project.subtitle?.['zh-TW'] || '',
    description_en: project.description?.en || '',
    description_zh: project.description?.['zh-TW'] || '',
    long_description_en: project.longDescription?.en || '',
    long_description_zh: project.longDescription?.['zh-TW'] || '',
    category: project.category || '',
    role_en: project.role?.en || '',
    role_zh: project.role?.['zh-TW'] || '',
    status_en: project.status?.en || '',
    status_zh: project.status?.['zh-TW'] || '',
    tags: project.tags || [],
    stack: project.stack || [],
    repo_url: project.links?.repo || '',
    demo_url: project.links?.demo || '',
    paper_url: project.links?.paper || '',
    cover_url: project.cover || `/images/projects/${project.slug}.jpg`,
    featured: project.featured || false,
    sort_order: index,
    highlights_en: project.highlights?.en || [],
    highlights_zh: project.highlights?.['zh-TW'] || [],
    challenges_en: project.challenges?.en || [],
    challenges_zh: project.challenges?.['zh-TW'] || [],
    results_en: project.results?.en || [],
    results_zh: project.results?.['zh-TW'] || [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    _isMock: true
  }))
}

export const getMockProject = (idOrSlug: string) => {
  const slugMatch = idOrSlug.replace(/^mock-proj-uuid-\d+-/, '')
  return getMockProjects().find((project) => project.slug === slugMatch || project.slug === idOrSlug)
}
