import React, { useState } from "react"
import { 
  Text,
  Box,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  TagCloseButton,
  SimpleGrid
} from "@chakra-ui/react"
import { styles } from "./Arcade.styles"
import Card from "@website/components/Card"
import { games, allTags, Games } from "@website/games"

const Arcade: React.FC = () => {
  const [filterTags, setFilterTags] = useState<Set<string>>(new Set<string>());

  const addFilterTag = (tag: string) => {
    setFilterTags((prev) => new Set(prev.add(tag)));
  }

  const removeFilterTag = (tag: string) => {
    setFilterTags(
      (prev) => new Set([...prev.values()].filter((x) => x !== tag))
    );
  }

  return (
    <>
      <Text sx={styles.title} variant="gradient">Arcade</Text>
      <Text sx={styles.info} >I like to dabble in some simple game development, so, here you can try out some of the games/simulations I've created.</Text>
      <Box my="2">
        <Text
          fontSize="xl"
          mb="2"
          variant="gradient"
          fontWeight="bold"
          fontFamily="heading"
        >
          Tags
        </Text>
        <Wrap>
          {
            allTags.map( (tag, i) => {
              return (
                <WrapItem key={(tag + i).toString()}>
                  <Tag
                    variant="subtle"
                    colorScheme="brand.purple"
                    transform="scale(0.95)"
                    _hover={{
                      cursor: "pointer",
                      transform: "scale(1)",
                    }}
                    onClick={() => addFilterTag(tag)}
                  >
                    {tag}
                  </Tag>
                </WrapItem>
              )
            })
          }
        </Wrap>
      </Box>
      {
        !!filterTags.size && (
          <Wrap my="3" >
            <WrapItem>
              <Text>Filtered by: </Text>
            </WrapItem>
            {
              [...filterTags.values()].map( tag => {
                return (
                  <WrapItem key={tag} >
                    <Tag
                      variant="subtle"
                      colorScheme="brand.purple"
                      size="sm"
                    >
                      <TagLabel>{tag}</TagLabel>
                      <TagCloseButton 
                        onClick={() => removeFilterTag(tag)}
                      />
                    </Tag>
                  </WrapItem>
                )
              })
            }
          </Wrap>
        )
      }
      <SimpleGrid columns={1} spacing="5" >
          {
            Object.keys(games)
            .filter( game => {
              const metadata = games[game as Games];
              if (!metadata.tags) return true;
              const filters = [...filterTags.values()];
              if (filters.length === 0) return true;
              for (let i = 0; i < filters.length; i++) {
                if (metadata.tags.includes(filters[i])) return true;
              }
              return false;
            })  
            .map( game => {
              const metadata = games[game as Games];
              return (
                <Card
                  isLink
                  to={`/arcade/${game}`}
                  key={game}
                >
                  <Box p="4">
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      fontFamily="heading"
                    >{metadata.title}</Text>
                    <Text>{metadata.description}</Text>
                    <Wrap my="2" >
                      {
                        metadata.tags?.map( tag => {
                          return (
                            <WrapItem key={tag} >
                              <Tag
                                variant="subtle"
                                colorScheme="brand.purple"
                              >{tag}</Tag>
                            </WrapItem>
                          )
                        })
                      }
                    </Wrap>
                  </Box>
                </Card>
              )
            })
          }
      </SimpleGrid>
    </>
  )
}

export default Arcade;