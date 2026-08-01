import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { basename, dirname, extname, resolve } from 'node:path'
import { projectsData } from '../data/projects.ts'

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
