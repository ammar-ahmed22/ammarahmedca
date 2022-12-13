import React from "react";
import { Flex, Text, Box, useColorModeValue } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { styles } from "./styles/BulletItem.styles";

interface BulletItemProps {
  children: React.ReactNode;
  listLength: number;
  idx: number;
}

const BulletItem: React.FC<BulletItemProps> = ({
  children,
  listLength,
  idx,
}) => {
  const gradients = {
    top: useColorModeValue(
      "linear(to-t, gray.800 60%, transparent)",
      "linear(to-t, white 60%, transparent)"
    ),
    mid: useColorModeValue(
      "linear(to-t, gray.800, gray.800)",
      "linear(to-t, white, white)"
    ),
    bottom: useColorModeValue(
      "linear(to-b, gray.800 60%, transparent)",
      "linear(to-b, white 60%, transparent)"
    ),
  };

  let gradient: string;
  if (idx === 0) {
    gradient = gradients.top;
  } else if (idx === listLength - 1) {
    gradient = gradients.bottom;
  } else {
    gradient = gradients.mid;
  }

  return (
    <Flex key={idx} position="relative" pb={5} align="center">
      {/* {idx !== listLength - 1 && <Box {...styles.line} bg={lineBg} />} */}
      <Box {...styles.line} bgGradient={gradient} />
      <Text {...styles.bullet} fontSize="xl">
        <FontAwesomeIcon icon={faCircle as IconProp} />
      </Text>
      <Box ml={3} minW={0}>
        {children}
      </Box>
    </Flex>
  );
};

export default BulletItem;
