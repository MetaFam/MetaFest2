import React from 'react';

import { Box, Image } from '@chakra-ui/react';

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