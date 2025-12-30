import React, { useState, useEffect, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
  MotionConfig,
} from "motion/react";

import { cn } from "@/helpers/styles";
import { reverseArray } from "@/helpers/array";

import styles from "./index.module.css";

interface PhotographyAsset {
  url: string;
  title?: string;
}

interface GridSlot extends PhotographyAsset {
  id: string;
  col: number;
  index: number;
  row: number;
}

interface GridItemProps {
  data: GridSlot;
  mapX: MotionValue<number>;
  mapY: MotionValue<number>;
  winSize: { w: number; h: number };
  totalW: number;
  totalH: number;
  index: number;
}

const CELL_WIDTH = 380;
const CELL_HEIGHT = 475;
const GAP = 30;
const INITIAL_PADDING = 100;

const MY_PHOTOGRAPHY: PhotographyAsset[] = reverseArray([
  { url: "/images/ai/0001.webp" },
  { url: "/images/ai/0002.webp" },
  { url: "/images/ai/0003.webp" },
  { url: "/images/ai/0004.webp" },
  { url: "/images/ai/0005.webp" },
  { url: "/images/ai/0006.webp" },
  { url: "/images/ai/0007.webp" },
  { url: "/images/ai/0008.webp" },
  { url: "/images/ai/0009.webp" },
  { url: "/images/ai/0010.webp" },
  { url: "/images/ai/0011.webp" },
  { url: "/images/ai/0012.webp" },
  { url: "/images/ai/0013.webp" },
  { url: "/images/ai/0014.webp" },
  { url: "/images/ai/0015.webp" },
  { url: "/images/ai/0016.webp" },
  { url: "/images/ai/0017.webp" },
  { url: "/images/ai/0018.webp" },
  { url: "/images/ai/0019.webp" },
  { url: "/images/ai/0020.webp" },
  { url: "/images/ai/0021.webp" },
  { url: "/images/ai/0022.webp" },
  { url: "/images/ai/0023.webp" },
  { url: "/images/ai/0024.webp" },
  { url: "/images/ai/0025.webp" },
  { url: "/images/ai/0026.webp" },
  { url: "/images/ai/0027.webp" },
  { url: "/images/ai/0028.webp" },
  { url: "/images/ai/0029.webp" },
  { url: "/images/ai/0030.webp" },
]);

export default function InfiniteGrid() {
  const mapX = useMotionValue(INITIAL_PADDING);
  const mapY = useMotionValue(INITIAL_PADDING);

  const [winSize, setWinSize] = useState({ w: 0, h: 0 });
  const [isMounted, setIsMounted] = useState(false);

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if ("fonts" in document) {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    } else {
      setFontsLoaded(true);
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      setWinSize({ w: window.innerWidth, h: window.innerHeight });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridLayout = useMemo(() => {
    if (winSize.w === 0) return { slots: [], totalW: 0, totalH: 0 };

    const cols = Math.ceil(winSize.w / (CELL_WIDTH + GAP)) + 2;
    const rows = Math.ceil(winSize.h / (CELL_HEIGHT + GAP)) + 2;

    const finalCols = Math.max(cols, 6);
    const finalRows = Math.max(rows, 5);

    const totalW = finalCols * (CELL_WIDTH + GAP);
    const totalH = finalRows * (CELL_HEIGHT + GAP);

    const slots: GridSlot[] = Array.from({ length: finalCols * finalRows }).map(
      (_, i) => {
        const assetIndex = i % MY_PHOTOGRAPHY.length;
        return {
          id: `slot-${i}`,
          ...MY_PHOTOGRAPHY[assetIndex],
          index: MY_PHOTOGRAPHY.length - assetIndex,
          col: i % finalCols,
          row: Math.floor(i / finalCols),
        };
      }
    );

    return { slots, totalW, totalH };
  }, [winSize]);

  const springX = useSpring(mapX, { stiffness: 40, damping: 20, mass: 0.6 });
  const springY = useSpring(mapY, { stiffness: 40, damping: 20, mass: 0.6 });

  const handleWheel = (e: React.WheelEvent) => {
    mapX.set(mapX.get() - e.deltaX);
    mapY.set(mapY.get() - e.deltaY);
  };

  const handlePan = (_: any, info: { delta: { x: number; y: number } }) => {
    mapX.set(mapX.get() + info.delta.x);
    mapY.set(mapY.get() + info.delta.y);
  };

  if (!isMounted) return <div className={styles.viewport} />;

  return (
    <div className={styles.viewport} onWheel={handleWheel}>
      <div className={styles.overlay} />

      <h1 className={styles.name}>
        {[
          {
            text: (
              <>
                <i>Design</i> Engineer
              </>
            ),
            delay: 0,
            type: "title",
          },
          { text: "(Maze Heart)", delay: 0.15, type: "main" },
          {
            text: (
              <>
                & AI <i>Explorer</i>.
              </>
            ),
            delay: 0.3,
            type: "title",
          },
        ].map((line, i) => (
          <span
            key={i}
            className={cn(styles.line, line.type === "title" && styles.title)}
          >
            <motion.span
              initial={{ y: "100%", skewY: 7 }}
              animate={
                fontsLoaded ? { y: 0, skewY: 0 } : { y: "100%", skewY: 7 }
              }
              transition={{
                duration: 1.4,
                ease: [0.76, 0, 0.24, 1],
                delay: line.delay,
              }}
              style={{ display: "block", originX: 0 }}
            >
              {line.text}
            </motion.span>
          </span>
        ))}

        <motion.span
          className={styles.instruction}
          initial={{ opacity: 0 }}
          animate={fontsLoaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          (move around)
        </motion.span>
      </h1>

      <div className={styles.socials}>
        {[
          { name: "x.", url: "https://x.com/remvze" },
          { name: "gh.", url: "https://github.com/remvze" },
          { name: "ig.", url: "https://instagram.com/remvze" },
          { name: "li.", url: "https://linkedin.com/in/remvze" },
        ].map((social) => (
          <a href={social.url} target="_blank">
            {social.name}
          </a>
        ))}
      </div>

      <motion.div
        className={styles.canvas}
        onPan={handlePan}
        style={{ cursor: "grab" }}
        whileTap={{ cursor: "grabbing" }}
      >
        {gridLayout.slots.map((slot) => (
          <GridItem
            key={slot.id}
            data={slot}
            mapX={springX}
            mapY={springY}
            winSize={winSize}
            totalW={gridLayout.totalW}
            totalH={gridLayout.totalH}
            index={slot.index}
          />
        ))}
      </motion.div>
    </div>
  );
}

function GridItem({
  data,
  mapX,
  mapY,
  winSize,
  index,
  totalW,
  totalH,
}: GridItemProps) {
  const baseX = data.col * (CELL_WIDTH + GAP);
  const baseY = data.row * (CELL_HEIGHT + GAP);

  const x = useTransform(mapX, (latest) => {
    let rawX = (baseX + latest + totalW * 1000) % totalW;
    if (rawX < -CELL_WIDTH) rawX += totalW;
    if (rawX > winSize.w + (CELL_WIDTH + GAP)) rawX -= totalW;
    return rawX;
  });

  const y = useTransform(mapY, (latest) => {
    let rawY = (baseY + latest + totalH * 1000) % totalH;
    if (rawY < -CELL_HEIGHT) rawY += totalH;
    if (rawY > winSize.h + (CELL_HEIGHT + GAP)) rawY -= totalH;
    return rawY;
  });

  const opacity = useTransform([x, y], ([latestX, latestY]) => {
    const buffer = 200;
    return (latestX as number) > -CELL_WIDTH - buffer &&
      (latestX as number) < winSize.w + buffer &&
      (latestY as number) > -CELL_HEIGHT - buffer &&
      (latestY as number) < winSize.h + buffer
      ? 1
      : 0;
  });

  return (
    <motion.div
      className={styles.imageCard}
      style={{ x, y, opacity, width: CELL_WIDTH, height: CELL_HEIGHT }}
    >
      <img
        src={data.url}
        alt={data.title || "Untitled AI Generated Image"}
        loading="lazy"
      />
      <p>INDX. {index.toString().padStart(9, "0")}</p>
    </motion.div>
  );
}
