import { Slider as ChakraSlider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, Box, HStack } from "@chakra-ui/react"
import * as React from "react"

export interface SliderProps {
  marks?: Array<number | { value: number; label: React.ReactNode }>
  label?: React.ReactNode
  showValue?: boolean
  defaultValue?: number
  value?: number
  onChange?: (value: number) => void
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  function Slider(props, ref) {
    const { marks, label, showValue, value, defaultValue, onChange, ...rest } = props

    return (
      <Box w="100%">
        {label && (
          <HStack justify="space-between" mb={2}>
            <Box fontWeight="bold">{label}</Box>
            {showValue && <Box>{value ?? defaultValue}</Box>}
          </HStack>
        )}
        <ChakraSlider ref={ref} value={value} defaultValue={defaultValue} onChange={onChange} {...rest}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />

          {marks?.map((mark, index) => {
            const markValue = typeof mark === "number" ? mark : mark.value
            const markLabel = typeof mark === "number" ? undefined : mark.label
            return (
              <SliderMark key={index} value={markValue} fontSize="sm" mt="2">
                {markLabel}
              </SliderMark>
            )
          })}
        </ChakraSlider>
      </Box>
    )
  },
)
