<template>
  <div class="py-12 md:py-20 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-4">

      <!-- Heading -->
      <SectionHeading
        eyebrow="Contact"
        title="contact.title"
        description="contact.description"
        align="left"
      >
        <template #icon>
          <Mail class="w-3.5 h-3.5 text-brand-accent" />
        </template>
      </SectionHeading>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mt-8">

        <!-- Left: Contact Information Cards -->
        <div class="md:col-span-5 space-y-4">

          <!-- Email Card -->
          <a
            :href="`mailto:${profile.email}`"
            class="flex items-center gap-4 p-5 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface/30 hover:border-brand-accent/30 transition-all duration-300 group"
          >
            <div class="w-10 h-10 rounded-lg bg-brand-accent/5 border border-brand-accent/25 flex items-center justify-center text-brand-accent shrink-0">
              <Mail class="w-4 h-4" />
            </div>
            <div class="text-left">
              <span class="text-public-micro block font-mono uppercase tracking-wider text-neutral-500">{{ t('contact.emailMe') }}</span>
              <span class="text-public-body-sm mt-1 block break-all font-mono font-semibold text-neutral-700 dark:text-neutral-300">{{ profile.email }}</span>
            </div>
          </a>

          <!-- LinkedIn Card -->
          <a
            :href="profile.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-4 p-5 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface/30 hover:border-brand-accent/30 transition-all duration-300 group"
          >
            <div class="w-10 h-10 rounded-lg bg-[#0077b5]/5 border border-[#0077b5]/25 flex items-center justify-center text-[#0077b5] shrink-0">
              <Linkedin class="w-4 h-4" />
            </div>
            <div class="text-left">
              <span class="text-public-micro block font-mono uppercase tracking-wider text-neutral-500">{{ t('contact.linkedin') }}</span>
              <span class="text-public-body-sm mt-1 block break-all font-semibold text-neutral-700 dark:text-neutral-300">tsung-hsin-lu</span>
            </div>
          </a>

          <!-- GitHub Card -->
          <a
            :href="profile.github"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-4 p-5 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface/30 hover:border-brand-accent/30 transition-all duration-300 group"
          >
            <div class="w-10 h-10 rounded-lg bg-neutral-900/5 dark:bg-white/5 border border-light-border dark:border-dark-border flex items-center justify-center text-neutral-700 dark:text-neutral-300 shrink-0">
              <Github class="w-4 h-4" />
            </div>
            <div class="text-left">
              <span class="text-public-micro block font-mono uppercase tracking-wider text-neutral-500">{{ t('contact.github') }}</span>
              <span class="text-public-body-sm mt-1 block break-all font-mono font-semibold text-neutral-700 dark:text-neutral-300">Neura-Shadow</span>
            </div>
          </a>

        </div>

        <!-- Right: Message Form -->
        <div class="md:col-span-7 p-6 rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface/10">
          <h3 class="text-content-subheading mb-4 text-left font-display font-bold text-neutral-850 dark:text-neutral-100">{{ t('contact.sendMessage') }}</h3>

          <form @submit.prevent="handleSubmit" class="space-y-4 text-left">
            <div>
              <label class="text-public-micro mb-1.5 block font-mono font-bold uppercase tracking-wider text-neutral-500">{{ t('contact.name') }}</label>
              <input
                v-model="form.name"
                type="text"
                required
                class="text-public-body-sm min-h-11 w-full rounded-lg border border-light-border bg-light-bg/50 px-3.5 py-2.5 text-neutral-850 outline-none transition-colors focus:border-brand-accent focus:ring-1 focus:ring-brand-accent dark:border-dark-border dark:bg-dark-surface/40 dark:text-neutral-100"
                :placeholder="t('contact.namePlaceholder')"
              />
            </div>

            <div>
              <label class="text-public-micro mb-1.5 block font-mono font-bold uppercase tracking-wider text-neutral-500">{{ t('contact.email') }}</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="text-public-body-sm min-h-11 w-full rounded-lg border border-light-border bg-light-bg/50 px-3.5 py-2.5 text-neutral-850 outline-none transition-colors focus:border-brand-accent focus:ring-1 focus:ring-brand-accent dark:border-dark-border dark:bg-dark-surface/40 dark:text-neutral-100"
                :placeholder="t('contact.emailPlaceholder')"
              />
            </div>

            <div>
              <label class="text-public-micro mb-1.5 block font-mono font-bold uppercase tracking-wider text-neutral-500">{{ t('contact.message') }}</label>
              <textarea
                v-model="form.message"
                required
                rows="4"
                class="text-public-body-sm w-full resize-none rounded-lg border border-light-border bg-light-bg/50 px-3.5 py-2.5 text-neutral-850 outline-none transition-colors focus:border-brand-accent focus:ring-1 focus:ring-brand-accent dark:border-dark-border dark:bg-dark-surface/40 dark:text-neutral-100"
                :placeholder="t('contact.messagePlaceholder')"
              />
            </div>

            <button
              type="submit"
              disabled="true"
              class="text-button inline-flex min-h-11 w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-brand-accent px-5 py-3 font-semibold text-white opacity-60 transition-colors hover:bg-brand-accentHover"
            >
              <span>{{ t('contact.submitBtn') }}</span>
            </button>
            <p class="text-public-micro mt-2 text-center text-neutral-500 dark:text-neutral-400">
              {{ t('contact.offlineAlert') }}
            </p>
          </form>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Mail, Linkedin, Github } from 'lucide-vue-next'
import { useI18n } from '~/composables/useI18n'
import { profileData as profile } from '~/data/profile'
import SectionHeading from '~/components/ui/SectionHeading.vue'

const { t } = useI18n()

useHead({
  title: 'Contact',
  meta: [
    { name: 'description', content: 'Contact Lu Tsung-Hsin (呂宗昕) for inquiries and collaborations.' }
  ]
})

const form = ref({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  // Offline form handler
}
</script>
