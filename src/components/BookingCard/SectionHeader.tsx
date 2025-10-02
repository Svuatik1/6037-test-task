import React from "react";
import { Kaisei_Tokumin, Poppins } from "next/font/google";

const kaiseiTokumin = Kaisei_Tokumin({ subsets: ["latin"], weight: "700" });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 text-center sm:text-left">
      <h2
        className={`${kaiseiTokumin.className} text-[24px] sm:text-[28px] leading-none font-bold text-[#16171B] sm:block flex`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`${poppins.className} text-[14px] leading-none text-[#8F91A1] max-w-prose mx-auto sm:mx-0 sm:text-start text-start`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
