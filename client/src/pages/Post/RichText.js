import React from 'react';
import { Text, useColorModeValue } from "@chakra-ui/react"

const RichText = ({ idx, bold, italic, code, color, strikethrough, underline, children }) => {

    //const { bold, italic, code, color, strikethrough, underline } = annotations;

    let richTextStyles = {
        fontWeight: "normal",
        as: "span"
    }

    const inlineCode = {
        as: "kbd",
        // bg: useColorModeValue("gray.200", "gray.900"),
        bg: useColorModeValue("gray.200", "brand.purple.700"),
        color: useColorModeValue("brand.purple.700", "gray.200"),
        px: 1,
        py: 0.5,
        borderRadius: "md"
    }

    if (bold){
        richTextStyles.fontWeight = "bold"
    }

    if (underline){
        if (richTextStyles.decoration){
            richTextStyles.decoration += " underline"
        }else{
            richTextStyles.decoration = "underline"
        }
    }

    if (strikethrough){
        if (richTextStyles.decoration){
            richTextStyles.decoration += " line-through"
        }else{
            richTextStyles.decoration = "line-through"
        }
    }

    if (italic){
        richTextStyles.fontStyle = 'italic'
    }
    
    if (code){
        richTextStyles = inlineCode
    }

    return (
        <Text key={idx} {...richTextStyles} wordBreak="keep-all">{children}</Text>
    );
}

export default RichText;
