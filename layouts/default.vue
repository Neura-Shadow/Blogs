<template>
  <div class="min-h-screen flex flex-col bg-light-bg text-[#1F1E1B] dark:bg-dark-bg dark:text-[#EAE5DB] transition-colors duration-300">
    <!-- Navigation Header -->
    <header class="sticky top-0 z-50 w-full backdrop-blur-md bg-light-bg/70 dark:bg-dark-bg/75 border-b border-light-border dark:border-dark-border transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5 group">
          <div class="w-8 h-8 rounded-lg bg-brand-accent flex items-center justify-center font-display font-bold text-white text-sm shadow-md shadow-brand-accent/20 group-hover:scale-105 transition-transform">
            LT
          </div>
          <div class="flex flex-col text-left">
            <span class="font-display font-bold tracking-tight text-[#1F1E1B] dark:text-white leading-none">
              Lu Tsung-Hsin
            </span>
            <span class="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-none font-mono">
              呂宗昕
            </span>
          </div>
        </NuxtLink>

        <!-- Nav Links -->
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="transition-colors hover:text-brand-accent px-1.5 py-1 relative text-neutral-600 dark:text-neutral-300"
            :class="{ 'text-brand-accent! font-semibold': isActive(link.path) }"
          >
            {{ t(link.key) }}
            <span
              v-if="isActive(link.path)"
              class="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent rounded-full"
            />
          </NuxtLink>
        </nav>

        <!-- Right Side controls -->
        <div class="flex items-center gap-3">
          <!-- Language Toggle Button -->
          <button
            @click="toggleLocale()"
            class="px-2.5 py-1 text-xs font-mono font-bold rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface hover:bg-light-elevated dark:hover:bg-dark-elevated text-[#1F1E1B] dark:text-[#EAE5DB] transition-all duration-200 active:scale-95"
            aria-label="Toggle Language"
          >
            {{ locale === 'en' ? '中文' : 'EN' }}
          </button>

          <!-- Dark Mode Toggle -->
          <button
            @click="toggleDark()"
            class="p-2 rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors text-neutral-600 dark:text-neutral-400"
            aria-label="Toggle Theme"
          >
            <Sun v-if="isDark" class="w-4.5 h-4.5 text-amber-500" />
            <Moon v-else class="w-4.5 h-4.5 text-neutral-600" />
          </button>

          <!-- Mobile Nav Toggle -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface hover:bg-light-elevated dark:hover:bg-dark-elevated transition-colors text-neutral-600 dark:text-neutral-400"
          >
            <Menu v-if="!mobileMenuOpen" class="w-4.5 h-4.5" />
            <X v-else class="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden border-b border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface transition-colors duration-300 px-4 py-4 flex flex-col gap-3.5"
      >
        <NuxtLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="text-sm font-medium transition-colors hover:text-brand-accent py-1.5 border-b border-light-elevated dark:border-dark-elevated last:border-0 text-left"
          :class="isActive(link.path) ? 'text-brand-accent font-semibold' : 'text-neutral-600 dark:text-neutral-300'"
          @click="mobileMenuOpen = false"
        >
          {{ t(link.key) }}
        </NuxtLink>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-light-border dark:border-dark-border bg-light-elevated dark:bg-dark-bg transition-colors duration-300 py-12 mt-auto">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex flex-col items-center md:items-start text-left">
            <div class="flex items-center gap-2 mb-2">
              <span class="font-display font-bold text-[#1F1E1B] dark:text-white">Lu Tsung-Hsin</span>
              <span class="text-xs text-neutral-500 dark:text-neutral-400">呂宗昕</span>
            </div>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 text-center md:text-left leading-relaxed">
              {{ profile.title[locale] }}
            </p>
          </div>

          <!-- Social Links -->
          <div class="flex items-center gap-4 flex-wrap justify-center">
            <a
              href="https://github.com/Neura-Shadow"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-brand-accent transition-colors"
            >
              <Github class="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/tsung-hsin-lu-541476233/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-brand-accent transition-colors"
            >
              <Linkedin class="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              :href="`mailto:${profile.email}`"
              class="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-brand-accent transition-colors"
            >
              <Mail class="w-4 h-4" />
              <span>Email</span>
            </a>
            <a
              href="https://github.com/Neura-Shadow"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-brand-accent transition-colors"
            >
              <Globe class="w-4 h-4" />
              <span>Website</span>
            </a>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-neutral-250/20 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-xs text-neutral-400 dark:text-neutral-500">
            &copy; 2026 Lu Tsung-Hsin 呂宗昕. {{ t('footer.rights') }}
          </p>
          <div class="flex items-center gap-4 text-xs text-neutral-400 dark:text-neutral-500">
            <span>{{ t('footer.poweredBy') }}</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import { Sun, Moon, Menu, X, Github, Linkedin, Mail, Globe } from 'lucide-vue-next'
import { useI18n } from '~/composables/useI18n'
import { profileData as profile } from '~/data/profile'

const route = useRoute()
const { locale, t, toggleLocale } = useI18n()

useHead(() => ({
  htmlAttrs: { lang: locale.value }
}))

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light'
})
const toggleDark = useToggle(isDark)

const mobileMenuOpen = ref(false)

const navLinks = [
  { key: 'nav.home', path: '/' },
  { key: 'nav.projects', path: '/projects' },
  { key: 'nav.blog', path: '/blog' },
  { key: 'nav.about', path: '/about' },
  { key: 'nav.contact', path: '/contact' }
]

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>
