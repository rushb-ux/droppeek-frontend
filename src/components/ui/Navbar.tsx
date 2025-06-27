import {
  Box,
  Flex,
  Link,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  HStack,
  Text,
  Badge,
  VStack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, StarIcon } from "@chakra-ui/icons";
import { FaStar, FaShieldAlt, FaNewspaper, FaHome } from "react-icons/fa";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  const NavLink = ({ href, children, icon, badge }: any) => (
    <Link
      href={href}
      display="flex"
      alignItems="center"
      gap={2}
      px={4}
      py={2}
      borderRadius="lg"
      transition="all 0.2s"
      _hover={{
        bg: hoverBg,
        transform: "translateY(-1px)",
      }}
      position="relative"
    >
      {icon}
      <Text fontWeight="medium">{children}</Text>
      {badge && (
        <Badge colorScheme="red" size="sm" borderRadius="full">
          {badge}
        </Badge>
      )}
    </Link>
  );

  const MobileNavLink = ({ href, children, icon, onClick }: any) => (
    <Link
      href={href}
      onClick={onClick}
      display="flex"
      alignItems="center"
      gap={3}
      p={3}
      borderRadius="lg"
      transition="all 0.2s"
      _hover={{ bg: "gray.100" }}
      w="full"
    >
      {icon}
      <Text fontWeight="medium">{children}</Text>
    </Link>
  );

  return (
    <Box 
      as="nav" 
      bg={bgColor}
      borderBottom="1px solid"
      borderColor={borderColor}
      px={4} 
      py={4}
      position="sticky"
      top={0}
      zIndex={1000}
      backdropFilter="blur(10px)"
      boxShadow="sm"
    >
      <Flex justify="space-between" align="center" maxW="container.xl" mx="auto">
        {/* Enhanced Logo */}
        <Link href="/" _hover={{ textDecoration: "none" }}>
          <Flex align="center" gap={2}>
            <Box
              bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              borderRadius="lg"
              p={2}
              color="white"
            >
              <FaStar size={20} />
            </Box>
            <VStack spacing={0} align="flex-start">
              <Text 
                fontSize="xl" 
                fontWeight="black" 
                color={textColor}
                lineHeight={1}
              >
                DropPeek
              </Text>
              <Text 
                fontSize="xs" 
                color="gray.500" 
                fontWeight="medium"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Mystery Box Reviews
              </Text>
            </VStack>
          </Flex>
        </Link>

        {/* Desktop Navigation */}
        <HStack spacing={2} display={{ base: "none", md: "flex" }}>
          <NavLink href="/" icon={<FaHome size={16} />}>
            Home
          </NavLink>
          <NavLink href="/platforms" icon={<FaShieldAlt size={16} />}>
            All Platforms
          </NavLink>
          <NavLink href="/reviews" icon={<FaStar size={16} />} badge="New">
            Reviews
          </NavLink>
          <NavLink href="/blog" icon={<FaNewspaper size={16} />}>
            Blog
          </NavLink>
        </HStack>

        {/* Mobile Menu Button */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          onClick={onOpen}
          variant="ghost"
          colorScheme="gray"
          size="lg"
        />

        {/* Enhanced Mobile Drawer */}
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton size="lg" />
            
            <DrawerHeader borderBottomWidth="1px" borderColor="gray.200">
              <Flex align="center" gap={2}>
                <Box
                  bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  borderRadius="lg"
                  p={2}
                  color="white"
                >
                  <FaStar size={16} />
                </Box>
                <VStack spacing={0} align="flex-start">
                  <Text fontSize="lg" fontWeight="bold">DropPeek</Text>
                  <Text fontSize="xs" color="gray.500">Mystery Box Reviews</Text>
                </VStack>
              </Flex>
            </DrawerHeader>
            
            <DrawerBody pt={6}>
              <VStack spacing={2} align="stretch">
                <MobileNavLink 
                  href="/" 
                  onClick={onClose}
                  icon={<FaHome size={18} color="#667eea" />}
                >
                  Home
                </MobileNavLink>
                
                <MobileNavLink 
                  href="/platforms" 
                  onClick={onClose}
                  icon={<FaShieldAlt size={18} color="#667eea" />}
                >
                  All Platforms
                </MobileNavLink>
                
                <Box position="relative">
                  <MobileNavLink 
                    href="/reviews" 
                    onClick={onClose}
                    icon={<FaStar size={18} color="#667eea" />}
                  >
                    Reviews
                  </MobileNavLink>
                  <Badge 
                    position="absolute" 
                    top={2} 
                    right={3} 
                    colorScheme="red" 
                    size="sm" 
                    borderRadius="full"
                  >
                    New
                  </Badge>
                </Box>
                
                <MobileNavLink 
                  href="/blog" 
                  onClick={onClose}
                  icon={<FaNewspaper size={18} color="#667eea" />}
                >
                  Blog
                </MobileNavLink>

                {/* Quick Stats */}
                <Box 
                  mt={6} 
                  p={4} 
                  bg="gray.50" 
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="gray.200"
                >
                  <Text fontSize="sm" fontWeight="bold" mb={3} color="gray.700">
                    Why Trust DropPeek?
                  </Text>
                  <VStack spacing={2} align="stretch">
                    <Flex justify="space-between">
                      <Text fontSize="xs" color="gray.600">Platforms Reviewed</Text>
                      <Text fontSize="xs" fontWeight="bold">25+</Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text fontSize="xs" color="gray.600">Users Protected</Text>
                      <Text fontSize="xs" fontWeight="bold">50K+</Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text fontSize="xs" color="gray.600">Scams Prevented</Text>
                      <Text fontSize="xs" fontWeight="bold">1000+</Text>
                    </Flex>
                  </VStack>
                </Box>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};

export default Navbar;