import React, { useEffect, useState } from "react";
import {
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export type HeadingType = {
  type: string;
  text: string;
  id: string;
};

interface PostNavProps {
  headings: HeadingType[];
  top: number;
}

const PostNav: React.FC<PostNavProps> = ({ top, headings }) => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const scrollPositions = [0].concat(
      headings.map((heading) => {
        const elem = document.getElementById(heading.id);
        const nav = document.querySelector("header");
        if (elem && nav) {
          return elem.offsetTop - nav.offsetHeight;
        }

        return -1;
      })
    );

    const onScrollHandler = () => {
      const pos = window.scrollY;
      for (let i = 0; i < scrollPositions.length - 1; i++) {
        const curr = scrollPositions[i];
        const next = scrollPositions[i + 1];
        if (pos > curr && pos <= next) {
          setActive(i);
        }
      }
    };

    window.addEventListener("scroll", onScrollHandler);

    return () => window.removeEventListener("scroll", onScrollHandler);
  }, [headings]);

  return (
    <Menu>
      <MenuButton
        pos="fixed"
        top={{ base: undefined, md: top + "px" }}
        transform={{ base: undefined, md: "translateX(-150%)" }}
        bottom={{ base: "1rem", md: "auto" }}
        right={{ base: "1rem", md: "auto" }}
        as={IconButton}
        aria-label="headings menu"
        icon={<HamburgerIcon />}
        variant={{ base: "solid", md: "outline" }}
      />
      <MenuList maxH="50vh" overflow="scroll">
        {headings.map((heading, idx) => {
          const headingIdx = parseInt(heading.type.split("_")[1]) - 1;
          const fontSizes = ["lg", "md", "sm"];
          const margins = [0, 1, 3];
          return (
            <MenuItem
              key={heading.id}
              onClick={() => {
                const elem = document.getElementById(heading.id);
                const nav = document.querySelector("header");
                if (elem && nav) {
                  const scrollToY = elem.offsetTop;
                  const sub = nav.offsetHeight;
                  window.scrollTo({
                    behavior: "smooth",
                    top: scrollToY - sub,
                  });
                }
              }}
            >
              <Text
                fontSize={fontSizes[headingIdx]}
                ml={margins[headingIdx]}
                variant={idx === active ? "gradient" : undefined}
                fontWeight="bold"
              >
                {heading.text}
              </Text>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default PostNav;
