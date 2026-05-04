import { useEffect, useRef, useState } from "react";

type Tx = {
  id: string;
  wallet: string;
  co2: number;
  flo: number;
  ts: number;
  status: "Completed" | "Pending";
  isNew?: boolean;
};

const RATE = 12.48;

function randWallet() {
  const hex = "0123456789abcdef";
  const pick = (n: number) =>
    Array.from({ length: n }, () => hex[Math.floor(Math.random() * 16)]).join("");
  return `0x${pick(4).toUpperCase()}…${pick(3).toUpperCase()}`;
}

function makeTx(now = Date.now()): Tx {
  const co2 = Math.round((Math.random() * 240 + 2) * 100) / 100;
  return {
    id: Math.random().toString(36).slice(2, 10),
    wallet: randWallet(),
    co2,
    flo: Math.round(co2 * RATE * (1 - 0.0035) * 100) / 100,
    ts: now - Math.floor(Math.random() * 60_000),
    status: Math.random() > 0.18 ? "Completed" : "Pending",
  };
}

function timeAgo(ts: number) {
  const s = Math.max(1, Math.floor((Date.now() - ts) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} min ago`;
  return `${Math.floor(m / 60)}h ago`;
}

export function TransactionTable() {
  const [rows, setRows] = useState<Tx[]>(() =>
    Array.from({ length: 10 }, () => makeTx()).sort((a, b) => b.ts - a.ts),
  );
  const [, force] = useState(0);
  const tickRef = useRef<number | undefined>(undefined);

  // Add a new tx every 4-7s
  useEffect(() => {
    const schedule = () => {
      tickRef.current = window.setTimeout(
        () => {
          setRows((prev) => {
            const fresh = { ...makeTx(Date.now()), isNew: true };
            const next = [fresh, ...prev].slice(0, 10);
            return next;
          });
          // remove highlight after a moment
          window.setTimeout(() => {
            setRows((prev) => prev.map((r) => ({ ...r, isNew: false })));
          }, 1600);
          schedule();
        },
        3500 + Math.random() * 3500,
      );
    };
    schedule();
    return () => {
      if (tickRef.current) clearTimeout(tickRef.current);
    };
  }, []);

  // Re-render every 15s for "x min ago"
  useEffect(() => {
    const i = window.setInterval(() => force((n) => n + 1), 15_000);
    return () => clearInterval(i);
  }, []);

  return (
    <section id="activity" className="relative border-b border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
              </span>
              Live · Auto-refresh
            </div>
            <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Recent Network Activity
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            The most recent ten settled and pending exchanges on the network.
            Updates streamed from on-chain events.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-gradient-surface shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-background/40 text-left font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <Th>Wallet</Th>
                  <Th className="text-right">CO₂ Units</Th>
                  <Th className="text-right">FLO Received</Th>
                  <Th>Time</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    className={`border-t border-border/60 transition-colors ${
                      r.isNew ? "bg-neon/5" : "hover:bg-background/30"
                    }`}
                  >
                    <Td>
                      <span className="font-mono text-foreground">{r.wallet}</span>
                      {r.isNew && (
                        <span className="ml-2 inline-flex animate-pulse-glow items-center rounded-full bg-neon/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neon">
                          New
                        </span>
                      )}
                    </Td>
                    <Td className="text-right font-mono">
                      {r.co2.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </Td>
                    <Td className="text-right font-mono text-neon">
                      {r.flo.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </Td>
                    <Td className="text-muted-foreground">{timeAgo(r.ts)}</Td>
                    <Td>
                      <StatusBadge status={r.status} />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <th className={`px-5 py-3.5 ${className}`}>{children}</th>;
}
function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-5 py-3.5 align-middle ${className}`}>{children}</td>;
}

function StatusBadge({ status }: { status: "Completed" | "Pending" }) {
  if (status === "Completed") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-neon/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-neon ring-1 ring-neon/20">
        <span className="h-1.5 w-1.5 rounded-full bg-neon" /> Completed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-warning ring-1 ring-warning/20">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-warning" />
      Pending
    </span>
  );
}
