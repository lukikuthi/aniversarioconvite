import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const TARGET = new Date("2026-06-06T13:00:00-03:00").getTime();

function diff() {
  const d = TARGET - Date.now();
  if (d <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    mins: Math.floor((d / 60000) % 60),
    secs: Math.floor((d / 1000) % 60),
  };
}

export default function Countdown() {
  const [t, setT] = useState(diff());
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { v: t.days, l: "dias" },
    { v: t.hours, l: "horas" },
    { v: t.mins, l: "min" },
    { v: t.secs, l: "seg" },
  ];

  return (
    <div ref={ref} className="grid grid-cols-4 gap-3 sm:gap-5">
      {items.map((it, i) => (
        <motion.div
          key={it.l}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            duration: 0.7,
            delay: i * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="card-glow relative border border-border bg-card/50 p-5 text-center backdrop-blur-sm transition-all duration-500 hover:border-foreground/20 hover:bg-card/80 sm:p-7"
        >
          <div className="font-light tabular-nums text-3xl tracking-tight sm:text-5xl md:text-6xl">
            {String(it.v).padStart(2, "0")}
          </div>
          <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {it.l}
          </div>
          <div className="absolute -top-px -right-px h-3 w-3 border-t border-r border-foreground/20" />
          <div className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-foreground/20" />
        </motion.div>
      ))}
    </div>
  );
}
