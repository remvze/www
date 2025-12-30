import { reverseArray } from "@/helpers/array";

interface Bookmark {
  title: string;
  url: string;
  date: string;
}

/**
 * From old to new
 */

const _bookmarks: Bookmark[] = [
  {
    title: "Design Engineering 101",
    date: "2025-11-30",
    url: "https://www.designdisciplin.com/p/design-engineering-101",
  },
  {
    title: "Design Engineering at Vercel",
    date: "2025-11-30",
    url: "https://vercel.com/blog/design-engineering-at-vercel",
  },
  {
    title: "Developing Taste",
    date: "2025-11-30",
    url: "https://emilkowal.ski/ui/developing-taste",
  },
  {
    title: "12 Principles of Animation",
    date: "2025-12-14",
    url: "https://www.raphaelsalaja.com/library/12-principles-of-animation",
  },
];

export const bookmarks = reverseArray(_bookmarks);
