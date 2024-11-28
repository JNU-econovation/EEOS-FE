"use client";

import { PostQuestionParams } from "@/apis/question";
import CheckBox from "@/components/common/CheckBox/CheckBox";
import StatusToggleItem from "@/components/common/StatusToggleItem";
import { usePostQuestion } from "@/hooks/query/useQuestionQuery";
import { useGetAccessType } from "@/hooks/useAccess";
import dashboardAtoms from "@/store/dashboardAtoms";
import { TeamInfo } from "@/types/team";
import { useAtom } from "jotai";
import { useState } from "react";

interface DashboardInputProps {
  programId: number;
  selectedTeamId: number;
  teams: TeamInfo[];
}

//TODO: UI 분리하기
const DashboardInput = ({
  programId,
  selectedTeamId,
  teams,
}: DashboardInputProps) => {
  const [isAnonymous, setIsAnonymous] = useAtom(dashboardAtoms.isAnonymous);
  const [questionInput, setQuestionInput] = useAtom(
    dashboardAtoms.questionInput,
  );
  const [selectedCommentId, setSelectedCommentId] = useAtom(
    dashboardAtoms.selectedCommentId,
  );
  const [selectedCommentContent, setSelectedCommentContent] = useAtom(
    dashboardAtoms.selectedCommentContent,
  );

  const { mutate: postQuestion } = usePostQuestion();
  const isReply = selectedCommentId !== -1;
  const selectedTeamName = teams?.find((team) => team.teamId === selectedTeamId)
    ?.teamName;

  const accessType = useGetAccessType();

  const isAbleToPost = accessType === "private";

  const handlePostQuestion = () => {
    const questionContent = questionInput.trim();

    if (!questionContent) return;
    if (!isAbleToPost) return;

    const postQuestionParams: PostQuestionParams = {
      programId,
      teamId: selectedTeamId,
      questionContent,
      parentsCommentId: selectedCommentId,
      isAnonymous,
    };

    postQuestion(postQuestionParams);
    setQuestionInput("");
    setSelectedCommentId(-1);
    setSelectedCommentContent("");
  };

  const resetSelectedComment = () => {
    setSelectedCommentId(-1);
    setSelectedCommentContent("");
  };

  return (
    <div>
      {/* <div className="absolute z-10 text-xl font-bold">{name}</div> */}
      {isReply ? (
        <div className="truncate text-lg font-semibold">
          {/* <Image src={"/icons/x.svg"} alt="답글 종료" width={20} height={20} /> */}
          {/* <button className="px-2 " onClick={() => setselectedCommentId(-1)}> */}
          <button className="px-2 " onClick={resetSelectedComment}>
            x
          </button>
          <p className="inline text-xl font-bold">답변하기 :</p>
          <p className="ml-2 inline opacity-50">{selectedCommentContent}</p>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4">
          <p className="text-xl font-bold">@{selectedTeamName} 에게 질문하기</p>
          <label
            className="flex select-none items-center justify-end gap-2 text-lg"
            onClick={() => setIsAnonymous((prev) => (prev === 0 ? 1 : 0))}
          >
            <CheckBox
              checked={isAnonymous === 1}
              onClick={() => {}}
              className="h-5 w-5"
            />
            익명으로 질문하기
          </label>
        </div>
      )}
      <div className="mb-2 " />
      <div className="relative">
        <textarea
          className={`h-40 w-full resize-none rounded-sm border-2 p-4 px-8 pr-40 text-lg`}
          placeholder="질문을 입력해주세요"
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
        />
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2"
          onClick={handlePostQuestion}
        >
          <StatusToggleItem
            color={isAbleToPost ? "green" : "gray"}
            text="전송"
          />
        </button>
      </div>
    </div>
  );
};

export default DashboardInput;
