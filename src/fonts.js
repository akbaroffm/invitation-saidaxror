import { weddingData } from './data/wedding.js'

// Sahifada ishlatiladigan barcha shrift ko‘rinishlari.
const FACES = [
  '300 1em "Cormorant Garamond"',
  'italic 300 1em "Cormorant Garamond"',
  '400 1em "Cormorant Garamond"',
  'italic 400 1em "Cormorant Garamond"',
  '400 1em Jost',
  '500 1em Jost',
]

/**
 * Google Fonts har bir alifbo (lotin, kirill) uchun alohida fayl beradi va uni
 * shu harflar birinchi marta ekranga chiqqandagina yuklaydi. Shunda matn bir
 * lahza zaxira shriftda ko‘rinib, keyin "sakraydi". Tilning barcha matnlarini
 * namuna sifatida berib, kerakli fayllarni oldindan yuklab qo‘yamiz.
 */
export function loadFontsFor(localeCode) {
  if (!document.fonts) return Promise.resolve()
  const sample = JSON.stringify(weddingData.content[localeCode])
  return Promise.all(FACES.map((face) => document.fonts.load(face, sample))).catch(() => {})
}

export const withTimeout = (promise, ms) => Promise.race([promise, new Promise((resolve) => setTimeout(resolve, ms))])
