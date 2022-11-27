import React,  { useState, useEffect, useRef} from 'react';
import './App.css';
import Graphh from './graph'
import Sidebar from './sidebar';
import 'prismjs/themes/prism-okaidia.css'
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
const sampleCode = `
// ソースコードの表示例
void Test() {
  const sum = 1 + 2;
  console.log(sum);
}
`.trim();

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
