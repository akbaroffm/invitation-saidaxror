import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { weddingData } from './src/data/wedding.js'

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

/** index.html dagi {{placeholder}} larni src/data/wedding.js dan (asosiy tilda) to‘ldiradi. */
function weddingMeta() {
  const { seo, defaultLocale, namesOrder, content } = weddingData
  const text = content[defaultLocale]
  const absolute = (path) => (seo.siteUrl ? new URL(path, seo.siteUrl).href : path)

  const values = {
    lang: defaultLocale,
    title: `${namesOrder.map((role) => text[role]).join(' & ')} — ${text.seo.titleSuffix}`,
    description: text.seo.description,
    siteUrl: seo.siteUrl,
    ogImage: absolute(seo.ogImage),
  }

  return {
    name: 'wedding-meta',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) =>
        html.replace(/\{\{(\w+)\}\}/g, (match, key) => (key in values ? escapeHtml(values[key]) : match)),
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), weddingMeta()],
})
