'use client'
import React, { useEffect, useState } from 'react'
import './FavouritePage.scss'
import { Card, Box, CardBody, CardFooter, Flex, Image, Stack, Heading, Text, Button, Spinner } from '@chakra-ui/react'

function FavouritePage() {
  const [favItems, setFavItems] = useState([]);
  const getFavCarecter = () => {
    let myStore = JSON.parse(localStorage.getItem('favourite_items'));
    setFavItems(myStore);
  }
  useEffect(() => {
    getFavCarecter();
  }, []);

  const removeFavourite = (item) => {
    let newFav = favItems.filter((favItems) => favItems.name != item.name);
    localStorage.setItem('favourite_items', JSON.stringify(newFav));
    getFavCarecter();
  }

  return (
    <Box
      p={8}
      // bgImage='url("https://i.gifer.com/DVx4.gif")'
      bgSize="cover"
      bgPosition="center"
      minH="100vh"
      color="white"
      position="relative"
      align="center"
      justify="center"
    >
      {favItems.length > 0 ?
        favItems.map((item, index) => (
          <Card
            key={item.name}
            direction={{ base: 'column', md: 'row' }}
            overflow='hidden'
            variant='outline'
            bg={'rgba(128, 128, 128, 0.2)'}
            mt={4}
            mb={4}
            w={{ base: '100%', sm: '95%', md: '90%', xl: '70%' }}
            h={{ base: "100%", md: "400px" }}
            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          >
            <Image
              objectFit='cover'
              w={{ base: '100%', md: '50%' }}
              src={`https://starwars-visualguide.com/assets/img/characters/${item.url.match(/\d+/)[0]}.jpg`}
              alt='Carecter'
            />
            <CardBody w={{ base: "100%", md: "100%" }}>
              <Heading size='md' color="Black" textAlign="left" mb={"2rem"}>{item.name}</Heading>
              <Flex direction="row">
                <Box mr={4}>
                  <Text fontSize="lg" color="Black">Eye Color:</Text>
                </Box>
                <Text fontSize="lg" color="Black">{item.birth_year}</Text>
              </Flex>
              <Flex direction="row">
                <Box mr={4}>
                  <Text fontSize="lg" color="Black">Eye Color:</Text>
                </Box>
                <Text fontSize="lg" color="Black">{item.eye_color}</Text>
              </Flex>
              <Flex direction="row">
                <Box mr={4}>
                  <Text fontSize="lg" color="Black">Gender :</Text>
                </Box>
                <Text fontSize="lg" color="Black">{item.gender}</Text>
              </Flex>
              <Flex direction="row">
                <Box mr={4}>
                  <Text fontSize="lg" color="Black">Hair Color :</Text>
                </Box>
                <Text fontSize="lg" color="Black">{item.hair_color}</Text>
              </Flex>
              <Flex direction="row">
                <Box mr={4}>
                  <Text fontSize="lg" color="Black">Height :</Text>
                </Box>
                <Text fontSize="lg" color="Black">{item.height}</Text>
              </Flex>
              <Flex direction="row">
                <Box mr={4}>
                  <Text fontSize="lg" color="Black">Mass :</Text>
                </Box>
                <Text fontSize="lg" color="Black">{item.mass}</Text>
              </Flex>
              <Flex direction="row">
                <Box mr={4}>
                  <Text fontSize="lg" color="Black">Skin Color :</Text>
                </Box>
                <Text fontSize="lg" color="Black">{item.skin_color}</Text>
              </Flex>
              <CardFooter textAlign="left" p={0} mt={"2rem"}>
                <Button variant='solid' colorScheme='red' onClick={() => removeFavourite(item)}>
                  Remove Favourite
                </Button>
              </CardFooter>
            </CardBody>
          </Card>
        ))
        :
        <Flex justify="center" align="center" h="80vh">
          <Spinner size="xl" color="Black" />
        </Flex>
      }
    </Box>
  )
}

export default FavouritePage