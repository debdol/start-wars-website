'use client'
import React from 'react';
import { Box, Flex, Link, Tooltip } from '@chakra-ui/react';
import { FaHeart, FaHome } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";

function NavBar() {

    return (
        <Box
            bg={'#000000'}
            px={4}
            position="sticky"
            top="0"
            zIndex={1000}
            width='100%'
            height='4.5rem'
            display={"flex"}
            textAlign='center'
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Flex alignItems={'center'} justifyContent={'space-between'} height={"100%"} width={"90%"}>
                <Box
                    color='#FFC94A'
                    fontSize="2xl"
                    fontWeight="bold"
                    _hover={{ borderRadius: "none", color: "#ffffff", transform: "scale(1.1)", transition: "0.3s" }}
                    transition={"0.3s"}
                    cursor={"pointer"}
                >
                    <Link href={'/'} display={"flex"} alignItems={"center"} gap={"8px"} fontSize={"2rem"} fontFamily={"fantasy"}>
                        <GiStarsStack fontSize={'3rem'} />
                        StarWars
                    </Link>
                </Box>
                <Flex alignItems={'center'} gap={"24px"}>
                    <Tooltip label={'Home'}>
                        <Link px={2} py={1} rounded={'md'} _hover={{ borderRadius: "none", color: "#FFC94A", transform: "scale(1.1)", transition: "0.3s" }} href={'/'} color={"#ffffff"} transition={"0.3s"}>
                            <FaHome fontSize={'2rem'} />
                        </Link>
                    </Tooltip>
                    <Tooltip label={'Favourites'}>
                        <Link px={2} py={1} rounded={'md'} _hover={{ borderRadius: "none", color: "#FFC94A", transform: "scale(1.1)", transition: "0.3s" }} href={'/favourite'} color={"#ffffff"} transition={"0.3s"}>
                            <FaHeart fontSize={'2rem'} />
                        </Link>
                    </Tooltip>
                </Flex>
            </Flex>
        </Box>
    )
}

export default NavBar