import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'
import { projectsData } from '../data/projects'

const args = new Set(process.argv.slice(2))
const execute = args.has('--execute')
const includePosts = args.has('--posts') || (!args.has('--posts') && !args.has('--projects'))
const includeProjects = args.has('--projects') || (!args.has('--posts') && !args.has('--projects'))

const supabaseUrl = process.env.NUXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

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

function readPosts() {
  const blogDir = path.join(process.cwd(), 'content/blog')
  if (!fs.existsSync(blogDir)) return []

  return fs.readdirSync(blogDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const content = fs.readFileSync(path.join(blogDir, file), 'utf-8')
      const { attributes, body } = parseFrontmatter(content)
      const slug = file.replace(/\.md$/, '')
      const status = attributes.draft === 'true' ? 'draft' : 'published'

      return {
        slug,
        title_en: attributes.title || 'Untitled Post',
        title_zh: attributes.title || '未命名文章',
        excerpt_en: attributes.description || '',
        excerpt_zh: attributes.description || '',
        content_en: body.trim(),
        content_zh: body.trim(),
        cover_url: attributes.image || '/images/blog/coding.jpg',
        category: attributes.category || 'Development',
        tags: attributes.tags ? attributes.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
        status,
        language: attributes.language || 'bilingual',
        published_at: status === 'published'
          ? (attributes.date ? new Date(attributes.date).toISOString() : new Date().toISOString())
          : null
      }
    })
}

function readProjects() {
  return projectsData.map((project, index) => ({
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
    results_zh: project.results?.['zh-TW'] || []
  }))
}

async function insertRows(table: string, rows: any[]) {
  if (!execute) {
    console.log(`[dry-run] ${table}: ${rows.length} rows`)
    rows.forEach((row) => console.log(`  - ${row.slug}`))
    return
  }

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error('Missing NUXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY.')
  }

  const supabase = createClient(supabaseUrl, supabaseSecretKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  })

  const { error } = await supabase.from(table).insert(rows)
  if (error) throw error
  console.log(`[inserted] ${table}: ${rows.length} rows`)
}

async function main() {
  if (!execute) {
    console.log('Dry-run only. Add --execute to insert rows.')
  }

  if (includePosts) {
    await insertRows('posts', readPosts())
  }

  if (includeProjects) {
    await insertRows('projects', readProjects())
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
