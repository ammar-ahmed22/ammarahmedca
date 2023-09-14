import React, { useEffect, useState } from "react";
import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";
import { Cell } from "./utils/Cell";

type GridCellProps = {
  cell: Cell
}

const GridCell: React.FC<GridCellProps> = ({ cell }) => {

  const [styleProps, setStyleProps] = useState<BoxProps>({});
  const emptyBg = useColorModeValue("white", "gray.800");
  const snakeBg = "brand.purple.500";
  const foodBg = "red.500";

  useEffect(() => {
    if (cell.type === "empty") {
      setStyleProps({
        bg: emptyBg,
      })
    } else if (cell.type === "snake") {
      // console.log("snake type");
      setStyleProps({
        bg: snakeBg
      })
    } else {
      setStyleProps({
        bg: foodBg
      })
    }
  }, [cell.type, setStyleProps, emptyBg])

  return (
    <Box 
      w={cell.cellSize + "px"}
      h={cell.cellSize + "px"}
      borderWidth="1px"
      borderStyle="solid"
      borderColor="white"
      p={0}
      margin={0}
      {...styleProps}
    />
  )
}

export default GridCell;