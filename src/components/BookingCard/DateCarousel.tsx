"use client";

import React from "react";
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

type DateCarouselProps = {
  startDate: Date;
  weeksAhead?: number;
  selectedDate?: Date | null;
  onSelect: (date: Date) => void;
};

export default function DateCarousel({
  startDate,
  weeksAhead = 6,
  selectedDate,
  onSelect,
}: DateCarouselProps) {
  const items = Array.from({ length: weeksAhead * 7 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    return d;
  });

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const [startIndex, setStartIndex] = React.useState(0);
  const visibleCount = 6;
  const canPrev = startIndex > 0;
  const canNext = startIndex + visibleCount < items.length;
  const slice = items.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="relative py-2">
      <button
        aria-label="Previous days"
        className={`absolute -left-6 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center text-2xl opacity-40 text-[#16171B] z-20 cursor-not-allowed ${
          canPrev && "opacity-100 cursor-pointer"
        }`}
        onClick={() => canPrev && setStartIndex((i) => Math.max(0, i - 1))}
        disabled={!canPrev}
      >
        ‹
      </button>
      <div className="flex items-center gap-2 px-10 overflow-hidden">
        {slice.map((d, idx) => {
          const active = selectedDate ? isSameDay(d, selectedDate) : false;
          const day = new Intl.DateTimeFormat("en-US", {
            weekday: "short",
          }).format(d);
          const dateNum = d.getDate();
          const isLastVisible = idx === slice.length - 1 && canNext;
          return (
            <button
              key={d.toISOString()}
              onClick={() => onSelect(d)}
              className={`relative overflow-hidden min-w-[64px] px-3 py-2 rounded-xl border text-sm cursor-pointer ${
                poppins.className
              } ${
                active
                  ? "bg-[#F7F7FC] text-[#DE3A6B] border-0"
                  : "bg-white text-neutral-900 border-neutral-200"
              }`}
            >
              <div className="font-medium">{day}</div>
              <div
                className={`${active ? "text-[#DE3A6B]" : "text-neutral-500"}`}
              >
                {dateNum}
              </div>
              {isLastVisible ? (
                <span className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/70 to-transparent backdrop-blur-[1px]" />
              ) : null}
            </button>
          );
        })}
      </div>
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />
      <button
        aria-label="Next days"
        className={`absolute -right-6 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center text-2xl opacity-40 text-[#16171B] z-20 cursor-not-allowed ${
          canNext && "opacity-100 cursor-pointer"
        }`}
        onClick={() =>
          canNext &&
          setStartIndex((i) => Math.min(items.length - visibleCount, i + 1))
        }
        disabled={!canNext}
      >
        ›
      </button>
    </div>
  );
}
