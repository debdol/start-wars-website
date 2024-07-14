'use client'
import React, { useEffect, useState } from 'react'
import './DetailsPage.scss'
import { Box, Text, Heading, useColorModeValue, Card, CardBody, Image, Flex, Divider, Spinner, HStack } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import axios from 'axios';


function DetailsPage() {
  const moviePosters = {
    "A New Hope": "https://starwars-visualguide.com/assets/img/films/1.jpg",
    "The Empire Strikes Back": "https://starwars-visualguide.com/assets/img/films/2.jpg",
    "Return of the Jedi": "https://starwars-visualguide.com/assets/img/films/3.jpg",
    "The Phantom Menace": "https://starwars-visualguide.com/assets/img/films/4.jpg",
    "Attack of the Clones": "https://starwars-visualguide.com/assets/img/films/5.jpg",
    "Revenge of the Sith": "https://starwars-visualguide.com/assets/img/films/6.jpg",
    "The Force Awakens": "https://starwars-visualguide.com/assets/img/films/7.jpg",
    "The Last Jedi": "https://starwars-visualguide.com/assets/img/films/8.jpg",
    "The Rise of Skywalker": "https://starwars-visualguide.com/assets/img/films/9.jpg",
  };
  const { id } = useParams();
  const cardId = id || false;
  const bg = useColorModeValue('gray.100', 'gray.900');
  const [details, setDetails] = useState(null);
  const [filmsEndPoint, setFilmsEndPoint] = useState([]);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios.get(`https://swapi.dev/api/people/${cardId}/`)
      .then((response) => {
        setFilmsEndPoint(response.data.films);
        setDetails(response.data);
      })
      .catch((error) => {
        console.log("Error in fetching character details: ", error)
      })
  }, [cardId])

  useEffect(() => {
    if (filmsEndPoint.length > 0) {
      axios.all(filmsEndPoint.map((endpoint) => axios.get(endpoint)))
        .then((movies) => {
          setFilms(movies);
        })
        .catch((error) => {
          console.log("Error in fetching character Filmes: ", error)
        })
    }
  }, [filmsEndPoint]);

  return (
    <>
      {details ?
        <Box
          p={8}
          bgSize="cover"
          bgPosition="center"
          minH="100vh"
          color="white"
          position="relative"
          align="center"
          justify="center"
        >
          <Card
            direction={{ base: 'column', md: 'row' }}
            overflow='hidden'
            variant='outline'
            bg={'rgba(128, 128, 128, 0.2)'}
            mt={4}
            mb={4}
            w={{ base: '100%', sm: '95%', md: '90%', xl: '70%' }}
            h={{ base: "100%", md: "500px" }}
            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          >
            <Image
              objectFit='content'
              w={{ base: '100%', md: '50%' }}
              src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
              alt='Carecter'
            />
            <CardBody w={{ base: "100%", md: "50%" }}>
              <Heading size='md' color="Black" textAlign={"left"} mb={'1rem'}>{details.name}</Heading>
              <Flex direction="row">
                <Box mr={4}>
                  <Text fontSize="lg" color="Black">Date Of Birth:</Text>
                </Box>
                <Text fontSize="lg" color="Black">{details.birth_year}</Text>
              </Flex>
              <Flex direction="row">
                <Box mr={4}>
                  <Text fontSize="lg" color="Black">Eye Color:</Text>
                </Box>
                <Text fontSize="lg" color="Black">{details.eye_color}</Text>
              </Flex>
              <Flex direction="row">
                <Box mr={4}>
                  <Text fontSize="lg" color="Black">Gender :</Text>
                </Box>
                <Text fontSize="lg" color="Black">{details.gender}</Text>
              </Flex>
              <Flex direction="row">
                <Box mr={4}>
                  <Text fontSize="lg" color="Black">Hair Color :</Text>
                </Box>
                <Text fontSize="lg" color="Black">{details.hair_color}</Text>
              </Flex>
              <Flex direction="row">
                <Box mr={4}>
                  <Text fontSize="lg" color="Black">Height :</Text>
                </Box>
                <Text fontSize="lg" color="Black">{details.height}</Text>
              </Flex>
              <Flex direction="row">
                <Box mr={4}>
                  <Text fontSize="lg" color="Black">Mass :</Text>
                </Box>
                <Text fontSize="lg" color="Black">{details.mass}</Text>
              </Flex>
              <Flex direction="row">
                <Box mr={4}>
                  <Text fontSize="lg" color="Black">Skin Color :</Text>
                </Box>
                <Text fontSize="lg" color="Black">{details.skin_color}</Text>
              </Flex>
            </CardBody>
          </Card>

          <Divider my={6} borderColor="white.300" />
          <Heading as="h3" size="lg" mb={4} color="yellow.300">Film Releases:</Heading>
          <Flex
            justify="center"
          >
            <Box
              overflowX="auto "
              whiteSpace="nowrap"
              width="100%"
              padding="4"
            >
              <HStack
                spacing={'2%'}
                width="100%"
                justifyContent={"center"}
              >
                {films.length > 0 ?
                  films.map((item, index) => (
                    <Box
                      key={(item) => item.data.title}
                      w={{ base: "100%", sm: "100%", md: "43%", xl: "23%" }}
                      h="400px"
                      p={4}
                      borderWidth="1px"
                      borderRadius="lg"
                      boxShadow="md"
                      textAlign="center"
                      bg="rgba(255, 255, 255, 0.8)"
                      color="black"
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      transition="transform 0.2s"
                      _hover={{ transform: 'scale(1.06)' }}>
                      <Image
                        src={moviePosters[item.data.title]}
                        alt={'title'}
                        boxSize="150px"
                        objectFit="cover"
                        borderRadius='full'
                        mb={4}
                        alignSelf="center"
                      />
                      <Text
                        fontWeight="bold"
                        fontSize="lg"
                        mb={2}
                      >{item.data.title}</Text>
                      <Text
                        fontSize="sm"
                        whiteSpace="wrap"
                        overflow="hidden"
                      >Procducer: {item.data.producer}</Text>
                      <Text
                        fontSize="sm"
                        whiteSpace="wrap"
                        overflow="hidden"
                      >Director:{item.data.director}</Text>
                      <Text fontSize="sm">Release Date: {item.data.release_date}</Text>
                    </Box>
                  )) :
                  <Flex justify="center" align="center" h="80vh">
                    <Spinner size="xl" color="Black" />
                  </Flex>}
              </HStack>
            </Box>
          </Flex >
        </Box >
        :
        <Flex justify="center" align="center" h="80vh">
          <Spinner size="xl" color="Black" />
        </Flex>
      }
    </>
  )
}

export default DetailsPage