"use client";

import { PostQuestionParams } from "@/apis/question";
import CheckBox from "@/components/common/CheckBox/CheckBox";
import { Send } from "@/components/icons";
import { usePostQuestion } from "@/hooks/query/useQuestionQuery";
import { useGetAccessType } from "@/hooks/useAccess";
import dashboardAtoms from "@/store/dashboardAtoms";
import { useAtom } from "jotai";

interface DashboardInputProps {
  programId: number;
  selectedTeamId: number;
  selectedTeamName: string;
}

//TODO: UI 분리하기
const DashboardInput = ({
  programId,
  selectedTeamId,
  selectedTeamName,
}: DashboardInputProps) => {
  const [commentType, setCommentType] = useAtom(dashboardAtoms.commentType);
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
      commentType,
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
    <div className="rounded-b-sm bg-gray-10 px-6 py-8">
      {isReply ? (
        <div className="truncate text-lg font-semibold">
          <button className="px-2" onClick={resetSelectedComment}>
            x
          </button>
          <p className="inline font-bold">답변하기 :</p>
          <p className="ml-2 inline opacity-50">{selectedCommentContent}</p>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4">
          <p className="text-lg font-bold">@{selectedTeamName} 에게 질문하기</p>
          <label
            className="flex select-none items-center justify-end gap-2 text-base text-gray-30"
            onClick={() =>
              setCommentType((prev) =>
                prev === "ANONYMOUS" ? "NON_ANONYMOUS" : "ANONYMOUS",
              )
            }
          >
            <CheckBox checked={commentType === "ANONYMOUS"} className="h-2" />
            익명으로 질문하기
          </label>
        </div>
      )}
      <div className="mt-2" />
      <div className="relative">
        <textarea
          className="min-h-28 w-full rounded-sm p-4 px-8 pr-40"
          placeholder="질문을 입력해주세요"
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
        />
        <button
          className="absolute right-8 top-1/2 -translate-y-1/2"
          onClick={handlePostQuestion}
        >
          <Send />
        </button>
      </div>
    </div>
  );
};

export default DashboardInput;
