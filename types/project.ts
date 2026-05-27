export type Multilingual = {
  en: string
  'zh-TW': string
}

export type MultilingualArray = {
  en: string[]
  'zh-TW': string[]
}

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
  name: string
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | string
  description?: Multilingual
}

export interface SkillGroup {
  category: Multilingual
  icon?: string
  skills: SkillItem[]
}

export interface ResearchHighlight {
  title: Multilingual
  description: Multilingual
  link?: string | null
  tags?: string[]
}

export interface Profile {
  name: string
  chineseName: string
  title: Multilingual
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
