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

### Site-wide
- **Custom pointer** — an animated arrow cursor follows the mouse across the whole site (`Pointer`). Desktop only — disabled on touch devices.

### Sections
- **Gallery (Work)** — hover/tap-expand image strips: the active photo grows while the others collapse to thin slivers. Uses a flex-grow layout (active `flexGrow 8` vs `1`) so it fits any screen width — no horizontal scroll on mobile.
- **About** — bio with a word-by-word scroll-reveal (`ScrollReveal`): each word eases from blurred + dim to sharp + bright as you scroll, with a subtle settle rotation. Decorative corner 3D icons.
- **Services** — 5 photography services (Wedding, Portrait, Event, Fashion/Editorial, Product & Brand) on a white panel with staggered fade-ins.
- **Projects** — 3 sticky-stacking project cards that scale as you scroll (Framer Motion `useScroll` + `useTransform`).

---

## Project Structure

```
src/
├── App.tsx                 # composes the sections + site-wide Pointer
├── index.css               # global reset, .hero-heading gradient, Kanit
├── components/
│   ├── ContactButton.tsx   # magenta gradient pill CTA
│   ├── LiveProjectButton.tsx
│   ├── FadeIn.tsx          # whileInView entrance wrapper
│   ├── Magnet.tsx          # cursor-follow (desktop only)
│   ├── DeviceTilt.tsx      # gyroscope tilt (mobile only)
│   ├── ScrollReveal.tsx    # word-by-word blur/opacity scroll reveal
│   ├── Pointer.tsx         # custom animated cursor (desktop only)
│   └── InstagramFollow.tsx # floating IG follow card
└── sections/
    ├── HeroSection.tsx
    ├── GallerySection.tsx  # hover/tap-expand image gallery (Work)
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

Hosted on Vercel with **GitHub auto-deploy** — every push to `main` triggers a production build automatically.

Manual deploy is also available from the project root:

```bash
vercel --prod
```

> **Note:** the gyroscope tilt only works over HTTPS (Vercel) — motion sensors are blocked on plain `http://`, so it won't fire on the local dev server.

---

## Placeholder Content (to swap for real assets)

This started from a template and uses stand-in media until Brijesh's real work is dropped in:

- **Gallery & project images** — Unsplash placeholders → replace with his actual shoots.
- **3D character** — regenerate from a better photo if desired (swap `public/brijesh-3d.png`).
- **Follower count** — `478 followers` is hardcoded in `InstagramFollow.tsx` (Instagram has no public no-auth API); bump it manually as it grows.
- **Project names** (Anaya & Rohan / Vogue Bombay / Kismet Coffee Co.) — placeholder; rename to real clients.

---

## Tuning Notes

- **Gyroscope feel:** `maxTranslate` (travel distance) and `sensitivity` (degrees of tilt for full travel) in `DeviceTilt.tsx`; smoothing via the spring + `SMOOTHING` low-pass factor.
- **Idle float:** amplitude/duration in `HeroSection.tsx` (`animate={{ y: [0, -14, 0] }}`, 4s loop).
- **Gallery:** active strip vs collapsed ratio (`flexGrow 8` vs `1`) and which image opens by default (`useState(3)`) in `GallerySection.tsx`.
- **About reveal:** `baseOpacity`, `blurStrength`, `baseRotation` props on `<ScrollReveal>` in `AboutSection.tsx`.
- **Palette:** near-black `#0C0C0C`, grey gradient heading `#646973 → #BBCCD7`, magenta CTA, IG-blue `#0095f6`.
