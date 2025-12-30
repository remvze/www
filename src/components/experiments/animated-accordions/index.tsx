import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IoChevronForwardSharp } from "react-icons/io5";

import styles from "./animated-accordions.module.css";
import { cn } from "@/helpers/styles";

export function AnimatedAccordions() {
  const [open, setOpen] = useState(0);

  return (
    <div className={styles.accordions}>
      <Accordion
        title="Accordion No 01"
        isOpen={open === 1}
        onOpen={() => setOpen((prev) => (prev === 1 ? 0 : 1))}
      >
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
          voluptatum ipsum nihil soluta modi! Voluptates cupiditate pariatur
          magnam totam laudantium ut! Reprehenderit ratione beatae dolores non
          nisi facere molestiae totam?
        </p>
      </Accordion>
      <Accordion
        title="Accordion No 02"
        isOpen={open === 2}
        onOpen={() => setOpen((prev) => (prev === 2 ? 0 : 2))}
      >
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
          voluptatum ipsum nihil soluta modi! Voluptates cupiditate pariatur
          magnam totam laudantium ut! Reprehenderit ratione beatae dolores non
          nisi facere molestiae totam?
        </p>
      </Accordion>
      <Accordion
        title="Accordion No 03"
        isOpen={open === 3}
        onOpen={() => setOpen((prev) => (prev === 3 ? 0 : 3))}
      >
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
          voluptatum ipsum nihil soluta modi! Voluptates cupiditate pariatur
          magnam totam laudantium ut! Reprehenderit ratione beatae dolores non
          nisi facere molestiae totam?
        </p>
      </Accordion>
    </div>
  );
}

function Accordion({
  children,
  title,
  isOpen,
  onOpen,
}: {
  title: string;
  isOpen: boolean;
  onOpen: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div layout className={styles.accordion}>
      <div style={{ padding: 16 }}>
        <div
          className={styles.title}
          role="button"
          aria-expanded={isOpen}
          onClick={onOpen}
        >
          <p>{title}</p>
          <span className={cn(isOpen && styles.open)}>
            <IoChevronForwardSharp />
          </span>
        </div>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 26,
              }}
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className={styles.contentWrapper}
            >
              <div className={styles.content}>
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {children}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
