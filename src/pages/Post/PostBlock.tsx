import React from "react";
import {
  Text,
  UnorderedList,
  OrderedList,
  ListItem,
  Box,
  Flex,
  Image,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import { styles } from "./styles/PostBlock.styles";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atelierCaveDark,
  atelierCaveLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import RichText from "./RichText";
import { TextOrImageIsText } from "../../graphql/typeGuards";

interface PostBlockProps {
  type: string;
  content: TextOrImageType[];
  idx: number;
}
// Renders blog blocks from API
const PostBlock: React.FC<PostBlockProps> = ({ type, content, idx }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const codeBlockStyle = useColorModeValue(atelierCaveLight, atelierCaveDark);
  const codeBlockBg = useColorModeValue("gray.200", "gray.900");

  const createKey = (idx: number) => `$post-block-${idx}`;

  if (
    (type === "heading_1" || type === "heading_2" || type === "heading_3") &&
    TextOrImageIsText(content[0])
  ) {
    return (
      <Text key={createKey(idx)} {...styles[type]}>
        {content[0].plainText}
      </Text>
    );
  } else if (type === "paragraph") {
    return (
      <Text key={createKey(idx)} {...styles.p}>
        {content.map((text, textIdx) => {
          if (TextOrImageIsText(text)) {
            return (
              <RichText idx={textIdx} key={textIdx} {...text.annotations}>
                {text.plainText}
              </RichText>
            );
          }
          return (
            <Text as="span" color="red">
              ERROR: text at PostBlock:{idx}
            </Text>
          );
        })}
      </Text>
    );
  } else if (type === "numbered_list") {
    return (
      <OrderedList key={createKey(idx)} {...styles.list}>
        {content.map((li, liIdx) => {
          if (TextOrImageIsText(li)) {
            return <ListItem key={liIdx}>{li.plainText}</ListItem>;
          }
          return (
            <ListItem color="red">ERROR: text at PostBlock:{idx}</ListItem>
          );
        })}
      </OrderedList>
    );
  } else if (type === "bulleted_list") {
    return (
      <UnorderedList key={createKey(idx)} {...styles.list}>
        {content.map((li, liIdx) => {
          if (TextOrImageIsText(li)) {
            return <ListItem key={liIdx}>{li.plainText}</ListItem>;
          }
          return (
            <ListItem color="red">ERROR: text at PostBlock:{idx}</ListItem>
          );
        })}
      </UnorderedList>
    );
  } else if (type === "code" && TextOrImageIsText(content[0])) {
    return (
      <Box key={createKey(idx)} {...styles.codeBlock} bg={codeBlockBg}>
        <SyntaxHighlighter
          language={content[0].annotations.language}
          style={codeBlockStyle}
          customStyle={{ background: "transparent" }}
          showLineNumbers
        >
          {content[0].plainText}
        </SyntaxHighlighter>
      </Box>
    );
  } else if (type === "image" && !TextOrImageIsText(content[0])) {
    return (
      <Flex key={createKey(idx)} {...styles.imageBox}>
        <Image {...styles.image} src={content[0].url} onClick={onOpen} />
        <Text {...styles.imageCaption}>{content[0].caption}</Text>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          autoFocus={false}
          returnFocusOnClose={false}
          trapFocus={false}
          scrollBehavior="outside"
        >
          <ModalOverlay backdropFilter="blur(10px)" />
          <ModalContent
            maxW="75vw"
            bg="transparent"
            backdropFilter="blur(10px)"
            boxShadow="none"
          >
            <Image {...styles.image} src={content[0].url} />
            <Text {...styles.imageCaption}>{content[0].caption}</Text>
          </ModalContent>
        </Modal>
      </Flex>
    );
  } else {
    return <Text>ERROR: could not render block type: {type}</Text>;
  }
};

export default PostBlock;
