import React from "react";
import { Text, useColorModeValue, Link,} from "@chakra-ui/react";

type RichTextProps = IAnnotations & {
  idx: number;
  href?: string;
  children: React.ReactNode;
};

const RichText: React.FC<RichTextProps> = ({
  idx,
  bold,
  italic,
  code,
  color,
  strikethrough,
  underline,
  children,
  href
}) => {
  

  const defaultCodeColor = useColorModeValue("brand.purple.700", "gray.200")
  const defaultColor = useColorModeValue("gray.800", "white");
  const codeBg = useColorModeValue("gray.200", "brand.purple.700")

  const inlineCode = code ? {
    bg: codeBg,
    px: 1,
    py: 0.5,
    borderRadius: "md",
  } : {};

  const createKey = (idx: number) => `rich-txt-${idx}`;

  if (href){
    return (
      <Link 
        key={createKey(idx)} 
        fontWeight={bold ? "bold" : "normal"} 
        fontStyle={italic ? "italic" : "normal"}
        textDecoration={`${underline ? "underline" : ""} ${strikethrough ? "line-through" : ""}`}
        color={color === "default" ? "brand.purple.500" : color}
        wordBreak="keep-all" 
        href={href} 
        isExternal 
      > 
        {children}
      </Link>
    )
  }
  
  return (
    <Text 
      key={createKey(idx)} 
      fontWeight={bold ? "bold" : "normal"} 
      fontStyle={italic ? "italic" : "normal"}
      textDecoration={`${underline ? "underline" : ""} ${strikethrough ? "line-through" : ""}`}
      wordBreak="keep-all"
      color={code ? color === "default" ? defaultCodeColor : color : color === "default" ? defaultColor : color}
      as={code ? "kbd" : "span"}
      {...inlineCode}
    >
      {children}
    </Text>
  );
};

export default RichText;
