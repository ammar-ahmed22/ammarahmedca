import { Box, Text, HStack, Button } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";

const Home: React.FC = () => {
  const { user } = useContext(AuthContext) as AuthContextType;

  return (
    <Box>
      <Text
        fontSize={{ base: "3xl", lg: "4xl" }}
        fontFamily="heading"
        variant="gradient"
        as="h1"
      >
        Welcome back, {user.firstName}
      </Text>
      <Text fontSize="lg">
        You have beat me{" "}
        <Text as="span" variant="gradient" fontWeight="bold">
          {user.record.wins}
        </Text>{" "}
        times.
      </Text>
      <Text fontSize="lg">
        I have beat you{" "}
        <Text as="span" variant="gradient" fontWeight="bold">
          {user.record.losses}
        </Text>{" "}
        times.
      </Text>
      <HStack spacing={3} minH="40vh" justify="center">
        <Button variant="gradient">Continue</Button>
        <Button variant="gradient">New Game</Button>
      </HStack>
    </Box>
  );
};

export default Home;
