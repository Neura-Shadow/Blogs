import { computed } from 'vue'

const ABSOLUTE_ASSET_RE = /^(?:[a-z][a-z\d+\-.]*:|\/\/)/i

export const usePublicAssetPath = () => {
  const config = useRuntimeConfig()
  const baseURL = computed(() => config.app.baseURL || '/')

  const publicAssetPath = (value?: string | null, fallback = '/images/blog/placeholder.jpg') => {
    const raw = (value || fallback).trim() || fallback

    if (ABSOLUTE_ASSET_RE.test(raw)) return raw

    const assetPath = raw.startsWith('/') ? raw : `/${raw}`
    const base = baseURL.value.endsWith('/') ? baseURL.value.slice(0, -1) : baseURL.value

    if (!base || base === '/') return assetPath
    if (assetPath === base || assetPath.startsWith(`${base}/`)) return assetPath

    return `${base}${assetPath}`
  }

  return {
    publicAssetPath
  }
}
