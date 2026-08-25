import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import {
  Hero,
  Marquee,
  About,
  Services,
  Projects,
  Testimonials,
  Contact,
  Footer,
} from "@/components/portfolio/Sections";
import { portfolioData } from "@/data/portfolioData";

const { developerInfo } = portfolioData;
const title = `${developerInfo.name} — ${developerInfo.title.fr}`;
const description = developerInfo.aboutBio.fr;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: developerInfo.avatarUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: developerInfo.avatarUrl },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative z-10 min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
