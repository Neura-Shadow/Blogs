<template>
  <div class="min-h-screen bg-[#FCFAF6] text-[#1F1E1B] flex font-sans">
    <!-- Sidebar Navigation -->
    <aside class="w-64 bg-white border-r border-[#E6DFD5] flex flex-col shrink-0">
      <!-- Sidebar Brand Header -->
      <div class="p-6 border-b border-[#E6DFD5] flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-[#00a884]"></div>
          <span class="font-display font-bold tracking-tight text-lg">Neura Shadow</span>
        </div>
        <span class="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#FAF8F5] border border-[#E6DFD5] rounded-md text-[#6B665F]">
          CMS Admin
        </span>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-1 p-4 space-y-1">
        <NuxtLink
          to="/admin"
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition"
          :class="isRouteActive('/admin') ? 'bg-[#FAF8F5] text-[#00a884] font-semibold border border-[#E6DFD5]' : 'text-[#6B665F] hover:bg-[#FCFAF6] hover:text-[#1F1E1B]'"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
          </svg>
          Dashboard
        </NuxtLink>

        <NuxtLink
          to="/admin/posts"
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition"
          :class="isRouteActive('/admin/posts') ? 'bg-[#FAF8F5] text-[#00a884] font-semibold border border-[#E6DFD5]' : 'text-[#6B665F] hover:bg-[#FCFAF6] hover:text-[#1F1E1B]'"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 4a2 2 0 012 2v8a2 2 0 01-2 2h-3m-6 0a1 1 0 001-1V7a1 1 0 00-1-1 1 1 0 00-1 1v12a1 1 0 001 1z" />
          </svg>
          Manage Posts
        </NuxtLink>

        <NuxtLink
          to="/admin/projects"
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition"
          :class="isRouteActive('/admin/projects') ? 'bg-[#FAF8F5] text-[#00a884] font-semibold border border-[#E6DFD5]' : 'text-[#6B665F] hover:bg-[#FCFAF6] hover:text-[#1F1E1B]'"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Manage Projects
        </NuxtLink>

        <NuxtLink
          to="/admin/media"
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition"
          :class="isRouteActive('/admin/media') ? 'bg-[#FAF8F5] text-[#00a884] font-semibold border border-[#E6DFD5]' : 'text-[#6B665F] hover:bg-[#FCFAF6] hover:text-[#1F1E1B]'"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Media Library
        </NuxtLink>
      </nav>

      <!-- Sidebar Footer -->
      <div class="p-4 border-t border-[#E6DFD5] space-y-2">
        <NuxtLink
          to="/"
          class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium text-[#6B665F] hover:bg-[#FCFAF6] hover:text-[#1F1E1B] transition"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Live Site
        </NuxtLink>

        <button
          @click="handleLogout"
          class="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition text-left"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>

    <!-- Main Workspace -->
    <div class="flex-1 flex flex-col overflow-y-auto">
      <!-- Top Navigation Bar -->
      <header class="h-16 bg-white border-b border-[#E6DFD5] flex items-center justify-between px-8 shrink-0">
        <div>
          <!-- Quick Status Breadcrumb -->
          <div class="flex items-center gap-2 text-xs text-[#6B665F]">
            <span>CMS Panel</span>
            <span>/</span>
            <span class="text-[#1F1E1B] font-medium">{{ routeName }}</span>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <!-- Connection Status Card -->
          <div
            class="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border"
            :class="isProductionReady ? 'bg-green-50 text-green-800 border-green-200' : (isMockMode ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-red-50 text-red-800 border-red-200')"
          >
            <span class="w-1.5 h-1.5 rounded-full" :class="isProductionReady ? 'bg-green-500' : (isMockMode ? 'bg-amber-500 animate-pulse' : 'bg-red-500 animate-pulse')"></span>
            {{ isProductionReady ? 'Supabase Production Verified' : (isMockMode ? 'Mock Local Dev Mode' : 'Supabase Needs Attention') }}
          </div>

          <!-- Logged in Admin Profile -->
          <div class="flex items-center gap-2 pl-2 border-l border-[#E6DFD5]">
            <div class="w-8 h-8 rounded-full bg-[#E6DFD5] text-[#4A4640] flex items-center justify-center font-display text-xs font-bold">
              {{ session?.email ? session.email.charAt(0).toUpperCase() : 'A' }}
            </div>
            <div class="hidden md:block text-left">
              <div class="text-xs font-semibold leading-none">{{ session?.email || 'admin@local.dev' }}</div>
              <div class="text-[10px] text-[#6B665F] mt-0.5 leading-none capitalize">{{ session?.role || 'Administrator' }}</div>
            </div>
          </div>
        </div>
      </header>

      <!-- Warning Header Banner if in Mock Mode -->
      <div v-if="isMockMode" class="bg-amber-50 border-b border-amber-200 px-8 py-3 text-xs text-amber-800 flex items-center justify-between">
        <div class="flex items-center gap-2 font-medium">
          <svg class="w-4 h-4 shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Mock Auth & CMS Active: Supabase environment variables are missing. All CRUD changes will be simulated and reset on refresh.</span>
        </div>
        <a href="/docs/supabase-phase3-plan.md" target="_blank" class="text-amber-900 underline font-semibold hover:text-amber-950 transition">
          View Setup Guide
        </a>
      </div>

      <!-- Scrollable Workspace Body -->
      <main class="flex-1 p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { useSupabaseCms } from '~/composables/useSupabaseCms'

const route = useRoute()
const { session, logout } = useAdminAuth()
const { isMockMode, isProductionReady, loadHealth } = useSupabaseCms()

onMounted(() => {
  loadHealth()
})

// Check if route matches target path helper
const isRouteActive = (path: string) => {
  if (path === '/admin') {
    return route.path === '/admin'
  }
  return route.path.startsWith(path)
}

// Compute active page title for dashboard breadcrumb
const routeName = computed(() => {
  if (route.path === '/admin') return 'Dashboard'
  if (route.path.startsWith('/admin/posts')) return 'Blog Posts Manager'
  if (route.path.startsWith('/admin/projects')) return 'Portfolio Projects Manager'
  if (route.path.startsWith('/admin/media')) return 'Media Library'
  return 'Admin Console'
})

const handleLogout = async () => {
  await logout()
}
</script>
