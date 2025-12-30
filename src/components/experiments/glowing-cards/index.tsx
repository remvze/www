import { AnimatePresence, motion, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

import styles from "./glowing-cards.module.css";

export function GlowingCards() {
  return (
    <div className={styles.container}>
      <div className={styles.cards}>{Array(4).fill(<Card />)}</div>
    </div>
  );
}

function Card() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;

      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseEnter = () => {
      setShowGlow(true);

      card?.addEventListener("mousemove", handleMouseMove);
    };

    const handleMouseLeave = () => {
      setShowGlow(false);

      card?.removeEventListener("mousemove", handleMouseMove);
    };

    card?.addEventListener("mouseenter", handleMouseEnter);
    card?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card?.removeEventListener("mouseenter", handleMouseEnter);
      card?.removeEventListener("mouseleave", handleMouseLeave);
      card?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.card} ref={cardRef}>
      <div className={styles.background} />

      <AnimatePresence mode="wait">
        {showGlow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.glow}
            style={{ top: mouseY, left: mouseX }}
          />
        )}
      </AnimatePresence>

      <div className={styles.content}>
        <p>Card Component</p>
      </div>
    </div>
  );
}
