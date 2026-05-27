import { useAdminAuth } from '~/composables/useAdminAuth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Only protect admin pages, excluding the login page
  if (to.path === '/admin/login') {
    return
  }

  const { isAuthenticated, refreshSession } = useAdminAuth()

  if (process.server) {
    const tokenCookie = useCookie<string | null>('admin_access_token')
    if (!tokenCookie.value) {
      return navigateTo('/admin/login')
    }
    return
  }

  await refreshSession()

  if (!isAuthenticated.value) {
    console.warn(`[Admin Auth Middleware]: Access to ${to.path} denied. Redirecting to /admin/login`)
    return navigateTo('/admin/login')
  }
})
