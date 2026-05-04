import { Users, Sprout, HeartHandshake, ArrowUpRight } from "lucide-react";

const items = [
  {
    icon: Sprout,
    tag: "Sustainability Programs",
    title: "Reforestation Fund",
    body:
      "A community-allocated pool that co-finances verified reforestation projects across three continents.",
  },
  {
    icon: Users,
    tag: "Contributor Initiatives",
    title: "Open Contributor Grants",
    body:
      "Quarterly grants for developers, climate scientists and auditors building tools on the FLO ecosystem.",
  },
  {
    icon: HeartHandshake,
    tag: "Impact Missions",
    title: "Regional Climate Missions",
    body:
      "Time-boxed initiatives targeting measurable local environmental outcomes, reported on-chain.",
  },
];

export function CommunitySection() {
  return (
    <section id="community" className="relative border-b border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Community Participation
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Programs powered by the network
          </h2>
          <p className="mt-4 text-muted-foreground">
            Participation is open and outcomes are reported transparently.
            Contribution does not require token purchase.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {items.map((it, i) => (
            <article
              key={it.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-surface p-6 shadow-card transition-colors hover:border-neon/30 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-neon-soft text-neon ring-1 ring-neon/20">
                  <it.icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {it.tag}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
              <a
                href="javascript:void(0)"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-neon"
              >
                Learn more
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
