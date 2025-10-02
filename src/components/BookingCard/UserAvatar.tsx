import React from "react";
import Image from "next/image";

type UserAvatarProps = {
  src?: string;
  alt?: string;
};

export default function UserAvatar({
  src = "/avatar.png",
  alt = "User",
}: UserAvatarProps) {
  return (
    <div className="relative w-[96px] h-[96px] sm:w-[140px] sm:h-[140px] rounded-full overflow-hidden mx-auto sm:mx-0">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 640px) 180px, 80px"
        className="object-cover"
        priority
      />
    </div>
  );
}
