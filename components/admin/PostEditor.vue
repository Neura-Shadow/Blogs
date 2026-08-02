<template>
  <div class="space-y-8 bg-white border border-[#E6DFD5] rounded-xl p-8 shadow-xs">
    <!-- Header info banner -->
    <div v-if="isMockMode" class="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-800 space-y-1">
      <p class="font-bold flex items-center gap-1">
        <span class="inline-block w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
        Mock Mode Operations
      </p>
      <p>Saving will simulate API routes and verify credentials. Changes will not be persisted in the actual database.</p>
    </div>

    <!-- Edit Form -->
    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- 1. Bilingual Titles Group -->
      <div class="bg-[#FCFAF6] border border-[#E6DFD5] rounded-xl p-6 space-y-4">
        <h4 class="text-sm font-bold uppercase tracking-wider text-[#6B665F]">Bilingual Titles / 雙語標題</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Title English -->
          <div>
            <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="title_en">Title (English) *</label>
            <input
              id="title_en"
              v-model="form.title_en"
              type="text"
              required
              @input="generateSlug"
              class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
              placeholder="e.g. Scaling Microservices with Event Driven Architecture"
            />
          </div>

          <!-- Title Chinese -->
          <div>
            <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="title_zh">Title (Chinese)</label>
            <input
              id="title_zh"
              v-model="form.title_zh"
              type="text"
              class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
              placeholder="e.g. 基於事件驅動架構構建高可擴展微服務"
            />
          </div>
        </div>
      </div>

      <!-- 2. Technical Settings -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-[#E6DFD5]/80 rounded-xl p-6">
        <!-- Slug -->
        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="slug">Slug (URL identifier) *</label>
          <input
            id="slug"
            v-model="form.slug"
            type="text"
            required
            class="w-full px-4 py-2.5 bg-[#FCFAF6] border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] font-mono focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
            placeholder="scaling-microservices-event-driven"
          />
        </div>

        <!-- Cover URL -->
        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="cover_url">Cover Image URL</label>
          <input
            id="cover_url"
            v-model="form.cover_url"
            type="text"
            class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
            placeholder="e.g. /images/blog/coding.jpg"
          />
        </div>
      </div>

      <!-- 3. Category, Language & Status -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border border-[#E6DFD5]/80 rounded-xl p-6">
        <!-- Category -->
        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="category">Category</label>
          <input
            id="category"
            v-model="form.category"
            type="text"
            class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
            placeholder="e.g. AI / Cloud"
          />
        </div>

        <!-- Language -->
        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="language">Language Mode</label>
          <select
            id="language"
            v-model="form.language"
            class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
          >
            <option value="bilingual">Bilingual (雙語)</option>
            <option value="en">English Only</option>
            <option value="zh-TW">Chinese Only</option>
          </select>
        </div>

        <!-- Status -->
        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="status">Publish Status</label>
          <select
            id="status"
            v-model="form.status"
            class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
          >
            <option value="draft">Draft (草稿)</option>
            <option value="published">Published (發佈)</option>
          </select>
        </div>
      </div>

      <!-- 4. Bilingual Excerpts Group -->
      <div class="bg-[#FCFAF6] border border-[#E6DFD5] rounded-xl p-6 space-y-4">
        <h4 class="text-sm font-bold uppercase tracking-wider text-[#6B665F]">Bilingual Excerpts / 雙語摘要</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Excerpt English -->
          <div>
            <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="excerpt_en">Excerpt (English)</label>
            <textarea
              id="excerpt_en"
              v-model="form.excerpt_en"
              rows="3"
              class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
              placeholder="Short English summary of the post..."
            ></textarea>
          </div>

          <!-- Excerpt Chinese -->
          <div>
            <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="excerpt_zh">Excerpt (Chinese)</label>
            <textarea
              id="excerpt_zh"
              v-model="form.excerpt_zh"
              rows="3"
              class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
              placeholder="短篇中文摘要..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Tags Input -->
      <div class="bg-white border border-[#E6DFD5]/80 rounded-xl p-6">
        <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="tags">Tags (Comma-separated)</label>
        <input
          id="tags"
          v-model="tagsString"
          type="text"
          class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
          placeholder="e.g. Go, Microservices, Kubernetes"
        />
      </div>

      <!-- Content Editor Tabs -->
      <div class="space-y-4">
        <h3 class="text-lg font-bold text-[#1F1E1B] font-display">Post Body Content (Supports Markdown)</h3>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <!-- English Editor & Preview -->
          <div class="space-y-3 bg-white border border-[#E6DFD5] rounded-xl p-5">
            <div class="flex items-center justify-between border-b border-[#E6DFD5] pb-2">
              <span class="text-sm font-bold text-[#4A4640]">English Content / 英文內文</span>
              <div class="flex gap-2">
                <button
                  type="button"
                  @click="activeTabEn = 'edit'"
                  class="px-3 py-1 text-xs font-semibold rounded-md transition"
                  :class="activeTabEn === 'edit' ? 'bg-[#00a884] text-white' : 'text-[#6B665F] hover:bg-[#FCFAF6]'"
                >
                  Edit
                </button>
                <button
                  type="button"
                  @click="activeTabEn = 'preview'"
                  class="px-3 py-1 text-xs font-semibold rounded-md transition"
                  :class="activeTabEn === 'preview' ? 'bg-[#00a884] text-white' : 'text-[#6B665F] hover:bg-[#FCFAF6]'"
                >
                  Preview
                </button>
              </div>
            </div>

            <!-- Edit Textarea -->
            <div v-show="activeTabEn === 'edit'">
              <textarea
                id="content_en"
                v-model="form.content_en"
                rows="14"
                class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm font-mono text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
                placeholder="Write English blog content here..."
              ></textarea>
            </div>

            <!-- Live Preview -->
            <div
              v-show="activeTabEn === 'preview'"
              class="w-full min-h-[320px] max-h-[400px] overflow-y-auto p-4 bg-[#FCFAF6] border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] prose prose-sm max-w-none"
              v-html="renderMarkdown(form.content_en)"
            ></div>
          </div>

          <!-- Chinese Content Editor & Preview -->
          <div class="space-y-3 bg-white border border-[#E6DFD5] rounded-xl p-5">
            <div class="flex items-center justify-between border-b border-[#E6DFD5] pb-2">
              <span class="text-sm font-bold text-[#4A4640]">Chinese Content / 中文內文</span>
              <div class="flex gap-2">
                <button
                  type="button"
                  @click="activeTabZh = 'edit'"
                  class="px-3 py-1 text-xs font-semibold rounded-md transition"
                  :class="activeTabZh === 'edit' ? 'bg-[#00a884] text-white' : 'text-[#6B665F] hover:bg-[#FCFAF6]'"
                >
                  Edit
                </button>
                <button
                  type="button"
                  @click="activeTabZh = 'preview'"
                  class="px-3 py-1 text-xs font-semibold rounded-md transition"
                  :class="activeTabZh === 'preview' ? 'bg-[#00a884] text-white' : 'text-[#6B665F] hover:bg-[#FCFAF6]'"
                >
                  Preview
                </button>
              </div>
            </div>

            <!-- Edit Textarea -->
            <div v-show="activeTabZh === 'edit'">
              <textarea
                id="content_zh"
                v-model="form.content_zh"
                rows="14"
                class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm font-mono text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
                placeholder="在此輸入中文內容..."
              ></textarea>
            </div>

            <!-- Live Preview -->
            <div
              v-show="activeTabZh === 'preview'"
              class="w-full min-h-[320px] max-h-[400px] overflow-y-auto p-4 bg-[#FCFAF6] border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] prose prose-sm max-w-none"
              v-html="renderMarkdown(form.content_zh)"
            ></div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#E6DFD5]">
        <!-- Mock Mode inline warning -->
        <div v-if="isMockMode" class="text-xs text-amber-800 font-medium flex items-center gap-1.5 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
          <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span>Mock Mode: Changes are simulated in memory and NOT persisted in the cloud database.</span>
        </div>
        <div v-else class="text-xs text-green-800 font-medium flex items-center gap-1.5 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
          <span class="w-2 h-2 rounded-full bg-green-500"></span>
          <span>Supabase Online: Saving will persist directly to production posts table.</span>
        </div>

        <div class="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            @click="navigateTo('/admin/posts')"
            class="w-full sm:w-auto px-5 py-2.5 border border-[#E6DFD5] bg-white hover:bg-[#FAF8F5] active:bg-[#F4EFE6] rounded-lg text-sm text-[#1F1E1B] font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#00a884]/20"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isSaving"
            class="w-full sm:w-auto px-5 py-2.5 bg-[#00a884] hover:bg-[#008f6f] active:bg-[#007a5f] text-white rounded-lg text-sm font-semibold transition shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00a884]/20"
          >
            <span v-if="isSaving" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            {{ isSaving ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { hasPublicationWordingViolation, publicationWordingGuidance } from '~/utils/publicationWording'
import { ref, reactive, watch, onMounted } from 'vue'
import { useSupabaseCms } from '~/composables/useSupabaseCms'
import { useAdminAuth } from '~/composables/useAdminAuth'

const props = defineProps({
  postData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save'])

const { isMockMode } = useSupabaseCms()
const { getAuthHeaders } = useAdminAuth()

const isSaving = ref(false)
const tagsString = ref('')
const activeTabEn = ref<'edit' | 'preview'>('edit')
const activeTabZh = ref<'edit' | 'preview'>('edit')

const form = reactive({
  slug: '',
  title_en: '',
  title_zh: '',
  excerpt_en: '',
  excerpt_zh: '',
  content_en: '',
  content_zh: '',
  cover_url: '',
  category: '',
  tags: [] as string[],
  status: 'draft',
  language: 'bilingual'
})

// Auto-fill form values on update
const populateForm = () => {
  if (props.postData) {
    form.slug = props.postData.slug || ''
    form.title_en = props.postData.title_en || ''
    form.title_zh = props.postData.title_zh || ''
    form.excerpt_en = props.postData.excerpt_en || ''
    form.excerpt_zh = props.postData.excerpt_zh || ''
    form.content_en = props.postData.content_en || ''
    form.content_zh = props.postData.content_zh || ''
    form.cover_url = props.postData.cover_url || ''
    form.category = props.postData.category || ''
    form.tags = props.postData.tags || []
    form.status = props.postData.status || 'draft'
    form.language = props.postData.language || 'bilingual'
    tagsString.value = form.tags.join(', ')
  }
}

onMounted(() => {
  populateForm()
})

watch(() => props.postData, () => {
  populateForm()
}, { deep: true })

// Auto-generate URL slugs from Title (en)
const generateSlug = () => {
  if (!props.postData) { // Only auto-generate slug for new posts
    form.slug = form.title_en
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
}

// Convert Tags string into array before submit
watch(tagsString, (newVal) => {
  form.tags = newVal
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
})

// Custom regex markdown parser for live previews
const renderMarkdown = (md: string) => {
  if (!md) return '<p class="text-[#6B665F] italic">No content written yet.</p>'

  // Wording guard check for preview safety
  if (hasPublicationWordingViolation(md)) {
    return `<div class="p-3 bg-red-50 text-red-800 border border-red-200 rounded text-xs"><strong>[IEEE TMM Wording Policy Violation]:</strong> ${publicationWordingGuidance}</div>`
  }

  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/^### (.*$)/gim, '<h3 class="text-base font-bold mt-4 mb-2 font-display text-[#1F1E1B]">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold mt-6 mb-3 font-display text-[#1F1E1B] border-b border-[#E6DFD5] pb-1">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold mt-8 mb-4 font-display text-[#1F1E1B]">$1</h1>')
    .replace(/^\> \[!NOTE\]\s*\n\>\s*(.*$)/gim, '<div class="my-4 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-800 rounded-r text-xs">$1</div>')
    .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-[#E6DFD5] pl-4 my-4 italic text-[#6B665F]">$1</blockquote>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-[#FCFAF6] border border-[#E6DFD5] px-1.5 py-0.5 rounded font-mono text-xs text-red-600">$1</code>')
    .replace(/\n/g, '<br />')

  return `<div>${html}</div>`
}

const handleSubmit = async () => {
  // Front-end security check: wording guard check
  if (hasPublicationWordingViolation(form.title_en) || hasPublicationWordingViolation(form.title_zh) ||
      hasPublicationWordingViolation(form.content_en) || hasPublicationWordingViolation(form.content_zh)) {
    alert(`[Wording Security Block]: ${publicationWordingGuidance}`)
    return
  }

  isSaving.value = true
  try {
    const method = props.postData ? 'PATCH' : 'POST'
    const url = props.postData ? `/api/posts/${props.postData.id}` : '/api/posts'

    const res: any = await $fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: form
    })

    if (res.success) {
      if (res.warning) {
        alert(`${res.warning}\n\nLocal changes updated successfully!`)
      } else {
        alert('Post saved successfully!')
      }
      navigateTo('/admin/posts')
    }
  } catch (err: any) {
    alert(`Failed to save: ${err.statusMessage || err.message}`)
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
/* Scoped overrides to customize paragraph lines */
textarea {
  line-height: 1.6;
}
</style>
