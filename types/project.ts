export type Multilingual = {
  en: string
  'zh-TW': string
}

export type MultilingualArray = {
  en: string[]
  'zh-TW': string[]
}

export type CapabilityStatus =
  | 'project-applied'
  | 'research-applied'
  | 'prototype'
  | 'working-knowledge'
  | 'current-focus'
  | 'planned-extension'

export interface ProjectLinks {
  demo?: string | null
  repo?: string | null
  paper?: string | null
}

export interface Project {
  slug: string
  title: Multilingual
  subtitle?: Multilingual | null
  category: string
  role: Multilingual
  status: Multilingual
  description: Multilingual
  longDescription?: Multilingual | null
  tags: string[]
  stack: string[]
  links: ProjectLinks
  featured: boolean
  cover?: string | null
  highlights?: MultilingualArray | null
  challenges?: MultilingualArray | null
  results?: MultilingualArray | null
}

export interface Education {
  institution: Multilingual
  degree: Multilingual
  period: string
  gpa?: string | null
}

export interface SkillItem {
  name: Multilingual
  status: CapabilityStatus
  description?: Multilingual
}

export interface SkillGroup {
  category: Multilingual
  icon?: string
  skills: SkillItem[]
}

export interface ResearchHighlight {
  kind: 'applied-rd' | 'independent-research'
  title: Multilingual
  description: Multilingual
  link?: string | null
  tags?: string[]
  status?: Multilingual | null
}

export interface Profile {
  name: string
  chineseName: string
  title: Multilingual
  capabilityLine: Multilingual
  summary: Multilingual
  email: string
  phone?: string | null
  location: string
  website: string
  github: string
  linkedin: string
  education: Education[]
  skills: SkillGroup[]
  research: ResearchHighlight[]
}

export interface LocalizedLabelItem {
  id: string
  label: Multilingual
  description?: Multilingual
}

export interface ArchitectureStep extends LocalizedLabelItem {
  shortLabel: Multilingual
  lane: 'input' | 'processing' | 'output'
}

export interface RosResponsibility extends LocalizedLabelItem {
  component: string
  status: CapabilityStatus
}

export interface QosExample {
  id: string
  title: Multilingual
  description: Multilingual
  settings: Array<{
    key: 'reliability' | 'history' | 'depth'
    value: Multilingual
  }>
}

export interface ProjectFilter {
  id: string
  label: Multilingual
  matchTerms: string[]
}
