import { Tooltip as ChakraTooltip, TooltipProps } from "@chakra-ui/react";
import * as React from "react";

export interface CustomTooltipProps extends Omit<TooltipProps, "label"> {
  content?: string; 
  disabled?: boolean;
}

export const Tooltip: React.FC<CustomTooltipProps> = ({
  children,
  content,
  disabled,
  ...props
}) => {
  if (disabled) return <>{children}</>;

  return (
    <ChakraTooltip label={content ?? undefined} {...props}>
      {children}
    </ChakraTooltip>
  );
};
