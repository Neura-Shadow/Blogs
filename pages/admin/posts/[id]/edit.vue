<template>
  <div class="space-y-6">
    <!-- Breadcrumb Header -->
    <div class="flex items-center gap-2 text-sm">
      <NuxtLink to="/admin/posts" class="text-[#00a884] hover:underline font-semibold">Blog Posts</NuxtLink>
      <span class="text-[#6B665F]">/</span>
      <span class="text-[#6B665F]">Edit Post</span>
    </div>

    <!-- Title Header -->
    <div>
      <h2 class="text-2xl font-display font-bold text-[#1F1E1B]">Edit Blog Post</h2>
      <p class="text-[#6B665F] text-sm mt-1">Modify the content or details of this post.</p>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="bg-white border border-[#E6DFD5] rounded-xl p-12 text-center text-[#6B665F]">
      <span class="inline-block w-6 h-6 border-2 border-[#00a884] border-t-transparent rounded-full animate-spin"></span>
      <p class="mt-2 text-sm">Loading post details...</p>
    </div>

    <!-- Reusable Editor -->
    <AdminPostEditor v-else-if="post" :post-data="post" />

    <div v-else class="bg-white border border-red-200 text-red-800 rounded-xl p-8 text-center font-medium">
      {{ lastError || 'Post could not be loaded or does not exist.' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSupabaseCms } from '~/composables/useSupabaseCms'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const route = useRoute()
const { getPost, lastError } = useSupabaseCms()

const post = ref<any>(null)
const isLoading = ref(true)

onMounted(async () => {
  const id = route.params.id as string
  if (id) {
    post.value = await getPost(id, { admin: true })
  }
  isLoading.value = false
})
</script>
