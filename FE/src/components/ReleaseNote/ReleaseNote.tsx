"use client";

import { ReactElement } from "react";
import CheckBox from "@/components/common/CheckBox/CheckBox";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";

const Dimmed = ({ children }: { children: ReactElement }) => {
  return (
    <div className="fixed inset-0 left-0 top-0 z-50 bg-black bg-opacity-50">
      {children}
    </div>
  );
};

const doNotShowAgain = atomWithStorage("don't-show-again-3.0", false);

const CONTENT = `
얼리버드란?
출석이 시작되면, 가장 먼저 출석을 완료한 5명을 보여주는 기능이에요.
말 그대로 'Early Bird'!
누가 가장 먼저 출석했는지 순위로 확인할 수 있어요.
오늘의 주간발표엔 어떤 사람이 얼리버드가 될까요?
출석이 시작된 순간, 도전해보세요 🔥
`;

const ReleaseNote = () => {
  const [isCheckedDoNotShowAgain, setIsCheckedDoNotShowAgain] =
    useAtom(doNotShowAgain);

  return (
    <Dimmed>
      <div className="absolute left-1/2 top-1/2 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white px-12 py-8 text-gray-40 md:w-[520px]">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold ">🐣 얼리버드 기능 안내</h3>
          <span className="flex justify-end text-sm font-semibold opacity-50">
            1/4
          </span>
        </div>
        <pre className="mt-2 whitespace-pre-wrap font-sans">{CONTENT}</pre>

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
            <button className="text-gray-60 rounded-lg bg-gray-10 px-4 py-2">
              이전
            </button>
            <button className="text-gray-60 rounded-lg bg-primary px-4 py-2">
              다음
            </button>
          </div>
        </div>
      </div>
    </Dimmed>
  );
};

export default ReleaseNote;
