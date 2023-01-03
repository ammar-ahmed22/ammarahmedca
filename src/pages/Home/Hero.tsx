import React, { useRef } from "react";
import { Text, Box, useColorModeValue, Link, useDimensions } from "@chakra-ui/react";
import Signature from "../../components/Signature";
import ScrollIndicator from "../../components/ScrollIndicator";
import Funmoji from "@website/components/Funmoji";
import { styles } from "./Hero.styles";

const Hero: React.FC = () => {
  const textBox = useRef<HTMLDivElement>(null);
  const textBoxDim = useDimensions(textBox);
  const sigColor = useColorModeValue("black", "white");

  return (
    <Box minH="90vh" id="rel" >
      <Box marginTop={"10vh"} zIndex={10} ref={textBox} >
        <Text sx={styles.mainText} as="h1" userSelect="none" >
          Hello{" "}
          <Funmoji emoji="👋🏽" fontSize={{ base: "5xl", lg: "7xl" }} />
          {/* <Text as="span" fontSize={{ base: "5xl", lg: "7xl" }}>
            👋🏽
          </Text> */}
          <br />
          I'm{" "}
          <Text variant="gradient" as="span">
            Ammar
          </Text>
        </Text>
        <Text sx={styles.subText}>
          Engineering student{" "}
          <Text as="span" fontWeight="bold">
            @
          </Text>{" "}
          <Link href="https://uwaterloo.ca/" {...styles.subTextLink}>
            University of Waterloo
          </Link>
        </Text>
        <Text sx={styles.subText}>
          Frontend Developer{" "}
          <Text as="span" fontWeight="bold">
            @
          </Text>{" "}
          <Link href="https://docs.aiarena.io/" {...styles.subTextLink}>
            AI Arena
          </Link>
        </Text>
      </Box>
     {textBoxDim && <Signature color={sigColor} parentBoxModel={textBoxDim} />}

      <ScrollIndicator scrollToId="projects" />
    </Box>
  );
};

export default Hero;
