import React from "react";
import { useParams } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { styles } from "./Game.styles";
import { games } from "@website/games";
import type { Games } from "@website/games";

const Game: React.FC = () => {
  const { game } = useParams();
  const metadata = games[game as Games];
  if (metadata){
    const Component = metadata.component
    return (
      <>
        <Text sx={styles.title} variant="gradient" >{metadata.title}</Text>
        <Text sx={styles.info}>{metadata.description}</Text>
        <Component />
      </>
    )
  } else {
    return (
      <>
        <Text sx={styles.title} variant="gradient" >Cannot find game: {game}</Text>
      </>
    )
  }
  
}

export default Game;