
import { HStack, Icon } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"

const RatingStars = ({ rating }: { rating: number }) => (
  <HStack spacing={1}>
    {Array(5)
      .fill("")
      .map((_, i) => {
        const full = i + 1 <= rating
        const half = i < rating && rating < i + 1
        return (
          <Icon
            key={i}
            as={StarIcon}
            color={full ? "yellow.400" : half ? "yellow.200" : "gray.300"}
            boxSize={4}
            opacity={half ? 0.6 : 1}
          />
        )
      })}
  </HStack>
)

export default RatingStars
