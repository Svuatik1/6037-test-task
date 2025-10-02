"use client";

import GradientBackground from "@/components/GradientBackground";
import BookingCard from "@/components/BookingCard/BookingCard";
import UserAvatar from "@/components/BookingCard/UserAvatar";
import SectionHeader from "@/components/BookingCard/SectionHeader";
import DateCarousel from "@/components/BookingCard/DateCarousel";
import TimePicker from "@/components/BookingCard/TimePicker";
import ConfirmButton from "@/components/BookingCard/ConfirmButton";
import { BookingProvider, useBooking } from "@/context/BookingContext";

function BookingContent() {
  const { selectedDate, setDate, selectedTime, setTime, confirm } =
    useBooking();
  const today = new Date();
  return (
    <>
      <BookingCard>
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 sm:gap-6 items-center px-4 sm:px-8">
          <div className="hidden md:block">
            <UserAvatar />
          </div>

          <SectionHeader
            title="Book a Session"
            subtitle="Choose a date and time that is convenient for you to e‑meet your stylist"
          />
        </div>

        <div className="sm:mt-[60px] mt-4">
          <DateCarousel
            startDate={today}
            selectedDate={selectedDate ?? undefined}
            onSelect={setDate}
          />
        </div>

        {selectedDate ? (
          <div className="mt-4">
            <TimePicker
              date={selectedDate}
              selectedTime={selectedTime}
              onSelect={setTime}
            />
          </div>
        ) : null}

        <ConfirmButton
          disabled={!selectedDate || !selectedTime}
          onClick={confirm}
        />
      </BookingCard>
    </>
  );
}

export default function Home() {
  return (
    <GradientBackground>
      <BookingProvider>
        <BookingContent />
      </BookingProvider>
    </GradientBackground>
  );
}
