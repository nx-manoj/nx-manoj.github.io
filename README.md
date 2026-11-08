# Portfolio site

A static portfolio site for data-science roles. No framework, no build step, no dependencies — three HTML files plus assets, and a single-file version that works offline.

## What's here

```
├── index.html                    Home: hero, selected work, other projects, about, contact
├── work/
│   ├── bengaluru-housing.html    Case study: Bengaluru residential prices
│   └── india-air-quality.html    Case study: India air quality 2017–2023
├── portfolio.html                The whole site as ONE file (fonts and images inlined)
├── assets/
│   ├── fonts/                    Archivo 800 + Instrument Sans 400/500/600 (self-hosted)
│   └── img/                      Web-sized WebP charts, 248 KB total
└── .nojekyll                     Tells GitHub Pages to serve files as-is
```

`portfolio.html` is the entire site in one 600 KB file — open it by double-clicking, or email it to someone. The three-page version is what you deploy.

## Publish to GitHub Pages

**Option A — user site at `https://nx-manoj.github.io`** (recommended for a portfolio)

1. Create a public repo named exactly `nx-manoj.github.io`.
2. Upload the *contents* of this folder (not the folder itself) to the repo root.
3. Wait a minute, then open `https://nx-manoj.github.io`.

**Option B — project site at `https://nx-manoj.github.io/portfolio`**

1. Create a public repo named `portfolio`.
2. Upload the contents of this folder to the repo root.
3. Settings → Pages → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.
4. The site appears at `https://nx-manoj.github.io/portfolio`.

All links inside the site are relative, so both options work without editing anything.

## Editing

Everything is plain HTML with the CSS in a `<style>` block at the top of each file.

- **Text** — edit directly in `index.html` or the relevant file under `work/`.
- **Colours** — change the tokens at the top of the `<style>` block: `--accent` is the blue (`#2F6BFF`), `--ink` the near-black, `--rule` the hairline.
- **Images** — drop a replacement into `assets/img/` and point the `src` at it. Charts are WebP at 1500 px wide; that keeps the whole page under 250 KB.
- **Links** — the case-study buttons point at the project folders in
  [Machine-learning-projects](https://github.com/nx-manoj/Machine-learning-projects). If a project folder moves, update those `href`s.

If you change a case study page, regenerate the single-file version by rebuilding from the same source — otherwise `portfolio.html` drifts out of date. Easiest is to delete `portfolio.html` if you don't need it.

## The interactive chart

The home page carries one interactive element: a locality explorer showing median price per square foot for eight Bengaluru localities, with a toggle between the most expensive and most affordable.

- Bars are buttons, so they work by hover, click and keyboard tab; the detail line below updates and is announced to screen readers via `aria-live`.
- The eight "most expensive" bars are rendered into the HTML at build time, so the chart is readable with JavaScript switched off. The toggle and hover behaviour are the enhancement, not the content.
- Data lives in a small inline `window.LOC_DATA` object — 16 localities, four fields each. To change it, edit that object or rebuild from `locality_table.csv`.

## Motion

All animation is progressive enhancement and is skipped entirely when the visitor has `prefers-reduced-motion` set:

- Sections and cards fade and lift into view on scroll (IntersectionObserver, staggered 70 ms).
- The four hero statistics count up once, when they first enter the viewport.
- The nav condenses after 12 px of scroll; card thumbnails scale slightly on hover; bars animate their width.
- A `js` class on `<html>` gates every hidden-until-revealed state, so if the script fails or is blocked, everything renders visible. There is also a 2.5-second safety timer that reveals anything the observer missed.
- Chrome and Edge get cross-page fade transitions from the CSS `@view-transition` rule; other browsers simply navigate.

## Notes

- Type is self-hosted (Archivo + Instrument Sans, both open licence), so the site renders identically offline and online — no Google Fonts request, no layout shift.
- Responsive down to 360 px; the mobile nav drops the About link below 560 px, and the explorer switches to a compact three-column layout.
- Each page has a title, meta description and Open Graph tags for link previews.
- Contrast and type sizes are set for readability rather than decoration: body text 19 px, no text below 14 px.
