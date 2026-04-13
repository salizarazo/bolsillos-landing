# Bolsillos.app — Rediseño Página Oficial

**Fecha:** 2026-04-12
**Estado:** Aprobado
**Enfoque:** Híbrido (Calma de Calm + Alma de YNAB + Personalidad Bolo)

---

## 1. Resumen

Transformar bolsillos.app de landing page beta (reclutamiento de fundadores) a página oficial de producto para lanzamiento en App Store. Single-page home + 4 páginas secundarias. iOS como plataforma principal, waitlist para Android.

**Objetivos:**
- Página oficial lista para la URL de App Store Connect (Support URL + Privacy URL)
- Comunicar el valor de la app en <10 segundos (hero)
- Convertir visitantes en descargas (iOS) o registros de waitlist (Android)
- Transmitir calma, confianza y personalidad colombiana

---

## 2. Stack Técnico

- **Estructura:** HTML estático single-file (index.html) + 4 páginas HTML (privacy, terms, support, about)
- **CSS:** Inline en `<style>` (como la actual) — no necesita build system
- **JS:** Mínimo vanilla JS (headline rotativo, FAQ accordion, pricing toggle, waitlist form)
- **Hosting:** GitHub Pages (actual, se mantiene)
- **Dominio:** bolsillos.app (CNAME existente)
- **Fonts:** Google Fonts — Quicksand (400, 500, 600, 700) + Fredoka (400, 500, 600, 700)
- **Email waitlist:** Formspree (free tier, envía a hola@bolsillos.app) o form action mailto

---

## 3. Paleta de Colores (se mantiene)

| Token | Hex | Uso |
|-------|-----|-----|
| azul | #4FA5CF | CTAs, links, acentos |
| azul-hover | #3A7FA3 | Hover states |
| azul-oscuro | #2B6B85 | Headlines, títulos |
| verde | #8DB87C | Bolo, success states |
| verde-oscuro | #5A8A2F | Logo, Bolo caption |
| verde-claro | #F0F7E9 | Bolo pills background |
| crema | #FCF8E1 | Cards alternativas |
| cielo | #B8DFF0 | Bordes, hero gradient |
| cielo-claro | #E8F4FA | Hero gradient, fondos suaves |
| papel | #F5F3EE | Fondo secciones alternas |
| texto | #3D3D3D | Body text |
| texto-hint | #8B8B7D | Secondary text |
| blanco | #FFFFFF | Cards, nav |

---

## 4. Tipografía

| Elemento | Font | Weight | Tamaño | Color |
|----------|------|--------|--------|-------|
| Headlines (h1) | Quicksand | 700 | clamp(32px, 6vw, 48px) | azul-oscuro |
| Section titles (h2) | Quicksand | 700 | 26px | azul-oscuro |
| Section labels | Fredoka | 500 | 13px uppercase | azul |
| Feature titles (h3/h4) | Quicksand | 700 | 18-24px | azul-oscuro |
| Body | Quicksand | 400 | 16px | texto |
| Small/hints | Quicksand | 400 | 13-14px | texto-hint |
| Logo | Fredoka | 500 | 18px | verde-oscuro |
| Bolo quotes | Fredoka | 400 | 14px italic | verde-oscuro |

---

## 5. Estructura del Home (index.html)

### 5.1 Navigation (sticky)

- Barra fija top, `background: rgba(255,255,255,0.95)`, `backdrop-filter: blur(12px)`, borde inferior sutil
- **Izquierda:** Logo "~ bolsillos ~" (Fredoka, verde-oscuro) — link a top
- **Centro (desktop):** Características · Precios · Soporte — smooth scroll a secciones
- **Derecha:** Botón "Descargar" (azul, estilo nav-cta actual) — link a App Store
- **Mobile:** Hamburger menu con los mismos links + CTA
- Max-width: 960px (ampliado desde 720px actual para dar más aire)

### 5.2 Hero

- **Fondo:** Gradiente `cielo → cielo-claro → blanco` (como la actual)
- **Headline rotativo:** 3 frases con fade transition cada 3 segundos:
  1. "Organiza tu plata"
  2. "Gasta sin culpa"
  3. "Ahorra tranquilo"
  - Font: Quicksand 700, clamp(32px, 6vw, 48px), azul-oscuro
  - La palabra clave en verde-oscuro (como el `<em>` actual)
- **Subtítulo:** "La app de finanzas personales para freelancers e independientes en Colombia. Sin Excel. Sin complicaciones."
  - Font: Quicksand 400, 17px, #5C8A9E
  - Max-width: 520px, centrado
- **CTAs:**
  - Badge oficial App Store (imagen estándar Apple, negro) — link a App Store
  - Texto link "Pronto en Android →" — scroll a waitlist section
- **Screenshots:** 3 device mockups (Budget, Home, Reportes) flotando:
  - Centro: más grande (280px alto), ligeramente elevado
  - Laterales: más pequeños (240px alto), rotados ±3 grados
  - Sombra: `0 12px 40px rgba(43,107,133,0.15)`
  - Placeholder: rectángulos con gradiente + texto "Screenshot" hasta tener imágenes reales
- **Sin Bolo en el hero** (aparece después)
- Padding: 64px top, 0 bottom (screenshots sangran hacia la siguiente sección)

### 5.3 Social Proof Bar

- **Fondo:** Blanco
- **Layout:** Flex row centrado, gap 32px, padding 24px vertical
- **Contenido:** 3 items separados por `·`
  1. `⭐ 4.8 en App Store` (o rating real cuando exista)
  2. `50 fundadores activos`
  3. `Hecha en Colombia 🇨🇴`
- Font: Quicksand 600, 14px, texto-hint
- **Futuro:** Cuando haya press mentions, convertir en carrusel de logos

### 5.4 "Cómo funciona" — 3 pasos

- **Fondo:** Papel (#F5F3EE)
- **Título:** "Así de simple" — Quicksand 700, 26px, centrado
- **Layout:** 3 cards en grid (desktop: 3 columnas, mobile: stack)
- **Cards:**
  - Fondo blanco, border-radius 16px, sombra suave `0 2px 12px rgba(0,0,0,0.06)`
  - Sin bordes de color
  - Padding: 28px
  - Emoji grande arriba (32px): 💰 📂 😌
  - Título: Quicksand 700, 18px, azul-oscuro
  - Descripción: Quicksand 400, 14px, texto-hint. 2-3 líneas.

| Paso | Emoji | Título | Descripción |
|------|-------|--------|-------------|
| 1 | 💰 | Registra tu ingreso | Te llegó plata? Dile a la app cuánto y de dónde. |
| 2 | 📂 | Organiza en bolsillos | Cada peso tiene su lugar. Arriendo, mercado, ahorro, lo que quieras disfrutar. |
| 3 | 😌 | Gasta tranquilo | Lo que queda es tuyo de verdad. Sin culpa. |

- **Dots:** `1 · 2 · 3` centrado debajo, color azul, 13px
- **Bolo pill después:**
  - Avatar 36px + bubble verde-claro
  - "Bolo recomienda empezar con 5 bolsillos. No necesitas 47. Relax."

### 5.5 Features — 5 bloques alternados

- **Fondo:** Blanco
- **Título sección:** Label "LO QUE PUEDES HACER" (Fredoka 500, 13px uppercase, azul) + sin h2 (los features se explican solos)
- **Layout por feature:** Flex row, alternando imagen izquierda/derecha
  - Desktop: 50/50 split, gap 48px, max-width 960px
  - Mobile: Stack vertical (screenshot arriba, texto abajo)
  - Espacio vertical entre features: 80px
- **Screenshot:** Device frame placeholder (280px ancho), border-radius 20px, sombra suave
- **Texto:** Título (Quicksand 700, 24px, azul-oscuro) + Descripción (Quicksand 400, 16px, texto, 2-3 líneas max)

| # | Lado img | Título | Descripción |
|---|----------|--------|-------------|
| 1 | Izquierda | Cada peso tiene su bolsillo | Asigna tu plata apenas llega. Fijos, mercado, ahorro — todo separado antes de que te lo gastes sin darte cuenta. |
| 2 | Derecha | Registra con tu voz | Di "Almuerzo en El Corral por $25.000" y listo. La app reconoce la tienda y asigna el bolsillo. |
| 3 | Izquierda | Entiende tu plata | Reportes claros: a dónde se va, cuánto ahorras, tu ritmo de gasto. Sin jerga financiera. |
| 4 | Derecha | Metas que se cumplen | Vacaciones, moto, fondo de emergencia — ponle imagen y Bolsillos calcula cuánto apartar cada mes. |
| 5 | Izquierda | 100% privada y local | Tu plata se queda en tu celular. Encriptada. Sin nube. Sin rastreo. Tu información es solo tuya. |

### 5.6 Bolo — Mascota

- **Fondo:** Gradiente sutil verde-claro → blanco
- **Layout:** Centrado, sección compacta (~40vh max)
- **Avatar:** `bolo_avatar.png`, 120px, circular, borde 4px verde, sombra `0 6px 24px rgba(43,107,133,0.12)`
- **Título:** "Conoce a Bolo" — Fredoka 600, 24px, verde-oscuro
- **Descripción:** Quicksand 400, 16px, centrado, max-width 480px
  - "Tu chigüiro financiero personal. Te acompaña, te celebra, y de vez en cuando te recuerda que Excel no es un plan financiero."
- **Quote pill:**
  - "Bolo organizó sus bellotas en bolsillos antes de que fuera cool. Ahora te enseña a ti."

### 5.7 Pricing — Free vs Pro

- **Fondo:** Papel (#F5F3EE)
- **Título:** "Planes" — Quicksand 700, 26px, centrado
- **Toggle:** Pill con 2 estados (Mensual | Anual). Anual seleccionado por default.
  - Badge junto al toggle: "ahorras 2 meses" en verde-claro, Fredoka 500, 12px
  - Al cambiar: precio de Pro hace fade transition
- **Layout:** 2 cards side-by-side (desktop), stack (mobile, Pro primero)
- **Card Gratis:**
  - Fondo blanco, borde 1px #E8E3DB, border-radius 16px
  - Título: "Gratis" — Quicksand 700, 22px
  - Precio: "$0/mes" — Quicksand 700, 32px, azul-oscuro
  - Features (checkmark verde + texto):
    - 2 cuentas
    - 5 grupos de bolsillos
    - 50 transacciones/mes
    - Reportes básicos
    - Metas
    - Backup local
  - CTA: "Descargar" — botón secundario (borde azul, texto azul, fondo blanco)
- **Card Pro:**
  - Fondo blanco, borde 2px azul, border-radius 16px
  - Badge: "Popular" — pill azul arriba a la derecha
  - Título: "Pro" — Quicksand 700, 22px
  - Precio (mensual): "$20.000/mes" — Quicksand 700, 32px, azul-oscuro
  - Precio (anual): "$220.000/año" con subtexto "$18.333/mes"
  - Features:
    - Todo lo de Gratis, sin límites +
    - Cuentas y bolsillos ilimitados
    - Transacciones ilimitadas
    - Entrada por voz
    - Tu Año en Bolsillos (Year Recap)
    - Iconos y temas
    - Backup en iCloud
    - Import desde YNAB
  - CTA: "Prueba gratis" — botón primario (azul, texto blanco)
  - Subtexto: "15 días gratis con plan mensual · 3 meses gratis con plan anual"

### 5.8 FAQ

- **Fondo:** Blanco
- **Título:** Label "PREGUNTAS FRECUENTES" + h2 "Resolvemos tus dudas"
- **Layout:** Acordeón, max-width 680px, centrado
- **Estilo items:** Borde inferior dashed #E8E3DB, padding 20px vertical
- **Pregunta:** Quicksand 700, 16px, azul-oscuro. Click to toggle. Signo +/− a la derecha en azul.
- **Respuesta:** Quicksand 400, 15px, texto. Display none → block on open.
- **Primera pregunta abierta por default.**

| # | Pregunta | Respuesta |
|---|----------|-----------|
| 1 | ¿Es seguro usar Bolsillos con mi plata? | Bolsillos es 100% local — tu información financiera se queda en tu celular, encriptada con estándar bancario (AES-256). No se sube a la nube ni se comparte con nadie. Tu plata no se mueve de tu banco — la app solo te ayuda a organizarla visualmente. |
| 2 | Ya intenté con Excel y fallé. ¿Por qué esto funcionaría? | Porque Bolsillos hace el trabajo pesado por ti. En vez de abrir una hoja de cálculo, dices "Almuerzo en El Corral por $25.000" y la app registra tu gasto. Si ya has ido a El Corral antes, le asigna el bolsillo automáticamente. Solo das guardar y sigues con tu vida. |
| 3 | Soy freelancer con ingresos variables. ¿Funciona para mí? | Fue diseñada exactamente para eso. No importa si un mes facturas $2 millones y el siguiente $8. Bolsillos se adapta a lo que te entra y te ayuda a separar tus gastos fijos, seguridad social y ahorro antes de que te gastes lo que no debes. |
| 4 | ¿Puedo probar Pro gratis? | Sí. 15 días gratis con plan mensual, 3 meses gratis con plan anual. Cancelas cuando quieras desde la configuración de tu iPhone. |
| 5 | ¿Solo funciona en iPhone? | Por ahora sí. Android viene en camino — déjanos tu correo en la sección de abajo y te avisamos apenas esté lista. |
| 6 | ¿Qué pasa si pierdo mi celular? | Con backup en iCloud (Pro) tus datos se restauran en cualquier iPhone nuevo. Con plan gratis, puedes exportar backups manuales a Files. |
| 7 | ¿Se conecta con mi banco? | Todavía no. Por ahora el registro es manual o por voz. Cuando Colombia active Open Finance (esperado 2027), seremos los primeros en integrarlo — de forma privada y sin intermediarios. |

### 5.9 CTA Final + Waitlist Android

- **Fondo:** Gradiente cielo-claro → blanco (eco del hero)
- **Headline:** "Tu plata merece un sistema que funcione" — Quicksand 700, 26px, azul-oscuro, centrado
- **Subtítulo:** "No otro mes haciendo cálculos mentales. No otra hoja de Excel." — 16px, #5C8A9E
- **App Store badge:** Imagen estándar Apple (refuerzo del hero)
- **Separador:** `<hr>` dashed sutil
- **Waitlist Android:**
  - Título: "¿Usas Android?" — Quicksand 700, 18px
  - Subtítulo: "Déjanos tu correo y te avisamos apenas esté lista."
  - Form inline: `<input type="email" placeholder="tu@correo.com">` + botón "Avísame →"
  - Backend: Formspree (free tier) — envía submissions a hola@bolsillos.app
  - Nota: "🔒 No spam. Solo el aviso de lanzamiento." — 13px, texto-hint
- **Bolo pill cierre:**
  - "Bolo dice: lo peor que puede pasar es que organices tu plata. Lo mejor... bueno, eso lo decides tú."

### 5.10 Footer

- **Fondo:** Papel (#F5F3EE)
- **Logo:** "~ bolsillos ~" — Fredoka 500, verde-oscuro
- **Layout:** 3 columnas (desktop), stack (mobile)

| Producto | Legal | Contacto |
|----------|-------|----------|
| Características | Privacidad | hola@bolsillos.app |
| Precios | Términos de Servicio | @bolsillos.app (Instagram) |
| Descargar iOS | Soporte | |
| Android (pronto) | | |

- **Copyright:** "© 2026 Bolsillos · Hecho con 💚 en Colombia"
- Padding: 48px vertical

---

## 6. Páginas Secundarias

Todas comparten nav + footer del home. Contenido en prosa, max-width 680px, centrado.

### 6.1 Privacy Policy (`privacy.html`)

- Título: "Política de Privacidad"
- Fecha efectiva: [fecha de publicación]
- Contenido clave:
  - Datos almacenados localmente en el dispositivo (SQLCipher AES-256)
  - No recopilamos datos personales
  - No usamos analytics ni tracking
  - Único servicio externo: RevenueCat (procesamiento de pagos in-app)
  - No vendemos ni compartimos datos
  - Backups opcionales en iCloud (controlados por el usuario)
  - Contacto: hola@bolsillos.app

### 6.2 Terms of Service (`terms.html`)

- Título: "Términos de Servicio"
- Contenido clave:
  - Uso personal, no comercial
  - La app no es asesoría financiera
  - No garantizamos resultados financieros
  - Propiedad intelectual (Bolsillos, Bolo, marca)
  - Suscripciones gestionadas via App Store (Apple Terms aplican)
  - Cancelación y reembolsos via Apple
  - Limitación de responsabilidad
  - Ley aplicable: Colombia

### 6.3 Support (`support.html`)

- Título: "Soporte"
- Contenido:
  - Email: hola@bolsillos.app (respuesta en <48h)
  - Link a FAQ del home
  - Info de la app: versión, plataformas disponibles
  - Cómo reportar un bug
  - Cómo solicitar reembolso (link a Apple)

### 6.4 Sobre Bolsillos (`about.html`)

- Título: "Sobre Bolsillos"
- Contenido:
  - La historia: por qué se creó (frustración con Excel y apps gringas)
  - Quién es Sergio (fundador, colombiano, indie developer)
  - Filosofía local-first y privacidad
  - Bolo — el chigüiro que cuida tus bolsillos
  - Comunidad de fundadores
  - Visión: que organizar la plata se sienta tan natural como respirar

---

## 7. Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| > 768px (desktop) | Multi-columna, screenshots side-by-side, nav links visibles |
| 481-768px (tablet) | 2 columnas donde aplique, nav links visibles |
| ≤ 480px (mobile) | Single column, hamburger menu, cards en stack, screenshots full-width |

---

## 8. Assets Necesarios

| Asset | Estado | Notas |
|-------|--------|-------|
| bolo_avatar.png | ✅ Existe | images/bolo_avatar.png (120px uso) |
| App Store badge | Pendiente | Descargar de Apple Marketing Resources |
| Screenshots (3 para hero) | Pendiente | Generar con app-store-screenshots skill |
| Screenshots (5 para features) | Pendiente | Budget, Voice, Reports, Goals, Settings/Lock |
| Favicon | Pendiente | Derivar del app icon |
| OG image (social sharing) | Pendiente | 1200x630px para compartir en redes |

---

## 9. SEO y Meta Tags

```html
<title>Bolsillos — Organiza tu plata | App de finanzas para Colombia</title>
<meta name="description" content="La app de finanzas personales para freelancers e independientes en Colombia. Organiza tu plata en bolsillos, registra gastos con tu voz. Sin Excel.">
<meta property="og:title" content="Bolsillos — Organiza tu plata">
<meta property="og:description" content="App de finanzas personales para Colombia. Cada peso tiene su bolsillo.">
<meta property="og:image" content="https://bolsillos.app/images/og-image.png">
<meta property="og:url" content="https://bolsillos.app">
<meta name="twitter:card" content="summary_large_image">
```

---

## 10. Referral Banner (se mantiene)

El sistema de referral existente (`?ref=BOLSI-XXXX`) se preserva. Banner fijo inferior con código cuando la URL contiene el parámetro.

---

## 11. Testimonios (placeholder)

Sección de testimonios preparada pero oculta (CSS display:none). Estructura lista para 3 cards:
- Foto/avatar del usuario
- Quote textual
- Nombre + "desde [fecha]"
- Estilo: cards con comillas decorativas, fondo crema

Se activa cuando haya testimonios reales de fundadores.

---

## 12. Qué se elimina de la versión actual

| Elemento actual | Acción | Razón |
|----------------|--------|-------|
| Hero badge "50 cupos de Usuario Fundador" | Eliminar | Ya no es beta |
| CTA "Solicita acceso" | Reemplazar por "Descargar" | Ya está en App Store |
| Formulario Google Forms | Reemplazar por waitlist Android | El formulario era para beta |
| Sección "Sé uno de los 50 Usuarios Fundadores" | Eliminar | Ya no aplica |
| Sección "Sin riesgo, con propósito" | Eliminar | Reemplazada por pricing con trial |
| FAQ "¿Qué es un Usuario Fundador?" | Reemplazar | Nuevas preguntas para producto oficial |
| Franja de pasto (grass divider) | Eliminar | Más limpio sin ella |
| hero.jpg | Eliminar | Reemplazado por screenshots flotantes |

---

## 13. Qué se preserva

| Elemento | Notas |
|----------|-------|
| Paleta de colores completa | Todos los CSS custom properties |
| Tipografía Quicksand + Fredoka | Mismas fonts |
| Bolo pills (avatar + bubble) | Mismo estilo, actualizados los textos |
| FAQ accordion pattern | Mismo JS, nuevas preguntas |
| Referral banner | Mismo sistema ?ref= |
| CNAME (bolsillos.app) | Se mantiene |
| Imágenes Bolo (bolo_avatar.png + bolo_correo_*.jpg) | Se mantienen en images/ |
