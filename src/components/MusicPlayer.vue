<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  volume: { type: Number, default: 0.6 },
  visible: { type: Boolean, default: true },
  labels: { type: Object, required: true },
})

const FADE_STEPS = 20
const FADE_DURATION_MS = 2000
const MUTED_STORAGE_KEY = 'invitation-music-muted'

const audio = ref(null)
const isPlaying = ref(false)
const isAvailable = ref(true)
let fadeTimer = null
let resumeWhenVisible = false

function readMuted() {
  try {
    return localStorage.getItem(MUTED_STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function saveMuted(muted) {
  try {
    localStorage.setItem(MUTED_STORAGE_KEY, muted ? '1' : '0')
  } catch {
    // Brauzer xotirasi yopiq — tanlov faqat shu safar amal qiladi.
  }
}

function fadeIn() {
  clearInterval(fadeTimer)
  const el = audio.value
  let step = 0
  // iOS dasturiy ovoz balandligini e’tiborsiz qoldiradi — u yerda ta’sir qilmaydi.
  el.volume = 0
  fadeTimer = setInterval(() => {
    step += 1
    el.volume = (props.volume * step) / FADE_STEPS
    if (step >= FADE_STEPS) clearInterval(fadeTimer)
  }, FADE_DURATION_MS / FADE_STEPS)
}

async function play() {
  if (!audio.value || !isAvailable.value) return
  try {
    await audio.value.play()
    fadeIn()
  } catch {
    isPlaying.value = false
  }
}

function pause() {
  clearInterval(fadeTimer)
  audio.value?.pause()
}

/**
 * Taklifnoma ochilganda chaqiriladi (foydalanuvchi bosishi ichida — autoplay
 * siyosati shuni talab qiladi). Mehmon avval musiqani o‘chirgan bo‘lsa, yoqilmaydi.
 */
function autoplay() {
  if (!readMuted()) play()
}

function toggle() {
  const willPlay = !isPlaying.value
  saveMuted(!willPlay)
  if (willPlay) play()
  else pause()
}

// Ilova fonga o‘tganda musiqa to‘xtaydi, qaytganda davom etadi.
function onVisibilityChange() {
  if (document.hidden && isPlaying.value) {
    resumeWhenVisible = true
    pause()
  } else if (!document.hidden && resumeWhenVisible) {
    resumeWhenVisible = false
    play()
  }
}

onMounted(() => document.addEventListener('visibilitychange', onVisibilityChange))

onBeforeUnmount(() => {
  clearInterval(fadeTimer)
  document.removeEventListener('visibilitychange', onVisibilityChange)
})

defineExpose({ autoplay })
</script>

<template>
  <audio
    ref="audio"
    :src="src"
    preload="none"
    loop
    @play="isPlaying = true"
    @pause="isPlaying = false"
    @error="isAvailable = false"
  />

  <Transition name="music">
    <button
      v-if="visible && isAvailable"
      type="button"
      class="music"
      :class="{ 'is-playing': isPlaying }"
      :aria-label="isPlaying ? labels.pause : labels.play"
      :title="isPlaying ? labels.pause : labels.play"
      :aria-pressed="isPlaying"
      @click="toggle"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M11 5 6 9H3v6h3l5 4V5Z" />
        <template v-if="isPlaying">
          <path d="M15.5 9a4.5 4.5 0 0 1 0 6" />
          <path d="M18.5 6a8.5 8.5 0 0 1 0 12" />
        </template>
        <path v-else d="m16 9.5 5 5m0-5-5 5" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.music {
  position: fixed;
  right: 1rem;
  bottom: calc(1rem + var(--safe-bottom));
  z-index: 40;
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  padding: 0;
  border: 1px solid var(--c-line);
  border-radius: 50%;
  background: rgba(251, 248, 243, 0.92);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  color: var(--c-ink-soft);
  transition:
    border-color 0.3s var(--ease),
    color 0.3s var(--ease);
}

.music.is-playing {
  border-color: var(--c-champagne);
  color: var(--c-gold-deep);
}

.music:hover {
  border-color: var(--c-gold);
}

.music svg {
  width: 1.2rem;
  height: 1.2rem;
}

.music-enter-active,
.music-leave-active {
  transition: opacity 0.6s var(--ease);
}

.music-enter-from,
.music-leave-to {
  opacity: 0;
}

@media (min-width: 1024px) {
  .music {
    right: 1.5rem;
    bottom: 1.5rem;
  }
}
</style>
