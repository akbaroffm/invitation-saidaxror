<script setup>
import { computed } from 'vue'
import CoverFace from './CoverFace.vue'
import { coupleNames, t } from '../i18n.js'

defineProps({
  /** true — muhr tushib, eshik ochilmoqda. */
  opening: { type: Boolean, default: false },
})

defineEmits(['open'])

const initials = computed(() => coupleNames.value.map((name) => name.charAt(0)))
const accessibleName = computed(() => `${t.value.cover.openButton}: ${coupleNames.value.join(' & ')}`)
</script>

<template>
  <div class="cover" :class="{ 'is-opening': opening }">
    <button
      type="button"
      class="door"
      :aria-label="accessibleName"
      :aria-disabled="opening"
      @click="!opening && $emit('open')"
    >
      <span class="door__panel door__panel--left"><CoverFace /></span>
      <span class="door__panel door__panel--right"><CoverFace /></span>

      <!-- Muhr tavaqalar ustida turadi va ular bilan birga bo‘linmaydi -->
      <CoverFace variant="seal" class="door__seal-layer">
        <span class="seal">
          <span>{{ initials[0] }}</span>
          <span class="seal__amp">&amp;</span>
          <span>{{ initials[1] }}</span>
        </span>
        <span class="eyebrow door__hint">{{ t.cover.openButton }}</span>
      </CoverFace>
    </button>
  </div>
</template>

<style scoped>
/*
 * Ochilish ketma-ketligi (WeddingInvitation.vue dagi DOOR_OPEN_MS bilan mos):
 *   0 — 1.1s     muhr biroz ko‘tarilib, pastga tushib ketadi
 *   0.65 — 3.05s eshik tavaqalari ikki tomonga ochiladi
 */
.cover {
  --seal-duration: 1.1s;
  --door-delay: 0.65s;
  --door-duration: 2.4s;
  --door-ease: cubic-bezier(0.42, 0, 0.16, 1);

  position: fixed;
  inset: 0;
  z-index: 50;
}

.door {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  perspective: 1600px;
}

.door:focus-visible {
  outline-offset: -10px;
}

.is-opening .door {
  cursor: default;
}

/* Tavaqa — ekranning yarmi; ichidagi muqova ekran kengligida, shunda ikkala yarim birlashadi. */
.door__panel {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  overflow: hidden;
  backface-visibility: hidden;
  will-change: transform;
  transition: transform var(--door-duration) var(--door-ease) var(--door-delay);
}

.door__panel :deep(.face) {
  right: auto;
  width: 200%;
}

.door__panel--left {
  left: 0;
  transform-origin: left center;
}

.door__panel--right {
  right: 0;
  transform-origin: right center;
}

.door__panel--right :deep(.face) {
  right: 0;
  left: auto;
}

/* Tavaqalar uchrashgan joydagi ingichka chiziq */
.door__panel--left::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  width: 1px;
  background: rgba(168, 135, 90, 0.22);
}

/* Ochilayotgan tavaqa soyaga kiradi — hajm hissi */
.door__panel::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 3;
  background: var(--c-ink);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--door-duration) var(--door-ease) var(--door-delay);
}

.is-opening .door__panel--left {
  transform: rotateY(-108deg);
}

.is-opening .door__panel--right {
  transform: rotateY(108deg);
}

.is-opening .door__panel::before {
  opacity: 0.3;
}

.door__seal-layer {
  z-index: 4;
  pointer-events: none;
}

/* Oltin mum muhr */
.seal {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.15rem;
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  background: radial-gradient(circle at 34% 30%, #cfae78, #a8875a 58%, #87683f);
  box-shadow:
    0 8px 18px rgba(64, 44, 22, 0.28),
    inset 0 -3px 6px rgba(0, 0, 0, 0.18);
  color: var(--c-ivory);
  font-family: var(--font-script);
  font-size: 1.9rem;
  line-height: 1;
  text-shadow: 0 1px 2px rgba(64, 44, 22, 0.45);
}

.seal::before {
  content: '';
  position: absolute;
  inset: 6px;
  border: 1px solid rgba(251, 248, 243, 0.45);
  border-radius: 50%;
}

.seal__amp {
  font-family: var(--font-serif);
  font-size: 0.5em;
  font-weight: 500;
}

.is-opening .seal {
  animation: seal-release var(--seal-duration) forwards;
}

.door__hint {
  transition: opacity 0.3s var(--ease);
}

.is-opening .door__hint {
  opacity: 0;
}

@keyframes seal-release {
  0% {
    transform: none;
  }
  35% {
    transform: translateY(-12%) scale(1.06);
    animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
  }
  100% {
    transform: translateY(110vh);
  }
}

@media (max-height: 640px) {
  .seal {
    width: 4.5rem;
    height: 4.5rem;
    font-size: 1.6rem;
  }
}
</style>
