import { Button as ChakraButton, ButtonProps as ChakraButtonProps, Spinner, Box } from "@chakra-ui/react"
import * as React from "react"

interface ButtonLoadingProps {
  loading?: boolean
  loadingText?: React.ReactNode
}

export interface ButtonProps extends ChakraButtonProps, ButtonLoadingProps {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { loading, disabled, loadingText, children, ...rest } = props

    return (
      <ChakraButton disabled={loading || disabled} ref={ref} {...rest}>
        {loading ? (
          <Box display="flex" alignItems="center" gap={2}>
            <Spinner size="sm" color="inherit" />
            {loadingText || children}
          </Box>
        ) : (
          children
        )}
      </ChakraButton>
    )
  }
);
