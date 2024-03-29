import React from "react";
import { Box, Image, LayoutProps, Text, TextProps } from "@chakra-ui/react";

interface ProfileImageProps {
  image?: string;
  letter: string;
  size?: LayoutProps["h"];
  fontSize?: TextProps["fontSize"];
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  image,
  letter,
  size,
  fontSize,
}) => {
  // console.log(image);
  if (image) {
    return (
      <Box w={size ?? "100%"} h={size ?? "100%"}>
        <Image
          src={image}
          objectFit="cover"
          borderRadius="full"
          w="100%"
          h="100%"
        />
      </Box>
    );
  }

  return (
    <Box
      h={0}
      w={size}
      bgGradient="linear(to-tr, brand.purple.500, brand.blue.500)"
      pos="relative"
      borderRadius="full"
      pb={size}
    >
      <Text
        fontSize={fontSize}
        p={0}
        m={0}
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        {letter === "" ? "?" : letter}
      </Text>
    </Box>
  );
};

export default ProfileImage;
