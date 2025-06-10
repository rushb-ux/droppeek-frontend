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
  DrawerFooter,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box as="nav" bg="gray.800" color="white" px={4} py={3}>
      <Flex justify="space-between" align="center" maxW="container.lg" mx="auto">
        {/* Logo */}
        <Link href="/" fontSize="xl" fontWeight="bold">
          DropPeek
        </Link>

        {/* 桌面端导航菜单 */}
        <HStack spacing={6} display={{ base: "none", md: "flex" }}>
          <Link href="/platforms">All Platforms</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/blog">Blog</Link>
        </HStack>

        {/* 移动端菜单按钮 */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          onClick={onOpen}
        />

        {/* Drawer 侧边菜单 */}
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
          
              <Link href="/reviews" onClick={onClose} display="block" mb={2}>
                Reviews
              </Link>
              <Link href="/blog" onClick={onClose} display="block">
                Blog
              </Link>
            </DrawerBody>
            <DrawerFooter />
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};

export default Navbar;
