// Layout utility component that ensures uniform padding across the application

"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("mx-auto px-2 sm:px-4 md:px-6", className)}>
      {children}
    </div>
  );
};

export default Container;
