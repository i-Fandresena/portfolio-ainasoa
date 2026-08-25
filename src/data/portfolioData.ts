import type { Locale } from "@/lib/language-context";

type Localized<T> = Record<Locale, T>;

export const portfolioData = {
  developerInfo: {
    name: "Soa",
    title: {
      fr: "DÉVELOPPEUR FULL-STACK",
      en: "FULL-STACK DEVELOPER",
    } satisfies Localized<string>,
    tagline: {
      fr: "JE CONÇOIS DES APPLICATIONS WEB SCALABLES & DES SYSTÈMES BACKEND HAUTE PERFORMANCE.",
      en: "BUILDING SCALABLE WEB APPLICATIONS & HIGH-PERFORMANCE BACKEND SYSTEMS.",
    } satisfies Localized<string>,
    aboutBio: {
      fr: "Développeur full-stack passionné, avec plus de 5 ans d'expérience en technologies web modernes, architectures cloud et ingénierie d'interfaces interactives.",
      en: "Passionate full-stack developer with over 5 years of experience in modern web technologies, cloud architectures, and interactive UI engineering.",
    } satisfies Localized<string>,
    avatarUrl: "/profil_ainasoa.png",
    email: "alexia@dev.io",
    location: {
      fr: "À distance / Disponible dans le monde entier",
      en: "Remote / Available Worldwide",
    } satisfies Localized<string>,
  },
  techStack: [
    {
      name: "React / Next.js",
      category: { fr: "Frontend", en: "Frontend" } satisfies Localized<string>,
    },
    {
      name: "TypeScript",
      category: { fr: "Langage", en: "Language" } satisfies Localized<string>,
    },
    {
      name: "Node.js / Express",
      category: { fr: "Backend", en: "Backend" } satisfies Localized<string>,
    },
    {
      name: "PostgreSQL / Docker",
      category: {
        fr: "Base de données & DevOps",
        en: "Database & DevOps",
      } satisfies Localized<string>,
    },
  ],
  services: [
    {
      id: "01",
      title: {
        fr: "INGÉNIERIE FRONTEND",
        en: "FRONTEND ENGINEERING",
      } satisfies Localized<string>,
      description: {
        fr: "Création d'interfaces pixel-perfect, hautement réactives et accessibles avec React, Next.js et Framer Motion.",
        en: "Crafting pixel-perfect, highly responsive, and accessible UIs using React, Next.js, and Framer Motion.",
      } satisfies Localized<string>,
    },
    {
      id: "02",
      title: {
        fr: "ARCHITECTURE BACKEND",
        en: "BACKEND ARCHITECTURE",
      } satisfies Localized<string>,
      description: {
        fr: "Conception d'API REST & GraphQL robustes, de microservices et de schémas de bases de données pensés pour la rapidité et la sécurité.",
        en: "Designing robust RESTful & GraphQL APIs, microservices, and database schemas built for speed and security.",
      } satisfies Localized<string>,
    },
    {
      id: "03",
      title: {
        fr: "DEVOPS & DÉPLOIEMENT",
        en: "DEVOPS & DEPLOYMENT",
      } satisfies Localized<string>,
      description: {
        fr: "Conteneurisation avec Docker, automatisation des pipelines CI/CD et gestion de l'hébergement cloud.",
        en: "Containerization with Docker, CI/CD pipeline automation, and cloud hosting management.",
      } satisfies Localized<string>,
    },
  ],
  projects: [
    {
      id: "01",
      client: "SaaS Analytics Dashboard",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
      liveUrl: "https://example.com",
    },
    {
      id: "02",
      client: "E-Commerce Microservices Platform",
      tags: ["Node.js", "PostgreSQL", "Docker"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
      liveUrl: "https://example.com",
    },
  ],
  testimonials: [
    {
      id: "01",
      quote: {
        fr: "Soa a livré notre plateforme principale en avance sur le planning, avec une qualité de code exceptionnelle et une communication sans faille.",
        en: "Soa delivered our core platform ahead of schedule with exceptional code quality and seamless communication.",
      } satisfies Localized<string>,
      author: "Sarah Jenkins",
      role: {
        fr: "CTO chez TechFlow",
        en: "CTO at TechFlow",
      } satisfies Localized<string>,
    },
  ],
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
};

export type PortfolioData = typeof portfolioData;
