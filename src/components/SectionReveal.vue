<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  as: { type: String, default: 'div' },
  /** Qo‘shni elementlarni ketma-ket ko‘rsatish uchun kechikish (ms). */
  delay: { type: Number, default: 0 },
})

const el = ref(null)
const isVisible = ref(false)
let observer = null

onMounted(() => {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      isVisible.value = true
      observer.disconnect()
    },
    { rootMargin: '0px 0px -8% 0px' },
  )
  observer.observe(el.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <component
    :is="props.as"
    ref="el"
    class="reveal"
    :class="{ 'is-visible': isVisible }"
    :style="props.delay ? { '--reveal-delay': `${props.delay}ms` } : null"
  >
    <slot />
  </component>
</template>
