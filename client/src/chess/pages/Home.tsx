import { Text, Button, Flex } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAuthMutation } from "../../hooks/auth";
import { gql } from "@apollo/client";

const Home: React.FC = () => {
  const { user } = useContext(AuthContext) as AuthContextType;

  const navigate = useNavigate();

  const [create, { submitted, loading, error }] = useAuthMutation("createGame", gql`
    mutation CreateGame {
      createGame{
        token
      }
    }
  `)

  useEffect(() => {
    if (submitted && !loading && !error){
      navigate("/chess/play");
    }

    if (error){
      console.log(error.message);
    }
  }, [submitted, loading, error, navigate])

  const renderSubtext = (user: User) => {
    if (!user.currentGameID){
      if (user.record.wins === 0 && user.record.losses === 0){
        // render I see we haven't played yet, let's play! (Button) => createGame
        return (
          <>
            <Text fontSize="lg" mb="3" >I see we haven't played yet.</Text>
            <Button variant="gradient" onClick={() => create()} >Let's Play</Button>
          </>
        )
      } else {
        // render You have beat me X times, I have beat you X times, let's play (Button) => createGame
        return (
          <>
            <Text fontSize="lg" mb="3">You have beat me <Text as="span" variant="gradient">{user.record.wins}</Text> times.</Text>
            <Text fontSize="lg" mb="3">I have beat you <Text as="span" variant="gradient">{user.record.losses}</Text> times.</Text>
            <Button variant="gradient" onClick={() => create()}>Let's Play</Button>
          </>
        )
      }
    } else {
      // render What are you waiting for? Continue
      return (
        <>
          <Text fontSize="lg" mb="3">What are you waiting for?</Text>
          <Button variant="gradient" onClick={() => navigate("/chess/play")}>Continue Our Game</Button>
        </>
      )
    }
  }

  return (
    <Flex minH="60vh" justify="center" align="center" direction="column" >
      <Text
        fontSize={{ base: "4xl", lg: "5xl" }}
        fontFamily="heading"
        fontWeight="bold"
        as="h1"
        align="center"
        variant="gradient"
      >
        Welcome, <Text as="span" color="white" >{user.firstName}</Text>
      </Text>
      {
        renderSubtext(user)
      }
    </Flex>
  );
};

export default Home;
