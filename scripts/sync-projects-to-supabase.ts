import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'
import { projectsData } from '../data/projects.ts'

const APPLY_CONFIRMATION = 'SYNC_PROJECTS'
const PROJECT_COLUMNS = [
  'slug',
  'title_en',
  'title_zh',
  'subtitle_en',
  'subtitle_zh',
  'description_en',
  'description_zh',
  'long_description_en',
  'long_description_zh',
  'category',
  'role_en',
  'role_zh',
  'status_en',
  'status_zh',
  'tags',
  'stack',
  'repo_url',
  'demo_url',
  'paper_url',
  'cover_url',
  'featured',
  'sort_order',
  'highlights_en',
  'highlights_zh',
  'challenges_en',
  'challenges_zh',
  'results_en',
  'results_zh'
] as const

type ProjectRow = Record<(typeof PROJECT_COLUMNS)[number], unknown>

function loadDotEnv() {
  const envPath = path.join(process.cwd(), '.env')
  if (!fs.existsSync(envPath)) return

  for (const rawLine of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue

    const separator = line.indexOf('=')
    if (separator < 1) continue

    const key = line.slice(0, separator).trim()
    let value = line.slice(separator + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    if (process.env[key] === undefined) process.env[key] = value
  }
}

function localRows(): ProjectRow[] {
  return projectsData.map((project, sortOrder) => ({
    slug: project.slug,
    title_en: project.title.en,
    title_zh: project.title['zh-TW'],
    subtitle_en: project.subtitle?.en || null,
    subtitle_zh: project.subtitle?.['zh-TW'] || null,
    description_en: project.description.en,
    description_zh: project.description['zh-TW'],
    long_description_en: project.longDescription?.en || null,
    long_description_zh: project.longDescription?.['zh-TW'] || null,
    category: project.category,
    role_en: project.role.en,
    role_zh: project.role['zh-TW'],
    status_en: project.status.en,
    status_zh: project.status['zh-TW'],
    tags: project.tags,
    stack: project.stack,
    repo_url: project.links.repo || null,
    demo_url: project.links.demo || null,
    paper_url: project.links.paper || null,
    cover_url: project.cover || null,
    featured: project.featured,
    sort_order: sortOrder,
    highlights_en: project.highlights?.en || [],
    highlights_zh: project.highlights?.['zh-TW'] || [],
    challenges_en: project.challenges?.en || [],
    challenges_zh: project.challenges?.['zh-TW'] || [],
    results_en: project.results?.en || [],
    results_zh: project.results?.['zh-TW'] || []
  }))
}

function assertPrivateLinksAreNull(rows: ProjectRow[]) {
  for (const row of rows) {
    const tags = Array.isArray(row.tags) ? row.tags.map(String) : []
    if (!tags.includes('Private-Sanitized')) continue

    const linkedFields = ['repo_url', 'demo_url', 'paper_url'].filter(field => row[field as keyof ProjectRow])
    if (linkedFields.length) {
      throw new Error(`Private-Sanitized project ${String(row.slug)} must keep ${linkedFields.join(', ')} null`)
    }
  }
}

function comparable(row: Record<string, unknown>) {
  return Object.fromEntries(PROJECT_COLUMNS.map(column => [column, row[column] ?? null]))
}

function changedFields(local: ProjectRow, remote: Record<string, unknown>) {
  return PROJECT_COLUMNS.filter(column => JSON.stringify(local[column] ?? null) !== JSON.stringify(remote[column] ?? null))
}

function safeError(error: unknown) {
  let message = error instanceof Error ? error.message : String(error)
  for (const secret of [process.env.SUPABASE_SECRET_KEY, process.env.NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY]) {
    if (secret) message = message.replaceAll(secret, '[redacted]')
  }
  return message.slice(0, 500)
}

async function main() {
  loadDotEnv()

  const args = new Set(process.argv.slice(2))
  const apply = args.has('--apply')
  const confirm = process.argv.find(arg => arg.startsWith('--confirm='))?.slice('--confirm='.length)
  const unknown = [...args].filter(arg => arg !== '--dry-run' && arg !== '--apply' && !arg.startsWith('--confirm='))

  if (unknown.length || (apply && args.has('--dry-run'))) {
    throw new Error(`Invalid arguments: ${unknown.join(', ') || '--apply and --dry-run cannot be combined'}`)
  }
  if (apply && confirm !== APPLY_CONFIRMATION) {
    throw new Error(`Apply requires --confirm=${APPLY_CONFIRMATION}`)
  }

  const url = process.env.NUXT_PUBLIC_SUPABASE_URL
  const publicKey = process.env.NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  const serviceKey = process.env.SUPABASE_SECRET_KEY
  const missing = ['NUXT_PUBLIC_SUPABASE_URL', 'NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'].filter(
    key => !process.env[key]
  )

  console.log(`Mode: ${apply ? 'APPLY' : 'DRY RUN'}`)
  console.log('Deletion policy: disabled (remote-only rows are reported, never deleted)')

  if (missing.length) {
    console.log(`Skipped: missing env ${missing.join(', ')}`)
    return
  }
  if (apply && !serviceKey) throw new Error('Apply requires SUPABASE_SECRET_KEY')

  const supabase = createClient(url!, apply ? serviceKey! : publicKey!, {
    auth: { persistSession: false, autoRefreshToken: false }
  })
  const { data, error } = await supabase.from('projects').select(PROJECT_COLUMNS.join(','))
  if (error) throw error

  const local = localRows()
  assertPrivateLinksAreNull(local)
  const remote = (data || []) as Record<string, unknown>[]
  const remoteBySlug = new Map(remote.map(row => [String(row.slug), row]))
  const localSlugs = new Set(local.map(row => String(row.slug)))
  const additions = local.filter(row => !remoteBySlug.has(String(row.slug)))
  const updates = local
    .filter(row => remoteBySlug.has(String(row.slug)))
    .map(row => ({ row, fields: changedFields(row, remoteBySlug.get(String(row.slug))!) }))
    .filter(item => item.fields.length > 0)
  const unchanged = local.filter(row => {
    const existing = remoteBySlug.get(String(row.slug))
    return existing && JSON.stringify(comparable(row)) === JSON.stringify(comparable(existing))
  })
  const remoteOnly = remote.filter(row => !localSlugs.has(String(row.slug)))

  for (const row of additions) console.log(`ADD ${row.slug}`)
  for (const item of updates) console.log(`UPDATE ${item.row.slug}: ${item.fields.join(', ')}`)
  for (const row of unchanged) console.log(`UNCHANGED ${row.slug}`)
  for (const row of remoteOnly) console.log(`REMOVE-CANDIDATE ${String(row.slug)} (reported only; no deletion)`)

  console.log(`Summary: add=${additions.length} update=${updates.length} unchanged=${unchanged.length} remove-candidate=${remoteOnly.length}`)

  if (!apply || (!additions.length && !updates.length)) return

  const rowsToWrite = [...additions, ...updates.map(item => item.row)]
  const { error: writeError } = await supabase.from('projects').upsert(rowsToWrite, { onConflict: 'slug' })
  if (writeError) throw writeError
  console.log(`Applied ${rowsToWrite.length} upsert(s); deleted 0 row(s).`)
}

main().catch(error => {
  console.error(`Project sync failed: ${safeError(error)}`)
  process.exitCode = 1
})
