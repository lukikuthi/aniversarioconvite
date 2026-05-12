import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Copy, MapPin, Navigation, Check, ArrowDown, ExternalLink } from "lucide-react";
import Intro from "@/components/Intro";
import Gallery from "@/components/Gallery";
import Countdown from "@/components/Countdown";
import EventDetails from "@/components/EventDetails";
import Gift from "@/components/Gift";
import Rsvp from "@/components/Rsvp";
import heroImg from "@/assets/hero.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "18 anos do Lucas" },
      { name: "description", content: "Churrasco de aniversário · 06 de junho · Recanto FB" },
    ],
  }),
});

const ADDRESS = "Estr. da Esmeralda, 242 — Jundiapeba, Mogi das Cruzes - SP, 08700-000";
const ADDRESS_QUERY = encodeURIComponent("Recanto FB, Estr. da Esmeralda, 242, Jundiapeba, Mogi das Cruzes - SP");

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-4xl px-6 ${className}`}>{children}</section>;
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

  return (
    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mt-6 text-balance text-5xl font-extralight leading-[0.95] sm:text-7xl md:text-8xl"
    >
      <span className="text-shimmer inline-block text-6xl font-bold sm:text-8xl md:text-9xl" style={{ fontVariantNumeric: "tabular-nums" }}>
        {number}
      </span>
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={done ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-reflective ml-2"
      >
        anos.
      </motion.span>
    </motion.h1>
  );
}

function Index() {
  const [showIntro, setShowIntro] = useState(true);
  const [copied, setCopied] = useState(false);
  const rsvpRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  const scrollToRsvp = () => {
    rsvpRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const scrollToLocation = () => {
    setShowIntro(false);
    setTimeout(() => {
      locationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const goToLocation = () => {
    locationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyAddress = async () => {
    await navigator.clipboard.writeText(ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <AnimatePresence>
        {showIntro && <Intro onFinish={() => setShowIntro(false)} onSkip={scrollToLocation} />}
      </AnimatePresence>

      {!showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* HERO */}
          <section className="relative flex min-h-screen flex-col justify-between overflow-hidden">
            <div className="absolute inset-0">
              <img src={heroImg} alt="" className="h-full w-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
            </div>

            <div className="glow-orb glow-orb-warm right-1/4 top-1/4 h-96 w-96 animate-pulse-glow" />
            <div className="glow-orb glow-orb-cool left-1/4 bottom-1/3 h-64 w-64 animate-pulse-glow" />

            <div className="relative z-10 pt-6" />

            <div className="relative z-10 px-6 pb-20 pt-32 sm:pt-48">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground"
              >
                01 — O momento
              </motion.p>

              <AnimatedTitle />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 max-w-md text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                Uma idade que só chega uma vez. E eu quero comemorar com quem
                faz parte da minha história. Nada de cerimônia — só presença,
                boa comida e ótimas memórias.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Quando</div>
                  <div className="mt-1">06 de junho · Sábado</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Onde</div>
                  <div className="mt-1">Recanto FB · Mogi das Cruzes</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8"
              >
                <button
                  onClick={scrollToRsvp}
                  className="group inline-flex items-center gap-3 border border-foreground bg-foreground px-6 py-3 text-xs uppercase tracking-[0.25em] text-background transition-all duration-300 hover:bg-transparent hover:text-foreground"
                >
                  Confirmar presença
                  <ArrowDown className="h-3 w-3 transition-transform duration-300 group-hover:translate-y-0.5" />
                </button>
              </motion.div>
            </div>
          </section>

          {/* COUNTDOWN */}
          <Section className="py-24 sm:py-32">
            <FadeIn>
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                Contagem regressiva
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Faltam poucos dias para o grande dia
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="mt-8">
                <Countdown />
              </div>
            </FadeIn>
          </Section>

          <div className="hairline mx-auto max-w-4xl" />

          {/* EVENT DETAILS */}
          <EventDetails onScrollToLocation={goToLocation} />

          <div className="hairline mx-auto max-w-4xl" />

          {/* GALLERY */}
          <Gallery />

          <div className="hairline mx-auto max-w-4xl" />

          {/* LOCATION */}
          <div ref={locationRef}>
            <Section className="relative overflow-hidden py-24 sm:py-32">
              <FadeIn>
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  04 — Endereço
                </p>
                <h2 className="mt-4 text-4xl font-light sm:text-6xl">Como chegar.</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  O Recanto FB fica em Jundiapeba, Mogi das Cruzes. É fácil de acessar
                  e tem estacionamento no local para quem for de carro.
                </p>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="mt-10 space-y-1 text-base leading-relaxed">
                  <p>Estr. da Esmeralda, 242</p>
                  <p>Jundiapeba</p>
                  <p>Mogi das Cruzes — SP</p>
                  <p className="text-muted-foreground">08700-000</p>
                </div>
                <p className="mt-6 text-sm text-muted-foreground">
                  <span className="text-foreground">Referência:</span> próximo à estação/terminal Braz Cubas.
                </p>
                <div className="mt-6 overflow-hidden border border-border">
                  <iframe
                    src={`https://www.google.com/maps?q=${ADDRESS_QUERY}&output=embed`}
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização do evento"
                    className="w-full"
                  />
                </div>
              </FadeIn>

              <FadeIn delay={0.25}>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${ADDRESS_QUERY}`}
                    target="_blank" rel="noreferrer"
                    className="group flex items-center justify-between border border-border px-5 py-4 transition-all duration-300 hover:bg-foreground hover:text-background"
                  >
                    <span className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4" /> Google Maps
                    </span>
                    <ExternalLink className="h-3 w-3 opacity-40 transition-opacity duration-300 group-hover:opacity-100" />
                  </a>
                  <a
                    href={`https://waze.com/ul?q=${ADDRESS_QUERY}&navigate=yes`}
                    target="_blank" rel="noreferrer"
                    className="group flex items-center justify-between border border-border px-5 py-4 transition-all duration-300 hover:bg-foreground hover:text-background"
                  >
                    <span className="flex items-center gap-3 text-sm">
                      <Navigation className="h-4 w-4" /> Waze
                    </span>
                    <ExternalLink className="h-3 w-3 opacity-40 transition-opacity duration-300 group-hover:opacity-100" />
                  </a>
                  <button
                    onClick={copyAddress}
                    className="group flex items-center justify-between border border-border px-5 py-4 transition-all duration-300 hover:bg-foreground hover:text-background"
                  >
                    <span className="flex items-center gap-3 text-sm">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Endereço copiado!" : "Copiar endereço"}
                    </span>
                  </button>
                  <button
                    onClick={scrollToRsvp}
                    className="group flex items-center justify-between border border-foreground bg-foreground px-5 py-4 text-background transition-all duration-300 hover:bg-transparent hover:text-foreground"
                  >
                    <span className="flex items-center gap-3 text-sm">
                      <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" /> Confirmar presença
                    </span>
                  </button>
                </div>
              </FadeIn>

              {/* Gift - collapsible, inside location section */}
              <Gift />
            </Section>
          </div>

          {/* OUTRO / RSVP */}
          <section ref={rsvpRef} className="relative overflow-hidden py-16 sm:py-24">
            <div className="mx-auto max-w-3xl px-6 text-center">
              <FadeIn>
                <h2 className="text-balance text-4xl font-light leading-[1.1] sm:text-6xl md:text-7xl">
                  <span className="text-shimmer font-bold">18</span> anos só acontecem<br />uma vez.
                </h2>
                <p className="mt-8 text-balance text-base text-muted-foreground sm:text-lg">
                  E eu quero que você esteja lá comigo. Confirme sua presença
                  e vamos criar memórias que vão ficar para sempre.
                </p>
              </FadeIn>

              <Rsvp />
            </div>

            <footer className="mt-16 flex items-center justify-between border-t border-border px-6 pt-6 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              <span>Desenvolvido por</span>
              <span className="opacity-40">—</span>
              <span>@lukikuthi.dev</span>
            </footer>
          </section>
        </motion.div>
      )}
    </main>
  );
}
