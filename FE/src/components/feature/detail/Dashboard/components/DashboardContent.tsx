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
  const { data, isLoading, error } = useGetQuestions(programId, selectedTeamId);

  // TODO: Loader 적용, 에러 처리
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const { comments } = data;

  return (
    <div className="flex max-h-[36rem] w-full flex-col overflow-hidden overflow-y-auto rounded-sm border">
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
