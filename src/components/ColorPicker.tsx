import React, { useState } from "react";
import { 
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  SimpleGrid,
  Input,
  LayoutProps,
  BorderProps, 
  Center
} from "@chakra-ui/react";

export type ColorPickerProps = {
  colors: string[],
  defaultColor?: string,
  onColorChange?: (color: string) => void,
  height?: LayoutProps["height"],
  width?: LayoutProps["width"],
  borderRadius?: BorderProps["borderRadius"],
  contentWidth?: LayoutProps["width"],
  headerHeight?: LayoutProps["height"],
  textColor?: string 
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  defaultColor,
  onColorChange,
  height,
  width,
  borderRadius,
  contentWidth,
  headerHeight,
  textColor = "white"
}) => {

  const [color, setColor] = useState(defaultColor ?? colors[0]);

  const handleChange = (color: string) => {
    setColor(color);
    if (onColorChange) onColorChange(color);
  }

  return (
    <Popover variant="picker">
      <PopoverTrigger>
        <Button 
          aria-label={color}
          background={color}
          height={height ?? "22px"}
          width={width ?? "22px"}
          padding={0}
          minWidth="unset"
          borderRadius={borderRadius ?? 3}
          _hover={{ bg: color }}
        />
      </PopoverTrigger>
      <PopoverContent width={contentWidth ?? "170px"}>
        <PopoverArrow bg={color} />
        <PopoverCloseButton color={textColor} />
        <PopoverHeader
          height={headerHeight ?? "100px"}
          backgroundColor={color}
          borderTopLeftRadius={borderRadius ?? 3}
          borderTopRightRadius={borderRadius ?? 3}
        >
          <Center h="100%">
            {color}
          </Center>
        </PopoverHeader>
        <PopoverBody>
          <SimpleGrid columns={5} spacing={2} >
            {
              colors.map(c => {
                return (
                  <Button 
                    key={c}
                    aria-label={c}
                    background={c}
                    height={height ?? "22px"}
                    width={width ?? "22px"}
                    padding={0}
                    minWidth={"unset"}
                    borderRadius={borderRadius ?? 3}
                    _hover={{ background: c }}
                    onClick={() => handleChange(c)}
                  />
                )
              })
            }
          </SimpleGrid>
          <Input 
            borderRadius={borderRadius ?? 3}
            mt={3}
            placeholder="red.100"
            size="sm"
            value={color}
            onChange={(e) => handleChange(e.target.value)}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  ) 
};

export default ColorPicker;