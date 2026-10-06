<script setup>
import { computed } from 'vue'
import Countdown from './Countdown.vue'
import SectionReveal from './SectionReveal.vue'
import { weddingData } from '../data/wedding.js'
import { coupleNames, locale, t } from '../i18n.js'
import { getDateParts, getWeddingMonth } from '../utils/date.js'
import { getCalendarLink } from '../utils/links.js'

const dateParts = computed(() => getDateParts(locale.value))
const month = computed(() => getWeddingMonth(locale.value))

const calendar = computed(() =>
  getCalendarLink({
    title: `${coupleNames.value.join(' & ')} — ${t.value.saveTheDate.calendarTitle}`,
    location: `${t.value.venue.name}, ${t.value.venue.address}`,
    reminder: t.value.saveTheDate.calendarReminder,
  }),
)
</script>

<template>
  <section class="section" aria-labelledby="date-title">
    <SectionReveal as="h2" id="date-title" class="eyebrow">{{ t.saveTheDate.eyebrow }}</SectionReveal>

    <SectionReveal class="date">
      <time :datetime="weddingData.date" class="date__row">
        <span class="date__side">{{ dateParts.weekday }}</span>
        <span class="date__day">{{ dateParts.day }}</span>
        <span class="date__side">{{ dateParts.month }}</span>
      </time>
      <p class="date__meta">{{ dateParts.year }} · {{ t.saveTheDate.timePrefix }} {{ dateParts.time }}</p>
    </SectionReveal>

    <SectionReveal class="calendar" :delay="150">
      <p class="calendar__title">{{ month.title }}</p>
      <div class="calendar__grid" aria-hidden="true">
        <span v-for="weekday in month.weekdays" :key="weekday" class="calendar__weekday">{{ weekday }}</span>
        <span
          v-for="(day, i) in month.cells"
          :key="i"
          class="calendar__day"
          :class="{ 'is-highlighted': day === month.highlightedDay }"
        >{{ day }}</span>
      </div>
    </SectionReveal>

    <SectionReveal class="date__countdown" :delay="150">
      <p class="eyebrow">{{ t.saveTheDate.countdownTitle }}</p>
      <Countdown
        :target="weddingData.date"
        :labels="t.saveTheDate.countdownLabels"
        :arrived-message="t.saveTheDate.arrivedMessage"
      />
      <a
        class="btn date__calendar"
        :href="calendar.href"
        :download="calendar.download"
        :target="calendar.download ? undefined : '_blank'"
        rel="noopener noreferrer"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="3" y="4.5" width="18" height="16" rx="1.5" />
          <path d="M3 9.5h18M8 2.5v4M16 2.5v4M12 12.5v5M9.5 15h5" />
        </svg>
        {{ t.saveTheDate.calendarButton }}
      </a>
    </SectionReveal>
  </section>
</template>

<style scoped>
.date {
  display: grid;
  justify-items: center;
  gap: 0.5rem;
  width: 100%;
}

.date__row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;
  max-width: 24rem;
}

.date__side {
  padding-block: 0.55rem;
  border-block: 1px solid var(--c-line);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: var(--tracking-mid);
  text-transform: uppercase;
}

.date__day {
  padding-inline: 1.25rem;
  font-family: var(--font-serif);
  font-size: 4.75rem;
  font-weight: 300;
  line-height: 1;
}

.date__meta {
  font-family: var(--font-serif);
  font-size: var(--fs-lead);
  color: var(--c-ink-soft);
}

.calendar {
  width: 100%;
  max-width: 18rem;
  margin-top: 1rem;
}

.calendar__title {
  margin-bottom: 0.9rem;
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-style: italic;
}

.calendar__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 0.2rem;
  font-size: 0.8rem;
}

.calendar__weekday {
  padding-bottom: 0.4rem;
  font-size: 0.62rem;
  font-weight: 500;
  color: var(--c-gold-deep);
}

.calendar__day {
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  color: var(--c-ink-soft);
}

.calendar__day.is-highlighted {
  position: relative;
  color: var(--c-ink);
  font-weight: 500;
}

.calendar__day.is-highlighted::before {
  content: '';
  position: absolute;
  inset: 6%;
  border: 1px solid var(--c-gold);
  border-radius: 50%;
}

.date__countdown {
  display: grid;
  justify-items: center;
  gap: 1.25rem;
  width: 100%;
  margin-top: 1.5rem;
}

.date__calendar {
  margin-top: 0.75rem;
}
</style>
