import { useContext, useState } from "react";
import { DashboardContext } from "../../DashboardWrapper";
import MarkdownViewer from "@/components/common/markdown/MarkdownViewer";

interface ChatListProps {
  commentId: number;
  writer: string;
  accessRight: "edit" | "read_only";
  time: string;
  content: string;
  markdownStyle?: string;
}
const ChatList = ({
  writer,
  accessRight,
  commentId,
  content,
  time,
  markdownStyle,
}: ChatListProps) => {
  const {
    commentValues: {
      create: { setParentsCommentId, changeSelectedCommentContent },
      update: { updateComment, isUpdateSuccess },
      delete: { deleteComment, isDeleteSuccess },
    },
  } = useContext(DashboardContext);

  const [userInputToModify, setUserInputToModify] = useState(content);
  const [isModify, setIsModify] = useState(false);

  const handleReply = () => {
    setParentsCommentId(commentId);
    changeSelectedCommentContent(content);
  };

  const toggleIsModify = () => {
    setIsModify((prev) => !prev);
    setUserInputToModify(content);
  };

  const handleUpdateComment = () => {
    if (!isModify) return;

    const newContents = userInputToModify;
    if (!newContents) return;

    if (content === newContents) {
      setIsModify((prev) => !prev);
      return;
    }

    updateComment({ commentId, contents: newContents });
    isUpdateSuccess && setUserInputToModify(newContents);

    setIsModify((prev) => !prev);
  };

  const handleDeleteComment = () => {
    const isOkToDelete = confirm("정말 삭제하시겠습니까?");
    if (!isOkToDelete) return;
    deleteComment(commentId);
    isDeleteSuccess && setUserInputToModify("");
  };
  return (
    <>
      <div className="relative my-4 h-2 w-fit translate-y-4 bg-emerald-300">
        <p className="w-fit -translate-y-4 text-lg font-semibold">{writer}</p>
      </div>
      <div>
        {!isModify && (
          <MarkdownViewer value={content} className={markdownStyle} />
        )}
      </div>
      {isModify && (
        <textarea
          className="mt-4 h-40 w-full rounded-sm border-2 p-4 text-lg"
          value={userInputToModify}
          onChange={(e) => setUserInputToModify(e.target.value)}
        />
      )}
      <div className="mt-4 flex items-center gap-4">
        <span className="opacity-60">{time}</span>
        {!isModify && (
          <>
            <button
              className="opacity-60 transition-all hover:opacity-100"
              onClick={handleReply}
            >
              답변하기
            </button>
            {accessRight === "edit" && (
              <button
                className="opacity-60 transition-all hover:opacity-100"
                onClick={toggleIsModify}
              >
                수정하기
              </button>
            )}
            {accessRight === "edit" && (
              <button
                className="opacity-60 transition-all hover:opacity-100"
                onClick={handleDeleteComment}
              >
                삭제하기
              </button>
            )}
          </>
        )}
        {isModify && (
          <>
            <button
              className="opacity-60 transition-all hover:opacity-100"
              onClick={handleUpdateComment}
            >
              수정완료
            </button>
            <button
              className="opacity-60 transition-all hover:opacity-100"
              onClick={toggleIsModify}
            >
              취소
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ChatList;
