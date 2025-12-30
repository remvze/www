import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, animate } from "motion/react";

import styles from "./index.module.css";

export function CancelDeletion() {
  const [remaining, setRemaining] = useState(10);
  const [state, setState] = useState<"delete" | "undo">("delete");
  const [isDisabled, setIsDiabled] = useState(false);

  const progress = useRef<HTMLDivElement>(null);
  const interval = useRef<ReturnType<typeof setInterval>>(null);

  const deleteAction = () => {
    if (interval.current) clearInterval(interval.current);

    setState("undo");
    setRemaining(10);
    setIsDiabled(true);

    interval.current = setInterval(
      () => setRemaining((prev) => prev - 1),
      1000
    );
  };

  const undoAction = () => {
    setState("delete");
    setIsDiabled(true);

    if (interval.current) clearInterval(interval.current);
  };

  useEffect(() => {
    if (remaining === 0) {
      if (interval.current) clearInterval(interval.current);

      setState("delete");
    }
  }, [remaining]);

  useEffect(() => {
    if (state !== "undo") return;
    if (!progress.current) return;

    progress.current.style.width = "0%";

    const controls = animate(
      progress.current,
      { width: "100%" },
      { duration: 10, ease: "linear" }
    );

    return () => controls.stop();
  }, [state]);

  return (
    <AnimatePresence
      mode="popLayout"
      initial={false}
      onExitComplete={() => setIsDiabled(false)}
    >
      {state === "delete" && (
        <motion.button
          key={state}
          layoutId="button"
          onClick={deleteAction}
          className={styles.deleteButton}
          style={{ borderRadius: 999 }}
          disabled={isDisabled}
        >
          <motion.span
            initial={{ opacity: 0, y: 16, filter: "blur(2px)" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { delay: 0.1 },
            }}
            exit={{ opacity: 0, y: -16, filter: "blur(2px)" }}
          >
            Delete Post
          </motion.span>
        </motion.button>
      )}

      {state === "undo" && (
        <motion.button
          key={state}
          layoutId="button"
          onClick={undoAction}
          className={styles.undoButton}
          style={{ borderRadius: 999 }}
          disabled={isDisabled}
        >
          <motion.div ref={progress} className={styles.progress} />

          <motion.span
            initial={{ opacity: 0, y: 16, filter: "blur(2px)" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { delay: 0.1 },
            }}
            exit={{ opacity: 0, y: -16, filter: "blur(2px)" }}
          >
            Cancel Deletion
          </motion.span>

          <motion.div
            className={styles.counter}
            initial={{ opacity: 0, scale: 0.5, filter: "blur(2px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.5, filter: "blur(2px)" }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={remaining}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.1 }}
              >
                {remaining}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
