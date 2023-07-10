import { BoxProps, IconProps, ImageProps, InputProps } from "@chakra-ui/react";


const fileUploadBox: BoxProps = {
  h: "10vw", 
  w: "10vw",
  borderWidth: "1px",
  borderStyle: "dashed", 
  borderColor: "white",
  pos: "relative"
}

export const fileInput: InputProps = {
  type: "file",
  accept: "image/*",
  p: "0",
  h: "auto",
  hidden: true
}

export const fileUploadIcon: IconProps = {
  h:"2.5vw", 
  w:"2.5vw",
  pos: "absolute", 
  top: "50%", 
  left: "50%", 
  transform: "translate(-50%, -50%)"
}

export const defaultImage: ImageProps = {
  w: "10vw",
  h: "10vw",
  objectFit: "cover",
  opacity: 0.5,
  _hover: {
    opacity: 1,
    cursor: "pointer"
  }
}

export const styles = {
  fileUploadBox,
  fileInput,
  fileUploadIcon,
  defaultImage
}