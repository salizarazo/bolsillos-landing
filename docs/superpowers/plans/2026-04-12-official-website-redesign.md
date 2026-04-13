# Bolsillos.app Official Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the beta landing page at bolsillos.app with an official product page ready for App Store launch, including required legal pages (Privacy, Terms, Support).

**Architecture:** Static HTML/CSS/JS site hosted on GitHub Pages. Single-file `index.html` (home) + 4 HTML pages (privacy, terms, support, about). No build system — inline CSS, vanilla JS. Formspree for Android waitlist email capture.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox, clamp), vanilla JS, Google Fonts (Quicksand + Fredoka), GitHub Pages, Formspree free tier.

**Spec:** `docs/superpowers/specs/2026-04-12-official-website-redesign.md`

**Repo:** `/Volumes/SAL's SSD/Users/SAL's SSD/bolsillos-landing`

---

## File Structure

| File | Responsibility | Action |
|------|---------------|--------|
| `index.html` | Home page — all 10 sections (nav, hero, social proof, how it works, features, Bolo, pricing, FAQ, CTA/waitlist, footer) | Rewrite |
| `privacy.html` | Privacy Policy page | Create |
| `terms.html` | Terms of Service page | Create |
| `support.html` | Support/Contact page | Create |
| `about.html` | About Bolsillos page | Create |
| `CNAME` | Domain config | Keep (no changes) |
| `images/bolo_avatar.png` | Bolo mascot image | Keep (no changes) |
| `images/app-store-badge.svg` | Apple App Store download badge | Create (download from Apple) |
| `hero.jpg` | Old hero beach photo | Delete |

---

## Task 1: Setup — Clean old files and create base HTML structure

**Files:**
- Modify: `index.html` (full rewrite — keep only what's preserved from spec §13)
- Delete: `hero.jpg`

- [ ] **Step 1: Create a working branch**

```bash
cd "/Volumes/SAL's SSD/Users/SAL's SSD/bolsillos-landing"
git checkout -b redesign-official
```

- [ ] **Step 2: Delete the old hero image**

```bash
cd "/Volumes/SAL's SSD/Users/SAL's SSD/bolsillos-landing"
rm hero.jpg
```

- [ ] **Step 3: Write the new `index.html` with `<head>`, CSS custom properties, and empty `<body>` skeleton**

Replace the entire `index.html` with the new structure. This step writes the `<head>` (meta tags, fonts, SEO from spec §9), ALL CSS (from spec §3-§7), and the `<body>` skeleton with empty section containers.

The CSS must include all these rulesets:
- `:root` variables (spec §3 — same 14 tokens as current, keep `--crema-borde` and `--sombra` too)
- Reset (`* { box-sizing: border-box; margin: 0; padding: 0; }`)
- `body` (font-family Quicksand, color var(--texto), background var(--papel), line-height 1.7)
- `.nav` — sticky top, rgba(255,255,255,0.95), backdrop-filter blur(12px), border-bottom
- `.nav-inner` — max-width 960px (widened from 720), flex between
- `.nav-logo` — Fredoka 18px, verde-oscuro
- `.nav-links` — flex gap 24px, hidden below 768px
- `.nav-links a` — Quicksand 500, 14px, texto, no underline, hover azul
- `.nav-cta` — azul background, white text, Quicksand 700, 14px, padding 10px 20px, border-radius 10px, box-shadow
- `.nav-hamburger` — hidden above 768px, shown below, 28px button, 3 horizontal lines via spans
- `.nav-mobile-menu` — fullscreen overlay, hidden by default, flex column centered, links + CTA
- `.container` — max-width 960px, margin auto, padding 0 24px
- `.hero` — gradient background (cielo → cielo-claro → blanco), text-align center, padding 64px 24px 0
- `.hero h1` — Quicksand 700, clamp(32px, 6vw, 48px), azul-oscuro, max-width 600px, margin auto
- `.hero h1 em` — font-style normal, color verde-oscuro
- `.hero-sub` — 17px, #5C8A9E, max-width 520px, margin auto
- `.hero-ctas` — flex row centered, gap 16px, margin 28px auto
- `.hero-ctas .app-store-badge` — height 48px
- `.hero-ctas .android-link` — Quicksand 600, 14px, azul, underline
- `.hero-screenshots` — flex row centered, gap 20px, margin-top 40px, padding-bottom 20px
- `.hero-screenshot` — width 180px, height 360px, border-radius 20px, background gradient placeholder, box-shadow 0 12px 40px rgba(43,107,133,0.15)
- `.hero-screenshot.center` — width 200px, height 400px, z-index 2, transform translateY(-10px)
- `.hero-screenshot.left` — transform rotate(-3deg)
- `.hero-screenshot.right` — transform rotate(3deg)
- `.social-proof` — background white, text-align center, padding 24px
- `.social-proof-inner` — flex row centered, gap 32px, Quicksand 600, 14px, texto-hint
- `.section` — background white, padding 64px 24px
- `.section-alt` — background var(--papel), padding 64px 24px
- `.section-label` — Fredoka 500, 13px uppercase, azul, letter-spacing 2px, text-align center, margin-bottom 8px
- `.section h2` — Quicksand 700, 26px, azul-oscuro, text-align center, margin-bottom 8px, line-height 1.3
- `.section p` — max-width 580px, margin auto, 16px
- `.steps-grid` — display grid, grid-template-columns repeat(3, 1fr), gap 24px, max-width 780px, margin 32px auto
- `.step-card` — background white, border-radius 16px, padding 28px, box-shadow 0 2px 12px rgba(0,0,0,0.06), text-align center
- `.step-emoji` — font-size 32px, margin-bottom 12px
- `.step-card h3` — Quicksand 700, 18px, azul-oscuro, margin-bottom 8px
- `.step-card p` — Quicksand 400, 14px, texto-hint, line-height 1.6
- `.steps-dots` — text-align center, margin-top 20px, color azul, font-size 13px, Quicksand 600
- `.bolo-pill` — flex row, gap 12px, max-width 580px, margin 24px auto
- `.bolo-pill-avatar` — 36px circle, border 2px verde, flex-shrink 0
- `.bolo-pill-bubble` — background verde-claro, border-radius 4px 12px 12px 12px, padding 10px 16px, Fredoka 400 14px italic, verde-oscuro
- `.feature-row` — display flex, gap 48px, align-items center, max-width 960px, margin 0 auto 80px
- `.feature-row.reverse` — flex-direction row-reverse
- `.feature-img` — flex 1, min-width 0
- `.feature-screenshot` — width 100%, max-width 280px, aspect-ratio 9/19.5, border-radius 20px, background gradient placeholder, box-shadow 0 8px 30px rgba(43,107,133,0.12), margin 0 auto, display block
- `.feature-text` — flex 1, min-width 0
- `.feature-text h3` — Quicksand 700, 24px, azul-oscuro, margin-bottom 12px
- `.feature-text p` — Quicksand 400, 16px, texto, line-height 1.7
- `.bolo-section` — background linear-gradient(180deg, var(--verde-claro) 0%, var(--blanco) 100%), padding 64px 24px, text-align center
- `.bolo-avatar-large` — 120px circle, border 4px verde, box-shadow 0 6px 24px var(--sombra), margin 0 auto 20px
- `.bolo-section h2` — Fredoka 600, 24px, verde-oscuro, margin-bottom 12px
- `.bolo-section p` — Quicksand 400, 16px, max-width 480px, margin auto
- `.pricing-toggle` — flex row centered, gap 8px, margin 24px auto
- `.pricing-toggle button` — Quicksand 600, 14px, padding 8px 20px, border-radius 20px, border 2px solid var(--cielo), background transparent, cursor pointer
- `.pricing-toggle button.active` — background azul, color white, border-color azul
- `.pricing-toggle .badge` — Fredoka 500, 12px, background verde-claro, color verde-oscuro, padding 4px 10px, border-radius 10px
- `.pricing-grid` — display grid, grid-template-columns repeat(2, 1fr), gap 24px, max-width 700px, margin 32px auto
- `.pricing-card` — background white, border-radius 16px, padding 32px, position relative
- `.pricing-card.free` — border 1px solid #E8E3DB
- `.pricing-card.pro` — border 2px solid var(--azul)
- `.pricing-card .popular-badge` — position absolute, top 16px, right 16px, background azul, color white, Fredoka 500, 12px, padding 4px 12px, border-radius 10px
- `.pricing-card h3` — Quicksand 700, 22px, azul-oscuro, margin-bottom 4px
- `.pricing-price` — Quicksand 700, 32px, azul-oscuro, margin 8px 0
- `.pricing-price .per` — Quicksand 400, 14px, texto-hint
- `.pricing-price .sub` — display block, Quicksand 400, 14px, texto-hint
- `.pricing-features` — list-style none, margin 20px 0
- `.pricing-features li` — padding 6px 0, font-size 15px, display flex, gap 8px, align-items baseline
- `.pricing-features li::before` — content "✓", color verde, font-weight 700
- `.pricing-btn` — display block, width 100%, text-align center, padding 14px, border-radius 10px, Quicksand 700, 15px, text-decoration none
- `.pricing-btn.primary` — background azul, color white, box-shadow 0 3px 0 var(--azul-hover)
- `.pricing-btn.secondary` — background white, color azul, border 2px solid azul
- `.pricing-trial` — text-align center, font-size 13px, texto-hint, margin-top 12px
- `.faq` — max-width 680px, margin 32px auto
- `.faq-item` — border-bottom 2px dashed #E8E3DB, padding 20px 0
- `.faq-item:last-child` — border none
- `.faq-q` — Quicksand 700, 16px, azul-oscuro, cursor pointer, flex between, align-items center
- `.faq-q::after` — content "+", font-size 20px, azul, transition transform 0.2s
- `.faq-item.open .faq-q::after` — content "−"
- `.faq-a` — 15px, texto, margin-top 12px, display none, line-height 1.7
- `.faq-item.open .faq-a` — display block
- `.cta-final` — background linear-gradient(180deg, var(--cielo-claro) 0%, var(--blanco) 100%), padding 64px 24px, text-align center
- `.waitlist-form` — display flex, gap 8px, max-width 400px, margin 16px auto
- `.waitlist-form input` — flex 1, padding 12px 16px, border-radius 10px, border 1px solid #E8E3DB, Quicksand 400 15px, outline none
- `.waitlist-form input:focus` — border-color azul
- `.waitlist-form button` — padding 12px 20px, background azul, color white, border none, border-radius 10px, Quicksand 700 14px, cursor pointer
- `.waitlist-note` — 13px, texto-hint, margin-top 8px
- `.footer` — background var(--papel), padding 48px 24px
- `.footer-inner` — max-width 960px, margin auto, display grid, grid-template-columns 1fr 1fr 1fr, gap 32px
- `.footer-logo` — Fredoka 500, 16px, verde-oscuro, margin-bottom 16px, grid-column span 3
- `.footer-col h4` — Quicksand 700, 14px, azul-oscuro, margin-bottom 12px
- `.footer-col a` — display block, Quicksand 400, 14px, texto-hint, text-decoration none, margin-bottom 8px, hover azul
- `.footer-copy` — text-align center, 13px, texto-hint, margin-top 32px, grid-column span 3
- `.referral-banner` — same as current (position fixed, bottom, z-index 200, etc.)
- `.testimonials` — display none (placeholder, spec §11)
- Responsive: `@media (max-width: 768px)` — steps-grid 1 column, feature-row flex-column, pricing-grid 1 column (pro first via order:-1), footer-inner 1 column, nav-links hidden, hamburger shown
- Responsive: `@media (max-width: 480px)` — hero padding 32px 16px, sections 32px 16px, hero-screenshots wrap or scale down

The `<body>` should contain these empty/skeleton sections in order:
1. `<nav class="nav">` with logo + links + CTA + hamburger
2. `<section class="hero">` — empty for Task 2
3. `<div class="social-proof">` — empty for Task 2
4. `<section class="section-alt" id="como-funciona">` — empty for Task 3
5. `<section class="section" id="caracteristicas">` — empty for Task 4
6. `<section class="bolo-section">` — empty for Task 5
7. `<section class="section-alt" id="precios">` — empty for Task 6
8. `<section class="section" id="faq">` — empty for Task 7
9. `<section class="cta-final" id="android">` — empty for Task 7
10. `<footer class="footer">` — empty for Task 8
11. `<div class="referral-banner">` — copy from current
12. `<script>` — referral JS (copy from current), FAQ toggle, headline rotation, pricing toggle, hamburger menu, waitlist form

- [ ] **Step 4: Open in browser and verify**

```bash
open "/Volumes/SAL's SSD/Users/SAL's SSD/bolsillos-landing/index.html"
```

Expected: Page loads with nav bar visible (logo + links + CTA), correct fonts, correct background colors. All sections empty but present. No console errors.

- [ ] **Step 5: Commit**

```bash
cd "/Volumes/SAL's SSD/Users/SAL's SSD/bolsillos-landing"
git add -A
git commit -m "feat: scaffold new index.html with full CSS and empty sections"
```

---

## Task 2: Hero + Social Proof

**Files:**
- Modify: `index.html` — fill hero section and social proof bar

- [ ] **Step 1: Fill the hero section HTML**

Inside `<section class="hero">`, add:
- `<div class="container">`
- `<h1>` with `<span id="hero-rotate">Organiza tu plata</span>` — the JS will rotate this text
- `<p class="hero-sub">` with the subtitle text from spec §5.2
- `<div class="hero-ctas">` with App Store badge image (`images/app-store-badge.svg`, link to `#` for now as placeholder) + Android text link (`<a href="#android" class="android-link">Pronto en Android &rarr;</a>`)
- `<div class="hero-screenshots">` with 3 placeholder divs (class `hero-screenshot left/center/right`) — each shows a gradient + centered text "Budget" / "Home" / "Reportes"

- [ ] **Step 2: Fill the social proof bar HTML**

Inside `<div class="social-proof">`, add:
- `<div class="social-proof-inner">` with 3 `<span>` elements:
  - `⭐ 4.8 en App Store`
  - `·`
  - `50 fundadores activos`
  - `·`
  - `Hecha en Colombia 🇨🇴`

- [ ] **Step 3: Add hero headline rotation JS**

In the `<script>` at the bottom, add the rotation logic:

```javascript
// Hero headline rotation
(function() {
  var phrases = ['Organiza tu plata', 'Gasta sin culpa', 'Ahorra tranquilo'];
  var el = document.getElementById('hero-rotate');
  if (!el) return;
  var i = 0;
  setInterval(function() {
    el.style.opacity = '0';
    setTimeout(function() {
      i = (i + 1) % phrases.length;
      el.textContent = phrases[i];
      el.style.opacity = '1';
    }, 400);
  }, 3000);
})();
```

Add CSS for the fade: `#hero-rotate { transition: opacity 0.4s ease; }`

- [ ] **Step 4: Open in browser and verify**

Expected: Hero shows with rotating headline (fades between 3 phrases every 3s), subtitle, CTA buttons (badge placeholder + android link), 3 screenshot placeholders with gradients, social proof bar below.

- [ ] **Step 5: Commit**

```bash
cd "/Volumes/SAL's SSD/Users/SAL's SSD/bolsillos-landing"
git add index.html
git commit -m "feat: add hero section with rotating headline + social proof bar"
```

---

## Task 3: "Cómo funciona" section

**Files:**
- Modify: `index.html` — fill section id="como-funciona"

- [ ] **Step 1: Fill the "Cómo funciona" section HTML**

Inside the `<section class="section-alt" id="como-funciona">`, add:
- `<div class="container">`
- `<h2>Así de simple</h2>`
- `<div class="steps-grid">` with 3 `.step-card` divs, each containing:
  - `.step-emoji` div with 💰 / 📂 / 😌
  - `<h3>` with "Registra tu ingreso" / "Organiza en bolsillos" / "Gasta tranquilo"
  - `<p>` with description from spec §5.4 table (HTML-encode accents: `&aacute;` etc.)
- `<div class="steps-dots">1 · 2 · 3</div>`
- Bolo pill after the grid:
  - `<div class="bolo-pill">` with avatar img + bubble div
  - Text: "Bolo recomienda empezar con 5 bolsillos. No necesitas 47. Relax."

- [ ] **Step 2: Open in browser and verify**

Expected: 3 white cards in a row (mobile: stacked), dots below, Bolo pill at bottom. Cards have emoji, title, description. No border colors — clean white with subtle shadow.

- [ ] **Step 3: Commit**

```bash
cd "/Volumes/SAL's SSD/Users/SAL's SSD/bolsillos-landing"
git add index.html
git commit -m "feat: add 'cómo funciona' 3-step section with Bolo pill"
```

---

## Task 4: Features section (5 alternating blocks)

**Files:**
- Modify: `index.html` — fill section id="caracteristicas"

- [ ] **Step 1: Fill the features section HTML**

Inside `<section class="section" id="caracteristicas">`, add:
- `<div class="container">`
- `<span class="section-label">LO QUE PUEDES HACER</span>`
- 5 `.feature-row` divs (2nd and 4th get class `.reverse`), each containing:
  - `<div class="feature-img">` with a `<div class="feature-screenshot">` placeholder (gradient + label text)
  - `<div class="feature-text">` with `<h3>` + `<p>`

Content from spec §5.5 table:

| # | Class | Screenshot label | h3 | p |
|---|-------|-----------------|-----|---|
| 1 | feature-row | Budget | Cada peso tiene su bolsillo | Asigna tu plata apenas llega. Fijos, mercado, ahorro — todo separado antes de que te lo gastes sin darte cuenta. |
| 2 | feature-row reverse | Voz | Registra con tu voz | Di "Almuerzo en El Corral por $25.000" y listo. La app reconoce la tienda y asigna el bolsillo. |
| 3 | feature-row | Reportes | Entiende tu plata | Reportes claros: a dónde se va, cuánto ahorras, tu ritmo de gasto. Sin jerga financiera. |
| 4 | feature-row reverse | Metas | Metas que se cumplen | Vacaciones, moto, fondo de emergencia — ponle imagen y Bolsillos calcula cuánto apartar cada mes. |
| 5 | feature-row | Privacidad | 100% privada y local | Tu plata se queda en tu celular. Encriptada. Sin nube. Sin rastreo. Tu información es solo tuya. |

- [ ] **Step 2: Open in browser and verify**

Expected: 5 feature blocks alternating left/right. Desktop: screenshot placeholder on one side, text on the other. Mobile: stacked (screenshot top, text bottom). 80px spacing between blocks.

- [ ] **Step 3: Commit**

```bash
cd "/Volumes/SAL's SSD/Users/SAL's SSD/bolsillos-landing"
git add index.html
git commit -m "feat: add 5 alternating feature blocks with screenshot placeholders"
```

---

## Task 5: Bolo mascot section

**Files:**
- Modify: `index.html` — fill bolo-section

- [ ] **Step 1: Fill the Bolo section HTML**

Inside `<section class="bolo-section">`, add:
- `<img src="images/bolo_avatar.png" alt="Bolo, el chigüiro financiero de Bolsillos" class="bolo-avatar-large" width="120" height="120" loading="lazy">`
- `<h2>Conoce a Bolo</h2>`
- `<p>Tu chigüiro financiero personal. Te acompaña, te celebra, y de vez en cuando te recuerda que Excel no es un plan financiero.</p>`
- Bolo pill: `<div class="bolo-pill" style="justify-content:center;margin-top:20px;">` with avatar + bubble "Bolo organizó sus bellotas en bolsillos antes de que fuera cool. Ahora te enseña a ti."

- [ ] **Step 2: Open in browser and verify**

Expected: Green gradient background fading to white. Bolo avatar centered (120px circle, green border). Title in Fredoka. Description centered. Quote pill below.

- [ ] **Step 3: Commit**

```bash
cd "/Volumes/SAL's SSD/Users/SAL's SSD/bolsillos-landing"
git add index.html
git commit -m "feat: add Bolo mascot presentation section"
```

---

## Task 6: Pricing section with toggle

**Files:**
- Modify: `index.html` — fill section id="precios"

- [ ] **Step 1: Fill the pricing section HTML**

Inside `<section class="section-alt" id="precios">`, add:
- `<div class="container">`
- `<h2>Planes</h2>`
- Toggle: `<div class="pricing-toggle">` with 2 buttons (id `toggle-mensual` and `toggle-anual`, anual gets class `active`) + badge span "ahorras 2 meses"
- `<div class="pricing-grid">`
  - Card Gratis (`.pricing-card.free`):
    - `<h3>Gratis</h3>`
    - `<div class="pricing-price">$0/mes</div>`
    - `<ul class="pricing-features">`: 2 cuentas, 5 grupos de bolsillos, 50 transacciones/mes, Reportes básicos, Metas, Backup local
    - `<a href="#" class="pricing-btn secondary">Descargar</a>`
  - Card Pro (`.pricing-card.pro`):
    - `<span class="popular-badge">Popular</span>`
    - `<h3>Pro</h3>`
    - `<div class="pricing-price" id="pro-price">` — default shows annual: `$220.000<span class="per">/año</span><span class="sub">$18.333/mes</span>`
    - `<ul class="pricing-features">`: Todo lo de Gratis sin límites +, Cuentas y bolsillos ilimitados, Transacciones ilimitadas, Entrada por voz, Tu Año en Bolsillos, Iconos y temas, Backup en iCloud, Import desde YNAB
    - `<a href="#" class="pricing-btn primary">Prueba gratis</a>`
    - `<p class="pricing-trial" id="pro-trial">3 meses gratis con plan anual</p>`

- [ ] **Step 2: Add pricing toggle JS**

```javascript
// Pricing toggle
(function() {
  var btnMensual = document.getElementById('toggle-mensual');
  var btnAnual = document.getElementById('toggle-anual');
  var proPrice = document.getElementById('pro-price');
  var proTrial = document.getElementById('pro-trial');
  if (!btnMensual || !btnAnual) return;

  btnMensual.addEventListener('click', function() {
    btnMensual.classList.add('active');
    btnAnual.classList.remove('active');
    proPrice.innerHTML = '$20.000<span class="per">/mes</span>';
    proTrial.textContent = '15 días gratis con plan mensual';
  });
  btnAnual.addEventListener('click', function() {
    btnAnual.classList.add('active');
    btnMensual.classList.remove('active');
    proPrice.innerHTML = '$220.000<span class="per">/año</span><span class="sub">$18.333/mes</span>';
    proTrial.textContent = '3 meses gratis con plan anual';
  });
})();
```

- [ ] **Step 3: Open in browser and verify**

Expected: Two cards side-by-side. Toggle switches prices with correct values. "Popular" badge on Pro card. Anual selected by default showing $220.000/año. Clicking Mensual shows $20.000/mes. Trial text updates accordingly.

- [ ] **Step 4: Commit**

```bash
cd "/Volumes/SAL's SSD/Users/SAL's SSD/bolsillos-landing"
git add index.html
git commit -m "feat: add pricing section with monthly/annual toggle"
```

---

## Task 7: FAQ + CTA Final + Waitlist

**Files:**
- Modify: `index.html` — fill FAQ section and CTA/waitlist section

- [ ] **Step 1: Fill the FAQ section HTML**

Inside `<section class="section" id="faq">`, add:
- `<div class="container">`
- `<span class="section-label">PREGUNTAS FRECUENTES</span>`
- `<h2>Resolvemos tus dudas</h2>`
- `<div class="faq">` with 7 `.faq-item` divs (first one gets class `.open`)
- Each item: `<div class="faq-q" onclick="this.parentElement.classList.toggle('open')">` + `<div class="faq-a">`
- Questions and answers from spec §5.8 table (all 7, HTML-encode accents)

- [ ] **Step 2: Fill the CTA Final + Waitlist section HTML**

Inside `<section class="cta-final" id="android">`, add:
- `<div class="container">`
- `<h2>Tu plata merece un sistema que funcione</h2>`
- `<p>` subtitle: "No otro mes haciendo cálculos mentales. No otra hoja de Excel."
- App Store badge (same as hero, link to #)
- `<hr style="border:none;border-top:2px dashed #E8E3DB;margin:32px auto;max-width:200px;">`
- `<h3>` "¿Usas Android?"
- `<p>` "Déjanos tu correo y te avisamos apenas esté lista."
- `<form class="waitlist-form" action="https://formspree.io/f/FORM_ID" method="POST">` with email input + submit button "Avísame →"
  - Note: `FORM_ID` is a placeholder — user needs to create a Formspree form and replace this
- `<p class="waitlist-note">🔒 No spam. Solo el aviso de lanzamiento.</p>`
- Bolo pill: "Bolo dice: lo peor que puede pasar es que organices tu plata. Lo mejor... bueno, eso lo decides tú."

- [ ] **Step 3: Open in browser and verify**

Expected: FAQ accordion works (first open, click toggles). CTA section shows headline + App Store badge + separator + waitlist form. Form submits (will fail without real Formspree ID — that's expected).

- [ ] **Step 4: Commit**

```bash
cd "/Volumes/SAL's SSD/Users/SAL's SSD/bolsillos-landing"
git add index.html
git commit -m "feat: add FAQ accordion + CTA final with Android waitlist form"
```

---

## Task 8: Footer + Nav hamburger + Testimonials placeholder

**Files:**
- Modify: `index.html` — fill footer, add hamburger JS, add hidden testimonials

- [ ] **Step 1: Fill the footer HTML**

Inside `<footer class="footer">`, add:
- `<div class="footer-inner">`
- `<div class="footer-logo">~ bolsillos ~</div>`
- 3 `.footer-col` divs:
  - **Producto:** h4 + links (Características → #caracteristicas, Precios → #precios, Descargar iOS → #, Android (pronto) → #android)
  - **Legal:** h4 + links (Privacidad → privacy.html, Términos de Servicio → terms.html, Soporte → support.html)
  - **Contacto:** h4 + links (hola@bolsillos.app → mailto:, @bolsillos.app → https://instagram.com/bolsillos.app)
- `<p class="footer-copy">&copy; 2026 Bolsillos &middot; Hecho con 💚 en Colombia</p>`

- [ ] **Step 2: Add hamburger menu JS**

```javascript
// Hamburger menu
(function() {
  var btn = document.querySelector('.nav-hamburger');
  var menu = document.querySelector('.nav-mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', function() {
    var open = menu.style.display === 'flex';
    menu.style.display = open ? 'none' : 'flex';
    btn.classList.toggle('open', !open);
  });
  // Close menu on link click
  menu.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      menu.style.display = 'none';
      btn.classList.remove('open');
    });
  });
})();
```

- [ ] **Step 3: Add hidden testimonials placeholder**

Below the Bolo section and before Pricing, add:

```html
<!-- Testimonials (hidden until real quotes available) -->
<section class="section testimonials" style="display:none;">
  <div class="container">
    <span class="section-label">LO QUE DICEN NUESTROS USUARIOS</span>
    <h2>Historias reales</h2>
    <div class="testimonials-grid">
      <div class="testimonial-card">
        <div class="testimonial-quote">"[Testimonio aquí]"</div>
        <div class="testimonial-author">[Nombre] — <span>desde [fecha]</span></div>
      </div>
      <div class="testimonial-card">
        <div class="testimonial-quote">"[Testimonio aquí]"</div>
        <div class="testimonial-author">[Nombre] — <span>desde [fecha]</span></div>
      </div>
      <div class="testimonial-card">
        <div class="testimonial-quote">"[Testimonio aquí]"</div>
        <div class="testimonial-author">[Nombre] — <span>desde [fecha]</span></div>
      </div>
    </div>
  </div>
</section>
```

Add CSS for testimonials (even though hidden, ready when activated):
- `.testimonials-grid` — display grid, 3 columns, gap 24px
- `.testimonial-card` — background crema, border crema-borde, border-radius 16px, padding 24px
- `.testimonial-quote` — Quicksand 400, 15px, line-height 1.7, margin-bottom 12px
- `.testimonial-author` — Quicksand 700, 14px, azul-oscuro

- [ ] **Step 4: Open in browser and verify**

Expected: Footer shows 3 columns with correct links. Hamburger works on mobile (resize browser). Testimonials section is not visible. All footer links point to correct targets.

- [ ] **Step 5: Commit**

```bash
cd "/Volumes/SAL's SSD/Users/SAL's SSD/bolsillos-landing"
git add index.html
git commit -m "feat: add footer, hamburger menu, testimonials placeholder"
```

---

## Task 9: Privacy Policy page

**Files:**
- Create: `privacy.html`

- [ ] **Step 1: Create privacy.html**

Full HTML page with same `<head>` as index.html (same fonts, same CSS variables, same meta charset/viewport). Body contains:
- Same `<nav>` as index.html (but internal links point to `index.html#section`)
- `<main>` with class for prose styling (max-width 680px, margin auto, padding 64px 24px)
- `<h1>Política de Privacidad</h1>`
- `<p>Última actualización: 12 de abril de 2026</p>`
- Sections covering all points from spec §6.1:
  - Información que recopilamos (ninguna — todo es local)
  - Almacenamiento de datos (SQLCipher AES-256, en tu dispositivo)
  - Servicios de terceros (RevenueCat para pagos in-app — describir qué datos maneja)
  - Analytics y tracking (no usamos)
  - Backups (iCloud opcional, controlado por el usuario)
  - Cambios a esta política
  - Contacto: hola@bolsillos.app
- Same `<footer>` as index.html

CSS needed (add inline, or reuse from index): `.prose h1` — Quicksand 700, 32px, azul-oscuro. `.prose h2` — Quicksand 700, 20px, azul-oscuro, margin-top 32px. `.prose p, .prose li` — 16px, line-height 1.7. `.prose ul` — padding-left 20px, margin 12px 0.

- [ ] **Step 2: Open in browser and verify**

Expected: Page loads with nav, readable prose content, footer. Links back to home work.

- [ ] **Step 3: Commit**

```bash
cd "/Volumes/SAL's SSD/Users/SAL's SSD/bolsillos-landing"
git add privacy.html
git commit -m "feat: add privacy policy page (required for App Store)"
```

---

## Task 10: Terms of Service page

**Files:**
- Create: `terms.html`

- [ ] **Step 1: Create terms.html**

Same structure as privacy.html. Content from spec §6.2:
- `<h1>Términos de Servicio</h1>`
- `<p>Última actualización: 12 de abril de 2026</p>`
- Sections:
  - Aceptación de los términos
  - Descripción del servicio (app de organización financiera personal)
  - Uso personal y no comercial
  - La app no es asesoría financiera (disclaimer claro)
  - No garantizamos resultados financieros
  - Propiedad intelectual (Bolsillos, Bolo, marca)
  - Suscripciones y pagos (gestionados via App Store, Apple Terms aplican)
  - Cancelación y reembolsos (via Apple — link a https://support.apple.com/en-us/HT204084)
  - Limitación de responsabilidad
  - Modificaciones a los términos
  - Ley aplicable (República de Colombia)
  - Contacto: hola@bolsillos.app

- [ ] **Step 2: Open in browser and verify**

Expected: Same layout as privacy page. All sections present and readable.

- [ ] **Step 3: Commit**

```bash
cd "/Volumes/SAL's SSD/Users/SAL's SSD/bolsillos-landing"
git add terms.html
git commit -m "feat: add terms of service page (required for App Store)"
```

---

## Task 11: Support page

**Files:**
- Create: `support.html`

- [ ] **Step 1: Create support.html**

Same structure. Content from spec §6.3:
- `<h1>Soporte</h1>`
- Contact section: email hola@bolsillos.app with `<a href="mailto:hola@bolsillos.app">` (respuesta en menos de 48 horas)
- Link to FAQ: `<a href="index.html#faq">Preguntas frecuentes</a>`
- App info: Versión 1.0.0, disponible en iOS (iPhone)
- Cómo reportar un bug: email con descripción + modelo de iPhone + versión de iOS
- Cómo solicitar reembolso: link a Apple support (https://support.apple.com/en-us/HT204084)

- [ ] **Step 2: Open in browser and verify**

- [ ] **Step 3: Commit**

```bash
cd "/Volumes/SAL's SSD/Users/SAL's SSD/bolsillos-landing"
git add support.html
git commit -m "feat: add support/contact page (required for App Store)"
```

---

## Task 12: About page

**Files:**
- Create: `about.html`

- [ ] **Step 1: Create about.html**

Same structure. Content from spec §6.4:
- `<h1>Sobre Bolsillos</h1>`
- La historia: Por qué nació Bolsillos — frustración real con Excel, apps gringas que no entienden la quincena colombiana, ingresos variables de freelancers
- Quién soy: Sergio, colombiano, indie developer, fundador. Tono personal y cercano.
- Filosofía: local-first, privacidad primero. Tu plata no sale de tu celular.
- Bolo: el chigüiro zen que cuida tus bolsillos. Incluir `bolo_avatar.png`.
- Comunidad fundadora: 50 personas que ayudaron a construir la app desde cero.
- Visión: que organizar la plata se sienta tan natural como respirar.

- [ ] **Step 2: Open in browser and verify**

- [ ] **Step 3: Commit**

```bash
cd "/Volumes/SAL's SSD/Users/SAL's SSD/bolsillos-landing"
git add about.html
git commit -m "feat: add about page with founder story and Bolo"
```

---

## Task 13: App Store badge asset + final polish

**Files:**
- Create: `images/app-store-badge.svg`
- Modify: `index.html` — replace placeholder App Store links

- [ ] **Step 1: Download the Apple App Store badge**

Download the official "Download on the App Store" SVG badge in Spanish from Apple Marketing Resources. Save to `images/app-store-badge.svg`. If not downloadable via CLI, create a placeholder text link styled as a black pill button with "Descargar en el App Store" text.

- [ ] **Step 2: Replace all App Store badge placeholders in index.html**

Find all `<a href="#">` next to App Store badges in hero and CTA final sections. The `href` stays as `#` until the actual App Store URL is available — add a comment `<!-- TODO: Replace with App Store URL -->`.

- [ ] **Step 3: Add smooth scroll behavior**

Add to the CSS: `html { scroll-behavior: smooth; }`

This makes all `#section` links in the nav and footer scroll smoothly.

- [ ] **Step 4: Add the `.gitignore` entry for superpowers brainstorm files**

```bash
cd "/Volumes/SAL's SSD/Users/SAL's SSD/bolsillos-landing"
echo ".superpowers/" >> .gitignore
```

- [ ] **Step 5: Full visual review**

Open index.html in browser. Check:
- Nav: sticky, links scroll to sections, hamburger works on mobile (resize window to <768px)
- Hero: headline rotates, screenshots show placeholders, CTAs visible
- Social proof: centered text bar
- Cómo funciona: 3 cards + Bolo pill
- Features: 5 alternating blocks
- Bolo: avatar + text + quote
- Pricing: toggle works, both price states correct
- FAQ: accordion works, first item open
- CTA: App Store badge + waitlist form
- Footer: 3 columns, all links work
- Privacy/Terms/Support/About: all load, nav works, footer works

- [ ] **Step 6: Commit**

```bash
cd "/Volumes/SAL's SSD/Users/SAL's SSD/bolsillos-landing"
git add -A
git commit -m "feat: add App Store badge, smooth scroll, gitignore, final polish"
```

---

## Task 14: Merge and push

- [ ] **Step 1: Merge to main**

```bash
cd "/Volumes/SAL's SSD/Users/SAL's SSD/bolsillos-landing"
git checkout main
git merge redesign-official
```

- [ ] **Step 2: Push to GitHub (deploys to GitHub Pages)**

```bash
cd "/Volumes/SAL's SSD/Users/SAL's SSD/bolsillos-landing"
git push origin main
```

- [ ] **Step 3: Verify live site**

Wait 1-2 minutes for GitHub Pages to deploy. Open https://bolsillos.app and verify all sections load correctly.

---

## Post-Implementation Notes

**Assets still needed (user action):**
1. **Screenshots** — Use `app-store-screenshots` Claude Code skill to generate device-framed screenshots. Replace the gradient placeholders in hero + features.
2. **App Store URL** — Replace `<!-- TODO: Replace with App Store URL -->` with real URL after App Store approval.
3. **Formspree form** — Create a form at formspree.io, replace `FORM_ID` in the waitlist form action.
4. **Favicon** — Generate from app icon and add `<link rel="icon" href="images/favicon.png">` to all pages.
5. **OG image** — Create 1200x630px image for social sharing and add to `images/og-image.png`.
