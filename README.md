# Brijesh Lakhiya — Photographer Portfolio

A dark, cinematic single-page portfolio for **Brijesh Lakhiya** (`@brie_o_graphy`), a Toronto-based photographer & reel creator. Built as a reusable template chassis, currently skinned with Brijesh's content.

**Live:** https://portfolio-template-beige-five.vercel.app

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Build | Vite 5 |
| Framework | React 18 + TypeScript (strict) |
| Styling | Tailwind CSS 3.4 |
| Animation | Framer Motion 12 |
| Font | Kanit (Google Fonts) |
| Hosting | Vercel |

No backend — fully static SPA.

---

## Features

### Hero
- **Split layout** — heading + tagline + CTA on the left, 3D character on the right (stacks to character-over-text on mobile).
- **3D character** — Brijesh's photo converted to a Pixar-style 3D render (ChatGPT), background removed with `rembg`, served as a transparent PNG (`public/brijesh-3d.png`).
- **Three motion layers on the character:**
  - *Idle float* — perpetual gentle bob (all devices).
  - *Cursor magnet* — follows the pointer on desktop (`Magnet`, disabled on touch).
  - *Gyroscope tilt* — drifts with phone motion via `DeviceOrientationEvent` on mobile (`DeviceTilt`, requires HTTPS + iOS motion permission).
- **Instagram follow card** — floating bottom-right, slides up on load, blue "Follow" button, links to the real `@brie_o_graphy` profile. Avatar cropped from his actual IG profile photo.

### Sections
- **Marquee** — two rows of photography tiles scrolling opposite directions, tied to scroll position.
- **About** — character-by-character scroll-reveal bio (`AnimatedText`), decorative corner 3D icons.
- **Services** — 5 photography services (Wedding, Portrait, Event, Fashion/Editorial, Product & Brand) on a white panel with staggered fade-ins.
- **Projects** — 3 sticky-stacking project cards that scale as you scroll (Framer Motion `useScroll` + `useTransform`).

---

## Project Structure

```
src/
├── App.tsx                 # composes the 5 sections
├── index.css               # global reset, .hero-heading gradient, Kanit
├── components/
│   ├── ContactButton.tsx   # magenta gradient pill CTA
│   ├── LiveProjectButton.tsx
│   ├── FadeIn.tsx          # whileInView entrance wrapper
│   ├── Magnet.tsx          # cursor-follow (desktop only)
│   ├── DeviceTilt.tsx      # gyroscope tilt (mobile only)
│   ├── AnimatedText.tsx    # char-by-char scroll reveal
│   └── InstagramFollow.tsx # floating IG follow card
└── sections/
    ├── HeroSection.tsx
    ├── MarqueeSection.tsx
    ├── AboutSection.tsx
    ├── ServicesSection.tsx
    └── ProjectsSection.tsx
public/
├── brijesh-3d.png          # hero 3D character (transparent)
└── brie-avatar.jpg         # IG card avatar
```

---

## Local Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + vite build → dist/
npm run preview  # preview the production build
```

---

## Deployment

Hosted on Vercel. Manual deploy from the project root:

```bash
vercel --prod
```

To enable **auto-deploy on every push**, connect this repo in the Vercel dashboard (Project → Settings → Git).

> **Note:** the gyroscope tilt only works over HTTPS (Vercel) — motion sensors are blocked on plain `http://`, so it won't fire on the local dev server.

---

## Placeholder Content (to swap for real assets)

This started from a template and uses stand-in media until Brijesh's real work is dropped in:

- **Marquee tiles & project images** — Unsplash placeholders → replace with his actual shoots.
- **3D character** — regenerate from a better photo if desired (swap `public/brijesh-3d.png`).
- **Follower count** — `478 followers` is hardcoded in `InstagramFollow.tsx` (Instagram has no public no-auth API); bump it manually as it grows.
- **Project names** (Anaya & Rohan / Vogue Bombay / Kismet Coffee Co.) — placeholder; rename to real clients.

---

## Tuning Notes

- **Gyroscope feel:** `maxTranslate` (travel distance) and `sensitivity` (degrees of tilt for full travel) in `DeviceTilt.tsx`.
- **Idle float:** amplitude/duration in `HeroSection.tsx` (`animate={{ y: [0, -14, 0] }}`, 4s loop).
- **Palette:** near-black `#0C0C0C`, grey gradient heading `#646973 → #BBCCD7`, magenta CTA, IG-blue `#0095f6`.
