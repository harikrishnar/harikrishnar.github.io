# Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing minimal link page with a typographic, animated personal landing page for hari-krishna.com.

**Architecture:** Single self-contained `index.html` with all CSS and JS inline — no framework, no build step, no external dependencies. CSS custom properties handle dark/light theming. Vanilla JS (5 lines) handles the toggle.

**Tech Stack:** HTML5, CSS3 (custom properties, clamp, keyframe animations, background-image gradient trick), vanilla JS

---

## Chunk 1: Core structure, theming, and static layout

### Task 1: Rewrite index.html — skeleton with CSS variables and dark mode

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Open index.html and read current content**

Read `index.html` to understand what exists before overwriting.

- [ ] **Step 2: Rewrite index.html with the full page**

Replace the entire file with the following. This is the complete final implementation — all tasks in this plan are already incorporated here. Read through each section as you paste it and verify it matches the spec.

```html
<!doctype html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Hari Krishna</title>
  <meta name="description" content="Technology and Product leader. Versatile across SaaS, gaming, and desktop &amp; mobile software. Bangalore, India.">
  <meta property="og:title" content="Hari Krishna">
  <meta property="og:description" content="Technology and Product leader. SaaS, gaming, desktop &amp; mobile. 0→1 and 1→10.">
  <meta property="og:url" content="https://hari-krishna.com/">
  <meta name="robots" content="index,follow">
  <link rel="icon" type="image/png" href="favicon.png">
  <style>
    /* ── Tokens ── */
    :root {
      --bg:             #ffffff;
      --text:           #111111;
      --text-secondary: #555555;
      --text-muted:     #888888;
      --text-faint:     #bbbbbb;
      --accent:         #e67e00;
      --border:         #f0f0f0;
      --toggle-bg:      #f0f0f0;
      --toggle-icon:    #888888;
    }
    [data-theme="dark"] {
      --bg:             #0f0f0f;
      --text:           #f0f0f0;
      --text-secondary: #aaaaaa;
      --text-muted:     #666666;
      --text-faint:     #2a2a2a;
      --accent:         #e67e00;
      --border:         #1e1e1e;
      --toggle-bg:      #1e1e1e;
      --toggle-icon:    #666666;
    }

    /* ── Reset ── */
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    /* ── Base ── */
    html { font-size: 16px; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      transition: background 0.4s ease, color 0.4s ease;
    }

    /* ── Dark mode toggle ── */
    .toggle {
      position: fixed;
      top: 24px;
      right: 24px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--toggle-bg);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s ease;
      z-index: 10;
      opacity: 0;
      animation: fadeUp 0.5s ease 1.2s forwards;
    }
    .toggle:hover { background: var(--accent); }
    .toggle:hover svg { stroke: #fff; }
    .toggle svg {
      width: 18px;
      height: 18px;
      stroke: var(--toggle-icon);
      fill: none;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: stroke 0.3s ease;
    }
    .icon-sun  { display: none; }
    .icon-moon { display: block; }
    [data-theme="dark"] .icon-sun  { display: block; }
    [data-theme="dark"] .icon-moon { display: none; }

    /* ── Ghost monogram ── */
    .bg-monogram {
      position: fixed;
      bottom: -60px;
      right: -20px;
      font-size: clamp(200px, 30vw, 340px);
      font-weight: 900;
      color: var(--text-faint);
      letter-spacing: -14px;
      line-height: 1;
      user-select: none;
      pointer-events: none;
      transition: color 0.4s ease;
      opacity: 0;
      animation: fadeIn 1s ease 0.2s forwards;
    }

    /* ── Page content ── */
    .page {
      width: 100%;
      max-width: 760px;
      padding: 60px 64px;
      position: relative;
    }

    /* ── Label ── */
    .label {
      font-size: 11px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--accent);
      font-weight: 700;
      margin-bottom: 20px;
      opacity: 0;
      animation: fadeUp 0.5s ease 0.3s forwards;
    }

    /* ── Hero name ── */
    .name {
      font-size: clamp(48px, 9vw, 88px);
      font-weight: 900;
      letter-spacing: -3px;
      line-height: 0.9;
      color: var(--text);
      margin-bottom: 28px;
      display: inline-block;
      cursor: default;
      opacity: 0;
      animation: fadeUp 0.6s ease 0.45s forwards;
      transition: color 0.4s ease;
      /* Amber underline draw on hover */
      background-image: linear-gradient(var(--accent), var(--accent));
      background-repeat: no-repeat;
      background-size: 0% 4px;
      background-position: 0 100%;
      /* Animate background-size only after entrance animation completes */
      transition: background-size 0.3s ease;
    }
    .name:hover { background-size: 100% 4px; }

    /* ── Divider ── */
    .divider {
      height: 4px;
      background: var(--accent);
      border-radius: 2px;
      width: 0;
      margin-bottom: 24px;
      animation: expandWidth 0.5s ease 0.75s forwards;
    }

    /* ── Bio ── */
    .bio {
      font-size: 16px;
      line-height: 1.7;
      color: var(--text-secondary);
      max-width: 460px;
      margin-bottom: 16px;
      opacity: 0;
      animation: fadeUp 0.5s ease 0.9s forwards;
      transition: color 0.4s ease;
    }
    .bio strong { color: var(--text); font-weight: 600; }

    .bio-secondary {
      font-size: 15px;
      line-height: 1.7;
      color: var(--text-muted);
      max-width: 460px;
      margin-bottom: 40px;
      opacity: 0;
      animation: fadeUp 0.5s ease 1.0s forwards;
      transition: color 0.4s ease;
    }
    .bio-secondary strong { color: var(--text-secondary); font-weight: 600; }

    /* ── Links ── */
    .links {
      display: flex;
      gap: 20px;
      align-items: center;
      flex-wrap: wrap;
      opacity: 0;
      animation: fadeUp 0.5s ease 1.1s forwards;
    }
    .link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--text);
      text-decoration: none;
      padding-bottom: 3px;
      border-bottom: 2px solid var(--accent);
      transition: color 0.2s ease;
      min-height: 44px; /* touch target */
    }
    .link:hover { color: var(--accent); }
    .link-icon {
      width: 16px;
      height: 16px;
      background: var(--accent);
      border-radius: 3px;
      flex-shrink: 0;
    }
    .sep {
      width: 1px;
      height: 16px;
      background: var(--border);
    }

    /* ── Location ── */
    .location {
      margin-top: 44px;
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--text-faint);
      font-weight: 500;
      opacity: 0;
      animation: fadeUp 0.5s ease 1.2s forwards;
      transition: color 0.4s ease;
    }

    /* ── Animations ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes expandWidth {
      from { width: 0; }
      to   { width: 48px; }
    }

    /* ── Mobile ── */
    @media (max-width: 600px) {
      body { align-items: flex-start; overflow-y: auto; }
      .page { padding: 60px 24px 48px; }
      .bg-monogram { font-size: 160px; bottom: -20px; right: -10px; }
      .name { letter-spacing: -2px; }
      .bio, .bio-secondary { max-width: 100%; }
      .links { gap: 16px; }
    }
  </style>
</head>
<body>

  <!-- Dark mode toggle -->
  <button class="toggle" onclick="toggleTheme()" aria-label="Toggle dark mode">
    <svg class="icon-moon" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
    <svg class="icon-sun" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  </button>

  <!-- Background monogram -->
  <div class="bg-monogram" aria-hidden="true">HK</div>

  <!-- Main content -->
  <main class="page">
    <div class="label">Technology &amp; Product</div>

    <h1 class="name">HARI<br>KRISHNA</h1>

    <div class="divider" role="presentation"></div>

    <p class="bio">
      <strong>Technology and Product leader</strong> with a customer-first mindset.
      Versatile across <strong>SaaS, gaming,</strong> and <strong>desktop &amp; mobile</strong> —
      from the complexity of scale to the chaos of zero.
    </p>

    <p class="bio-secondary">
      I've taken products from <strong>0→1</strong> and scaled them through <strong>1→10</strong>
      — navigating the distinct challenges each stage demands,
      in startups and growth-stage companies alike.
    </p>

    <nav class="links" aria-label="Contact links">
      <a class="link" href="https://www.linkedin.com/in/harirkrishna/" target="_blank" rel="noopener">
        <span class="link-icon" aria-hidden="true"></span>
        LinkedIn
      </a>
      <div class="sep" aria-hidden="true"></div>
      <a class="link" href="mailto:harikrsna.r@gmail.com">
        <span class="link-icon" aria-hidden="true"></span>
        Email
      </a>
    </nav>

    <p class="location">Bangalore, India</p>
  </main>

  <script>
    function toggleTheme() {
      var html = document.documentElement;
      html.setAttribute('data-theme',
        html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
      );
    }
  </script>

</body>
</html>
```

- [ ] **Step 3: Verify the file was written correctly**

Open `index.html` in a browser (e.g. `open index.html` on macOS) and check:
- Page loads with white background, large bold "HARI KRISHNA" name
- Entrance animation plays on load (label → name → divider → bio → links)
- Ghost "HK" monogram visible bottom-right
- LinkedIn and Email links present and clickable

- [ ] **Step 4: Test dark mode toggle**

Click the circle button (top-right corner).
Expected: Page transitions to dark background (`#0f0f0f`), text goes light, amber accent stays, moon icon switches to sun icon.
Click again — should return to light mode.

- [ ] **Step 5: Test name hover**

Hover over "HARI KRISHNA".
Expected: Amber underline draws smoothly across the full name width. Text color does not change.

- [ ] **Step 6: Test entrance animation**

Hard-refresh the page (`Cmd+Shift+R`).
Expected: Elements animate in sequence — label, name, divider expands, bio paragraphs, links, toggle button.

- [ ] **Step 7: Test mobile layout**

Open browser DevTools, switch to a mobile viewport (e.g. iPhone 14, 390px wide).
Expected:
- Name scales down and remains readable
- Bio text reflows to full width
- No horizontal overflow or clipped content
- Dark mode toggle still reachable in top-right corner
- Links remain tappable

- [ ] **Step 8: Commit**

```bash
git add index.html
git commit -m "feat: redesign landing page with typographic layout, dark mode, and animations"
```

---

## Chunk 2: Cleanup legacy files

### Task 2: Remove unused legacy assets

**Files:**
- Delete: `js/device.js`
- Delete: `js/init.js`
- Delete: `js/jquery.easing.1.3.js`
- Delete: `js/jquery.localscroll-min.js`
- Delete: `js/jquery.scrollTo-min.js`
- Delete: `js/waypoints.min.js`
- Delete: `design/main.css`
- Delete: `design/ss-social/` (directory)
- Delete: `design/ss-standard/` (directory)

> **Note:** `design/i/` (contains SVGs) and `second/` (separate page) are intentionally kept.

- [ ] **Step 1: Verify index.html no longer references legacy files**

Search for any remaining references in the new index.html:

```bash
grep -n "jquery\|device.js\|init.js\|waypoints\|ss-social\|ss-standard\|main.css" index.html
```

Expected: no output (zero matches).

- [ ] **Step 2: Delete legacy JS files**

```bash
rm js/device.js js/init.js js/jquery.easing.1.3.js js/jquery.localscroll-min.js js/jquery.scrollTo-min.js js/waypoints.min.js
```

- [ ] **Step 3: Delete legacy CSS and font directories**

```bash
rm design/main.css
rm -r design/ss-social design/ss-standard
```

- [ ] **Step 4: Verify the js/ directory is now empty (or can be removed)**

```bash
ls js/
```

Expected: empty output. If empty, remove the directory:

```bash
rmdir js/
```

- [ ] **Step 5: Reload the page and verify it still works**

Open `index.html` in a browser and confirm no console errors about missing resources.
Open browser DevTools → Console — should be clean (no 404 errors).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove legacy jQuery, waypoints, and ss-font dependencies"
```

---

## Chunk 3: Gitignore and spec cleanup

### Task 3: Add .gitignore and ignore brainstorm artifacts

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Read the current .gitignore**

Read `.gitignore` to see what's there.

- [ ] **Step 2: Add .superpowers to .gitignore**

Append the following line to `.gitignore`:

```
.superpowers/
```

- [ ] **Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: ignore .superpowers brainstorm artifacts"
```
