import {
  Text,
  Flex,
  Icon,
  VStack,
  Box,
  Tag,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { AuthContext, AuthContextType } from "@chess/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GAMES_QUERY, GamesQuery } from "@chess/graphql/queries/Game";
import {
  CREATE_GAME_MUTATION,
  CreateGameMutation,
} from "@chess/graphql/mutations/createGame";
import Card from "@website/components/Card";
import { FaPlus } from "react-icons/fa";
import { Board } from "@chess/game/Board";
import { GameProvider } from "@chess/contexts/GameContext";
import { formatDistanceToNow } from "date-fns";
import { userToMove } from "@chess/game/utils";

const Home: React.FC = () => {
  const { user } = useContext(AuthContext) as AuthContextType;

  const navigate = useNavigate();

  const [create, { data, loading, error }] =
    useMutation<CreateGameMutation.Response>(CREATE_GAME_MUTATION);

  const gamesResponse = useQuery<GamesQuery.Response>(GAMES_QUERY);

  useEffect(() => {
    if (data && !loading && !error) {
      const path = "/chess/play/" + data.createGame.gameID;
      navigate(path);
    }

    if (error) {
      console.log(error.message);
    }
  }, [data, loading, error, navigate]);

  return (
    <Flex minH="60vh" direction="column">
      <Text
        fontSize={{ base: "4xl", lg: "5xl" }}
        fontFamily="heading"
        fontWeight="bold"
        as="h1"
        variant="gradient"
      >
        Welcome,{" "}
        <Text as="span" color={useColorModeValue("gray.800", "white")}>
          {user.firstName}
        </Text>
      </Text>
      <Text
        fontSize={{ base: "2xl", lg: "3xl" }}
        fontFamily="heading"
        fontWeight="bold"
        as="h2"
        variant="gradient"
      >
        Our Games
      </Text>
      <Flex gap="5">
        {!gamesResponse.loading &&
          gamesResponse.data &&
          gamesResponse.data.games.map((game) => {
            const board = new Board(
              game.lastHalfMove?.fen ?? "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
            );
            const isUserTurn = userToMove(
              user._id,
              game.colorToMove,
              game.playerIDs
            );
            return (
              <Card
                isLink
                onClick={() => navigate("/chess/play/" + game._id)}
                w="30vh"
                h="37vh"
                key={game._id}
              >
                <VStack>
                  <Flex direction="column">
                    <GameProvider playerIDs={game.playerIDs} colorToMove="w">
                      {board.renderDisplay("3vh")}
                    </GameProvider>
                  </Flex>
                  <Box w="100%">
                    <Text fontSize="sm" mb="2">
                      Started {formatDistanceToNow(new Date(game.createdAt))}{" "}
                      ago
                    </Text>
                    <HStack spacing={2}>
                      <Tag size="sm" colorScheme="blue">
                        {game.status[0].toUpperCase() + game.status.slice(1)}
                      </Tag>
                      <Tag colorScheme={isUserTurn ? "green" : "red"} size="sm">
                        {isUserTurn ? "Your" : "Opponent's"} Turn
                      </Tag>
                    </HStack>
                  </Box>
                </VStack>
              </Card>
            );
          })}
        {user.gameIDs.length === 0 && (
          <Card
            isLink
            onClick={() => {
              create();
            }}
            w="30vh"
            h="35vh"
          >
            <Flex w="100%" h="100%" justify="center" align="center">
              <Text fontSize="xl" fontWeight="bold">
                <Text as="span" verticalAlign="middle" fontSize="md">
                  <Icon as={FaPlus} />
                </Text>{" "}
                New Game
              </Text>
            </Flex>
          </Card>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
