import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import img1 from "@/assets/gallery-1.png";
import img2 from "@/assets/gallery-2.png";
import img3 from "@/assets/gallery-3.png";
import img4 from "@/assets/gallery-4.png";
import img5 from "@/assets/gallery-5.png";
import img6 from "@/assets/gallery-6.png";
import img7 from "@/assets/gallery-7.png";
import img8 from "@/assets/gallery-8.png";
import img9 from "@/assets/gallery-9.png";
import img10 from "@/assets/gallery-10.png";
import img11 from "@/assets/gallery-11.png";
import img12 from "@/assets/gallery-12.png";
import img13 from "@/assets/gallery-13.png";
import img14 from "@/assets/gallery-14.png";

const photos = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14];

export default function Gallery() {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const scrollTo = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(photos.length - 1, idx));
    const child = el.children[clamped] as HTMLElement;
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
      const children = Array.from(el.children) as HTMLElement[];
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

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">02 — Local</p>
            <h2 className="mt-2 text-3xl font-light sm:text-5xl">O lugar.</h2>
          </div>
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            {String(active + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {photos.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/5] w-[85%] flex-none snap-center overflow-hidden bg-card sm:w-[60%] md:w-[45%] lg:w-[38%]"
              >
                <img
                  src={src}
                  alt={`Chácara ${i + 1}`}
                  onClick={() => setZoom(i)}
                  loading="lazy"
                  className="h-full w-full cursor-zoom-in object-cover transition-all duration-700 ease-out hover:scale-105 hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.25em] text-white/70">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex items-center justify-between"
        >
          <div className="flex gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`h-[2px] rounded-full transition-all duration-500 ${
                  active === i
                    ? "w-8 bg-foreground"
                    : "w-4 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scrollTo(active - 1)}
              disabled={active === 0}
              className="flex h-10 w-10 items-center justify-center border border-border transition-all duration-300 hover:border-foreground/30 hover:bg-accent disabled:opacity-30 disabled:pointer-events-none"
              aria-label="anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollTo(active + 1)}
              disabled={active === photos.length - 1}
              className="flex h-10 w-10 items-center justify-center border border-border transition-all duration-300 hover:border-foreground/30 hover:bg-accent disabled:opacity-30 disabled:pointer-events-none"
              aria-label="próxima"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {zoom !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-md"
            onClick={() => setZoom(null)}
          >
            <button className="absolute right-5 top-5 text-foreground transition-colors duration-200 hover:text-muted-foreground" aria-label="fechar">
              <X className="h-6 w-6" />
            </button>
            <motion.img
              key={zoom}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              src={photos[zoom]}
              alt=""
              className="max-h-[90vh] max-w-[95vw] rounded-sm object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
