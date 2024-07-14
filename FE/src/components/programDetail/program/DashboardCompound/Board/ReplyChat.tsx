import ChatList from "./common/ChatList";
import { Answer } from "@/apis/dtos/question.dto";

interface ReplyChatProps extends Answer {
  isGuest: boolean;
}
const ReplyChat = ({
  writer,
  content,
  time,
  commentId,
  accessRight,
  isGuest,
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
        isGuest={isGuest}
      />
    </div>
  );
};

export default ReplyChat;
