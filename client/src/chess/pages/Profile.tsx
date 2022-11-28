import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Profile : React.FC = () => {

  return (
    <Box>
      <Text
        fontSize={{ base: "5xl", lg: "6xl"}}
        as="h1"
        fontFamily="heading"
        variant="gradient"
      >Profile</Text>
    </Box>
  )
}

export default Profile;