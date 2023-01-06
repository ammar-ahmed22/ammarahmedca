import React from "react";
import { Text, Box, Image, Flex } from "@chakra-ui/react";
import Wedding from "../assets/images/Wedding.jpg";
import { styles } from "./About.styles";

const About: React.FC = () => {
  return (
    <Box>
      <Text {...styles.title}>
        <Text as="span" variant="gradient">
          Who
        </Text>{" "}
        Am I?
      </Text>
      <Text {...styles.body}>
        I'm a second year student at the University of Waterloo studying
        Nanotechnology Engineering. As most others who hear about this field of
        engineering, you're probably very confused. Nanotechnology engineering
        is engineering from the bottom-up rather than the traditional top-down
        approach. We engineer devices and systems at the nano-scale such as
        computer processors, medical robotics, drug delivery systems etc.
      </Text>
      <Text {...styles.body}>
        However, since my admission into the University of Waterloo, I have
        found an immense interest in software engineering/development. I have
        found a very particular interest in full-stack web and app development,
        due to which, my current and previous co-op terms have been in the web
        development field.
      </Text>

      <Text {...styles.body}>
        In my current co-op placement, I am working in a frontend role. I've also 
        started working part-time as a Data Analyst for an online Fragrance company
        which has really sparked my interest in the field of data science and
        analysis. I aspire to work in a field where software and nanotechnology
        intersect.
      </Text>

      <Text {...styles.title}>
        How Do I{" "}
        <Text as="span" variant="gradient">
          Spend My Time
        </Text>
        ?
      </Text>
      <Text {...styles.body}>
        While it may sound extremely nerdy, what I love to do most in my
        free-time is code. As I've never been very talented in traditional forms
        of art, coding is my way of expressing myself. Whether that be through
        creating websites to help me with productivity or creating algorithm
        simulations, code helps me express my creativity through
        logic and mathematics.
      </Text>
      <Text {...styles.body}>
        When I'm not coding you can find me watching Netflix. I tend to enjoy
        shows that have a good, thrilling storyline such as Breaking Bad, Ozark
        and Narcos. I also enjoy reality-style comedy shows like The Office,
        Parks and Recreation and Brooklyn Nine Nine. Aside from movies and TV
        shows, the rest of my time goes to spending time with my lovely wife,
        whom I married at the young age of 20 years old. We like to explore new
        halal restaurants around the GTA or watch movies together.
      </Text>
      <Flex align="center" direction="column">
        <Box maxW="container.sm">
          <Image src={Wedding} {...styles.image} />
        </Box>
        <Text {...styles.imageCaption}>My wife and I on our wedding day</Text>
      </Flex>
    </Box>
  );
};

export default About;
