"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { Image, Box, Text, Button, SimpleGrid, Flex, Spinner, useToast, Tooltip, IconButton } from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

function HomePage() {
    const router = useRouter();
    const toast = useToast();

    const [cardData, setCardData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [myFavourite, setMyFavourite] = useState([]);

    const getCarecterData = () => {
        setCardData([]);
        axios.get(`https://swapi.dev/api/people/?page=${currentPage}`)
            .then((response) => {
                setCardData(response.data.results);
                // console.log('response.data.results:', response.data.results);
            })
            .catch((error) => {
                toast({
                    title: error.response.data.detail,
                    description: ' Go to previous page',
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });

            })
    }
    useEffect(() => {
        getCarecterData()
    }, [currentPage])

    const handleNavigation = (item) => {
        router.push(`/details/${item.url.match(/\d+/)[0]}`)
    };

    const addToFavourite = (item) => {
        let myStore = JSON.parse(localStorage.getItem('favourite_items'));
        if (Array.isArray(myStore)) {
            myStore.push(item);
        } else {
            myStore = [item];
        }
        localStorage.setItem("favourite_items", JSON.stringify(myStore));
        getFavourite();
    };

    function getFavourite() {
        const data = JSON.parse(localStorage.getItem('favourite_items'));
        if (data) {
            const favNames = data.map((item) => item.name);
            setMyFavourite(favNames);
        }
    }

    useEffect(() => {
        getFavourite();
    }, []);
    return (
        <Box position="relative" minH="100vh">
            {cardData.length > 0 ?
                <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={8} p={5}>
                    {cardData.map((item, index) => {
                        return (
                            <Box
                                key={item.name}
                                w="100%"
                                p={6}
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                boxShadow="lg"
                                textAlign="center"
                                position="relative"
                                bg="white"
                                transition="transform 0.4s"
                                _hover={{ transform: 'scale(1.1)', cursor: 'pointer' }}>
                                <Tooltip label={'Click to See Details'}>
                                    <Image
                                        alt='Character'
                                        maxW={{ base: '100%', sm: '200px' }}
                                        src={`https://starwars-visualguide.com/assets/img/characters/${item.url.match(/\d+/)[0]}.jpg`}
                                        mb={4}
                                        borderRadius="full"
                                        boxSize="150px"
                                        objectFit="cover"
                                        mx="auto"
                                        _hover={{ cursor: 'pointer' }}
                                    />
                                </Tooltip>
                                <Text fontWeight="bold" fontSize="lg" color="gray.700">
                                    {item.name}
                                </Text>
                                <Flex w="90%" justify="center" align="center" mt={4} mx="auto">
                                    <Button as="a" colorScheme="gray" mr={2} onClick={() => handleNavigation(item)}>
                                        View Details
                                    </Button>
                                    {
                                        myFavourite.includes(item.name) ? (
                                            <Tooltip label={'Go to Favourites'}>
                                                <IconButton
                                                    aria-label={"Add to favorites"}
                                                    icon={<FaHeart />}
                                                    onClick={() => router.push('/favourite')}
                                                    colorScheme={"red"}
                                                    variant="solid"
                                                />
                                            </Tooltip>
                                        ) : (
                                            <Tooltip label={'Add to Favourites'}>
                                                <IconButton
                                                    aria-label={"Add to favorites"}
                                                    icon={<FaHeart />}
                                                    onClick={() => addToFavourite(item)}
                                                    colorScheme={"red"}
                                                    variant="outline"
                                                />
                                            </Tooltip>
                                        )
                                    }
                                </Flex>
                            </Box>
                        )
                    })}
                </SimpleGrid>
                :
                <Flex justify="center" align="center" h="80vh">
                    <Spinner size="xl" color="red.500" />
                </Flex>}
            <br />
            <br />
            <Flex
                justify="space-between"
                position="absolute"
                bottom="0"
                width="100%"
            >
                <Button
                    leftIcon={<ArrowBackIcon />}
                    colorScheme='red'
                    variant={currentPage === 1 ? 'outline' : 'solid'}
                    isDisabled={currentPage === 1}
                    onClick={() => {
                        if (currentPage > 1) {
                            setCurrentPage((prev) => prev - 1);
                        } else {
                            toast({
                                title: "Can't go to the previous page",
                                description: "You are already on the first page.",
                                status: "info",
                                duration: 2000,
                                isClosable: true,
                            });
                        }
                    }}
                >
                    Previous
                </Button>
                <Button
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme='red'
                    variant={currentPage === 1 ? 'solid' : 'outline'}
                    isDisabled={currentPage === 9}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Next
                </Button>
            </Flex>
        </Box >
    )
}

export default HomePage