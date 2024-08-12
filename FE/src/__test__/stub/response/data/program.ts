/**
 * @url /programs
 * @method GET
 */
export const programs = {
  size: 10,
  page: 1,
  totalPage: 5,
  programs: [
    {
      programId: 0,
      title: "행사이름 0",
      deadLine: "1695691732000",
      category: "exampleCategory",
      programStatus: "exampleStatus",
      type: "demand",
      attendMode: "attend",
    },
    {
      programId: 1,
      title: "행사이름 1",
      deadLine: "1695691732000",
      category: "exampleCategory",
      programStatus: "exampleStatus",
      type: "notification",
      attendMode: "attend",
    },
    {
      programId: 2,
      title: "행사이름 2",
      deadLine: "1695691732000",
      category: "exampleCategory",
      programStatus: "exampleStatus",
      type: "demand",
      attendMode: "attend",
    },
    {
      programId: 3,
      title: "행사이름 3",
      deadLine: "1695691732000",
      category: "exampleCategory",
      programStatus: "exampleStatus",
      type: "notification",
      attendMode: "attend",
    },
    {
      programId: 4,
      title: "행사이름 4",
      deadLine: "1695691732000",
      category: "exampleCategory",
      programStatus: "exampleStatus",
      type: "demand",
      attendMode: "attend",
    },
    {
      programId: 5,
      title: "행사이름 5",
      deadLine: "1695691732000",
      category: "exampleCategory",
      programStatus: "exampleStatus",
      type: "notification",
      attendMode: "attend",
    },
    {
      programId: 6,
      title: "행사이름 6",
      deadLine: "1695691732000",
      category: "exampleCategory",
      programStatus: "exampleStatus",
      type: "demand",
      attendMode: "attend",
    },
    {
      programId: 7,
      title: "행사이름 7",
      deadLine: "1695691732000",
      category: "exampleCategory",
      programStatus: "exampleStatus",
      type: "notification",
      attendMode: "attend",
    },
    {
      programId: 8,
      title: "행사이름 8",
      deadLine: "1695691732000",
      category: "exampleCategory",
      programStatus: "exampleStatus",
      type: "demand",
      attendMode: "attend",
    },
    {
      programId: 9,
      title: "행사이름 9",
      deadLine: "1695691732000",
      category: "exampleCategory",
      programStatus: "exampleStatus",
      type: "notification",
      attendMode: "attend",
    },
  ],
};

/**
 * @url programs/:programId/members
 * @method GET
 * @description 프로그램에 참여한 멤버 리스트
 */
export const programMembers = {
  members: [
    {
      memberId: 0,
      name: "25기 김이박",
      attendStatus: "attend",
      activeStatus: "am",
    },
    {
      memberId: 1,
      name: "25기 홍길동",
      attendStatus: "late",
      activeStatus: "rm",
    },
    {
      memberId: 2,
      name: "25기 김똥개",
      attendStatus: "absent",
      activeStatus: "cm",
    },
    {
      memberId: 3,
      name: "25기 아무개",
      attendStatus: "nonResponse",
      activeStatus: "ob",
    },
    {
      memberId: 4,
      name: "25기 홍길동",
      attendStatus: "attend",
      activeStatus: "am",
    },
    {
      memberId: 5,
      name: "25기 홍길동",
      attendStatus: "late",
      activeStatus: "rm",
    },
    {
      memberId: 6,
      name: "25기 아무런",
      attendStatus: "nonRelated",
      activeStatus: "cm",
    },
    {
      memberId: 7,
      name: "25기 이이름",
      attendStatus: "attend",
      activeStatus: "ob",
    },
    {
      memberId: 8,
      name: "25기 홍길동",
      attendStatus: "absent",
      activeStatus: "am",
    },
    {
      memberId: 9,
      name: "25기 김이박",
      attendStatus: "nonResponse",
      activeStatus: "rm",
    },
    {
      memberId: 10,
      name: "25기 김이박",
      attendStatus: "attend",
      activeStatus: "cm",
    },
    {
      memberId: 11,
      name: "25기 홍길동",
      attendStatus: "late",
      activeStatus: "ob",
    },
    {
      memberId: 12,
      name: "25기 김똥개",
      attendStatus: "absent",
      activeStatus: "am",
    },
    {
      memberId: 13,
      name: "25기 아무개",
      attendStatus: "nonRelated",
      activeStatus: "rm",
    },
    {
      memberId: 14,
      name: "25기 홍길동",
      attendStatus: "attend",
      activeStatus: "cm",
    },
    {
      memberId: 15,
      name: "25기 홍길동",
      attendStatus: "late",
      activeStatus: "ob",
    },
    {
      memberId: 16,
      name: "25기 아무런",
      attendStatus: "nonResponse",
      activeStatus: "am",
    },
    {
      memberId: 17,
      name: "25기 이이름",
      attendStatus: "attend",
      activeStatus: "rm",
    },
    {
      memberId: 18,
      name: "25기 홍길동",
      attendStatus: "absent",
      activeStatus: "cm",
    },
    {
      memberId: 19,
      name: "25기 김이박",
      attendStatus: "nonRelated",
      activeStatus: "ob",
    },
    {
      memberId: 20,
      name: "25기 김이박",
      attendStatus: "attend",
      activeStatus: "am",
    },
    {
      memberId: 21,
      name: "25기 홍길동",
      attendStatus: "late",
      activeStatus: "rm",
    },
    {
      memberId: 22,
      name: "25기 김똥개",
      attendStatus: "absent",
      activeStatus: "cm",
    },
    {
      memberId: 23,
      name: "25기 아무개",
      attendStatus: "nonResponse",
      activeStatus: "ob",
    },
    {
      memberId: 24,
      name: "25기 홍길동",
      attendStatus: "attend",
      activeStatus: "am",
    },
    {
      memberId: 25,
      name: "25기 홍길동",
      attendStatus: "late",
      activeStatus: "rm",
    },
    {
      memberId: 26,
      name: "25기 아무런",
      attendStatus: "nonRelated",
      activeStatus: "cm",
    },
    {
      memberId: 27,
      name: "25기 이이름",
      attendStatus: "attend",
      activeStatus: "ob",
    },
    {
      memberId: 28,
      name: "25기 홍길동",
      attendStatus: "absent",
      activeStatus: "am",
    },
    {
      memberId: 29,
      name: "25기 김이박",
      attendStatus: "nonResponse",
      activeStatus: "rm",
    },
    {
      memberId: 30,
      name: "25기 김이박",
      attendStatus: "attend",
      activeStatus: "cm",
    },
  ],
};

/**
 * @url programs/:programId
 * @method GET
 * @description 프로그램 (상세정보) 조회
 */
export const program = {
  programId: 1,
  title: "주간 발표 B팀",
  deadLine: "1795691732000",
  content:
    "[주간발표 공지]\n금일 B팀의 주간발표가 있습니다.\n\n - 일시: 10월 13일 (금) 17시~\n - 장소: 정보화본부 109호\n - 발표팀\n     - 발표자료 업로드\n    - 16:00까지 깃허브에 각 팀 폴더 생성 후 발표자료 업로드\n     - 발표자료 업로드 가이드 (막힌다면 언제든지 DM 주세요!)\n - 발표 순서는 추후 공지합니다.[주간발표 공지]\n금일 B팀의 주간발표가 있습니다.\n\n - 일시: 10월 13일 (금) 17시~\n - 장소: 정보화본부 109호\n - 발표팀\n     \n- 발표자료 업로드\n    - 16:00까지 깃허브에 각 팀 폴더 생성 후 발표자료 업로드\n     - 발표자료 업로드 가이드 (막힌다면 언제든지 DM 주세요!)\n - 발표 순서는 추후 공지합니다.",
  category: "weekly",
  programStatus: "active",
  type: "demand",
  accessRight: "edit",
  programGithubUrl:
    "https://github.com/JNU-econovation/weekly_presentation/tree/2024-1/2024-1/A_team/1st",
  eventStatus: "active",
  attendMode: "attend",
};

/**
 * @url guest/programs/:programId
 * @method GET
 * @description [guest] 프로그램 조회
 */
export const guestProgram = {
  programId: 1,
  title: "주간 발표 B팀",
  deadLine: "1795691732000",
  content:
    "[주간발표 공지]\n금일 B팀의 주간발표가 있습니다.\n\n - 일시: 10월 13일 (금) 17시~\n - 장소: 정보화본부 109호\n - 발표팀\n     - 발표자료 업로드\n    - 16:00까지 깃허브에 각 팀 폴더 생성 후 발표자료 업로드\n     - 발표자료 업로드 가이드 (막힌다면 언제든지 DM 주세요!)\n - 발표 순서는 추후 공지합니다.[주간발표 공지]\n금일 B팀의 주간발표가 있습니다.\n\n - 일시: 10월 13일 (금) 17시~\n - 장소: 정보화본부 109호\n - 발표팀\n     \n- 발표자료 업로드\n    - 16:00까지 깃허브에 각 팀 폴더 생성 후 발표자료 업로드\n     - 발표자료 업로드 가이드 (막힌다면 언제든지 DM 주세요!)\n - 발표 순서는 추후 공지합니다.",
  category: "weekly",
  programStatus: "active",
  type: "demand",
  accessRight: "edit",
  programGithubUrl:
    "https://github.com/JNU-econovation/weekly_presentation/tree/2024-1/2024-1/A_team/1st",
  eventStatus: "active",
  attendMode: "attend",
};

/**
 * @url guest/programs
 * @method GET
 * @description [guest] 행사 리스트 조회
 */
export const guestPrograms = {
  size: 10,
  page: 1,
  totalPage: 5,
  programs: [
    {
      programId: 0,
      title: "행사이름 0",
      deadLine: "1695691732000",
      category: "exampleCategory",
      programStatus: "exampleStatus",
      type: "demand",
      attendMode: "attend",
    },
    {
      programId: 1,
      title: "행사이름 1",
      deadLine: "1695691732000",
      category: "exampleCategory",
      programStatus: "exampleStatus",
      type: "notification",
      attendMode: "attend",
    },
    {
      programId: 2,
      title: "행사이름 2",
      deadLine: "1695691732000",
      category: "exampleCategory",
      programStatus: "exampleStatus",
      type: "demand",
      attendMode: "attend",
    },
    {
      programId: 3,
      title: "행사이름 3",
      deadLine: "1695691732000",
      category: "exampleCategory",
      programStatus: "exampleStatus",
      type: "notification",
      attendMode: "attend",
    },
    {
      programId: 4,
      title: "행사이름 4",
      deadLine: "1695691732000",
      category: "exampleCategory",
      programStatus: "exampleStatus",
      type: "demand",
      attendMode: "attend",
    },
    {
      programId: 5,
      title: "행사이름 5",
      deadLine: "1695691732000",
      category: "exampleCategory",
      programStatus: "exampleStatus",
      type: "notification",
      attendMode: "attend",
    },
    {
      programId: 6,
      title: "행사이름 6",
      deadLine: "1695691732000",
      category: "exampleCategory",
      programStatus: "exampleStatus",
      type: "demand",
      attendMode: "attend",
    },
    {
      programId: 7,
      title: "행사이름 7",
      deadLine: "1695691732000",
      category: "exampleCategory",
      programStatus: "exampleStatus",
      type: "notification",
      attendMode: "attend",
    },
    {
      programId: 8,
      title: "행사이름 8",
      deadLine: "1695691732000",
      category: "exampleCategory",
      programStatus: "exampleStatus",
      type: "demand",
      attendMode: "attend",
    },
    {
      programId: 9,
      title: "행사이름 9",
      deadLine: "1695691732000",
      category: "exampleCategory",
      programStatus: "exampleStatus",
      type: "notification",
      attendMode: "attend",
    },
  ],
};

/**
 * @url attend/programs/:programId
 * @method GET
 * @description 해당 행사의 본인의 상태정보 가져오기
 */
export const programAttend = {
  status: 200,
  message: "응답 성공",
  data: {
    name: "26기 박건규",
    attendStatus: "attend", // "attend" | "late" | "absent" | "nonResponse"
  },
};

/**
 * @url programs/:programId/accessRight
 * @method GET
 * @description 행사 수정 및 삭제 권한 확인
 */
export const nonAbleProgramAccess = {
  accessRight: "",
};

/**
 * @url programs/:programId/accessRight
 * @method GET
 * @description 행사 수정 및 삭제 권한 확인
 */
export const ableProgramAccess = {
  accessRight: "edit",
};

/**
 * @url attend/programs/:programId/members
 * @method GET
 * @description 행사에 참여하는 사용자 불러오기
 */
export const attendMembers = {
  members: [
    {
      memberId: 0,
      name: "25기 홍길동",
      attendStatus: "attend",
    },
    {
      memberId: 1,
      name: "25기 홍길동",
      attendStatus: "absent",
    },
    {
      memberId: 2,
      name: "25기 홍길동",
      attendStatus: "late",
    },
    {
      memberId: 3,
      name: "25기 홍길동",
      attendStatus: "nonResponse",
    },
    {
      memberId: 4,
      name: "25기 홍길동",
      attendStatus: "nonRelated",
    },
    {
      memberId: 5,
      name: "25기 홍길동",
      attendStatus: "attend",
    },
    {
      memberId: 6,
      name: "25기 홍길동",
      attendStatus: "absent",
    },
    {
      memberId: 7,
      name: "25기 홍길동",
      attendStatus: "late",
    },
    {
      memberId: 8,
      name: "25기 홍길동",
      attendStatus: "nonResponse",
    },
    {
      memberId: 9,
      name: "25기 홍길동",
      attendStatus: "nonRelated",
    },
    {
      memberId: 10,
      name: "25기 홍길동",
      attendStatus: "attend",
    },
    {
      memberId: 11,
      name: "25기 홍길동",
      attendStatus: "absent",
    },
    {
      memberId: 12,
      name: "25기 홍길동",
      attendStatus: "late",
    },
    {
      memberId: 13,
      name: "25기 홍길동",
      attendStatus: "nonResponse",
    },
    {
      memberId: 14,
      name: "25기 홍길동",
      attendStatus: "nonRelated",
    },
    {
      memberId: 15,
      name: "25기 홍길동",
      attendStatus: "attend",
    },
    {
      memberId: 16,
      name: "25기 홍길동",
      attendStatus: "absent",
    },
    {
      memberId: 17,
      name: "25기 홍길동",
      attendStatus: "late",
    },
    {
      memberId: 18,
      name: "25기 홍길동",
      attendStatus: "nonResponse",
    },
    {
      memberId: 19,
      name: "25기 홍길동",
      attendStatus: "nonRelated",
    },
    {
      memberId: 20,
      name: "25기 홍길동",
      attendStatus: "attend",
    },
    {
      memberId: 21,
      name: "25기 홍길동",
      attendStatus: "absent",
    },
  ],
};

/**
 * @url programs/:programId
 * @method DELETE
 * @description 프로그램 삭제
 */
export const deleteProgram = null;
