import type { Locale } from "@/lib/language-context";

type Localized<T> = Record<Locale, T>;

export const portfolioData = {
  developerInfo: {
    name: "Hasin'Ny Ainasoa",
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
        fr: "Gestion des Affectations",
        en: "Assignment Management System",
      } satisfies Localized<string>,
      description: {
        fr: "Application de bureau JavaFX pour gérer les employés, les lieux et leurs affectations, avec opérations CRUD complètes.",
        en: "JavaFX desktop application for managing employees, locations, and their assignments, with full CRUD operations.",
      } satisfies Localized<string>,
      role: { fr: "Projet personnel", en: "Personal project" } satisfies Localized<string>,
      tags: ["Java", "JavaFX", "Maven"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800",
      codeUrl: "https://github.com/Antsohasina/gestion-affectation",
      liveUrl: null,
    },
    {
      id: "02",
      title: {
        fr: "Projet DASPA",
        en: "DASPA Project",
      } satisfies Localized<string>,
      description: {
        fr: "Application web full-stack avec un frontend Vue.js et une API backend Node.js/Express connectée à une base SQLite.",
        en: "Full-stack web application with a Vue.js frontend and a Node.js/Express backend API connected to a SQLite database.",
      } satisfies Localized<string>,
      role: { fr: "Projet personnel", en: "Personal project" } satisfies Localized<string>,
      tags: ["Vue.js", "Node.js", "Express"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800",
      codeUrl: "https://github.com/Antsohasina/projet-daspa",
      liveUrl: null,
    },
    {
      id: "03",
      title: {
        fr: "Aide à la Décision Multi-Critère (SAW)",
        en: "Multi-Criteria Decision Tool (SAW)",
      } satisfies Localized<string>,
      description: {
        fr: "Application Next.js implémentant la méthode SAW pour comparer des offres de serveurs selon plusieurs critères pondérés, avec visualisation du front de Pareto.",
        en: "Next.js application implementing the SAW method to compare server offers across weighted criteria, with Pareto front visualization.",
      } satisfies Localized<string>,
      role: { fr: "Collaboratrice", en: "Collaborator" } satisfies Localized<string>,
      tags: ["Next.js", "TypeScript", "Docker"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
      codeUrl: "https://github.com/i-Fandresena/adomc-projet",
      liveUrl: "https://adomc-projet.vercel.app",
    },
    {
      id: "04",
      title: {
        fr: "TP DevOps — Docker & Compose",
        en: "DevOps Lab — Docker & Compose",
      } satisfies Localized<string>,
      description: {
        fr: "Travaux pratiques couvrant les fondamentaux de Docker : images, builds multi-stage, réseaux, volumes et orchestration avec Docker Compose.",
        en: "Hands-on labs covering Docker fundamentals: images, multi-stage builds, networking, volumes, and orchestration with Docker Compose.",
      } satisfies Localized<string>,
      role: { fr: "Contributrice", en: "Contributor" } satisfies Localized<string>,
      tags: ["Docker", "Docker Compose", "Shell"],
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800",
      codeUrl: "https://github.com/i-Fandresena/Projet_M2_2026",
      liveUrl: null,
    },
    {
      id: "05",
      title: {
        fr: "Application de Productivité",
        en: "Productivity App",
      } satisfies Localized<string>,
      description: {
        fr: "Application de gestion de tâches en Next.js et TypeScript, avec authentification, base de données PostgreSQL (Neon) et tableaux de bord interactifs.",
        en: "Task management app built with Next.js and TypeScript, featuring authentication, a PostgreSQL (Neon) database, and interactive dashboards.",
      } satisfies Localized<string>,
      role: { fr: "Contributrice", en: "Contributor" } satisfies Localized<string>,
      tags: ["Next.js", "TypeScript", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
      codeUrl: "https://github.com/i-Fandresena/productivity-app-cz",
      liveUrl: "https://productivity-app-cz.vercel.app",
    },
  ],
  socials: {
    github: "https://github.com/Antsohasina",
    whatsapp: "+261 34 02 987 52",
  },
};

export type PortfolioData = typeof portfolioData;
