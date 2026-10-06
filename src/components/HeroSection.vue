<script setup>
import { computed } from 'vue'
import { weddingData } from '../data/wedding.js'
import { coupleNames, fill, guestName, locale, t } from '../i18n.js'
import { getDateParts } from '../utils/date.js'

defineEmits(['open'])

const dateParts = computed(() => getDateParts(locale.value))
const label = computed(() => (guestName ? fill(t.value.cover.guestLabel, { name: guestName }) : t.value.cover.label))
</script>

<template>
  <div class="cover" role="dialog" aria-modal="true" aria-labelledby="cover-names">
    <div class="cover__arch">
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

        <button type="button" class="btn btn--solid cover__button" @click="$emit('open')">
          {{ t.cover.openButton }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cover {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  padding: calc(4.25rem + var(--safe-top)) 1.25rem calc(1.25rem + var(--safe-bottom));
  overflow-y: auto;
  background: var(--c-cream);
}

/* Bosma taklifnomadagidek arka: tashqi va ichki ingichka chiziq. */
.cover__arch {
  position: relative;
  display: flex;
  width: min(100%, 26rem);
  min-height: min(100%, 44rem);
  margin: auto;
  padding: 5rem 1.5rem 4rem;
  border: 1px solid var(--c-champagne);
  border-radius: 999px 999px 3px 3px;
  background: var(--c-ivory);
}

.cover__arch::before {
  content: '';
  position: absolute;
  inset: 7px;
  border: 1px solid rgba(176, 145, 95, 0.32);
  border-radius: inherit;
  pointer-events: none;
}

.cover__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;
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
  overflow-wrap: anywhere;
}

.cover__date {
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.cover__button {
  margin-top: 1rem;
  padding-inline: 1.75rem;
  white-space: nowrap;
}

/* Past ekranli telefonlar (masalan, iPhone SE) */
@media (max-height: 640px) {
  .cover__arch {
    padding-block: 3.75rem 2.5rem;
  }

  .cover__content {
    gap: 1.1rem;
  }

  .cover__names {
    font-size: 2.6rem;
  }
}

@media (min-width: 768px) {
  .cover__arch {
    width: min(100%, 30rem);
    padding-inline: 2.5rem;
  }
}
</style>
