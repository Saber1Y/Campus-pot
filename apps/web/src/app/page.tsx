import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import HowItWorks from "@/components/HowItWorks";
import Architecture from "@/components/Architecture";
import StatsStrip from "@/components/StatsStrip";
import ProofSection from "@/components/ProofSection";
import TransparencySection from "@/components/TransparencySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Architecture />
        <Capabilities />
        <HowItWorks />
        <StatsStrip />
        <ProofSection />
        <TransparencySection />
      </main>
      <Footer />
    </>
  );
}
