import { ref, onMounted } from 'vue'
import { en } from '~/i18n/locales/en'
import { zhTW } from '~/i18n/locales/zh-TW'

// Global single instance reactive state
const locale = ref<'en' | 'zh-TW'>('en')

export function useI18n() {
  const t = (key: string): string => {
    const keys = key.split('.')
    let current: any = locale.value === 'zh-TW' ? zhTW : en

    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k]
      } else {
        return key // Return key if not found
      }
    }
    return current
  }

  const toggleLocale = () => {
    locale.value = locale.value === 'en' ? 'zh-TW' : 'en'
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('user-locale', locale.value)
    }
  }

  // Load locale selection on client-side mounting
  onMounted(() => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('user-locale')
      if (saved === 'en' || saved === 'zh-TW') {
        locale.value = saved
      }
    }
  })

  return {
    locale,
    t,
    toggleLocale
  }
}
