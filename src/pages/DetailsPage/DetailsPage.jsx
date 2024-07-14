'use client'
import React, { useEffect, useState } from 'react'
import './DetailsPage.scss'
import { Box, Text, Heading, useColorModeValue, Card, CardHeader, CardBody, Image, Flex, Divider, Spinner, HStack } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import gifs from '../../gif/fy5Z.gif'

function DetailsPage() {
  const { id } = useParams();
  const bg = useColorModeValue('gray.100', 'gray.900');
  const [details, setDetails] = useState(null);
  const [filmsEndPoint, setFilmsEndPoint] = useState([]);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    let movies = {
      "pathan": "SRk",
      "tiger": "Salman",
      "war": "HRX",
    }
    console.log(movies["tiger"])
  }, [])

  useEffect(() => {
    axios.get(`https://swapi.dev/api/people/${id}/`)
      .then((response) => {
        // console.log("Character Details: ", response.data.films);
        setFilmsEndPoint(response.data.films);
        setDetails(response.data);
      })
      .catch((error) => {
        console.log("Error in fetching character details: ", error)
      })
  }, [id])

  useEffect(() => {
    if (filmsEndPoint.length > 0) {
      // console.log("movies:", films);
      axios.all(filmsEndPoint.map((endpoint) => axios.get(endpoint)))
        .then((movies) => {
          console.log("Character Filmes: ", movies);
          setFilms(movies);
        })
        .catch((error) => {
          console.log("Error in fetching character Filmes: ", error)
        })
    }
  }, [filmsEndPoint])
  return (
    <Box
      p={8}
      bgImage='url("https://i.gifer.com/DVx4.gif")'
      bgSize="cover"
      bgPosition="center"
      minH="100vh"
      color="white"
      position="relative"
      align="center"
      justify="center"
    >
      {details ?
        <Card align='center' bg="rgba(117, 117, 117, 0.6)" color="white" p={5} w='50%' justify='center'>
          <CardHeader>
            <Image
              src={'https://parade.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwNTc4NDQ3NjE3ODI4NzMy/the-best-star-wars-quotes-of-all-time.jpg'}
              // alt={character.name}
              borderRadius="full"
              boxSize="200px"
              objectFit="cover"
              mb={4}
              border="5px solid white"
            />
          </CardHeader>
          <CardBody>
            <Text fontSize="xl">{details.name}</Text>
          </CardBody>
          <CardBody bg="rgba(255, 255, 255, 0.5)" color="black" borderRadius="lg" w="90%">
            <Flex direction="row">
              <Box mr={4}>
                <Text fontSize="xl" color="Black">Eye Color :</Text>
              </Box>
              <Text fontSize="xl" color="Black">{details.eye_color}</Text>
            </Flex>
            <Flex direction="row">
              <Box mr={4}>
                <Text fontSize="xl" color="Black">Gender :</Text>
              </Box>
              <Text fontSize="xl" color="Black">{details.gender}</Text>
            </Flex>
            <Flex direction="row">
              <Box mr={4}>
                <Text fontSize="xl" color="Black">Hair Color :</Text>
              </Box>
              <Text fontSize="xl" color="Black">{details.hair_color}</Text>
            </Flex>
            <Flex direction="row">
              <Box mr={4}>
                <Text fontSize="xl" color="Black">Height :</Text>
              </Box>
              <Text fontSize="xl" color="Black">{details.height}</Text>
            </Flex>
            <Flex direction="row">
              <Box mr={4}>
                <Text fontSize="xl" color="Black">Mass :</Text>
              </Box>
              <Text fontSize="xl" color="Black">{details.mass}</Text>
            </Flex>
            <Flex direction="row">
              <Box mr={4}>
                <Text fontSize="xl" color="Black">Skin Color :</Text>
              </Box>
              <Text fontSize="lg" color="Black">{details.skin_color}</Text>
            </Flex>
          </CardBody>
        </Card> :
        <Flex justify="center" align="center" h="80vh">
          <Spinner size="xl" color="white.500" />
        </Flex>}
      <Divider my={6} borderColor="white.300" />
      <Heading as="h3" size="lg" mb={4} color="yellow.300">Films Appreared in:</Heading>
      <Flex
        justify="center"
      >
        <Box
          overflowX="auto "
          whiteSpace="nowrap"
          maxWidth="100%"
          padding="4"
        >
          <HStack
            spacing={4}
            minWidth="1000px"
            py={4}
          >
            {films.length > 0 ?
              films.map((item, index) => (
                <Box
                  // minW="200px"
                  w="200px"
                  h="300px"
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
                    src={'https://c02.purpledshub.com/uploads/sites/48/2021/04/what-are-stars-explained.jpg'}
                    // alt={film.data.title}
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
                    whiteSpace="nowrap"
                    overflow="hidden"
                  >{item.data.title}</Text>
                  <Text
                    fontSize="sm"
                    whiteSpace="nowrap"
                    overflow="hidden"
                  >Procducer: {item.data.producer}</Text>
                  <Text
                    fontSize="sm"
                    whiteSpace="nowrap"
                    overflow="hidden"
                  >Director:{item.data.director}</Text>
                  <Text fontSize="sm">Release Date: {item.data.release_date}</Text>
                </Box>
              )) : null}
          </HStack>
        </Box>
      </Flex >
    </Box >
  )
}

export default DetailsPage