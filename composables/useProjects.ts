import type { Project } from '~/types/project'
import { projectsData } from '~/data/projects'
import { dbProjectToProject } from '~/utils/cmsMappers'
import { mergeReviewedCatalogRecord } from '~/utils/reviewedCatalogMerge'

export type ProjectDataSource = 'auto' | 'local' | 'supabase'
export type ProjectLocale = 'en' | 'zh-TW'

export const PROJECT_COVER_PLACEHOLDER = '/images/projects/project-placeholder.webp'
const PROJECT_COVER_RE = /^\/images\/projects\/[A-Za-z0-9][A-Za-z0-9_().-]*\.(?:avif|jpe?g|png|svg|webp)$/i

const excludedProjectSlugs = new Set(['blogs'])
const excludedPortfolioRepos = new Set([
  'https://github.com/Neura-Shadow/Blogs',
  'https://github.com/Neura-Shadow/Neura-Shadow'
])

export function normalizeProjectSlug(value: unknown) {
  return String(value ?? '').trim().toLowerCase()
}

export function normalizeProjectCoverPath(value: unknown, fallback = PROJECT_COVER_PLACEHOLDER) {
  const raw = String(value ?? '').trim()
  if (!raw) return fallback

  const normalized = raw.replaceAll('\\', '/')
  if (
    /^file:/i.test(normalized)
    || /^[A-Za-z]:\//.test(normalized)
    || normalized.includes('src-legacy/')
    || normalized.includes('assets/ProjectCard/')
    || normalized.startsWith('/public/')
    || normalized.startsWith('public/')
    || /^(?:https?:)?\/\//i.test(normalized)
  ) {
    return fallback
  }

  const rootRelative = normalized.startsWith('images/projects/')
    ? `/${normalized}`
    : normalized

  return PROJECT_COVER_RE.test(rootRelative) ? rootRelative : fallback
}

export function normalizeProjectCover(value: unknown) {
  const normalized = normalizeProjectCoverPath(value, '')
  return normalized || null
}

function isExcludedProject(project: Project) {
  return excludedProjectSlugs.has(project.slug) || !!(project.links.repo && excludedPortfolioRepos.has(project.links.repo))
}

function sanitizePrivateLinks(project: Project): Project {
  if (!project.tags.includes('Private-Sanitized')) return project
  return {
    ...project,
    links: { repo: null, demo: null, paper: null }
  }
}

export function normalizeProject(record: unknown): Project {
  const row = record as any
  const mapped = row?.title?.en && row?.title?.['zh-TW']
    ? row as Project
    : dbProjectToProject(row || {})

  return sanitizePrivateLinks({
    ...mapped,
    slug: normalizeProjectSlug(mapped.slug),
    cover: normalizeProjectCover(mapped.cover),
    tags: Array.isArray(mapped.tags) ? mapped.tags.map(String).filter(Boolean) : [],
    stack: Array.isArray(mapped.stack) ? mapped.stack.map(String).filter(Boolean) : [],
    links: {
      repo: mapped.links?.repo || null,
      demo: mapped.links?.demo || null,
      paper: mapped.links?.paper || null
    }
  })
}

function mergeProject(localProject: Project, remoteProject: Project): Project {
  const merged: Project = {
    ...mergeReviewedCatalogRecord(localProject, remoteProject),
    slug: localProject.slug,
    title: localProject.title,
    cover: normalizeProjectCover(localProject.cover),
    links: { ...localProject.links }
  }

  return sanitizePrivateLinks(merged)
}

function localProjects() {
  return projectsData.map(normalizeProject).filter(project => !isExcludedProject(project))
}

function dataSourceMode(): ProjectDataSource {
  const configured = String(useRuntimeConfig().public.projectDataSource || 'auto').toLowerCase()
  return configured === 'local' || configured === 'supabase' ? configured : 'auto'
}

function responseStatus(error: any) {
  return Number(error?.statusCode || error?.status || error?.response?.status || 0)
}

export async function fetchProjects(): Promise<Project[]> {
  const local = localProjects()
  if (dataSourceMode() === 'local') return local

  try {
    const remoteRows = await $fetch<any[]>('/api/projects')
    if (!Array.isArray(remoteRows) || !remoteRows.length) return local

    const remoteBySlug = new Map(
      remoteRows
        .map(normalizeProject)
        .filter(project => !isExcludedProject(project))
        .map(project => [project.slug, project])
    )
    return local.map(project => {
      const remote = remoteBySlug.get(project.slug)
      return remote ? mergeProject(project, remote) : project
    })
  } catch {
    return local
  }
}

export async function fetchProjectBySlug(value: string): Promise<Project | null> {
  const slug = normalizeProjectSlug(value)
  if (!slug || excludedProjectSlugs.has(slug)) return null

  const local = localProjects().find(project => project.slug === slug) || null
  if (dataSourceMode() === 'local') return local

  try {
    const remoteRow = await $fetch<any>(`/api/projects/${encodeURIComponent(slug)}`)
    const remote = normalizeProject(remoteRow)
    if (isExcludedProject(remote) || remote.slug !== slug) return local
    return local ? mergeProject(local, remote) : remote
  } catch (error: any) {
    if (local) return local
    if (responseStatus(error) === 404) return null
    throw error
  }
}

export function resolveLocalizedProject(project: Project, locale: ProjectLocale) {
  return {
    ...project,
    localizedTitle: project.title[locale] || project.title.en,
    localizedSubtitle: project.subtitle?.[locale] || project.subtitle?.en || '',
    localizedDescription: project.description[locale] || project.description.en,
    localizedLongDescription: project.longDescription?.[locale]
      || project.longDescription?.en
      || project.description[locale]
      || project.description.en
  }
}

export const useProjects = () => ({
  fetchProjects,
  fetchProjectBySlug,
  normalizeProject,
  resolveLocalizedProject
})
