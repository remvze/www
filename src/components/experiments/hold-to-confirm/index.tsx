import { useEffect, useRef, useState } from "react";
import {
  useMotionValue,
  useTransform,
  motion,
  animate,
  AnimatePresence,
} from "motion/react";

import styles from "./hold-to-confirm.module.css";

export function HoldToConfirm() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const progress = useMotionValue(0);
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);
  const scale = useTransform(progress, [0, 1], [1, 0.875]);

  return (
    <motion.button
      onPointerDown={() => {
        if (isConfirmed) return;

        progress.set(0);

        animate(progress, 1, {
          duration: 1.5,
          onComplete: () => {
            setIsConfirmed(true);
            progress.set(0);
          },
        });
      }}
      onPointerUp={() => {
        if (isConfirmed) return;
        animate(progress, 0, { duration: 0.2 });
      }}
      onPointerLeave={() => {
        if (isConfirmed) return;
        animate(progress, 0, { duration: 0.2 });
      }}
      className={styles.button}
      disabled={isConfirmed}
      style={{ scale }}
    >
      <motion.div
        style={{ width: isConfirmed ? "100%" : width }}
        className={styles.progress}
      />
      <Label isConfirmed={isConfirmed} />
    </motion.button>
  );
}

function Label({ isConfirmed }: { isConfirmed: boolean }) {
  const [changed, setChanged] = useState(false);
  const [width, setWidth] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function measure() {
      if ("fonts" in document) {
        await document.fonts.ready;
      }

      if (!cancelled && ref.current) {
        setWidth(ref.current.getBoundingClientRect().width);
        setReady(true);
      }
    }

    measure();

    return () => {
      cancelled = true;
    };
  }, [changed]);

  return (
    <>
      <div
        ref={ref}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        {changed ? "Confirmed!" : "Hold to Confirm"}
      </div>

      <motion.div
        animate={ready && width !== null ? { width } : undefined}
        transition={{ duration: 0.15, ease: "easeOut" }}
        style={{ position: "relative" }}
      >
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => setChanged(true)}
        >
          <motion.span
            key={isConfirmed ? "yes" : "no"}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            transition={{ duration: 0.1 }}
            style={{
              whiteSpace: "nowrap",
              display: "inline-block",
            }}
          >
            {isConfirmed ? "Confirmed!" : "Hold to Confirm"}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </>
  );
}
