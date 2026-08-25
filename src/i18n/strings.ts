import type { Locale } from "@/lib/language-context";

export const strings = {
  fr: {
    nav: {
      about: "À propos",
      services: "Services",
      projects: "Projets",
      contact: "Contact",
      cta: "Me contacter",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      toggleTheme: "Activer le thème clair",
      toggleThemeToDark: "Activer le thème sombre",
      toggleLanguage: "Passer en anglais",
    },
    hero: {
      cta: "Me contacter",
    },
    about: {
      heading1: "À propos",
      heading2: "de moi",
    },
    services: {
      heading: "Ce que je fais",
    },
    projects: {
      heading: "Projets",
      headingAccent: "sélectionnés",
      cta: "Voir le projet",
    },
    testimonials: {
      heading: "Ils en parlent",
    },
    contact: {
      heading1: "Construisons",
      heading2: "quelque chose",
      name: "Nom",
      email: "Email",
      message: "Message",
      send: "Envoyer le message",
    },
    footer: {
      copyright: "Tous droits réservés",
    },
  },
  en: {
    nav: {
      about: "About",
      services: "Services",
      projects: "Projects",
      contact: "Contact",
      cta: "Get in touch",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      toggleTheme: "Switch to light theme",
      toggleThemeToDark: "Switch to dark theme",
      toggleLanguage: "Switch to French",
    },
    hero: {
      cta: "Contact me",
    },
    about: {
      heading1: "About",
      heading2: "Me",
    },
    services: {
      heading: "What I Do",
    },
    projects: {
      heading: "Selected",
      headingAccent: "Work",
      cta: "Live project",
    },
    testimonials: {
      heading: "Kind Words",
    },
    contact: {
      heading1: "Let's Build",
      heading2: "Something",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
    },
    footer: {
      copyright: "All rights reserved",
    },
  },
} as const satisfies Record<Locale, unknown>;

export type Strings = (typeof strings)[Locale];
