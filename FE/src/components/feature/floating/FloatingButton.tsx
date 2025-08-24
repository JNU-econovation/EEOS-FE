"use client";

import Image from "next/image";
import { useState } from "react";
import EventCalender from "./EventCalender";

// TODO: 현재 캘린더릴 띄우는 동작과 ui 가 섞여있음. 리팩토링 필요
const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-14 right-14 z-30">
        <button
          className="rounded-full bg-slate-50 p-4 text-white shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            src="/icons/eeos_logo.svg"
            alt="Floating Button"
            width={24}
            height={24}
          />
        </button>
      </div>
      {isOpen && <EventCalender onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default FloatingButton;
