import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useState } from "react";
import styles from "./cookie-settings.module.css";

export function CookieSettings() {
  const [isOpen, setIsOpen] = useState(false);

  const childVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 28,
        mass: 0.8,
        visualDuration: 0.2,
      }}
    >
      <AnimatePresence mode="popLayout">
        {!isOpen && (
          <motion.div
            key="button"
            layoutId="background"
            className={styles.cookieBorder}
            style={{
              borderRadius: 16,
              padding: 1,
              background: "var(--color-neutral-300)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              layoutId="content"
              className={styles.cookieBackground}
              style={{ borderRadius: 15 }}
            >
              <button onClick={() => setIsOpen(true)}>
                <motion.span layoutId="emoji" className={styles.emoji}>
                  🍪
                </motion.span>
              </button>
            </motion.div>
          </motion.div>
        )}

        {isOpen && (
          <motion.div
            key="modal"
            layoutId="background"
            className={styles.cookieBorder}
            style={{
              borderRadius: 16,
              padding: 1,
              background: "var(--color-neutral-300)",
            }}
          >
            <motion.div
              layoutId="content"
              className={styles.settings}
              style={{ borderRadius: 15 }}
            >
              <motion.div
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      ease: "easeIn",
                      delayChildren: 0.075,
                    },
                  },
                }}
              >
                <h1>
                  <motion.span layoutId="emoji" className={styles.emoji}>
                    🍪
                  </motion.span>{" "}
                  <motion.span variants={childVariants} className={styles.text}>
                    Cookie Settings
                  </motion.span>
                </h1>

                <motion.p variants={childVariants}>
                  Manage your cookie preferences here!
                </motion.p>

                <motion.div className={styles.buttons} variants={childVariants}>
                  <button onClick={() => setIsOpen(false)}>Accept All</button>
                  <button onClick={() => setIsOpen(false)}>Reject All</button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
