# Manoj Yeduvaka — portfolio site

A portfolio for a data scientist, themed on Apple's system palette: white canvas and ink in
light, pure black in dark, systemBlue for every action. Static HTML, one CSS file, two small
JS files. No framework, no build step, no external requests — fonts and images are
self-hosted, so the site renders identically offline and online.

This revision reworks the interface against Apple's Human Interface Guidelines: content
before chrome, one purpose per screen, a legible type scale, AA contrast, visible focus,
and touch targets that fit a finger.

```
├── index.html                  Home: hero, selected work, interactive chart, about, contact
├── work/
│   ├── bengaluru-housing.html  Case study 01 — Bengaluru residential prices
│   └── india-air-quality.html  Case study 02 — India air quality 2017–2023
├── preview.html                The home page in ONE file (fonts + images inlined) — open by double-click
├── assets/
│   ├── css/site.css            The whole design system in one file
│   ├── js/site.js              Sticky nav + the mobile menu disclosure
│   ├── js/home.js              The locality explorer
│   ├── fonts/                  Archivo 800 + Instrument Sans 400/500/600 (self-hosted)
│   ├── img/                    WebP charts, 248 KB total, plus portrait.jpg
│   └── Yeduvaka-Manoj-Chaandu-Resume.pdf   The CV, linked from the hero and the contact block
└── .nojekyll                   Tells GitHub Pages to serve files as-is
```

`preview.html` is the home page in a single self-contained file: double-click it to see the
design without deploying anything. Its case-study links only work when it sits inside the
folder, next to `work/`. It is generated from `index.html` — edit the source, not the preview.

## What changed, and why

| Was | Now | Reason |
|---|---|---|
| Full-screen 0–100 preloader, page-wipe transitions | Nothing; content paints immediately | A launch screen must never delay the thing the person came for |
| Custom cursor, magnetic buttons, wheel-hijacked smooth scroll | Native pointer, native scrolling | Never replace a platform behaviour to add flourish |
| Word-mask reveals on every heading | One short fade on the hero only | Motion should explain, not gate content |
| Headline at 96 px across six lines | One sentence, two lines at 58 px | The 3-second read has to land before the fold |
| 9–11 px uppercase mono labels at 3.76:1 | 12.5–14.5 px sentence case at 6:1+ | Legibility, and WCAG AA for text at any size |
| `--fg-3` used for body-adjacent labels | Raised to #8E8D96 (6.0:1) | Contrast is not a mood |
| Nav links vanished below 760 px | A Menu disclosure with 52 px rows | Remove access on small screens and the page loses its way around |
| Whole card was one link, focus state invisible | Title link + visible 2 px focus ring everywhere | Keyboard users need to see where they are |
| Contact headline was itself the mail link | Headline, then a labelled email action | The label should say what happens |
| Chart on a dark panel | Chart on the same off-white "paper" as every figure | Consistency: one treatment for data |
| Empty photo frame with a monogram | Photo slot appears only once `portrait.jpg` exists | No placeholder furniture |

## The theme

Two appearances, both from Apple's own values:

| | Light | Dark |
|---|---|---|
| Canvas | `#FFFFFF` | `#000000` |
| Card surface | `#FFFFFF` + hairline border | `#161617` |
| Ink | `#1D1D1F` | `#F5F5F7` |
| Secondary | `#424245` | `#A1A1A6` |
| Tertiary | `#6E6E73` | `#86868B` |
| Accent fill | `#0071E3` | `#0071E3` |
| Accent text | `#0066CC` | `#0A84FF` |
| Chart panel | `#F5F5F7` | `#F5F5F7` |

`#0071E3` is Apple's marketing blue (the "Buy" pill); `#0A84FF` is systemBlue in dark mode.
Both filled buttons and their labels are 4.7:1; every text token is 5:1 or better on its own
canvas. Do not swap in `#007AFF` for body text on white — it measures 4.0:1 and fails AA.

The page follows the OS appearance by default. The switch in the header writes
`data-theme="light|dark"` on `<html>` and remembers the choice in `localStorage`; an inline
script in `<head>` applies it before first paint so there is no flash. Delete the
`localStorage` key (or clear site data) to hand control back to the OS.

Everything is a token at the top of `site.css`: one block for light, and the same block twice
for dark (once behind `prefers-color-scheme`, once for the manual switch). Change a colour
there and it moves everywhere, in both appearances.

## The portrait

`assets/img/portrait.jpg` is in place: 3:4 at 600×800, 54 KB, cropped to head and shoulders
and graded to the site palette — neutral monochrome mapped from `--bg` to just under `--fg`,
with a soft vignette so the background reads as texture rather than scenery. That is what
makes an outdoor snapshot sit inside a dark editorial page.

To swap it, export a 3:4 crop at 600×800 or larger, keep it monochrome or near-monochrome,
and overwrite the same filename. The frame, the caption scrim and the layout need no changes.
If the file is ever missing, the photo block removes itself from the About column instead of
leaving an empty frame.

## The CV

`assets/Yeduvaka-Manoj-Chaandu-Resume.pdf` is linked from three places: the hero
("Download CV"), the contact block ("Download CV (PDF)") and the footer is left clean.
Replace the file with the same name and every link keeps working. If you rename it, update
the three `href`s in `index.html`.

## Publish to GitHub Pages

**Option A — user site at `https://nx-manoj.github.io`** (recommended for a portfolio)

1. Create a public repo named exactly `nx-manoj.github.io`.
2. Upload the *contents* of this folder (not the folder itself) to the repo root.
3. Wait a minute, then open `https://nx-manoj.github.io`.

**Option B — project site at `https://nx-manoj.github.io/portfolio`**

1. Create a public repo named `portfolio`.
2. Upload the contents to the repo root.
3. Settings → Pages → Source: *Deploy from a branch* → Branch `main`, folder `/ (root)` → Save.

Every link inside the site is relative, so both options work with no edits.

## Editing

- **Text** — edit directly in `index.html` or the relevant file under `work/`.
- **Colours** — the tokens sit at the top of `site.css`, in three blocks: light, dark
  (OS), dark (manual). `--accent` is the button fill, `--accent-text` the link blue,
  `--paper` the chart panel. Every text token meets AA on its canvas; check any new pair
  before shipping it.
- **Type** — six steps only: `--t-display`, `--t-h2`, `--t-h3`, `--t-body`, `--t-small`,
  `--t-micro`. Add a seventh size only if the design genuinely needs it.
- **Images** — drop a replacement into `assets/img/` and point the `src` at it.
  Charts are WebP at ~1500 px wide.
- **Links** — case-study buttons point at folders in
  [Machine-learning-projects](https://github.com/nx-manoj/Machine-learning-projects).
  If a folder moves, update those `href`s.

## The interactive chart

The home page carries the locality explorer: median price per square foot for eight
Bengaluru localities, with a toggle between the most expensive and most affordable.

- Bars are real `<button>` elements with `aria-pressed`, so pointer, touch and keyboard all work.
- The reading line is announced to screen readers through `aria-live="polite"`.
- Data lives in `window.LOC_DATA` at the foot of `index.html` — 16 localities, four fields each.

## Motion

Two things move: the hero settles in over 500 ms, and the nav picks up its background on
scroll. That is the whole motion layer. With `prefers-reduced-motion: reduce`, both stop.

## Notes

- Type is self-hosted, so there is no Google Fonts request and no layout shift.
- Responsive down to 320 px; the nav collapses to brand + Menu below 820 px.
- Touch targets are 44 px or taller (48 px for buttons).
- Focus is always visible: a 2 px accent ring with a 3 px offset.
- Every page has a title, meta description and Open Graph tags.
- Body text is 16–17.5 px at 10:1 contrast on the dark canvas; the accent is used for
  emphasis and structure, never as the only carrier of meaning.
- Charts sit on off-white "paper" panels by design — printed figures on a dark desk.
