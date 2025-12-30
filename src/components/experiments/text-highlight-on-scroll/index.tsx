import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/container";

import styles from "./index.module.css";
import { cn } from "@/helpers/styles";

const SENTENCE_COUNT = 3;

export function TextHighlightOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [sentence, setSentence] = useState(1);

  useEffect(() => {
    if (!ref.current) return;

    const handler = () => {
      if (!ref.current) return;

      const { height, top } = ref.current.getBoundingClientRect();
      const scrollY = window.scrollY + window.innerHeight / 2;
      const elementTop = window.scrollY + top;

      const progress = (scrollY - elementTop) / height;
      const clamped = Math.min(Math.max(progress, 0), 0.999);

      setSentence(Math.floor(clamped * SENTENCE_COUNT) + 1);
    };

    handler();

    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <Container>
      <section className={styles.instruction}>(Scroll)</section>

      <section ref={ref} className={styles.main}>
        <p>
          <span className={cn(sentence === 1 && styles.active)}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </span>{" "}
          <span className={cn(sentence === 2 && styles.active)}>
            Voluptas quam quisquam corrupti cumque assumenda a tenetur, deserunt
            dicta?
          </span>{" "}
          <span className={cn(sentence === 3 && styles.active)}>
            Ab, ut molestiae iste temporibus soluta fugiat illum deleniti
            dolorum architecto veniam.
          </span>
        </p>
      </section>

      <footer className={styles.footer}>(The End)</footer>
    </Container>
  );
}
