import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { basename, dirname, extname, resolve } from 'node:path'
import { projectsData } from '../data/projects.ts'
import { profileData } from '../data/profile.ts'
import { coreCapabilities } from '../data/engineering.ts'
import { mergeReviewedCatalogRecord } from '../utils/reviewedCatalogMerge.ts'
import { hasPublicationWordingViolation } from '../utils/publicationWording.ts'

const workspaceRoot = resolve(import.meta.dirname, '..')
const projectCoverDirectory = resolve(workspaceRoot, 'public', 'images', 'projects')
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
const coverUrls = new Set<string>()

const expectedProfile = {
  title: {
    en: 'Embedded Linux & Distributed Real-Time Systems Developer',
    'zh-TW': 'Embedded Linux 與分散式即時系統開發者'
  },
  capabilityLine: {
    en: 'High-Concurrency Go · Cloud-Native Systems · Jetson Edge AI · ROS 2 · UAV Integration · Nuxt',
    'zh-TW': '高併發 Go · 雲原生系統 · Jetson 邊緣 AI · ROS 2 · 無人載具整合 · Nuxt'
  },
  summary: {
    en: 'I build high-concurrency backends and distributed real-time systems, integrating Go services, Nuxt interfaces, Embedded Linux / Jetson edge AI, ROS 2, and UAV telemetry.',
    'zh-TW': '我建構高併發後端與分散式即時系統，整合 Go 服務、Nuxt 介面、Embedded Linux／Jetson 邊緣 AI、ROS 2 與無人載具遙測。'
  }
}

for (const locale of ['en', 'zh-TW'] as const) {
  if (profileData.title[locale] !== expectedProfile.title[locale]) errors.push(`${locale}: Hero title does not match the approved positioning`)
  if (profileData.capabilityLine[locale] !== expectedProfile.capabilityLine[locale]) errors.push(`${locale}: capability line does not match the approved positioning`)
  if (profileData.summary[locale] !== expectedProfile.summary[locale]) errors.push(`${locale}: Hero summary does not exactly match the approved concise sentence`)
}

const detailedGroupIds = new Set(profileData.skills.map(group => group.id))
if (coreCapabilities.length !== 4) errors.push(`Home must expose exactly four core capabilities, found ${coreCapabilities.length}`)
for (const capability of coreCapabilities) {
  if (capability.skills.length < 5 || capability.skills.length > 6) errors.push(`${capability.id}: expected five or six homepage technology chips`)
  if (capability.sourceGroupIds.some(groupId => !detailedGroupIds.has(groupId))) errors.push(`${capability.id}: references a missing detailed capability group`)
  if (capability.href !== '/about#capabilities') errors.push(`${capability.id}: detailed capability link must target /about#capabilities`)
}

for (const forbidden of [
  'published in IEEE Transactions on Multimedia',
  'accepted by IEEE Transactions on Multimedia',
  '已發表於 IEEE Transactions on Multimedia',
  '已接受 IEEE Transactions on Multimedia',
  '已刊登於 IEEE Transactions on Multimedia'
]) {
  if (!hasPublicationWordingViolation(forbidden)) errors.push(`publication wording guard missed forbidden form: ${forbidden}`)
}
for (const approved of [
  'Research submitted to IEEE Transactions on Multimedia',
  '研究成果已投稿至 IEEE Transactions on Multimedia'
]) {
  if (hasPublicationWordingViolation(approved)) errors.push(`publication wording guard rejected approved form: ${approved}`)
}

const appliedResearch = profileData.research.filter(item => item.kind === 'applied-rd')
const independentResearch = profileData.research.filter(item => item.kind === 'independent-research')
if (appliedResearch.length !== 1 || independentResearch.length !== 1) errors.push('NSTC applied R&D and independent IEEE research must be separate entries')
if (/IEEE Transactions on Multimedia/i.test(appliedResearch[0]?.description.en || '')) errors.push('NSTC description must not contain the IEEE submission claim')
if (!/separately from the NSTC projects/i.test(independentResearch[0]?.description.en || '')) errors.push('Independent research description does not explicitly separate the NSTC work')

const reviewedFixture: Record<string, any> = {
  slug: 'fixture',
  category: 'Edge AI',
  tags: ['Edge AI Deployment Path'],
  description_en: 'Reviewed current-focus wording',
  repo_url: null
}
const staleRemoteFixture: Record<string, any> = {
  slug: 'fixture',
  category: 'Legacy',
  tags: ['Production Jetson'],
  description_en: 'Stale unsupported wording',
  repo_url: 'https://example.invalid/private'
}
const mergedFixture = mergeReviewedCatalogRecord(reviewedFixture, staleRemoteFixture)
if (
  mergedFixture.category !== reviewedFixture.category
  || mergedFixture.description_en !== reviewedFixture.description_en
  || mergedFixture.repo_url !== reviewedFixture.repo_url
  || JSON.stringify(mergedFixture.tags) !== JSON.stringify(reviewedFixture.tags)
) {
  errors.push('reviewed local catalog fields are not authoritative over a stale remote row')
}

function readUint24LE(buffer: Buffer, offset: number) {
  return buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16)
}

function readWebpDimensions(buffer: Buffer) {
  if (buffer.length < 30 || buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') {
    return null
  }

  let offset = 12
  while (offset + 8 <= buffer.length) {
    const chunkType = buffer.toString('ascii', offset, offset + 4)
    const chunkSize = buffer.readUInt32LE(offset + 4)
    const dataOffset = offset + 8

    if (chunkType === 'VP8X' && dataOffset + 10 <= buffer.length) {
      return {
        width: readUint24LE(buffer, dataOffset + 4) + 1,
        height: readUint24LE(buffer, dataOffset + 7) + 1
      }
    }

    if (
      chunkType === 'VP8 '
      && dataOffset + 10 <= buffer.length
      && buffer[dataOffset + 3] === 0x9d
      && buffer[dataOffset + 4] === 0x01
      && buffer[dataOffset + 5] === 0x2a
    ) {
      return {
        width: buffer.readUInt16LE(dataOffset + 6) & 0x3fff,
        height: buffer.readUInt16LE(dataOffset + 8) & 0x3fff
      }
    }

    if (chunkType === 'VP8L' && dataOffset + 5 <= buffer.length && buffer[dataOffset] === 0x2f) {
      const b1 = buffer[dataOffset + 1]
      const b2 = buffer[dataOffset + 2]
      const b3 = buffer[dataOffset + 3]
      const b4 = buffer[dataOffset + 4]
      return {
        width: 1 + (((b2 & 0x3f) << 8) | b1),
        height: 1 + (((b4 & 0x0f) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6))
      }
    }

    offset = dataOffset + chunkSize + (chunkSize % 2)
  }

  return null
}

function verifyWebpFile(filePath: string, label: string) {
  if (!existsSync(filePath)) {
    errors.push(`${label}: file does not exist`)
    return
  }

  const size = statSync(filePath).size
  if (size <= 0) errors.push(`${label}: file is empty`)
  if (extname(filePath) !== '.webp') errors.push(`${label}: expected an exact lowercase .webp extension`)

  const dimensions = readWebpDimensions(readFileSync(filePath))
  if (!dimensions || dimensions.width <= 0 || dimensions.height <= 0) {
    errors.push(`${label}: file is not a valid decodable WebP with positive dimensions`)
  }
}

const directoryEntries = readdirSync(projectCoverDirectory)
for (const filename of directoryEntries) {
  if (/\.(?:avif|jpe?g|png|svg|webp)\.(?:avif|jpe?g|png|svg|webp)$/i.test(filename)) {
    errors.push(`hidden duplicate image extension: ${filename}`)
  }
}

for (const project of projectsData) {
  const label = project.slug || project.title?.en || '<unknown project>'
  if (!project.slug.trim()) errors.push(`${label}: slug is empty`)
  if (slugs.has(project.slug)) errors.push(`${label}: duplicate slug`)
  slugs.add(project.slug)

  if (!project.cover?.trim()) {
    errors.push(`${label}: cover is empty`)
  } else {
    if (!project.cover.startsWith('/images/projects/')) errors.push(`${label}: cover must be root-relative under /images/projects/`)
    if (project.cover !== `/images/projects/${project.slug}.webp`) errors.push(`${label}: cover must exactly match /images/projects/${project.slug}.webp`)
    if (project.cover.includes('public')) errors.push(`${label}: browser cover URL contains public`)
    if (project.cover.includes('src-legacy')) errors.push(`${label}: cover references src-legacy`)
    if (project.cover.includes('assets/ProjectCard')) errors.push(`${label}: cover references a source asset directory`)
    if (project.cover.includes('\\')) errors.push(`${label}: cover contains a backslash`)
    if (/^[A-Za-z]:[\\/]/.test(project.cover) || project.cover.startsWith('file:')) errors.push(`${label}: cover is a local filesystem URL`)
    if (/^https?:/i.test(project.cover) || /raw\.githubusercontent\.com/i.test(project.cover)) errors.push(`${label}: cover is a remote URL`)
    if (project.cover.endsWith('/project-placeholder.webp')) errors.push(`${label}: placeholder is not a valid catalog cover`)
    if (coverUrls.has(project.cover)) errors.push(`${label}: duplicate cover URL: ${project.cover}`)
    coverUrls.add(project.cover)

    const localCover = resolve(workspaceRoot, 'public', project.cover.replace(/^\//, ''))
    const exactFilename = basename(localCover)
    if (!readdirSync(dirname(localCover)).includes(exactFilename)) {
      errors.push(`${label}: filename casing does not exactly match the physical file: ${exactFilename}`)
    }
    verifyWebpFile(localCover, `${label}: ${project.cover}`)
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

verifyWebpFile(
  resolve(projectCoverDirectory, 'project-placeholder.webp'),
  'project placeholder: /images/projects/project-placeholder.webp'
)

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
