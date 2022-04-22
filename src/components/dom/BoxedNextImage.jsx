import { Box, Image } from '@chakra-ui/react';
import React from 'react';

export const BoxedNextImage = ({ src, alt, ...props }) => (
  <Box
    pos="relative"
  display="inline-flex"
    {...props}
    style={{
      objectFit: 'contain',
    }}
  >
    <Image {...{ src, alt }} layout="fill" objectFit="contain" />
  </Box>
);