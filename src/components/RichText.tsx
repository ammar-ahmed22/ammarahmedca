import React from "react";
import { IRichText, IAnnotations } from "@ammarahmedca/types";
import {
  TextProps,
  Text,
  Link,
  LinkProps,
  useColorModeValue,
} from "@chakra-ui/react";
import MathJax from "react-mathjax";

type RichTextProps = TextProps & {
  data: IRichText[];
};

const RichText: React.FC<RichTextProps> = ({ data, ...rest }) => {
  const defaultCodeColor = useColorModeValue("brand.purple.700", "gray.200");
  const defaultColor = useColorModeValue("gray.800", "white");
  const codeBg = useColorModeValue("gray.200", "brand.purple.700");

  function createProps<T extends TextProps | LinkProps>(
    annots: IAnnotations
  ): T {
    let result: TextProps | LinkProps = {};
    let textDecoration = "";
    const inlineCode = {
      bg: codeBg,
      px: 1,
      py: 0.5,
      borderRadius: "md",
    };

    if (annots.bold) result.fontWeight = "bold";
    if (annots.strikethrough) textDecoration = "line-through";
    if (annots.underline) textDecoration += " underline";
    if (annots.italic) result.fontStyle = "italic";
    if (annots.color !== "default") result.color = annots.color;
    if (annots.color === "default") result.color = defaultColor;

    result.textDecoration = textDecoration;

    if (annots.code) {
      Object.assign(result, inlineCode);
      result.color =
        annots.color === "default" ? defaultCodeColor : annots.color;
    }
    result.whiteSpace = "pre-line";
    return result as T;
  }

  return (
    <Text {...rest}>
      <MathJax.Provider>
      {data.map((richText, idx) => {
        const { annotations, plainText, href, inlineLatex } = richText;
        const { code } = annotations;
        const key: string = `rich-text-${idx}`;
        if (href) {
          return (
            <Link
              href={href}
              isExternal
              key={key}
              {...createProps<LinkProps>(annotations)}
            >
              {plainText}
            </Link>
          );
        } else if (inlineLatex) {
          return (
              <Text
                key={key}
                as="span" 
                {...createProps<TextProps>(annotations)}
              >
                <MathJax.Node inline formula={plainText} />
              </Text>
          )
        } else {
          return (
            <Text
              as={code ? "kbd" : "span"}
              key={key}
              {...createProps<TextProps>(annotations)}
            >
              {plainText}
            </Text>
          );
        }
      })}
      </MathJax.Provider>
    </Text>
  );
};

export default RichText;
