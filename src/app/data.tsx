import type { TextGenerateWord } from "@/components/ui/text-generate";
import {
  BabyIcon,
  GemIcon,
  MoonStarIcon,
  PocketKnifeIcon,
} from "lucide-react";

const iconClassname = "sm:size-12 size-8";
export const sentences: TextGenerateWord[][] = [
  [
    "I'm",
    "an",
    {
      word: "Engineer",
      className: "text-foreground",
      leftContent: <PocketKnifeIcon className={iconClassname} />,
    },
  ],
  [
    "I'm",
    "a",
    {
      word: "Husband",
      className: "text-foreground",
      leftContent: <GemIcon className={iconClassname} />,
    },
  ],
  [
    "I'm",
    "a",
    {
      word: "Father",
      className: "text-foreground",
      leftContent: <BabyIcon className={iconClassname} />,
    },
  ],
  [
    "I'm",
    "a",
    {
      word: "Muslim",
      className: "text-foreground",
      leftContent: <MoonStarIcon className={iconClassname} />,
    },
  ],
];
