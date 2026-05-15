import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const TEXTS = [
  "I'm a digital curator.",
  "I'm a design engineer.",
  "I'm a solo founder.",
  "I'm a generalist.",
];

export function MorphingTextAnimation() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TEXTS.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <TextAnimation text={TEXTS[index]} />
    </div>
  );
}

interface TextAnimationProps {
  text: string;
}

function TextAnimation({ text }: TextAnimationProps) {
  const chars = text.split("");
  const counts: Record<string, number> = {};

  return (
    <p>
      <AnimatePresence mode="popLayout" initial={false}>
        {chars.map((char) => {
          counts[char] = counts[char] ?? 0;
          const id = `${char}-${counts[char]++}`;

          return (
            <motion.span
              style={{ display: "inline-block", fontWeight: 500 }}
              key={id}
              layout="position"
              layoutId={id}
              initial={{ opacity: 0, filter: "blur(2px)", scale: 0.8 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(2px)", scale: 0.8 }}
              transition={{ ease: "easeInOut", duration: 0.4 }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </p>
  );
}
