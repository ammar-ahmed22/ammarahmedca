import React from "react"
import { 
  Text
} from "@chakra-ui/react"
import { styles } from "./Arcade.styles"

const Arcade: React.FC = () => {

  return (
    <>
      <Text sx={styles.title} variant="gradient">Arcade</Text>
      <Text sx={styles.info} >I like to dabble in some simple game development, so, here you can try out some of the games/simulations I've created.</Text>
    </>
  )
}

export default Arcade;