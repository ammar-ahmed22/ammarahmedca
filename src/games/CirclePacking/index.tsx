import React, { useRef, useState } from "react";
import Canvas from "../Canvas";
import { 
  Button,
  useToken,
  VStack, 
  Text,
  Input,
  SimpleGrid,
  Image,
  HStack,
  Box,
  Icon
} from "@chakra-ui/react";
import { FaUpload, FaPlay, FaStop, FaRedo } from "react-icons/fa"
import { clearCanvas, CanvasRenderer } from "../utils/canvas";
import { Vec2 } from "../utils/vec2";
import { PixelImage } from "./utils/PixelImage";
import { Circle } from "./utils/Circle";
import { randInt } from "../utils/math";
import { useStateRef } from "../utils/hooks";
import dog from "./assets/dog.jpeg";
import mountain from "./assets/mountain-sunset.jpeg";
import { styles } from "./styles";



const CirclePacking: React.FC = () => {
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const [started, setStarted] = useStateRef(false);
  const [ gray800 ] = useToken("colors", ["gray.800"])
  const colorNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const purples = useToken("colors", colorNums.map( n => `brand.purple.${n}00`));
  const blues = useToken("colors", colorNums.map( n => `brand.blue.${n}00`));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const selectedImageRef = useRef<HTMLImageElement>(null);
  
  const [circles, setCircles] = useStateRef<Circle[]>([]);
  const [maxSize, setMaxSize] = useStateRef(5);
  const [pixelImage, setPixelImage] = useStateRef<PixelImage | null>(null);
  const [completion, setCompletion] = useStateRef(0);

  // Adds circle to render list
  const addCircle = (ctx: CanvasRenderingContext2D) => {
    // Random new position
    let newPos = Vec2.RandomInteger({ min: new Vec2(), max: new Vec2(ctx.canvas.width - 1, ctx.canvas.height - 1)});
    
    // Check if new position is valid
    let i = 0
    while (i < circles.ref.current.length) {
      // If new position is the same as any other position or inside another circle
      const curr = circles.ref.current[i];
      if (curr.position.equals(newPos) || curr.isInside(newPos)) {
        // Change the position and start again
        newPos = Vec2.RandomInteger({ min: new Vec2(), max: new Vec2(ctx.canvas.width - 1, ctx.canvas.height - 1)});
        i = 0;
      }
      i++
    }
    // Selecting random color between blue and purple
    
    let color: string;
    if (pixelImage.ref.current) {
      color = pixelImage.ref.current.image[newPos.y][newPos.x].hex;
    } else {
      if (randInt(0, 1) === 0) {
        color = purples[randInt(0, purples.length - 1)]
      } else {
        color = blues[randInt(0, blues.length - 1)]
      }
    }
    
    
    // Add new circle with size 1
    setCircles( prev => [...prev, new Circle(newPos, 1, color)]);
  }

  // Calculate total area of circles
  const totalArea = () => {
    let tot = 0;
    for (let i = 0; i < circles.ref.current.length; i++) {
      const curr = circles.ref.current[i];
      tot += Math.PI * curr.size * curr.size;
    }
    return tot;
  }

  // Increases the  size of circles
  const growCircles = () => {
    // Iterate over every circle
    const currCircles = circles.ref.current;
    for (let i = 0; i < currCircles.length; i++) {
      const curr = currCircles[i];
      if (curr.stopGrowing || curr.size >= maxSize.ref.current) continue; // If this circle has hit another move to next
      // Iterate through all circles again
      for (let j = 0; j < currCircles.length; j++) {
        if (j !== i) {
          const checker = currCircles[j];
          // If the new size of the circe will intersect, stop growing
          if (checker.isInside(curr.position, curr.size + 0.5)) {
            setCircles(prev => {
              const copy = [...prev];
              copy[i].stopGrowing = true;
              return copy;
            })
          }
        }
      }
      if (!circles.ref.current[i].stopGrowing) {
        // Increase the size
        setCircles( prev => {
          const copy = [...prev];
          copy[i].size += 0.5;
          return copy;
        })
      } 
    }
  }

  const renderCircles = (renderer: CanvasRenderer) => {
    for (let i = 0; i < circles.ref.current.length; i++) {
      const { position, size, color } = circles.ref.current[i]
      renderer.circle(position.x, position.y, size, 0, 2 * Math.PI, { fill: color });
    }
  }
  
  const handleDraw = (ctx: CanvasRenderingContext2D, renderer: CanvasRenderer, frame: number) => {
    clearCanvas(ctx);
    renderer.rect(0, 0, ctx.canvas.width, ctx.canvas.height, { fill: gray800 });
    const area = ctx.canvas.width * ctx.canvas.height;
    if (started.ref.current && totalArea() < (area * 0.65)) {
      console.log("running...");
      setCompletion(totalArea() / (area * 0.65));
      addCircle(ctx);
      growCircles();
    }
    renderCircles(renderer);
  };

  const handleReset = () => {
    setCircles([]);
    setStarted(false);
    setCompletion(0);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      console.log(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target.files[0])
      setSelectedImage(imageUrl);
    }
  }

  const handleImageCanvasDraw = (ctx: CanvasRenderingContext2D, renderer: CanvasRenderer, frame: number) => {
    renderer.clear();
    if (selectedImageRef.current) {
      const canvas = ctx.canvas;
      const img = selectedImageRef.current;
      const scaleFactor = Math.max(canvas.width / img.width, canvas.height / img.height);
      const newWidth = img.width * scaleFactor;
      const newHeight = img.height * scaleFactor;

      const x = (canvas.width / 2) - (newWidth / 2);
      const y = (canvas.height / 2) - (newHeight / 2);
      ctx.drawImage(img, x, y, newWidth, newHeight);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setPixelImage(new PixelImage(imageData.data, canvas.width));
    }
  }

  const canStart = () => {
    if (selectedImage && !started) {
      return true;
    }

    return false;
  }

  const width = vh * 0.5;
  const height = vh * 0.5;

  return (
    <>
      <VStack alignItems="flex-start" spacing="3" mt="2" >
        <Box>
          <Text
            fontSize="xl"
            fontWeight="bold"
            fontFamily="heading"
            variant="gradient"
          >How does this work?</Text>
          <Text>Upload an image of your choice or choose one of the images below.</Text>
          <Text>Note: Images with less detail will work better.</Text>
          <Text>Click start to see the magic happen in front of your eyes.</Text>
        </Box>
        <HStack my="5" >
          <Box 
            sx={styles.fileUploadBox}
            onClick={() => {
              if (fileInputRef.current) fileInputRef.current.click();
            }}
          >
            <Input
              {...styles.fileInput}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <Icon as={FaUpload} h="2.5vw" w="2.5vw" pos="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" />
          </Box>
          <Image 
            src={dog}
            {...styles.defaultImage}
            onClick={() => setSelectedImage(dog)}
          />
          <Image 
            src={mountain}
            {...styles.defaultImage}
            onClick={() => setSelectedImage(mountain)}
          />
        </HStack>
        <SimpleGrid columns={2} w="100%" >
          <VStack alignItems="flex-start" >
            <Text>Image:</Text>
            {
              selectedImage && (
                <>
                  <Image 
                    h={height}
                    w={width}
                    objectFit="cover"
                    src={selectedImage}
                    hidden
                    ref={selectedImageRef}
                  />
                  <Canvas 
                    height={height}
                    width={width}
                    onDraw={handleImageCanvasDraw}
                  />
                </>
                
              )
            }
          </VStack>
          <VStack alignItems="flex-start" >
            <Text>Circle Packed Image:</Text>
            <Canvas
              width={width}
              height={height}
              onDraw={handleDraw}
            />
          </VStack>
        </SimpleGrid>
        <VStack w="100%" alignItems="flex-start" >
          <Text>Completion:</Text>
          <Box w="100%" border="1px solid white" h="3vh" pos="relative" >
            <Box pos="absolute" left="0" top="0" h="calc(3vh - 2px)" bg="brand.purple.500" w={`${completion.state * 100}%`} />
          </Box>
        </VStack>
        <HStack justifyContent="center" w="100%" >
          <Button 
            onClick={() => { setStarted(prev => !prev ) }} 
            rightIcon={<Icon as={started.state ? FaStop : FaPlay}/>} 
            variant="gradient"
            disabled={canStart()} 
          >{started ? "Stop" : "Start"}</Button>
          <Button 
            onClick={handleReset} 
            rightIcon={<Icon as={FaRedo} />} 
            variant="gradient" 
          >Reset</Button>
        </HStack>
      </VStack>
      
    </>
  )
};

export default CirclePacking;