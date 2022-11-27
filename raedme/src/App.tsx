import React,  { useState, useEffect, useRef} from 'react';
import './App.css';
import Graphh from './graph'
import Sidebar from './sidebar';
import ModalProvider from './modalContext'

import { ModalBody, Modal, ModalOverlay, ModalContent,
         ChakraProvider, useDisclosure,
         Box,  Flex } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react";
function App() {

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  const theme = extendTheme({
    components: {
      Drawer: {
        parts: ['dialog', 'header', 'body'],
        variants: {
          primary: {
            secondary: {
              dialog: {
                maxW: '100%'
              }
            }
          },
        }}}})

  console.log(process.env.PUBLIC_URL)
  return (
    <ChakraProvider theme={theme}>
      <header className="markdown-body">

      <ModalProvider>
      <Flex  p={2}
    maxH="calc(100vh)"
    w='100%' >
      <Graphh />
      <Sidebar />
      </Flex>

      </ModalProvider>
      </header>
      </ChakraProvider>
  );
}

export default App;
