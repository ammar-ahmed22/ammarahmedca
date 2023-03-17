import { useState, useEffect } from "react";
import { IBlock, IRichText, isImageContent, isListContent, isEquationContent, isRichTextContent } from "@ammarahmedca/types"
import { usePostBlockStyles } from "./styles/PostBlock.styles";
import RichText from "@website/components/RichText";
import ImageModal from "@website/components/ImageModal";
import RecursiveListItem from "@website/components/RecursiveListItem";
import { TextProps, Text, UnorderedList, OrderedList, ListProps, Box } from "@chakra-ui/react";
import MathJax from "react-mathjax";
import SyntaxHighlighter from "react-syntax-highlighter";


export const useRenderedBlocks = (blocks?: IBlock[]) : JSX.Element[] => {
  const [rendered, setRendered] = useState<JSX.Element[]>([]);
  const [styles] = usePostBlockStyles()
  useEffect(() => {
    if (blocks){
      setRendered(
        blocks.map( (block, idx) => {
          const key = `post-block-${idx}`;
          const { type, content } = block;
          const [blockContent] = content;
          const componentProps = styles[type];
          switch (type) {
            case "heading_1":
            case "heading_2":
            case "heading_3":
            case "paragraph":
            case "quote":
              return <RichText key={key} data={content as IRichText[]} {...componentProps as TextProps} />
            case "image":
              if (isImageContent(blockContent)){
                return (
                  <ImageModal
                    key={key} 
                    imageProps={{
                      ...styles.image,
                      src: blockContent.url
                    }}
                    captionProps={styles.imageCaption}
                    captionData={blockContent.caption}
                  />
                )
              }
              break
            case "bulleted_list":
              if (isListContent(blockContent)){
                return (
                  <UnorderedList {...componentProps as ListProps }>
                    {
                      blockContent.children.map( child => {
                        return <RecursiveListItem data={child} listType={type} />
                      })
                    }
                  </UnorderedList>
                )
              }
              break;
            case "numbered_list":
              if (isListContent(blockContent)){
                return (
                  <OrderedList {...componentProps as ListProps }>
                    {
                      blockContent.children.map( child => {
                        return <RecursiveListItem data={child} listType={type} />
                      })
                    }
                  </OrderedList>
                )
              }
              break;
            case "equation":
              if (isEquationContent(blockContent)){
                return (
                  <MathJax.Provider>
                    <Box>
                      <MathJax.Node formula={blockContent.expression}></MathJax.Node>
                    </Box>
                  </MathJax.Provider>
                )
              }
              break;
            case "code":
              if (isRichTextContent(blockContent)){
                const { language } = blockContent.annotations;
                return (
                  <Box {...styles.code.box} >
                    <SyntaxHighlighter
                      language={language}
                      {...styles.code.highlighter}
                    >
                      {
                        content.map((r => {
                          if (isRichTextContent(r)) return r.plainText;
                          return ""
                        })).join("")
                      }
                    </SyntaxHighlighter>
                  </Box>
                )
              }
              break;
            default:
              return (
                <Text key={key} color="red">NOT IMPLEMENTED: {type}</Text>
              )
      
          }
          return <Text color="red">Error</Text>
        })
      )
    }
  }, [blocks, styles])

  
  
  return rendered
}