import { Recycle, Coins, TreePine, Network } from "lucide-react";

export function EcosystemSection() {
  const steps = [
    {
      icon: TreePine,
      title: "1 · Verified Offsets",
      body:
        "Carbon credits are issued by certified projects (reforestation, renewable energy, methane capture) and registered under recognised standards.",
    },
    {
      icon: Network,
      title: "2 · On-Chain Tokenization",
      body:
        "Each retired offset is mirrored as a unique on-chain reference, ensuring one credit cannot be counted twice across the network.",
    },
    {
      icon: Recycle,
      title: "3 · Conversion to FLO",
      body:
        "Holders convert offset units to FLO at the prevailing oracle rate, with all fees and slippage shown before signing.",
    },
    {
      icon: Coins,
      title: "4 · Ecosystem Utility",
      body:
        "FLO funds verified climate initiatives, governance over reserve sources, and protocol upgrades through transparent voting.",
    },
  ];

  return (
    <section id="ecosystem" className="relative border-b border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Ecosystem
            </div>
            <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
              How carbon credits become <span className="text-neon">FLO</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              A four-step path from a verified climate action to a transparent
              ecosystem token, with full audit trails at every stage.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative rounded-2xl border border-border bg-gradient-surface p-6 shadow-card animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-neon-soft text-neon ring-1 ring-neon/20">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
