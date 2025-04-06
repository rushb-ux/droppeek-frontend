"use client";

import { Avatar, AvatarGroup } from "@chakra-ui/react";
import * as React from "react";

export interface AvatarProps {
  name?: string;
  src?: string;
  size?: string;
  fallback?: React.ReactNode;
}

export const CustomAvatar: React.FC<AvatarProps> = ({ name, src, size = "md", fallback }) => {
  return (
    <AvatarGroup>
      <Avatar name={name} src={src} size={size}>
        {fallback}
      </Avatar>
    </AvatarGroup>
  );
};
