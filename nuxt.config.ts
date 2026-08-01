import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // Modern SPA/SSG/Hybrid Rendering
  ssr: true,

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/content',
    '@vueuse/nuxt'
  ],

  // Content Configuration
  content: {
    highlight: {
      theme: 'github-dark',
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'go', 'python', 'yaml']
    }
  },

  // TypeScript configurations
  typescript: {
    strict: true,
    typeCheck: false // Disabled for faster builds, dev environment handles checking
  },

  // Tailwind configuration
  tailwindcss: {
    configPath: '~/tailwind.config.ts',
    cssPath: '~/assets/css/main.css',
    exposeConfig: false,
    viewer: false
  },

  // App configurations (Head, Meta, SEO)
  app: {
    head: {
      titleTemplate: '%s - Lu Tsung-Hsin (呂宗昕) | Portfolio',
      title: 'Lu Tsung-Hsin (呂宗昕)',
      htmlAttrs: {
        lang: 'zh-TW'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Lu Tsung-Hsin (呂宗昕) - Cloud Native Backend Engineer · Full-stack Developer · AI Research Engineer · UAV Swarm System Architect' },
        { name: 'format-detection', content: 'telephone=no' },
        // Open Graph
        { property: 'og:title', content: 'Lu Tsung-Hsin (呂宗昕) | Portfolio' },
        { property: 'og:description', content: '專注於雲端架構、高併發系統、無人機載具系統協同以及深度強化學習研究與落地。' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://github.com/Neura-Shadow' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Google Fonts (Inter / Outfit / Fira Code)
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap' }
      ]
    }
  },

  // Experimental configurations
  experimental: {
    payloadExtraction: false
  },

  // GitHub Pages is static-only. Keep admin/API routes for server deployments
  // such as Vercel, Netlify, or Cloudflare, but do not prerender them for Pages.
  routeRules: {
    '/admin/**': { prerender: false },
    '/api/**': { prerender: false }
  },

  // Runtime configuration for Supabase-ready CMS
  runtimeConfig: {
    // Server-side only keys
    cmsMode: process.env.NUXT_CMS_MODE || 'auto',
    supabaseSecretKey: process.env.SUPABASE_SECRET_KEY || '',
    adminEmails: process.env.NUXT_ADMIN_EMAILS || '',

    // Public keys exposed to the client
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || '',
      supabasePublishableKey: process.env.NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '',
      projectDataSource: process.env.NUXT_PUBLIC_PROJECT_DATA_SOURCE || 'auto'
    }
  },

  compatibilityDate: '2024-04-03'
})
