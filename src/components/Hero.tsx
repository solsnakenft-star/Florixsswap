import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { ParticleField } from "./ParticleField";
import { toast } from "sonner";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <ParticleField />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 pt-24 text-center md:pt-32">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur animate-fade-in">
          <Sparkles className="h-3.5 w-3.5 text-neon" />
          Verified on-chain · Audited smart contracts
        </span>

        <h1 className="max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl animate-fade-up">
          Carbon Credit Exchange
          <br />
          for a{" "}
          <span className="text-neon">Sustainable Future</span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg animate-fade-up [animation-delay:120ms]">
          Convert verified CO₂ offset units into FLO tokens through a transparent
          blockchain ecosystem  built for compliance, traceability, and
          long-term environmental impact.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row animate-fade-up [animation-delay:240ms]">
          <a
            href="#exchange"
            onClick={() => toast.info("Initializing exchange interface...")}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-neon px-7 py-3.5 text-sm font-semibold text-primary-foreground glow-neon transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            Start Exchange
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#trust"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-surface"
          >
            <ShieldCheck className="h-4 w-4 text-neon" />
            How verification works
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 animate-fade-up [animation-delay:360ms]">
          {[
            { k: "Total CO₂ Offset", v: "1.24M t" },
            { k: "FLO Circulating", v: "84.2M" },
            { k: "Verified Sources", v: "37" },
            { k: "Avg. Settlement", v: "12s" },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-2xl border border-border bg-surface/50 p-4 text-left backdrop-blur"
            >
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {s.k}
              </div>
              <div className="mt-1 text-xl font-semibold text-foreground">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
