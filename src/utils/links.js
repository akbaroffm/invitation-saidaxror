import { weddingEnd, weddingStart } from './date.js'

// Yandex Go ning rasmiy veb-havolasi: ilova o‘rnatilgan bo‘lsa — ilovada,
// bo‘lmasa — do‘konda ochiladi. Boshlang‘ich nuqta mehmonning joylashuvi bo‘ladi.
const YANDEX_GO_TRACKING_ID = '1178268795219780156'

export function getMapLinks({ lat, lon }) {
  return {
    taxi: `https://3.redirect.appmetrica.yandex.com/route?end-lat=${lat}&end-lon=${lon}&appmetrica_tracking_id=${YANDEX_GO_TRACKING_ID}`,
    google: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
    yandex: `https://yandex.uz/maps/?pt=${lon},${lat}&z=17&l=map`,
  }
}

const toStamp = (date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
const escapeIcs = (text) => text.replace(/\\/g, '\\\\').replace(/[,;]/g, (m) => `\\${m}`).replace(/\n/g, '\\n')

/**
 * Apple qurilmalarida .ics fayl (Taqvim ilovasi o‘zi ochadi), boshqalarida —
 * Google Calendar havolasi (Android’da ilovada ochiladi).
 */
export function getCalendarLink({ title, location, reminder }) {
  const isApple = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)

  if (isApple) {
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//wedding-invitation//UZ',
      'BEGIN:VEVENT',
      `UID:${toStamp(weddingStart)}-wedding@invitation`,
      `DTSTAMP:${toStamp(new Date())}`,
      `DTSTART:${toStamp(weddingStart)}`,
      `DTEND:${toStamp(weddingEnd)}`,
      `SUMMARY:${escapeIcs(title)}`,
      `LOCATION:${escapeIcs(location)}`,
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      `DESCRIPTION:${escapeIcs(reminder)}`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')
    return { href: `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`, download: 'toy.ics' }
  }

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${toStamp(weddingStart)}/${toStamp(weddingEnd)}`,
    location,
  })
  return { href: `https://calendar.google.com/calendar/render?${params}`, download: null }
}
