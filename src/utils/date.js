import { weddingData } from '../data/wedding.js'

// Oy va hafta kunlari nomlari qo‘lda berilgan: brauzerlarning 'uz' lokalni
// qo‘llab-quvvatlashi bir xil emas, bu esa har qanday qurilmada bir xil natija beradi.
const LOCALE_DATA = {
  uz: {
    // "14 noyabr" va "Noyabr 2026" uchun bir xil shakl.
    months: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'],
    monthsStandalone: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'],
    weekdays: ['yakshanba', 'dushanba', 'seshanba', 'chorshanba', 'payshanba', 'juma', 'shanba'],
    weekdaysShortMondayFirst: ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'],
  },
  ru: {
    // Rus tilida "14 ноября" (qaratqich) va "Ноябрь 2026" (bosh) shakllari farq qiladi.
    months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    monthsStandalone: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
    weekdays: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    weekdaysShortMondayFirst: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  },
}

export const weddingStart = new Date(weddingData.date)
export const weddingEnd = new Date(weddingData.endDate)

/** To‘yxona vaqt mintaqasidagi sana qismlari (raqamlar). */
function getZonedParts(date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: weddingData.timeZone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type) => parts.find((part) => part.type === type).value
  return {
    year: Number(get('year')),
    month: Number(get('month')),
    day: Number(get('day')),
    time: `${get('hour')}:${get('minute')}`,
  }
}

const zoned = getZonedParts(weddingStart)
const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1)

/** Masalan (uz): { weekday: 'shanba', day: 14, month: 'noyabr', year: 2026, time: '18:00', full: '14 noyabr 2026' } */
export function getDateParts(locale) {
  const names = LOCALE_DATA[locale]
  const month = names.months[zoned.month - 1]
  return {
    weekday: names.weekdays[new Date(Date.UTC(zoned.year, zoned.month - 1, zoned.day)).getUTCDay()],
    day: zoned.day,
    month,
    year: zoned.year,
    time: zoned.time,
    full: `${zoned.day} ${month} ${zoned.year}`,
  }
}

/** To‘y oyining taqvimi (hafta dushanbadan boshlanadi). */
export function getWeddingMonth(locale) {
  const names = LOCALE_DATA[locale]
  const { year, month, day } = zoned
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate()
  const leadingBlanks = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7

  return {
    title: `${capitalize(names.monthsStandalone[month - 1])} ${year}`,
    weekdays: names.weekdaysShortMondayFirst,
    highlightedDay: day,
    cells: [...Array(leadingBlanks).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)],
  }
}
