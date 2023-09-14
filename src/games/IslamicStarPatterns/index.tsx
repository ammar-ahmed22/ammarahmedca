import React from "react";
import Canvas from "../Canvas";
import { Vec2 } from "../utils/vec2";
import { Polygon } from "../utils/polygon";
import { CanvasRenderer } from "../utils/canvas";
import { viewport } from "../utils/math";
import { HankinPolygon } from "./utils/HankinPolygon";
import { useStateRef } from "../utils/hooks";
import { 
  Slider, 
  SliderTrack, 
  SliderFilledTrack, 
  SliderThumb, 
  SliderMark,
  VStack,
  Box,
  Text,
  RadioGroup,
  Radio,
  HStack,
  useToken 
} from "@chakra-ui/react";
import { radians } from "../utils/math";
import MathJax from "react-mathjax";
import ColorPicker from "@website/components/ColorPicker";

const IslamicStarPattern: React.FC = () => {

  type BaseShape = "square" | "hexagon" | "triangle";
  const { vh } = viewport();
  const height = vh * 0.8;
  const width = height;

  const SQ_SIZE = height / 3;
  const [purple500, blue500, gray100] = useToken("colors", ["brand.purple.500", "brand.blue.500", "gray.100"])

  const [angle, setAngle] = useStateRef(60);
  const [baseShape, setBaseShape] = useStateRef<BaseShape>("square");
  const [useSquares, setUseSquares] = useStateRef(false);

  
  const hex_size = new Vec2(Math.round(width / 6), Math.round(width / 6) * Math.sin(60 * (Math.PI / 180)));

  const backgroundColors = ["#E1E2EF", "#BFACAA", "#D2D0BA", gray100];
  const shapeColors = ["#05204A", "#6BAA75", "#5E747F", purple500, blue500];

  const [shapeColor, setShapeColor] = useStateRef(shapeColors[0]);
  const [background, setBackground] = useStateRef(backgroundColors[0]);

  const generatePackedHexagons = (radius: number, rows: number, cols: number) => {
    const size = new Vec2(radius, radius * Math.sin(radians(60)));
    const offset = (size.x * Math.cos(radians(60))) / 2;
    const polys: Polygon[] = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const xPos = size.x * (j + 1) + (size.x * Math.cos(radians(60)) * j) - offset;
        if (j % 2 !== 0) {
          if (i === 0) {
            for (let k = 0; k < 2; k++) {
              const hex = Polygon.fromHexagon(xPos, size.y * (k * 2), size.x)
              polys.push(hex);
            }
          } else {
            const hex = Polygon.fromHexagon(xPos, size.y * (2 * i + 2), size.x);
            polys.push(hex);
          }
        } else {
          const hex = Polygon.fromHexagon(xPos, size.y * (2 * i + 1), size.x);
          polys.push(hex);
        }
      }
    }

    return polys;
  }

  const generatePackedSquares = (size: number, rows: number, cols: number) => {
    const polys: Polygon[] = []
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const poly = Polygon.fromRectangle(j * size, i * size, size, size);
        polys.push(poly);
      }
    }
    return polys;
  }

  const generatePackedTriangles = (radius: number, rows: number, cols: number) => {
    const polys: Polygon[] = [];
    const size = new Vec2(2 * radius * Math.sin(radians(60)), (3 * radius) / 2);
    const offset = (size.x / 2);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const one = Polygon.fromTriangle((size.x / 2) * (2 * j + 1) - (i % 2 === 0 ? offset : offset * 2), radius + (size.y * i), radius, { invert: true });
        const two = Polygon.fromTriangle((size.x) * (j + 1) - (i % 2 === 0 ? offset : offset * 2), (radius / 2) + (size.y * i), radius);
        polys.push(one);
        polys.push(two);
      }
    }
    
    return polys;
  }

  const generatePackedPentagons = (radius: number, rows: number, cols: number) => {
    const polys: Polygon[] = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const poly = Polygon.fromNSided(5, radius * Math.sin(radians(72)) * (2 * j + 1), radius, radius, { invert: true });
        // poly.rotate(radians(72 * j));
        polys.push(poly);
      }
    }

    return polys;
  }

  const createHankinPolygons = (poly: Polygon, angle: number) => {
    const hp = HankinPolygon.fromPolygon(poly);
    // hp.addDelta(Math.round(width / 6) / 2);
    hp.rotateHankins(angle, { degrees: true });
    hp.findHankinIntersections();
    return hp;
    // const newPoly = hp.createPolygonFromHankins();
    // return newPoly as Polygon;
  }

  const handleDraw = (ctx: CanvasRenderingContext2D, renderer: CanvasRenderer, frame: number) => {
    
    renderer.clear();
    renderer.rect(0, 0, ctx.canvas.width, ctx.canvas.height, { fill: background.ref.current });
    let polys: HankinPolygon[] = [];
    if (baseShape.ref.current === "hexagon") {
      polys = generatePackedHexagons(Math.round(width / 6), 4, 4).map( poly => createHankinPolygons(poly, -angle.ref.current));
    }
    
    if (baseShape.ref.current === "square") {
      polys = generatePackedSquares(width / 3, 3, 3).map( poly => createHankinPolygons(poly, angle.ref.current));
    }

    

    if (baseShape.ref.current === "triangle") {
      const radius = Math.round(width / (2 * 3 * Math.sin(radians(60))));
      polys = generatePackedTriangles(radius, 4, 4).map( poly => createHankinPolygons(poly, -angle.ref.current));
    }
    // generatePackedTriangles(radius, 4, 4).forEach( poly => {
    //   renderer.polygon(poly, { fill: shapeColor.ref.current });
    // })

    generatePackedPentagons(100, 1, 2).forEach( poly => renderer.polygon(poly, { stroke: shapeColor.ref.current }));

    // for (let i = 0; i < polys.length; i++) {
    //   const fullPoly = polys[i].createPolygonFromHankins();
    //   if (fullPoly) {
    //     renderer.polygon(fullPoly, { fill: shapeColor.ref.current });
    //   }
    // }
  }

  return (
    <VStack mt="2" >
      <Canvas 
        height={height}
        width={width}
        onDraw={handleDraw}
      />
      <Box>
        <MathJax.Provider>
          <Text mb="6" fontWeight="bold" >
            Choose Angle (<MathJax.Node inline formula="\theta"></MathJax.Node>):
          </Text>
          <Slider defaultValue={60} onChange={(val) => setAngle(val)} min={1} max={89} w={width + "px"} >
            <SliderMark 
              value={angle.state}
              mt="-10"
              ml="-5"
              bg="blue.500"
              w="12"
              textAlign="center"
              borderRadius="full"
            >
              {angle.state} <MathJax.Node inline formula="^{\circ}"/>
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </MathJax.Provider>
      </Box>
      <Box>
        <Text mb="2" fontWeight="bold">Choose Base Polygon:</Text>
        <RadioGroup onChange={(val) => setBaseShape(val as BaseShape)} value={baseShape.state}>
          <HStack w={width + "px"}>
            <Radio value="square" >Square</Radio>
            <Radio value="hexagon" >Hexagon</Radio>
            <Radio value="triangle" >Triangle</Radio>
          </HStack>
        </RadioGroup>
      </Box>
      <Box>
        <HStack w={width + "px"}>
          <HStack>
            <Text>Background Color:</Text>
            <ColorPicker colors={backgroundColors} headerHeight="50px" onColorChange={(color) => setBackground(color)} />
          </HStack>
          <HStack>
            <Text>Shape Color:</Text>
            <ColorPicker colors={shapeColors} headerHeight="50px" onColorChange={(color) => setShapeColor(color)}/>
          </HStack>
        </HStack>
      </Box>
    </VStack>
  )
} 


export default IslamicStarPattern;