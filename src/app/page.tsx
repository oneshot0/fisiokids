import { Hero } from "@/components/sections/Hero";
import { Therapies } from "@/components/sections/Therapies";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { News } from "@/components/sections/News";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Therapies />
      <HowItWorks />
      <News />
      <Testimonials />
      <Contact />
    </>
  );
}
