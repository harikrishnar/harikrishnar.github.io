# About Page — Design Spec
**Date:** 2026-03-11
**Site:** hari-krishna.com/about

---

## Goal

A second page that gives someone who's just met Hari a richer picture of who he is and what he's built — tight, scannable, personal. Also serves potential collaborators assessing fit.

---

## Navigation

- Linked from the landing page as a third link alongside LinkedIn and Email, labelled **"About"**
- Also directly shareable as `hari-krishna.com/about`
- The about page has a **← hari-krishna.com** back link in the top-left

---

## Visual Style

Identical to `index.html`:
- White background (`#ffffff`), near-black text (`#111111`), amber accent (`#e67e00`)
- Ghost "HK" monogram bottom-right (`#f5f5f5`)
- Same CSS custom property token names, same dark mode support
- Same system font stack
- Same dark mode toggle (fixed top-right)
- Staggered entrance animations (same pattern as landing page)

---

## Layout

Single column, full-page centered layout. No navigation bar. Three sections separated by 1px horizontal rules, each with an amber all-caps label.

### Section 1 — Things I've built

Four projects, each displayed as:
- **Project name** (bold, `#111`, 14px) on its own line
- Description below (14px, `#666`, max-width 420px)
- Award/note in amber when applicable

**Projects (in order):**

1. **Logward**
   No-code logistics SaaS — built from zero, now used by shippers and freight forwarders across Europe.
   *CTPO, 2018–present* (amber)

2. **Teen Patti Gold**
   India's most-played card game on mobile — *#1 top grossing for over 2 years.* (amber) Scaled the engine and infrastructure at Moonfrog Labs alongside Ludo Club, Baahubali: The Game, and more.

3. **Marvel: Avengers Alliance**
   Built the combat engine for the mobile port at Disney Interactive — shipped on iOS and Android. One of Marvel's biggest social titles at the time.
   *Best Social Game — Video Game Awards 2012* (amber)

4. **Adobe Captivate**
   Worked on the world's leading eLearning tool at Adobe — built widgets and features across the product.

---

### Section 2 — Currently

> Running engineering and product at **Logward** — disrupting how freight forwarders and shippers manage their supply chains.

Secondary line (muted):
> Always open to conversations about logistics tech, product strategy, and what comes next.

---

### Section 3 — Beyond work

Four paragraphs, single block:

> Curious about almost everything.
>
> I'm drawn to understanding how things work: from the cosmos to the quiet patterns of everyday life. I tend to wander deep into physics, astronomy, spirituality, and the kinds of questions that don't have simple answers.
>
> I enjoy conversations that drift into unexpected territory, where ideas collide and the thinking matters as much as the conclusion.
>
> The rest of the time I'm usually somewhere with a camera in my hand, noticing the details most people walk past.

---

## Landing Page Change

Add a third link to `index.html` in the `.links` nav:

```html
<div class="sep" aria-hidden="true"></div>
<a class="link" href="/about">
  <span class="link-icon" aria-hidden="true"></span>
  About
</a>
```

---

## Technical Approach

- New file: `about.html` at repo root (served as `hari-krishna.com/about` via GitHub Pages)
- Self-contained: all CSS inline in `<style>`, same token structure as `index.html`
- Dark mode toggle: same `toggleTheme()` function, same SVG icons
- Entrance animations: same keyframes, staggered delays (back link → section 1 → rule → section 2 → rule → section 3)
- Mobile responsive: same `@media (max-width: 600px)` breakpoint, padding reduces to 24px sides
- No external dependencies

---

## Files to Change

| Action | File |
|--------|------|
| Create | `about.html` |
| Modify | `index.html` — add "About" as third link in `.links` nav |
