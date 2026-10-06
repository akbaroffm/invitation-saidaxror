/**
 * Taklifnomaning yagona ma’lumot manbai.
 *
 * Yangi taklifnoma uchun faqat shu faylni tahrirlang va /public/music dagi
 * qo‘shiqni hamda /public/images/og-image.jpg (havola rasmi) ni almashtiring. index.html dagi meta teglar
 * build vaqtida shu fayldan (`defaultLocale` tili) olinadi — `seo` o‘zgarsa,
 * dev serverni qayta ishga tushiring.
 *
 * Shaxsiy taklif: havola oxiriga `?m=Ism` qo‘shing, masalan
 *   https://sayt.uz/?m=Aziz%20aka   →  "Assalomu alaykum, hurmatli Aziz aka!"
 * Tilni havola orqali tanlash: `?lang=ru`.
 */
export const weddingData = {
  defaultLocale: 'uz',
  locales: [
    { code: 'uz', label: 'UZ' },
    { code: 'ru', label: 'RU' },
  ],

  // Ismlarning ko‘rsatilish tartibi (ismlarning o‘zi har til uchun `content` ichida).
  namesOrder: ['groom', 'bride'],

  // ISO 8601, to‘yxona joylashgan hududning UTC farqi bilan — boshqa vaqt
  // mintaqasidagi mehmonlar uchun ham orqaga sanoq to‘g‘ri ishlaydi.
  date: '2026-11-14T18:00:00+05:00',
  endDate: '2026-11-14T23:00:00+05:00',
  timeZone: 'Asia/Tashkent',

  venue: {
    // TODO: to‘yxonaning haqiqiy koordinatalari (Google Maps’da joyni bosib
    // turing — pastda "41.31, 69.27" ko‘rinishida chiqadi). Xarita va taksi
    // havolalari shulardan avtomatik yasaladi.
    coordinates: { lat: 41.3111, lon: 69.2797 },
  },

  // To‘yona uchun karta. `number` bo‘sh bo‘lsa, bo‘lim ko‘rsatilmaydi.
  giftCard: {
    // TODO: haqiqiy karta ma’lumotlari bilan almashtiring.
    number: '8600 0000 0000 0000',
    holder: 'KARTA EGASI ISMI',
    system: 'Uzcard',
  },

  music: {
    // Qo‘shiq faylini shu nom bilan public/music/ papkasiga joylang.
    // Fayl topilmasa, musiqa tugmasi ko‘rsatilmaydi.
    src: '/music/toylar-muborak.mp3',
    volume: 0.6,
  },

  seo: {
    // Sayt joylashtirilgach domenni yozing (masalan, 'https://saidaxror-sevara.uz'),
    // shunda Telegram va boshqa ilovalar havola rasmini to‘g‘ri ko‘rsatadi.
    siteUrl: '',
    // Telegram va boshqa ilovalarda havola bilan chiqadigan rasm (1200×630).
    ogImage: '/images/og-image.jpg',
  },

  // Har bir til uchun matnlar. {name} — mehmon ismi bilan almashtiriladi.
  content: {
    uz: {
      groom: 'Saidaxror',
      bride: 'Sevara',
      languageLabel: 'Til',
      seo: {
        titleSuffix: 'Nikoh to‘yi taklifnomasi',
        description: 'Sizni nikoh to‘yimizga lutfan taklif etamiz — 14 noyabr 2026, soat 18:00.',
      },
      cover: {
        label: 'Taklifnoma',
        guestLabel: 'Hurmatli {name}',
        openButton: 'Taklifnomani ochish',
      },
      invitation: {
        greeting: 'Assalomu alaykum, qadrli mehmon!',
        guestGreeting: 'Assalomu alaykum, hurmatli {name}!',
        intro: 'Hayotimizdagi eng quvonchli kunni Siz bilan birga nishonlashni istaymiz.',
        text: 'Sizni nikoh to‘yimizga bag‘ishlangan tantanali oqshomimizga lutfan taklif etamiz.',
      },
      saveTheDate: {
        eyebrow: 'To‘y sanasi',
        timePrefix: 'soat',
        countdownTitle: 'To‘ygacha qoldi',
        countdownLabels: { days: 'kun', hours: 'soat', minutes: 'daqiqa', seconds: 'soniya' },
        arrivedMessage: 'Bugun — to‘y kuni! ❤️',
        calendarButton: 'Kalendarga qo‘shish',
        calendarTitle: 'nikoh to‘yi',
        calendarReminder: 'Ertaga to‘y!',
      },
      venue: {
        eyebrow: 'Manzil',
        // TODO: haqiqiy to‘yxona nomi va manzili.
        name: 'To‘yxona nomi',
        address: 'Toshkent shahri, ko‘cha nomi, uy raqami',
        taxi: 'Taksi chaqirish',
        googleMaps: 'Google Maps',
        yandexMaps: 'Yandex Xarita',
      },
      gift: {
        eyebrow: 'To‘yona',
        text: 'To‘yona yo‘llamoqchi bo‘lsangiz, quyidagi karta raqamidan foydalanishingiz mumkin.',
        copy: 'Raqamdan nusxa olish',
        copied: 'Nusxa olindi',
      },
      closing: {
        message: 'Sizni to‘yimizda intizorlik bilan kutib qolamiz!',
        signature: 'Hurmat bilan,',
        // Ismlardan keyin chiqadi. Masalan, "Karimovlar va Rahimovlar oilasi" deb yozish mumkin.
        // Bo‘sh qoldirilsa, ko‘rsatilmaydi.
        hosts: 'va ularning ota-onalari',
      },
      music: {
        play: 'Musiqani yoqish',
        pause: 'Musiqani o‘chirish',
      },
    },

    ru: {
      groom: 'Сайдахрор',
      bride: 'Севара',
      languageLabel: 'Язык',
      seo: {
        titleSuffix: 'Приглашение на свадьбу',
        description: 'Приглашаем вас на нашу свадьбу — 14 ноября 2026, в 18:00.',
      },
      cover: {
        label: 'Приглашение',
        guestLabel: 'Приглашение · {name}',
        openButton: 'Открыть приглашение',
      },
      invitation: {
        greeting: 'Здравствуйте, дорогой гость!',
        guestGreeting: 'Здравствуйте, {name}!',
        intro: 'Мы хотим разделить с вами самый радостный день нашей жизни.',
        text: 'Приглашаем вас на торжественный вечер, посвящённый нашей свадьбе.',
      },
      saveTheDate: {
        eyebrow: 'Дата свадьбы',
        timePrefix: 'в',
        countdownTitle: 'До свадьбы осталось',
        countdownLabels: { days: 'дней', hours: 'часов', minutes: 'минут', seconds: 'секунд' },
        arrivedMessage: 'Сегодня — день нашей свадьбы! ❤️',
        calendarButton: 'Добавить в календарь',
        calendarTitle: 'свадьба',
        calendarReminder: 'Завтра свадьба!',
      },
      venue: {
        eyebrow: 'Место проведения',
        name: 'Название ресторана',
        address: 'г. Ташкент, улица, дом',
        taxi: 'Вызвать такси',
        googleMaps: 'Google Maps',
        yandexMaps: 'Яндекс Карты',
      },
      gift: {
        eyebrow: 'Подарок',
        text: 'Если вы хотите поздравить нас подарком, вы можете сделать перевод на карту.',
        copy: 'Скопировать номер',
        copied: 'Скопировано',
      },
      closing: {
        message: 'С нетерпением ждём вас на нашей свадьбе!',
        signature: 'С уважением,',
        hosts: 'и их родители',
      },
      music: {
        play: 'Включить музыку',
        pause: 'Выключить музыку',
      },
    },
  },
}
