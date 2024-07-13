import { useContext } from "react";
import { DashboardContext } from "./DashboardWrapper";
import { PostQuestionParams } from "@/apis/question";
import StatusToggleItem from "@/components/common/StatusToggleItem";
import { usePostQuestion } from "@/hooks/query/useQuestion";

const Input = () => {
  const { questionInput, setQuestionInput, name, selectedTeamId, programId } =
    useContext(DashboardContext);
  const { mutate } = usePostQuestion();

  const handlePostQuestion = () => {
    const questionContent = questionInput.trim();

    if (!questionContent) return;

    const postQuestionParams: PostQuestionParams = {
      programId,
      teamId: selectedTeamId,
      questionContent,
      parentsCommentId: -1,
    };

    mutate(postQuestionParams);
    setQuestionInput("");
  };

  return (
    <div className="relative">
      <div className="absolute z-10 text-xl font-bold">{name}</div>
      <textarea
        className="h-40 w-full resize-none rounded-sm border-2 p-4"
        placeholder="질문을 입력해주세요"
        value={questionInput}
        onChange={(e) => setQuestionInput(e.target.value)}
      />
      <div
        className="absolute right-4 top-1/2"
        onClick={handlePostQuestion}
        typeof="button"
      >
        <StatusToggleItem color="green" text="질문 하기" />
      </div>
    </div>
  );
};

export default Input;
