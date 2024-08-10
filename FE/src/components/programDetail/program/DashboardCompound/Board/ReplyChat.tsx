import ChatList from "./common/ChatList";
import { Answer } from "@/apis/dtos/question.dto";

interface ReplyChatProps extends Answer {}
const ReplyChat = ({
  commentId,
  content,
  writer,
  time,
  accessRight,
}: ReplyChatProps) => {
  return (
    <div className="border bg-gray-10 p-4">
      <ChatList
        writer={writer}
        content={content}
        time={time}
        commentId={commentId}
        accessRight={accessRight}
        markdownStyle="!bg-inherit"
        showReplyButton={false}
      />
    </div>
  );
};

export default ReplyChat;
