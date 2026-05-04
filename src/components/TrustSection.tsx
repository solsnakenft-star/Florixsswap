import { ShieldCheck, FileCheck2, Link2, Globe2 } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Audited Smart Contracts",
    body:
      "All conversion logic is open source and reviewed by independent security firms. Audit reports are published and version-pinned.",
    badge: "Audit v2.3 · Passed",
  },
  {
    icon: FileCheck2,
    title: "Verified Carbon Sources",
    body:
      "Offset units originate from registered projects under recognised standards (Verra, Gold Standard) with serialised retirement records.",
    badge: "Registry-linked",
  },
  {
    icon: Link2,
    title: "On-Chain Traceability",
    body:
      "Each FLO minted is bound to a retired offset reference. Anyone can verify provenance directly on the explorer.",
    badge: "Public ledger",
  },
  {
    icon: Globe2,
    title: "Compliance First",
    body:
      "KYB onboarding for issuers, sanctions screening, and quarterly attestations of reserve backing.",
    badge: "Quarterly attested",
  },
];

export function TrustSection() {
  return (
    <section id="trust" className="relative border-b border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Trust & Verification
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Built on transparent, auditable infrastructure
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every safeguard is technical, public, and independently verifiable —
            not a marketing promise.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-surface p-6 shadow-card transition-colors hover:border-neon/30 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-neon/10 blur-2xl transition-opacity group-hover:opacity-100" />
              <span className="relative mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-neon-soft text-neon ring-1 ring-neon/20">
                <it.icon className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-neon">
                <span className="h-1.5 w-1.5 rounded-full bg-neon" />
                {it.badge}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
