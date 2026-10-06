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
/* Ingichka halqadagi monogramma */
.monogram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  width: 5.5rem;
  height: 5.5rem;
  margin-bottom: 0.75rem;
  border: 1px solid var(--c-champagne);
  border-radius: 50%;
  font-family: var(--font-script);
  font-size: 2rem;
  line-height: 1;
}

.monogram__amp {
  font-family: var(--font-serif);
  font-size: 0.5em;
  font-weight: 500;
  color: var(--c-gold);
}

.invitation__greeting {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-style: italic;
  font-weight: 500;
  overflow-wrap: anywhere;
}
</style>
