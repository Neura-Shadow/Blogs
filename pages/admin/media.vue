<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-display font-bold text-[#1F1E1B]">Media Library</h2>
      <p class="text-[#6B665F] text-sm mt-1">Manage cover assets, diagrams, and project figures.</p>
    </div>

    <!-- Upload panel -->
    <div class="bg-white border border-[#E6DFD5] rounded-xl p-8 shadow-xs space-y-6">
      <div class="flex items-center gap-3" :class="isMockMode ? 'text-amber-800' : 'text-green-800'">
        <svg class="w-6 h-6 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div>
          <h3 class="font-bold text-lg">{{ isMockMode ? 'Media Upload Disabled in Mock Mode' : 'Supabase Storage Upload' }}</h3>
          <p class="text-xs text-[#6B665F] mt-0.5">Buckets: <code class="bg-[#FCFAF6] border border-[#E6DFD5] px-1 rounded font-mono text-[#1F1E1B]">blog-covers</code>, <code class="bg-[#FCFAF6] border border-[#E6DFD5] px-1 rounded font-mono text-[#1F1E1B]">project-covers</code>, <code class="bg-[#FCFAF6] border border-[#E6DFD5] px-1 rounded font-mono text-[#1F1E1B]">resume</code>, <code class="bg-[#FCFAF6] border border-[#E6DFD5] px-1 rounded font-mono text-[#1F1E1B]">gallery</code></p>
        </div>
      </div>
      <p class="text-sm text-[#6B665F] leading-relaxed">
        {{ isMockMode
          ? 'Currently running in Mock Mode. Live file upload to Supabase Storage requires database keys and bucket creation.'
          : 'Upload images or resume PDFs to the configured Supabase Storage bucket. The public URL is saved to media_assets.' }}
      </p>

      <div v-if="uploadMessage" class="text-sm px-4 py-3 rounded-lg border" :class="uploadSuccess ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'">
        {{ uploadMessage }}
        <a v-if="uploadedUrl" :href="uploadedUrl" target="_blank" class="ml-2 underline font-semibold">Open file</a>
      </div>

      <form class="grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="handleUpload">
        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="bucket">Bucket</label>
          <select id="bucket" v-model="bucket" class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm">
            <option value="blog-covers">blog-covers</option>
            <option value="project-covers">project-covers</option>
            <option value="gallery">gallery</option>
            <option value="resume">resume</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="file">File</label>
          <input id="file" ref="fileInput" type="file" :accept="bucket === 'resume' ? 'application/pdf' : 'image/*'" class="w-full px-4 py-2 bg-white border border-[#E6DFD5] rounded-lg text-sm" />
        </div>
        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="alt_en">Alt Text (English)</label>
          <input id="alt_en" v-model="altEn" type="text" class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm" />
        </div>
        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="alt_zh">Alt Text (Chinese)</label>
          <input id="alt_zh" v-model="altZh" type="text" class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm" />
        </div>
        <div class="md:col-span-2 flex justify-end">
          <button type="submit" :disabled="isMockMode || isUploading" class="px-5 py-2.5 bg-[#00a884] hover:bg-[#008f6f] text-white rounded-lg text-sm font-semibold disabled:opacity-50">
            {{ isUploading ? 'Uploading...' : 'Upload File' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Local Media Assets list -->
    <div class="space-y-4">
      <h3 class="text-lg font-display font-bold text-[#1F1E1B]">Local Image Assets Gallery</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <!-- Loop over sample images we copied from legacy -->
        <div v-for="img in localImages" :key="img.path" class="bg-white border border-[#E6DFD5] rounded-xl overflow-hidden shadow-xs hover:shadow-sm transition group">
          <div class="h-32 bg-[#FAF8F5] relative overflow-hidden flex items-center justify-center border-b border-[#E6DFD5]">
            <img :src="img.path" :alt="img.name" class="max-h-full max-w-full object-cover group-hover:scale-105 transition duration-300" />
            <div class="absolute top-2 left-2 bg-[#FCFAF6] border border-[#E6DFD5] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded text-[#6B665F]">
              {{ img.type }}
            </div>
          </div>
          <div class="p-3 text-xs space-y-1">
            <div class="font-bold text-[#1F1E1B] truncate" :title="img.name">{{ img.name }}</div>
            <div class="text-[#6B665F] font-mono select-all truncate" :title="img.path">{{ img.path }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { useSupabaseCms } from '~/composables/useSupabaseCms'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})

const { getAuthHeaders } = useAdminAuth()
const { isMockMode, loadHealth } = useSupabaseCms()

const bucket = ref('gallery')
const altEn = ref('')
const altZh = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const isUploading = ref(false)
const uploadMessage = ref('')
const uploadSuccess = ref(false)
const uploadedUrl = ref('')

onMounted(() => {
  loadHealth()
})

const handleUpload = async () => {
  uploadMessage.value = ''
  uploadedUrl.value = ''
  uploadSuccess.value = false

  const file = fileInput.value?.files?.[0]
  if (!file) {
    uploadMessage.value = 'Please choose a file before uploading.'
    return
  }

  const formData = new FormData()
  formData.append('bucket', bucket.value)
  formData.append('alt_en', altEn.value)
  formData.append('alt_zh', altZh.value)
  formData.append('file', file)

  isUploading.value = true
  try {
    const res: any = await $fetch('/api/media/upload', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData
    })
    uploadSuccess.value = !!res.success
    uploadedUrl.value = res.public_url || ''
    uploadMessage.value = res.success ? 'Upload complete.' : (res.message || res.warning || 'Upload did not complete.')
  } catch (err: any) {
    uploadMessage.value = err.statusMessage || err.message || 'Upload failed.'
  } finally {
    isUploading.value = false
  }
}

// Showcase the images that will be copied from legacy folders into public
const localImages = ref([
  { name: 'algo.jpg', path: '/images/blog/algo.jpg', type: 'Blog Cover' },
  { name: 'coding.jpg', path: '/images/blog/coding.jpg', type: 'Blog Cover' },
  { name: 'life.jpg', path: '/images/blog/life.jpg', type: 'Blog Cover' },
  { name: 'anime.jpg', path: '/images/blog/anime.jpg', type: 'Blog Cover' },
  { name: 'chatgpt.jpg', path: '/images/blog/chatgpt.jpg', type: 'Blog Cover' },
  { name: 'code.jpg', path: '/images/blog/code.jpg', type: 'Blog Cover' },
  { name: 'placeholder.png', path: '/images/placeholders/placeholder.jpg', type: 'Placeholder' }
])
</script>
