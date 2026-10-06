import { weddingData } from './data/wedding.js'

// Sahifada ishlatiladigan barcha shrift ko‘rinishlari.
const FACES = [
  '400 1em "Playfair Display"',
  'italic 400 1em "Playfair Display"',
  '400 1em Montserrat',
  '500 1em Montserrat',
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
