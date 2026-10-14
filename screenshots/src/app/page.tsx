"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";

// =============================================================================
// CONSTANTS
// =============================================================================

// Devices. `stacked` = caption on top, device peeking from below (iPhone,
// iPad portrait). `split` = caption in a left column, device on the right
// (wide canvases: iPad landscape, Mac).
const DEVICES = {
  iphone: { label: "iPhone", w: 1320, h: 2868, layout: "stacked" },
  ipad: { label: "iPad-13in", w: 2064, h: 2752, layout: "stacked" },
  "ipad-landscape": { label: "iPad-13in-landscape", w: 2752, h: 2064, layout: "split" },
  mac: { label: "Mac", w: 2880, h: 1800, layout: "split" },
} as const;
type DeviceKey = keyof typeof DEVICES;
const DEVICE_KEYS = Object.keys(DEVICES) as DeviceKey[];

// CSS-only iPhone frame (ratio 940/2030 ≈ 0.463 = iPhone 17 Pro Max body).
const PHONE_W = 940;
const PHONE_H = 2030;
const BEZEL = 14;
const FRAME_RADIUS = 120;
const SCREEN_RADIUS = FRAME_RADIUS - BEZEL; // 106
// Constant gap between the caption's last line and the top of the device.
const PHONE_TOP_GAP_RATIO = 0.085; // × W
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
  chip?: string; // optional pill rendered below sub (e.g. report breadcrumb)
};

// macOS has no receipt scan (ML Kit is iOS/Android only): same story without it.
const MAC_CAPTURE_SUB: Record<Locale, string> = {
  es: "Voz, manual o importado. Con recordatorios, repetición y adjuntos.",
  en: "Voice, manual or imported. With reminders, repeats, and attachments.",
};

type SlideKey =
  | "bolsillos"
  | "home"
  | "dreams"
  | "decisiones"
  | "capture"
  | "debts"
  | "pace"
  | "recap";

const COPY: Record<Locale, Record<SlideKey, SlideCopy>> = {
  es: {
    bolsillos: {
      tag: "BOLSILLOS",
      num: "NÚM. 1",
      manifesto: "— sobre vivir sin culpa —",
      headline: "Sin culpa.\nSin _pánico_.",
      sub: "Cada gasto en su bolsillo. Sin chatbot, sin venta de datos.",
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
    capture: {
      tag: "BOLSILLOS",
      num: "NÚM. 5",
      manifesto: "— sobre el momento del registro —",
      headline: "Tan _rápida_\no tan detallada\ncomo quieras.",
      sub: "Voz, foto del recibo, manual o importado. Con recordatorios, repetición y adjuntos.",
    },
    debts: {
      tag: "BOLSILLOS",
      num: "NÚM. 6",
      manifesto: "— sobre la salida —",
      headline: "Tu fecha\n_libre_ de\ndeudas.",
      sub: "Avalancha o Bola de Nieve, tú decides.",
    },
    pace: {
      tag: "BOLSILLOS",
      num: "NÚM. 7",
      manifesto: "— sobre el ritmo del mes —",
      headline: "¿Adelantado\no _atrasado_?",
      sub: "Tu ritmo de gasto, sin sorpresas.",
      chip: "+ Bienestar, Margen, Patrimonio y 8 más",
    },
    recap: {
      tag: "BOLSILLOS",
      num: "NÚM. 8",
      manifesto: "— sobre mirar atrás —",
      headline: "Tu año,\n_contado_\nbonito.",
      sub: "Year Recap: ocho cards animadas y una para compartir.",
    },
  },
  en: {
    bolsillos: {
      tag: "BOLSILLOS",
      num: "NO. 1",
      manifesto: "— on living without shame —",
      headline: "No shame.\nNo _panic_.",
      sub: "Every expense in its envelope. No chatbots, no data selling.",
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
    capture: {
      tag: "BOLSILLOS",
      num: "NO. 5",
      manifesto: "— on the moment of capture —",
      headline: "As _fast_\nor as detailed\nas you want.",
      sub: "Voice, receipt photo, manual or imported. With reminders, repeats, and attachments.",
    },
    debts: {
      tag: "BOLSILLOS",
      num: "NO. 6",
      manifesto: "— on the way out —",
      headline: "Your\n_debt-free_\ndate.",
      sub: "Avalanche or Snowball, you choose.",
    },
    pace: {
      tag: "BOLSILLOS",
      num: "NO. 7",
      manifesto: "— on the rhythm of the month —",
      headline: "Ahead\nor _behind_?",
      sub: "Your spending pace, no surprises.",
      chip: "+ Wellness, Margin Finder, Net Worth, and 8 more",
    },
    recap: {
      tag: "BOLSILLOS",
      num: "NO. 8",
      manifesto: "— on looking back —",
      headline: "Your year,\n_told_\nbeautifully.",
      sub: "Year Recap: eight animated cards plus one to share.",
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
            return (
              <em
                key={partIdx}
                style={{
                  fontStyle: "italic",
                  color: EDITORIAL.burgundy,
                  fontFamily: EDITORIAL.serif,
                }}
              >
                {part.slice(1, -1)}
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
// DEVICE FRAMES
// =============================================================================

const SHADOW =
  "0 60px 120px rgba(0,0,0,0.28), inset 0 0 0 1.5px rgba(255,255,255,0.08)";

function Img({ src, alt, fit = "cover" }: { src: string; alt: string; fit?: "cover" | "contain" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={{ width: "100%", height: "100%", objectFit: fit, objectPosition: "top", display: "block" }}
    />
  );
}

function IPhoneFrame({ src, alt }: { src: string; alt: string }) {
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
        boxShadow: SHADOW,
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
        <Img src={src} alt={alt} />
      </div>
    </div>
  );
}

// iPad: uniform bezel, no notch; a tiny camera dot on the top edge.
function TabletFrame({
  src,
  alt,
  width,
  aspect,
}: {
  src: string;
  alt: string;
  width: number; // outer width in canvas px
  aspect: number; // screen width / height
}) {
  const bezel = Math.round(width * 0.02);
  const screenW = width - bezel * 2;
  const screenH = Math.round(screenW / aspect);
  const radius = Math.round(width * 0.045);
  return (
    <div
      style={{
        width,
        height: screenH + bezel * 2,
        borderRadius: radius,
        background: "#2B1D17",
        padding: bezel,
        boxShadow: SHADOW,
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: radius - bezel,
          overflow: "hidden",
          background: "#FAF6EE",
        }}
      >
        <Img src={src} alt={alt} />
      </div>
      <div
        style={{
          position: "absolute",
          top: bezel / 2 - 5,
          left: "50%",
          width: 10,
          height: 10,
          borderRadius: 5,
          background: "#0a0a0a",
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
}

// Mac: the capture is the app window itself (traffic lights included), so it
// is shown as a floating window with a soft shadow, not inside a laptop body.
function MacWindowFrame({ src, alt, width }: { src: string; alt: string; width: number }) {
  const height = Math.round((width * 900) / 1440);
  return (
    <div
      style={{
        width,
        height,
        borderRadius: Math.round(width * 0.0075),
        overflow: "hidden",
        boxShadow:
          "0 70px 140px rgba(0,0,0,0.30), 0 0 0 1px rgba(31,22,18,0.14)",
        background: "#fff",
      }}
    >
      {/* −0.25 % per side drops the window-corner pixels of the capture */}
      <div style={{ width: "100.5%", height: "100.5%", margin: "-0.25%" }}>
        <Img src={src} alt={alt} />
      </div>
    </div>
  );
}

function DeviceFrame({
  device,
  src,
  alt,
  width,
}: {
  device: DeviceKey;
  src: string;
  alt: string;
  width: number;
}) {
  if (device === "iphone") return <IPhoneFrame src={src} alt={alt} />;
  if (device === "mac") return <MacWindowFrame src={src} alt={alt} width={width} />;
  return (
    <TabletFrame
      src={src}
      alt={alt}
      width={width}
      aspect={device === "ipad" ? 2064 / 2752 : 2752 / 2064}
    />
  );
}

// =============================================================================
// COMPONENTS
// =============================================================================

function TagBar({ copy, w, h, split }: { copy: SlideCopy; w: number; h: number; split: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: split ? 0 : `0 ${0.085 * w}px`,
        marginTop: split ? 0 : 0.06 * h,
        fontFamily: EDITORIAL.sans,
        fontSize: (split ? 0.0105 : 0.024) * w,
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

function Caption({
  copy,
  w,
  split,
  scale,
}: {
  copy: SlideCopy;
  w: number;
  split: boolean;
  scale?: number; // type scale for stacked canvases wider than an iPhone
}) {
  // Stacked canvases keep the iPhone proportions (× W). Split canvases use
  // smaller type and left-aligned text so a 3-line headline fits its column.
  const k = scale ?? (split ? 0.45 : 1);
  const align = split ? "left" : "center";
  return (
    <div
      style={{
        textAlign: align,
        color: EDITORIAL.ink,
        padding: split ? 0 : `${0.04 * w}px ${0.085 * w}px 0`,
        width: "100%",
      }}
    >
      <p
        style={{
          fontFamily: EDITORIAL.bodySerif,
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 0.028 * w * k,
          color: EDITORIAL.inkMuted,
          letterSpacing: "0.01em",
          margin: 0,
          marginBottom: 0.04 * w * k,
        }}
      >
        {copy.manifesto}
      </p>
      <h1
        style={{
          fontFamily: EDITORIAL.serif,
          fontWeight: 400,
          fontSize: 0.115 * w * k,
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
          fontSize: 0.05 * w * k,
          color: EDITORIAL.ink,
          marginTop: 0.04 * w * k,
          marginBottom: 0.025 * w * k,
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
          fontSize: 0.034 * w * k,
          lineHeight: 1.4,
          color: EDITORIAL.inkMuted,
          margin: 0,
          maxWidth: split ? undefined : 0.75 * w,
          marginLeft: split ? 0 : "auto",
          marginRight: split ? 0 : "auto",
        }}
      >
        {copy.sub}
      </p>
      {copy.chip && (
        <div
          style={{
            marginTop: 0.04 * w * k,
            paddingTop: 0.022 * w * k,
            width: split ? "80%" : 0.45 * w,
            marginLeft: split ? 0 : "auto",
            marginRight: split ? 0 : "auto",
            borderTop: `1px solid ${EDITORIAL.rule}`,
            fontFamily: EDITORIAL.bodySerif,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 0.026 * w * k,
            color: EDITORIAL.inkMuted,
            letterSpacing: "0.02em",
          }}
        >
          {copy.chip}
        </div>
      )}
    </div>
  );
}

// iPad canvas (portrait): each slide picks the iPad orientation that shows its
// content best. Landscape = whole device visible with wide master-detail
// layouts; portrait = tall screens (sheets, single-column detail, recap).
const IPAD_ORIENTATION: Record<SlideKey, "portrait" | "landscape"> = {
  bolsillos: "landscape",
  home: "landscape",
  dreams: "landscape",
  decisiones: "landscape",
  capture: "landscape",
  debts: "portrait",
  pace: "landscape",
  recap: "portrait",
};

// iPad landscape canvas: slides whose screen is tall/narrow use the portrait iPad.
const IPAD_LANDSCAPE_PORTRAIT = new Set<SlideKey>(["decisiones", "debts", "recap"]);

// Fills the space left under the caption and sizes the tablet so the WHOLE
// device is always visible (never cropped by the canvas edge).
function FittedTablet({
  src,
  alt,
  aspect,
  maxW,
}: {
  src: string;
  alt: string;
  aspect: number;
  maxW: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(maxW);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // outer height = innerW / aspect + 2 bezels = w * (0.96 / aspect + 0.04)
    const fit = el.clientHeight / (0.96 / aspect + 0.04);
    setW(Math.floor(Math.min(maxW, fit * 0.97)));
  }, [aspect, maxW, src]);
  return (
    <div
      ref={ref}
      style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TabletFrame src={src} alt={alt} width={w} aspect={aspect} />
    </div>
  );
}

function copyFor(device: DeviceKey, locale: Locale, key: SlideKey): SlideCopy {
  const base = COPY[locale][key];
  if (device === "mac" && key === "capture") {
    return { ...base, sub: MAC_CAPTURE_SUB[locale] };
  }
  return base;
}

function Slide({
  slideKey,
  locale,
  device,
  exportRef,
}: {
  slideKey: SlideKey;
  locale: Locale;
  device: DeviceKey;
  exportRef?: (el: HTMLDivElement | null) => void;
}) {
  const { w, h, layout } = DEVICES[device];
  const copy = copyFor(device, locale, slideKey);
  const dir = device === "iphone" ? "iphone" : device;
  const src = `/screenshots/apple/${dir}/${locale}/${slideKey}.png`;
  const split = layout === "split";
  const frame = {
    position: "relative" as const,
    width: w,
    height: h,
    background: EDITORIAL.bgSubtle,
    overflow: "hidden" as const,
  };

  if (split) {
    // On the iPad landscape canvas, tall screens use the portrait iPad.
    const tall = device === "ipad-landscape" && IPAD_LANDSCAPE_PORTRAIT.has(slideKey);
    const sSrc = tall ? `/screenshots/apple/ipad/${locale}/${slideKey}.png` : src;
    const devH0 = Math.round(h * 0.84);
    const devW = tall ? Math.round((devH0 * 0.96 - 0) * (2064 / 2752)) + 0 : Math.round(w * 0.6);
    const devH = tall
      ? devH0
      : device === "mac"
        ? (devW * 900) / 1440
        : (devW * 2064) / 2752;
    return (
      <div ref={exportRef} style={frame}>
        <div
          style={{
            position: "absolute",
            left: 0.05 * w,
            top: 0,
            height: h,
            width: 0.31 * w,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <TagBar copy={copy} w={w} h={h} split />
          <div style={{ marginTop: 0.05 * h }}>
            <Caption copy={copy} w={w} split />
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: tall ? 0.375 * w + (0.6 * w - devW) / 2 : 0.375 * w,
            top: (h - devH) / 2,
          }}
        >
          {tall ? (
            <TabletFrame src={sSrc} alt={slideKey} width={devW} aspect={2064 / 2752} />
          ) : (
            <DeviceFrame device={device} src={src} alt={slideKey} width={devW} />
          )}
        </div>
      </div>
    );
  }

  if (device === "ipad") {
    const landscape = IPAD_ORIENTATION[slideKey] === "landscape";
    const iSrc = `/screenshots/apple/${landscape ? "ipad-landscape" : "ipad"}/${locale}/${slideKey}.png`;
    return (
      <div ref={exportRef} style={{ ...frame, display: "flex", flexDirection: "column" }}>
        <TagBar copy={copy} w={w} h={h} split={false} />
        <div style={{ marginTop: 0.012 * h }}>
          <Caption copy={copy} w={w} split={false} scale={0.62} />
        </div>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            padding: `${0.03 * h}px ${0.05 * w}px ${0.045 * h}px`,
          }}
        >
          <FittedTablet
            src={iSrc}
            alt={slideKey}
            aspect={landscape ? 2752 / 2064 : 2064 / 2752}
            maxW={Math.round(w * 0.9)}
          />
        </div>
      </div>
    );
  }

  const devW = device === "iphone" ? PHONE_W : Math.round(w * 0.82);
  return (
    <div ref={exportRef} style={frame}>
      <TagBar copy={copy} w={w} h={h} split={false} />
      <div style={{ marginTop: 0.025 * h }}>
        <Caption copy={copy} w={w} split={false} />
      </div>
      <div style={{ marginTop: PHONE_TOP_GAP_RATIO * w, display: "flex", justifyContent: "center" }}>
        <DeviceFrame device={device} src={src} alt={slideKey} width={devW} />
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
  device,
  scale,
}: {
  slideKey: SlideKey;
  locale: Locale;
  device: DeviceKey;
  scale: number;
}) {
  const { w, h } = DEVICES[device];
  return (
    <div
      style={{
        width: w * scale,
        height: h * scale,
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
        borderRadius: 12,
        background: EDITORIAL.bg,
      }}
    >
      <div
        style={{
          width: w,
          height: h,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <Slide slideKey={slideKey} locale={locale} device={device} />
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
  "capture",
  "debts",
  "pace",
  "recap",
];

export default function ScreenshotsPage() {
  const [locale, setLocale] = useState<Locale>("es");
  const [device, setDevice] = useState<DeviceKey>("iphone");
  const [exporting, setExporting] = useState(false);

  const exportRefs = useRef<Map<SlideKey, HTMLDivElement | null>>(new Map());
  const { w, h, label } = DEVICES[device];

  // iPhone exports the 4 store sizes; iPad / Mac export their native size.
  const sizes =
    device === "iphone"
      ? IPHONE_SIZES.map((s) => ({ tag: s.label.replace('"', "in"), w: s.w }))
      : [{ tag: label, w }];

  async function exportSlide(slideKey: SlideKey, sizeIdx: number) {
    const el = exportRefs.current.get(slideKey);
    if (!el) {
      console.error("no el for", slideKey);
      return;
    }
    const target = sizes[sizeIdx];
    const dataUrl = await toPng(el, {
      pixelRatio: target.w / w,
      width: w,
      height: h,
      cacheBust: true,
    });
    const link = document.createElement("a");
    link.download = `${slideKey}-${locale}-editorial-${target.tag}.png`;
    link.href = dataUrl;
    link.click();
  }

  async function exportAll() {
    setExporting(true);
    try {
      for (const key of SLIDE_KEYS) {
        for (let i = 0; i < sizes.length; i++) {
          await exportSlide(key, i);
          await new Promise((r) => setTimeout(r, 250));
        }
      }
    } finally {
      setExporting(false);
    }
  }

  const previewScale = device === "iphone" || device === "ipad" ? 0.2 : 0.12;

  const select = (
    value: string,
    onChange: (v: string) => void,
    options: readonly string[]
  ) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "4px 10px",
        borderRadius: 6,
        border: `1px solid ${EDITORIAL.rule}`,
        background: "#fff",
        fontFamily: EDITORIAL.sans,
      }}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );

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
        <label style={{ fontSize: 12, color: EDITORIAL.inkMuted }}>Device</label>
        {select(device, (v) => setDevice(v as DeviceKey), DEVICE_KEYS)}
        <label style={{ fontSize: 12, color: EDITORIAL.inkMuted }}>Locale</label>
        {select(locale, (v) => setLocale(v as Locale), LOCALES)}
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
          {exporting ? "Exporting…" : `Export 8 × ${sizes.length} size${sizes.length > 1 ? "s" : ""}`}
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
          {device} · {locale} · Canvas {w}×{h} · {SLIDE_KEYS.length} slides
        </span>
      </div>

      {/* GRID — ALL SLIDES IN STORY ORDER */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(${Math.round(w * previewScale) + 28}px, 1fr))`,
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
            <Preview slideKey={key} locale={locale} device={device} scale={previewScale} />
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
              Export {device === "iphone" ? "6.9″" : label}
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
            device={device}
            exportRef={(el) => exportRefs.current.set(key, el)}
          />
        ))}
      </div>
    </div>
  );
}
