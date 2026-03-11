# Landing Page Redesign — Design Spec
**Date:** 2026-03-10
**Site:** hari-krishna.com

---

## Goal

Replace the current minimal link page with a distinctive, production-grade personal landing page that communicates Hari's professional identity at a glance.

---

## Visual Style

**Typographic** — large bold name as the hero element, white background, ghost monogram "HK" as a background texture element. No images required.

- **Background:** Pure white (`#ffffff`)
- **Text:** Near-black (`#111111`)
- **Accent:** Amber (`#e67e00`) — used for label, divider, link underlines, name hover
- **Ghost monogram:** `#f5f5f5` — large "HK" positioned bottom-right as a decorative layer
- **Dark mode:** Full CSS variable theme swap; background goes to `#0f0f0f`, text inverts, amber accent remains

---

## Layout & Content

Single-page, vertically centered layout. No navigation, no sections, no scroll.

### Content blocks (top to bottom):

1. **Amber label** — `"Technology & Product"` — small caps, letter-spaced, amber
2. **Hero name** — `HARI / KRISHNA` — very large (up to 88px), 900 weight, tight letter-spacing
3. **Amber divider** — 48px wide, 4px tall, rounded
4. **Primary bio** — One sentence establishing identity and domains:
   > *"Technology and Product leader with a customer-first mindset. Versatile across SaaS, gaming, and desktop & mobile — from the complexity of scale to the chaos of zero."*
5. **Secondary bio** — One sentence on startup scaling:
   > *"I've taken products from 0→1 and scaled them through 1→10 — navigating the distinct challenges each stage demands, in startups and growth-stage companies alike."*
6. **Links** — LinkedIn + Email, uppercase, amber underline, separated by a thin vertical rule
7. **Location** — `"Bangalore, India"` — small caps, faint, bottom

---

## Interactions

### Entrance animation
Staggered fade-up on load. Sequence:
- Ghost monogram fades in (0.2s delay)
- Label fades up (0.3s)
- Name fades up (0.45s)
- Divider expands width from 0 to 48px (0.75s)
- Primary bio fades up (0.9s)
- Secondary bio fades up (1.0s)
- Links fade up (1.1s)
- Location + dark mode toggle fade up (1.2s)

### Name hover
Amber underline draws across the full name width on hover using `background-image` gradient technique. Text color unchanged. Smooth 0.3s ease transition.

### Dark mode toggle
- Fixed position, top-right corner
- Circular button, 38px, `var(--toggle-bg)` background
- Moon icon in light mode → Sun icon in dark mode (SVG, no external dependency)
- On hover: background becomes amber, icon turns white
- Toggles `data-theme="dark"` on `<html>` element
- All colors transition smoothly via CSS variables (0.4s ease)

---

## Links

| Label | URL |
|-------|-----|
| LinkedIn | `https://www.linkedin.com/in/harirkrishna/` |
| Email | `mailto:harikrsna.r@gmail.com` |

---

## Technical Approach

- Single `index.html` file — no frameworks, no build step, no external CSS
- All styles inline in `<style>` block using CSS custom properties for theming
- No JavaScript dependencies — dark mode toggle is a single 5-line function
- Fonts: system font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`)
- Fully responsive via `clamp()` on font sizes
- Mobile-first layout: padding reduces on small screens, name scales down gracefully, links stack if needed
- Touch-friendly tap targets (min 44px) for links and dark mode toggle
- Remove all legacy JS files (jQuery, waypoints, easing, localscroll, device.js) — not needed
- Remove legacy CSS (`design/main.css`, ss-social, ss-standard font dependencies)

---

## Files to Change

| Action | File |
|--------|------|
| Rewrite | `index.html` |
| Remove (unused) | `design/main.css`, `design/ss-social/`, `design/ss-standard/` |
| Remove (unused) | `js/device.js`, `js/init.js`, `js/jquery.*.js`, `js/waypoints.min.js` |
| Keep | `CNAME`, `second/`, `design/i/` |
