"use client";
import { useEffect, useState } from "react";
import TextGenerate, {
  TextGenerateProps,
  TextGenerateWord,
} from "./text-generate";

export type RepeatGenerateSentenceProps = {
  sentences: TextGenerateWord[][];
  hold?: number;
} & Omit<TextGenerateProps, "words">;

export default function RepeatGenerateSentence(
  props: RepeatGenerateSentenceProps,
) {
  const [currSentence, setCurrentSentence] = useState(0);
  const { sentences, hold = 0.5, duration, ...rest } = props;

  useEffect(() => {
    const interval = setTimeout(
      () => {
        setCurrentSentence((curr) => (curr + 1) % sentences.length);
      },
      ((duration ?? 0.5) + 0.5) * 1000 +
        sentences[currSentence].length * 200 +
        hold * 1000,
    );

    return () => clearTimeout(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currSentence]);

  return (
    <TextGenerate
      id={currSentence.toString()}
      words={sentences[currSentence]}
      duration={duration}
      {...rest}
    />
  );
}
