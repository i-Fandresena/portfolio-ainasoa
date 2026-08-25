import type { Locale } from "@/lib/language-context";

type Localized<T> = Record<Locale, T>;

export const portfolioData = {
  developerInfo: {
    name: "Hasina Ainasoa",
    fullName: "ANDRIAMANJATOHASA Antson'Ny Famonjena Hasin'Ny Ainasoa Désirée",
    title: {
      fr: "DÉVELOPPEUSE FULL-STACK",
      en: "FULL-STACK DEVELOPER",
    } satisfies Localized<string>,
    tagline: {
      fr: "JAVASCRIPT, TYPESCRIPT, REACT NATIVE, PYTHON & JAVA — DU CODE SOIGNÉ, TESTÉ ET PRÊT POUR LA PRODUCTION.",
      en: "JAVASCRIPT, TYPESCRIPT, REACT NATIVE, PYTHON & JAVA — CLEAN, TESTED, PRODUCTION-READY CODE.",
    } satisfies Localized<string>,
    aboutBio: {
      fr: "Développeuse full-stack passionnée par l'écosystème JavaScript/TypeScript, le développement mobile avec React Native, ainsi que Python et Java. Sensible à la qualité logicielle, j'accorde une attention particulière aux tests et à l'assurance qualité à chaque étape du développement.",
      en: "Full-stack developer passionate about the JavaScript/TypeScript ecosystem, mobile development with React Native, and the Python and Java languages. Quality-driven, I pay close attention to testing and QA at every stage of development.",
    } satisfies Localized<string>,
    avatarUrl: "/profil_ainasoa.png",
    email: "hasina.ainasoa@gmail.com",
    location: {
      fr: "Madagascar — Disponible à distance",
      en: "Madagascar — Available remotely",
    } satisfies Localized<string>,
    education: {
      fr: "Master Professionnel 2 — ENI (École Nationale d'Informatique)",
      en: "Professional Master's, Year 2 — ENI (École Nationale d'Informatique)",
    } satisfies Localized<string>,
  },
  techStack: [
    {
      name: "JavaScript / TypeScript",
      category: { fr: "Langage", en: "Language" } satisfies Localized<string>,
    },
    {
      name: "React / Next.js",
      category: { fr: "Frontend", en: "Frontend" } satisfies Localized<string>,
    },
    {
      name: "React Native",
      category: { fr: "Mobile", en: "Mobile" } satisfies Localized<string>,
    },
    {
      name: "Node.js",
      category: { fr: "Backend", en: "Backend" } satisfies Localized<string>,
    },
    {
      name: "Python",
      category: { fr: "Backend", en: "Backend" } satisfies Localized<string>,
    },
    {
      name: "Java",
      category: { fr: "Backend", en: "Backend" } satisfies Localized<string>,
    },
    {
      name: "QA & Testing",
      category: { fr: "Qualité", en: "Quality" } satisfies Localized<string>,
    },
  ],
  services: [
    {
      id: "01",
      title: {
        fr: "DÉVELOPPEMENT WEB",
        en: "WEB DEVELOPMENT",
      } satisfies Localized<string>,
      description: {
        fr: "Conception et développement d'applications web modernes avec JavaScript, TypeScript, React et Next.js, du prototypage jusqu'à la mise en production.",
        en: "Designing and building modern web applications with JavaScript, TypeScript, React, and Next.js, from prototype to production.",
      } satisfies Localized<string>,
    },
    {
      id: "02",
      title: {
        fr: "DÉVELOPPEMENT MOBILE",
        en: "MOBILE DEVELOPMENT",
      } satisfies Localized<string>,
      description: {
        fr: "Création d'applications mobiles cross-platform avec React Native, pour une expérience fluide et cohérente sur iOS et Android.",
        en: "Building cross-platform mobile apps with React Native, for a smooth and consistent experience on iOS and Android.",
      } satisfies Localized<string>,
    },
    {
      id: "03",
      title: {
        fr: "BACKEND & LANGAGES",
        en: "BACKEND & LANGUAGES",
      } satisfies Localized<string>,
      description: {
        fr: "Développement de services backend robustes en Node.js, Python et Java, adaptés aux besoins spécifiques de chaque projet.",
        en: "Building robust backend services in Node.js, Python, and Java, tailored to each project's specific needs.",
      } satisfies Localized<string>,
    },
    {
      id: "04",
      title: {
        fr: "ASSURANCE QUALITÉ",
        en: "QUALITY ASSURANCE",
      } satisfies Localized<string>,
      description: {
        fr: "Mise en place de stratégies de tests et de processus d'assurance qualité pour garantir la fiabilité et la stabilité de chaque application.",
        en: "Setting up testing strategies and QA processes to ensure the reliability and stability of every application.",
      } satisfies Localized<string>,
    },
  ],
  projects: [
    {
      id: "01",
      title: {
        fr: "Application de Gestion Scolaire",
        en: "School Management Platform",
      } satisfies Localized<string>,
      tags: ["React", "TypeScript", "Node.js"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
      codeUrl: "https://github.com/Antsohasina",
    },
    {
      id: "02",
      title: {
        fr: "Suite de Tests Automatisés (QA)",
        en: "Automated QA Test Suite",
      } satisfies Localized<string>,
      tags: ["Python", "Selenium", "Pytest"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
      codeUrl: "https://github.com/Antsohasina",
    },
  ],
  socials: {
    github: "https://github.com/Antsohasina",
    whatsapp: "+261 34 02 987 52",
  },
};

export type PortfolioData = typeof portfolioData;
