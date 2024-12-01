import { TeamInfo } from "@/types/team";
import { Comment } from "@/apis/dtos/question.dto";
import Chat from "./components/Chat";
import CheckBox from "@/components/common/CheckBox/CheckBox";
import StatusToggleItem from "@/components/common/StatusToggleItem";
import Title from "@/components/common/Title/Title";
import classNames from "classnames";

const fakeTeams: TeamInfo[] = [
  {
    teamId: 1,
    teamName: "Blackcompany",
  },
  {
    teamId: 2,
    teamName: "whitecompany",
  },
  {
    teamId: 3,
    teamName: "Team3",
  },
  {
    teamId: 4,
    teamName: "이름이 어떻게",
  },
  {
    teamId: 5,
    teamName: "econo",
  },
];

const comments: Comment[] = [
  {
    commentId: 1,
    teamId: 1,
    content:
      "교육의 자주성·전문성·정치적 중립성 및 대학의 자율성은 법률이 정하는 바에 의하여 보장된다?? 공무원은 국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다.\n\n중앙선거관리위원회는 법령의 범위안에서 선거관리·국민투표관리 또는 정당사무에 관한 규칙을 제정할 수 있으며, 법률에 저촉되지 아니하는 범위안에서 내부규율에 관한 규칙을 제정할 수 있다?",
    accessRight: "read_only",
    writer: "이르음",
    time: "2021-10-01",
    answers: [
      {
        writer: "홍길동",
        content:
          "통신·방송의 시설기준과 신문의 기능을 보장하기 위하여 필요한 사항은 법률로 정한다. 평화통일정책의 수립에 관한 대통령의 자문에 응하기 위하여 민주평화통일자문회의를 둘 수 있다.\n\n국무위원은 국무총리의 제청으로 대통령이 임명한다. 대통령은 조약을 체결·비준하고, 외교사절을 신임·접수 또는 파견하며, 선전포고와 강화를 한다.",
        accessRight: "read_only",
        commentId: 1,
        time: "2021-10-01",
      },
      {
        writer: "김똥개",
        content: "답변1",
        accessRight: "read_only",
        commentId: 1,
        time: "2021-10-01",
      },
    ],
  },
];

const BlurDashboard = () => {
  return (
    <>
      <Title text="질문 게시판" />
      <div className="mt-4" />
      <div className="pointer-events-none select-none blur-sm">
        {/* tab */}
        <div className="flex gap-4">
          {fakeTeams.map(({ teamName }, i) => (
            <button
              className={classNames(
                "flex h-fit w-fit min-w-[5rem] items-center justify-center rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold",
                {
                  "bg-paragraph text-background": i === 0,
                },
              )}
            >
              <p>{teamName}</p>
            </button>
          ))}
        </div>

        {/* content */}
        <div className="mt-8 flex flex-col gap-8">
          <div className="flex max-h-[36rem] w-full flex-col overflow-hidden overflow-y-auto rounded-sm border">
            {comments.map((props) => (
              <Chat key={props.commentId} {...props} />
            ))}
          </div>

          {/* input */}
          <div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-xl font-bold">@Blackcompany 에게 질문하기</p>
              <label className="flex select-none items-center justify-end gap-2 text-lg">
                <CheckBox checked={false} className="h-5 w-5" />
                익명으로 질문하기
              </label>
            </div>
            <div className="mb-2 " />
            <div className="relative">
              <textarea
                className={`h-40 w-full resize-none rounded-sm border-2 p-4 px-8 pr-40 text-lg`}
                placeholder="질문을 입력해주세요"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2">
                <StatusToggleItem color="green" text="전송" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlurDashboard;
