import { useState } from "react";
import { AnimatePresence, motion, stagger } from "motion/react";
import useMeasure from "react-use-measure";

import styles from "./index.module.css";

export function CopyToClipboard() {
  const [isCopying, setIsCopying] = useState(false);

  const copy = async () => {
    setIsCopying(true);

    await navigator.clipboard.writeText("Something to be copied.");

    setTimeout(() => setIsCopying(false), 2000);
  };

  return (
    <div className={styles.container}>
      <textarea
        value="Something to be copied."
        readOnly
        className={styles.textarea}
      />

      <div className={styles.buttonWrapper}>
        <Button onClick={copy} isCopying={isCopying} />
      </div>
    </div>
  );
}

function Button({
  isCopying,
  onClick,
}: {
  isCopying: boolean;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className={styles.button} disabled={isCopying}>
      <Label isCopying={isCopying} /> <span>to Clipboard</span>
    </button>
  );
}

function Label({ isCopying }: { isCopying: boolean }) {
  const label = isCopying ? "Copied" : "Copy";
  const [ref, bounding] = useMeasure();

  return (
    <>
      <p
        ref={ref}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        {label}
      </p>

      <motion.div
        animate={{
          width: bounding.width,
          transition: { delay: 0.15, duration: 0.2 },
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={label}
            transition={{ delayChildren: stagger(0.03) }}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{ initial: {}, animate: {}, exit: {} }}
            className={styles.label}
          >
            {label.split("").map((char, index) => (
              <motion.span
                variants={{
                  animate: { y: 0 },
                  initial: { y: 10 },
                  exit: { y: -10 },
                }}
                transition={{ duration: 0.05 }}
                key={`${index}-${char}`}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </>
  );
}
