import React, { PropsWithChildren } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function GradientBackground({ children }: PropsWithChildren) {
  return (
    <div className="min-h-[calc(100vh-80px)] w-full">
      <div className="relative h-full w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-700" />
        <div className="relative z-10 min-h-[calc(100vh-80px)] flex md:items-center items-end justify-center md:px-4">
          <div className="absolute inset-x-0 top-4 px-5 md:hidden flex items-start justify-between">
            <div className={`text-white ${poppins.className}`}>
              <h1 className="text-2xl font-semibold">Cool session</h1>
              <p className="text-white/90 text-sm mt-1">Additional type</p>
              <div className="mt-3 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
                <span>30 min</span>
              </div>
            </div>
            <div className="relative w-70 h-70 mr-4 z-1">
              <Image
                src="/mobile-avatar.png"
                alt="Avatar"
                fill
                className="object-cover"
                style={{ top: "-40px", left: "37px", overflow: "hidden" }}
                priority
              />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
