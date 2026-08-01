import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { basename, extname, join, parse, relative, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

type CoverMapping = {
  title: string
  slug: string
  aliases: string[]
  fallbackCandidates?: string[]
}

type ImportResult = {
  source: string
  title: string
  slug: string
  destination: string
  status: string
}

const workspaceRoot = resolve(import.meta.dirname, '..')
const sourceDirectory = join(workspaceRoot, 'src-legacy', 'assets', 'ProjectCard')
const destinationDirectory = join(workspaceRoot, 'public', 'images', 'projects')

const coverMappings: CoverMapping[] = [
  {
    title: 'Scalable Railway Ticketing Platform',
    slug: 'scalable-railway-ticketing-platform',
    aliases: ['Scalable Railway Ticketing Platform']
  },
  {
    title: 'World-Model-Guided Digital-Twin UAV Navigation Research Framework',
    slug: 'gwm-uav-navigation-sparse-rewards',
    aliases: ['World-Model-Guided Digital-Twin UAV Navigation Research Framework']
  },
  {
    title: 'Scalable E-Commerce Backend Platform',
    slug: 'scalable-ecommerce-platform',
    aliases: ['Scalable E-Commerce Backend Platform']
  },
  {
    title: 'Heterogeneous UAV-USV-UGV Swarm Collaborative System',
    slug: 'heterogeneous-uav-swarm-system',
    aliases: [
      'Heterogeneous UAV-USV-UGV Swarm Collaborative System',
      'Heterogeneous UAV-USV-UGV Swarm System',
      'Heterogeneous UAV/USV/UGV Swarm Collaborative System'
    ]
  },
  {
    title: 'Diffusion Transformer Video Anomaly Detection',
    slug: 'thesis-code',
    aliases: [
      'Diffusion Transformer Video Anomaly Detection',
      'Diffusion Transformer for Video Anomaly Detection',
      'Video Anomaly Detection',
      'Master Thesis Code - Video Anomaly Detection'
    ],
    fallbackCandidates: [
      'public/images/blog/diffusion-transformer-video-anomaly-detection.png',
      'assets/pic/diffusion-transformer-video-anomaly-detection.png'
    ]
  },
  {
    title: 'Data Analysis Website Archive',
    slug: 'analysis-website',
    aliases: ['Data Analysis Website Archive']
  },
  {
    title: 'Face Detect Realtime Prototype',
    slug: 'face-detect-realtime',
    aliases: ['Face Detect Realtime Prototype', 'Face Detect Realtime', 'Real-Time Face Detection']
  }
]

function normalizeName(value: string) {
  return parse(value)
    .name
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[\\/\-]+/g, '')
    .replace(/[^a-z0-9]+/g, '')
}

function findCwebp() {
  const probe = spawnSync('cwebp', ['-version'], { encoding: 'utf8', shell: false })
  return probe.status === 0 ? 'cwebp' : null
}

function locateSource(mapping: CoverMapping, sourceFiles: string[]) {
  const aliases = new Set(mapping.aliases.map(normalizeName))
  const matches = sourceFiles.filter((filename) => aliases.has(normalizeName(filename)))

  if (matches.length > 1) {
    throw new Error(`AMBIGUOUS_SOURCE_IMAGE ${mapping.slug}: ${matches.join(', ')}`)
  }
  if (matches.length === 1) {
    return { path: join(sourceDirectory, matches[0]), fromFallback: false }
  }

  const fallback = mapping.fallbackCandidates
    ?.map((candidate) => resolve(workspaceRoot, candidate))
    .find((candidate) => existsSync(candidate) && statSync(candidate).isFile())

  return fallback ? { path: fallback, fromFallback: true } : null
}

function importCover(mapping: CoverMapping, sourcePath: string, fromFallback: boolean, cwebp: string | null): ImportResult {
  const sourceExtension = extname(sourcePath).toLowerCase()

  if (cwebp) {
    const destination = join(destinationDirectory, `${mapping.slug}.webp`)
    const conversion = spawnSync(
      cwebp,
      ['-quiet', '-q', '90', '-m', '6', '-resize', '1600', '900', sourcePath, '-o', destination],
      { encoding: 'utf8', shell: false }
    )
    if (conversion.status !== 0) {
      throw new Error(`WebP conversion failed for ${basename(sourcePath)}: ${(conversion.stderr || conversion.stdout).trim()}`)
    }
    return {
      source: relative(workspaceRoot, sourcePath).replaceAll('\\', '/'),
      title: mapping.title,
      slug: mapping.slug,
      destination: relative(workspaceRoot, destination).replaceAll('\\', '/'),
      status: fromFallback ? 'CONVERTED_VERIFIED_FALLBACK' : 'CONVERTED_WEBP'
    }
  }

  if (sourceExtension !== '.png') {
    throw new Error(`COPY_UNSUPPORTED ${mapping.slug}: expected PNG when cwebp is unavailable, found ${sourceExtension}`)
  }

  const destination = join(destinationDirectory, `${mapping.slug}.png`)
  copyFileSync(sourcePath, destination)
  return {
    source: relative(workspaceRoot, sourcePath).replaceAll('\\', '/'),
    title: mapping.title,
    slug: mapping.slug,
    destination: relative(workspaceRoot, destination).replaceAll('\\', '/'),
    status: fromFallback ? 'COPIED_VERIFIED_FALLBACK_PNG' : 'COPIED_PNG'
  }
}

function printTable(results: ImportResult[]) {
  console.table(results.map((result) => ({
    source: result.source,
    project: result.title,
    slug: result.slug,
    destination: result.destination,
    status: result.status
  })))
}

function ensureFallbackCover(cwebp: string | null) {
  const destination = join(destinationDirectory, 'project-placeholder.webp')
  if (existsSync(destination)) return 'VERIFIED_EXISTING'

  const source = join(workspaceRoot, 'public', 'images', 'blog', 'placeholder.jpg')
  if (!existsSync(source)) throw new Error('Fallback cover source is missing: public/images/blog/placeholder.jpg')
  if (!cwebp) throw new Error('cwebp is required to create project-placeholder.webp from the existing local fallback image')

  const conversion = spawnSync(cwebp, ['-quiet', '-q', '88', '-m', '6', source, '-o', destination], {
    encoding: 'utf8',
    shell: false
  })
  if (conversion.status !== 0) {
    throw new Error(`Fallback WebP conversion failed: ${(conversion.stderr || conversion.stdout).trim()}`)
  }
  return 'CONVERTED_EXISTING_LOCAL_PLACEHOLDER'
}

function main() {
  if (!existsSync(sourceDirectory)) {
    throw new Error(`Project cover source directory does not exist: ${sourceDirectory}`)
  }
  mkdirSync(destinationDirectory, { recursive: true })

  const sourceFiles = readdirSync(sourceDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
  const cwebp = findCwebp()
  const fallbackStatus = ensureFallbackCover(cwebp)
  const results: ImportResult[] = []
  const matchedLegacyFiles = new Set<string>()
  const missing: string[] = []

  for (const mapping of coverMappings) {
    const located = locateSource(mapping, sourceFiles)
    if (!located) {
      missing.push(mapping.slug)
      results.push({
        source: '—',
        title: mapping.title,
        slug: mapping.slug,
        destination: '—',
        status: 'MISSING_SOURCE_IMAGE'
      })
      continue
    }

    if (!located.fromFallback) matchedLegacyFiles.add(basename(located.path))
    results.push(importCover(mapping, located.path, located.fromFallback, cwebp))
  }

  const unmatched = sourceFiles.filter((filename) => !matchedLegacyFiles.has(filename))
  printTable(results)
  console.log(`Converter: ${cwebp ? 'cwebp (WebP, 1600x900, quality 90)' : 'unavailable; PNG copy mode'}`)
  console.log(`Fallback cover: ${fallbackStatus}`)
  console.log(`Missing project images: ${missing.length ? missing.join(', ') : 'none'}`)
  console.log(`Unmatched source images: ${unmatched.length ? unmatched.join(', ') : 'none'}`)
  console.log('Original source files were preserved; destination files were not deleted automatically.')

  if (missing.length) process.exitCode = 1
}

main()
