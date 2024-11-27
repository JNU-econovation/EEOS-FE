import { Comment } from "@/apis/dtos/question.dto";
import ChatList from "../../DashboardCompound/Board/common/ChatList";
import ReplyChat from "../../DashboardCompound/Board/ReplyChat";

const DashboardContentChatBox = ({
  commentId,
  content,
  writer,
  time,
  answers,
  accessRight,
}: Comment) => {
  return (
    <div className="border p-4">
      <ChatList
        commentId={commentId}
        writer={writer}
        accessRight={accessRight}
        time={time}
        content={content}
      />
      <div className="mt-8 px-14">
        {answers && (
          <>
            {answers.map((props) => (
              <ReplyChat key={props.commentId} {...props} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardContentChatBox;
