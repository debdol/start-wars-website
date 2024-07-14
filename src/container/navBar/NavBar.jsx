'use client'
import React from 'react';
import { Box, Flex, Link, Button, useColorModeValue, Tooltip } from '@chakra-ui/react';
import { FaHeart } from "react-icons/fa";
import { useRouter } from 'next/navigation';

function NavBar() {
    const router = useRouter();

    const handleNavigation = () => {
        router.push('/favourite');
    };

    return (
        <Box
            bg={'#49243E'}
            px={4}
            position="sticky"
            top="0"
            zIndex={1000}
            width='100%'
            height='5rem'
            textAlign='center'
        >
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'} height={"100%"}>
                <Box
                    color={"#DBAFA0"}
                    fontSize="4xl"
                    fontWeight="bold"
                >StarWars</Box>
                <Flex alignItems={'center'}>
                    <Tooltip label={'Go to Home'}>
                        <Link px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700'), color: "Black" }} href={'/'} color={"#DBAFA0"}>
                            Home
                        </Link>
                    </Tooltip>
                    <Tooltip label={'Go to Favourite'}>
                        <Button onClick={handleNavigation} ml={4}>
                            <FaHeart color='red' />
                        </Button>
                    </Tooltip>
                </Flex>
            </Flex>
        </Box>
    )
}

export default NavBar