import { checkAdminAuth } from '~/server/utils/auth'
import { formatSupabaseError, getSupabaseClient } from '~/server/utils/supabase'

const allowedBuckets = ['blog-covers', 'project-covers', 'resume', 'gallery'] as const

const getTextField = (parts: Awaited<ReturnType<typeof readMultipartFormData>>, name: string) => {
  return parts?.find((part) => part.name === name && !part.filename)?.data?.toString('utf-8')?.trim() || ''
}

const sanitizeFilename = (filename: string) => {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '') || `upload-${Date.now()}`
}

export default defineEventHandler(async (event) => {
  await checkAdminAuth(event)

  const client = getSupabaseClient()
  if (!client) {
    return {
      success: false,
      warning: 'Mock Mode: Media upload is disabled until Supabase integration is complete.',
      message: 'To enable uploads, configure all Supabase environment keys and create the storage buckets.'
    }
  }

  const parts = await readMultipartFormData(event)
  const file = parts?.find((part) => part.name === 'file' && part.filename)
  const bucket = getTextField(parts, 'bucket') || 'gallery'
  const altEn = getTextField(parts, 'alt_en')
  const altZh = getTextField(parts, 'alt_zh')

  if (!allowedBuckets.includes(bucket as any)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid bucket. Allowed buckets: ${allowedBuckets.join(', ')}`
    })
  }

  if (!file?.data || !file.filename) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing uploaded file.'
    })
  }

  const contentType = file.type || 'application/octet-stream'
  const isResumeBucket = bucket === 'resume'
  const isAllowedType = isResumeBucket
    ? contentType === 'application/pdf'
    : contentType.startsWith('image/')

  if (!isAllowedType) {
    throw createError({
      statusCode: 400,
      statusMessage: isResumeBucket
        ? 'The resume bucket only accepts PDF files.'
        : 'This bucket only accepts image uploads.'
    })
  }

  const filePath = `${new Date().toISOString().slice(0, 10)}/${Date.now()}-${sanitizeFilename(file.filename)}`
  const upload = await client.storage
    .from(bucket)
    .upload(filePath, file.data, {
      contentType,
      upsert: false
    })

  if (upload.error) {
    throw createError({
      statusCode: 400,
      statusMessage: `Storage Upload Error: ${formatSupabaseError(upload.error)}`
    })
  }

  const publicUrl = client.storage.from(bucket).getPublicUrl(upload.data.path).data.publicUrl

  const { data, error } = await client
    .from('media_assets')
    .insert([{
      bucket,
      path: upload.data.path,
      public_url: publicUrl,
      alt_en: altEn,
      alt_zh: altZh,
      type: contentType
    }])
    .select()
    .single()

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: `Media Metadata Error: ${formatSupabaseError(error)}`
    })
  }

  return {
    success: true,
    data,
    public_url: publicUrl
  }
})
