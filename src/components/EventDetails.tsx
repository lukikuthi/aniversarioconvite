import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, MapPin, Hop as Home, Backpack, CircleAlert as AlertCircle, Landmark, Car, Navigation, BedDouble, CalendarDays } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

interface InfoItem {
  icon: React.ElementType;
  label: string;
  value: string;
  detail?: string;
}

const eventInfo: InfoItem[] = [
  {
    icon: CalendarDays,
    label: "Data",
    value: "Sábado, 06 de junho",
    detail: "A partir das 13h",
  },
  {
    icon: Clock,
    label: "Duração",
    value: "Até domingo, 10h",
    detail: "O churrasco começa no sábado e segue até domingo de manhã",
  },
  {
    icon: Home,
    label: "Local",
    value: "Recanto FB",
    detail: "Espaço aberto e aconchegante em Jundiapeba, Mogi das Cruzes",
  },
  {
    icon: MapPin,
    label: "Endereço",
    value: "Estr. da Esmeralda, 242",
    detail: "Jundiapeba, Mogi das Cruzes — SP",
  },
  {
    icon: BedDouble,
    label: "Hospedagem",
    value: "30 camas disponíveis",
    detail: "Quem não conseguir dormir tem cama para descansar e ir embora no dia seguinte até as 10:00",
  },
  {
    icon: Backpack,
    label: "O que levar",
    value: "Animação e sede!",
    detail: "Levar traje para banho",
  },
  {
    icon: AlertCircle,
    label: "Observação",
    value: "Espaço ao ar livre",
    detail: "Em caso de chuva, temos cobertura",
  },
  {
    icon: Landmark,
    label: "Referência",
    value: "Próximo ao terminal",
    detail: "Perto da estação/terminal de trem de Braz Cubas",
  },
  {
    icon: Car,
    label: "Estacionamento",
    value: "Disponível no local",
    detail: "Espaço para estacionar dentro do recanto",
  },
  {
    icon: Navigation,
    label: "Como chegar",
    value: "Ver no mapa",
    detail: "Google Maps ou Waze",
  },
];

interface EventDetailsProps {
  onScrollToLocation?: () => void;
}

export default function EventDetails({ onScrollToLocation }: EventDetailsProps) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              03 — Evento
            </p>
            <h2 className="mt-4 text-4xl font-light leading-tight sm:text-6xl">
              Churrasco de<br />aniversário.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="flex flex-col justify-end gap-6"
          >
            <div className="flex items-baseline gap-4 border-b border-border pb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">data</span>
              <span className="text-xl font-light">06 de junho · Sábado</span>
            </div>
            <p className="text-balance leading-relaxed text-muted-foreground">
              Estou completando 18 anos e não poderia deixar essa data passar em branco.
              Vai ser um churrasco descontraído, com as pessoas que fazem a diferença na minha vida.
              Nada de cerimônia — só a gente, boa comida e bons momentos.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="mt-12"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {eventInfo.map((item) => {
              const Icon = item.icon;
              const isMap = item.label === "Como chegar";

              const cardContent = (
                <div className="group relative flex h-full flex-col border border-border bg-card/40 p-5 backdrop-blur-sm transition-all duration-500 hover:border-foreground/20 hover:bg-card/70">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center border border-foreground/10 bg-foreground/5 text-foreground/60 transition-all duration-300 group-hover:border-foreground/20 group-hover:bg-foreground/10 group-hover:text-foreground">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {item.label}
                  </div>
                  <div className="mt-1.5 text-sm font-light leading-snug">{item.value}</div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {item.detail || "\u00A0"}
                  </p>
                </div>
              );

              if (isMap) {
                return (
                  <button
                    key={item.label}
                    onClick={onScrollToLocation}
                    className="text-left"
                  >
                    {cardContent}
                  </button>
                );
              }

              return <div key={item.label}>{cardContent}</div>;
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
