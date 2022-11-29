import React from "react";
import {
  Box,
  Text,
  Button,
  ListItem,
  OrderedList,
  HStack,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { FaChessBoard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { styles } from "./Home.styles";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Text {...styles.title} variant="gradient">
        Chess
      </Text>
      <Text {...styles.subtitle}>
        <Text variant="gradient" as="span">
          What
        </Text>{" "}
        is this?
      </Text>
      <Text {...styles.body}>
        To my fuel my coding addiction, this is the latest project that I have
        embarked on. Simply put, this is a no time-limit chess game playable
        against me. The chess game in it's entirety was coded by me as a
        learning exercise including all the game logic and rendering. The user
        authentication system and backend was also all done on my own for
        learning purposes. To read more about the nerdy stuff, check out the
        GitHub README or my blog post on it all.
      </Text>
      <HStack w="100%">
        <Box>
          <Text {...styles.subtitle}>
            <Text variant="gradient" as="span">
              How
            </Text>{" "}
            does it work?
          </Text>
          <OrderedList fontSize={{ base: "sm", lg: "md" }}>
            <ListItem>Create an account or login.</ListItem>
            <ListItem>Play your move.</ListItem>
            <ListItem>An email notification is sent to me.</ListItem>
            <ListItem>I play my move.</ListItem>
            <ListItem>An email notification is sent to you.</ListItem>
            <ListItem>Repeat from Step 2 until you lose :{")"}</ListItem>
          </OrderedList>
        </Box>
        <VStack align="center" flex="1" justify="flex-start" h="100%">
          <Box mb="2">
            <Icon
              as={FaChessBoard}
              h="20vh"
              w="20vh"
              bgGradient="linear(to-tr, brand.purple.500, brand.blue.500)"
            />
          </Box>

          <HStack>
            <Button
              bgGradient="linear(to-r, brand.purple.500, brand.blue.500)"
              color="white"
              _hover={{
                bgGradient: "linear(to-r, brand.purple.600, brand.blue.600)",
              }}
              onClick={() => navigate("/chess/login")}
            >
              Let's Play!
            </Button>
            {/* <Button variant="outline" borderColor="brand.purple.500" color="brand.purple.300" >Register</Button> */}
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default Home;
