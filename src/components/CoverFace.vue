<script setup>
import { computed } from 'vue'
import { coupleNames, fill, guestName, locale, t } from '../i18n.js'
import { getDateParts } from '../utils/date.js'
import star from '../assets/decor/star.svg'

/**
 * Muqovaning ko‘rinishi: kremrang fon, arka, yorliq, ismlar, sana va muhr uchun joy.
 * Eshikning ikki tavaqasi va muhr qatlami aynan shu maketni ishlatadi — shunda
 * tavaqalar ustidagi yarim tasvirlar va muhr joyi har qanday ekranda mos tushadi.
 */
defineProps({
  /** 'panel' — ko‘rinadigan muqova; 'seal' — faqat muhr joyi ko‘rinadi. */
  variant: { type: String, default: 'panel' },
})

const dateParts = computed(() => getDateParts(locale.value))
const label = computed(() => (guestName ? fill(t.value.cover.guestLabel, { name: guestName }) : t.value.cover.label))
</script>

<template>
  <span class="face" :class="`face--${variant}`" aria-hidden="true">
    <span class="face__arch">
      <span class="face__content">
        <img :src="star" alt="" width="24" height="24" class="face__star" />
        <span class="eyebrow face__label">{{ label }}</span>
        <span class="names face__names">
          <span>{{ coupleNames[0] }}</span>
          <span class="names__amp">&amp;</span>
          <span>{{ coupleNames[1] }}</span>
        </span>
        <span class="ornament"><span /></span>
        <span class="face__date">{{ dateParts.full }}</span>
        <span class="face__slot"><slot /></span>
      </span>
    </span>
  </span>
</template>

<style scoped>
.face {
  position: absolute;
  inset: 0;
  display: flex;
  padding: calc(4.25rem + var(--safe-top)) 1.25rem calc(1.25rem + var(--safe-bottom));
  overflow: hidden;
  background: var(--c-cream);
  color: var(--c-ink);
  text-align: center;
}

/* Bosma taklifnomadagidek arka: tashqi va ichki ingichka chiziq. */
.face__arch {
  position: relative;
  display: flex;
  width: min(100%, 26rem);
  min-height: min(100%, 44rem);
  margin: auto;
  padding: 4.5rem 1.5rem 2.75rem;
  border: 1px solid var(--c-champagne);
  border-radius: 999px 999px 3px 3px;
  background: var(--c-ivory);
}

.face__arch::before {
  content: '';
  position: absolute;
  inset: 6px;
  border: 1px solid rgba(168, 135, 90, 0.28);
  border-radius: inherit;
}

.face__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.35rem;
  width: 100%;
  opacity: 0;
  transition: opacity 1.2s var(--ease);
}

/* Shriftlar yuklangach ko‘rinadi (main.js) — matn joyidan sakramaydi. */
html.fonts-ready .face__content {
  opacity: 1;
}

.face__star {
  width: 1.6rem;
  height: 1.6rem;
  margin-bottom: -0.25rem;
}

.face__label {
  max-width: 100%;
  overflow-wrap: anywhere;
}

.face__date {
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

/* Muhr va "ochish" yozuvi uchun joy */
.face__slot {
  display: grid;
  justify-items: center;
  gap: 0.75rem;
  min-height: 8.25rem;
  margin-top: 0.5rem;
}

/* Muhr qatlami: maket bir xil, lekin faqat muhr joyi ko‘rinadi. */
.face--seal {
  background: transparent;
}

.face--seal .face__arch {
  border-color: transparent;
  background: transparent;
}

.face--seal .face__arch::before {
  content: none;
}

.face--seal .face__content > :not(.face__slot) {
  visibility: hidden;
}

/* Past ekranli telefonlar (masalan, iPhone SE) */
@media (max-height: 640px) {
  .face__arch {
    padding-block: 3rem 1.75rem;
  }

  .face__content {
    gap: 0.9rem;
  }

  .face__names {
    font-size: 2.6rem;
  }

  .face__slot {
    min-height: 6.75rem;
  }
}

@media (min-width: 768px) {
  .face__arch {
    width: min(100%, 30rem);
    padding-inline: 2.5rem;
  }
}
</style>
