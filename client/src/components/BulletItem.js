import React from 'react';
import { Flex, Text, Box, useColorModeValue } from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BulletItem = ({ children,  listLength, idx }) => {

    const styleProps = {
        line: {
            position: "absolute",
            w: 1,
            h: "100%",
            bg: useColorModeValue("gray.800", "white"),
            top: "1rem",
            left: 3,
            zIndex: -1,
            transform: "translate(-6px, 0)"
        },
        bullet: {
            color: useColorModeValue("primaryLight", "primaryDark")
        },
        title: {
            fontSize: "2xl",
            ml: 3,
            fontWeight: "bold",
        },
    }

    return (
        <Flex key={idx} position="relative" pb={5} >
            {
                idx !== listLength - 1 && <Box {...styleProps.line} />
            }
            <Text {...styleProps.bullet} >
                <FontAwesomeIcon icon="circle"/>
            </Text>
            <Box ml={3} minW={0}>
                {
                    children
                }
                
            </Box>
        </Flex>
    );
}

export default BulletItem;
