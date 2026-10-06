import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { weddingData } from './data/wedding.js'
import { loadFontsFor, withTimeout } from './fonts.js'
import { locale } from './i18n.js'

// Muqova joriy til shriftlari yuklangach ko‘rsatiladi — matn joyidan sakramaydi.
// Internet sekin bo‘lsa, ko‘pi bilan shuncha kutiladi.
const FONT_TIMEOUT_MS = 2500

withTimeout(loadFontsFor(locale.value), FONT_TIMEOUT_MS).finally(() => {
  document.documentElement.classList.add('fonts-ready')
  // Qolgan tillar shriftlari fonda yuklanadi — til almashganda ham sakrash bo‘lmaydi.
  for (const { code } of weddingData.locales) {
    if (code !== locale.value) loadFontsFor(code)
  }
})

createApp(App).mount('#app')
