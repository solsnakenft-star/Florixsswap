import logo from "../logo_main.png";

export function SiteFooter() {
  const cols = [
    {
      title: "Platform",
      links: ["Exchange", "Verification", "Activity", "Ecosystem"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Sustainability Disclaimer"],
    },
    {
      title: "Contact",
      links: ["Support", "Press", "Partnerships", "Security disclosures"],
    },
  ];

  return (
    <footer className="relative">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden glow-soft">
                <img src={logo} alt="Floraflow Logo" className="h-full w-full object-cover" />
              </span>
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground text-neon">
                  FLORIX
                </div>
                <div className="text-sm font-semibold">Carbon Exchange</div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm text-muted-foreground">
              A transparent infrastructure layer for converting verified carbon
              offsets into the FLO ecosystem token.
            </p>
            <p className="mt-6 max-w-sm text-xs text-muted-foreground/80">
              Sustainability disclaimer: FLO is a utility token within the
              Floraflow ecosystem and is not an investment instrument. Offset
              claims are sourced from third-party registries and subject to
              their respective methodologies.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {c.title}
              </div>
              <ul className="mt-4 space-y-2.5 text-sm">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="javascript:void(0)"
                      className="text-foreground/80 transition-colors hover:text-neon"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Florix.tech. All rights reserved.</div>
          <div className="font-mono uppercase tracking-wider">
            Network status: <span className="text-neon">Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
