// Simple component to be use in rendering menu items

"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import { Button } from "./button";

interface MenuItemButtonProps {
  onClick: () => void;
  label: string;
  icon: IconType | LucideIcon;
  className?: string;
  iconTwo?: IconType | LucideIcon;
}

const MenuItemButton = ({
  onClick,
  label,
  icon: Icon,
  iconTwo: IconTwo,
  className,
}: MenuItemButtonProps) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      className="rounded-xs justify-between cursor-pointer"
    >
      <div className="flex items-center justify-center gap-x-2">
        <Icon size={20} />
        {label}
      </div>
      {IconTwo && <IconTwo size={20} />}
    </Button>
  );
};
export default MenuItemButton;
