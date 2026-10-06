<script setup>
import SectionReveal from './SectionReveal.vue'
import sectionIcon from '../assets/decor/icon-rings.svg'
import { coupleNames, t } from '../i18n.js'
</script>

<template>
  <footer class="section closing">
    <SectionReveal as="img" :src="sectionIcon" alt="" width="40" height="40" class="section-icon" aria-hidden="true" />
    <SectionReveal as="p" class="lead closing__message">{{ t.closing.message }}</SectionReveal>
    <SectionReveal as="p" class="closing__signature" :delay="150">{{ t.closing.signature }}</SectionReveal>
    <SectionReveal as="p" class="names closing__names" :delay="250">
      <span>{{ coupleNames[0] }}</span>
      <span class="names__amp">&amp;</span>
      <span>{{ coupleNames[1] }}</span>
    </SectionReveal>
    <SectionReveal v-if="t.closing.hosts" as="p" class="closing__hosts" :delay="350">{{ t.closing.hosts }}</SectionReveal>
  </footer>
</template>

<style scoped>
.closing {
  padding-bottom: calc(5.5rem + var(--safe-bottom));
}

.closing__message {
  color: var(--c-ink);
}

.closing__signature {
  margin-top: 0.5rem;
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-style: italic;
  color: var(--c-ink-soft);
}

.closing__names {
  font-size: 3rem;
}

.closing__hosts {
  font-size: var(--fs-eyebrow);
  font-weight: 500;
  letter-spacing: var(--tracking-mid);
  text-transform: uppercase;
  color: var(--c-gold-deep);
}
</style>
