<template>
  <section class="relative min-h-[90vh] md:min-h-[85vh] flex items-center overflow-hidden py-16 md:py-24 border-b border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg transition-colors duration-300">
    <!-- Background Patterns -->
    <AnimatedGridPattern />
    <ParticlesBackground />

    <!-- Glow Accents -->
    <div class="absolute -top-40 right-0 w-[400px] h-[400px] bg-brand-accent/5 dark:bg-brand-accent/[0.03] blur-[100px] rounded-full pointer-events-none" />
    <div class="absolute bottom-0 -left-20 w-[300px] h-[300px] bg-brand-linear/5 dark:bg-brand-linear/[0.03] blur-[80px] rounded-full pointer-events-none" />

    <div class="relative z-10 max-w-6xl mx-auto px-4 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        <!-- Left Side: Profile Intro -->
        <div class="lg:col-span-7 flex flex-col items-start text-left">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full text-xs font-semibold bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
            <span class="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
            {{ t('hero.hello') }}
          </span>

          <h1 class="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-[#1F1E1B] dark:text-white leading-none">
            {{ locale === 'en' ? profile.name : profile.chineseName }}
            <span class="text-xl sm:text-2xl font-display font-medium text-neutral-500 dark:text-neutral-400 block sm:inline sm:ml-2 sm:mt-0 mt-2">
              {{ locale === 'en' ? profile.chineseName : profile.name }}
            </span>
          </h1>

          <p class="mt-4 text-base sm:text-lg font-semibold text-brand-accent leading-relaxed max-w-xl">
            {{ profile.title[locale] }}
          </p>

          <p class="mt-4 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl">
            {{ profile.summary[locale] }}
          </p>

          <!-- Action Buttons -->
          <div class="mt-8 flex flex-wrap gap-4 w-full sm:w-auto">
            <NuxtLink
              to="/projects"
              class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-brand-accent to-brand-accentHover hover:shadow-lg hover:shadow-brand-accent/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Layers class="w-4 h-4" />
              <span>{{ t('hero.viewProjects') }}</span>
            </NuxtLink>

            <a
              href="/resume.pdf"
              download
              class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-neutral-700 dark:text-neutral-200 border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface hover:bg-light-elevated dark:hover:bg-dark-elevated transition-all duration-300"
            >
              <FileDown class="w-4 h-4" />
              <span>{{ t('hero.downloadResume') }}</span>
            </a>
          </div>

          <!-- Stats Grid -->
          <div class="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-light-border dark:border-dark-border w-full">
            <div v-for="stat in stats" :key="stat.key" class="flex flex-col">
              <span class="text-2xl font-bold text-[#1F1E1B] dark:text-white font-display">{{ stat.value }}</span>
              <span class="text-xs text-neutral-400 dark:text-neutral-500 mt-1 uppercase tracking-wider">{{ t(stat.key) }}</span>
            </div>
          </div>
        </div>

        <!-- Right Side: 3D-feeling Floating System Layout -->
        <div class="lg:col-span-5 relative w-full h-[320px] sm:h-[400px] flex items-center justify-center select-none mt-8 lg:mt-0">
          <div class="absolute inset-0 flex items-center justify-center scale-90 sm:scale-100">
            <!-- 3D container with tilt perspective -->
            <div class="relative w-full h-full max-w-[400px] max-h-[400px] preserve-3d transform rotate-x-[15deg] rotate-y-[-10deg] hover:rotate-x-[10deg] hover:rotate-y-[-5deg] transition-transform duration-500">

              <!-- Floating Card 1: Cloud-Native Terminal -->
              <div class="absolute -top-4 -left-4 w-64 p-4 rounded-xl border border-light-border dark:border-dark-border bg-white/80 dark:bg-dark-surface/85 backdrop-blur-md shadow-md animate-float-slow z-30">
                <div class="flex items-center gap-1.5 mb-2.5">
                  <div class="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div class="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div class="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span class="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono ml-2">cloud-native · scalable · intelligent</span>
                </div>
                <div class="font-mono text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5">
                  <p class="text-brand-accent">> Designing systems</p>
                  <p class="text-brand-linear">> Solving real-world problems</p>
                  <p class="text-neutral-500">> Pushing the boundaries</p>
                  <p class="animate-pulse">_</p>
                </div>
              </div>

              <!-- Floating Card 2: System Health -->
              <div class="absolute top-12 -right-8 w-44 p-4 rounded-xl border border-light-border dark:border-dark-border bg-white/80 dark:bg-dark-surface/85 backdrop-blur-md shadow-md animate-float-medium z-20">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-semibold text-neutral-500 dark:text-neutral-400">System Health</span>
                  <span class="text-xs font-bold text-brand-accent">98%</span>
                </div>
                <!-- Mini SVG Chart -->
                <svg viewBox="0 0 100 30" class="w-full h-8 stroke-brand-accent fill-none" stroke-width="2">
                  <path d="M0,20 Q15,5 30,15 T60,8 T90,22 L100,10" />
                </svg>
              </div>

              <!-- Center 3D Deck/Platform -->
              <div class="absolute top-[40%] left-[10%] right-[10%] h-[120px] rounded-2xl border border-light-border dark:border-dark-border bg-gradient-to-b from-light-elevated/80 to-light-surface/60 dark:from-dark-elevated/40 dark:to-dark-surface/70 shadow-lg z-10 flex items-center justify-center">
                <div class="absolute inset-0 flex items-center justify-center opacity-30">
                  <div class="w-24 h-24 rounded-full border border-dashed border-brand-accent animate-spin" style="animation-duration: 20s" />
                </div>
                <div class="flex items-center gap-4 z-20">
                  <!-- Microservices deployed icon group -->
                  <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-neutral-800 border border-light-border dark:border-neutral-700 shadow-sm">
                    <span class="text-xs font-bold text-brand-accent">K8s</span>
                  </div>
                  <div class="flex flex-col text-left">
                    <span class="text-[10px] text-neutral-400 uppercase tracking-widest leading-none">Deployed on</span>
                    <span class="text-sm font-bold text-neutral-800 dark:text-neutral-200 mt-1 leading-none">Kubernetes & AWS</span>
                  </div>
                </div>
              </div>

              <!-- Floating Card 3: UAV Swarm Telemetry -->
              <div class="absolute -bottom-4 right-4 w-52 p-4 rounded-xl border border-light-border dark:border-dark-border bg-white/80 dark:bg-dark-surface/85 backdrop-blur-md shadow-md animate-float-fast z-30">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="text-xs font-bold text-neutral-700 dark:text-neutral-300">UAV Swarm</span>
                  <span class="inline-flex px-1.5 py-0.5 rounded bg-brand-accent/10 text-brand-accent text-[9px] font-bold">Active</span>
                </div>
                <div class="flex items-baseline gap-1.5 mb-2">
                  <span class="text-2xl font-bold font-display text-neutral-900 dark:text-white leading-none">32</span>
                  <span class="text-[10px] text-neutral-400">Active Units</span>
                </div>
                <!-- Network nodes schematic -->
                <div class="w-full h-8 relative border border-light-border dark:border-dark-border rounded bg-light-bg/60 dark:bg-dark-bg/60 overflow-hidden flex items-center justify-center">
                  <div class="absolute w-1.5 h-1.5 rounded-full bg-brand-accent left-4 top-2 animate-ping" />
                  <div class="absolute w-1.5 h-1.5 rounded-full bg-brand-accent left-4 top-2" />
                  <div class="absolute w-1 h-1 rounded-full bg-neutral-400 right-10 top-3" />
                  <div class="absolute w-1 h-1 rounded-full bg-neutral-400 left-16 bottom-2" />
                  <div class="absolute w-1 h-1 rounded-full bg-neutral-400 right-4 bottom-2" />
                  <!-- Connecting lines representation -->
                  <svg class="absolute inset-0 w-full h-full stroke-neutral-300 dark:stroke-neutral-800" stroke-width="0.5">
                    <line x1="16" y1="8" x2="36" y2="12" />
                    <line x1="16" y1="8" x2="28" y2="24" />
                    <line x1="36" y1="12" x2="90" y2="20" />
                    <line x1="28" y1="24" x2="90" y2="20" />
                  </svg>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Layers, FileDown } from 'lucide-vue-next'
import { useI18n } from '~/composables/useI18n'
import { profileData as profile } from '~/data/profile'
import AnimatedGridPattern from '~/components/inspira/AnimatedGridPattern.vue'
import ParticlesBackground from '~/components/inspira/ParticlesBackground.vue'

const { locale, t } = useI18n()

const stats = [
  { value: 'Go', key: 'hero.stats.experience' },
  { value: 'Nuxt', key: 'hero.stats.projects' },
  { value: 'IEEE', key: 'hero.stats.research' },
  { value: 'GitHub', key: 'hero.stats.openSource' }
]
</script>

<style scoped>
.preserve-3d {
  transform-style: preserve-3d;
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(-1deg); }
}

@keyframes float-medium {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(1deg); }
}

@keyframes float-fast {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(-0.5deg); }
}

.animate-float-slow {
  animation: float-slow 7s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 5s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 4s ease-in-out infinite;
}
</style>
