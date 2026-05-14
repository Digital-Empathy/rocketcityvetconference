# Rocket City Vet Conference. Session Notes

## Project Summary
- **Client:** Alabama Veterinary Medical Association (AlVMA)
- **Event:** Rocket City Vet Conference. Annual one-day veterinary CE conference
- **Founder:** Dr. Rebecca Sweet
- **Location:** The West End hotel, Bridge Street Shopping Center, Huntsville, Alabama
- **Type:** Marketing / registration-support site (NOT a vet hospital site)
- **Tone:** Direct, specific, hospitality-driven, anti-corporate. No em-dashes anywhere on site.

## Project State
- **Fresh start as of 2026-05-14.** Previous build archived to `../Rocket City Vet Conference _archive_2026-05-14/` (never pushed to GitHub).
- 4 pages built end-to-end. Foundation in place. Ready for user review.

## 2026-05-14 (later) Polish pass — cinematic hero + body imagery
- **Cinematic full-bleed video hero on homepage.** Pexels video 8716442 (conference room atmosphere, 20s loop, ~3.6MB) auto-plays muted/looping behind the headline with a solid navy scrim (no gradient). Logo no longer shown in hero — it's already in the header. Hero now reads as "real event in motion."
- **Hero CTAs reordered.** Primary CTA is now `data-register` Register (pending-state aware via config.js); secondary is "See the 2027 conference."
- **Hero poster** for video fallback / before-load: `assets/img/photos/hero-poster.jpg` (Pexels 15448072, audience auditorium still).
- **Section banner on "Who It's For"** (navy section): `assets/img/photos/attendees-listening.jpg` (Pexels 8761550), full-width with `.section-banner` rounded-XL card treatment + drop shadow.
- **Vendor Hall callout card** got a top image: `assets/img/photos/vendor-hall.jpg` (Pexels 35138560, trade show floor). New `.card--with-image` + `.card__image` patterns for bleed-to-edge image at top of card.
- **Removed radial-gradient** from base `.hero` styles per [No Color Gradients] feedback. The cinematic hero uses two stacked flat semi-transparent navy scrims, not a gradient.
- All images optimized via `optimize-images.py` (max 1600px, JPEG 90).
- **Coverage chosen:** Light — 3 photos (per user pick). Why This Exists, the detail cards, Coming Back card, and closer stay text-led for now; can add more imagery later.

## 2026-05-14 (later still) — Motion + amenities pivot
- Tried three card variants (cream w/ numbers → chip+icon → medallion mosaic → twilight blue cards). All read as "grid of boxes." User asked for a different presentation entirely.
- **Final: stacked editorial ledger.** No boxes. `<ol class="ledger">` with each row a 2-col grid: small uppercase label (Seating / The Meal / Swag / Care Stations / For Parents / All Day) on the left, big Fraunces headline + coral rule + body on the right. Hairline dividers between rows. Feature row at the bottom is larger.
- **Hover rhythm:** label nudges right + turns coral, rule extends 44→96px and deepens red.
- **Copy stays verbatim from PDF.** Eyebrow labels are new meta-labels, not copy edits.
- **Legacy `.amenity` + `.card__chip` + `.card__icon-svg` CSS still in styles.css** but unused. Marked as legacy in CSS comment; can be cleaned out later.

## Top-tier polish moves (de-templating)
- **Logo text dropped** from header. Top-left is only the logo image now (now 84px desktop / 64px mobile).
- **Logo added to hero** above the tagline (140–220px, drop-shadow, fades in first).
- **Sticky nav fix:** `[data-include] { display: contents }` so the injected `<header>` sticks to body, not to the include wrapper.
- **Announcement marquee removed** (user said "feels like a political website"). CSS still in file but unused.
- **Section watermark** behind "Why this conference exists" — the RCVC logo (unmodified) at giant size + 7% opacity, partially off-screen.
- **Per-line hero headline reveal** — each line animates separately, coral underline draws under "Zero compromise." after the line lands.
- **Drop cap** on the founder origin paragraph (now Alfa Slab One, 4em coral).
- **Font correction:** Alfa Slab One was wrong — the logo wordmark is a chunky condensed **sans-serif** (vintage gothic), not a slab. Swapped to **Anton** (vintage Americana display sans, tall narrow bold). Anton matches the logo's proportions. h3 stays Inter bold. `.pull-quote` stays on Fraunces italic. Letter-spacing tuned to +0.005em, sizes bumped slightly for Anton's narrower glyphs. All 4 page font links updated.
- **Texture removed.** Paper-grain SVG noise was cheapening the look per user. Sections are clean flat color again.
- **Button visibility on dark:** cinema-ghost gets a semi-transparent fill; pending Register button gets dark-bg overrides so it doesn't vanish on the hero video.

## Section 5 (Coming Back + Vendor Hall) redesign
- Same problem as amenities: two side-by-side cards felt static. Pivoted to **`.feature-band`** — two stacked editorial split-bands. Each: image on one side (rounded, drop shadow, scales 1.04x on hover), text on the other (eyebrow + Fraunces h2 + coral rule that grows on hover + body + CTA), hairline between bands.
- Coming Back: text-left, image-right (new `conference-stage.jpg` from Pexels 9275222 — audience watching stage presentation).
- Vendor Hall: image-left (`.feature-band--reverse`), text-right (vendor-hall.jpg unchanged).
- Mobile: collapses to single column with image always above text.
- **Scroll-reveal system** wired in `includes.js` via `IntersectionObserver` with `rootMargin: 0 0 -10% 0` + `threshold: 0.12`. Adds `.is-visible` once, then unobserves. Falls back to instant show if no IO support.
- **Stagger pattern:** add `.reveal-stagger` to parent, `style="--i: 0..N"` to each child. CSS uses `transition-delay: calc(var(--i) * 90ms)`. Used on the 6 cards, "Who It's For" trio, and the 2 big callout cards.
- **Hero entrance animation** triggered by `body.is-ready`: scrim fades in, then tagline → h1 → lede → CTAs → meta cascade with 200-1000ms delays.
- **Horizon-stripe wipe-in:** each `<span>` band scales from `scaleX(0)` to `scaleX(1)` from left origin, staggered 50–450ms. Plays on `body.is-ready`.
- **Pull-quote hairlines draw** on `.is-visible`: width animates 0 → 48px.
- All motion respects `prefers-reduced-motion: reduce` via the existing media query at the bottom of styles.css (durations clamp to 0.01ms).

## Design System (locked + applied to all pages)

### Logo (derived from)
- `assets/img/logo/rcvc logo.png`
- Vintage 70s sunset / Saturn V Americana. Striped sun disc (cream / orange / coral / red / twilight blue), Saturn V rocket silhouette nodding to Huntsville's NASA legacy, dog + cat silhouettes, chunky condensed slab serif wordmark, brush script "Conference" sweep below.

### Typography
- **Display:** Fraunces (variable, opsz + SOFT axes). Used for all H1/H2/H3.
- **Script accent:** Caveat Brush. Used sparingly. One accent word per section max. Echoes the logo's "Conference" script.
- **Body / UI:** Inter (400, 500, 600, 700).

### Color tokens (CSS custom properties in `assets/css/styles.css`)
- `--sunset-cream` `#F4E8D0` (page bg)
- `--sunset-cream-soft` `#FBF5E8` (cards, lighter surfaces)
- `--sunset-orange` `#E89A4A` (accents, nav active)
- `--sunset-coral` `#D8514A` (primary CTA, script highlights)
- `--sunset-red` `#B83A3A` (hover deepening)
- `--twilight-blue` `#2D5B7C` (secondary dark, links)
- `--deep-navy` `#1B2C42` (text, dark sections)
- `--ink` `#0E1014` (deepest)

### Visual thread (the "immersive" continuity)
- **Horizon stripe component** (`.horizon-stripe`). 5 thin colored bands matching the logo's sunset disc. Used at every section-to-section transition and inside header/footer. This is the visual signature that ties every page together.

### Components
- **Header** (`components/header.html`). Sticky cream-glass nav. Logo + RCVC YEAR link + Sponsors + FAQ + register CTA. Mobile collapses to hamburger.
- **Footer** (`components/footer.html`). Navy. Logo + tagline ("you're worth it"), Explore column, Reach Rebecca column. Credits Digital Empathy in Caveat Brush.
- **Cards** (`.card`, `.card--feature`). Cream surfaces with soft border. Navy feature variant. No left borders.
- **Pull quote** (`.pull-quote`). Fraunces display, coral hairlines top + bottom.
- **FAQ accordion** (`<details>` + `<summary>`). Native, plus/minus toggle in coral, Fraunces summary text.
- **Email capture + sponsor inquiry + logo upload forms.** All inert (preventDefault) until backend wired.
- **Detail cards** on homepage. Numbered 01..06. The "all the things you didn't have to ask for" section.

### Voice rules
- NO em-dashes anywhere on site. Strictly enforced. Scrubbed even from internal comments.
- Copy is verbatim from `assets/01..04 - RCVC *.pdf`. No paraphrasing.
- "You're worth it" appears in footer tagline + homepage closer.
- Founder name surfaced as `{{founderName}}` / `{{founderFirst}}` for easy global update.

## File Structure
```
Rocket City Vet Conference/
├── index.html              7 sections: hero, why this exists, who it's for, detail cards x6, return + vendor hall, closing + email capture
├── conference.html         RCVC 2027 landing. 8 sections including basics, what you get, speakers placeholder, schedule shape, labs, vendor hall, travel
├── sponsors.html           6 sections including 2 forms (sponsor inquiry + logo upload)
├── faqs.html               4 FAQ groups, 18 questions total, accordion
├── components/
│   ├── header.html         Shared sticky nav with horizon stripe top border
│   └── footer.html         Shared dark navy footer with horizon stripe top divider
├── assets/
│   ├── css/styles.css      All design tokens + components (incl. cinematic hero, section-banner, card--with-image)
│   ├── js/
│   │   ├── config.js       Annual rotation: year, date, registerUrl, emails. {{key}} templating
│   │   └── includes.js     Loads components, walks tree for {{key}} replacement, marks active nav, handles register-pending state
│   ├── img/
│   │   ├── logo/rcvc logo.png
│   │   └── photos/
│   │       ├── hero-poster.jpg            Pexels 15448072  hero video fallback / poster
│   │       ├── attendees-listening.jpg    Pexels 8761550   "Who it's for" section banner
│   │       └── vendor-hall.jpg            Pexels 35138560  Vendor Hall callout card
│   ├── video/
│   │   └── hero-conference.mp4            Pexels 8716442   20s loop, full-bleed homepage hero
│   └── 01..04 - RCVC *.pdf copy source files
├── package.json            `npm start` runs `npx serve -p 4321`
├── .gitignore
└── session-notes.md
```

## Local Development
- **Site requires a local server** (uses `fetch` for header/footer includes; will not work via `file://`).
- Start: `cd "Claude Projects/Rocket City Vet Conference"; npm start`
- Or: `npx serve -p 4321`

## Annual Rotation (One File to Update)
Update `assets/js/config.js`. Every `{{key}}` on every page, including injected header/footer, gets templated:
- `year` (2027, 2028, ...)
- `date`, `dateShort` (when Rebecca confirms)
- `registerUrl`, `registerLabel`, `registerOpen` (flip to `true` when RSVPify is live)
- `contactEmail`, `sponsorEmail` (when Rebecca confirms)
- `founderName`, `founderFirst` (only if founder changes, very rarely)
- `sponsorCount2026` (update each year)

## Awaiting from User / Rebecca
- [ ] 2027 date (currently shows "Date to be announced")
- [ ] 2027 ticket price
- [ ] Real contact emails (currently placeholders `hello@rocketcityvetconference.com` and `sponsors@rocketcityvetconference.com`)
- [ ] RSVPify event URL once registration opens (then flip `registerOpen: true`)
- [ ] 2027 speaker lineup + headshots (placeholder cards on conference.html)
- [ ] 2027 lecture schedule (placeholder timeline on conference.html)
- [ ] Labs/workshops confirmation
- [ ] Parking + refund/transfer policy details
- [ ] Hotel block / discount code
- [ ] Real sponsor logos for the year-round grid
- [ ] Backend wiring for forms (email capture, sponsor inquiry, logo upload). All currently inert.

## Decisions Locked
- Logo-derived design system. Font: **Coustard 400** (vintage Americana slab serif) for all display headlines; Fraunces italic for `.pull-quote` via `--font-quote`; Inter for body + h3; Caveat Brush for script accents.
- Sunset color palette pulled directly from the logo's striped sun disc, not invented.
- No gradients (per user feedback).
- No left borders on cards (per user feedback).
- No paper-grain texture overlay (tried it; user said it cheapened the look).
- Section-to-section visual continuity via horizon-stripe component (per user "immersive" feedback).
- Global header/footer as shared includes (per user feedback).
- Vanilla HTML/CSS/JS. No build step. `config.js` + `includes.js` handles all dynamics.

## Current section pattern (homepage)
1. **Hero** — cinematic full-bleed video, navy scrim, per-line headline reveal, primary register CTA (with pending dark-bg overrides), pending "save the date" pill in header.
2. **Why this exists** — split layout: sticky uncropped logo (left) + body with dropcap + left-aligned pull-quote (right).
3. **Who it's for** — centered type-only declaration: eyebrow + big head + diamond ornament, then a **paired-columns manifesto** (I + II side-by-side with vertical hairline divider), "Bring your team" coda below an orange rule. (Was a 3-up card grid → was sticky-photo split → now paired-columns to differentiate from section 4's vertical ledger.)
4. **All the things you didn't have to ask for** — `.ledger`: vertical 2-col rows (small uppercase label left, big Coustard headline + coral rule + body right), compressed padding for shorter overall height.
5. **Coming back in {{year}}** — full-bleed image overlay, uniform 62% navy scrim, text positioned to the right.
6. **Vendor hall** — `.feature-band--reverse`: image-left, text-right split-band.
7. **Closer** — navy band, centered "You're worth a conference that thought of everything." + email capture form + FAQ secondary CTA.

## Header / footer state
- Header is **dark navy glass** (rgba(27,44,66,0.92), backdrop-blur) — flipped from cream-glass so the white logo + animal silhouettes show properly.
- Logo: 148px desktop / 92px mobile, header padding 0 (the logo's transparent margin gives the natural breathing room).
- Nav links cream-soft, orange hover + active state. Mobile drawer is also navy.
- Sticky fix: `[data-include] { display: contents }` so the injected `<header>` sticks to body, not the wrapper div.
- Pending Register pill is styled as a "save the date" stamp on dark backgrounds: transparent fill, orange outline, uppercase tracked text in orange, pulsing orange dot animation.
- Footer compressed (padding s-10/s-5 → s-6/s-3, gap s-8 → s-5, logo 180px → 132px).

## Open concerns / next session
- **User flagged 2026-05-14:** "it's nice but this is starting to feel like a political site/corp/someone running for office." Likely culprits to revisit: the chunky slab + Roman numerals + declarative voice may collectively read as campaign-y. Possible fixes: warmer/looser typography moment, hand-drawn or photographic flourishes, fewer hard rules + orange accents in succession, more hospitality and less manifesto.

## Pending Tasks
- User review of all 4 pages in browser at `localhost:4321`
- Fill in real content (date, emails, RSVPify URL, speakers, schedule) as Rebecca confirms
- Wire forms to backend (Netlify Forms? FormSubmit? Backend TBD)
- Add real sponsor logos when received
- GitHub repo + Vercel deploy (waiting on user "commit" trigger)
