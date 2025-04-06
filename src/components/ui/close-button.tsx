import type { ButtonProps } from "@chakra-ui/react";
import { IconButton as ChakraIconButton } from "@chakra-ui/react";
import * as React from "react";
import { LuX } from "react-icons/lu"; 

export type CloseButtonProps = ButtonProps;

// create CloseButton component
export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  CloseButtonProps
>((props, ref) => {
  return (
    <ChakraIconButton
      variant="ghost"
      aria-label="Close"
      ref={ref}
      {...props}
    >
      {props.children ?? <LuX />}
    </ChakraIconButton>
  );
});
