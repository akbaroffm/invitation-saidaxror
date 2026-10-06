<script setup>
import { computed } from 'vue'
import SectionReveal from './SectionReveal.vue'
import { coupleNames, fill, guestName, t } from '../i18n.js'

const initials = computed(() => coupleNames.value.map((name) => name.charAt(0)))
const greeting = computed(() =>
  guestName ? fill(t.value.invitation.guestGreeting, { name: guestName }) : t.value.invitation.greeting,
)
</script>

<template>
  <section class="section" aria-labelledby="invitation-names">
    <SectionReveal class="monogram" aria-hidden="true">
      <span>{{ initials[0] }}</span>
      <span class="monogram__amp">&amp;</span>
      <span>{{ initials[1] }}</span>
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
/* Ikki halqali monogramma — rasm o‘rnida */
.monogram {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  width: 6.5rem;
  height: 6.5rem;
  margin-bottom: 1rem;
  border: 1px solid var(--c-champagne);
  border-radius: 50%;
  font-family: var(--font-serif);
  font-size: 2.1rem;
  font-style: italic;
  font-weight: 300;
  line-height: 1;
}

.monogram::before {
  content: '';
  position: absolute;
  inset: 5px;
  border: 1px solid rgba(176, 145, 95, 0.32);
  border-radius: 50%;
}

.monogram__amp {
  font-size: 0.55em;
  color: var(--c-gold);
}

.invitation__greeting {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-style: italic;
  overflow-wrap: anywhere;
}
</style>
