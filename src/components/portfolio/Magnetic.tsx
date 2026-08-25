import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/use-pointer-capabilities";

const STRENGTH = 0.35;
const MAX_PULL = 16;

/**
 * Pulls its child toward the cursor within a clamped radius, snapping back on
 * leave. Reserved for one or two focal CTAs per screen — used everywhere it
 * reads as noise instead of delight. Inert on touch and reduced-motion.
 */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });
  const finePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const active = finePointer && !reducedMotion;

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!active) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const pullX = (e.clientX - rect.left - rect.width / 2) * STRENGTH;
    const pullY = (e.clientY - rect.top - rect.height / 2) * STRENGTH;
    x.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, pullX)));
    y.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, pullY)));
  }

  function onPointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block will-change-transform ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}
