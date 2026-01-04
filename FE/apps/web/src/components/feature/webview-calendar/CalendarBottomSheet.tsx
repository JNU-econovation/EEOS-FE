"use client";

import { Sheet } from "react-modal-sheet";

const CalendarBottomSheet = () => {
  return (
    <Sheet
      isOpen
      onClose={() => {}}
      detent="content"
      snapPoints={[40, 1]} // 100px는 헤더 높이
      disableDismiss={true}
      initialSnap={1}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div className="h-80 overflow-auto px-4">
            <ul className="flex flex-col gap-4">
              {Array.from({ length: 20 }).map((_, idx) => (
                <li className="rounded-lg border p-4">
                  <span className="text-sm font-medium opacity-60">
                    2025.02.02
                  </span>
                  <p className="text-lg font-bold">
                    Leage of Legend Worlds Final
                  </p>
                  <span
                    className={
                      "inline-block rounded-full bg-blue-500 px-3 py-1 text-xs font-light text-white"
                    }
                  >
                    행사
                  </span>
                </li>
              ))}
              <div className="mt-4" />
            </ul>
          </div>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default CalendarBottomSheet;
