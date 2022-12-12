import React, { Dispatch, SetStateAction } from "react";
import { Button, Text } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

interface DisplayLimiterProps {
  numDisplaying: number;
  setNumDisplaying: Dispatch<SetStateAction<number>>;
  initial: number;
  total: number;
  incrementBy: number;
  scrollToId?: string;
}

const DisplayLimiter: React.FC<DisplayLimiterProps> = ({
  numDisplaying,
  setNumDisplaying,
  initial,
  total,
  incrementBy,
  scrollToId = "",
}) => {
  const handleShowMore = () => {
    if (numDisplaying + incrementBy < total) {
      setNumDisplaying((prev) => prev + incrementBy);
    } else {
      setNumDisplaying(total);
    }
  };

  const handleShowLess = () => {
    setNumDisplaying(initial);
    if (scrollToId) {
      document.getElementById(scrollToId)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const showMore = numDisplaying < total;

  return (
    <Button
      variant="ghost"
      display="flex"
      flexDirection="column"
      _hover={{ color: "brand.purple.500" }}
      _focus={{}}
      onClick={showMore ? handleShowMore : handleShowLess}
    >
      <Text>{showMore ? "Show more" : "Show less"}</Text>
      {showMore ? <ChevronDownIcon /> : <ChevronUpIcon />}
    </Button>
  );
};

export default DisplayLimiter;
