<script setup>
import { computed } from 'vue'
import SectionReveal from './SectionReveal.vue'
import { weddingData } from '../data/wedding.js'
import { coupleNames, fill, guestName, t } from '../i18n.js'

const { images } = weddingData
const greeting = computed(() =>
  guestName ? fill(t.value.invitation.guestGreeting, { name: guestName }) : t.value.invitation.greeting,
)
</script>

<template>
  <section class="section" aria-labelledby="invitation-names">
    <SectionReveal as="figure" class="invitation__photo">
      <img
        :src="images.couple"
        :alt="t.invitation.imageAlt"
        :width="images.coupleWidth"
        :height="images.coupleHeight"
        decoding="async"
      />
    </SectionReveal>

    <SectionReveal as="p" class="invitation__greeting" :delay="150">{{ greeting }}</SectionReveal>
    <SectionReveal as="p" class="lead" :delay="250">{{ t.invitation.intro }}</SectionReveal>

    <SectionReveal as="h1" id="invitation-names" class="names" :delay="350">
      <span>{{ coupleNames[0] }}</span>
      <span class="names__amp">&amp;</span>
      <span>{{ coupleNames[1] }}</span>
    </SectionReveal>

    <SectionReveal as="p" class="lead" :delay="450">{{ t.invitation.text }}</SectionReveal>
  </section>
</template>

<style scoped>
.invitation__photo {
  width: min(100%, 15rem);
  aspect-ratio: 3 / 4;
  margin-bottom: 1rem;
  overflow: hidden;
  border-radius: 999px 999px 0 0;
  background: var(--c-cream);
}

.invitation__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 30%;
}

.invitation__greeting {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-style: italic;
  overflow-wrap: anywhere;
}
</style>
