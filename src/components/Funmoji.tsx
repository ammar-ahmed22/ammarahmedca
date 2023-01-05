import React, { useState } from "react";
import { BoxProps, shouldForwardProp, chakra, Tooltip, Portal, PositionProps, useColorModeValue } from "@chakra-ui/react"
import { motion, isValidMotionProp } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

export type AnimationName = "wave" | "fadeIn";

type FunmojiProps = {
  emoji: string,
  fontSize: BoxProps["fontSize"],
  animationName: AnimationName,
  dropDuration?: number
}

const AnimatedBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop)
})

type DropParams = {
  emoji: string,
  leftPos: PositionProps["left"],
  id: string
}

const Funmoji : React.FC<FunmojiProps> = ({ emoji, fontSize, dropDuration = 5, animationName }) => {

  const [drops, setDrops] = useState<DropParams[]>([]);

  const randInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const randomLeftPos = (bounds: { left: number, right: number }) : PositionProps["left"] => {
    const val = randInRange(bounds.left, bounds.right);
    return `${val}vw`;
  }

  const randomEmoji = () => {
    const emojis = [
      "🖥️",
      "🕌",
      "👋🏽",
      "🧑🏽‍💻",
      "🔥",
      "💯",
      "🚀",
      "✨"
    ];
    return emojis[randInRange(0, emojis.length - 1)]
  }

  const animationProps : Record<AnimationName, any> = {
    wave: {
      transformOrigin: "bottom right",
      animate: {
        rotate: [0, 45, 0],
      },
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: (1.5 * 2),
        repeatType: "loop"
      }
    },
    fadeIn: {
      animate: {
        opacity: [0, 1],
        transition: {
          duration: .75,
          ease: "easeIn"
        }
      }
    }
  }

  return (
    <>
      <Tooltip 
        label="Click me :)" 
        placement="top" 
        bg={useColorModeValue("blackAlpha.200", "whiteAlpha.200")}
        color={useColorModeValue("black", "white")} 
        fontWeight="bold" 
        p="3" 
        mb="3" 
        borderRadius="lg" 
        hasArrow
      >
        <AnimatedBox
          display="inline-block"
          userSelect="none"
          _hover={{
            cursor: "pointer"
          }}
          fontSize={fontSize}
          {...animationProps[animationName]}
          // transformOrigin="bottom right"
          
          // animate={{
          //   rotate: [0, 45, 0],
          // }}
          // // @ts-ignore
          // transition={{
          //   duration: 1.5,
          //   ease: "easeInOut",
          //   repeat: (1.5 * 2),
          //   repeatType: "loop"
          // }}
          onClick={() => {
            setDrops( prev => [
              ...prev,
              {
                emoji: randomEmoji(),
                leftPos: randomLeftPos({ left: 30, right: 70 }),
                id: uuidv4()
              }
            ])

            setTimeout(() => {
              setDrops( prev => {
                const copy = [...prev];
                copy.shift();
                return copy;
              })
            }, dropDuration * 1000)
          }}
        >
          {emoji}
        </AnimatedBox>
      </Tooltip>
      <Portal>
        {
          !!drops.length && drops.map( drop => {
            return (
               <AnimatedBox
                key={drop.id}
                pos="absolute"
                zIndex={-1}
                top="0vh"
                left={drop.leftPos}
                animate={{
                  top: ["0vh", "1000vh"]
                }}
                // @ts-ignore
                transition={{
                  duration: dropDuration,
                  ease: [0.11, 0, 0.5, 0]
                }}
                fontSize={{ base: "2xl", lg: "5xl" }}
              >
                {drop.emoji}
              </AnimatedBox> 
            )
          })
        }
      </Portal>
    </>

  )
}

export default Funmoji;