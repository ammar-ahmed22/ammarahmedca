import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const Home : React.FC = () => {

  const navigate = useNavigate();

  return (
    <Box >
      <Text>Chess Home</Text>
      <Button onClick={() => navigate("play")}>Play</Button>
    </Box>
  )
}

export default Home;
