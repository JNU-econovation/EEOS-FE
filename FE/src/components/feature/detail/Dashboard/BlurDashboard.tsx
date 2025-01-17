"use client";
import { TeamInfo } from "@/types/team";
import { Comment } from "@/apis/dtos/question.dto";
import Title from "@/components/common/Title/Title";
import Tab from "@/components/common/tabs/tab/TabCompound/TabCompound";
import Chat from "./components/Chat";

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

const fakeComments: Comment[] = [
  {
    commentId: 1,
    teamId: 1,
    content:
      "교육의 자주성·전문성·정치적 중립성 및 대학의 자율성은 법률이 정하는 바에 의하여 보장된다?? 공무원은 국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다.\n\n중앙선거관리위원회는 법령의 범위안에서 선거관리·국민투표관리 또는 정당사무에 관한 규칙을 제정할 수 있으며, 법률에 저촉되지 아니하는 범위안에서 내부규율에 관한 규칙을 제정할 수 있다?",
    accessRight: "read_only",
    writer: "김이름",
    time: "2021-10-01",
    answers: [
      {
        writer: "뭐에요",
        content:
          "통신·방송의 시설기준과 신문의 기능을 보장하기 위하여 필요한 사항은 법률로 정한다. 평화통일정책의 수립에 관한 대통령의 자문에 응하기 위하여 민주평화통일자문회의를 둘 수 있다.\n\n국무위원은 국무총리의 제청으로 대통령이 임명한다. 대통령은 조약을 체결·비준하고, 외교사절을 신임·접수 또는 파견하며, 선전포고와 강화를 한다.",
        accessRight: "read_only",
        commentId: 1,
        time: "2021-10-01",
      },
      {
        writer: "김길동",
        content: "답변1입니다. 저의 생각도 동일합니다.",
        accessRight: "read_only",
        commentId: 1,
        time: "2021-10-01",
      },
    ],
  },
  {
    commentId: 10,
    teamId: 1,
    content:
      "교육의 자주성·전문성·정치적 중립성 및 대학의 자율성은 법률이 정하는 바에 의하여 보장된다?? 공무원은 국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다.\n\n중앙선거관리위원회는 법령의 범위안에서 선거관리·국민투표관리 또는 정당사무에 관한 규칙을 제정할 수 있으며, 법률에 저촉되지 아니하는 범위안에서 내부규율에 관한 규칙을 제정할 수 있다?",
    accessRight: "read_only",
    writer: "김이름",
    time: "2021-10-01",
    answers: [
      {
        writer: "뭐에요",
        content:
          "통신·방송의 시설기준과 신문의 기능을 보장하기 위하여 필요한 사항은 법률로 정한다. 평화통일정책의 수립에 관한 대통령의 자문에 응하기 위하여 민주평화통일자문회의를 둘 수 있다.\n\n국무위원은 국무총리의 제청으로 대통령이 임명한다. 대통령은 조약을 체결·비준하고, 외교사절을 신임·접수 또는 파견하며, 선전포고와 강화를 한다.",
        accessRight: "read_only",
        commentId: 1,
        time: "2021-10-01",
      },
    ],
  },
];

const BlurDashboard = () => {
  const teamNameArray = fakeTeams.map(({ teamName }) => teamName);

  return (
    <>
      <Title text="질문 게시판" textSize="xl" />
      <div className="mt-4" />
      <div className="pointer-events-none select-none blur-sm">
        {/* tab */}
        <Tab<string>
          align="line"
          defaultSelected={`${fakeTeams[0].teamName}`}
          nonPickedColor="white"
          pickedColor="white"
          tabItemList={teamNameArray}
          tabSize="md"
        >
          <Tab.List className="gap-0 border-b">
            {teamNameArray.map((name, index) => (
              <Tab.NakedItem key={`${name}-${index}`} text={name} />
            ))}
          </Tab.List>

          {fakeComments.map((props) => (
            <Chat key={props.commentId} {...props} />
          ))}
        </Tab>
      </div>
    </>
  );
};

export default BlurDashboard;
