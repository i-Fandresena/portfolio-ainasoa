import { motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Quote, Twitter } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { strings } from "@/i18n/strings";
import { useLanguage } from "@/lib/language-context";

const { developerInfo, techStack, services, projects, testimonials, socials } = portfolioData;

const rise = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

function Blob({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className ?? ""}`}
      style={{ backgroundImage: "var(--gradient-neon)", opacity: "var(--blob-opacity)" }}
    />
  );
}

export function Hero() {
  const { locale } = useLanguage();
  const t = strings[locale];

  return (
    <section id="top" className="relative overflow-hidden px-4 pt-36 pb-20 md:pt-44">
      <Blob className="-top-24 -left-24 size-80" />
      <Blob className="top-40 -right-20 size-72" />
      <div className="relative mx-auto max-w-6xl text-center">
        <motion.p {...rise} className="text-xs font-bold tracking-[0.35em] text-primary uppercase">
          {developerInfo.title[locale]}
        </motion.p>

        <motion.h1
          {...rise}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-display mt-6 text-5xl leading-[0.92] font-extrabold tracking-tight uppercase sm:text-7xl lg:text-8xl"
        >
          {locale === "fr" ? "SALUT, JE SUIS " : "HI, I'M "}
          <span className="text-stroke">{developerInfo.name}</span>
        </motion.h1>

        <motion.div
          {...rise}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-12 w-fit"
        >
          <div
            className="animate-floaty neon-glow rounded-[2rem] p-1.5"
            style={{ backgroundImage: "var(--gradient-neon)" }}
          >
            <img
              src={developerInfo.avatarUrl}
              alt={`Portrait of ${developerInfo.name}`}
              loading="lazy"
              className="size-56 rounded-[1.7rem] object-cover sm:size-72"
            />
          </div>
        </motion.div>

        <motion.p
          {...rise}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-10 max-w-2xl text-sm font-medium tracking-[0.12em] text-muted-foreground uppercase sm:text-base"
        >
          {developerInfo.tagline[locale]}
        </motion.p>

        <motion.div {...rise} transition={{ duration: 0.7, delay: 0.25 }} className="mt-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-bold tracking-[0.2em] text-primary-foreground transition-shadow hover:neon-glow"
            style={{ backgroundImage: "var(--gradient-neon)" }}
          >
            {t.hero.cta.toUpperCase()} <ArrowUpRight className="size-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export function Marquee() {
  const { locale } = useLanguage();
  const items = [...techStack, ...techStack, ...techStack, ...techStack];
  return (
    <section className="overflow-hidden border-y border-border py-6">
      <div className="animate-marquee flex w-max gap-4">
        {items.map((tech, i) => (
          <span
            key={`${tech.name}-${i}`}
            className="flex items-center gap-3 rounded-2xl border border-border px-6 py-3 text-sm font-semibold whitespace-nowrap"
          >
            {tech.name}
            <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
              {tech.category[locale]}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}

export function About() {
  const { locale } = useLanguage();
  const t = strings[locale];

  return (
    <section id="about" className="relative overflow-hidden px-4 py-28">
      <Blob className="top-10 left-1/2 size-72 -translate-x-1/2" />
      <div className="relative mx-auto grid max-w-6xl gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
        <motion.h2
          {...rise}
          className="font-display text-stroke-neon text-6xl font-extrabold tracking-tight uppercase sm:text-8xl"
        >
          {t.about.heading1}
          <br />
          {t.about.heading2}
        </motion.h2>
        <motion.div {...rise} transition={{ duration: 0.6, delay: 0.1 }} className="min-w-0">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {developerInfo.aboutBio[locale]}
          </p>
          <ul className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
              <MapPin className="size-4 shrink-0 text-primary" /> {developerInfo.location[locale]}
            </li>
            <li className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
              <Mail className="size-4 shrink-0 text-primary" /> {developerInfo.email}
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

export function Services() {
  const { locale } = useLanguage();
  const t = strings[locale];

  return (
    <section id="services" className="section-flip bg-background px-4 py-28 text-foreground">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          {...rise}
          className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-6xl"
        >
          {t.services.heading}
        </motion.h2>
        <div className="mt-14 grid gap-5">
          {services.map((s, i) => (
            <motion.article
              {...rise}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              key={s.id}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-6 rounded-2xl bg-card p-8 text-card-foreground transition-transform hover:-translate-y-1 md:grid-cols-[auto_minmax(0,0.9fr)_minmax(0,1.4fr)] md:items-center"
            >
              <span className="font-display text-3xl font-extrabold text-primary sm:text-4xl">
                {s.id}
              </span>
              <h3 className="font-display min-w-0 text-xl font-bold tracking-tight uppercase sm:text-2xl">
                {s.title[locale]}
              </h3>
              <p className="col-span-2 min-w-0 text-sm leading-relaxed text-muted-foreground md:col-span-1">
                {s.description[locale]}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  const { locale } = useLanguage();
  const t = strings[locale];

  return (
    <section id="projects" className="px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          {...rise}
          className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-6xl"
        >
          {t.projects.heading} <span className="text-stroke">{t.projects.headingAccent}</span>
        </motion.h2>
        <div className="mt-14 flex flex-col gap-8">
          {projects.map((p, i) => (
            <motion.article
              {...rise}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              key={p.id}
              className="group grid gap-8 rounded-2xl border border-border bg-card p-6 transition-shadow hover:neon-glow md:grid-cols-2 md:items-center"
            >
              <div className="aspect-video overflow-hidden rounded-2xl">
                <img
                  src={p.image}
                  alt={`${p.client} preview`}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0">
                <span className="font-display text-sm font-bold tracking-[0.3em] text-primary">
                  {p.id}
                </span>
                <h3 className="font-display mt-3 text-2xl font-bold tracking-tight uppercase sm:text-3xl">
                  {p.client}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold tracking-[0.2em] text-primary-foreground"
                  style={{ backgroundImage: "var(--gradient-neon)" }}
                >
                  {t.projects.cta.toUpperCase()} <ArrowUpRight className="size-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const { locale } = useLanguage();
  const t = strings[locale];

  return (
    <section className="px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          {...rise}
          className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-6xl"
        >
          {t.testimonials.heading}
        </motion.h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((item, i) => (
            <motion.figure
              {...rise}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              key={item.id}
              className="rounded-2xl border border-border p-8"
            >
              <Quote className="size-6 text-primary" />
              <blockquote className="mt-5 text-lg leading-relaxed">
                "{item.quote[locale]}"
              </blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{item.author}</span> —{" "}
                {item.role[locale]}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const { locale } = useLanguage();
  const t = strings[locale];

  return (
    <section id="contact" className="section-flip bg-background px-4 py-28 text-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
        <motion.div {...rise} className="min-w-0">
          <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-6xl">
            {t.contact.heading1}
            <br />
            {t.contact.heading2}
          </h2>
          <p className="mt-6 text-muted-foreground">{developerInfo.location[locale]}</p>
          <a
            href={`mailto:${developerInfo.email}`}
            className="font-display mt-2 inline-block text-xl font-bold break-all text-primary"
          >
            {developerInfo.email}
          </a>
        </motion.div>

        <motion.form
          {...rise}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={(e) => e.preventDefault()}
          className="grid gap-4 rounded-2xl border border-border p-6"
        >
          <div className="grid gap-2">
            <label htmlFor="contact-name" className="text-xs font-bold tracking-[0.2em] uppercase">
              {t.contact.name}
            </label>
            <input
              id="contact-name"
              required
              className="min-h-11 rounded-xl border border-input bg-transparent px-4 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="contact-email" className="text-xs font-bold tracking-[0.2em] uppercase">
              {t.contact.email}
            </label>
            <input
              id="contact-email"
              type="email"
              required
              className="min-h-11 rounded-xl border border-input bg-transparent px-4 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="contact-msg" className="text-xs font-bold tracking-[0.2em] uppercase">
              {t.contact.message}
            </label>
            <textarea
              id="contact-msg"
              rows={5}
              required
              className="rounded-xl border border-input bg-transparent p-4 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded-full px-6 py-4 text-xs font-bold tracking-[0.2em] text-primary-foreground"
            style={{ backgroundImage: "var(--gradient-neon)" }}
          >
            {t.contact.send.toUpperCase()}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

export function Footer() {
  const { locale } = useLanguage();
  const t = strings[locale];

  return (
    <footer className="relative overflow-hidden px-4 pt-24 pb-10">
      <Blob className="-bottom-32 left-1/3 size-96" />
      <div className="relative mx-auto max-w-6xl">
        <h2 className="font-display text-[18vw] leading-[0.8] font-extrabold tracking-tighter uppercase">
          {developerInfo.name}
        </h2>
        <div className="mt-12 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-border pt-8">
          <p className="min-w-0 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {developerInfo.name} — {developerInfo.title[locale]} ·{" "}
            {t.footer.copyright}
          </p>
          <div className="flex shrink-0 gap-2">
            {[
              { href: socials.github, Icon: Github, label: "GitHub" },
              { href: socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: socials.twitter, Icon: Twitter, label: "Twitter" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
