"use client";

import CheckBox from "@/components/common/CheckBox/CheckBox";
import Dimmed from "@/components/common/Dimmed";
import RELEASE, { CURRENT_VERSION } from "@/constants/RELEASE";
import { isReleaseNoteOpen } from "@/store/releaseAtoms";
import { useAtom } from "jotai";
import { useState } from "react";

const ReleaseNote = () => {
  const [curIndex, setCurIndex] = useState(0);
  const [isCheckedDoNotShowAgain, setIsCheckedDoNotShowAgain] = useState(false);
  const [isOpen, setIsOpen] = useAtom(isReleaseNoteOpen);

  const isCheckedDoNotShowAgainBefore = localStorage.getItem(
    `do-not-show-again${CURRENT_VERSION}`,
  );

  if (!isOpen || isCheckedDoNotShowAgainBefore) {
    return null;
  }

  const releaseNotes = RELEASE.RELEASE_NOTE[CURRENT_VERSION];

  const isLast = curIndex === releaseNotes.length - 1;

  const handleGoNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isLast) {
      if (isCheckedDoNotShowAgain) {
        localStorage.setItem(`do-not-show-again${CURRENT_VERSION}`, "true");
      }
      setIsOpen(false);
    } else {
      setCurIndex((prev) => prev + 1);
    }
  };

  const handleGoPrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (curIndex === 0) {
      return;
    }
    setCurIndex((prev) => prev - 1);
  };

  return (
    <Dimmed>
      <div className="absolute left-1/2 top-1/2 min-h-[350px] w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white px-12 py-8 text-gray-40 md:w-[520px]">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold ">
            {releaseNotes[curIndex].title}
          </h3>
          <span className="flex justify-end text-sm font-semibold opacity-50">
            {curIndex + 1} / {releaseNotes.length}
          </span>
        </div>
        <pre className="mt-2 whitespace-pre-wrap font-sans">
          {releaseNotes[curIndex].content}
        </pre>

        <div className="mt-8" />

        <div className="flex items-center justify-between ">
          <div
            className="flex select-none items-center opacity-80"
            onClick={() => setIsCheckedDoNotShowAgain((prev) => !prev)}
          >
            <CheckBox className="!h-5 !w-5" checked={isCheckedDoNotShowAgain} />
            <label className="ml-2 text-sm">다시 보지 않기</label>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="text-gray-60 rounded-lg bg-gray-10 px-4 py-2"
              onClick={handleGoPrev}
            >
              이전
            </button>
            <button
              className="text-gray-60 rounded-lg bg-primary px-4 py-2"
              onClick={handleGoNext}
            >
              {isLast ? "알겠습니다!" : "다음 내용"}
            </button>
          </div>
        </div>
      </div>
    </Dimmed>
  );
};

export default ReleaseNote;
