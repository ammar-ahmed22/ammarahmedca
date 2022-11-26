import React from "react";
import { Box, Icon, keyframes, Flex, Text } from "@chakra-ui/react";
import { FaChessBoard } from "react-icons/fa";
import { motion } from "framer-motion";

const Loading : React.FC = () => {

  const animationKeyframes = keyframes`
    0% { transform: scale(1) rotate(0); }
    25% { transform: scale(1) rotate(0); }
    50% { transform: scale(1.25) rotate(360deg); }
    75% { transform: scale(1.25) rotate(360deg); }
    100% { transform: scale(1) rotate(0); }
  `;

  const animation = `${animationKeyframes} 2s ease-in-out infinite`;

  return (
    <Flex justify="center" align="center" h="60vh" w="100%" flexDirection="column">
      <Box h="10vh" w="10vh" as={motion.div} animation={animation} mb='5' >
        <Icon 
          as={FaChessBoard} 
          h="100%" 
          w="100%" 
          bgGradient="linear(to-tr, brand.purple.500, brand.blue.500)" 
        />
      </Box>
      <Text variant="gradient" fontFamily="body" fontWeight="bold" fontSize="xl" >Loading ...</Text>
    </Flex>
  )
}

export default Loading;