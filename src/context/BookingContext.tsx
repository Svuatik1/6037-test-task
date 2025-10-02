"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

type BookingState = {
  selectedDate: Date | null;
  selectedTime: string | null;
  setDate: (date: Date | null) => void;
  setTime: (time: string | null) => void;
  confirm: () => void;
};

const BookingContext = createContext<BookingState | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const value = useMemo<BookingState>(
    () => ({
      selectedDate,
      selectedTime,
      setDate: setSelectedDate,
      setTime: setSelectedTime,
      confirm: () => {
        if (!selectedDate || !selectedTime) return;
        const [h, m] = selectedTime.split(":").map(Number);
        const dt = new Date(selectedDate);
        dt.setHours(h, m, 0, 0);
        console.log({ timestamp: Math.floor(dt.getTime() / 1000) });
      },
    }),
    [selectedDate, selectedTime]
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}
