import { projectsData } from '../data/projects.ts'

type CoverResult = {
  project: string
  cover: string
  requestedUrl: string
  status: number | string
  contentType: string
  bytes: number
  result: 'PASS' | 'FAIL'
  reason: string
}

const configuredBaseUrl = process.env.PROJECT_COVER_BASE_URL || 'http://127.0.0.1:3000/'
const baseUrl = new URL(configuredBaseUrl.endsWith('/') ? configuredBaseUrl : `${configuredBaseUrl}/`)

function coverRequestUrl(cover: string) {
  return new URL(cover.replace(/^\/+/, ''), baseUrl).toString()
}

function looksLikeHtml(contentType: string, bytes: Uint8Array) {
  const prefix = new TextDecoder().decode(bytes.slice(0, 256)).trimStart().toLowerCase()
  return contentType.includes('text/html') || prefix.startsWith('<!doctype html') || prefix.startsWith('<html')
}

const results: CoverResult[] = []

for (const project of projectsData) {
  const cover = project.cover || ''
  const requestedUrl = coverRequestUrl(cover)

  try {
    const response = await fetch(requestedUrl, { redirect: 'follow' })
    const contentType = response.headers.get('content-type')?.toLowerCase() || ''
    const bytes = new Uint8Array(await response.arrayBuffer())
    const reasons: string[] = []

    if (response.status !== 200) reasons.push(`expected HTTP 200, received ${response.status}`)
    if (!contentType.startsWith('image/')) reasons.push(`expected image/* content type, received ${contentType || '<missing>'}`)
    if (!bytes.length) reasons.push('response body is empty')
    if (looksLikeHtml(contentType, bytes)) reasons.push('response is an HTML document')

    results.push({
      project: project.slug,
      cover,
      requestedUrl,
      status: response.status,
      contentType,
      bytes: bytes.length,
      result: reasons.length ? 'FAIL' : 'PASS',
      reason: reasons.join('; ') || 'HTTP image response is valid'
    })
  } catch (error) {
    results.push({
      project: project.slug,
      cover,
      requestedUrl,
      status: 'ERROR',
      contentType: '',
      bytes: 0,
      result: 'FAIL',
      reason: error instanceof Error ? error.message : String(error)
    })
  }
}

console.table(results)

const failures = results.filter(result => result.result === 'FAIL')
if (failures.length) {
  console.error(`Project cover HTTP verification failed: ${failures.length}/${results.length} requests were invalid.`)
  process.exitCode = 1
} else {
  console.log(`Project cover HTTP verification passed: ${results.length}/${results.length} covers returned HTTP 200 with non-HTML image responses.`)
}
