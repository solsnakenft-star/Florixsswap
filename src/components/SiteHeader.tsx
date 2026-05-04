import { Link } from "@tanstack/react-router";
import logo from "../logo(1).png";

export function SiteHeader() {
  const links = [
    { href: "#exchange", label: "Exchange" },
    { href: "#trust", label: "Verification" },
    { href: "#activity", label: "Activity" },
    { href: "#ecosystem", label: "Ecosystem" },
    { href: "#community", label: "Community" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden glow-soft">
            <img src={logo} alt="Floraflow Logo" className="h-full w-full object-contain" />
          </span>
          <div className="leading-tight">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground text-neon">
              FLORIX
            </div>
            <div className="text-sm font-semibold">Carbon Exchange</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted-foreground sm:inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
            </span>
            Network: Verified
          </span>
        </div>
      </div>
    </header>
  );
}
