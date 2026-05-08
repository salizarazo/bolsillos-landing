# Guía de Captura — 5 Screenshots × 2 Locales

**Sim:** iPhone 17 Pro Max iOS 26.4 (UUID `1690D150-020E-4543-9A0E-EC2E99653B04`)
**Resolución captura:** 1320×2868 (Apple 6.9" actual)
**Output:** `captures-raw/{es,en}/<slot>.png`

## Demo Data — ES (Spanish/Mexico locale en la app)

### Bolsillos (para slide #1 Hero ZBB + slide #2 Bolsillos)

Crear grupo "Esenciales" y agregar bolsillos con asignaciones (formato monto en COP):

| Bolsillo | Asignado |
|----------|----------|
| Mercado | $580.000 |
| Arriendo | $1.200.000 |
| Servicios | $185.000 |
| Antojos | $150.000 |
| Bolo viaje | $250.000 |
| Impuestos | $400.000 |
| Emergencia | $300.000 |

### Deudas (para slide #3)

| Deuda | Saldo | APR |
|-------|-------|-----|
| Tarjeta 1 | $4.500.000 | 28% |
| Tarjeta 2 | $1.800.000 | 22% |
| Préstamo personal | $8.000.000 | 19% |

Estrategia visible: Avalancha vs Bola de Nieve toggle.

### Metas Dream Board (para slide #5)

| Meta | Objetivo | Categoría |
|------|----------|-----------|
| Viaje a Cartagena | $2.500.000 | viaje |
| Maestría | $8.000.000 | educación |
| Cuota inicial casa | $40.000.000 | hogar |

## Demo Data — EN (English/US locale)

Cambiar locale: Settings → Idioma → English. **Borrar data ES y reconfigurar**, o usar build separado.

### Pockets

| Pocket | Assigned (USD) |
|--------|----------------|
| Groceries | $400 |
| Rent | $1500 |
| Utilities | $200 |
| Indulgences | $150 |
| Travel fund | $300 |
| Tax pocket | $1000 |
| Emergency | $400 |

### Debts

Card 1 / Card 2 / Personal Loan

### Goals

Tokyo Trip $4.000 / Master's program $30.000 / House down payment $60.000

## Capturas (5 slots)

| # | Slot | Pantalla | Headline copy reference |
|---|------|----------|------------------------|
| 1 | `home.png` | Budget tab — vista principal con bolsillos asignados | "Cada peso ya tiene un trabajo" / "Every dollar has a job" |
| 2 | `bolsillos.png` | Budget tab — scroll a algún bolsillo "overspent" o pasado de la asignación | "Cada gasto en su bolsillo" / "Every expense in its envelope" |
| 3 | `debts.png` | Reports → Debts → Avalancha vs Bola de Nieve | "Tu fecha libre de deudas" / "Your debt-free date" |
| 4 | `privacy.png` | Settings → Privacy/About (o un screen vacío con Bolo + offline indicator) | "Tu dinero vive en tu iPhone" / "Your money lives on your iPhone" |
| 5 | `dreams.png` | Dream Board — 3 metas visibles | "Tu viaje, pagado..." / "Your trip, paid..." |

## Comando de captura

En el simulador con la pantalla deseada visible:

```bash
xcrun simctl io 1690D150-020E-4543-9A0E-EC2E99653B04 screenshot \
  "/Volumes/SAL's SSD/Users/SAL's SSD/bolsillos-landing/screenshots/captures-raw/es/home.png"
```

(Ajustar `es`/`en` y nombre por slot.)

## Verificar resolución

```bash
sips -g pixelWidth -g pixelHeight captures-raw/es/home.png
# Esperado: pixelWidth: 1320 / pixelHeight: 2868
```

Si no es 1320×2868, sim tiene scale incorrecto — Device → Scale → 100%.
