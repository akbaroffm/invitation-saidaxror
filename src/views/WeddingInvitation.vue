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

const isOpen = ref(false)
const hasGiftCard = Boolean(weddingData.giftCard.number)

const setScrollLock = (locked) => document.documentElement.classList.toggle(LOCK_CLASS, locked)

function openInvitation() {
  window.scrollTo(0, 0)
  isOpen.value = true
  setScrollLock(false)
}

onMounted(() => setScrollLock(true))
onBeforeUnmount(() => setScrollLock(false))
</script>

<template>
  <main class="sheet" :class="{ 'is-hidden': !isOpen }" :inert="!isOpen || undefined">
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

  <Transition name="cover">
    <HeroSection v-if="!isOpen" @open="openInvitation" />
  </Transition>

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
  /* Muqova to‘liq so‘ngach sahifa paydo bo‘ladi — ikki tasvir ustma-ust tushmaydi. */
  transition: opacity 0.9s var(--ease) 0.7s;
}

.sheet.is-hidden {
  opacity: 0;
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

.cover-leave-active {
  transition: opacity 0.7s var(--ease);
}

.cover-leave-to {
  opacity: 0;
}
</style>
