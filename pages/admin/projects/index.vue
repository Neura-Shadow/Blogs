<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-display font-bold text-[#1F1E1B]">Showcase Projects</h2>
        <p class="text-[#6B665F] text-sm mt-1">Manage and sort your research, engineering, and UAV projects.</p>
      </div>
      <NuxtLink
        to="/admin/projects/new"
        class="px-4 py-2 bg-[#00a884] hover:bg-[#008f6f] text-white font-medium text-sm rounded-lg transition shadow-sm flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        New Project
      </NuxtLink>
    </div>

    <!-- Alert for deletions/saves -->
    <div v-if="lastError" class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm flex justify-between items-center">
      <span>{{ lastError }}</span>
      <button @click="lastError = ''" class="text-red-600 hover:text-red-800 font-bold">&times;</button>
    </div>

    <div v-if="successMsg" class="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm flex justify-between items-center">
      <span>{{ successMsg }}</span>
      <button @click="successMsg = ''" class="text-green-600 hover:text-green-800 font-bold">&times;</button>
    </div>

    <!-- Table Container -->
    <div class="bg-white border border-[#E6DFD5] rounded-xl overflow-hidden shadow-xs">
      <div v-if="isLoading" class="p-8 text-center text-[#6B665F]">
        <span class="inline-block w-6 h-6 border-2 border-[#00a884] border-t-transparent rounded-full animate-spin"></span>
        <p class="mt-2 text-sm">Loading projects...</p>
      </div>
      <div v-else-if="projects.length === 0" class="p-12 text-center">
        <svg class="w-12 h-12 text-[#B5AFA6] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
        </svg>
        <h3 class="text-lg font-bold text-[#1F1E1B]">No projects found</h3>
        <p class="text-[#6B665F] text-sm mt-1 mb-4">Get started by creating your first showcase project.</p>
        <NuxtLink
          to="/admin/projects/new"
          class="px-4 py-2 bg-[#00a884] hover:bg-[#008f6f] text-white font-medium text-sm rounded-lg transition inline-flex items-center gap-2"
        >
          Create New Project
        </NuxtLink>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#FCFAF6] border-b border-[#E6DFD5] text-xs uppercase tracking-wider font-bold text-[#6B665F]">
              <th class="px-6 py-4">Title</th>
              <th class="px-6 py-4">Category</th>
              <th class="px-6 py-4">Featured</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4">Repo URL</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#E6DFD5]/50 text-sm">
            <tr v-for="proj in projects" :key="proj.id" class="hover:bg-[#FCFAF6]/50 transition">
              <!-- Title -->
              <td class="px-6 py-4 font-medium text-[#1F1E1B]">
                <div>{{ proj.title_en }}</div>
                <div class="text-xs text-[#6B665F] mt-0.5">{{ proj.title_zh || '無中文名稱' }}</div>
              </td>
              <!-- Category -->
              <td class="px-6 py-4 text-[#6B665F] font-semibold text-xs">
                {{ proj.category }}
              </td>
              <!-- Featured -->
              <td class="px-6 py-4">
                <span
                  v-if="proj.featured"
                  class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200"
                >
                  ★ Featured
                </span>
                <span v-else class="text-[#B5AFA6] text-xs">Standard</span>
              </td>
              <!-- Status -->
              <td class="px-6 py-4 text-xs">
                <div>{{ proj.status_en }}</div>
                <div class="text-slate-400 text-[10px]">{{ proj.status_zh }}</div>
              </td>
              <!-- Repo URL -->
              <td class="px-6 py-4 font-mono text-xs text-[#6B665F]">
                <a
                  v-if="proj.repo_url"
                  :href="proj.repo_url"
                  target="_blank"
                  class="text-[#00a884] hover:underline"
                >
                  GitHub Link
                </a>
                <span v-else class="text-gray-400 italic">None</span>
              </td>
              <!-- Actions -->
              <td class="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                <NuxtLink
                  :to="`/projects/${proj.slug}`"
                  target="_blank"
                  class="inline-flex items-center justify-center p-2 text-[#00a884] hover:bg-[#FAF8F5] rounded-lg transition"
                  title="View Live Page"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </NuxtLink>
                <NuxtLink
                  :to="`/admin/projects/${proj.id}/edit`"
                  class="inline-flex items-center justify-center p-2 text-[#1F1E1B] hover:bg-[#FAF8F5] rounded-lg transition border border-transparent hover:border-[#E6DFD5]"
                  title="Edit Project"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </NuxtLink>
                <button
                  @click="confirmDelete(proj)"
                  class="inline-flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Delete Project"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSupabaseCms } from '~/composables/useSupabaseCms'
import { useAdminAuth } from '~/composables/useAdminAuth'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const { getProjects, lastError } = useSupabaseCms()
const { getAuthHeaders } = useAdminAuth()

const projects = ref<any[]>([])
const isLoading = ref(true)
const successMsg = ref('')

const fetchProjects = async () => {
  isLoading.value = true
  projects.value = await getProjects({ admin: true })
  isLoading.value = false
}

onMounted(() => {
  fetchProjects()
})

const confirmDelete = async (proj: any) => {
  if (!confirm(`Are you sure you want to delete the project: "${proj.title_en}"?`)) {
    return
  }

  try {
    const res: any = await $fetch(`/api/projects/${proj.id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })

    if (res.success) {
      successMsg.value = res.warning
        ? `${res.message} (${res.warning})`
        : `Project "${proj.title_en}" deleted successfully.`

      // Remove from list reactively
      projects.value = projects.value.filter(p => p.id !== proj.id)
    }
  } catch (err: any) {
    alert(`Delete failed: ${err.statusMessage || err.message}`)
  }
}
</script>
