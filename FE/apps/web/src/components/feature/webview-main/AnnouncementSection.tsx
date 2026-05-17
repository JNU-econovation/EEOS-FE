"use client";

import MarkdownViewer from "@/components/common/markdown/MarkdownViewer";
import Spacing from "@/components/common/Spacing";
import { useAnnouncementsQuery } from "@/hooks/query/useAnnouncementsQuery";
import { useState } from "react";

const AnnouncementSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: announcements, isLoading, error } = useAnnouncementsQuery();

  if (isLoading || !announcements) {
    return <p>공지사항을 불러오는 중입니다...</p>;
  }

  if (error) {
    return <p>공지사항을 불러오는 중 오류가 발생했습니다.</p>;
  }

  return (
    <section>
      <p className="text-xs font-medium text-[#767676]">일정 리마인드</p>
      <h2 className="text-lg font-semibold">에코노베이션 공지사항</h2>
      <Spacing size={0.75} direction="vertical" />
      <ul className="flex flex-col gap-2">
        {announcements.slice(0, 3).map(({ id, title, body, announcedAt }) => (
          <li key={id} className="gap-4 rounded-lg bg-[#F2F2F7] p-3">
            <div className="flex items-center gap-1">
              {!isOpen && (
                <p className="shrink-0 text-sm font-medium">
                  {new Date(announcedAt).toLocaleDateString("ko-KR", {
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
              )}
              <h3 className="font-medium">{title}</h3>
            </div>

            {isOpen && (
              <>
                <Spacing size={20} unit="px" direction="vertical" />
                <MarkdownViewer
                  value={body}
                  className="!bg-transparent !p-0 !h-auto !overflow-visible text-sm text-[#767676]"
                />
                <div>
                  <Spacing size={20} unit="px" direction="vertical" />
                  <p className="text-right text-xs text-[#767676]">
                    {new Date(announcedAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <Spacing size={0.5} direction="vertical" />
      <button
        className="w-full rounded-sm bg-[#fafafc] p-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "접기" : "더보기"}
      </button>
    </section>
  );
};

export default AnnouncementSection;
