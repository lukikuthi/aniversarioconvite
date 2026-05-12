import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const lines = [
  "Você recebeu um convite.",
  "E dessa vez...",
  "é para algo que só acontece uma vez.",
];

interface IntroProps {
  onFinish: () => void;
  onSkip?: () => void;
}

function BokehLights() {
  const orbs = useMemo(() => {
    const colors = [
      "oklch(0.7 0.06 60 / 0.18)",
      "oklch(0.6 0.04 250 / 0.14)",
      "oklch(0.75 0.03 180 / 0.12)",
      "oklch(0.8 0.05 90 / 0.10)",
      "oklch(0.65 0.03 300 / 0.10)",
      "oklch(0.7 0.04 30 / 0.14)",
    ];
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 60 + Math.random() * 180,
      color: colors[i % colors.length],
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 6,
      drift: 20 + Math.random() * 40,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
          }}
          animate={{
            x: [0, orb.drift, -orb.drift * 0.5, 0],
            y: [0, -orb.drift * 0.7, orb.drift * 0.3, 0],
            opacity: [0.4, 0.8, 0.5, 0.4],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Intro({ onFinish, onSkip }: IntroProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [exiting, setExiting] = useState(false);

  const stableOnFinish = useCallback(onFinish, [onFinish]);
  const stableOnSkip = useCallback(() => { if (onSkip) onSkip(); else onFinish(); }, [onSkip, onFinish]);

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
    const onWheel = (e: WheelEvent) => { if (e.deltaY > 5) go(); };
    let startY = 0;
    const onTS = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onTM = (e: TouchEvent) => { if (startY - e.touches[0].clientY > 30) go(); };
    const onKey = (e: KeyboardEvent) => { if (["ArrowDown", "Space", "Enter"].includes(e.code)) go(); };
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

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6"
      initial={{ opacity: 1, y: 0 }}
      animate={exiting ? { opacity: 0, y: -60, scale: 0.97 } : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <BokehLights />

      <button
        onClick={stableOnSkip}
        className="absolute right-5 top-5 z-10 text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        Pular
      </button>

      <div className="relative z-10 w-full max-w-xl text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={lineIndex}
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="cursor text-balance text-2xl font-light leading-snug sm:text-4xl md:text-5xl"
          >
            {text}
          </motion.p>
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-center gap-2">
          {lines.map((_, i) => (
            <motion.span
              key={i}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: i * 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`h-px w-6 origin-left ${i <= lineIndex - 1 ? "bg-foreground" : "bg-muted-foreground/30"}`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showHint && !exiting && (
          <motion.button
            onClick={triggerExit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-10 z-10 flex flex-col items-center gap-3 text-foreground"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Deslize para continuar
            </span>
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
