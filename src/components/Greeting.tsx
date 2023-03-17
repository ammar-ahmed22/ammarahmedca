import React, { useEffect, useState } from "react";
import {
  VStack,
  HStack,
  Text,
  shouldForwardProp,
  chakra,
} from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import Funmoji, { AnimationName } from "./Funmoji";

interface GreetingProps {
  greetings: string[];
  captions: string[];
  emojis: string[];
  animations: AnimationName[];
}

const AnimatedSpan = chakra(motion.span, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const Greeting: React.FC<GreetingProps> = ({
  captions,
  greetings,
  emojis,
  animations,
}) => {
  if (
    captions.length !== greetings.length ||
    emojis.length !== greetings.length ||
    animations.length !== greetings.length
  ) {
    throw new Error("All props must be same length.");
  }

  const [greeting, setGreeting] = useState("");
  const [caption, setCaption] = useState(captions[0]);
  const [emoji, setEmoji] = useState(emojis[0]);
  const [animation, setAnimation] = useState<AnimationName>(animations[0]);

  useEffect(() => {
    let step = 0;
    let sliceEnd = 1;
    let waitCounter = 0;
    const IID = setInterval(() => {
      setGreeting(greetings[step].slice(0, sliceEnd));
      setCaption(captions[step]);
      setEmoji(emojis[step]);
      setAnimation(animations[step]);
      if (sliceEnd < greetings[step].length) {
        sliceEnd++;
      } else if (sliceEnd === greetings[step].length) {
        if (waitCounter < 3) {
          waitCounter++;
        } else {
          waitCounter = 0;
          sliceEnd++;
        }
      } else {
        sliceEnd = 1;
        if (step < greetings.length - 1) {
          step++;
        } else {
          step = 0;
        }
      }
    }, 350);

    return () => clearInterval(IID);
    // eslint-disable-next-line
  }, []);

  return (
    <VStack align="flex-end">
      <HStack>
        <Text
          fontSize={{ base: "5xl", md: "7xl" }}
          fontWeight="bold"
          fontFamily="heading"
          lineHeight="none"
        >
          {greeting}
        </Text>
        <Funmoji
          key={emoji}
          emoji={emoji}
          animationName={animation}
          fontSize={{ base: "5xl", lg: "7xl" }}
        />
      </HStack>
      <Text
        fontSize={{ base: "4xl", md: "6xl" }}
        fontWeight="bold"
        fontFamily="heading"
        lineHeight="none"
      >
        I'm{" "}
        <AnimatedSpan
          bgGradient="linear(to-tr, brand.blue.500, brand.purple.500)"
          bgClip="text"
          animate={{
            opacity: [0, 1],
          }}
          // @ts-ignore
          transition={{
            duration: 0.75,
            ease: "easeIn",
          }}
          key={caption}
        >
          {caption}
        </AnimatedSpan>
      </Text>
    </VStack>
  );
};

export default Greeting;
