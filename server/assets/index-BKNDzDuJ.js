import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, X, CalendarDays, Clock, Hop, MapPin, BedDouble, Backpack, CircleAlert, Landmark, Car, Navigation, Gift as Gift$1, Check, ExternalLink, Copy, PartyPopper, Heart, Loader, ArrowDown } from "lucide-react";
const lines = [
  "Você recebeu um convite.",
  "E dessa vez...",
  "é para algo que só acontece uma vez."
];
function BokehLights() {
  const orbs = useMemo(() => {
    const colors = [
      "oklch(0.7 0.06 60 / 0.18)",
      "oklch(0.6 0.04 250 / 0.14)",
      "oklch(0.75 0.03 180 / 0.12)",
      "oklch(0.8 0.05 90 / 0.10)",
      "oklch(0.65 0.03 300 / 0.10)",
      "oklch(0.7 0.04 30 / 0.14)"
    ];
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 60 + Math.random() * 180,
      color: colors[i % colors.length],
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 6,
      drift: 20 + Math.random() * 40
    }));
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: orbs.map((orb) => /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "absolute rounded-full",
      style: {
        width: orb.size,
        height: orb.size,
        left: `${orb.x}%`,
        top: `${orb.y}%`,
        background: `radial-gradient(circle, ${orb.color}, transparent 70%)`
      },
      animate: {
        x: [0, orb.drift, -orb.drift * 0.5, 0],
        y: [0, -orb.drift * 0.7, orb.drift * 0.3, 0],
        opacity: [0.4, 0.8, 0.5, 0.4],
        scale: [1, 1.15, 0.9, 1]
      },
      transition: {
        duration: orb.duration,
        delay: orb.delay,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    orb.id
  )) });
}
function Intro({ onFinish, onSkip }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [exiting, setExiting] = useState(false);
  const stableOnFinish = useCallback(onFinish, [onFinish]);
  const stableOnSkip = useCallback(() => {
    if (onSkip) onSkip();
    else onFinish();
  }, [onSkip, onFinish]);
  const triggerExit = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => stableOnFinish(), 700);
  }, [exiting, stableOnFinish]);
  useEffect(() => {
    if (lineIndex >= lines.length) {
      setShowHint(true);
      return;
    }
    const target = lines[lineIndex];
    let i = 0;
    setText("");
    const typer = setInterval(() => {
      i++;
      setText(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(typer);
        setTimeout(() => setLineIndex((x) => x + 1), 1100);
      }
    }, 55);
    return () => clearInterval(typer);
  }, [lineIndex]);
  useEffect(() => {
    if (!showHint) return;
    const go = () => triggerExit();
    const onWheel = (e) => {
      if (e.deltaY > 5) go();
    };
    let startY = 0;
    const onTS = (e) => {
      startY = e.touches[0].clientY;
    };
    const onTM = (e) => {
      if (startY - e.touches[0].clientY > 30) go();
    };
    const onKey = (e) => {
      if (["ArrowDown", "Space", "Enter"].includes(e.code)) go();
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTS, { passive: true });
    window.addEventListener("touchmove", onTM, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTS);
      window.removeEventListener("touchmove", onTM);
      window.removeEventListener("keydown", onKey);
    };
  }, [showHint, triggerExit]);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6",
      initial: { opacity: 1, y: 0 },
      animate: exiting ? { opacity: 0, y: -60, scale: 0.97 } : { opacity: 1, y: 0, scale: 1 },
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      children: [
        /* @__PURE__ */ jsx(BokehLights, {}),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: stableOnSkip,
            className: "absolute right-5 top-5 z-10 text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors duration-300",
            children: "Pular"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-xl text-center", children: [
          /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 16, filter: "blur(4px)" },
              animate: { opacity: 1, y: 0, filter: "blur(0px)" },
              exit: { opacity: 0, y: -16, filter: "blur(4px)" },
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              className: "cursor text-balance text-2xl font-light leading-snug sm:text-4xl md:text-5xl",
              children: text
            },
            lineIndex
          ) }),
          /* @__PURE__ */ jsx("div", { className: "mt-12 flex items-center justify-center gap-2", children: lines.map((_, i) => /* @__PURE__ */ jsx(
            motion.span,
            {
              initial: { scaleX: 0 },
              animate: { scaleX: 1 },
              transition: { duration: 0.5, delay: i * 0.3, ease: [0.22, 1, 0.36, 1] },
              className: `h-px w-6 origin-left ${i <= lineIndex - 1 ? "bg-foreground" : "bg-muted-foreground/30"}`
            },
            i
          )) })
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: showHint && !exiting && /* @__PURE__ */ jsxs(
          motion.button,
          {
            onClick: triggerExit,
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0 },
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            className: "absolute bottom-10 z-10 flex flex-col items-center gap-3 text-foreground",
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-[11px] uppercase tracking-[0.3em] text-muted-foreground", children: "Deslize para continuar" }),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  animate: { y: [0, 10, 0], opacity: [0.6, 1, 0.6] },
                  transition: { duration: 2, repeat: Infinity, ease: [0.22, 1, 0.36, 1] },
                  children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-5 w-5" })
                }
              )
            ]
          }
        ) })
      ]
    }
  );
}
const img1 = "/aniversarioconvite/assets/gallery-1-BqXEaaa0.png";
const img2 = "/aniversarioconvite/assets/gallery-2-B5s1Ct22.png";
const img3 = "/aniversarioconvite/assets/gallery-3-BYCDrV-g.png";
const img4 = "/aniversarioconvite/assets/gallery-4-Rr-x2Efq.png";
const img5 = "/aniversarioconvite/assets/gallery-5-ChpyuGGN.png";
const img6 = "/aniversarioconvite/assets/gallery-6-DTLDoHYx.png";
const img7 = "/aniversarioconvite/assets/gallery-7-CDpXvbA1.png";
const img8 = "/aniversarioconvite/assets/gallery-8-d5Nx8FpF.png";
const img9 = "/aniversarioconvite/assets/gallery-9-BYNBTyQ_.png";
const img10 = "/aniversarioconvite/assets/gallery-10-BNF8h3PL.png";
const img11 = "/aniversarioconvite/assets/gallery-11-HyHqdiTA.png";
const img12 = "/aniversarioconvite/assets/gallery-12-BdS6Q4oL.png";
const img13 = "/aniversarioconvite/assets/gallery-13-BHp0t_sM.png";
const img14 = "/aniversarioconvite/assets/gallery-14-D4ScuMSb.png";
const photos = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14];
function Gallery() {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(null);
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const scrollTo = (idx) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(photos.length - 1, idx));
    const child = el.children[clamped];
    if (child) {
      const scrollLeft = child.offsetLeft - el.offsetLeft - (el.clientWidth - child.clientWidth) / 2;
      el.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
    setActive(clamped);
  };
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const children = Array.from(el.children);
      const center = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      children.forEach((child, i) => {
        const childCenter = child.offsetLeft - el.offsetLeft + child.clientWidth / 2;
        const dist = Math.abs(center - childCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActive(closest);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxs("section", { ref: sectionRef, className: "relative overflow-hidden py-24 sm:py-32", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-6", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          className: "mb-10 flex items-end justify-between",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-muted-foreground", children: "02 — Local" }),
              /* @__PURE__ */ jsx("h2", { className: "mt-2 text-3xl font-light sm:text-5xl", children: "O lugar." })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "font-mono text-xs text-muted-foreground tabular-nums", children: [
              String(active + 1).padStart(2, "0"),
              " / ",
              String(photos.length).padStart(2, "0")
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 40 },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
          children: /* @__PURE__ */ jsx(
            "div",
            {
              ref: trackRef,
              className: "flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              children: photos.map((src, i) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "relative aspect-[4/5] w-[85%] flex-none snap-center overflow-hidden bg-card sm:w-[60%] md:w-[45%] lg:w-[38%]",
                  children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src,
                        alt: `Chácara ${i + 1}`,
                        onClick: () => setZoom(i),
                        loading: "lazy",
                        className: "h-full w-full cursor-zoom-in object-cover transition-all duration-700 ease-out hover:scale-105 hover:brightness-110"
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" }),
                    /* @__PURE__ */ jsx("div", { className: "absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.25em] text-white/70", children: String(i + 1).padStart(2, "0") })
                  ]
                },
                i
              ))
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: inView ? { opacity: 1 } : {},
          transition: { duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
          className: "mt-6 flex items-center justify-between",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex gap-1.5", children: photos.map((_, i) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => scrollTo(i),
                className: `h-[2px] rounded-full transition-all duration-500 ${active === i ? "w-8 bg-foreground" : "w-4 bg-muted-foreground/30 hover:bg-muted-foreground/50"}`
              },
              i
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => scrollTo(active - 1),
                  disabled: active === 0,
                  className: "flex h-10 w-10 items-center justify-center border border-border transition-all duration-300 hover:border-foreground/30 hover:bg-accent disabled:opacity-30 disabled:pointer-events-none",
                  "aria-label": "anterior",
                  children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => scrollTo(active + 1),
                  disabled: active === photos.length - 1,
                  className: "flex h-10 w-10 items-center justify-center border border-border transition-all duration-300 hover:border-foreground/30 hover:bg-accent disabled:opacity-30 disabled:pointer-events-none",
                  "aria-label": "próxima",
                  children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
                }
              )
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: zoom !== null && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        className: "fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-md",
        onClick: () => setZoom(null),
        children: [
          /* @__PURE__ */ jsx("button", { className: "absolute right-5 top-5 text-foreground transition-colors duration-200 hover:text-muted-foreground", "aria-label": "fechar", children: /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsx(
            motion.img,
            {
              initial: { scale: 0.9, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0.9, opacity: 0 },
              transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              src: photos[zoom],
              alt: "",
              className: "max-h-[90vh] max-w-[95vw] rounded-sm object-contain shadow-2xl"
            },
            zoom
          )
        ]
      }
    ) })
  ] });
}
const TARGET = (/* @__PURE__ */ new Date("2026-06-06T13:00:00-03:00")).getTime();
function diff() {
  const d = TARGET - Date.now();
  if (d <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
  return {
    days: Math.floor(d / 864e5),
    hours: Math.floor(d / 36e5 % 24),
    mins: Math.floor(d / 6e4 % 60),
    secs: Math.floor(d / 1e3 % 60)
  };
}
function Countdown() {
  const [t, setT] = useState(diff());
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1e3);
    return () => clearInterval(id);
  }, []);
  const items = [
    { v: t.days, l: "dias" },
    { v: t.hours, l: "horas" },
    { v: t.mins, l: "min" },
    { v: t.secs, l: "seg" }
  ];
  return /* @__PURE__ */ jsx("div", { ref, className: "grid grid-cols-4 gap-3 sm:gap-5", children: items.map((it, i) => /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 30, scale: 0.95 },
      animate: inView ? { opacity: 1, y: 0, scale: 1 } : {},
      transition: {
        duration: 0.7,
        delay: i * 0.12,
        ease: [0.22, 1, 0.36, 1]
      },
      className: "card-glow relative border border-border bg-card/50 p-5 text-center backdrop-blur-sm transition-all duration-500 hover:border-foreground/20 hover:bg-card/80 sm:p-7",
      children: [
        /* @__PURE__ */ jsx("div", { className: "font-light tabular-nums text-3xl tracking-tight sm:text-5xl md:text-6xl", children: String(it.v).padStart(2, "0") }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground", children: it.l }),
        /* @__PURE__ */ jsx("div", { className: "absolute -top-px -right-px h-3 w-3 border-t border-r border-foreground/20" }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-px -left-px h-3 w-3 border-b border-l border-foreground/20" })
      ]
    },
    it.l
  )) });
}
const ease$2 = [0.22, 1, 0.36, 1];
const eventInfo = [
  {
    icon: CalendarDays,
    label: "Data",
    value: "Sábado, 06 de junho",
    detail: "A partir das 13h"
  },
  {
    icon: Clock,
    label: "Duração",
    value: "Até domingo, 10h",
    detail: "O churrasco começa no sábado e segue até a noite"
  },
  {
    icon: Hop,
    label: "Local",
    value: "Recanto FB",
    detail: "Espaço aberto e aconchegante em Jundiapeba, Mogi das Cruzes"
  },
  {
    icon: MapPin,
    label: "Endereço",
    value: "Recanto FB, Estr. da Esmeralda, 242",
    detail: "Jundiapeba, Mogi das Cruzes - SP, 08700-000"
  },
  {
    icon: BedDouble,
    label: "Hospedagem",
    value: "30 camas disponíveis",
    detail: "Quem não conseguir ir embora tem cama para descansar e ir embora no dia seguinte até as 10:00"
  },
  {
    icon: Backpack,
    label: "O que levar",
    value: "Animação e sede!",
    detail: "Levar traje para banho - Toalha - Caso for dormir: Roupa de Cama - Bebidas de preferência"
  },
  {
    icon: CircleAlert,
    label: "Observação",
    value: "Espaço ao ar livre",
    detail: "Em caso de chuva, temos cobertura"
  },
  {
    icon: Landmark,
    label: "Referência",
    value: "Próximo ao terminal",
    detail: "Perto da estação/terminal de trem de Braz Cubas"
  },
  {
    icon: Car,
    label: "Estacionamento",
    value: "Disponível no local",
    detail: "Espaço para estacionar dentro do recanto"
  },
  {
    icon: Navigation,
    label: "Como chegar",
    value: "Ver no mapa",
    detail: "Google Maps ou Waze"
  }
];
function EventDetails({ onScrollToLocation }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });
  return /* @__PURE__ */ jsx("section", { ref: sectionRef, className: "relative overflow-hidden py-24 sm:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-12 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.7, ease: ease$2 },
          children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-muted-foreground", children: "03 — Evento" }),
            /* @__PURE__ */ jsxs("h2", { className: "mt-4 text-4xl font-light leading-tight sm:text-6xl", children: [
              "Churrasco de",
              /* @__PURE__ */ jsx("br", {}),
              "aniversário."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.7, delay: 0.2, ease: ease$2 },
          className: "flex flex-col justify-end gap-6",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-4 border-b border-border pb-4", children: [
              /* @__PURE__ */ jsx("span", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: "data" }),
              /* @__PURE__ */ jsx("span", { className: "text-xl font-light", children: "06 de junho · Sábado" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-balance leading-relaxed text-muted-foreground", children: "Estou completando 18 anos e não poderia deixar essa data passar em branco. Vai ser um churrasco descontraído, com as pessoas que fazem a diferença na minha vida. Nada de cerimônia — só a gente, boa comida e bons momentos." })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        animate: inView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.7, delay: 0.3, ease: ease$2 },
        className: "mt-12",
        children: /* @__PURE__ */ jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: eventInfo.map((item) => {
          const Icon = item.icon;
          const isMap = item.label === "Como chegar";
          const cardContent = /* @__PURE__ */ jsxs("div", { className: "group relative flex h-full flex-col border border-border bg-card/40 p-5 backdrop-blur-sm transition-all duration-500 hover:border-foreground/20 hover:bg-card/70", children: [
            /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-10 w-10 items-center justify-center border border-foreground/10 bg-foreground/5 text-foreground/60 transition-all duration-300 group-hover:border-foreground/20 group-hover:bg-foreground/10 group-hover:text-foreground", children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: item.label }),
            /* @__PURE__ */ jsx("div", { className: "mt-1.5 text-sm font-light leading-snug", children: item.value }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs leading-relaxed text-muted-foreground", children: item.detail || " " })
          ] });
          if (isMap) {
            return /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onScrollToLocation,
                className: "text-left",
                children: cardContent
              },
              item.label
            );
          }
          return /* @__PURE__ */ jsx("div", { children: cardContent }, item.label);
        }) })
      }
    )
  ] }) });
}
const img = (name) => new URL(`../assets/gifts/${name}`, import.meta.url).href;
const ease$1 = [0.22, 1, 0.36, 1];
const PIX_KEY = "431.110.458-89";
const gifts = [
  {
    id: "pe",
    name: "Pe de meia",
    description: "Auxílio para comprar uma Porshe",
    price: "R$ 200,00",
    image: img("pedemeia.png"),
    link: ""
  },
  {
    id: "escapamento",
    name: "Escapamento Esportivo",
    description: "Fazer Pops and Bangs na Porshe que vou comprar com o auxílio",
    price: "R$ 1.000 — R$ 2.000",
    image: img("escapamento.png"),
    link: ""
  },
  {
    id: "relogio",
    name: "Rolex",
    description: "Um acessorio que marca estilo e tempo",
    price: "R$ 1M — R$ 10M",
    image: img("relogio.png"),
    link: ""
  },
  {
    id: "luva",
    name: "Luva Maximum",
    description: "Para investir na minha carreira do MMA",
    price: "R$ 500 — R$ 600",
    image: img("luva.png"),
    link: "https://www.maximumshop.com.br/luva-de-boxe-e-muay-thai-preta-detalhes-dourado"
  },
  {
    id: "caneleira",
    name: "Caneleira Maximum",
    description: "Pratica e estilosa para o dia a dia",
    price: "R$ 100 — R$ 500",
    image: img("caneleira.png"),
    link: "https://www.maximumshop.com.br/equipamentos/caneleira-muay-thai-e-kickboxing-profissional-black"
  },
  {
    id: "monitor",
    name: "Monitor Display Port",
    description: "Monitor COM entrada Display port",
    price: "R$ 500 — R$ 700",
    image: img("monitor.png"),
    link: "https://www.mercadolivre.com.br/p/MLB57489948?pdp_filters=item_id%3AMLB4452425949#polycard_client=cart_list&wid=MLB4452425949&sid=cart"
  },
  {
    id: "suporte",
    name: "Suporte Articulado",
    description: "Suporte Duplo para monitores",
    price: "Qualquer valor",
    image: img("braco.png"),
    link: "https://www.pichau.com.br/suporte-articulado-para-monitor-pichau-hl100-17-pol-a-40-pol-preto-e-branco-pch-lot100-bl01?srsltid=AfmBOooMbfgUU5quCsnRH8iGqEPkVDnWgE1hitf4vcFSLNeR_E7rtkxpPvM"
  },
  {
    id: "mouse",
    name: "Mouse",
    description: "Para jogar Valorant com os amigos",
    price: "Qualquer valor",
    image: img("mouse.png"),
    link: "https://www.kabum.com.br/produto/883555/mouse-gamer-sem-fio-attack-shark-x6-26000-dpi-paw3395-tri-modo-com-dock-magnetico-rgb-preto?srsltid=AfmBOorAesZC2emV1ec5pV_9U2dvT4siFJ5j-QMvv8pgJUXAwpvfvbaFQl0"
  },
  {
    id: "teclado",
    name: "Teclado",
    description: "Para programar, fazer meus projetos e ganhar dinheiro",
    price: "Qualquer valor",
    image: img("teclado.png"),
    link: "https://www.amazon.com.br/ATTACK-SHARK-mec%C3%A2nico-interruptor-retroilumina%C3%A7%C3%A3o/dp/B0DJ13PMKD/ref=asc_df_B0DJ13PMKD?mcid=241e26e73ba23aa88b32e5abf40b521a&tag=googleshopp00-20&linkCode=df0&hvadid=721185796203&hvpos=&hvnetw=g&hvrand=5281970612402927499&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9199108&hvtargid=pla-2374768376294&psc=1&gad_source=1"
  },
  {
    id: "ps4",
    name: "PS4",
    description: "Para jogar com os amigos",
    price: "R$ 1.000 - R$ 1.800",
    image: img("ps4.png"),
    link: "https://www.mercadolivre.com.br/sony-playstation-4-slim-500gb-uncharted-4-a-thiefs-end-bundle-cor-preto-onyx-excelente-recondicionado/p/MLB2014104756?pdp_filters=item_id%3AMLB6223179414&from=gshop&matt_tool=91562990&matt_word=&matt_source=google&matt_campaign_id=22090193891&matt_ad_group_id=191545542882&matt_match_type=&matt_network=g&matt_device=c&matt_creative=787871501933&matt_keyword=&matt_ad_position=&matt_ad_type=pla&matt_merchant_id=735098660&matt_product_id=MLB2014104756-product&matt_product_partition_id=2452780900702&matt_target_id=aud-2009166904988:pla-2452780900702&cq_src=google_ads&cq_cmp=22090193891&cq_net=g&cq_plt=gp&cq_med=pla&gad_source=1&gad_campaignid=22090193891&gbraid=0AAAAAD93qcAmNwN4kuh6Y1K69TwU6aZbf&gclid=CjwKCAjwidXQBhAZEiwA4egw6PTLwNRGtcnbgAT0VcrGYYHbqZkLC9lauvNcPdn2UmJLyoXEWkMy4hoCyloQAvD_BwE"
  },
  {
    id: "ps5",
    name: "PS5",
    description: "Para jogar GTA 6",
    price: "R$ 2.000 - R$4.000",
    image: img("ps5.png"),
    link: "https://www.google.com/search?q=consoles+de+playstation&ibp=oshop&prds=catalogid:8512600371043032303,headlineOfferDocid:7655658577421792367,merchantid:5706279852,localOfferStoreId:2133614431067063638,pvt:hg,pvo:27,pvcb:4&pvorigin=27&ei=8IYVaoqeE_uw5OUPsYLuoQw&gclsrc=aw.ds&gad_source=1&gad_campaignid=23867856604&gbraid=0AAAAAD2HY4vRdhSo3zoIrMDqI4f-jrW_M&gclid=CjwKCAjwidXQBhAZEiwA4egw6M24dOSmlknuS8jR6gUNQn0fAqvUY-OKnCwRHSkqHO-73s3fesch7RoCN4cQAvD_BwE"
  },
  {
    id: "trafego",
    name: "Trafego Pago",
    description: "Me ajudar a ganhar dinheiro",
    price: "Qualquer valor",
    image: img("trafego.png"),
    link: ""
  },
  {
    id: "cadeira",
    name: "Cadeira nova",
    description: "Cadeira boa e nova para nao doer a bunda",
    price: "Qualquer valor",
    image: img("cadeira.png"),
    link: "https://www.kabum.com.br/produto/134178/cadeira-gamer-husky-tempest-700-ate-145kg-almofadas-reclinavel-150-pu-descanso-para-pes-cinza-hcg700cz?gclsrc=aw.ds&&utm_id=22429583668&gad_source=4&gad_campaignid=22429583668&gbraid=0AAAAADx-HyENNFiLFrrmTyhfF2caRg1-d&gclid=Cj0KCQjw2YDQBhD_ARIsAE1qeScCXkkYJZq3OAzf6VkMqLBn8FXEaXyNw4K4dS76MVxLOG51hWpRSg0aApkSEALw_wcB"
  },
  {
    id: "fone",
    name: "Headset",
    description: "Aqui eu sou exigente, precisa ser RAZER ou HAVIT, LOGITECH..",
    price: "Qualquer valor",
    image: img("headset.png"),
    link: "https://www.kabum.com.br/produto/128544/headset-gamer-razer-blackshark-v2-x-drivers-50mm-surround-7-1-3-5-mm-preto-rz04-03240100-r3u1?gclsrc=aw.ds&&utm_id=22446425996&gad_source=1&gad_campaignid=22446425996&gbraid=0AAAAADx-HyGwlHecQ8YJrarhjH_77CT1c&gclid=Cj0KCQjw2YDQBhD_ARIsAE1qeScI4cD00_nGxpcSMnCsFAXj3DyMaZq15G9YKY7CKXh4Pnsu8YevoNwaAiBiEALw_wcB"
  },
  {
    id: "perfume",
    name: "Perfume",
    description: "Pra ficar cheiroso sempre",
    price: "Qualquer valor",
    image: img("perfume.png"),
    link: ""
  },
  {
    id: "caixinha",
    name: "Auxílio Picanha",
    description: "Escolha algo que voce acha que eu vou gostar",
    price: "Voce decide - Qualquer valor",
    image: img("caixinha.png"),
    link: ""
  }
];
function Gift() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-40px" });
  const copy = async () => {
    await navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const scrollAmount = 260;
    el.scrollBy({ left: dir === "right" ? scrollAmount : -scrollAmount, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxs("div", { ref: sectionRef, className: "border-t border-border py-4", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: inView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6, ease: ease$1 },
        children: /* @__PURE__ */ jsxs(
          motion.button,
          {
            onClick: () => setOpen((o) => !o),
            className: "gift-cta group relative flex w-full items-center justify-between overflow-hidden border border-foreground/20 bg-foreground/5 px-5 py-4 backdrop-blur-sm transition-all duration-500 hover:border-foreground/40 hover:bg-foreground/10",
            whileHover: { scale: 1.01 },
            whileTap: { scale: 0.98 },
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-foreground/0 via-foreground/5 to-foreground/0 gift-shimmer" }),
              /* @__PURE__ */ jsxs("span", { className: "relative flex items-center gap-3 text-base font-light tracking-wide text-foreground/80 transition-colors duration-300 group-hover:text-foreground", children: [
                /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    animate: {
                      rotate: [0, 12, -8, 6, -3, 0],
                      scale: [1, 1.15, 0.95, 1.08, 1]
                    },
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: [0.22, 1, 0.36, 1]
                    },
                    className: "inline-flex",
                    children: /* @__PURE__ */ jsx(Gift$1, { className: "h-5 w-5" })
                  }
                ),
                "Quer levar um presente?",
                /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    animate: { opacity: [0.5, 1, 0.5] },
                    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    className: "text-xs uppercase tracking-[0.2em] text-foreground/60",
                    children: "CLIQUE AQUI"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                motion.span,
                {
                  animate: { rotate: open ? 45 : 0 },
                  transition: { duration: 0.3, ease: ease$1 },
                  className: "relative text-lg text-foreground/60 transition-colors duration-300 group-hover:text-foreground",
                  children: "+"
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
        transition: { duration: 0.4, ease: ease$1 },
        className: "overflow-hidden",
        children: /* @__PURE__ */ jsxs("div", { className: "pt-6 space-y-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-balance text-base font-light leading-relaxed sm:text-lg", children: "Sua presença já é o melhor presente." }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Mas se quiser me surpreender, deslize e veja algumas sugestões: (imagens feitas por I.A)" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => scroll("left"), className: "gift-scroll-btn hidden sm:flex", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsx(
              "div",
              {
                ref: trackRef,
                className: "flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                children: gifts.map((gift, i) => /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.5, delay: i * 0.06, ease: ease$1 },
                    className: "group relative flex flex-none flex-col snap-center overflow-hidden border border-border bg-card/40 transition-all duration-500 hover:border-foreground/20 hover:bg-card/70",
                    style: { width: "75%", maxWidth: "220px" },
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/3] overflow-hidden", children: [
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: gift.image,
                            alt: gift.name,
                            loading: "lazy",
                            className: "h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                          }
                        ),
                        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col p-4", children: [
                        /* @__PURE__ */ jsx("h3", { className: "text-sm font-light tracking-wide", children: gift.name }),
                        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs leading-relaxed text-muted-foreground", children: gift.description }),
                        /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs font-medium uppercase tracking-widest text-foreground/80", children: gift.price }),
                        /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-4 space-y-2", children: [
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              onClick: copy,
                              className: "inline-flex w-full items-center justify-center gap-2 border border-foreground bg-foreground px-3 py-2.5 text-[10px] uppercase tracking-[0.2em] text-background transition-all duration-300 hover:bg-transparent hover:text-foreground",
                              children: copied ? /* @__PURE__ */ jsxs(Fragment, { children: [
                                /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" }),
                                " Copiado!"
                              ] }) : "Fazer o Pix!"
                            }
                          ),
                          /* @__PURE__ */ jsxs(
                            "a",
                            {
                              href: gift.link || "#",
                              target: "_blank",
                              rel: "noreferrer",
                              onClick: gift.link ? void 0 : (e) => e.preventDefault(),
                              className: `inline-flex w-full items-center justify-center gap-2 border border-border px-3 py-2.5 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${gift.link ? "text-muted-foreground hover:border-foreground/30 hover:text-foreground" : "text-muted-foreground/40 cursor-default pointer-events-none"}`,
                              children: [
                                "Comprar ",
                                /* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3" })
                              ]
                            }
                          )
                        ] })
                      ] })
                    ]
                  },
                  gift.id
                ))
              }
            ),
            /* @__PURE__ */ jsx("button", { onClick: () => scroll("right"), className: "gift-scroll-btn hidden sm:flex", children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: copy,
              className: "flex w-full items-center justify-between border border-border px-4 py-3 transition-colors duration-300 hover:bg-accent",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Chave Pix" }),
                  /* @__PURE__ */ jsx("div", { className: "mt-0.5 font-mono text-sm", children: PIX_KEY })
                ] }),
                /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    initial: { scale: 0.8, opacity: 0 },
                    animate: { scale: 1, opacity: 1 },
                    exit: { scale: 0.8, opacity: 0 },
                    transition: { duration: 0.2 },
                    children: copied ? /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" })
                  },
                  copied ? "check" : "copy"
                ) })
              ]
            }
          ) })
        ] })
      }
    ) })
  ] });
}
const ease = [0.22, 1, 0.36, 1];
function Rsvp() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("sim");
  const [guests, setGuests] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || status === "loading") return;
    {
      setError("Formulário não configurado. Adicione VITE_GOOGLE_SCRIPT_URL ao .env");
      return;
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "mx-auto mt-12 max-w-md text-left", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: status === "done" ? /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.9, y: 20 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.9 },
      transition: { duration: 0.6, ease },
      className: "relative overflow-hidden border border-foreground/20 bg-card/50 py-10 text-center backdrop-blur-sm",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-foreground/5 to-transparent" }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { scale: 0 },
            animate: { scale: 1 },
            transition: { duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 },
            className: "relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-foreground/20 bg-foreground text-background",
            children: /* @__PURE__ */ jsx(Check, { className: "h-6 w-6" })
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.4, ease },
            className: "relative text-sm uppercase tracking-[0.25em]",
            children: "Presença confirmada"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.5, delay: 0.6, ease },
            className: "relative mt-3 text-sm text-muted-foreground",
            children: attending === "sim" ? "Mal posso esperar para te ver lá!" : "Que pena! Vou sentir sua falta."
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.5, delay: 0.8, ease },
            className: "relative mt-4 flex items-center justify-center gap-1 text-muted-foreground",
            children: [
              /* @__PURE__ */ jsx(PartyPopper, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs", children: "06 de junho · Recanto FB" })
            ]
          }
        )
      ]
    },
    "done"
  ) : /* @__PURE__ */ jsxs(
    motion.form,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, y: -10 },
      transition: { duration: 0.4, ease },
      onSubmit,
      className: "space-y-6",
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Seu nome" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              value: name,
              onChange: (e) => setName(e.target.value),
              required: true,
              maxLength: 120,
              className: "mt-2 w-full border-b border-border bg-transparent py-3 text-base outline-none transition-all duration-300 focus:border-foreground focus:pb-4",
              placeholder: "Como te chamamos?"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "block text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Vai dar presença?" }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 grid grid-cols-2 gap-3", children: ["sim", "nao"].map((opt) => /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setAttending(opt),
              className: `group relative overflow-hidden border px-5 py-4 text-xs uppercase tracking-[0.2em] transition-all duration-300 ${attending === opt ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"}`,
              children: [
                attending === opt && /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    layoutId: "rsvp-indicator",
                    className: "absolute inset-0 bg-foreground",
                    transition: { duration: 0.3, ease }
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "relative z-10 flex items-center justify-center gap-2", children: opt === "sim" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(Heart, { className: "h-3 w-3" }),
                  " Claro!"
                ] }) : "Não posso ir" })
              ]
            },
            opt
          )) })
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: attending === "sim" && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.35, ease },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxs("div", { className: "pb-1", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Quantos acompanhantes?" }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-4", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setGuests((g) => Math.max(0, g - 1)),
                    className: "flex h-10 w-10 items-center justify-center border border-border text-sm transition-all duration-300 hover:border-foreground/30 hover:bg-foreground hover:text-background",
                    children: "-"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "w-8 text-center text-lg tabular-nums", children: guests }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setGuests((g) => Math.min(10, g + 1)),
                    className: "flex h-10 w-10 items-center justify-center border border-border text-sm transition-all duration-300 hover:border-foreground/30 hover:bg-foreground hover:text-background",
                    children: "+"
                  }
                )
              ] })
            ] })
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "block text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: [
            "Deixe um recado ",
            /* @__PURE__ */ jsx("span", { className: "opacity-60", children: "(opcional)" })
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: message,
              onChange: (e) => setMessage(e.target.value),
              maxLength: 500,
              rows: 2,
              className: "mt-2 w-full resize-none border-b border-border bg-transparent py-3 text-base outline-none transition-all duration-300 focus:border-foreground focus:pb-4",
              placeholder: "Algo que você queira dizer..."
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: status === "loading" || !name.trim(),
            className: "mt-2 inline-flex w-full items-center justify-center gap-3 border border-foreground bg-foreground px-8 py-4 text-sm uppercase tracking-[0.25em] text-background transition-all duration-300 hover:bg-transparent hover:text-foreground disabled:opacity-40",
            children: status === "loading" ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Loader, { className: "h-4 w-4 animate-spin" }),
              " Enviando..."
            ] }) : /* @__PURE__ */ jsx(Fragment, { children: "Confirmar presença" })
          }
        ),
        error && /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: -5 },
            animate: { opacity: 1, y: 0 },
            className: "text-center text-xs text-muted-foreground",
            children: error
          }
        )
      ]
    },
    "form"
  ) }) });
}
const heroImg = "/aniversarioconvite/assets/hero-BTG79YbB.png";
const ADDRESS = "Recanto FB, Estr. da Esmeralda, 242 - Jundiapeba, Mogi das Cruzes - SP, 08700-000";
const ADDRESS_QUERY = encodeURIComponent("Recanto FB, Estr. da Esmeralda, 242, Jundiapeba, Mogi das Cruzes - SP");
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0
  }
};
function FadeIn({
  children,
  className = "",
  delay = 0
}) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-60px"
  });
  return /* @__PURE__ */ jsx(motion.div, { ref, variants: fadeUp, initial: "hidden", animate: inView ? "visible" : "hidden", transition: {
    duration: 0.7,
    delay,
    ease: [0.22, 1, 0.36, 1]
  }, className, children });
}
function Section({
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsx("section", { className: `mx-auto max-w-4xl px-6 ${className}`, children });
}
function AnimatedTitle() {
  const [number, setNumber] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let frame = 0;
    const totalFrames = 40;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      setNumber(Math.round(eased * 18));
      if (frame >= totalFrames) {
        clearInterval(interval);
        setDone(true);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsxs(motion.h1, { initial: {
    opacity: 0,
    y: 40
  }, animate: {
    opacity: 1,
    y: 0
  }, transition: {
    duration: 0.8,
    delay: 0.4,
    ease: [0.22, 1, 0.36, 1]
  }, className: "mt-6 text-balance text-5xl font-extralight leading-[0.95] sm:text-7xl md:text-8xl", children: [
    /* @__PURE__ */ jsx("span", { className: "text-shimmer inline-block text-6xl font-bold sm:text-8xl md:text-9xl", style: {
      fontVariantNumeric: "tabular-nums"
    }, children: number }),
    /* @__PURE__ */ jsx(motion.span, { initial: {
      opacity: 0,
      x: -10
    }, animate: done ? {
      opacity: 1,
      x: 0
    } : {}, transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }, className: "text-reflective ml-2", children: "anos." })
  ] });
}
function Index() {
  const [showIntro, setShowIntro] = useState(true);
  const [copied, setCopied] = useState(false);
  const rsvpRef = useRef(null);
  const locationRef = useRef(null);
  const scrollToRsvp = () => {
    rsvpRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  };
  const scrollToLocation = () => {
    setShowIntro(false);
    setTimeout(() => {
      locationRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };
  const goToLocation = () => {
    locationRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };
  const copyAddress = async () => {
    await navigator.clipboard.writeText(ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxs("main", { className: "relative min-h-screen overflow-x-hidden bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(AnimatePresence, { children: showIntro && /* @__PURE__ */ jsx(Intro, { onFinish: () => setShowIntro(false), onSkip: scrollToLocation }) }),
    !showIntro && /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }, children: [
      /* @__PURE__ */ jsxs("section", { className: "relative flex min-h-screen flex-col justify-between overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
          /* @__PURE__ */ jsx("img", { src: heroImg, alt: "", className: "h-full w-full object-cover opacity-30" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "glow-orb glow-orb-warm right-1/4 top-1/4 h-96 w-96 animate-pulse-glow" }),
        /* @__PURE__ */ jsx("div", { className: "glow-orb glow-orb-cool left-1/4 bottom-1/3 h-64 w-64 animate-pulse-glow" }),
        /* @__PURE__ */ jsx("div", { className: "relative z-10 pt-6" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 px-6 pb-20 pt-32 sm:pt-48", children: [
          /* @__PURE__ */ jsx(motion.p, { initial: {
            opacity: 0,
            y: 20
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            duration: 0.6,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1]
          }, className: "text-[11px] uppercase tracking-[0.3em] text-muted-foreground", children: "01 — O momento" }),
          /* @__PURE__ */ jsx(AnimatedTitle, {}),
          /* @__PURE__ */ jsx(motion.p, { initial: {
            opacity: 0,
            y: 20
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            duration: 0.6,
            delay: 1.2,
            ease: [0.22, 1, 0.36, 1]
          }, className: "mt-8 max-w-md text-balance text-base leading-relaxed text-muted-foreground sm:text-lg", children: "Uma idade que só chega uma vez. E eu quero comemorar com quem faz parte da minha história. Nada de cerimônia — só presença, boa comida e ótimas memórias." }),
          /* @__PURE__ */ jsxs(motion.div, { initial: {
            opacity: 0,
            y: 20
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            duration: 0.6,
            delay: 1.4,
            ease: [0.22, 1, 0.36, 1]
          }, className: "mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Quando" }),
              /* @__PURE__ */ jsx("div", { className: "mt-1", children: "06 de junho · Sábado" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Onde" }),
              /* @__PURE__ */ jsx("div", { className: "mt-1", children: "Recanto FB · Mogi das Cruzes" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(motion.div, { initial: {
            opacity: 0,
            y: 20
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            duration: 0.6,
            delay: 1.6,
            ease: [0.22, 1, 0.36, 1]
          }, className: "mt-12 flex flex-col items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground", children: "Confirmar presença no final da página" }),
            /* @__PURE__ */ jsx(motion.button, { onClick: scrollToRsvp, animate: {
              y: [0, 8, 0],
              opacity: [0.4, 1, 0.4]
            }, transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }, className: "text-muted-foreground hover:text-foreground transition-colors duration-300", "aria-label": "Rolar para baixo", children: /* @__PURE__ */ jsx(ArrowDown, { className: "h-5 w-5" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Section, { className: "py-24 sm:py-32", children: [
        /* @__PURE__ */ jsxs(FadeIn, { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-muted-foreground", children: "Contagem regressiva" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Faltam poucos dias para o grande dia" })
        ] }),
        /* @__PURE__ */ jsx(FadeIn, { delay: 0.15, children: /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(Countdown, {}) }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hairline mx-auto max-w-4xl" }),
      /* @__PURE__ */ jsx(EventDetails, { onScrollToLocation: goToLocation }),
      /* @__PURE__ */ jsx("div", { className: "hairline mx-auto max-w-4xl" }),
      /* @__PURE__ */ jsx(Gallery, {}),
      /* @__PURE__ */ jsx("div", { className: "hairline mx-auto max-w-4xl" }),
      /* @__PURE__ */ jsx("div", { ref: locationRef, children: /* @__PURE__ */ jsxs(Section, { className: "relative overflow-hidden py-24 sm:py-32", children: [
        /* @__PURE__ */ jsxs(FadeIn, { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-[0.3em] text-muted-foreground", children: "04 — Endereço" }),
          /* @__PURE__ */ jsx("h2", { className: "mt-4 text-4xl font-light sm:text-6xl", children: "Como chegar." }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-base leading-relaxed text-muted-foreground", children: "O Recanto FB fica em Jundiapeba, Mogi das Cruzes. É fácil de acessar e tem estacionamento no local para quem for de carro." })
        ] }),
        /* @__PURE__ */ jsxs(FadeIn, { delay: 0.15, children: [
          /* @__PURE__ */ jsxs("div", { className: "mt-10 space-y-1 text-base leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { children: "Recanto FB, Estr. da Esmeralda, 242" }),
            /* @__PURE__ */ jsx("p", { children: "Jundiapeba" }),
            /* @__PURE__ */ jsx("p", { children: "Mogi das Cruzes — SP" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "08700-000" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-6 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsx("span", { className: "text-foreground", children: "Referência:" }),
            " próximo à estação/terminal Braz Cubas."
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 overflow-hidden border border-border", children: /* @__PURE__ */ jsx("iframe", { src: `https://www.google.com/maps?q=${ADDRESS_QUERY}&output=embed`, width: "100%", height: "250", style: {
            border: 0
          }, allowFullScreen: true, loading: "lazy", referrerPolicy: "no-referrer-when-downgrade", title: "Localização do evento", className: "w-full" }) })
        ] }),
        /* @__PURE__ */ jsx(FadeIn, { delay: 0.25, children: /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-3 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("a", { href: `https://www.google.com/maps/search/?api=1&query=${ADDRESS_QUERY}`, target: "_blank", rel: "noreferrer", className: "group flex items-center justify-between border border-border px-5 py-4 transition-all duration-300 hover:bg-foreground hover:text-background", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3 text-sm", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
              " Google Maps"
            ] }),
            /* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3 opacity-40 transition-opacity duration-300 group-hover:opacity-100" })
          ] }),
          /* @__PURE__ */ jsxs("a", { href: `https://waze.com/ul?q=${ADDRESS_QUERY}&navigate=yes`, target: "_blank", rel: "noreferrer", className: "group flex items-center justify-between border border-border px-5 py-4 transition-all duration-300 hover:bg-foreground hover:text-background", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3 text-sm", children: [
              /* @__PURE__ */ jsx(Navigation, { className: "h-4 w-4" }),
              " Waze"
            ] }),
            /* @__PURE__ */ jsx(ExternalLink, { className: "h-3 w-3 opacity-40 transition-opacity duration-300 group-hover:opacity-100" })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: copyAddress, className: "group flex items-center justify-between border border-border px-5 py-4 transition-all duration-300 hover:bg-foreground hover:text-background", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3 text-sm", children: [
            copied ? /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" }),
            copied ? "Endereço copiado!" : "Copiar endereço"
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsx(Gift, {}),
        /* @__PURE__ */ jsx(motion.div, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, transition: {
          delay: 0.5,
          duration: 0.6
        }, className: "flex justify-center pt-8", children: /* @__PURE__ */ jsx(motion.div, { animate: {
          y: [0, 8, 0]
        }, transition: {
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut"
        }, className: "text-muted-foreground/50", children: /* @__PURE__ */ jsx(ArrowDown, { className: "h-5 w-5" }) }) })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { ref: rsvpRef, className: "relative overflow-hidden py-16 sm:py-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-6 text-center", children: [
          /* @__PURE__ */ jsxs(FadeIn, { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-balance text-4xl font-light leading-[1.1] sm:text-6xl md:text-7xl", children: [
              /* @__PURE__ */ jsx("span", { className: "text-shimmer font-bold", children: "18" }),
              " anos só acontecem",
              /* @__PURE__ */ jsx("br", {}),
              "uma vez."
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-8 text-balance text-base text-muted-foreground sm:text-lg", children: "E eu quero que você esteja lá comigo. Confirme sua presença e vamos criar memórias que vão ficar para sempre." })
          ] }),
          /* @__PURE__ */ jsx(Rsvp, {})
        ] }),
        /* @__PURE__ */ jsxs("footer", { className: "mt-16 flex items-center justify-between border-t border-border px-6 pt-6 text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: [
          /* @__PURE__ */ jsx("span", { children: "Desenvolvido por" }),
          /* @__PURE__ */ jsx("span", { className: "opacity-40", children: "—" }),
          /* @__PURE__ */ jsx("span", { children: "@lukikuthi.dev" })
        ] })
      ] })
    ] })
  ] });
}
export {
  Index as component
};
