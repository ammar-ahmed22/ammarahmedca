import React, { useRef } from "react";
import { Text, Box, useColorModeValue, Link, useDimensions } from "@chakra-ui/react";
import Signature from "../../components/Signature";
import ScrollIndicator from "../../components/ScrollIndicator";
import Greeting from "@website/components/Greeting";
import { styles } from "./Hero.styles";

const Hero: React.FC = () => {
  const textBox = useRef<HTMLDivElement>(null);
  const textBoxDim = useDimensions(textBox);
  const sigColor = useColorModeValue("black", "white");

  return (
    <Box minH="90vh" id="rel" >
      <Box marginTop={"10vh"} zIndex={10} ref={textBox} >
        <Greeting 
          greetings={["Hello", "اسلام عليكم", "<h1>Hi</h1>"]}
          captions={["Ammar", "a Muslim", "an Engineer"]}
          emojis={["👋🏽", "🕌", "🛠️"]}
          animations={["wave", "fadeIn", "fadeIn"]}
        />
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
