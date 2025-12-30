import { useEffect, useMemo, useState } from "react";
import styles from "./animated-placeholder.module.css";
import { motion, AnimatePresence, stagger } from "motion/react";

export function AnimatedPlaceholder() {
  const [value, setValue] = useState("");

  return (
    <div className={styles.container}>
      <Textarea value={value} onChange={setValue} />
    </div>
  );
}

function Textarea({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const placeholders = useMemo(
    () => [
      "Build me an animated placeholder.",
      "Build me beautiful landing page.",
    ],
    []
  );
  const [index, setIndex] = useState(0);
  const placeholder = useMemo(() => placeholders[index], [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholders.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.textarea}>
      <AnimatePresence initial={false}>
        {!value && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.placeholder}
          >
            <PlaceholderText text={placeholder} />
          </motion.div>
        )}
      </AnimatePresence>

      <textarea
        autoFocus
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
}

function PlaceholderText({ text }: { text: string }) {
  const chars = useMemo(
    () => text.split("").map((c) => (c === " " ? "\u00A0" : c)),
    [text]
  );

  const variants = {
    initial: {
      opacity: 0,
      filter: "blur(8px)",
      x: 4,
      y: 12,
    },
    animate: {
      opacity: 1,
      filter: "blur(0)",
      x: 0,
      y: 0,
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={text}
        className={styles.placeholderText}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: {},
          animate: { transition: { delayChildren: stagger(0.03) } },
          exit: {},
        }}
      >
        {chars.map((char, i) => (
          <motion.span
            transition={{ ease: "easeInOut" }}
            variants={variants}
            key={`${char}-${i}`}
          >
            {char}
          </motion.span>
        ))}
      </motion.p>
    </AnimatePresence>
  );
}
