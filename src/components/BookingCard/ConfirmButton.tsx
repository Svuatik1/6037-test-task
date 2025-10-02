import React from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });

type ConfirmButtonProps = {
  disabled?: boolean;
  onClick: () => void;
};

export default function ConfirmButton({
  disabled,
  onClick,
}: ConfirmButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`mt-16 sm:mt-[150px] w-full sm:w-[70%] m-auto flex justify-center rounded-full bg-[#16171B] text-white py-5 text-[18px] leading-none font-medium ${poppins.className} disabled:bg-[#E7E7F1] disabled:text-[#B7B8C8] disabled:cursor-not-allowed cursor-pointer`}
    >
      Confirm
    </button>
  );
}
