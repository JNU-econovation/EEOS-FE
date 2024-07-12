import { useContext } from "react";
import { DashboardContext } from "./DashboardWrapper";
import MarkdownViewer from "@/components/common/markdown/MarkdownViewer";
import { useGetQuery } from "@/hooks/query/useQuestion";

const Board = () => {
  const { selectedTeam, programId } = useContext(DashboardContext);
  const { data, isLoading } = useGetQuery(programId, selectedTeam);

  if (isLoading) return <div>Loading...</div>;

  const { comments } = data;

  return (
    <div className="flex h-[36rem] max-h-[36rem] w-full flex-col overflow-y-auto border">
      {comments.map(({ commentId, content, writer, time, answers }) => (
        <Chat
          key={commentId}
          content={content}
          writer={writer}
          time={time}
          answer={answers}
        />
      ))}
    </div>
  );
};

export default Board;

const Chat = ({ content, writer, time, answer }) => {
  return (
    <div className="border p-4">
      <div className="relative my-4 h-2 w-fit translate-y-4 bg-emerald-300">
        <p className="w-fit -translate-y-4 text-lg font-semibold">{writer}</p>
      </div>
      <div>
        <MarkdownViewer value={content} />
      </div>

      <div className="mt-4 flex items-center">
        <span className="opacity-60">{time}</span>
        <div>답변하기</div>
      </div>
      <div className="mt-8 pl-8">
        {answer && (
          <>
            {answer.map(({ commentId, content, writer, time }) => (
              <ReplyChat
                key={commentId}
                content={content}
                writer={writer}
                time={time}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const ReplyChat = ({ writer, content, time }) => {
  return (
    <div className="border bg-slate-100 p-4">
      <p>{writer}</p>
      <p>{content}</p>
      <span>{time}</span>
    </div>
  );
};
