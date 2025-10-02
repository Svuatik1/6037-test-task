"use client";

import React from "react";
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

type TimePickerProps = {
  date: Date | null;
  intervalMinutes?: number;
  selectedTime?: string | null;
  onSelect: (time: string) => void;
};

function buildTimes(intervalMinutes: number) {
  const times: string[] = [];
  for (let h = 9; h <= 18; h += 1) {
    for (let m = 0; m < 60; m += intervalMinutes) {
      const hour = h.toString().padStart(2, "0");
      const minute = m.toString().padStart(2, "0");
      times.push(`${hour}:${minute}`);
    }
  }
  return times;
}

function to12hLabel(time: string) {
  const [hStr, mStr] = time.split(":");
  let h = Number(hStr);
  const suffix = h >= 12 ? "PM" : "AM";
  if (h === 0) h = 12;
  if (h > 12) h -= 12;
  return `${h}:${mStr} ${suffix}`;
}

export default function TimePicker({
  date,
  intervalMinutes = 15,
  selectedTime,
  onSelect,
}: TimePickerProps) {
  const times = React.useMemo(
    () => buildTimes(intervalMinutes),
    [intervalMinutes]
  );

  const [startIndex, setStartIndex] = React.useState(0);
  const visibleCount = 5;
  const canPrev = startIndex > 0;
  const canNext = startIndex + visibleCount < times.length;
  const slice = times.slice(startIndex, startIndex + visibleCount);

  return (
    <div className="relative py-2">
      <button
        aria-label="Previous times"
        className={`absolute -left-6 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center text-2xl opacity-40 text-[#16171B] z-20 cursor-not-allowed ${
          canPrev && "opacity-100 cursor-pointer"
        }`}
        onClick={() => canPrev && setStartIndex((i) => Math.max(0, i - 1))}
        disabled={!canPrev}
      >
        ‹
      </button>
      <div className="flex items-center gap-2 pl-10 pr-32 overflow-hidden">
        {slice.map((t, idx) => {
          const active = selectedTime === t;
          const isLastVisible = idx === slice.length - 1 && canNext;
          return (
            <button
              key={t}
              onClick={() => onSelect(t)}
              className={`relative overflow-hidden inline-flex items-center justify-center h-12 min-w-[78px] px-3 rounded-full border text-sm whitespace-nowrap cursor-pointer ${
                poppins.className
              } ${
                active
                  ? "bg-[#F7F7FC] text-[#DE3A6B] border-0"
                  : "bg-white text-neutral-900 border-neutral-200"
              }`}
            >
              {to12hLabel(t)}
              {isLastVisible ? (
                <span className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/70 to-transparent backdrop-blur-[1px]" />
              ) : null}
            </button>
          );
        })}
      </div>
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
      <button
        aria-label="Next times"
        className={`absolute -right-6 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center text-2xl opacity-40 text-[#16171B] z-20 cursor-not-allowed ${
          canNext && "opacity-100 cursor-pointer"
        }`}
        onClick={() =>
          canNext &&
          setStartIndex((i) => Math.min(times.length - visibleCount, i + 1))
        }
        disabled={!canNext}
      >
        ›
      </button>
    </div>
  );
}
