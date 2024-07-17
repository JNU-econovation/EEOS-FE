//TODO: 답변 취소 아이콘 추가하기

import { useContext, useState } from "react";
import { DashboardContext } from "./DashboardWrapper";
import { PostQuestionParams } from "@/apis/question";
import StatusToggleItem from "@/components/common/StatusToggleItem";
import { usePostQuestion } from "@/hooks/query/useQuestionQuery";

const Input = () => {
  const {
    programValue: { programId },
    teamValues: { teams, selectedTeamId },
    commentValues: {
      create: { parentsCommentId, setParentsCommentId, selectedCommentContent },
    },
  } = useContext(DashboardContext);

  const [questionInput, setQuestionInput] = useState<string>("");

  const { mutate } = usePostQuestion();
  const isReply = parentsCommentId !== -1;
  const selectedTeamName = teams?.find((team) => team.teamId === selectedTeamId)
    ?.teamName;

  const handlePostQuestion = () => {
    const questionContent = questionInput.trim();

    if (!questionContent) return;

    const postQuestionParams: PostQuestionParams = {
      programId,
      teamId: selectedTeamId,
      questionContent,
      parentsCommentId,
    };
    mutate(postQuestionParams);
    setQuestionInput("");
    setParentsCommentId(-1);
  };

  return (
    <div>
      {/* <div className="absolute z-10 text-xl font-bold">{name}</div> */}
      {isReply ? (
        <div className="truncate text-lg font-semibold">
          {/* <Image src={"/icons/x.svg"} alt="답글 종료" width={20} height={20} /> */}
          <button className="px-2 " onClick={() => setParentsCommentId(-1)}>
            x
          </button>
          <p className="inline text-xl font-bold">답변하기 :</p>
          <p className="ml-2 inline opacity-50">{selectedCommentContent}</p>
        </div>
      ) : (
        <p className="text-xl font-bold">@{selectedTeamName} 에게 질문하기</p>
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
          <StatusToggleItem color="green" text="전송" />
        </button>
      </div>
    </div>
  );
};

export default Input;
