"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// 可以自定义主题
const theme = extendTheme({});

export function Provider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
