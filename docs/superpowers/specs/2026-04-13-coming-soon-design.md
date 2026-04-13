# Spec: Coming Soon + Beta Cerrada — bolsillos.app

**Fecha:** 2026-04-13  
**Estado:** Aprobado  
**Alcance:** `index.html` (ES) + `en/index.html` (EN)

---

## Contexto

La app no está publicada en el App Store aún (estimado: ~1 mes). La beta cerrada con fundadores ya terminó. La página actualmente muestra botones "Descargar en el App Store" que apuntan a `#` (placeholder), lo cual es engañoso. Se requiere comunicar el estado real sin recoger correos adicionales.

---

## Cambios aprobados

### 1. Hero — botón principal

**Antes:** `<a href="#" class="btn-appstore">Descargar en el App Store</a>`

**Después:**
- Nuevo elemento `div.btn-appstore-soon` (no clickeable): `"Próximamente en el App Store"` con ícono de Apple
- Estilo: fondo `#E8E8E4`, texto `--texto-hint` (`#8B8B7D`), `cursor: default`
- Debajo del badge, línea pequeña en `--texto-hint`:  
  `"Beta con fundadores cerrada · Lanzamiento próximo en iOS"`
- El botón "Pronto en Android →" permanece sin cambios

### 2. Social proof bar

| Antes | Después |
|-------|---------|
| `"50 fundadores activos"` | `"50 fundadores · beta cerrada ✓"` |
| `"⭐ 4.8 en App Store"` | sin cambio (aspiracional) |
| `"Hecha en Colombia 🇨🇴"` | sin cambio |

### 3. Nav — botón CTA

**Antes:** `<a href="#" class="nav-cta-btn">Descargar</a>`  
**Después:** eliminado (desktop + mobile). No hay nada que descargar aún.

### 4. CTA Final (sección `#android`)

**Antes:** `<a href="#" class="btn-appstore">Descargar en el App Store</a>`  
**Después:** mismo badge muted del hero (`div.btn-appstore-soon`)

### 5. Pricing — botones de plan

| Elemento | Antes | Después |
|----------|-------|---------|
| Plan Gratis | `"Descargar"` | `"Próximamente"` (muted, no clickeable) |
| Plan Pro | `"Prueba gratis"` | `"Próximamente"` (muted, no clickeable) |

Estilo: fondo gris, texto `--texto-hint`, `cursor: default`, sin `href`.

### 6. Footer

**Antes:** `<a href="#">Descargar iOS</a>`  
**Después:** `<span>iOS (próximamente)</span>` (texto plano, sin link)

---

## Versión EN (`en/index.html`)

Mismos cambios, copy en inglés:

| ES | EN |
|----|----|
| `"Próximamente en el App Store"` | `"Coming Soon on the App Store"` |
| `"Beta con fundadores cerrada · Lanzamiento próximo en iOS"` | `"Founder beta closed · Launching soon on iOS"` |
| `"50 fundadores · beta cerrada ✓"` | `"50 founders · beta closed ✓"` |
| `"Próximamente"` (botones pricing) | `"Coming Soon"` |
| `"iOS (próximamente)"` | `"iOS (coming soon)"` |

---

## Lo que NO cambia

- Estructura de la página (secciones, layout, orden)
- Formulario de waitlist Android (sigue igual)
- Rating `"⭐ 4.8 en App Store"` (aspiracional, aprobado)
- Botón `"Pronto en Android →"` en el hero
- Cualquier texto que no sea un CTA de descarga

---

## Archivos afectados

| Archivo | Cambios |
|---------|---------|
| `index.html` | Hero, social proof, nav, CTA final, pricing, footer |
| `en/index.html` | Mismos, en inglés |
