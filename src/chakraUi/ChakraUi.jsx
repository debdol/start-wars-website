'use client'
import { ChakraProvider } from "@chakra-ui/react";

export function ChakraUi({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}