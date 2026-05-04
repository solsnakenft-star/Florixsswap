import { useMemo, useState } from "react";
import { ArrowDownUp, Info, Leaf, Coins } from "lucide-react";
import { toast } from "sonner";

const RATE = 12.48; // 1 CO₂ Unit = 12.48 FLO
const FEE_PCT = 0.0035;

export function SwapInterface() {
  const [from, setFrom] = useState<string>("10");
  const [flipped, setFlipped] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const fromNum = parseFloat(from) || 0;

  const { toAmount, fee, rateLabel, fromLabel, toLabel } = useMemo(() => {
    if (!flipped) {
      const gross = fromNum * RATE;
      const f = gross * FEE_PCT;
      return {
        toAmount: Math.max(0, gross - f),
        fee: f,
        rateLabel: `1 CO₂ Unit ≈ ${RATE.toFixed(2)} FLO`,
        fromLabel: { name: "Carbon Credits", sub: "CO₂ Units", icon: Leaf },
        toLabel: { name: "FLO Token", sub: "Ecosystem", icon: Coins },
      };
    }
    const gross = fromNum / RATE;
    const f = gross * FEE_PCT;
    return {
      toAmount: Math.max(0, gross - f),
      fee: f,
      rateLabel: `1 FLO ≈ ${(1 / RATE).toFixed(4)} CO₂ Unit`,
      fromLabel: { name: "FLO Token", sub: "Ecosystem", icon: Coins },
      toLabel: { name: "Carbon Credits", sub: "CO₂ Units", icon: Leaf },
    };
  }, [fromNum, flipped]);

  const flip = () => {
    setSpinning(true);
    setFlipped((f) => !f);
    setTimeout(() => setSpinning(false), 500);
  };

  const FromIcon = fromLabel.icon;
  const ToIcon = toLabel.icon;

  return (
    <section id="exchange" className="relative border-b border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          {/* Copy */}
          <div className="animate-fade-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-neon" />
              Live Exchange
            </div>
            <h2 className="text-balance text-3xl font-bold tracking-tight md:text-5xl">
              Convert verified offsets into{" "}
              <span className="text-neon">FLO</span> with full transparency
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-muted-foreground">
              Every exchange settles against on-chain reserves backed by
              audited carbon registries. No custodial holds, no hidden spreads —
              just a clear conversion rate and a published network fee.
            </p>

            <ul className="mt-8 space-y-3 text-sm">
              {[
                "Real-time conversion preview",
                "Published rate sourced from oracle aggregator",
                "Transparent network & protocol fees",
                "Review screen before any transaction is signed",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-neon glow-soft" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Swap card */}
          <div className="relative animate-fade-up [animation-delay:120ms]">
            <div className="absolute -inset-px rounded-3xl bg-gradient-neon opacity-20 blur-xl" />
            <div className="relative rounded-3xl border border-border bg-gradient-surface p-5 shadow-card md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-semibold">Exchange</h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {rateLabel}
                </span>
              </div>

              {/* From */}
              <Panel
                label={`From: ${fromLabel.name}`}
                sublabel={fromLabel.sub}
                icon={<FromIcon className="h-4 w-4" />}
                value={from}
                onChange={setFrom}
                editable
              />

              {/* Flip */}
              <div className="relative my-2 flex justify-center">
                <button
                  type="button"
                  onClick={flip}
                  aria-label="Swap direction"
                  className="group relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-elevated text-neon transition-all hover:ring-neon"
                >
                  <ArrowDownUp
                    className={`h-4 w-4 transition-transform duration-500 ${spinning ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {/* To */}
              <Panel
                label={`To: ${toLabel.name}`}
                sublabel={toLabel.sub}
                icon={<ToIcon className="h-4 w-4" />}
                value={toAmount.toLocaleString(undefined, {
                  maximumFractionDigits: 4,
                })}
                readOnly
              />

              {/* Info */}
              <div className="mt-5 space-y-2 rounded-2xl border border-border bg-background/40 p-4 text-sm">
                <Row label="Exchange rate" value={rateLabel} />
                <Row
                  label="Network fee (est.)"
                  value="~ 0.0004 BNB"
                  hint="Paid to validators; varies with network load."
                />
                <Row
                  label="Protocol fee"
                  value={`${(FEE_PCT * 100).toFixed(2)}% · ${fee.toLocaleString(undefined, { maximumFractionDigits: 4 })}`}
                />
                <Row
                  label="Settlement"
                  value="BNB Smart Chain"
                  hint="Transaction reverts if conversion conditions are not met."
                />
              </div>

              <button
                type="button"
                onClick={() => toast.success("Review process initiated. Connecting to secure settlement engine...")}
                className="mt-5 w-full rounded-2xl bg-gradient-neon px-6 py-3.5 text-sm font-semibold text-primary-foreground glow-neon transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                Review Conversion
              </button>

              <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Non-custodial · You sign every transaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({
  label,
  sublabel,
  icon,
  value,
  onChange,
  editable,
  readOnly,
}: {
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  value: string;
  onChange?: (v: string) => void;
  editable?: boolean;
  readOnly?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/40 p-4 transition-colors focus-within:border-neon/40">
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="font-mono uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="text-muted-foreground">Balance: —</span>
      </div>
      <div className="flex items-center gap-3">
        <input
          inputMode="decimal"
          value={value}
          readOnly={readOnly}
          onChange={(e) => {
            if (!editable) return;
            const v = e.target.value.replace(/[^0-9.]/g, "");
            onChange?.(v);
          }}
          placeholder="0.00"
          className="w-full bg-transparent text-2xl font-semibold text-foreground outline-none placeholder:text-muted-foreground/50 md:text-3xl"
        />
        <div className="flex flex-none items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-sm">
          <span className="text-neon">{icon}</span>
          <div className="leading-tight">
            <div className="font-medium">{sublabel}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="flex items-center gap-1.5 text-muted-foreground">
        {label}
        {hint && (
          <span className="group relative inline-flex">
            <Info className="h-3.5 w-3.5 cursor-help text-muted-foreground/70" />
            <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-56 -translate-x-1/2 rounded-lg border border-border bg-popover p-2 text-xs text-popover-foreground opacity-0 shadow-card transition-opacity group-hover:opacity-100">
              {hint}
            </span>
          </span>
        )}
      </span>
      <span className="font-mono text-foreground">{value}</span>
    </div>
  );
}
