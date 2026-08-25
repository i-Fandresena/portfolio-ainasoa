import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/use-pointer-capabilities";

/**
 * Ambient light that trails the cursor, layered above the page content and
 * screen-blended so it can only ever lighten what's beneath it (never
 * obscures text or images, and self-attenuates to nothing over near-white
 * backgrounds). Sits below the navbar (z-50). Mouse-only: skipped on touch
 * devices and when reduced motion is requested.
 */
export function CursorGlow() {
  const finePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const active = finePointer && !reducedMotion;

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const springX = useSpring(x, { stiffness: 60, damping: 22, mass: 0.7 });
  const springY = useSpring(y, { stiffness: 60, damping: 22, mass: 0.7 });
  const background = useMotionTemplate`radial-gradient(40rem circle at ${springX}px ${springY}px, color-mix(in oklab, var(--primary) 38%, transparent), color-mix(in oklab, var(--secondary) 22%, transparent) 35%, transparent 70%)`;

  useEffect(() => {
    if (!active) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [active, x, y]);

  if (!active) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30"
      style={{ background, mixBlendMode: "screen" }}
    />
  );
}
