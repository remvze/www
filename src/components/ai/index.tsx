import React, { useState, useEffect, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "motion/react";
import { MdArrowBack } from "react-icons/md";

import styles from "./index.module.css";

interface PhotographyAsset {
  url: string;
  title: string;
}

interface GridSlot extends PhotographyAsset {
  id: string;
  col: number;
  row: number;
}

interface GridItemProps {
  data: GridSlot;
  mapX: MotionValue<number>;
  mapY: MotionValue<number>;
  winSize: { w: number; h: number };
  totalW: number;
  totalH: number;
}

// --- Configuration ---
const CELL_WIDTH = 380;
const CELL_HEIGHT = 380;
const GAP = 30;
const INITIAL_PADDING = 100;

const MY_PHOTOGRAPHY: PhotographyAsset[] = [
  { url: "https://picsum.photos/id/10/1000/1000", title: "Project 01" },
  { url: "https://picsum.photos/id/11/1000/1000", title: "Project 02" },
  { url: "https://picsum.photos/id/12/1000/1000", title: "Project 03" },
  { url: "https://picsum.photos/id/13/1000/1000", title: "Project 04" },
  { url: "https://picsum.photos/id/14/1000/1000", title: "Project 05" },
  { url: "https://picsum.photos/id/15/1000/1000", title: "Project 06" },
  { url: "https://picsum.photos/id/16/1000/1000", title: "Project 07" },
  { url: "https://picsum.photos/id/17/1000/1000", title: "Project 08" },
  { url: "https://picsum.photos/id/18/1000/1000", title: "Project 09" },
  { url: "https://picsum.photos/id/19/1000/1000", title: "Project 10" },
];

export default function InfiniteGrid() {
  const mapX = useMotionValue(INITIAL_PADDING);
  const mapY = useMotionValue(INITIAL_PADDING);

  // SSR-Friendly window sizing
  const [winSize, setWinSize] = useState({ w: 0, h: 0 });
  const [isMounted, setIsMounted] = useState(false);

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
    // Prevent calculation if winSize isn't set yet (SSR)
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
      <a href="/" className={styles.back}>
        <MdArrowBack />
      </a>

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
      <img src={data.url} alt={data.title} loading="lazy" />
    </motion.div>
  );
}
