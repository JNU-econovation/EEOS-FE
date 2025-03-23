"use client";

import {
  useDeleteQuestion,
  useUpdateQuestion,
} from "@/hooks/query/useQuestionQuery";
import ChatBox, {
  ChatBoxInnerData,
  UpdateComment,
} from "@/components/common/dashboard/ChatBox";
import { useSetAtom } from "jotai";
import dashboardAtoms from "@/store/dashboardAtoms";

interface ChatListProps {
  commentId: number;
  writer: string;
  accessRight: "edit" | "read_only";
  time: number;
  content: string;
  markdownStyle?: string;
  showReplyButton?: boolean;
}
const ChatList = ({
  writer,
  accessRight,
  commentId,
  content,
  time,
  markdownStyle,
  showReplyButton = true,
}: ChatListProps) => {
  const setSelectedCommentId = useSetAtom(dashboardAtoms.selectedCommentId);
  const setSelectedCommentContent = useSetAtom(
    dashboardAtoms.selectedCommentContent,
  );
  const setIsAnonymous = useSetAtom(dashboardAtoms.commentType);

  const { mutate: updateComment, isSuccess: isUpdateSuccess } =
    useUpdateQuestion();
  const { mutate: deleteComment, isSuccess: isDeleteSuccess } =
    useDeleteQuestion();

  const handleReply = () => {
    setSelectedCommentId(commentId);
    setSelectedCommentContent(content);
    setIsAnonymous("NON_ANONYMOUS");
  };

  const handleUpdateComment = ({
    newContents,
    setUserInputToModify,
  }: UpdateComment) => {
    updateComment({ commentId, contents: newContents });
    isUpdateSuccess && setUserInputToModify(newContents);
  };

  const handleDeleteComment = ({ setUserInputToModify }: ChatBoxInnerData) => {
    deleteComment(commentId);
    isDeleteSuccess && setUserInputToModify("");
  };

  return (
    <ChatBox
      writer={writer}
      accessRight={accessRight}
      commentId={commentId}
      defaultContent={content}
      deleteComment={handleDeleteComment}
      handleReply={handleReply}
      time={time}
      updateComment={handleUpdateComment}
      markdownStyle={markdownStyle}
      showReplyButton={showReplyButton}
    />
  );
};

export default ChatList;
