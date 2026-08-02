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
          <div>
            <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="title_en">Project Title (English) *</label>
            <input
              id="title_en"
              v-model="form.title_en"
              type="text"
              required
              @input="generateSlug"
              class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
              placeholder="e.g. UAV Swarm Navigation"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="title_zh">Project Title (Chinese)</label>
            <input
              id="title_zh"
              v-model="form.title_zh"
              type="text"
              class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
              placeholder="e.g. 無人機群組自主尋路"
            />
          </div>
        </div>
      </div>

      <!-- 2. Bilingual Subtitles Group -->
      <div class="bg-[#FCFAF6] border border-[#E6DFD5] rounded-xl p-6 space-y-4">
        <h4 class="text-sm font-bold uppercase tracking-wider text-[#6B665F]">Bilingual Subtitles / 雙語副標題</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="subtitle_en">Subtitle (English)</label>
            <input
              id="subtitle_en"
              v-model="form.subtitle_en"
              type="text"
              class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
              placeholder="e.g. Autonomous flight in sparse reward environments"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="subtitle_zh">Subtitle (Chinese)</label>
            <input
              id="subtitle_zh"
              v-model="form.subtitle_zh"
              type="text"
              class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
              placeholder="e.g. 基於深度強化學習的航向導航研究"
            />
          </div>
        </div>
      </div>

      <!-- 3. Technical Paths & Cover -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-[#E6DFD5]/80 rounded-xl p-6">
        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="slug">Slug (URL path) *</label>
          <input
            id="slug"
            v-model="form.slug"
            type="text"
            required
            class="w-full px-4 py-2.5 bg-[#FCFAF6] border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] font-mono focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
            placeholder="uav-swarm-navigation"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="cover_url">Cover Image URL</label>
          <input
            id="cover_url"
            v-model="form.cover_url"
            type="text"
            class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
            placeholder="/images/projects/heterogeneous-uav-swarm-system.jpg"
          />
        </div>
      </div>

      <!-- 4. Categories & Metadata Roles -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border border-[#E6DFD5]/80 rounded-xl p-6">
        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="category">Category</label>
          <input
            id="category"
            v-model="form.category"
            type="text"
            class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
            placeholder="e.g. UAV Systems, AI Research"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="role_en">Role (English)</label>
          <input
            id="role_en"
            v-model="form.role_en"
            type="text"
            class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
            placeholder="e.g. Lead Developer"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="role_zh">Role (Chinese)</label>
          <input
            id="role_zh"
            v-model="form.role_zh"
            type="text"
            class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
            placeholder="e.g. 主要開發者"
          />
        </div>
      </div>

      <!-- 5. Status Metadata -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-[#E6DFD5]/80 rounded-xl p-6">
        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="status_en">Project Status (English)</label>
          <input
            id="status_en"
            v-model="form.status_en"
            type="text"
            class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
            placeholder="e.g. Completed / Research Code"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="status_zh">Project Status (Chinese)</label>
          <input
            id="status_zh"
            v-model="form.status_zh"
            type="text"
            class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
            placeholder="e.g. 已完成 / 學術研究代碼"
          />
        </div>
      </div>

      <!-- 6. Links Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border border-[#E6DFD5]/80 rounded-xl p-6">
        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="repo_url">GitHub Repository Link</label>
          <input
            id="repo_url"
            v-model="form.repo_url"
            type="text"
            class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
            placeholder="https://github.com/..."
          />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="demo_url">Live Demonstration Link</label>
          <input
            id="demo_url"
            v-model="form.demo_url"
            type="text"
            class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
            placeholder="https://demo..."
          />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="paper_url">Research Paper Link</label>
          <input
            id="paper_url"
            v-model="form.paper_url"
            type="text"
            class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
            placeholder="https://arxiv.org/..."
          />
        </div>
      </div>

      <!-- 7. Tags & Stack Lists -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-[#E6DFD5]/80 rounded-xl p-6">
        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="tags">Tags (Comma-separated)</label>
          <input
            id="tags"
            v-model="tagsStr"
            type="text"
            class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
            placeholder="e.g. Python, ROS, PX4"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="stack">Tech Stack (Comma-separated)</label>
          <input
            id="stack"
            v-model="stackStr"
            type="text"
            class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
            placeholder="e.g. Python, PyTorch, Gazebo"
          />
        </div>
      </div>

      <!-- 8. Sorting & Featured Flag -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FCFAF6] border border-[#E6DFD5] rounded-lg p-6">
        <div>
          <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="sort_order">Sort Order (Integer)</label>
          <input
            id="sort_order"
            v-model.number="form.sort_order"
            type="number"
            class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
            placeholder="0"
          />
        </div>

        <div class="flex items-center pt-8">
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="form.featured" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00a884]"></div>
            <span class="ml-3 text-sm font-semibold text-[#4A4640]">Promote to Featured Projects Grid</span>
          </label>
        </div>
      </div>

      <!-- 9. Bilingual Card Descriptions -->
      <div class="bg-[#FCFAF6] border border-[#E6DFD5] rounded-xl p-6 space-y-4">
        <h4 class="text-sm font-bold uppercase tracking-wider text-[#6B665F]">Bilingual Brief Descriptions / 雙語簡短介紹</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="description_en">Brief Description (English)</label>
            <textarea
              id="description_en"
              v-model="form.description_en"
              rows="3"
              class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
              placeholder="Short card summary description in English..."
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="description_zh">Brief Description (Chinese)</label>
            <textarea
              id="description_zh"
              v-model="form.description_zh"
              rows="3"
              class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
              placeholder="短篇中文簡介..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- 10. Bilingual Long Descriptions -->
      <div class="bg-[#FCFAF6] border border-[#E6DFD5] rounded-xl p-6 space-y-4">
        <h4 class="text-sm font-bold uppercase tracking-wider text-[#6B665F]">Bilingual Detailed Descriptions / 雙語詳細介紹</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="long_description_en">Long Description (English)</label>
            <textarea
              id="long_description_en"
              v-model="form.long_description_en"
              rows="6"
              class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
              placeholder="Full detail project description in English..."
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-semibold mb-2 text-[#4A4640]" for="long_description_zh">Long Description (Chinese)</label>
            <textarea
              id="long_description_zh"
              v-model="form.long_description_zh"
              rows="6"
              class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
              placeholder="詳細中文專案內容..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- 11. Bullets List Grid: Highlights, Challenges, Results -->
      <div class="space-y-6 bg-white border border-[#E6DFD5] rounded-xl p-6">
        <h3 class="text-base font-bold text-[#1F1E1B] font-display border-b border-[#E6DFD5] pb-2">Bilingual Bullet Lists (One bullet per line)</h3>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Highlights -->
          <div class="space-y-3 bg-[#FCFAF6] p-4 border border-[#E6DFD5] rounded-lg">
            <h4 class="text-xs font-bold uppercase tracking-wider text-[#6B665F]">Project Highlights / 專案亮點</h4>
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-xs font-semibold mb-2 text-[#4A4640]" for="highlights_en">Highlights (English)</label>
                <textarea
                  id="highlights_en"
                  v-model="highlightsEnText"
                  rows="4"
                  class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
                  placeholder="Highlight 1&#10;Highlight 2"
                ></textarea>
              </div>
              <div>
                <label class="block text-xs font-semibold mb-2 text-[#4A4640]" for="highlights_zh">Highlights (Chinese)</label>
                <textarea
                  id="highlights_zh"
                  v-model="highlightsZhText"
                  rows="4"
                  class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
                  placeholder="特點與亮點 1&#10;特點與亮點 2"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Challenges -->
          <div class="space-y-3 bg-[#FCFAF6] p-4 border border-[#E6DFD5] rounded-lg">
            <h4 class="text-xs font-bold uppercase tracking-wider text-[#6B665F]">Challenges Faced / 面臨挑戰</h4>
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-xs font-semibold mb-2 text-[#4A4640]" for="challenges_en">Challenges (English)</label>
                <textarea
                  id="challenges_en"
                  v-model="challengesEnText"
                  rows="4"
                  class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
                  placeholder="Challenge 1&#10;Challenge 2"
                ></textarea>
              </div>
              <div>
                <label class="block text-xs font-semibold mb-2 text-[#4A4640]" for="challenges_zh">Challenges (Chinese)</label>
                <textarea
                  id="challenges_zh"
                  v-model="challengesZhText"
                  rows="4"
                  class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
                  placeholder="面臨挑戰 1&#10;面臨挑戰 2"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Results -->
          <div class="space-y-3 bg-[#FCFAF6] p-4 border border-[#E6DFD5] rounded-lg lg:col-span-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-[#6B665F]">Results & Deliverables / 實作成果</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold mb-2 text-[#4A4640]" for="results_en">Results (English)</label>
                <textarea
                  id="results_en"
                  v-model="resultsEnText"
                  rows="4"
                  class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
                  placeholder="Result 1&#10;Result 2"
                ></textarea>
              </div>
              <div>
                <label class="block text-xs font-semibold mb-2 text-[#4A4640]" for="results_zh">Results (Chinese)</label>
                <textarea
                  id="results_zh"
                  v-model="resultsZhText"
                  rows="4"
                  class="w-full px-4 py-2.5 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
                  placeholder="實作成果 1&#10;實作成果 2"
                ></textarea>
              </div>
            </div>
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
          <span>Supabase Online: Saving will persist directly to production projects table.</span>
        </div>

        <div class="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            @click="navigateTo('/admin/projects')"
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
  projectData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save'])

const { isMockMode } = useSupabaseCms()
const { getAuthHeaders } = useAdminAuth()

const isSaving = ref(false)
const tagsStr = ref('')
const stackStr = ref('')

const highlightsEnText = ref('')
const highlightsZhText = ref('')
const challengesEnText = ref('')
const challengesZhText = ref('')
const resultsEnText = ref('')
const resultsZhText = ref('')

const form = reactive({
  slug: '',
  title_en: '',
  title_zh: '',
  subtitle_en: '',
  subtitle_zh: '',
  description_en: '',
  description_zh: '',
  long_description_en: '',
  long_description_zh: '',
  category: '',
  role_en: '',
  role_zh: '',
  status_en: '',
  status_zh: '',
  tags: [] as string[],
  stack: [] as string[],
  repo_url: '',
  demo_url: '',
  paper_url: '',
  cover_url: '',
  featured: false,
  sort_order: 0,
  highlights_en: [] as string[],
  highlights_zh: [] as string[],
  challenges_en: [] as string[],
  challenges_zh: [] as string[],
  results_en: [] as string[],
  results_zh: [] as string[]
})

// Populate Form values
const populateForm = () => {
  if (props.projectData) {
    form.slug = props.projectData.slug || ''
    form.title_en = props.projectData.title_en || ''
    form.title_zh = props.projectData.title_zh || ''
    form.subtitle_en = props.projectData.subtitle_en || ''
    form.subtitle_zh = props.projectData.subtitle_zh || ''
    form.description_en = props.projectData.description_en || ''
    form.description_zh = props.projectData.description_zh || ''
    form.long_description_en = props.projectData.long_description_en || ''
    form.long_description_zh = props.projectData.long_description_zh || ''
    form.category = props.projectData.category || ''
    form.role_en = props.projectData.role_en || ''
    form.role_zh = props.projectData.role_zh || ''
    form.status_en = props.projectData.status_en || ''
    form.status_zh = props.projectData.status_zh || ''
    form.tags = props.projectData.tags || []
    form.stack = props.projectData.stack || []
    form.repo_url = props.projectData.repo_url || ''
    form.demo_url = props.projectData.demo_url || ''
    form.paper_url = props.projectData.paper_url || ''
    form.cover_url = props.projectData.cover_url || ''
    form.featured = props.projectData.featured || false
    form.sort_order = props.projectData.sort_order || 0

    tagsStr.value = form.tags.join(', ')
    stackStr.value = form.stack.join(', ')

    highlightsEnText.value = (props.projectData.highlights_en || []).join('\n')
    highlightsZhText.value = (props.projectData.highlights_zh || []).join('\n')
    challengesEnText.value = (props.projectData.challenges_en || []).join('\n')
    challengesZhText.value = (props.projectData.challenges_zh || []).join('\n')
    resultsEnText.value = (props.projectData.results_en || []).join('\n')
    resultsZhText.value = (props.projectData.results_zh || []).join('\n')
  }
}

onMounted(() => {
  populateForm()
})

watch(() => props.projectData, () => {
  populateForm()
}, { deep: true })

// Auto-generate URL slugs from Title (en)
const generateSlug = () => {
  if (!props.projectData) {
    form.slug = form.title_en
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
}

// Watch tags and stack comma strings
watch(tagsStr, (newVal) => {
  form.tags = newVal.split(',').map(s => s.trim()).filter(s => s.length > 0)
})
watch(stackStr, (newVal) => {
  form.stack = newVal.split(',').map(s => s.trim()).filter(s => s.length > 0)
})

// Watch bullets list multiline textareas
watch(highlightsEnText, (val) => {
  form.highlights_en = val.split('\n').map(s => s.trim()).filter(s => s.length > 0)
})
watch(highlightsZhText, (val) => {
  form.highlights_zh = val.split('\n').map(s => s.trim()).filter(s => s.length > 0)
})
watch(challengesEnText, (val) => {
  form.challenges_en = val.split('\n').map(s => s.trim()).filter(s => s.length > 0)
})
watch(challengesZhText, (val) => {
  form.challenges_zh = val.split('\n').map(s => s.trim()).filter(s => s.length > 0)
})
watch(resultsEnText, (val) => {
  form.results_en = val.split('\n').map(s => s.trim()).filter(s => s.length > 0)
})
watch(resultsZhText, (val) => {
  form.results_zh = val.split('\n').map(s => s.trim()).filter(s => s.length > 0)
})

const handleSubmit = async () => {
  // Front-end security check: wording guard check
  if (
    hasPublicationWordingViolation(form.title_en) || hasPublicationWordingViolation(form.title_zh) ||
    hasPublicationWordingViolation(form.subtitle_en) || hasPublicationWordingViolation(form.subtitle_zh) ||
    hasPublicationWordingViolation(form.description_en) || hasPublicationWordingViolation(form.description_zh) ||
    hasPublicationWordingViolation(form.long_description_en) || hasPublicationWordingViolation(form.long_description_zh) ||
    form.highlights_en.some(hasPublicationWordingViolation) || form.highlights_zh.some(hasPublicationWordingViolation)
  ) {
    alert(`[Wording Security Block]: ${publicationWordingGuidance}`)
    return
  }

  isSaving.value = true
  try {
    const method = props.projectData ? 'PATCH' : 'POST'
    const url = props.projectData ? `/api/projects/${props.projectData.id}` : '/api/projects'

    const res: any = await $fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: form
    })

    if (res.success) {
      if (res.warning) {
        alert(`${res.warning}\n\nLocal changes updated successfully!`)
      } else {
        alert('Project saved successfully!')
      }
      navigateTo('/admin/projects')
    }
  } catch (err: any) {
    alert(`Failed to save project: ${err.statusMessage || err.message}`)
  } finally {
    isSaving.value = false
  }
}
</script>
