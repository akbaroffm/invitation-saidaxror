<script setup>
import SectionReveal from './SectionReveal.vue'
import sectionIcon from '../assets/decor/icon-venue.svg'
import { weddingData } from '../data/wedding.js'
import { t } from '../i18n.js'
import { getMapLinks } from '../utils/links.js'

const links = getMapLinks(weddingData.venue.coordinates)
</script>

<template>
  <section class="section" aria-labelledby="venue-title">
    <SectionReveal as="img" :src="sectionIcon" alt="" width="40" height="40" class="section-icon" aria-hidden="true" />
    <SectionReveal as="p" class="eyebrow">{{ t.venue.eyebrow }}</SectionReveal>
    <SectionReveal as="h2" id="venue-title" class="title" :delay="100">{{ t.venue.name }}</SectionReveal>
    <SectionReveal as="address" class="venue__address" :delay="200">{{ t.venue.address }}</SectionReveal>

    <SectionReveal class="venue__actions" :delay="300">
      <a class="btn btn--solid" :href="links.taxi" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M5 16.5V12l1.8-4.6A2 2 0 0 1 8.7 6h6.6a2 2 0 0 1 1.9 1.4L19 12v4.5" />
          <path d="M3.5 16.5h17M5 12h14M7 19.5v-3M17 19.5v-3" />
          <circle cx="8" cy="14.2" r="0.6" fill="currentColor" />
          <circle cx="16" cy="14.2" r="0.6" fill="currentColor" />
        </svg>
        {{ t.venue.taxi }}
      </a>
      <div class="venue__maps">
        <a class="btn venue__map" :href="links.google" target="_blank" rel="noopener noreferrer">{{ t.venue.googleMaps }}</a>
        <a class="btn venue__map" :href="links.yandex" target="_blank" rel="noopener noreferrer">{{ t.venue.yandexMaps }}</a>
      </div>
    </SectionReveal>
  </section>
</template>

<style scoped>
.venue__address {
  max-width: 20rem;
  font-style: normal;
  color: var(--c-ink-soft);
}

.venue__actions {
  display: grid;
  gap: 0.75rem;
  width: 100%;
  max-width: 21rem;
  margin-top: 0.75rem;
}

/* Ikkita xarita yonma-yon; juda tor ekranda o‘zi ustma-ust tushadi. */
.venue__maps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(9.5rem, 1fr));
  gap: 0.75rem;
}

.venue__map {
  padding-inline: 0.75rem;
}
</style>
