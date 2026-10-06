<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import CoupleSection from '../components/CoupleSection.vue'
import DateSection from '../components/DateSection.vue'
import VenueSection from '../components/VenueSection.vue'
import GiftSection from '../components/GiftSection.vue'
import ClosingSection from '../components/ClosingSection.vue'
import LanguageSwitch from '../components/LanguageSwitch.vue'
import SectionDivider from '../components/SectionDivider.vue'
import { weddingData } from '../data/wedding.js'

const LOCK_CLASS = 'is-locked'
/** Muhr tushishi va eshik ochilishi davomiyligi — HeroSection.vue dagi CSS bilan mos. */
const DOOR_OPEN_MS = 3100

const isOpening = ref(false)
const isOpen = ref(false)
const hasGiftCard = Boolean(weddingData.giftCard.number)
let openTimer = null

const setScrollLock = (locked) => document.documentElement.classList.toggle(LOCK_CLASS, locked)

function finishOpening() {
  isOpen.value = true
  setScrollLock(false)
}

function openInvitation() {
  if (isOpening.value) return
  window.scrollTo(0, 0)
  isOpening.value = true
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  openTimer = setTimeout(finishOpening, prefersReducedMotion ? 0 : DOOR_OPEN_MS)
}

onMounted(() => setScrollLock(true))
onBeforeUnmount(() => {
  clearTimeout(openTimer)
  setScrollLock(false)
})
</script>

<template>
  <!-- Sahifa eshik ortida tayyor turadi va tavaqalar ochilganda ko‘rinadi. -->
  <main class="sheet" :inert="!isOpen || undefined">
    <CoupleSection />
    <SectionDivider />
    <DateSection />
    <SectionDivider />
    <VenueSection />
    <template v-if="hasGiftCard">
      <SectionDivider />
      <GiftSection />
    </template>
    <SectionDivider />
    <ClosingSection />
  </main>

  <HeroSection v-if="!isOpen" :opening="isOpening" @open="openInvitation" />

  <LanguageSwitch />
</template>

<style scoped>
/* Bitta ustunli "qog‘oz" sahifa: telefonda to‘liq kenglik, kattaroq ekranda markazda. */
.sheet {
  max-width: var(--sheet-width);
  min-height: 100vh;
  min-height: 100svh;
  margin-inline: auto;
  /* Sahifa tepasi va pastida ingichka koshin hoshiya */
  background:
    var(--band) 0 4.5rem / auto 1.5rem repeat-x,
    var(--band) 0 calc(100% - 1.25rem) / auto 1.5rem repeat-x,
    var(--c-ivory);
}

.sheet :deep(.section) {
  display: grid;
  justify-items: center;
  gap: 1.25rem;
  padding: 4.5rem var(--gutter);
  text-align: center;
}

/* Birinchi bo‘lim til tugmasi va yuqori hoshiya ostidan boshlanadi. */
.sheet :deep(.section:first-child) {
  padding-top: 8rem;
}

@media (min-width: 600px) {
  .sheet {
    border-inline: 1px solid var(--c-line);
  }
}
</style>
