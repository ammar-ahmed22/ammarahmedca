import React from "react";
import { Box, Text, Link } from "@chakra-ui/react";

const About = () => {
  const styleProps = {
    mainBox: {
      minHeight: "100vh",
    },
    paragraphText: {
      as: "p",
      fontFamily: "body",
      mb: 4,
    },
    textLink: {
      fontWeight: "bold",
      isExternal: true,
      // textDecoration: "underline"
    },
  };

  return (
    <Box {...styleProps.mainBox}>
      <Text as="h3" fontSize="6xl" fontFamily="heading">
        Who?
      </Text>
      <Text {...styleProps.paragraphText}>
        I'm a second year student at the{" "}
        <Link href="https://uwaterloo.ca/" {...styleProps.textLink}>
          University of Waterloo
        </Link>{" "}
        studying{" "}
        <Link
          href="https://uwaterloo.ca/future-students/programs/nanotechnology-engineering"
          {...styleProps.textLink}
        >
          Nanotechnology Engineering
        </Link>
        . As part of my last co-op term, I was employed at the University of
        Waterloo WIL Programs as a Developer. Currently, I am employed by{" "}
        <Link href="https://hire.company/" {...styleProps.textLink}>
          HIRE Technologies
        </Link>{" "}
        as a QA Engineer mainly working with their{" "}
        <Link href="https://www.pulsifyapp.com/" {...styleProps.textLink}>
          Pulsify
        </Link>{" "}
        team.
      </Text>

      <Text {...styleProps.paragraphText}>
        In my free-time, while it may sound extremely nerdy, I like to code.
        Currently, most of my time is dedicated to creating various web and mobile apps both static and full-stack. I also like to dabble
        in dynamic art using the HTML canvas API as well as making simple games
        and algorithm visualizers. When I'm not coding, I enjoy spending time
        with my wife trying out new restaurants and watching movies (Yes, I'm
        married. Ask me about it!).
      </Text>
    </Box>
  );
};

export default About;
