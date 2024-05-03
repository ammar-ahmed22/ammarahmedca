import React from "react";
import { IRichText, IAnnotations } from "@ammarahmedca/types"
import { Code } from "@nextui-org/react"
import MathJax from "react-mathjax";

const createRichTextChild = (data: IRichText) => {
  let classes: string[] = [];
  const { bold, italic, underline, strikethrough, color, code } = data.annotations
  if (bold) {
    classes.push("font-bold")
  }

  if (italic) {
    classes.push("italic")
  }

  if (underline && strikethrough) {
    classes.push("[text-decoration:underline_line-through]")
  } else if (underline) {
    classes.push("underline")
  } else if (strikethrough) {
    classes.push("line-through")
  }

  if (data.href) {
    classes.push("text-primary")
    classes.push("hover:underline")
    // classes.push("hover:font-bold")
  }

  // TODO: Handle color
  // if (color && color !== "default") {
  //   classes.push(`text-[${color}]`)
  // }

  if (data.href) {
    return (
      <a
        className={classes.join(" ")}
        href={data.href}
        target="_blank"
        rel="noreferrer"
      >{data.plainText}</a>
    )
  }

  if (code) {
    return (
      <Code>{data.plainText}</Code>
    )
  }
  
  if (data.inlineLatex) {
    return (
      <span>
        <MathJax.Node inline formula={data.plainText} ></MathJax.Node>
      </span>
    )
  }
  return (
    <span
      className={classes.join(" ")}
    >{data.plainText}</span>
  )
}

export const createRichTextChildren = (data: IRichText[]): React.ReactNode[] =>  {
  return data.map((obj) => {
    return createRichTextChild(obj);
  })
}