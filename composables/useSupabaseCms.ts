import { computed, ref } from 'vue'

interface CmsFetchOptions {
  admin?: boolean
}

export const useSupabaseCms = () => {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl
  const supabaseKey = config.public.supabasePublishableKey
  const health = useState<any>('cms-health', () => null)
  const lastError = useState<string>('cms-last-error', () => '')
  const isHealthLoading = ref(false)

  // Check if public keys exist to determine client-side connection potential
  const isConfigured = computed(() => {
    return !!(supabaseUrl && supabaseKey)
  })

  // Reactive state for mock mode
  const isMockMode = computed(() => {
    if (health.value?.mode) {
      return health.value.mode === 'mock'
    }
    return !isConfigured.value
  })

  const isProductionReady = computed(() => {
    return health.value?.mode === 'production'
  })

  // Warn if in mock mode
  if (isMockMode.value) {
    console.warn(
      '[Supabase Client Warning]: Missing public Supabase configurations. Running in Mock Mode.'
    )
  }

  const loadHealth = async () => {
    if (isHealthLoading.value) return health.value
    isHealthLoading.value = true
    try {
      health.value = await $fetch('/api/cms/health')
      return health.value
    } catch (error: any) {
      health.value = {
        mode: 'mock',
        database: {
          connected: false,
          error: error?.statusMessage || error?.message || 'Unable to check CMS health.'
        }
      }
      return health.value
    } finally {
      isHealthLoading.value = false
    }
  }

  const adminRequestOptions = (options?: CmsFetchOptions) => {
    if (!options?.admin) return {}
    const { getAuthHeaders } = useAdminAuth()
    return {
      query: { admin: '1' },
      headers: getAuthHeaders()
    }
  }

  // Fetch all posts
  const getPosts = async (options?: CmsFetchOptions) => {
    try {
      lastError.value = ''
      const data = await $fetch('/api/posts', adminRequestOptions(options))
      return data
    } catch (error: any) {
      lastError.value = error?.statusMessage || error?.message || 'Error fetching posts.'
      console.error('Error fetching posts:', error)
      return []
    }
  }

  // Fetch single post by ID or slug
  const getPost = async (idOrSlug: string, options?: CmsFetchOptions) => {
    try {
      lastError.value = ''
      const data = await $fetch(`/api/posts/${idOrSlug}`, adminRequestOptions(options))
      return data
    } catch (error: any) {
      lastError.value = error?.statusMessage || error?.message || `Error fetching post ${idOrSlug}.`
      console.error(`Error fetching post ${idOrSlug}:`, error)
      return null
    }
  }

  // Fetch all projects
  const getProjects = async (options?: CmsFetchOptions) => {
    try {
      lastError.value = ''
      const data = await $fetch('/api/projects', adminRequestOptions(options))
      return data
    } catch (error: any) {
      lastError.value = error?.statusMessage || error?.message || 'Error fetching projects.'
      console.error('Error fetching projects:', error)
      return []
    }
  }

  // Fetch single project by ID or slug
  const getProject = async (idOrSlug: string, options?: CmsFetchOptions) => {
    try {
      lastError.value = ''
      const data = await $fetch(`/api/projects/${idOrSlug}`, adminRequestOptions(options))
      return data
    } catch (error: any) {
      lastError.value = error?.statusMessage || error?.message || `Error fetching project ${idOrSlug}.`
      console.error(`Error fetching project ${idOrSlug}:`, error)
      return null
    }
  }

  return {
    health,
    lastError,
    isMockMode,
    isConfigured,
    isProductionReady,
    loadHealth,
    getPosts,
    getPost,
    getProjects,
    getProject
  }
}
