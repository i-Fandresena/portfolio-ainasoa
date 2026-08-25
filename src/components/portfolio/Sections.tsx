import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowUpRight, GraduationCap, Github, Mail, MapPin, MessageCircle } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { strings } from "@/i18n/strings";
import { useLanguage } from "@/lib/language-context";

const { developerInfo, techStack, services, projects, socials } = portfolioData;

const whatsappHref = `https://wa.me/${socials.whatsapp.replace(/\D/g, "")}`;

const reveal = {
  initial: { opacity: 0, y: 56, rotateX: 14, scale: 0.96 },
  whileInView: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
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

/** Card wrapper that tilts toward the cursor for a subtle 3D-canvas feel. */
function TiltCard({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 260, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 260, damping: 22 });

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 8);
    rotateX.set(py * -8);
  }

  function onPointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      {...reveal}
      transition={{ ...reveal.transition, delay }}
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
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
        <motion.p
          {...reveal}
          className="text-xs font-bold tracking-[0.35em] text-primary uppercase"
        >
          {developerInfo.title[locale]}
        </motion.p>

        <motion.h1
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.05 }}
          className="font-display mt-6 text-5xl leading-[0.92] font-extrabold tracking-tight uppercase sm:text-7xl lg:text-8xl"
        >
          {locale === "fr" ? "SALUT, JE SUIS " : "HI, I'M "}
          <span className="text-stroke">{developerInfo.name}</span>
        </motion.h1>

        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.15 }}
          style={{ transformPerspective: 1000 }}
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
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.2 }}
          className="mx-auto mt-10 max-w-2xl text-sm font-medium tracking-[0.12em] text-muted-foreground uppercase sm:text-base"
        >
          {developerInfo.tagline[locale]}
        </motion.p>

        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.25 }}
          className="mt-10"
        >
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
          <motion.span
            key={`${tech.name}-${i}`}
            whileHover={{ y: -4, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex items-center gap-3 rounded-2xl border border-border px-6 py-3 text-sm font-semibold whitespace-nowrap"
          >
            {tech.name}
            <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
              {tech.category[locale]}
            </span>
          </motion.span>
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
          {...reveal}
          className="font-display text-stroke-neon text-6xl font-extrabold tracking-tight uppercase sm:text-8xl"
        >
          {t.about.heading1}
          <br />
          {t.about.heading2}
        </motion.h2>
        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.1 }}
          className="min-w-0"
        >
          <p className="text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase">
            {developerInfo.fullName}
          </p>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            {developerInfo.aboutBio[locale]}
          </p>
          <ul className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
              <MapPin className="size-4 shrink-0 text-primary" /> {developerInfo.location[locale]}
            </li>
            <li className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
              <Mail className="size-4 shrink-0 text-primary" /> {developerInfo.email}
            </li>
            <li className="flex items-center gap-2 rounded-full border border-border px-4 py-2">
              <GraduationCap className="size-4 shrink-0 text-primary" />{" "}
              {developerInfo.education[locale]}
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
          {...reveal}
          className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-6xl"
        >
          {t.services.heading}
        </motion.h2>
        <div className="mt-14 grid gap-5">
          {services.map((s, i) => (
            <TiltCard
              key={s.id}
              delay={i * 0.08}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-6 rounded-2xl bg-card p-8 text-card-foreground will-change-transform md:grid-cols-[auto_minmax(0,0.9fr)_minmax(0,1.4fr)] md:items-center"
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
            </TiltCard>
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
          {...reveal}
          className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-6xl"
        >
          {t.projects.heading} <span className="text-stroke">{t.projects.headingAccent}</span>
        </motion.h2>
        <div className="mt-14 flex flex-col gap-8">
          {projects.map((p, i) => (
            <TiltCard
              key={p.id}
              delay={i * 0.08}
              className="group grid gap-8 rounded-2xl border border-border bg-card p-6 will-change-transform hover:neon-glow md:grid-cols-2 md:items-center"
            >
              <div className="aspect-video overflow-hidden rounded-2xl">
                <img
                  src={p.image}
                  alt={`${p.title[locale]} preview`}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span className="font-display text-sm font-bold tracking-[0.3em] text-primary">
                    {p.id}
                  </span>
                  <span className="rounded-full border border-border px-2.5 py-1 text-[10px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                    {p.role[locale]}
                  </span>
                </div>
                <h3 className="font-display mt-3 text-2xl font-bold tracking-tight uppercase sm:text-3xl">
                  {p.title[locale]}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.description[locale]}
                </p>
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
                <div className="mt-7 flex items-center gap-3">
                  <a
                    href={p.liveUrl ?? p.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold tracking-[0.2em] text-primary-foreground"
                    style={{ backgroundImage: "var(--gradient-neon)" }}
                  >
                    {(p.liveUrl ? t.projects.ctaLive : t.projects.cta).toUpperCase()}
                    {p.liveUrl ? (
                      <ArrowUpRight className="size-4" />
                    ) : (
                      <Github className="size-4" />
                    )}
                  </a>
                  {p.liveUrl && (
                    <a
                      href={p.codeUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t.projects.codeAria}
                      className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <Github className="size-4" />
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
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
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
        <motion.div {...reveal} className="min-w-0">
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
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.1 }}
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-8"
        >
          <div className="group grid gap-1.5 border-b border-border pb-3 transition-colors focus-within:border-primary">
            <label
              htmlFor="contact-name"
              className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase transition-colors group-focus-within:text-primary"
            >
              {t.contact.name}
            </label>
            <input id="contact-name" required className="bg-transparent text-base outline-none" />
          </div>
          <div className="group grid gap-1.5 border-b border-border pb-3 transition-colors focus-within:border-primary">
            <label
              htmlFor="contact-email"
              className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase transition-colors group-focus-within:text-primary"
            >
              {t.contact.email}
            </label>
            <input
              id="contact-email"
              type="email"
              required
              className="bg-transparent text-base outline-none"
            />
          </div>
          <div className="group grid gap-1.5 border-b border-border pb-3 transition-colors focus-within:border-primary">
            <label
              htmlFor="contact-msg"
              className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase transition-colors group-focus-within:text-primary"
            >
              {t.contact.message}
            </label>
            <textarea
              id="contact-msg"
              rows={3}
              required
              className="resize-none bg-transparent text-base outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-fit rounded-full px-8 py-4 text-xs font-bold tracking-[0.2em] text-primary-foreground transition-shadow hover:neon-glow"
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
        <h2 className="font-display text-[13vw] leading-[0.85] font-extrabold tracking-tighter uppercase sm:text-[10vw]">
          HASIN&apos;NY
          <br />
          AINASOA
        </h2>
        <div className="mt-12 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-border pt-8">
          <p className="min-w-0 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {developerInfo.name} — {developerInfo.title[locale]} ·{" "}
            {t.footer.copyright}
          </p>
          <div className="flex shrink-0 gap-2">
            {[
              { href: socials.github, Icon: Github, label: "GitHub" },
              { href: whatsappHref, Icon: MessageCircle, label: "WhatsApp" },
              { href: `mailto:${developerInfo.email}`, Icon: Mail, label: "Email" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
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
