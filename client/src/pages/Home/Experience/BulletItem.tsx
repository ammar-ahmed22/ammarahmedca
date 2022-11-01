import React from 'react';
import { Flex, Text, Box, useColorModeValue } from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { styles } from './styles/BulletItem.styles';

interface BulletItemProps{
    children: React.ReactNode,
    listLength: number,
    idx: number
}

const BulletItem : React.FC<BulletItemProps> = ({ children,  listLength, idx }) => {

    const lineBg = useColorModeValue("gray.800", "white")

    return (
        <Flex key={idx} position="relative" pb={5} >
            {
                idx !== listLength - 1 && <Box {...styles.line} bg={lineBg} />
            }
            <Text {...styles.bullet} >
                <FontAwesomeIcon icon={faCircle as IconProp} />
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
