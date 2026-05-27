<template>
  <div class="space-y-8">
    <!-- Welcome Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-display font-bold tracking-tight text-[#1F1E1B]">CMS Dashboard</h2>
        <p class="text-[#6B665F] mt-1 text-base">Overview of your engineering portfolio, CMS content, and backend status.</p>
      </div>
      <div class="flex items-center gap-3">
        <NuxtLink
          to="/admin/posts/new"
          class="px-4 py-2 bg-[#00a884] hover:bg-[#008f6f] text-white font-medium text-sm rounded-lg transition shadow-sm flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          New Post
        </NuxtLink>
        <NuxtLink
          to="/admin/projects/new"
          class="px-4 py-2 bg-white border border-[#E6DFD5] hover:bg-[#FAF8F5] text-[#1F1E1B] font-medium text-sm rounded-lg transition shadow-sm flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
          </svg>
          New Project
        </NuxtLink>
      </div>
    </div>

    <!-- Quick Stats Grid -->
    <div v-if="lastError" class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
      {{ lastError }}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Posts Stat -->
      <div class="bg-white border border-[#E6DFD5] rounded-xl p-6 shadow-xs flex items-center gap-4">
        <div class="p-3 bg-[#FCFAF6] border border-[#E6DFD5] rounded-lg text-[#00a884]">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 4a2 2 0 012 2v8a2 2 0 01-2 2h-3m-6 0a1 1 0 001-1V7a1 1 0 00-1-1 1 1 0 00-1 1v12a1 1 0 001 1z" />
          </svg>
        </div>
        <div>
          <div class="text-[#6B665F] text-xs uppercase tracking-wider font-semibold">Total Blog Posts</div>
          <div class="text-3xl font-display font-bold mt-1 text-[#1F1E1B]">{{ posts.length }}</div>
        </div>
      </div>

      <!-- Projects Stat -->
      <div class="bg-white border border-[#E6DFD5] rounded-xl p-6 shadow-xs flex items-center gap-4">
        <div class="p-3 bg-[#FCFAF6] border border-[#E6DFD5] rounded-lg text-[#00a884]">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
          </svg>
        </div>
        <div>
          <div class="text-[#6B665F] text-xs uppercase tracking-wider font-semibold">Showcase Projects</div>
          <div class="text-3xl font-display font-bold mt-1 text-[#1F1E1B]">{{ projects.length }}</div>
        </div>
      </div>

      <!-- Media Stat -->
      <div class="bg-white border border-[#E6DFD5] rounded-xl p-6 shadow-xs flex items-center gap-4">
        <div class="p-3 bg-[#FCFAF6] border border-[#E6DFD5] rounded-lg text-[#00a884]">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <div class="text-[#6B665F] text-xs uppercase tracking-wider font-semibold">Media Folders</div>
          <div class="text-3xl font-display font-bold mt-1 text-[#1F1E1B]">3</div>
        </div>
      </div>
    </div>

    <!-- DB Connection Card -->
    <div class="bg-white border border-[#E6DFD5] rounded-xl p-8 shadow-xs space-y-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="space-y-1">
          <h3 class="text-xl font-display font-bold text-[#1F1E1B]">Database Backend Integration</h3>
          <p class="text-sm text-[#6B665F]">Your live database connection status and server runtime information.</p>
        </div>
        <div
          class="px-4 py-2 rounded-lg text-sm font-semibold border flex items-center gap-2 w-fit self-start md:self-auto"
          :class="isProductionReady ? 'bg-green-50 text-green-800 border-green-200' : (isMockMode ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-red-50 text-red-800 border-red-200')"
        >
          <span class="w-2.5 h-2.5 rounded-full" :class="isProductionReady ? 'bg-green-500' : (isMockMode ? 'bg-amber-500 animate-pulse' : 'bg-red-500 animate-pulse')"></span>
          {{ isProductionReady ? 'SUPABASE PRODUCTION VERIFIED' : (isMockMode ? 'MOCK LOCAL DEV FALLBACK' : 'SUPABASE NEEDS ATTENTION') }}
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FCFAF6] border border-[#E6DFD5] rounded-lg p-6">
        <div class="space-y-4">
          <h4 class="text-xs uppercase tracking-wider font-bold text-[#6B665F]">Integration Configuration</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between border-b border-[#E6DFD5]/50 pb-2">
              <span class="text-[#6B665F]">Nuxt App Environment:</span>
              <span class="font-mono font-medium text-[#1F1E1B]">{{ devEnvironment }}</span>
            </div>
            <div class="flex justify-between border-b border-[#E6DFD5]/50 pb-2">
              <span class="text-[#6B665F]">Supabase URL Bind:</span>
              <span class="font-mono font-medium text-[#1F1E1B]">{{ supabaseUrlLabel }}</span>
            </div>
            <div class="flex justify-between pb-2">
              <span class="text-[#6B665F]">Supabase CRUD Status:</span>
              <span class="font-semibold text-xs py-0.5 px-2 rounded" :class="isProductionReady ? 'bg-green-100 text-green-800' : (isMockMode ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800')">
                {{ isProductionReady ? 'Connected' : (isMockMode ? 'Mock Mode' : 'Permission / Auth Issue') }}
              </span>
            </div>
            <div v-if="health?.database?.error || !health?.auth?.adminAllowlistConfigured" class="text-xs text-red-700 bg-red-50 border border-red-200 rounded p-2">
              {{ health?.database?.error || 'NUXT_ADMIN_EMAILS is missing. Production admin authorization is not ready.' }}
            </div>
          </div>
        </div>

        <div class="space-y-3 flex flex-col justify-between">
          <div>
            <h4 class="text-xs uppercase tracking-wider font-bold text-[#6B665F] mb-2">Phase 3 Deployment Plan</h4>
            <p class="text-xs text-[#6B665F] leading-relaxed">
              When ready to migrate to production: publish the database tables using the schema migration sql inside
              <code class="bg-white border border-[#E6DFD5] px-1 rounded font-mono text-[#1F1E1B]">supabase/migrations/001_create_cms_schema.sql</code>
              and supply the database keys inside your server hosting panel.
            </p>
          </div>
          <NuxtLink
            to="/docs/supabase-phase3-plan.md"
            target="_blank"
            class="text-xs text-[#00a884] font-semibold hover:underline flex items-center gap-1 transition"
          >
            Read Migration Architecture Guide &rarr;
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useSupabaseCms } from '~/composables/useSupabaseCms'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const { health, isMockMode, isProductionReady, lastError, loadHealth, getPosts, getProjects } = useSupabaseCms()

const posts = ref<any[]>([])
const projects = ref<any[]>([])
const devEnvironment = ref('Development')

const supabaseUrlLabel = computed(() => {
  const config = useRuntimeConfig()
  return config.public.supabaseUrl ? config.public.supabaseUrl : 'MISSING (USING MOCK DATA)'
})

onMounted(async () => {
  devEnvironment.value = process.dev ? 'Local Dev' : 'Production Build'
  await loadHealth()
  posts.value = await getPosts({ admin: true })
  projects.value = await getProjects({ admin: true })
})
</script>
