import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";
import * as React from "react";

// ✅ 定义 Drawer 组件的 Props
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// ✅ 这个是主要的 Drawer 组件
export const DrawerRoot: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>导航菜单</DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        <DrawerFooter>
          <DrawerCloseButton onClick={onClose} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

// ✅ 其他 Drawer 相关组件
export {
  DrawerOverlay as DrawerBackdrop,
  DrawerContent,
  DrawerCloseButton as DrawerCloseTrigger,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
};
