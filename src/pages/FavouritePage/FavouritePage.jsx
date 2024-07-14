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
    <div className='mainContainer'
      style={{
        backgroundImage: `url('https://c02.purpledshub.com/uploads/sites/48/2021/04/what-are-stars-explained.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        width: '100%'
      }}>
      {favItems.length > 0 ?
        favItems.map((item, index) => (
          <Card
            key={item.name}
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            bg={'rgba(128, 128, 128, 0.2)'}
            mt={4}
            mb={4}
          >
            <Image
              objectFit='cover'
              maxW={{ base: '100%', sm: '200px' }}
              src='https://wallpapers.com/images/hd/star-wars-characters-hd-plzcoaffexgf4h81.jpg'
              alt='Carecter'
            />
            <Stack>
              <CardBody>
                <Heading size='md' color="White">{item.name}</Heading>
                <Flex direction="row">
                  <Box mr={4}>
                    <Text fontSize="lg" color="White">Eye Color:</Text>
                  </Box>
                  <Text fontSize="lg" color="White">{item.birth_year}</Text>
                </Flex>
                <Flex direction="row">
                  <Box mr={4}>
                    <Text fontSize="lg" color="White">Eye Color:</Text>
                  </Box>
                  <Text fontSize="lg" color="White">{item.eye_color}</Text>
                </Flex>
                <Flex direction="row">
                  <Box mr={4}>
                    <Text fontSize="lg" color="White">Gender :</Text>
                  </Box>
                  <Text fontSize="lg" color="White">{item.gender}</Text>
                </Flex>
                <Flex direction="row">
                  <Box mr={4}>
                    <Text fontSize="lg" color="White">Hair Color :</Text>
                  </Box>
                  <Text fontSize="lg" color="White">{item.hair_color}</Text>
                </Flex>
                <Flex direction="row">
                  <Box mr={4}>
                    <Text fontSize="lg" color="White">Height :</Text>
                  </Box>
                  <Text fontSize="lg" color="White">{item.height}</Text>
                </Flex>
                <Flex direction="row">
                  <Box mr={4}>
                    <Text fontSize="lg" color="White">Mass :</Text>
                  </Box>
                  <Text fontSize="lg" color="White">{item.mass}</Text>
                </Flex>
                <Flex direction="row">
                  <Box mr={4}>
                    <Text fontSize="lg" color="White">Skin Color :</Text>
                  </Box>
                  <Text fontSize="lg" color="White">{item.skin_color}</Text>
                </Flex>
              </CardBody>
              <CardFooter>
                <Button variant='solid' colorScheme='red' onClick={() => removeFavourite(item)}>
                  Remove Favourite
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        ))
        :
        <Flex justify="center" align="center" h="80vh">
          <Spinner size="xl" color="white" />
        </Flex>
      }
    </div >
  )
}

export default FavouritePage