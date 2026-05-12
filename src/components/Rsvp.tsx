import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader, PartyPopper, Heart } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL ?? "";

export default function Rsvp() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"sim" | "nao">("sim");
  const [guests, setGuests] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || status === "loading") return;
    if (!SCRIPT_URL) {
      setError("Formulário não configurado. Adicione VITE_GOOGLE_SCRIPT_URL ao .env");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ name: name.trim(), attending, guests, message: message.trim() }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Erro ao enviar");
    }
  };

  return (
    <div className="mx-auto mt-12 max-w-md text-left">
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease }}
            className="relative overflow-hidden border border-foreground/20 bg-card/50 py-10 text-center backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-foreground/5 to-transparent" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-foreground/20 bg-foreground text-background"
            >
              <Check className="h-6 w-6" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease }}
              className="relative text-sm uppercase tracking-[0.25em]"
            >
              Presença confirmada
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6, ease }}
              className="relative mt-3 text-sm text-muted-foreground"
            >
              {attending === "sim"
                ? "Mal posso esperar para te ver lá!"
                : "Que pena! Vou sentir sua falta."}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8, ease }}
              className="relative mt-4 flex items-center justify-center gap-1 text-muted-foreground"
            >
              <PartyPopper className="h-3.5 w-3.5" />
              <span className="text-xs">06 de junho · Recanto FB</span>
            </motion.div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease }}
            onSubmit={onSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Seu nome
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={120}
                className="mt-2 w-full border-b border-border bg-transparent py-3 text-base outline-none transition-all duration-300 focus:border-foreground focus:pb-4"
                placeholder="Como te chamamos?"
              />
            </div>

            <div>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Vai dar presença?
              </span>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {(["sim", "nao"] as const).map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => setAttending(opt)}
                    className={`group relative overflow-hidden border px-5 py-4 text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                      attending === opt
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    {attending === opt && (
                      <motion.div
                        layoutId="rsvp-indicator"
                        className="absolute inset-0 bg-foreground"
                        transition={{ duration: 0.3, ease }}
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {opt === "sim" ? (
                        <>
                          <Heart className="h-3 w-3" /> Claro!
                        </>
                      ) : (
                        "Não posso ir"
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {attending === "sim" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="overflow-hidden"
                >
                  <div className="pb-1">
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      Quantos acompanhantes?
                    </label>
                    <div className="mt-3 flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setGuests((g) => Math.max(0, g - 1))}
                        className="flex h-10 w-10 items-center justify-center border border-border text-sm transition-all duration-300 hover:border-foreground/30 hover:bg-foreground hover:text-background"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-lg tabular-nums">{guests}</span>
                      <button
                        type="button"
                        onClick={() => setGuests((g) => Math.min(10, g + 1))}
                        className="flex h-10 w-10 items-center justify-center border border-border text-sm transition-all duration-300 hover:border-foreground/30 hover:bg-foreground hover:text-background"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Deixe um recado <span className="opacity-60">(opcional)</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                rows={2}
                className="mt-2 w-full resize-none border-b border-border bg-transparent py-3 text-base outline-none transition-all duration-300 focus:border-foreground focus:pb-4"
                placeholder="Algo que você queira dizer..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading" || !name.trim()}
              className="mt-2 inline-flex w-full items-center justify-center gap-3 border border-foreground bg-foreground px-8 py-4 text-sm uppercase tracking-[0.25em] text-background transition-all duration-300 hover:bg-transparent hover:text-foreground disabled:opacity-40"
            >
              {status === "loading" ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" /> Enviando...
                </>
              ) : (
                <>Confirmar presença</>
              )}
            </button>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-xs text-muted-foreground"
              >
                {error}
              </motion.p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
