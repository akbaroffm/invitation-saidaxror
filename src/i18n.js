import { computed, ref, watch } from 'vue'
import { weddingData } from './data/wedding.js'
import { loadFontsFor, withTimeout } from './fonts.js'

const LOCALE_STORAGE_KEY = 'invitation-locale'
const LOCALE_FONT_TIMEOUT_MS = 1500
const GUEST_PARAM = 'm'
const LOCALE_PARAM = 'lang'
const GUEST_NAME_MAX_LENGTH = 40

const params = new URLSearchParams(window.location.search)
const supported = weddingData.locales.map(({ code }) => code)

function readStoredLocale() {
  try {
    return localStorage.getItem(LOCALE_STORAGE_KEY)
  } catch {
    return null
  }
}

function detectLocale() {
  const candidates = [params.get(LOCALE_PARAM), readStoredLocale()]
  return candidates.find((code) => supported.includes(code)) ?? weddingData.defaultLocale
}

/** Joriy til kodi ('uz' | 'ru'). */
export const locale = ref(detectLocale())

/** Joriy tildagi barcha matnlar. */
export const t = computed(() => weddingData.content[locale.value])

export const coupleNames = computed(() => weddingData.namesOrder.map((role) => t.value[role]))

/** Havoladagi `?m=` dan olingan mehmon ismi yoki null. Vue uni matn sifatida chiqaradi (xavfsiz). */
export const guestName =
  params.get(GUEST_PARAM)?.replace(/\s+/g, ' ').trim().slice(0, GUEST_NAME_MAX_LENGTH) || null

/** '{name}' kabi o‘rinlarni qiymatlar bilan to‘ldiradi. */
export const fill = (template, values) => template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '')

let requestedLocale = locale.value

/**
 * Til shriftlari tayyor bo‘lgach almashtiradi (odatda ular fonda oldindan
 * yuklangan bo‘ladi va almashish darhol sodir bo‘ladi).
 */
export async function setLocale(code) {
  if (!supported.includes(code) || code === requestedLocale) return
  requestedLocale = code
  await withTimeout(loadFontsFor(code), LOCALE_FONT_TIMEOUT_MS)
  // Kutish paytida boshqa til tanlangan bo‘lsa, eskisini qo‘llamaymiz.
  if (requestedLocale !== code) return
  locale.value = code
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, code)
  } catch {
    // Brauzer xotirasi yopiq (masalan, maxfiy rejim) — tanlov faqat shu safar amal qiladi.
  }
}

watch(
  locale,
  () => {
    document.documentElement.lang = locale.value
    document.title = `${coupleNames.value.join(' & ')} — ${t.value.seo.titleSuffix}`
  },
  { immediate: true },
)
