import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import MobileReadySection from "@/components/home/mobileReady";
import Testimonials from "@/components/home/testimonials";
import Pricing from "@/components/home/pricing";
import Cta from "@/components/home/cta";
export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <MobileReadySection />
        <Testimonials />
        <Pricing />
        <Cta />
      </main>
    </>
  );
}
