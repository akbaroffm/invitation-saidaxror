<script setup>
import { onBeforeUnmount, ref } from 'vue'
import SectionReveal from './SectionReveal.vue'
import { weddingData } from '../data/wedding.js'
import { t } from '../i18n.js'

const { giftCard } = weddingData
const COPIED_FEEDBACK_MS = 2000

const isCopied = ref(false)
let feedbackTimer = null

// Clipboard API faqat HTTPS’da ishlaydi; aks holda eski usulga o‘tamiz.
function copyFallback(text) {
  const field = document.createElement('textarea')
  field.value = text
  field.setAttribute('readonly', '')
  field.style.position = 'fixed'
  field.style.opacity = '0'
  document.body.append(field)
  field.select()
  document.execCommand('copy')
  field.remove()
}

async function copyNumber() {
  const digits = giftCard.number.replace(/\s/g, '')
  try {
    await navigator.clipboard.writeText(digits)
  } catch {
    copyFallback(digits)
  }
  isCopied.value = true
  clearTimeout(feedbackTimer)
  feedbackTimer = setTimeout(() => (isCopied.value = false), COPIED_FEEDBACK_MS)
}

onBeforeUnmount(() => clearTimeout(feedbackTimer))
</script>

<template>
  <section class="section" aria-labelledby="gift-title">
    <SectionReveal as="h2" id="gift-title" class="eyebrow">{{ t.gift.eyebrow }}</SectionReveal>
    <SectionReveal as="p" class="lead gift__text" :delay="100">{{ t.gift.text }}</SectionReveal>

    <SectionReveal class="gift__card" :delay="200">
      <span class="gift__system">{{ giftCard.system }}</span>
      <p class="gift__number">{{ giftCard.number }}</p>
      <p class="gift__holder">{{ giftCard.holder }}</p>
    </SectionReveal>

    <SectionReveal :delay="300">
      <button type="button" class="btn" @click="copyNumber">
        <svg v-if="isCopied" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="8.5" y="8.5" width="12" height="12" rx="1.5" />
          <path d="M15.5 5V4.5a1 1 0 0 0-1-1h-10a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1H5" />
        </svg>
        <span aria-live="polite">{{ isCopied ? t.gift.copied : t.gift.copy }}</span>
      </button>
    </SectionReveal>
  </section>
</template>

<style scoped>
.gift__text {
  max-width: 24rem;
}

/* Bank kartasi nisbati (85.6 × 54 mm) */
.gift__card {
  position: relative;
  display: grid;
  align-content: end;
  gap: 0.6rem;
  width: 100%;
  max-width: 20rem;
  aspect-ratio: 1.586;
  padding: 1.5rem;
  border: 1px solid var(--c-champagne);
  border-radius: 12px;
  background: var(--c-cream);
  text-align: left;
}

.gift__card::after {
  content: '';
  position: absolute;
  inset: 5px;
  border: 1px solid rgba(176, 145, 95, 0.25);
  border-radius: 8px;
  pointer-events: none;
}

.gift__system {
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-style: italic;
  color: var(--c-gold-deep);
}

.gift__number {
  font-size: clamp(1.05rem, 0.9rem + 1vw, 1.25rem);
  font-weight: 500;
  letter-spacing: 0.1em;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.gift__holder {
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: var(--tracking-mid);
  text-transform: uppercase;
  color: var(--c-ink-soft);
}
</style>
