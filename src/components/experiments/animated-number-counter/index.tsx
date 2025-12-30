import { useEffect, useState } from "react";
import { motion } from "motion/react";

import styles from "./animated-number-counter.module.css";

export function AnimatedNumberCounter() {
  const [number, setNumber] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.numberWrapper}>
        <Number value={number} />
      </div>
      <button
        className={styles.button}
        onClick={() =>
          setNumber(Math.floor(Math.random() * (9999 - 1000)) + 1000)
        }
      >
        Random Number
      </button>
    </div>
  );
}

function Number({ value }: { value: number }) {
  const digits = String(value).padStart(4, "0").split("");

  return (
    <div className={styles.number}>
      {digits.map((digit, i) => (
        <Digit value={parseInt(digit)} key={i} />
      ))}
    </div>
  );
}

const numbers = new Array(10).fill(null).map((_, i) => i);

function Digit({ value }: { value: number }) {
  const offset = `calc(${value} * -1 * (1em + 20px))`;

  return (
    <div className={styles.digitWrapper}>
      <motion.div
        animate={{ y: offset }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 18,
        }}
        className={styles.digits}
      >
        {numbers.map((num) => (
          <p className={styles.digit}>{num}</p>
        ))}
      </motion.div>
    </div>
  );
}
