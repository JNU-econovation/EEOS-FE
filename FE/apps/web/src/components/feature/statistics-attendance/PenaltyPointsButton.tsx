"use client";

import Button from "@/components/common/Button/Button";
import { useState } from "react";
import { createPortal } from "react-dom";

const PenaltyPointsButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        className="border border-white bg-white transition-all hover:border-primary"
        onClick={() => setIsOpen(true)}
      >
        ⓘ 벌점 가중치 확인하기
      </Button>
      {isOpen &&
        createPortal(
          <button
            className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="rounded-xl bg-white p-12"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-center text-2xl font-bold">
                벌점 가중치 안내
              </h3>
              <div className="mt-8" />
              <div className="mt-4 grid grid-cols-[1fr_2fr_2fr] gap-2 border-b py-2">
                <p></p>
                <p className="text-center">현재 벌점 가중치</p>
                <p className="text-center">수정 후 가중치</p>
              </div>
              <div className="mt-4 grid grid-cols-[1fr_2fr_2fr] gap-2">
                <p className="text-center">지각</p>
                <p className="text-center">1점</p>
                <input
                  type="number"
                  min={0}
                  placeholder="수정 후 가중치"
                  className="w-full justify-center"
                />
              </div>
              <div className="mt-4 grid grid-cols-[1fr_2fr_2fr] gap-2">
                <p className="text-center">불참</p>
                <p className="text-center">5점</p>
                {/* <p className="text-center">-</p> */}
                <input
                  type="number"
                  min={0}
                  placeholder="수정 후 가중치"
                  className="w-full justify-center"
                />
              </div>

              <p className="mt-8 text-center text-sm text-gray-500">
                ⓘ 벌점 제도는 25.09.12 총회에서 개정된 에코노베이션 회칙에
                의거하여 시행됩니다.
              </p>
            </div>
          </button>,
          document.body,
        )}
    </>
  );
};

export default PenaltyPointsButton;
