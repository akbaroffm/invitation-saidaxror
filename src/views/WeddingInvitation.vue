<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import CoupleSection from '../components/CoupleSection.vue'
import DateSection from '../components/DateSection.vue'
import VenueSection from '../components/VenueSection.vue'
import GiftSection from '../components/GiftSection.vue'
import ClosingSection from '../components/ClosingSection.vue'
import MusicPlayer from '../components/MusicPlayer.vue'
import LanguageSwitch from '../components/LanguageSwitch.vue'
import { weddingData } from '../data/wedding.js'
import { t } from '../i18n.js'

const LOCK_CLASS = 'is-locked'

const isOpen = ref(false)
const musicPlayer = ref(null)
const hasGiftCard = Boolean(weddingData.giftCard.number)

const setScrollLock = (locked) => document.documentElement.classList.toggle(LOCK_CLASS, locked)

function openInvitation() {
  // Musiqa bosish ichida darhol boshlanadi — aks holda brauzer uni bloklaydi.
  musicPlayer.value?.autoplay()
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
    <div class="ornament" aria-hidden="true"><span /></div>
    <DateSection />
    <div class="ornament" aria-hidden="true"><span /></div>
    <VenueSection />
    <template v-if="hasGiftCard">
      <div class="ornament" aria-hidden="true"><span /></div>
      <GiftSection />
    </template>
    <div class="ornament" aria-hidden="true"><span /></div>
    <ClosingSection />
  </main>

  <Transition name="cover">
    <HeroSection v-if="!isOpen" @open="openInvitation" />
  </Transition>

  <LanguageSwitch />

  <MusicPlayer
    ref="musicPlayer"
    :src="weddingData.music.src"
    :volume="weddingData.music.volume"
    :labels="t.music"
    :visible="isOpen"
  />
</template>

<style scoped>
/* Bitta ustunli "qog‘oz" sahifa: telefonda to‘liq kenglik, kattaroq ekranda markazda. */
.sheet {
  max-width: var(--sheet-width);
  min-height: 100vh;
  min-height: 100svh;
  margin-inline: auto;
  background: var(--c-ivory);
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

/* Birinchi bo‘lim til tugmasi ostida qolmasligi uchun. */
.sheet :deep(.section:first-child) {
  padding-top: 5.5rem;
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
