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
        <Box bg={'gray.100'} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Box>StarWars</Box>
                <Flex alignItems={'center'}>
                    <Tooltip label={'Go to Home'}>
                        <Link px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700') }} href={'/'}>
                            Home
                        </Link>
                    </Tooltip>
                    <Tooltip label={'Go to Favourite'}>
                        <Button onClick={handleNavigation} ml={4}>
                            <FaHeart color='red'/>
                        </Button>
                    </Tooltip>
                </Flex>
            </Flex>
        </Box>
    )
}

export default NavBar