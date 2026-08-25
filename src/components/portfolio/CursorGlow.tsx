import { motion, useAnimationFrame, useMotionValue, useSpring, useVelocity } from "motion/react";
import { useEffect } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/use-pointer-capabilities";

const ORB_SIZE = 30;
const MAX_TRAIL_LENGTH = 150;
const TRAIL_SPEED_RANGE = 1800; // px/s of (smoothed) motion needed to reach max trail length

/**
 * A small gold-and-white orb that trails the cursor with a comet-like tail —
 * the tail's length, opacity and heading react to how fast the orb itself is
 * moving, so a quick flick reads like a rocket streaking past while a still
 * cursor just glows quietly. Screen-blended so it only ever lightens what's
 * beneath it (self-attenuates over near-white backgrounds). Sits above the
 * page content, below the navbar. Mouse-only: skipped on touch devices and
 * when reduced motion is requested.
 */
export function CursorGlow() {
  const finePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const active = finePointer && !reducedMotion;

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const springX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });
  const velocityX = useVelocity(springX);
  const velocityY = useVelocity(springY);

  const trailRotate = useMotionValue(0);
  const trailLength = useMotionValue(0);
  const trailOpacity = useMotionValue(0);

  useAnimationFrame(() => {
    const vx = velocityX.get();
    const vy = velocityY.get();
    const speed = Math.hypot(vx, vy);
    if (speed > 6) {
      trailRotate.set((Math.atan2(vy, vx) * 180) / Math.PI + 180);
    }
    const t = Math.min(speed / TRAIL_SPEED_RANGE, 1);
    trailLength.set(16 + t * MAX_TRAIL_LENGTH);
    trailOpacity.set(Math.min(t * 1.6, 0.85));
  });

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
      className="pointer-events-none fixed top-0 left-0 z-30"
      style={{ x: springX, y: springY, mixBlendMode: "screen" }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          left: 0,
          top: -3,
          height: 6,
          width: trailLength,
          rotate: trailRotate,
          opacity: trailOpacity,
          transformOrigin: "0% 50%",
          background: "linear-gradient(90deg, #FDE047, #F59E0B 55%, transparent)",
          filter: "blur(3px)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          left: -ORB_SIZE / 2,
          top: -ORB_SIZE / 2,
          width: ORB_SIZE,
          height: ORB_SIZE,
          background:
            "radial-gradient(circle, #FFFDF5 0%, #FDE047 40%, #F59E0B 70%, transparent 78%)",
          filter:
            "drop-shadow(0 0 10px rgba(253,224,71,0.85)) drop-shadow(0 0 24px rgba(245,158,11,0.5))",
        }}
      />
    </motion.div>
  );
}
