<script setup>
import { weddingData } from '../data/wedding.js'
import { locale, setLocale, t } from '../i18n.js'
</script>

<template>
  <div class="language" role="group" :aria-label="t.languageLabel">
    <button
      v-for="option in weddingData.locales"
      :key="option.code"
      type="button"
      class="language__option"
      :class="{ 'is-active': locale === option.code }"
      :aria-pressed="locale === option.code"
      :lang="option.code"
      @click="setLocale(option.code)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
/* Telefonda sahifa tepasida turadi va aylantirganda ketadi — kontentni yopmaydi.
   Kompyuterda ustundan tashqarida bo‘lgani uchun qotib turadi. */
.language {
  position: absolute;
  top: calc(1rem + var(--safe-top));
  right: 1rem;
  z-index: 60;
  display: flex;
  padding: 3px;
  border: 1px solid var(--c-line);
  border-radius: 999px;
  background: rgba(251, 248, 243, 0.85);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}

.language__option {
  min-width: 2.75rem;
  min-height: 2.25rem;
  padding: 0 0.6rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--c-ink-soft);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  transition:
    background-color 0.3s var(--ease),
    color 0.3s var(--ease);
}

.language__option.is-active {
  background: var(--c-ink);
  color: var(--c-ivory);
}

@media (min-width: 1024px) {
  .language {
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
  }
}
</style>
