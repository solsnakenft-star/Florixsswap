import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "../components/SiteHeader";
import { Hero } from "../components/Hero";
import { SwapInterface } from "../components/SwapInterface";
import { TrustSection } from "../components/TrustSection";
import { TransactionTable } from "../components/TransactionTable";
import { EcosystemSection } from "../components/EcosystemSection";
import { CommunitySection } from "../components/CommunitySection";
import { SiteFooter } from "../components/SiteFooter";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title: "Florix · Carbon Credit Exchange for FLO Token",
      },
      {
        name: "description",
        content:
          "Convert verified CO₂ offset units into FLO ecosystem tokens through a transparent, audited blockchain exchange. Built for compliance and sustainability.",
      },
      { property: "og:title", content: "Florix · Carbon Credit Exchange" },
      {
        property: "og:description",
        content:
          "A transparent Web3 platform for converting verified carbon offsets into the FLO ecosystem token.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Hero />
        <SwapInterface />
        <TrustSection />
        <TransactionTable />
        <EcosystemSection />
        <CommunitySection />
      </main>
      <SiteFooter />
    </div>
  );
}
