import { reverseArray } from "@/helpers/array";

const _experiments = [
  {
    title: "Tab Bar Component",
    url: "/experiments/tab-bar",
    date: "2025-12-02",
  },
  {
    title: "Animated Number Counter",
    url: "/experiments/animated-number-counter",
    date: "2025-12-02",
  },
  {
    title: "Animated Placeholder",
    url: "/experiments/animated-placeholder",
    date: "2025-12-02",
  },
  {
    title: "Glowing Cards",
    url: "/experiments/glowing-cards",
    date: "2025-12-03",
  },
  {
    title: "Cookie Settings",
    url: "/experiments/cookie-settings",
    date: "2025-12-03",
  },
  {
    title: "Hold to Confirm",
    url: "/experiments/hold-to-confirm",
    date: "2025-12-13",
  },
  {
    title: "Animated Accordions",
    url: "/experiments/animated-accordions",
    date: "2025-12-14",
  },
  {
    title: "Text Highlight on Scroll",
    url: "/experiments/text-highlight-on-scroll",
    date: "2025-12-17",
  },
  {
    title: "Copy to Clipboard",
    url: "/experiments/copy-to-clipboard",
    date: "2025-12-18",
  },
  {
    title: "Cancel Deletion",
    url: "/experiments/cancel-deletion",
    date: "2025-12-19",
  },
  {
    title: "Image Gallery",
    url: "/experiments/image-gallery",
    date: "2025-12-20",
  },
];

export const experiments = reverseArray(_experiments);
