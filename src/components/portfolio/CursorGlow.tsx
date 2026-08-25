import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/use-pointer-capabilities";

/**
 * Ambient light that trails the cursor, screen-blended so it only tints the
 * transparent gaps between sections rather than washing out content or images.
 * Mouse-only: skipped on touch devices and when reduced motion is requested.
 */
export function CursorGlow() {
  const finePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const active = finePointer && !reducedMotion;

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const springX = useSpring(x, { stiffness: 60, damping: 22, mass: 0.7 });
  const springY = useSpring(y, { stiffness: 60, damping: 22, mass: 0.7 });
  const background = useMotionTemplate`radial-gradient(38rem circle at ${springX}px ${springY}px, color-mix(in oklab, var(--primary) 32%, transparent), color-mix(in oklab, var(--secondary) 18%, transparent) 35%, transparent 70%)`;

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
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{ background, mixBlendMode: "screen" }}
    />
  );
}
