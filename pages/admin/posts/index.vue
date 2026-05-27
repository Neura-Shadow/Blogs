<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-display font-bold text-[#1F1E1B]">Blog Posts</h2>
        <p class="text-[#6B665F] text-sm mt-1">Create, edit, and publish your articles.</p>
      </div>
      <NuxtLink
        to="/admin/posts/new"
        class="px-4 py-2 bg-[#00a884] hover:bg-[#008f6f] text-white font-medium text-sm rounded-lg transition shadow-sm flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        New Post
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
        <p class="mt-2 text-sm">Loading posts...</p>
      </div>
      <div v-else-if="posts.length === 0" class="p-12 text-center">
        <svg class="w-12 h-12 text-[#B5AFA6] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <h3 class="text-lg font-bold text-[#1F1E1B]">No posts found</h3>
        <p class="text-[#6B665F] text-sm mt-1 mb-4">Get started by writing your first article.</p>
        <NuxtLink
          to="/admin/posts/new"
          class="px-4 py-2 bg-[#00a884] hover:bg-[#008f6f] text-white font-medium text-sm rounded-lg transition inline-flex items-center gap-2"
        >
          Create New Post
        </NuxtLink>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#FCFAF6] border-b border-[#E6DFD5] text-xs uppercase tracking-wider font-bold text-[#6B665F]">
              <th class="px-6 py-4">Title</th>
              <th class="px-6 py-4">Slug</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4">Language</th>
              <th class="px-6 py-4">Updated At</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#E6DFD5]/50 text-sm">
            <tr v-for="post in posts" :key="post.id" class="hover:bg-[#FCFAF6]/50 transition">
              <!-- Title -->
              <td class="px-6 py-4 font-medium text-[#1F1E1B]">
                <div>{{ post.title_en }}</div>
                <div class="text-xs text-[#6B665F] mt-0.5">{{ post.title_zh || '無中文標題' }}</div>
              </td>
              <!-- Slug -->
              <td class="px-6 py-4 font-mono text-xs text-[#6B665F]">
                {{ post.slug }}
              </td>
              <!-- Status Badge -->
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                  :class="post.status === 'published' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-600 border border-gray-200'"
                >
                  <span class="w-1.5 h-1.5 rounded-full" :class="post.status === 'published' ? 'bg-green-500' : 'bg-gray-400'"></span>
                  {{ post.status === 'published' ? 'Published' : 'Draft' }}
                </span>
              </td>
              <!-- Language Badge -->
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase"
                  :class="getLanguageBadgeClass(post.language)"
                >
                  {{ post.language }}
                </span>
              </td>
              <!-- Updated At -->
              <td class="px-6 py-4 text-[#6B665F] text-xs">
                {{ formatDate(post.updated_at) }}
              </td>
              <!-- Actions -->
              <td class="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                <NuxtLink
                  :to="`/blog/${post.slug}`"
                  target="_blank"
                  class="inline-flex items-center justify-center p-2 text-[#00a884] hover:bg-[#FAF8F5] rounded-lg transition"
                  title="View Live Page"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </NuxtLink>
                <NuxtLink
                  :to="`/admin/posts/${post.id}/edit`"
                  class="inline-flex items-center justify-center p-2 text-[#1F1E1B] hover:bg-[#FAF8F5] rounded-lg transition border border-transparent hover:border-[#E6DFD5]"
                  title="Edit Post"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </NuxtLink>
                <button
                  @click="confirmDelete(post)"
                  class="inline-flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Delete Post"
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

const { getPosts, isMockMode, lastError } = useSupabaseCms()
const { getAuthHeaders } = useAdminAuth()

const posts = ref<any[]>([])
const isLoading = ref(true)
const successMsg = ref('')

const fetchPosts = async () => {
  isLoading.value = true
  posts.value = await getPosts({ admin: true })
  isLoading.value = false
}

onMounted(() => {
  fetchPosts()
})

const getLanguageBadgeClass = (lang: string) => {
  if (lang === 'en') return 'bg-blue-50 text-blue-700 border border-blue-200'
  if (lang === 'zh-TW') return 'bg-purple-50 text-purple-700 border border-purple-200'
  return 'bg-teal-50 text-teal-700 border border-teal-200'
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const confirmDelete = async (post: any) => {
  if (!confirm(`Are you sure you want to delete the post: "${post.title_en}"?`)) {
    return
  }

  try {
    const res: any = await $fetch(`/api/posts/${post.id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })

    if (res.success) {
      successMsg.value = res.warning
        ? `${res.message} (${res.warning})`
        : `Post "${post.title_en}" deleted successfully.`

      // Remove from list reactively
      posts.value = posts.value.filter(p => p.id !== post.id)
    }
  } catch (err: any) {
    alert(`Delete failed: ${err.statusMessage || err.message}`)
  }
}
</script>
