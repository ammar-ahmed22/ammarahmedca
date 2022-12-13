import React, { useEffect } from "react";
import { Container } from "@chakra-ui/react";

interface PageContentProps {
  children: React.ReactNode;
}

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Container
      minH="100vh"
      maxW={{ base: "100vw", md: "container.sm", lg: "container.md" }}
      marginTop="15vh"
      p={4}
      pos="relative"
    >
      {children}
    </Container>
  );
};

export default PageContent;
