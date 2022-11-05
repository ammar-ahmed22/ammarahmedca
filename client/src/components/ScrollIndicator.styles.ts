import { BoxProps } from "@chakra-ui/react";


 const ellipse : BoxProps = {
  height: "25px",
  width: "15px",
  bg: "transparent",
  border: "2px solid",
  borderColor: "brand.purple.500",
  borderRadius: "full",
  position: "relative",
  _hover: {
      cursor: "pointer",
      
  }
}

 const circle : BoxProps = {
  position: "absolute", 
  top: "1px", 
  left: "50%", 
  transform: "translate(-50%, 0)", 
  bg: "brand.purple.500",
  height: "5px", 
  width: "5px", 
  borderRadius: "full"
}


export const styles = {
  circle,
  ellipse
}