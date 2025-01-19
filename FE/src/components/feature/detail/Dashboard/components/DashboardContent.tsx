"use client";

import Chat from "@/components/feature/detail/Dashboard/components/Chat";
import { useGetQuestions } from "@/hooks/query/useQuestionQuery";

interface DashboardContentProps {
  programId: number;
  selectedTeamId: number;
}
const DashboardContent = ({
  programId,
  selectedTeamId,
}: DashboardContentProps) => {
  const { data } = useGetQuestions(programId, selectedTeamId);

  const { comments } = data;

  return (
    <div className="flex w-full flex-col rounded-sm">
      {comments.length === 0 && (
        <div className="flex h-full items-center justify-center py-20 text-xl text-gray-30">
          아직 질문이 없습니다. 🥲
        </div>
      )}
      {comments.map((props) => (
        <Chat key={props.commentId} {...props} />
      ))}
    </div>
  );
};

export default DashboardContent;
