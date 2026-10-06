<script setup>
import { computed } from 'vue'
import { weddingData } from '../data/wedding.js'
import { coupleNames, fill, guestName, locale, t } from '../i18n.js'
import { getDateParts } from '../utils/date.js'

defineEmits(['open'])

const { images } = weddingData
const dateParts = computed(() => getDateParts(locale.value))
const label = computed(() => (guestName ? fill(t.value.cover.guestLabel, { name: guestName }) : t.value.cover.label))
</script>

<template>
  <div class="cover" role="dialog" aria-modal="true" aria-labelledby="cover-names">
    <picture class="cover__media">
      <source media="(max-width: 767px)" :srcset="images.coverMobile" />
      <img :src="images.cover" :alt="t.cover.alt" width="2000" height="1333" fetchpriority="high" decoding="async" />
    </picture>
    <div class="cover__overlay" aria-hidden="true" />

    <div class="cover__content">
      <p class="eyebrow cover__label">{{ label }}</p>

      <p id="cover-names" class="names cover__names">
        <span>{{ coupleNames[0] }}</span>
        <span class="names__amp">&amp;</span>
        <span>{{ coupleNames[1] }}</span>
      </p>

      <div class="ornament" aria-hidden="true"><span /></div>

      <p class="cover__date">
        <time :datetime="weddingData.date">{{ dateParts.full }}</time>
      </p>

      <button type="button" class="btn cover__button" @click="$emit('open')">
        {{ t.cover.openButton }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.cover {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  overflow: hidden;
  isolation: isolate;
  background: var(--c-cream);
}

.cover__media,
.cover__overlay {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.cover__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 100%;
}

/* Rasmdagi yorug‘ osmon to‘q rangli matnni ko‘taradi; yengil qatlam o‘qilishini ta’minlaydi. */
.cover__overlay {
  background: linear-gradient(to bottom, rgba(251, 248, 243, 0.6), rgba(251, 248, 243, 0.25) 50%, transparent 72%);
}

.cover__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: calc(clamp(4.5rem, 13vh, 8rem) + var(--safe-top)) var(--gutter) 2rem;
  text-align: center;
  opacity: 0;
  transition: opacity 1.2s var(--ease);
}

/* Shriftlar yuklangach ko‘rinadi (main.js) — matn joyidan sakramaydi. */
html.fonts-ready .cover__content {
  opacity: 1;
}

.cover__label {
  max-width: 100%;
  color: var(--c-ink-soft);
  overflow-wrap: anywhere;
}

.cover__date {
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.cover__button {
  margin-top: 0.75rem;
  background: rgba(251, 248, 243, 0.6);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}

@media (min-width: 768px) {
  .cover__media img {
    object-position: 50% 75%;
  }

  .cover__names {
    font-size: clamp(4rem, 3rem + 3vw, 5.5rem);
  }
}

@media (min-width: 1024px) {
  .cover__names {
    display: flex;
    align-items: baseline;
    gap: 0.3em;
  }

  .cover__names .names__amp {
    margin: 0;
  }
}
</style>
