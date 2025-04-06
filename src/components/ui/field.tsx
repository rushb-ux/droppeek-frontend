import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import * as React from "react";

export interface FieldProps {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  optionalText?: React.ReactNode;
  children: React.ReactNode;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field({ label, children, helperText, errorText, optionalText, ...rest }, ref) {
    return (
      <FormControl ref={ref} {...rest} isInvalid={!!errorText}>
        {label && (
          <FormLabel>
            {label}
            {optionalText && <span style={{ marginLeft: 4 }}>{optionalText}</span>}
          </FormLabel>
        )}
        {children}
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
      </FormControl>
    );
  }
);
