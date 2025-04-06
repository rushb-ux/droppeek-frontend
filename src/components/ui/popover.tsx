import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import * as React from "react";

export const CustomPopover: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Popover标题</PopoverHeader>
        <PopoverBody>Popover内容。</PopoverBody>
        <PopoverFooter>Footer</PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
