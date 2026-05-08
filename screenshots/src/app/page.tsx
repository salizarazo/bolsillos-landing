"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";

// =============================================================================
// CONSTANTS
// =============================================================================

const W = 1320;
const H = 2868;

// CSS-only iPhone frame (replaces external mockup.png).
// Dimensions ported from Claude Design's Editorial slide — ratio 940/2030 ≈
// 0.463 matches the real iPhone 17 Pro Max body. Bezel a uniform 14px.
const PHONE_W = 940;
const PHONE_H = 2030;
const BEZEL = 14;
const FRAME_RADIUS = 120;
const SCREEN_RADIUS = FRAME_RADIUS - BEZEL; // 106
// Constant gap between the caption's last line and the top of the iPhone.
// The iPhone sits in flow (not absolute), so this gap is identical on every
// slide regardless of how long the headline is. The slide's overflow:hidden
// clips the iPhone's bottom naturally — slides with shorter captions show
// more of the screen content, slides with longer captions show less.
// Tuned ~slightly larger than slide 3's reference gap per user feedback.
const PHONE_TOP_GAP_RATIO = 0.085; // 0.085 × W ≈ 112px at W=1320
const DI_W = 280;
const DI_H = 60;
const DI_TOP = 18;

const IPHONE_SIZES = [
  { label: '6.9"', w: 1320, h: 2868 },
  { label: '6.5"', w: 1284, h: 2778 },
  { label: '6.3"', w: 1206, h: 2622 },
  { label: '6.1"', w: 1125, h: 2436 },
] as const;

const LOCALES = ["es", "en"] as const;
type Locale = typeof LOCALES[number];

// =============================================================================
// EDITORIAL THEME (single canonical theme)
// =============================================================================

const EDITORIAL = {
  bg: "#F2EBDB",
  bgSubtle: "linear-gradient(180deg, #F4EEDF 0%, #F0E8D4 100%)",
  ink: "#1F1612",
  inkMuted: "#5A4738",
  burgundy: "#A8442D",
  rule: "rgba(31,22,18,0.18)",
  serif: "var(--font-dm-serif), 'Source Serif Pro', Georgia, serif",
  bodySerif: "var(--font-source-serif), Georgia, serif",
  sans: "var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif",
};

// =============================================================================
// COPY (with markdown-style _emphasis_ for italic burgundy)
// =============================================================================

type SlideCopy = {
  tag: string;
  num: string;
  manifesto: string;
  headline: string; // _word_ wrapped = italic burgundy
  sub: string;
};

type SlideKey =
  | "bolsillos"
  | "home"
  | "dreams"
  | "decisiones"
  | "debts"
  | "pace"
  | "privacy";

const COPY: Record<Locale, Record<SlideKey, SlideCopy>> = {
  es: {
    bolsillos: {
      tag: "BOLSILLOS",
      num: "NÚM. 1",
      manifesto: "— sobre vivir sin culpa —",
      headline: "Sin culpa.\nSin _pánico_.",
      sub: "Cada gasto en su bolsillo.",
    },
    home: {
      tag: "BOLSILLOS",
      num: "NÚM. 2",
      manifesto: "— un manifiesto en miniatura —",
      headline: "Cada peso\n_ya tiene_\nun trabajo.",
      sub: "Presupuesto base cero, para freelancers e independientes.",
    },
    dreams: {
      tag: "BOLSILLOS",
      num: "NÚM. 3",
      manifesto: "— sobre lo posible —",
      headline: "Tu viaje, _pagado_.\nTu maestría, _lista_.",
      sub: "50+ metas con Dream Board.",
    },
    decisiones: {
      tag: "BOLSILLOS",
      num: "NÚM. 4",
      manifesto: "— sobre la pausa antes del clic —",
      headline: "No es _fuerza de voluntad_.\nSon siete preguntas.",
      sub: "Para no quitarle dinero a tus metas.",
    },
    debts: {
      tag: "BOLSILLOS",
      num: "NÚM. 5",
      manifesto: "— sobre la salida —",
      headline: "Tu fecha\n_libre_ de\ndeudas.",
      sub: "Avalancha o Bola de Nieve, tú decides.",
    },
    pace: {
      tag: "BOLSILLOS",
      num: "NÚM. 6",
      manifesto: "— sobre el ritmo del mes —",
      headline: "¿Adelantado\no _atrasado_?",
      sub: "Tu ritmo de gasto, sin sorpresas.",
    },
    privacy: {
      tag: "BOLSILLOS",
      num: "NÚM. 7",
      manifesto: "— sobre la confianza —",
      headline: "Tu dinero\n_vive_ en\ntu iPhone.",
      sub: "Sin banco, sin nube, sin culpa.",
    },
  },
  en: {
    bolsillos: {
      tag: "BOLSILLOS",
      num: "NO. 1",
      manifesto: "— on living without shame —",
      headline: "No shame.\nNo _panic_.",
      sub: "Every expense in its envelope.",
    },
    home: {
      tag: "BOLSILLOS",
      num: "NO. 2",
      manifesto: "— a miniature manifesto —",
      headline: "Every dollar\n_has a job_.",
      sub: "Zero-Based Budgeting, for freelancers and gig workers.",
    },
    dreams: {
      tag: "BOLSILLOS",
      num: "NO. 3",
      manifesto: "— on what's possible —",
      headline: "Your trip, _paid_.\nGrad school, _ready_.",
      sub: "50+ goals with Dream Board.",
    },
    decisiones: {
      tag: "BOLSILLOS",
      num: "NO. 4",
      manifesto: "— on the pause before the click —",
      headline: "It's not _willpower_.\nIt's seven questions.",
      sub: "So your goals stay funded.",
    },
    debts: {
      tag: "BOLSILLOS",
      num: "NO. 5",
      manifesto: "— on the way out —",
      headline: "Your\n_debt-free_\ndate.",
      sub: "Avalanche or Snowball, you choose.",
    },
    pace: {
      tag: "BOLSILLOS",
      num: "NO. 6",
      manifesto: "— on the rhythm of the month —",
      headline: "Ahead\nor _behind_?",
      sub: "Your spending pace, no surprises.",
    },
    privacy: {
      tag: "BOLSILLOS",
      num: "NO. 7",
      manifesto: "— on trust —",
      headline: "Your money\n_lives_ on\nyour iPhone.",
      sub: "No bank, no cloud, no shame.",
    },
  },
};

// =============================================================================
// HEADLINE PARSER
// =============================================================================

function renderHeadline(headline: string) {
  // Split into lines, each line into segments. _foo_ = italic burgundy.
  const lines = headline.split("\n");
  return lines.map((line, lineIdx) => {
    const parts = line.split(/(_[^_]+_)/g);
    return (
      <span key={lineIdx} style={{ display: "block" }}>
        {parts.map((part, partIdx) => {
          if (part.startsWith("_") && part.endsWith("_")) {
            const inner = part.slice(1, -1);
            return (
              <em
                key={partIdx}
                style={{
                  fontStyle: "italic",
                  color: EDITORIAL.burgundy,
                  fontFamily: EDITORIAL.serif,
                }}
              >
                {inner}
              </em>
            );
          }
          return <span key={partIdx}>{part}</span>;
        })}
      </span>
    );
  });
}

// =============================================================================
// COMPONENTS
// =============================================================================

function IPhoneFrame({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  // Pure-CSS iPhone frame in flow layout. The slide's overflow:hidden
  // clips the bottom of the frame naturally — that "asoma desde abajo"
  // effect is preserved without per-slide tuning.
  return (
    <div
      style={{
        width: PHONE_W,
        height: PHONE_H,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: FRAME_RADIUS,
        background: "#2B1D17",
        padding: BEZEL,
        boxShadow:
          "0 60px 120px rgba(0,0,0,0.28), inset 0 0 0 1.5px rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: SCREEN_RADIUS,
          overflow: "hidden",
          position: "relative",
          background: "#FAF6EE",
        }}
      >
        {/* Dynamic Island — absolute, on top of everything */}
        <div
          style={{
            position: "absolute",
            top: DI_TOP,
            left: "50%",
            transform: "translateX(-50%)",
            width: DI_W,
            height: DI_H,
            background: "#0a0a0a",
            borderRadius: DI_H / 2,
            zIndex: 4,
          }}
        />
        {/* Real screenshot — captures already include iPhone status bar */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </div>
    </div>
  );
}

function TagBar({ copy }: { copy: SlideCopy }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: `0 ${0.085 * W}px`,
        marginTop: 0.06 * H,
        fontFamily: EDITORIAL.sans,
        fontSize: 0.024 * W,
        fontWeight: 600,
        letterSpacing: "0.18em",
        color: EDITORIAL.ink,
        textTransform: "uppercase",
      }}
    >
      <span>{copy.tag}</span>
      <span>{copy.num}</span>
    </div>
  );
}

function Caption({ copy }: { copy: SlideCopy }) {
  return (
    <div
      style={{
        textAlign: "center",
        color: EDITORIAL.ink,
        padding: `${0.04 * W}px ${0.085 * W}px 0`,
        width: "100%",
      }}
    >
      <p
        style={{
          fontFamily: EDITORIAL.bodySerif,
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 0.028 * W,
          color: EDITORIAL.inkMuted,
          letterSpacing: "0.01em",
          margin: 0,
          marginBottom: 0.04 * W,
        }}
      >
        {copy.manifesto}
      </p>
      <h1
        style={{
          fontFamily: EDITORIAL.serif,
          fontWeight: 400,
          fontSize: 0.115 * W,
          lineHeight: 1.0,
          letterSpacing: "-0.015em",
          color: EDITORIAL.ink,
          margin: 0,
        }}
      >
        {renderHeadline(copy.headline)}
      </h1>
      <div
        style={{
          fontFamily: EDITORIAL.serif,
          fontStyle: "italic",
          fontSize: 0.05 * W,
          color: EDITORIAL.ink,
          marginTop: 0.04 * W,
          marginBottom: 0.025 * W,
          opacity: 0.6,
        }}
      >
        §
      </div>
      <p
        style={{
          fontFamily: EDITORIAL.bodySerif,
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 0.034 * W,
          lineHeight: 1.4,
          color: EDITORIAL.inkMuted,
          margin: 0,
          maxWidth: 0.75 * W,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {copy.sub}
      </p>
    </div>
  );
}

function Slide({
  slideKey,
  locale,
  exportRef,
}: {
  slideKey: SlideKey;
  locale: Locale;
  exportRef?: (el: HTMLDivElement | null) => void;
}) {
  const copy = COPY[locale][slideKey];
  const screenshotPath = `/screenshots/apple/iphone/${locale}/${slideKey}.png`;

  return (
    <div
      ref={exportRef}
      style={{
        width: W,
        height: H,
        background: EDITORIAL.bgSubtle,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <TagBar copy={copy} />
      <div style={{ marginTop: 0.025 * H }}>
        <Caption copy={copy} />
      </div>
      <div style={{ marginTop: PHONE_TOP_GAP_RATIO * W }}>
        <IPhoneFrame src={screenshotPath} alt={slideKey} />
      </div>
    </div>
  );
}

// =============================================================================
// PREVIEW (scaled-down)
// =============================================================================

function Preview({
  slideKey,
  locale,
  scale = 0.18,
}: {
  slideKey: SlideKey;
  locale: Locale;
  scale?: number;
}) {
  return (
    <div
      style={{
        width: W * scale,
        height: H * scale,
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
        borderRadius: 12,
        background: EDITORIAL.bg,
      }}
    >
      <div
        style={{
          width: W,
          height: H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <Slide slideKey={slideKey} locale={locale} />
      </div>
    </div>
  );
}

// =============================================================================
// MAIN PAGE
// =============================================================================

const SLIDE_KEYS: SlideKey[] = [
  "bolsillos",
  "home",
  "dreams",
  "decisiones",
  "debts",
  "pace",
  "privacy",
];

export default function ScreenshotsPage() {
  const [locale, setLocale] = useState<Locale>("es");
  const [exporting, setExporting] = useState(false);

  const exportRefs = useRef<Map<SlideKey, HTMLDivElement | null>>(new Map());

  async function exportSlide(slideKey: SlideKey, sizeIdx: number) {
    const el = exportRefs.current.get(slideKey);
    if (!el) {
      console.error("no el for", slideKey);
      return;
    }
    const target = IPHONE_SIZES[sizeIdx];
    const pixelRatio = target.w / W;
    const dataUrl = await toPng(el, {
      pixelRatio,
      width: W,
      height: H,
      cacheBust: true,
    });
    const link = document.createElement("a");
    link.download = `${slideKey}-${locale}-editorial-${target.label.replace(
      '"',
      "in"
    )}.png`;
    link.href = dataUrl;
    link.click();
  }

  async function exportAll() {
    setExporting(true);
    try {
      for (const key of SLIDE_KEYS) {
        for (let i = 0; i < IPHONE_SIZES.length; i++) {
          await exportSlide(key, i);
          await new Promise((r) => setTimeout(r, 250));
        }
      }
    } finally {
      setExporting(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAF6EE",
        padding: 24,
        fontFamily: EDITORIAL.sans,
      }}
    >
      {/* TOOLBAR */}
      <div
        style={{
          background: "#fff",
          padding: 16,
          borderRadius: 12,
          marginBottom: 24,
          display: "flex",
          gap: 16,
          alignItems: "center",
          flexWrap: "wrap",
          boxShadow: "0 1px 6px rgba(31,22,18,0.06)",
          position: "sticky",
          top: 12,
          zIndex: 10,
          border: `1px solid ${EDITORIAL.rule}`,
        }}
      >
        <strong
          style={{
            fontSize: 14,
            fontFamily: EDITORIAL.serif,
            fontStyle: "italic",
            color: EDITORIAL.ink,
            letterSpacing: "-0.01em",
          }}
        >
          Bolsillos · Editorial
        </strong>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <label style={{ fontSize: 12, color: EDITORIAL.inkMuted }}>
            Locale
          </label>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              border: `1px solid ${EDITORIAL.rule}`,
              background: "#fff",
              fontFamily: EDITORIAL.sans,
            }}
          >
            {LOCALES.map((l) => (
              <option key={l} value={l}>
                {l.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={exportAll}
          disabled={exporting}
          style={{
            padding: "8px 18px",
            borderRadius: 6,
            background: EDITORIAL.ink,
            color: "#FAF6EE",
            border: "none",
            cursor: exporting ? "not-allowed" : "pointer",
            opacity: exporting ? 0.5 : 1,
            fontFamily: EDITORIAL.sans,
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            fontSize: 12,
          }}
        >
          {exporting ? "Exporting…" : "Export 7 × 4 sizes"}
        </button>
        <span
          style={{
            fontSize: 11,
            color: EDITORIAL.inkMuted,
            marginLeft: "auto",
            fontStyle: "italic",
            fontFamily: EDITORIAL.bodySerif,
          }}
        >
          Locale: {locale} · Canvas {W}×{H} · {SLIDE_KEYS.length} slides
        </span>
      </div>

      {/* GRID — ALL SLIDES IN STORY ORDER */}
      <h2
        style={{
          fontSize: 18,
          fontFamily: EDITORIAL.serif,
          fontStyle: "italic",
          fontWeight: 400,
          color: EDITORIAL.ink,
          marginBottom: 16,
          letterSpacing: "-0.01em",
        }}
      >
        Editorial · {locale.toUpperCase()} · {SLIDE_KEYS.length} slides en
        orden de historia
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
          marginBottom: 24,
        }}
      >
        {SLIDE_KEYS.map((key, idx) => (
          <div
            key={key}
            style={{
              background: "#fff",
              padding: 14,
              borderRadius: 12,
              border: `1px solid ${EDITORIAL.rule}`,
              boxShadow: "0 1px 6px rgba(31,22,18,0.04)",
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: EDITORIAL.inkMuted,
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontWeight: 600,
              }}
            >
              {idx + 1}. {key}
            </div>
            <Preview slideKey={key} locale={locale} scale={0.2} />
            <button
              onClick={() => exportSlide(key, 0)}
              style={{
                marginTop: 10,
                padding: "6px 10px",
                fontSize: 11,
                borderRadius: 4,
                background: "#FAF6EE",
                border: `1px solid ${EDITORIAL.rule}`,
                cursor: "pointer",
                width: "100%",
                fontFamily: EDITORIAL.sans,
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: EDITORIAL.ink,
              }}
            >
              Export 6.9″
            </button>
          </div>
        ))}
      </div>

      {/* HIDDEN FULL-SIZE EXPORT NODES */}
      <div style={{ position: "absolute", left: -99999, top: 0 }}>
        {SLIDE_KEYS.map((key) => (
          <Slide
            key={key}
            slideKey={key}
            locale={locale}
            exportRef={(el) => exportRefs.current.set(key, el)}
          />
        ))}
      </div>
    </div>
  );
}
