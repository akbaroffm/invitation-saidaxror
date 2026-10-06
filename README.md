# Saidaxror & Sevara — Nikoh to‘yi taklifnomasi

Vue 3 (`<script setup>`), Vite va oddiy JavaScript’da yozilgan, telefon uchun mo‘ljallangan onlayn taklifnoma.

## Buyruqlar

```bash
npm install
npm run dev       # ishlab chiqish rejimi
npm run build     # production build → dist/
npm run preview   # tayyor buildni lokal ko‘rish
```

## Sozlash

Barcha ma’lumot va matnlar **`src/data/wedding.js`** faylida: ismlar, sana va vaqt mintaqasi, to‘yxona, xarita havolalari, musiqa, SEO. Komponentlar ichida to‘yga oid matn yo‘q.

Taklifnoma rasmsiz, to‘liq tipografik dizaynda (arka ramka, monogramma). Yagona rasm —
`public/images/og-image.jpg` (1200×630): havola Telegram va boshqa ilovalarda yuborilganda chiqadi.

Musiqa: qo‘shiq faylini `public/music/toylar-muborak.mp3` nomi bilan joylang. Fayl bo‘lmasa, musiqa tugmasi ko‘rinmaydi. Tez yuklanishi uchun 128 kbps MP3 tavsiya etiladi.

### Mehmonlarga yuborish

- **Shaxsiy havola:** oxiriga `?m=` va ismni qo‘shing — `https://sayt.uz/?m=Aziz aka`. Muqovada "Hurmatli Aziz aka", taklifda "Assalomu alaykum, hurmatli Aziz aka!" chiqadi. Telegram probelni o‘zi kodlaydi.
- **Til:** mehmon yuqoridagi UZ / RU tugmasi bilan almashtiradi (tanlov eslab qolinadi) yoki havolaga `?lang=ru` qo‘shing.
- **Musiqa:** mehmon pastki o‘ng burchakdagi tugma bilan o‘chiradi; o‘chirgan bo‘lsa, keyingi safar ham o‘zi yoqilmaydi.

### Ishga tushirishdan oldin

- `venue.coordinates` — to‘yxona koordinatalari; Google/Yandex xarita va "Taksi chaqirish" (Yandex Go) havolalari shulardan yasaladi.
- Har bir til uchun `content.uz` / `content.ru` dagi to‘yxona nomi, manzil va `closing.hosts`.
- `giftCard` — to‘yona kartasi raqami va egasi. `number` bo‘sh bo‘lsa, bo‘lim ko‘rinmaydi.
- `seo.siteUrl` ga domenni yozing — havola rasmi to‘g‘ri chiqishi uchun.
- `seo` o‘zgarsa, `npm run dev` ni qayta ishga tushiring (`index.html` meta teglari `vite.config.js` dagi plagin orqali `wedding.js` dan olinadi).

## Tuzilma

```
src/
├── components/  HeroSection (muqova), CoupleSection (taklif matni), DateSection,
│                Countdown, VenueSection, GiftSection (to‘yona), ClosingSection,
│                MusicPlayer, LanguageSwitch, SectionReveal
├── data/        wedding.js — yagona ma’lumot manbai
├── i18n.js      til (uz/ru), mehmon ismi (?m=)
├── utils/       date.js — sana va taqvim (uz/ru); links.js — xarita, taksi, kalendar havolalari
├── views/       WeddingInvitation.vue — sahifa va ochilish jarayoni
├── App.vue
├── main.js      shriftlar yuklanishini kutish (matn "sakramasligi" uchun)
└── style.css    dizayn tokenlari, tipografiya, tugmalar
```

## Mualliflik

Shriftlar: Cormorant Garamond va Jost — Google Fonts, SIL Open Font License.
