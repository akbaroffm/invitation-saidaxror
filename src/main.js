import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { coupleNames, t } from './i18n.js'

// Matn zaxira shriftda ko‘rinib, keyin "sakrab" almashmasligi uchun muqova
// shriftlar yuklangach ko‘rsatiladi. Joriy til harflari (lotin/kirill) yuklanadi.
// Internet sekin bo‘lsa — kutish muddati bor.
const FONT_TIMEOUT_MS = 2500
const sample = `${coupleNames.value.join('')}${t.value.cover.label}${t.value.cover.openButton}`
const fonts = document.fonts
  ? Promise.all([
      document.fonts.load('italic 300 1em "Cormorant Garamond"', sample),
      document.fonts.load('500 1em Jost', sample),
    ])
  : Promise.resolve()
const timeout = new Promise((resolve) => setTimeout(resolve, FONT_TIMEOUT_MS))
Promise.race([fonts, timeout])
  .catch(() => {})
  .finally(() => document.documentElement.classList.add('fonts-ready'))

createApp(App).mount('#app')
