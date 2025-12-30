import { useState } from "react";
import { motion } from "motion/react";

import styles from "./tab-bar.module.css";
import { cn } from "@/helpers/styles";

export function TabBar() {
  const [active, setActive] = useState<"login" | "register" | "forgot">(
    "login"
  );

  return (
    <div className={styles.container}>
      <div className={styles.tabBar}>
        <Item
          label="Login"
          isActive={active === "login"}
          onSelect={() => setActive("login")}
        />
        <Item
          label="Register"
          isActive={active === "register"}
          onSelect={() => setActive("register")}
        />
        <Item
          label="Forgot Password"
          isActive={active === "forgot"}
          onSelect={() => setActive("forgot")}
        />
      </div>
    </div>
  );
}

function Item({
  label,
  isActive,
  onSelect,
}: {
  label: string;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      className={cn(styles.item, isActive && styles.active)}
      onClick={onSelect}
    >
      <span>{label}</span>
      {isActive && (
        <motion.div layoutId="background" className={styles.background} />
      )}
    </motion.button>
  );
}
