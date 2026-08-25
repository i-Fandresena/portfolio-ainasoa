import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ArrowUpRight, GraduationCap, Github, Mail, MapPin, MessageCircle } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { strings } from "@/i18n/strings";
import { useLanguage } from "@/lib/language-context";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/use-pointer-capabilities";
import { Magnetic } from "./Magnetic";

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

function usePointerTilt() {
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

  return { ref, springX, springY, onPointerMove, onPointerLeave };
}

/** Card wrapper that tilts toward the cursor for a subtle 3D-canvas feel, revealed on scroll. */
function TiltCard({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, springX, springY, onPointerMove, onPointerLeave } = usePointerTilt();

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

/** Same cursor-tilt feel as TiltCard, without the scroll-triggered entrance — for content that's already in continuous motion (e.g. the projects carousel). */
function TiltDiv({
  children,
  className,
  inert,
}: {
  children: ReactNode;
  className?: string;
  inert?: boolean;
}) {
  const { ref, springX, springY, onPointerMove, onPointerLeave } = usePointerTilt();

  return (
    <motion.div
      ref={ref}
      inert={inert}
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
          <Magnetic>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-bold tracking-[0.2em] text-primary-foreground transition-shadow hover:neon-glow"
              style={{ backgroundImage: "var(--gradient-neon)" }}
            >
              {t.hero.cta.toUpperCase()} <ArrowUpRight className="size-4" />
            </a>
          </Magnetic>
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

function ProjectTile({
  project: p,
  hidden = false,
}: {
  project: (typeof projects)[number];
  hidden?: boolean;
}) {
  const { locale } = useLanguage();
  const t = strings[locale];
  const primaryHref = p.liveUrl ?? p.codeUrl;
  const reveal2 =
    "opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 coarse:opacity-100 coarse:translate-y-0";

  return (
    <TiltDiv
      inert={hidden}
      className="group relative isolate w-[19rem] shrink-0 overflow-hidden rounded-3xl bg-card will-change-transform sm:w-[23rem]"
    >
      <a
        href={primaryHref}
        target="_blank"
        rel="noreferrer"
        aria-label={p.title[locale]}
        className="absolute inset-0 z-0 rounded-3xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
      />

      <div className="pointer-events-none aspect-[4/3]">
        <img
          src={p.image}
          alt=""
          loading="lazy"
          draggable={false}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />

      <div className="absolute inset-x-4 top-4 z-10 flex items-center justify-between gap-2 sm:inset-x-5 sm:top-5">
        <span className="pointer-events-none font-display text-xs font-bold tracking-[0.25em] text-white/70">
          {p.id}
        </span>
        <div className="flex items-center gap-2">
          <span className="pointer-events-none hidden rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.15em] text-white uppercase backdrop-blur-sm sm:inline-block">
            {p.role[locale]}
          </span>
          {p.liveUrl && (
            <a
              href={p.codeUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={t.projects.codeAria}
              className="inline-flex size-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <Github className="size-4" />
            </a>
          )}
          <span className="pointer-events-none inline-flex size-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
        <span className="mb-1.5 inline-block rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.15em] text-white uppercase backdrop-blur-sm sm:hidden">
          {p.role[locale]}
        </span>
        <h3 className="font-display text-lg font-bold tracking-tight text-white uppercase sm:text-xl">
          {p.title[locale]}
        </h3>
        <p className={`mt-2 max-w-lg text-sm leading-relaxed text-white/75 ${reveal2}`}>
          {p.description[locale]}
        </p>
        <ul className={`mt-3 flex flex-wrap gap-1.5 ${reveal2}`}>
          {p.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] text-white/80"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </TiltDiv>
  );
}

function wrapPx(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

const CAROUSEL_BASE_SPEED = 44; // px/s at rest
const CAROUSEL_VELOCITY_STRENGTH = 3.5;

/**
 * A continuously drifting project row whose speed and direction react to how
 * fast (and which way) the page is being scrolled — inspired by the classic
 * Framer Motion "scroll velocity" marquee technique, adapted here for
 * clickable project cards rather than decorative text: it pauses on
 * hover/focus so nothing has to be caught mid-flight, only the first,
 * genuinely-focusable set of cards is reachable by keyboard/screen reader
 * (the looping duplicate is marked `inert`), and it's skipped entirely for
 * touch pointers or reduced-motion in favor of a plain native swipe row.
 */
const DRAG_CLICK_THRESHOLD = 6; // px of movement before a drag suppresses the click-through

function VelocityCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);
  const isPaused = useRef(false);
  const direction = useRef(1);
  const pointerDown = useRef(false);
  const isDragging = useRef(false);
  const lastPointerX = useRef(0);
  const dragDistance = useRef(0);
  const suppressClick = useRef(false);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-2000, 0, 2000], [-1, 0, 1], {
    clamp: true,
  });
  const x = useTransform(baseX, (v) => (setWidth ? wrapPx(-setWidth, 0, v) : 0));

  useEffect(() => {
    const measure = () => setSetWidth(trackRef.current?.scrollWidth ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((_, delta) => {
    if (isPaused.current || !setWidth) return;
    const factor = velocityFactor.get();
    if (factor !== 0) direction.current = factor < 0 ? -1 : 1;
    const speed =
      CAROUSEL_BASE_SPEED + Math.abs(factor) * CAROUSEL_BASE_SPEED * CAROUSEL_VELOCITY_STRENGTH;
    baseX.set(baseX.get() - direction.current * speed * (delta / 1000));
  });

  // Pointer capture is only acquired once real dragging is confirmed (past the
  // click threshold) — capturing on every pointerdown would retarget the
  // resulting click event to this container instead of the card's link,
  // silently swallowing every plain click.
  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return; // touch pointers get the native StaticCarousel instead
    suppressClick.current = false;
    pointerDown.current = true;
    isPaused.current = true;
    lastPointerX.current = e.clientX;
    dragDistance.current = 0;
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!pointerDown.current) return;
    const delta = e.clientX - lastPointerX.current;
    lastPointerX.current = e.clientX;
    dragDistance.current += Math.abs(delta);

    if (!isDragging.current && dragDistance.current > DRAG_CLICK_THRESHOLD) {
      isDragging.current = true;
      suppressClick.current = true;
      setIsGrabbing(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }

    if (isDragging.current) {
      if (delta !== 0) direction.current = delta > 0 ? -1 : 1;
      baseX.set(baseX.get() + delta);
    }
  }

  function endDrag(e: ReactPointerEvent<HTMLDivElement>) {
    if (!pointerDown.current) return;
    pointerDown.current = false;
    isPaused.current = false;
    if (isDragging.current) {
      isDragging.current = false;
      setIsGrabbing(false);
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    }
  }

  return (
    <div
      className={`w-full touch-pan-y overflow-hidden ${isGrabbing ? "cursor-grabbing" : "cursor-grab"}`}
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => {
        if (!isDragging.current) isPaused.current = false;
      }}
      onFocus={() => (isPaused.current = true)}
      onBlur={() => (isPaused.current = false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={(e) => {
        if (suppressClick.current) {
          e.preventDefault();
          e.stopPropagation();
          suppressClick.current = false;
        }
      }}
    >
      <motion.div className="flex w-max px-4 sm:px-6" style={{ x }}>
        <div ref={trackRef} className="flex gap-5 pr-5">
          {projects.map((p) => (
            <ProjectTile key={p.id} project={p} />
          ))}
        </div>
        <div className="flex gap-5" aria-hidden>
          {projects.map((p) => (
            <ProjectTile key={`${p.id}-ghost`} project={p} hidden />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/** Plain, native horizontal swiper — no JS-driven motion — for touch pointers and reduced-motion. */
function StaticCarousel() {
  return (
    <div className="scrollbar-none flex w-full snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:px-6">
      {projects.map((p) => (
        <div key={p.id} className="snap-start">
          <ProjectTile project={p} />
        </div>
      ))}
    </div>
  );
}

function ProjectsCarousel() {
  const finePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  return finePointer && !reducedMotion ? <VelocityCarousel /> : <StaticCarousel />;
}

export function Projects() {
  const t = strings[useLanguage().locale];

  return (
    <section id="projects" className="overflow-hidden py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.h2
          {...reveal}
          className="font-display text-4xl font-extrabold tracking-tight uppercase sm:text-6xl"
        >
          {t.projects.heading} <span className="text-stroke">{t.projects.headingAccent}</span>
        </motion.h2>
      </div>
      <div className="mt-14">
        <ProjectsCarousel />
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
