<template>
  <div class="min-h-screen bg-[#FCFAF6] text-[#1F1E1B] flex flex-col justify-center items-center px-4">
    <!-- Outer Login Container -->
    <div class="w-full max-w-md bg-white border border-[#E6DFD5] rounded-xl p-8 shadow-sm">
      <div class="text-center mb-8">
        <h1 class="font-display text-3xl font-bold tracking-tight mb-2">Admin Portal</h1>
        <p class="text-[#6B665F] text-sm">Sign in to manage blog posts and portfolio projects</p>
      </div>

      <!-- Auth mode banner -->
      <div
        class="mb-6 rounded-lg p-4 text-xs space-y-1 border"
        :class="isMockMode ? 'bg-[#FCFAF6] border-amber-200 text-amber-800' : 'bg-green-50 border-green-200 text-green-800'"
      >
        <p class="font-bold flex items-center gap-1">
          <span
            class="inline-block w-2 h-2 rounded-full"
            :class="isMockMode ? 'bg-amber-500 animate-pulse' : 'bg-green-500'"
          ></span>
          {{ isMockMode ? 'Development Mock Auth Mode' : 'Supabase Production Auth Mode' }}
        </p>
        <p v-if="isMockMode">Supabase env is incomplete. Use the local development credentials below:</p>
        <p v-else>Use your Supabase Auth admin email and password. Admin access is checked server-side against the private allowlist.</p>
        <div v-if="isMockMode" class="mt-2 font-mono text-[#4A4640] select-all bg-white p-2 rounded border border-[#E6DFD5]">
          <div>Email: admin@local.dev</div>
          <div>Pass: local-admin-demo</div>
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium mb-2 text-[#4A4640]">Email Address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-3 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] placeholder-[#B5AFA6] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
            placeholder="admin@local.dev"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium mb-2 text-[#4A4640]">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 bg-white border border-[#E6DFD5] rounded-lg text-sm text-[#1F1E1B] placeholder-[#B5AFA6] focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition"
            placeholder="••••••••"
          />
        </div>

        <div v-if="errorMsg" class="text-red-600 text-xs font-semibold">
          {{ errorMsg }}
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-3 bg-[#00a884] hover:bg-[#008f6f] text-white font-medium rounded-lg text-sm transition shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <span v-if="isLoading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          {{ isLoading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>
    </div>

    <!-- Return to Portfolio Link -->
    <NuxtLink to="/" class="mt-6 text-sm text-[#00a884] hover:underline flex items-center gap-1 transition">
      &larr; Back to Portfolio
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { useSupabaseCms } from '~/composables/useSupabaseCms'

definePageMeta({
  layout: false
})

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const isLoading = ref(false)

const { login } = useAdminAuth()
const { isMockMode, loadHealth } = useSupabaseCms()

onMounted(() => {
  loadHealth()
})

const handleLogin = async () => {
  errorMsg.value = ''
  isLoading.value = true

  try {
    await loadHealth()
    const { success, error } = await login(email.value, password.value)
    if (success) {
      navigateTo('/admin')
    } else {
      errorMsg.value = error || 'Invalid email or password'
    }
  } catch (err: any) {
    errorMsg.value = 'An unexpected error occurred.'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>
