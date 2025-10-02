import React, { PropsWithChildren } from "react";

export default function BookingCard({ children }: PropsWithChildren) {
  return (
    <section className="w-full max-w-[568px] bg-white rounded-2xl shadow-xl p-6 sm:p-10 z-1">
      {children}
    </section>
  );
}
