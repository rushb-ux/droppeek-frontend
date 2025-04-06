import { Card, CardHeader, CardBody, CardFooter, Image, Box, Text, Button } from "@chakra-ui/react";

interface CustomCardProps {
  title: string;
  description: string;
  image: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, description, image }) => {
  return (
    <Card width="350px" boxShadow="lg" p={5} borderRadius="lg" bg="white" transition="0.3s"
      _hover={{ boxShadow: "2xl", transform: "translateY(-5px)" }}>
      
      <CardHeader>
        <Text fontSize="xl" fontWeight="bold">{title}</Text>
      </CardHeader>

      <CardBody>
        <Box display="flex" justifyContent="center">
          <Image src={image} alt={title} boxSize="100px" borderRadius="md" />
        </Box>
        <Text textAlign="center" color="gray.600">{description}</Text>
      </CardBody>

      <CardFooter display="flex" justifyContent="space-between">
        <Button colorScheme="gray" variant="outline">More Info</Button>
        <Button colorScheme="green">Play Now</Button>
      </CardFooter>

    </Card>
  );
};

export default CustomCard;
