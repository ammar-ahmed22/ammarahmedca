import React from 'react';
import { 
    Text, 
    UnorderedList, 
    OrderedList, 
    ListItem, 
    Box, 
    Flex, 
    Image, 
    Spinner, 
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    useDisclosure 
} from "@chakra-ui/react"
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveDark, atelierCaveLight } from "react-syntax-highlighter/dist/esm/styles/hljs"
import RichText from './RichText';

// Renders blog blocks from API
const BlogBlock = ({ type, content, idx }) => {

    const { isOpen, onClose, onOpen } = useDisclosure();

    const styleProps = {
        heading_1: {
            fontSize: '4xl',
            fontFamily: "heading",
            fontWeight: "bold",
            as: "h2",
            mb: 2
        },
        heading_2: {
            fontSize: "3xl",
            fontFamily: "heading",
            fontWeight: "bold",
            as: "h3" ,
            mb: 2
        },
        heading_3: {
            fontSize: "2xl",
            fontFamily: "heading",
            fontWeight: "bold",
            as: "h4",
            mb: 2
        },
        p: {
            fontSize: { base: "md", md: "lg" },
            mb: 4,
            as: "p"
        },
        list: {
            fontSize: "lg",
            mb: 4,
            pl: 2
        },
        imageBox:{
            align: "center",
            justify: "center",
            direction: "column",
            my: 5,
        },
        image: {
            objectFit: "cover",
            borderRadius: "md",
            boxShadow: "lg",
            mb: 2,
            _hover: {
                cursor: "pointer"
            },
            fallback: <Spinner thickness='4px' speed="0.65s" emptyColor='gray.200' color={useColorModeValue("primaryLight", "primaryDark")} size="xl" />
        },
        imageCaption:{
            fontSize: "sm",
            color: "gray.500",
            textAlign: "center"
        },
        codeBlock: {
            bg: useColorModeValue("gray.200", "gray.900"),
            p: 1,
            mb: 2,
            borderRadius: "md",
        }

    }

    const codeBlockStyle = useColorModeValue(atelierCaveLight, atelierCaveDark)

    if (type === "heading_1" || type === "heading_2" || type === "heading_3"){
        return <Text key={idx} {...styleProps[type]}>{content[0].plain_text}</Text>
    }else if (type === "paragraph"){
        return (
            <Text key={idx} {...styleProps.p}>
                {
                    content.map( (text, textIdx) => (<RichText idx={textIdx} key={textIdx} {...text.annotations} >{text.plain_text}</RichText>))
                }
            </Text>
        )
    }else if (type === "ordered_list"){
        return (
            <OrderedList key={idx} {...styleProps.list}>
                {
                    content.map( (li, liIdx) => {
                        return <ListItem key={liIdx} >{li.plain_text}</ListItem>
                    })
                }
            </OrderedList>
        )
    }else if (type === "unordered_list"){
        return (
            <UnorderedList key={idx} {...styleProps.list}>
                {
                    content.map( (li, liIdx) => {
                        return <ListItem key={liIdx} >{li.plain_text}</ListItem>
                    })
                }
            </UnorderedList>
        )
    }else if (type === "code"){
        return (
            <Box key={idx} {...styleProps.codeBlock}>
                <SyntaxHighlighter language={content[0].annotations.language} style={codeBlockStyle} customStyle={{background: "transparent"}} showLineNumbers >
                    {
                        content[0].plain_text
                    }
                </SyntaxHighlighter>
            </Box>
        )
    }else if (type === "image"){
        return (
            <Flex key={idx} {...styleProps.imageBox}>
                <Image
                    {...styleProps.image}
                    src={content[0].url}
                    onClick={onOpen}
                />
                <Text {...styleProps.imageCaption}>{content[0].caption}</Text>
                <Modal isOpen={isOpen} onClose={onClose} isCentered  >
                    <ModalOverlay backdropFilter="blur(10px)" />
                    <ModalContent maxW="75vw" bg="transparent" backdropFilter="blur(10px)" boxShadow="none" >
                        <Image
                            {...styleProps.image}
                            src={content[0].url}
                        />
                        <Text {...styleProps.imageCaption}>{content[0].caption}</Text>
                    </ModalContent>
                </Modal>
            </Flex>
        )
    }else{
        return <Text>ERROR: could not render block type: {type}</Text>
    }
    
}

export default BlogBlock;
