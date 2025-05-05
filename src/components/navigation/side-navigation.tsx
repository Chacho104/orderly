"use client";

import { useState } from "react";

import Link from "next/link";

import { useParams, usePathname } from "next/navigation";

import { ChevronDown, ChevronUp, MonitorSmartphone, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { Banner, User } from "@/lib/types";

import MenuItemButton from "../ui/menu-item-button";

// Extend props to include custom ones
interface SideNavigationProps {
  className?: string;
  users: User[];
  banners: Banner[];
}

const SideNavigation = ({ className, users, banners }: SideNavigationProps) => {
  const pathname = usePathname();
  const params = useParams();

  const [openMenu, setOpenMenu] = useState({
    userManagementMenu: false,
    productManagementMenu: false,
  });

  const userManagementLinks = [
    {
      href: `/${params?.storeId}/users`,
      label: `Users (${users.length})`,
      active: pathname === `/${params?.storeId}/users`,
    },
  ];

  const productManagementLinks = [
    {
      href: `/${params?.storeId}/banners`,
      label: `Banners (${banners.length})`,
      active: pathname === `/${params?.storeId}/banners`,
    },
    {
      href: `/${params?.storeId}/categories`,
      label: `Categories (${users.length})`,
      active: pathname === `/${params?.storeId}/categories`,
    },
  ];

  const toggleUserMngtMenu = () => {
    setOpenMenu((prevState) => ({
      ...prevState,
      userManagementMenu: !prevState.userManagementMenu,
    }));
  };

  const toggleProductMngtMenu = () => {
    setOpenMenu((prevState) => ({
      ...prevState,
      productManagementMenu: !prevState.productManagementMenu,
    }));
  };

  return (
    <div className="flex flex-col gap-y-2 w-60">
      <MenuItemButton
        label="User Management"
        icon={Users}
        iconTwo={openMenu.userManagementMenu ? ChevronUp : ChevronDown}
        onClick={toggleUserMngtMenu}
        className="shadow-sm text-sm"
      />
      {openMenu.userManagementMenu && (
        <div className="flex flex-col space-y-2 px-4 py-1">
          {userManagementLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors hover:text-black",
                link.active ? "text-black" : "text-neutral-500"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
      <MenuItemButton
        label="Product Management"
        icon={MonitorSmartphone}
        iconTwo={openMenu.productManagementMenu ? ChevronUp : ChevronDown}
        onClick={toggleProductMngtMenu}
        className="dark:bg-blue-950/40 shadow-sm text-sm"
      />
      {openMenu.productManagementMenu && (
        <div className="flex flex-col space-y-2 px-4 py-1">
          {productManagementLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors hover:text-black",
                link.active ? "text-black" : "text-neutral-500"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SideNavigation;
