import { Box } from "@chakra-ui/react";

export const DOMLoader = () => <Box position="absolute" bg="black" color="white" top={0} left={0} width="100vw" height="100vh" d="flex" alignContent="center" textAlign="center" zIndex={5000}><Box as="p">Loading...</Box></Box>;