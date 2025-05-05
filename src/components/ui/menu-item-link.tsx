import Link from "next/link";

import { IconType } from "react-icons";

interface MenuItemLinkProps {
  label: string;
  icon: IconType;
  url: string;
}

const MenuItemLink = ({ label, icon: Icon, url }: MenuItemLinkProps) => {
  return (
    <Link
      href={url}
      className="px-4 py-3 flex items-center gap-x-2 transition hover:text-brand-orange"
    >
      <Icon size={20} />
      {label}
    </Link>
  );
};

export default MenuItemLink;
