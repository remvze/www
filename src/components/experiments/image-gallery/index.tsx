import { useId, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { IoCloseOutline } from "react-icons/io5";

import styles from "./index.module.css";

export function ImageGallery() {
  return (
    <div className={styles.container}>
      <Image src="/images/experiments/image-gallery/one.webp" alt="Image One" />
      <Image src="/images/experiments/image-gallery/two.webp" alt="Image Two" />
      <Image
        src="/images/experiments/image-gallery/three.webp"
        alt="Image Three"
      />
      <Image
        src="/images/experiments/image-gallery/four.webp"
        alt="Image Four"
      />
    </div>
  );
}

function Image({ src, alt }: { src: string; alt: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  return (
    <MotionConfig transition={{ type: "spring", stiffness: 225, damping: 25 }}>
      <div className={styles.imageWrapper}>
        <motion.img
          layoutId={id}
          onClick={() => setIsOpen(true)}
          style={{ borderRadius: 16 }}
          src={src}
          alt={alt}
          whileHover={{ scale: 1.01, transition: { duration: 0.1 } }}
          whileTap={{ scale: 0.98, transition: { duration: 0.15 } }}
        />
      </div>

      <Modal
        id={id}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        src={src}
        alt={alt}
      />
    </MotionConfig>
  );
}

function Modal({
  src,
  alt,
  isOpen,
  onClose,
  id,
}: {
  src: string;
  id: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.modal}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.overlay}
            onClick={onClose}
          />
          <div className={styles.content}>
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 0.25 } }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              transition={{ duration: 0.1 }}
              onClick={onClose}
            >
              <IoCloseOutline />
            </motion.button>

            <motion.img
              layoutId={id}
              src={src}
              alt={alt}
              style={{ borderRadius: 32 }}
            />
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
