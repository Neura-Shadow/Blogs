import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { projectsData } from '../data/projects.ts'

const workspaceRoot = resolve(import.meta.dirname, '..')
const expectedSlugs = new Set([
  'scalable-railway-ticketing-platform',
  'gwm-uav-navigation-sparse-rewards',
  'scalable-ecommerce-platform',
  'heterogeneous-uav-swarm-system',
  'thesis-code',
  'analysis-website',
  'face-detect-realtime'
])
const publicRepositoryUrls = new Set([
  'https://github.com/Neura-Shadow/Scalable-Railway-Ticketing-Platform',
  'https://github.com/Neura-Shadow/GWM-UAV-Navigation-Sparse-Rewards',
  'https://github.com/Neura-Shadow/Scalable-E-Commerce-Platform',
  'https://github.com/Neura-Shadow/Analysis_website',
  'https://github.com/Neura-Shadow/Face_Detect_Realtime'
])
const excludedRepositories = new Set([
  'https://github.com/Neura-Shadow/Blogs',
  'https://github.com/Neura-Shadow/Neura-Shadow'
])
const errors: string[] = []
const slugs = new Set<string>()

for (const project of projectsData) {
  const label = project.slug || project.title?.en || '<unknown project>'
  if (!project.slug.trim()) errors.push(`${label}: slug is empty`)
  if (slugs.has(project.slug)) errors.push(`${label}: duplicate slug`)
  slugs.add(project.slug)

  if (!project.cover?.trim()) {
    errors.push(`${label}: cover is empty`)
  } else {
    if (!project.cover.startsWith('/images/projects/')) errors.push(`${label}: cover must be root-relative under /images/projects/`)
    if (project.cover.includes('src-legacy')) errors.push(`${label}: cover references src-legacy`)
    if (/^[A-Za-z]:[\\/]/.test(project.cover) || project.cover.startsWith('file:')) errors.push(`${label}: cover is a local filesystem URL`)
    if (/^https?:/i.test(project.cover)) errors.push(`${label}: cover is a remote URL`)
    if (project.cover.endsWith('/project-placeholder.webp')) errors.push(`${label}: placeholder is not a valid catalog cover`)
    const localCover = resolve(workspaceRoot, 'public', project.cover.replace(/^\//, ''))
    if (!existsSync(localCover)) errors.push(`${label}: cover file does not exist: ${project.cover}`)
  }

  if (!project.title?.en?.trim() || !project.title?.['zh-TW']?.trim()) errors.push(`${label}: bilingual title is incomplete`)
  if (!project.description?.en?.trim() || !project.description?.['zh-TW']?.trim()) errors.push(`${label}: bilingual description is incomplete`)
  if (/^Master Thesis(?: Code)?/i.test(project.title.en.trim())) errors.push(`${label}: visible English title starts with Master Thesis`)

  const repositoryUrl = project.links?.repo
  if (repositoryUrl && excludedRepositories.has(repositoryUrl)) errors.push(`${label}: excluded self repository is exposed`)
  if (repositoryUrl && !publicRepositoryUrls.has(repositoryUrl)) errors.push(`${label}: repository URL is not in the reviewed public allowlist`)
  if (project.tags.includes('Private-Sanitized') && (project.links.repo || project.links.demo || project.links.paper)) {
    errors.push(`${label}: private-sanitized project exposes a public resource link`)
  }
}

for (const slug of expectedSlugs) {
  if (!slugs.has(slug)) errors.push(`missing expected public slug: ${slug}`)
}
for (const slug of slugs) {
  if (!expectedSlugs.has(slug)) errors.push(`unexpected public project slug: ${slug}`)
}

const cardSource = readFileSync(resolve(workspaceRoot, 'components/project/ProjectCard.vue'), 'utf8')
if (!cardSource.includes("name: 'projects-slug'") || !cardSource.includes('params: { slug: project.slug }')) {
  errors.push('ProjectCard.vue does not use the stable named projects-slug route with project.slug')
}

if (errors.length) {
  console.error(`Project catalog verification failed (${errors.length}):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  console.log(`Project catalog verification passed: ${projectsData.length} public projects, unique slugs, real local covers, bilingual copy, stable routes, and no excluded/private repository exposure.`)
}
