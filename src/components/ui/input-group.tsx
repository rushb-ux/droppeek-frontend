import { BoxProps, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import * as React from "react";

export interface CustomInputGroupProps extends BoxProps {
  startElement?: React.ReactNode;
  endElement?: React.ReactNode;
  children: React.ReactElement;
}

export const CustomInputGroup = React.forwardRef<HTMLDivElement, CustomInputGroupProps>(
  function CustomInputGroup(props, ref) {
    const { startElement, endElement, children, ...rest } = props;

    return (
      <InputGroup ref={ref} {...rest}>
        {startElement && <InputLeftElement>{startElement}</InputLeftElement>}
        {children}
        {endElement && <InputRightElement>{endElement}</InputRightElement>}
      </InputGroup>
    );
  }
);
