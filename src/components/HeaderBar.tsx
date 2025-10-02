"use client";

import React from "react";

type HeaderBarProps = {
  title: string;
};

export default function HeaderBar({ title }: HeaderBarProps) {
  return (
    <header className="w-full h-20 flex items-center bg-black/20 border-b border-white/40 px-6 sm:px-10 text-white">
      <div className="mx-auto max-w-[1100px] w-full">
        <h1 className="text-base sm:text-lg font-semibold leading-none">
          {title}
        </h1>
      </div>
    </header>
  );
}
