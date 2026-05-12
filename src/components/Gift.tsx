import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Copy, Check, ChevronLeft, ChevronRight, ExternalLink, Gift as GiftIcon } from "lucide-react";

// --- IMAGENS LOCAIS ---
// Para trocar a imagem de um presente, basta substituir o arquivo
// correspondente na pasta src/assets/gifts/ (ex: pe.jpg, luva.jpg, etc.)
const img = (name: string) => new URL(`../assets/gifts/${name}`, import.meta.url).href;

const ease = [0.22, 1, 0.36, 1] as const;

const PIX_KEY = "431.110.458-89";

interface GiftItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  link?: string;
}

// Editavel: adicione ou remova presentes aqui
// Preencha o campo "link" com a URL de compra do produto
// Para trocar a imagem, substitua o arquivo em src/assets/gifts/
const gifts: GiftItem[] = [
  {
    id: "pe",
    name: "Pe de meia",
    description: "Auxílio para comprar uma Porshe",
    price: "R$ 200,00",
    image: img("pedemeia.png"),
    link: "",
  },
  {
    id: "escapamento",
    name: "Escapamento Esportivo",
    description: "Fazer Pops and Bangs na Porshe que vou comprar com o auxílio",
    price: "R$ 1.000 — R$ 2.000",
    image: img("escapamento.png"),
    link: "",
  },
  {
    id: "relogio",
    name: "Rolex",
    description: "Um acessorio que marca estilo e tempo",
    price: "R$ 1M — R$ 10M",
    image: img("relogio.png"),
    link: "",
  },
  {
    id: "luva",
    name: "Luva Maximum",
    description: "Para investir na minha carreira do MMA",
    price: "R$ 500 — R$ 600",
    image: img("luva.png"),
    link: "https://www.maximumshop.com.br/luva-de-boxe-e-muay-thai-preta-detalhes-dourado",
  },
  {
    id: "caneleira",
    name: "Caneleira Maximum",
    description: "Pratica e estilosa para o dia a dia",
    price: "R$ 100 — R$ 500",
    image: img("caneleira.png"),
    link: "https://www.maximumshop.com.br/equipamentos/caneleira-muay-thai-e-kickboxing-profissional-black",
  },
  {
    id: "monitor",
    name: "Monitor Display Port",
    description: "Monitor COM entrada Display port",
    price: "R$ 500 — R$ 700",
    image: img("monitor.png"),
    link: "https://www.mercadolivre.com.br/p/MLB57489948?pdp_filters=item_id%3AMLB4452425949#polycard_client=cart_list&wid=MLB4452425949&sid=cart",
  },
  {
    id: "suporte",
    name: "Suporte Articulado",
    description: "Suporte Duplo para monitores",
    price: "Qualquer valor",
    image: img("braco.png"),
    link: "https://www.pichau.com.br/suporte-articulado-para-monitor-pichau-hl100-17-pol-a-40-pol-preto-e-branco-pch-lot100-bl01?srsltid=AfmBOooMbfgUU5quCsnRH8iGqEPkVDnWgE1hitf4vcFSLNeR_E7rtkxpPvM",
  },
  {
    id: "mouse",
    name: "Mouse",
    description: "Para jogar Valorant com os amigos",
    price: "Qualquer valor",
    image: img("mouse.png"),
    link: "https://www.kabum.com.br/produto/883555/mouse-gamer-sem-fio-attack-shark-x6-26000-dpi-paw3395-tri-modo-com-dock-magnetico-rgb-preto?srsltid=AfmBOorAesZC2emV1ec5pV_9U2dvT4siFJ5j-QMvv8pgJUXAwpvfvbaFQl0",
  },
  {
    id: "teclado",
    name: "Teclado",
    description: "Para programar, fazer meus projetos e ganhar dinheiro",
    price: "Qualquer valor",
    image: img("teclado.png"),
    link: "https://www.amazon.com.br/ATTACK-SHARK-mec%C3%A2nico-interruptor-retroilumina%C3%A7%C3%A3o/dp/B0DJ13PMKD/ref=asc_df_B0DJ13PMKD?mcid=241e26e73ba23aa88b32e5abf40b521a&tag=googleshopp00-20&linkCode=df0&hvadid=721185796203&hvpos=&hvnetw=g&hvrand=5281970612402927499&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9199108&hvtargid=pla-2374768376294&psc=1&gad_source=1",
  },
  {
    id: "trafego",
    name: "Trafego Pago",
    description: "Me ajudar a ganhar dinheiro",
    price: "Qualquer valor",
    image: img("trafego.png"),
    link: "",
  },
  {
    id: "cadeira",
    name: "Cadeira nova",
    description: "Cadeira boa e nova para nao doer a bunda",
    price: "Qualquer valor",
    image: img("cadeira.png"),
    link: "https://www.kabum.com.br/produto/134178/cadeira-gamer-husky-tempest-700-ate-145kg-almofadas-reclinavel-150-pu-descanso-para-pes-cinza-hcg700cz?gclsrc=aw.ds&&utm_id=22429583668&gad_source=4&gad_campaignid=22429583668&gbraid=0AAAAADx-HyENNFiLFrrmTyhfF2caRg1-d&gclid=Cj0KCQjw2YDQBhD_ARIsAE1qeScCXkkYJZq3OAzf6VkMqLBn8FXEaXyNw4K4dS76MVxLOG51hWpRSg0aApkSEALw_wcB",
  },
  {
    id: "fone",
    name: "Headset",
    description: "Aqui eu sou exigente, precisa ser RAZER ou HAVIT, LOGITECH..",
    price: "Qualquer valor",
    image: img("headset.png"),
    link: "https://www.kabum.com.br/produto/128544/headset-gamer-razer-blackshark-v2-x-drivers-50mm-surround-7-1-3-5-mm-preto-rz04-03240100-r3u1?gclsrc=aw.ds&&utm_id=22446425996&gad_source=1&gad_campaignid=22446425996&gbraid=0AAAAADx-HyGwlHecQ8YJrarhjH_77CT1c&gclid=Cj0KCQjw2YDQBhD_ARIsAE1qeScI4cD00_nGxpcSMnCsFAXj3DyMaZq15G9YKY7CKXh4Pnsu8YevoNwaAiBiEALw_wcB",
  },
  {
    id: "perfume",
    name: "Perfume",
    description: "Pra ficar cheiroso sempre",
    price: "Qualquer valor",
    image: img("perfume.png"),
    link: "",
  },
  {
    id: "caixinha",
    name: "Auxílio Picanha",
    description: "Escolha algo que voce acha que eu vou gostar",
    price: "Voce decide - Qualquer valor",
    image: img("caixinha.png"),
    link: "",
  },
];

export default function Gift() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-40px" });

  const copy = async () => {
    await navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const scrollAmount = 260;
    el.scrollBy({ left: dir === "right" ? scrollAmount : -scrollAmount, behavior: "smooth" });
  };

  return (
    <div ref={sectionRef} className="border-t border-border py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease }}
      >
        <motion.button
          onClick={() => setOpen((o) => !o)}
          className="gift-cta group relative flex w-full items-center justify-between overflow-hidden border border-foreground/20 bg-foreground/5 px-5 py-4 backdrop-blur-sm transition-all duration-500 hover:border-foreground/40 hover:bg-foreground/10"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/0 via-foreground/5 to-foreground/0 gift-shimmer" />

          <span className="relative flex items-center gap-3 text-base font-light tracking-wide text-foreground/80 transition-colors duration-300 group-hover:text-foreground">
            <motion.span
              animate={{
                rotate: [0, 12, -8, 6, -3, 0],
                scale: [1, 1.15, 0.95, 1.08, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-flex"
            >
              <GiftIcon className="h-5 w-5" />
            </motion.span>
            Quer levar um presente?
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-xs uppercase tracking-[0.2em] text-foreground/60"
            >
              CLIQUE AQUI
            </motion.span>
          </span>

          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease }}
            className="relative text-lg text-foreground/60 transition-colors duration-300 group-hover:text-foreground"
          >
            +
          </motion.span>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <div className="pt-6 space-y-6">
              <p className="text-balance text-base font-light leading-relaxed sm:text-lg">
                Sua presença já é o melhor presente.
              </p>
              <p className="text-sm text-muted-foreground">
                Mas se quiser me surpreender, deslize e veja algumas sugestões:
              </p>

              {/* Scroll row with arrows */}
              <div className="flex items-center gap-2">
                <button onClick={() => scroll("left")} className="gift-scroll-btn hidden sm:flex">
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div
                  ref={trackRef}
                  className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {gifts.map((gift, i) => (
                    <motion.div
                      key={gift.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.06, ease }}
                      className="group relative flex flex-none flex-col snap-center overflow-hidden border border-border bg-card/40 transition-all duration-500 hover:border-foreground/20 hover:bg-card/70"
                      style={{ width: "75%", maxWidth: "220px" }}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={gift.image}
                          alt={gift.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="text-sm font-light tracking-wide">{gift.name}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {gift.description}
                        </p>
                        <div className="mt-2 text-xs font-medium uppercase tracking-widest text-foreground/80">
                          {gift.price}
                        </div>
                        <div className="mt-auto pt-4 space-y-2">
                          <button
                            onClick={copy}
                            className="inline-flex w-full items-center justify-center gap-2 border border-foreground bg-foreground px-3 py-2.5 text-[10px] uppercase tracking-[0.2em] text-background transition-all duration-300 hover:bg-transparent hover:text-foreground"
                          >
                            {copied ? (
                              <>
                                <Check className="h-3 w-3" /> Copiado!
                              </>
                            ) : (
                              "Fazer o Pix!"
                            )}
                          </button>
                          <a
                            href={gift.link || "#"}
                            target="_blank"
                            rel="noreferrer"
                            onClick={gift.link ? undefined : (e) => e.preventDefault()}
                            className={`inline-flex w-full items-center justify-center gap-2 border border-border px-3 py-2.5 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                              gift.link
                                ? "text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                                : "text-muted-foreground/40 cursor-default pointer-events-none"
                            }`}
                          >
                            Comprar <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button onClick={() => scroll("right")} className="gift-scroll-btn hidden sm:flex">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Pix info */}
              <div className="pt-2">
                <button
                  onClick={copy}
                  className="flex w-full items-center justify-between border border-border px-4 py-3 transition-colors duration-300 hover:bg-accent"
                >
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      Chave Pix
                    </div>
                    <div className="mt-0.5 font-mono text-sm">{PIX_KEY}</div>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={copied ? "check" : "copy"}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
