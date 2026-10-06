<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  /** `new Date()` qabul qiladigan qiymat, afzali vaqt farqi ko‘rsatilgan ISO 8601. */
  target: { type: [String, Number, Date], required: true },
  labels: { type: Object, required: true },
  arrivedMessage: { type: String, required: true },
})

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

const now = ref(Date.now())
const remaining = computed(() => Math.max(0, new Date(props.target).getTime() - now.value))
const hasArrived = computed(() => remaining.value === 0)

const units = computed(() => {
  const ms = remaining.value
  return [
    { key: 'days', value: Math.floor(ms / DAY) },
    { key: 'hours', value: Math.floor((ms % DAY) / HOUR) },
    { key: 'minutes', value: Math.floor((ms % HOUR) / MINUTE) },
    { key: 'seconds', value: Math.floor((ms % MINUTE) / SECOND) },
  ]
})

let timer = null

function stop() {
  clearInterval(timer)
  timer = null
}

function tick() {
  now.value = Date.now()
  if (hasArrived.value) stop()
}

onMounted(() => {
  tick()
  if (!hasArrived.value) timer = setInterval(tick, SECOND)
})

onBeforeUnmount(stop)

const pad = (value) => String(value).padStart(2, '0')
</script>

<template>
  <p v-if="hasArrived" class="countdown__arrived" role="status">{{ arrivedMessage }}</p>
  <div v-else class="countdown" role="timer" aria-live="off">
    <div v-for="unit in units" :key="unit.key" class="countdown__unit">
      <span class="countdown__value">{{ pad(unit.value) }}</span>
      <span class="countdown__label">{{ labels[unit.key] }}</span>
    </div>
  </div>
</template>

<style scoped>
.countdown {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  max-width: 24rem;
}

.countdown__unit {
  display: grid;
  justify-items: center;
  gap: 0.3rem;
}

.countdown__unit + .countdown__unit {
  border-left: 1px solid var(--c-line);
}

.countdown__value {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 1.7rem + 1.4vw, 2.5rem);
  font-weight: 400;
  line-height: 1;
  font-variant-numeric: tabular-nums lining-nums;
}

.countdown__label {
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: var(--tracking-mid);
  text-transform: uppercase;
  color: var(--c-ink-soft);
}

.countdown__arrived {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-style: italic;
}
</style>
