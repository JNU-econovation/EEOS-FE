export const CURRENT_VERSION = "v3.1";

interface ReleaseNote {
  title: string;
  content: string;
}

interface ReleaseNoteList {
  [key: string]: ReleaseNote[];
}

const RELEASE_NOTE: ReleaseNoteList = {
  "v3.1": [
    {
      title: "🐣 얼리버드 기능 안내",
      content:
        "얼리버드란? \n출석이 시작되면, 가장 먼저 출석을 완료한 5명을 보여주는 기능이에요. \n말 그대로 'Early Bird'! \n누가 가장 먼저 출석했는지 순위로 확인할 수 있어요.\n오늘의 주간발표엔 어떤 사람이 얼리버드가 될까요?\n출석이 시작된 순간, 도전해보세요 🔥",
    },
    {
      title: "📋 마이페이지 기능 안내",
      content:
        "마이페이지란?\n내 출석 현황과 누적 벌점을 한눈에 확인할 수 있는 기능이에요!\n출석하지 않은 행사가 있다면? 바로가기 버튼으로 쉽게 이동할 수 있어요.\n놓친 출석도 놓치지 마세요 💨",
    },
  ],
};

export default Object.freeze({ RELEASE_NOTE, CURRENT_VERSION });
