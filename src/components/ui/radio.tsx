import { Radio as ChakraRadio, RadioGroup as ChakraRadioGroup } from "@chakra-ui/react"
import * as React from "react"

export interface RadioProps {
  value: string
  children?: React.ReactNode
}

export const Radio: React.FC<RadioProps> = ({ value, children }) => {
  return (
    <ChakraRadio value={value}>
      {children}
    </ChakraRadio>
  )
}

export interface RadioGroupProps {
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ value, onChange, children }) => {
  return (
    <ChakraRadioGroup value={value} onChange={onChange}>
      {children}
    </ChakraRadioGroup>
  )
}
