<template>
  <div class="bg-light-bg py-12 transition-colors duration-300 dark:bg-dark-bg md:py-20">
    <div class="mx-auto max-w-6xl px-4">
      <header class="mb-14 grid grid-cols-1 items-start gap-8 border-b border-light-border pb-12 dark:border-dark-border lg:grid-cols-12">
        <div class="text-left lg:col-span-7">
          <span class="text-public-caption inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/[0.07] px-3 py-1.5 font-semibold text-brand-accent">
            {{ t('about.title') }}
          </span>
          <h1 class="text-page-title mt-5 font-display font-extrabold tracking-tight text-[#1F1E1B] dark:text-white">
            {{ locale === 'en' ? profile.name : profile.chineseName }}
            <span class="mt-2 block text-xl font-medium text-neutral-500 dark:text-neutral-400 sm:inline sm:ml-2 sm:mt-0 sm:text-2xl">
              {{ locale === 'en' ? profile.chineseName : profile.name }}
            </span>
          </h1>
          <p class="mt-4 font-display text-[clamp(1.375rem,1.15rem+0.8vw,1.875rem)] font-semibold leading-tight text-brand-accent">
            {{ profile.title[locale] }}
          </p>
          <p class="text-public-body mt-3 font-medium text-neutral-600 dark:text-neutral-300">
            {{ profile.capabilityLine[locale] }}
          </p>
          <div data-testid="about-intro-body" class="text-public-body mt-5 max-w-[70ch] space-y-4 text-neutral-600 dark:text-neutral-400">
            <p v-for="paragraph in profileSummaryParagraphs" :key="paragraph">{{ paragraph }}</p>
          </div>
          <a href="/resume.pdf" download class="text-button mt-8 inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-accentHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent">
            <FileDown class="h-4 w-4" />
            {{ t('about.downloadCV') }}
          </a>
        </div>

        <div class="w-full lg:col-span-5">
          <ClientOnly>
            <ThreeProfileOrb />
            <template #fallback>
              <div class="h-64 rounded-2xl border border-light-border bg-light-surface/80 dark:border-dark-border dark:bg-dark-surface/50 sm:h-80" />
            </template>
          </ClientOnly>
        </div>
      </header>

      <section data-about-section="positioning" class="mb-16" aria-labelledby="edge-systems-heading">
        <div class="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-8">
            <p class="text-public-caption font-bold uppercase tracking-[0.14em] text-brand-accent">{{ currentEngineeringFocus.title[locale] }}</p>
            <h2 id="edge-systems-heading" class="text-content-heading mt-3 font-display font-bold text-[#1F1E1B] dark:text-white">
              {{ t('about.edgeSystemsTitle') }}
            </h2>
            <p class="text-public-body mt-4 max-w-[72ch] text-neutral-600 dark:text-neutral-400">
              {{ currentEngineeringFocus.description[locale] }}
            </p>
          </div>
          <div class="text-public-body-sm rounded-xl border border-amber-300/70 bg-amber-50 p-4 text-amber-900 dark:border-amber-800/50 dark:bg-amber-950/20 dark:text-amber-200 lg:col-span-4">
            <p class="font-bold">{{ t('about.evidenceBoundaryTitle') }}</p>
            <p class="mt-1">{{ t('about.evidenceBoundaryDescription') }}</p>
          </div>
        </div>
      </section>

      <section class="mb-16" aria-labelledby="research-separation-heading">
        <div class="mb-7 max-w-3xl">
          <p class="text-public-caption font-bold uppercase tracking-[0.14em] text-brand-accent">{{ t('about.researchBoundaryEyebrow') }}</p>
          <h2 id="research-separation-heading" class="text-content-heading mt-3 font-display font-bold text-[#1F1E1B] dark:text-white">{{ t('about.researchBoundaryTitle') }}</h2>
          <p class="text-public-body mt-3 text-neutral-600 dark:text-neutral-400">{{ t('about.researchBoundaryDescription') }}</p>
        </div>

        <div class="grid gap-5 lg:grid-cols-2">
          <article
            v-for="item in profile.research"
            :key="item.kind"
            :data-research-kind="item.kind"
            :data-about-section="item.kind === 'applied-rd' ? 'nstc' : 'independent-research'"
            class="rounded-2xl border p-6"
            :class="item.kind === 'applied-rd'
              ? 'border-brand-accent/25 bg-brand-accent/[0.045] dark:border-brand-accent/20 dark:bg-brand-accent/[0.035]'
              : 'border-amber-300/70 bg-amber-50/70 dark:border-amber-800/55 dark:bg-amber-950/15'"
          >
            <p class="text-public-micro font-bold uppercase tracking-[0.14em]" :class="item.kind === 'applied-rd' ? 'text-brand-accent' : 'text-amber-700 dark:text-amber-300'">
              {{ t(item.kind === 'applied-rd' ? 'research.appliedLabel' : 'research.independentLabel') }}
            </p>
            <h3 class="text-content-subheading mt-3 font-display font-bold text-[#1F1E1B] dark:text-white">{{ item.title[locale] }}</h3>
            <p class="text-public-body mt-3 text-neutral-600 dark:text-neutral-400">{{ item.description[locale] }}</p>
            <p v-if="item.kind === 'independent-research'" class="text-public-body-sm mt-5 border-t border-amber-300/70 pt-4 font-semibold text-amber-900 dark:border-amber-800/50 dark:text-amber-200">
              {{ t('about.independentResearchClarification') }}
            </p>
          </article>
        </div>
      </section>

      <section data-about-section="architecture" class="mb-16" aria-labelledby="edge-architecture-heading">
        <div class="mt-8 rounded-2xl border border-light-border bg-light-elevated/55 p-5 dark:border-dark-border dark:bg-dark-surface/25 sm:p-7">
          <div class="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="edge-architecture-heading" class="text-content-heading font-display font-bold text-[#1F1E1B] dark:text-white">{{ t('about.architectureTitle') }}</h2>
              <p class="text-public-body-sm mt-2 text-neutral-500 dark:text-neutral-400">{{ t('about.architectureDescription') }}</p>
            </div>
            <span class="text-public-caption w-fit rounded-full border border-brand-accent/20 bg-brand-accent/[0.07] px-3 py-1.5 font-semibold text-brand-accent">{{ t('about.referenceArchitecture') }}</span>
          </div>

          <div class="grid gap-3 lg:grid-cols-[1fr_auto_1.25fr_auto_1fr] lg:items-stretch">
            <ArchitectureLane :title="t('three.input')" :steps="architectureLanes.input" />
            <ArrowRight class="mx-auto hidden h-5 w-5 self-center text-brand-accent lg:block" aria-hidden="true" />
            <ArchitectureLane :title="t('three.processing')" :steps="architectureLanes.processing" />
            <ArrowRight class="mx-auto hidden h-5 w-5 self-center text-brand-accent lg:block" aria-hidden="true" />
            <ArchitectureLane :title="t('three.output')" :steps="architectureLanes.output" />
          </div>
        </div>
      </section>

      <section id="capabilities" data-about-section="capabilities" class="mb-16 scroll-mt-24" aria-labelledby="about-capability-heading">
        <div class="mb-7 max-w-3xl">
          <h2 id="about-capability-heading" class="text-content-heading font-display font-bold text-[#1F1E1B] dark:text-white">{{ t('about.capabilitiesTitle') }}</h2>
          <p class="text-public-body mt-3 text-neutral-600 dark:text-neutral-400">{{ t('about.capabilitiesDescription') }}</p>
        </div>
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article v-for="group in profile.skills" :key="group.category.en" class="rounded-2xl border border-light-border bg-white p-5 dark:border-dark-border dark:bg-dark-surface/30">
            <h3 class="text-content-subheading font-display font-bold text-neutral-850 dark:text-white">{{ group.category[locale] }}</h3>
            <ul class="mt-4 space-y-2">
              <li v-for="skill in group.skills" :key="skill.name.en" class="text-public-body-sm flex items-start justify-between gap-3 border-t border-light-border/70 pt-2.5 first:border-t-0 first:pt-0 dark:border-dark-border/70">
                <span class="font-medium text-neutral-650 dark:text-neutral-300">{{ skill.name[locale] }}</span>
                <span class="text-public-caption shrink-0 font-semibold text-brand-accent">{{ capabilityStatusLabels[skill.status][locale] }}</span>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section class="mb-16" aria-labelledby="ros-responsibilities-heading">
        <div class="mb-6 max-w-3xl">
          <h2 id="ros-responsibilities-heading" class="text-content-heading font-display font-bold text-[#1F1E1B] dark:text-white">{{ t('about.rosResponsibilitiesTitle') }}</h2>
          <p class="text-public-body mt-3 text-neutral-600 dark:text-neutral-400">{{ t('about.rosResponsibilitiesDescription') }}</p>
        </div>

        <div class="overflow-x-auto rounded-2xl border border-light-border bg-white dark:border-dark-border dark:bg-dark-surface/30">
          <table class="w-full min-w-[720px] border-collapse text-left">
            <caption class="sr-only">{{ t('about.rosResponsibilitiesTitle') }}</caption>
            <thead class="bg-light-elevated/70 text-[0.9375rem] font-bold leading-6 text-neutral-600 dark:bg-dark-elevated/60 dark:text-neutral-300">
              <tr>
                <th scope="col" class="w-[22%] px-6 py-4">{{ t('about.component') }}</th>
                <th scope="col" class="w-[53%] px-6 py-4">{{ t('about.purpose') }}</th>
                <th scope="col" class="w-[25%] px-6 py-4">{{ t('about.capabilityStatus') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in rosResponsibilities" :key="item.id" class="border-t border-light-border dark:border-dark-border">
                <th scope="row" class="px-6 py-5 font-mono text-public-body-sm font-bold text-neutral-850 dark:text-neutral-100">{{ item.label[locale] }}</th>
                <td class="px-6 py-5 text-public-body-sm text-neutral-600 dark:text-neutral-400">{{ item.description?.[locale] }}</td>
                <td class="px-6 py-5">
                  <span class="text-public-caption inline-flex rounded-full border border-light-border bg-light-elevated px-3 py-1.5 font-semibold text-neutral-650 dark:border-dark-border dark:bg-dark-elevated dark:text-neutral-300">
                    {{ capabilityStatusLabels[item.status][locale] }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="mb-16 grid gap-6 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <h2 class="text-content-heading font-display font-bold text-[#1F1E1B] dark:text-white">{{ t('about.qosTitle') }}</h2>
          <p class="text-public-body mt-3 max-w-2xl text-neutral-600 dark:text-neutral-400">{{ t('about.qosDescription') }}</p>
          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <article v-for="example in qosExamples" :key="example.id" class="rounded-2xl border border-light-border bg-light-surface p-5 dark:border-dark-border dark:bg-dark-surface/35">
              <h3 class="text-content-subheading font-display font-bold text-neutral-850 dark:text-white">{{ example.title[locale] }}</h3>
              <p class="text-public-body-sm mt-2 text-neutral-550 dark:text-neutral-400">{{ example.description[locale] }}</p>
              <dl class="mt-5 space-y-3 border-t border-light-border pt-4 dark:border-dark-border">
                <div v-for="setting in example.settings" :key="setting.key" class="text-public-caption flex items-center justify-between gap-4">
                  <dt class="text-neutral-500 dark:text-neutral-400">{{ t(`about.qos.${setting.key}`) }}</dt>
                  <dd class="font-mono font-semibold text-neutral-800 dark:text-neutral-200">{{ setting.value[locale] }}</dd>
                </div>
              </dl>
            </article>
          </div>
        </div>

        <div data-about-section="profiling" class="rounded-2xl border border-light-border bg-light-elevated/55 p-6 dark:border-dark-border dark:bg-dark-surface/25 lg:col-span-5">
          <h2 class="text-content-subheading font-display font-bold text-[#1F1E1B] dark:text-white">{{ t('about.profilingTitle') }}</h2>
          <p class="text-public-body mt-3 text-neutral-600 dark:text-neutral-400">{{ t('about.profilingDescription') }}</p>
          <ul class="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <li v-for="metric in profilingMetrics" :key="metric.id" class="text-public-body-sm flex items-center gap-2 rounded-lg border border-light-border bg-white/70 px-3 py-2.5 font-medium text-neutral-650 dark:border-dark-border dark:bg-dark-bg/45 dark:text-neutral-300">
              <Activity class="h-4 w-4 shrink-0 text-brand-accent" aria-hidden="true" />
              {{ metric.label[locale] }}
            </li>
          </ul>
          <p class="text-public-body-sm mt-5 border-t border-light-border pt-4 font-semibold text-amber-800 dark:border-dark-border dark:text-amber-300">{{ t('about.noBenchmarks') }}</p>
        </div>
      </section>

      <section class="mb-14 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 class="text-content-subheading mb-6 flex items-center gap-2 font-display font-bold text-[#1F1E1B] dark:text-white">
            <GraduationCap class="h-5 w-5 text-brand-accent" />
            {{ t('about.education') }}
          </h2>
          <div class="relative ml-3 border-l-2 border-light-border pl-6 dark:border-dark-border">
            <div v-for="education in profile.education" :key="education.period" class="relative">
              <div class="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-brand-accent ring-4 ring-light-bg dark:ring-dark-bg" />
              <h3 class="text-public-body font-bold text-neutral-800 dark:text-neutral-200">{{ education.institution[locale] }}</h3>
              <p class="text-public-body-sm mt-1 text-neutral-500 dark:text-neutral-400">{{ education.degree[locale] }}</p>
              <div class="text-public-caption mt-2 flex gap-3">
                <span class="font-mono text-neutral-500 dark:text-neutral-400">{{ education.period }}</span>
                <span v-if="education.gpa" class="font-semibold text-brand-accent">{{ education.gpa }}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-content-subheading mb-6 flex items-center gap-2 font-display font-bold text-[#1F1E1B] dark:text-white">
            <BrainCircuit class="h-5 w-5 text-brand-accent" />
            {{ t('about.researchInterests') }}
          </h2>
          <div class="flex flex-wrap gap-2.5">
            <span v-for="interest in researchInterests" :key="interest.en" class="text-public-caption rounded-lg border border-light-border bg-light-surface px-3.5 py-2.5 font-semibold text-neutral-700 dark:border-dark-border dark:bg-dark-surface/30 dark:text-neutral-300">
              {{ interest[locale] }}
            </span>
          </div>
        </div>
      </section>

      <section class="rounded-2xl border border-light-border bg-light-elevated/40 p-7 text-center dark:border-dark-border dark:bg-dark-surface/15">
        <h2 class="text-content-subheading font-display font-bold text-neutral-850 dark:text-neutral-100">{{ t('about.collaborations') }}</h2>
        <p class="text-public-body mx-auto mt-2 max-w-2xl text-neutral-500 dark:text-neutral-400">{{ t('about.collabDesc') }}</p>
        <NuxtLink to="/contact" class="text-button mt-5 inline-flex min-h-10 items-center gap-1.5 font-semibold text-brand-accent hover:text-brand-accentHover">
          {{ t('about.navContact') }}
          <ArrowRight class="h-4 w-4" />
        </NuxtLink>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Activity, ArrowRight, BrainCircuit, FileDown, GraduationCap } from 'lucide-vue-next'
import { useI18n } from '~/composables/useI18n'
import { profileData as profile } from '~/data/profile'
import {
  capabilityStatusLabels,
  currentEngineeringFocus,
  edgeArchitectureSteps,
  profilingMetrics,
  qosExamples,
  rosResponsibilities
} from '~/data/engineering'
import ArchitectureLane from '~/components/about/ArchitectureLane.vue'
import ThreeProfileOrb from '~/components/three/ThreeProfileOrb.vue'

const { locale, t } = useI18n()

const profileSummaryParagraphs = computed(() => profile.aboutSummary[locale.value].split('\n\n'))

const architectureLanes = {
  input: edgeArchitectureSteps.filter(step => step.lane === 'input'),
  processing: edgeArchitectureSteps.filter(step => step.lane === 'processing'),
  output: edgeArchitectureSteps.filter(step => step.lane === 'output')
}

const researchInterests = [
  { en: 'Deep Reinforcement Learning', 'zh-TW': '深度強化學習' },
  { en: 'UAV Navigation', 'zh-TW': '無人機導航' },
  { en: 'World Models', 'zh-TW': '世界模型' },
  { en: 'Diffusion Transformers', 'zh-TW': 'Diffusion Transformer' },
  { en: 'Multi-agent Coordination', 'zh-TW': '多智能體協作' },
  { en: 'Computer Vision', 'zh-TW': '電腦視覺' },
  { en: 'Edge AI Deployment', 'zh-TW': '邊緣 AI 部署' },
  { en: 'ROS 2 Systems', 'zh-TW': 'ROS 2 系統' }
] as const

useHead(() => ({
  title: t('about.metaTitle'),
  meta: [{ name: 'description', content: t('about.metaDescription') }]
}))
</script>
