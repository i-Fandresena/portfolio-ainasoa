import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon, Languages } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { strings } from "@/i18n/strings";
import { useTheme } from "@/lib/theme-context";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale } = useLanguage();
  const t = strings[locale].nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t.about, href: "#about" },
    { label: t.services, href: "#services" },
    { label: t.projects, href: "#projects" },
    { label: t.contact, href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        style={{ maxWidth: scrolled ? "44rem" : "72rem" }}
        className={cn(
          "glass flex w-full items-center gap-3 rounded-2xl px-4 transition-[max-width,padding,box-shadow] duration-500 ease-out sm:px-5",
          scrolled ? "py-2.5 shadow-lg shadow-black/10" : "py-3",
        )}
      >
        <a href="#top" className="flex shrink-0 items-center">
          <img
            src="/logo_sans_fond.png"
            alt={portfolioData.developerInfo.name}
            className="h-10 w-auto object-contain sm:h-11"
          />
        </a>

        <ul className="ml-auto hidden items-center gap-6 md:flex lg:gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium tracking-wide whitespace-nowrap text-muted-foreground transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={t.toggleLanguage}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-xs font-bold tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Languages className="size-3.5" aria-hidden />
            {locale.toUpperCase()}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t.toggleTheme : t.toggleThemeToDark}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <span suppressHydrationWarning>
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </span>
          </button>
          {!scrolled && (
            <a
              href="#contact"
              className="inline-flex rounded-full px-5 py-2.5 text-xs font-bold tracking-[0.15em] text-primary-foreground transition-shadow hover:neon-glow"
              style={{ backgroundImage: "var(--gradient-neon)" }}
            >
              {t.cta.toUpperCase()}
            </a>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t.toggleTheme : t.toggleThemeToDark}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-border text-foreground"
          >
            <span suppressHydrationWarning>
              {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </span>
          </button>
          <button
            type="button"
            aria-label={open ? t.closeMenu : t.openMenu}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border text-foreground"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass absolute inset-x-4 top-full mt-2 rounded-2xl p-4 md:hidden">
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={t.toggleLanguage}
            className="mb-2 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-border text-sm font-bold tracking-wide text-muted-foreground"
          >
            <Languages className="size-4" aria-hidden />
            {locale === "fr" ? "FR — Français" : "EN — English"}
          </button>
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full px-4 py-3 text-center text-xs font-bold tracking-[0.15em] text-primary-foreground"
                style={{ backgroundImage: "var(--gradient-neon)" }}
              >
                {t.cta.toUpperCase()}
              </a>
            </li>
          </ul>
        </div>
      )}
    </motion.header>
  );
}
