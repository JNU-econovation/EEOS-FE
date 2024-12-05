"use client";
import { useState } from "react";
import MarkdownViewer from "../markdown/MarkdownViewer";
import { useGetAccessType } from "@/hooks/useAccess";

export interface ChatBoxInnerData {
  commentId: number;
  defaultContent: string;
  time: string;
  markdownStyle: string;
  showReplyButton: boolean;
  writer: string;
  userInputToModify: string;
  setUserInputToModify: (content: string) => void;
  isGuest: boolean;
  hasUpdateRight: boolean;
  toggleIsModify: () => void;
}
export interface UpdateComment extends ChatBoxInnerData {
  newContents: string;
}

interface ChatBoxProps {
  writer: string;
  defaultContent: string;
  time: string;
  markdownStyle?: string;
  showReplyButton?: boolean;
  accessRight: "edit" | "read_only";
  updateComment: (question: UpdateComment) => void;
  deleteComment: (question: ChatBoxInnerData) => void;
  commentId: number;
  handleReply: () => void;
}

const ChatBox = ({
  writer,
  defaultContent,
  time,
  markdownStyle,
  showReplyButton,
  accessRight,
  updateComment,
  commentId, //TODO: 필요 없는지 확인 필요
  deleteComment,
  handleReply,
}: ChatBoxProps) => {
  const [userInputToModify, setUserInputToModify] = useState(defaultContent);
  const [isModifyMode, setIsModify] = useState(false);

  const accessType = useGetAccessType();

  const isGuest = accessType === "public";
  const hasUpdateRight = accessRight === "edit" && !isGuest;

  const toggleIsModify = () => {
    if (!hasUpdateRight) return;
    setIsModify((prev) => !prev);
    setUserInputToModify(defaultContent);
  };

  // const handleReply = () => {
  // setParentsCommentId(commentId);
  // changeSelectedCommentContent(content);
  // };

  const handleUpdateComment = () => {
    if (!isModifyMode) return;

    const newContents = userInputToModify;
    if (!newContents) return;

    if (defaultContent === newContents) {
      setIsModify((prev) => !prev);
      return;
    }

    // updateComment({ commentId, contents: newContents });
    // isUpdateSuccess && setUserInputToModify(newContents);

    updateComment({
      commentId,
      defaultContent,
      hasUpdateRight,
      isGuest,
      markdownStyle,
      showReplyButton,
      time,
      writer,
      toggleIsModify,
      newContents,
      userInputToModify,
      setUserInputToModify,
    });

    setIsModify((prev) => !prev);
  };

  const handleDeleteComment = () => {
    if (!hasUpdateRight) return;

    const isOkToDelete = confirm("정말 삭제하시겠습니까?");
    if (!isOkToDelete) return;

    deleteComment({
      commentId,
      defaultContent,
      time,
      markdownStyle,
      showReplyButton,
      writer,
      userInputToModify,
      setUserInputToModify,
      isGuest,
      hasUpdateRight,
      toggleIsModify,
    });
    // deleteComment({ commentId });
    // isDeleteSuccess && setUserInputToModify("");
  };

  return (
    <>
      <div className="relative my-4 h-2 w-fit translate-y-4 bg-emerald-300">
        <p className="w-fit -translate-y-4 text-lg font-semibold">{writer}</p>
      </div>
      <div>
        {!isModifyMode && (
          <MarkdownViewer value={defaultContent} className={markdownStyle} />
        )}
      </div>
      {isModifyMode && (
        <textarea
          className="mt-4 h-40 w-full rounded-sm border-2 p-4 text-lg"
          value={userInputToModify}
          onChange={(e) => setUserInputToModify(e.target.value)}
        />
      )}
      <div className="mt-4 flex items-center gap-4">
        <span className="opacity-60">{time}</span>
        {!isModifyMode && showReplyButton && (
          <>
            {!isGuest && (
              <button
                className="opacity-60 transition-all hover:opacity-100"
                onClick={handleReply}
              >
                답변하기
              </button>
            )}
            {hasUpdateRight && (
              <button
                className="opacity-60 transition-all hover:opacity-100"
                onClick={toggleIsModify}
              >
                수정하기
              </button>
            )}
            {hasUpdateRight && (
              <button
                className="opacity-60 transition-all hover:opacity-100"
                onClick={handleDeleteComment}
              >
                삭제하기
              </button>
            )}
          </>
        )}
        {isModifyMode && (
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

export default ChatBox;
