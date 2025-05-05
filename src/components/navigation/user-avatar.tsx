// User avatar. Shows user image and name of authenticated user. Else just placeholder image and text

"use client";

import { User } from "@/lib/types";
import Image from "next/image";

interface UserAvatarProps {
  user: User;
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <div className="flex items-center justify-start gap-x-4 bg-black px-4 py-3 w-60 shadow-sm">
      <div className="w-[30px]">
        <Image
          alt="Avatar"
          width={30}
          height={30}
          src="/placeholder.png"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col items-start">
        <p className="font-bold text-white">{user.name}</p>
        <p className="text-sm text-neutral-400">{user.role}</p>
      </div>
    </div>
  );
};

export default UserAvatar;
