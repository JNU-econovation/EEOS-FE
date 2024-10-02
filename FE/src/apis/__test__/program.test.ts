// import { toast } from "react-toastify";
import { ProgramInfoDto, ProgramListDto } from "../dtos/program.dto";
import { https } from "../instance";
import {
  deleteProgram,
  getProgramAccessRight,
  getProgramById,
  getProgramList,
  patchProgram,
  PatchProgramBody,
  postProgram,
  PostProgramRequest,
  sendSlackMessage,
  updateProgramAttendMode,
} from "../program";
import getResponse from "@/__test__/__stub__/response";
import { ProgramAttendStatus } from "@/types/program";

jest.mock("../instance");
const mockHttps = https as jest.MockedFunction<typeof https>;

// 프로그램 정보 조회 api
describe("getProgramById", () => {
  const mockReturnData = getResponse({
    url: "/programs/:programId",
    method: "GET",
  });

  beforeEach(() => {
    mockHttps.mockReturnValue(mockReturnData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("isAbleToEdit이 false인 경우 게스트 프로그램 정보를 조회한다", async () => {
    const programId = 1;
    const isAbleToEdit = false;

    const result = await getProgramById(programId, isAbleToEdit);

    expect(result).toBeInstanceOf(ProgramInfoDto);
    expect(https).toHaveBeenCalledWith({
      url: "/guest/programs/1",
      method: "GET",
    });
    expect(result).toEqual({
      accessRight: "edit",
      attendMode: "attend",
      category: "weekly",
      content:
        "[주간발표 공지]\n금일 B팀의 주간발표가 있습니다.\n\n - 일시: 10월 13일 (금) 17시~\n - 장소: 정보화본부 109호\n - 발표팀\n     - 발표자료 업로드\n    - 16:00까지 깃허브에 각 팀 폴더 생성 후 발표자료 업로드\n     - 발표자료 업로드 가이드 (막힌다면 언제든지 DM 주세요!)\n - 발표 순서는 추후 공지합니다.[주간발표 공지]\n금일 B팀의 주간발표가 있습니다.\n\n - 일시: 10월 13일 (금) 17시~\n - 장소: 정보화본부 109호\n - 발표팀\n     \n- 발표자료 업로드\n    - 16:00까지 깃허브에 각 팀 폴더 생성 후 발표자료 업로드\n     - 발표자료 업로드 가이드 (막힌다면 언제든지 DM 주세요!)\n - 발표 순서는 추후 공지합니다.",
      deadLine: "1795691732000",
      programGithubUrl:
        "https://github.com/JNU-econovation/weekly_presentation/tree/2024-1/2024-1/A_team/1st",
      programId: 1,
      programStatus: "active",
      title: "주간 발표 B팀",
      type: "demand",
    });
  });

  it("isAbleToEdit이 true인 경우 프로그램 정보를 조회한다", async () => {
    const programId = 1;
    const isAbleToEdit = true;

    const result = await getProgramById(programId, isAbleToEdit);

    expect(result).toBeInstanceOf(ProgramInfoDto);
    expect(https).toHaveBeenCalledWith({
      url: "/programs/1",
      method: "GET",
    });
    expect(result).toEqual({
      accessRight: "edit",
      attendMode: "attend",
      category: "weekly",
      content:
        "[주간발표 공지]\n금일 B팀의 주간발표가 있습니다.\n\n - 일시: 10월 13일 (금) 17시~\n - 장소: 정보화본부 109호\n - 발표팀\n     - 발표자료 업로드\n    - 16:00까지 깃허브에 각 팀 폴더 생성 후 발표자료 업로드\n     - 발표자료 업로드 가이드 (막힌다면 언제든지 DM 주세요!)\n - 발표 순서는 추후 공지합니다.[주간발표 공지]\n금일 B팀의 주간발표가 있습니다.\n\n - 일시: 10월 13일 (금) 17시~\n - 장소: 정보화본부 109호\n - 발표팀\n     \n- 발표자료 업로드\n    - 16:00까지 깃허브에 각 팀 폴더 생성 후 발표자료 업로드\n     - 발표자료 업로드 가이드 (막힌다면 언제든지 DM 주세요!)\n - 발표 순서는 추후 공지합니다.",
      deadLine: "1795691732000",
      programGithubUrl:
        "https://github.com/JNU-econovation/weekly_presentation/tree/2024-1/2024-1/A_team/1st",
      programId: 1,
      programStatus: "active",
      title: "주간 발표 B팀",
      type: "demand",
    });
  });
});

describe("getProgramList", () => {
  const mockReturnData = getResponse({
    url: "/guest/programs",
    method: "GET",
  });

  beforeEach(() => {
    mockHttps.mockReturnValue(mockReturnData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("어드민 계정인 경우 프로그램 리스트를 조회한다", async () => {
    const category = "weekly";
    const programStatus = "active";
    const size = 10;
    const page = 1;
    const isAdmin = true;

    await getProgramList({
      category,
      programStatus,
      size,
      page,
      isAdmin,
    });

    expect(https).toHaveBeenCalledWith({
      method: "GET",
      params: {
        category: "weekly",
        page: 1,
        programStatus: "active",
        size: 10,
      },
      url: "/programs",
    });
  });
  it("게스트 계정인 경우 `/guest/programs`로 게스트 프로그램 리스트를 조회한다", async () => {
    const category = "weekly";
    const programStatus = "active";
    const size = 10;
    const page = 1;
    const isAdmin = false;

    const guestResult = await getProgramList({
      category,
      programStatus,
      size,
      page,
      isAdmin,
    });

    expect(guestResult).toBeInstanceOf(ProgramListDto);
    expect(https).toHaveBeenCalledWith({
      method: "GET",
      params: {
        category: "weekly",
        page: 1,
        programStatus: "active",
        size: 10,
      },
      url: "/guest/programs",
    });
    expect(guestResult).toEqual({
      page: 1,
      programs: [
        {
          attendMode: "attend",
          category: "exampleCategory",
          deadLine: "1695691732000",
          programId: 0,
          programStatus: "exampleStatus",
          title: "행사이름 0",
          type: "demand",
        },
        {
          attendMode: "attend",
          category: "exampleCategory",
          deadLine: "1695691732000",
          programId: 1,
          programStatus: "exampleStatus",
          title: "행사이름 1",
          type: "notification",
        },
        {
          attendMode: "attend",
          category: "exampleCategory",
          deadLine: "1695691732000",
          programId: 2,
          programStatus: "exampleStatus",
          title: "행사이름 2",
          type: "demand",
        },
        {
          attendMode: "attend",
          category: "exampleCategory",
          deadLine: "1695691732000",
          programId: 3,
          programStatus: "exampleStatus",
          title: "행사이름 3",
          type: "notification",
        },
        {
          attendMode: "attend",
          category: "exampleCategory",
          deadLine: "1695691732000",
          programId: 4,
          programStatus: "exampleStatus",
          title: "행사이름 4",
          type: "demand",
        },
        {
          attendMode: "attend",
          category: "exampleCategory",
          deadLine: "1695691732000",
          programId: 5,
          programStatus: "exampleStatus",
          title: "행사이름 5",
          type: "notification",
        },
        {
          attendMode: "attend",
          category: "exampleCategory",
          deadLine: "1695691732000",
          programId: 6,
          programStatus: "exampleStatus",
          title: "행사이름 6",
          type: "demand",
        },
        {
          attendMode: "attend",
          category: "exampleCategory",
          deadLine: "1695691732000",
          programId: 7,
          programStatus: "exampleStatus",
          title: "행사이름 7",
          type: "notification",
        },
        {
          attendMode: "attend",
          category: "exampleCategory",
          deadLine: "1695691732000",
          programId: 8,
          programStatus: "exampleStatus",
          title: "행사이름 8",
          type: "demand",
        },
        {
          attendMode: "attend",
          category: "exampleCategory",
          deadLine: "1695691732000",
          programId: 9,
          programStatus: "exampleStatus",
          title: "행사이름 9",
          type: "notification",
        },
      ],
      size: 10,
      totalPage: 5,
    });
  });
});

// 프로그램 삭제 api
describe("deleteProgram", () => {
  const mockReturnData = getResponse({
    url: "/programs/:programId",
    method: "DELETE",
  });

  beforeEach(() => {
    mockHttps.mockReturnValue(mockReturnData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("프로그램을 삭제한다", async () => {
    await deleteProgram(1);

    expect(https).toHaveBeenCalledWith({
      url: "/programs/1",
      method: "DELETE",
    });
  });
});

// slack 메시지 전송 api
describe("sendSlackMessage", () => {
  const mockReturnData = getResponse({
    url: "/programs/:programId/slack/notification",
    method: "POST",
  });

  beforeEach(() => {
    mockHttps.mockReturnValue(mockReturnData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("요청 성공시 programId 를 반환받는다", async () => {
    const programId = 1;
    const result = await sendSlackMessage(programId);

    // 내부 구현사항
    expect(https).toHaveBeenCalledWith({
      data: { programUrl: "https://econo.eeos.store/detail/1" },
      method: "POST",
      url: "/programs/1/slack/notification",
    });

    expect(result).toEqual({ programId: 1 });
  });

  it("요청 실패시 실패 메시지를 보여준다", async () => {});
});

// 행사 생성 api
describe("postProgram", () => {
  const mockReturnData = getResponse({
    url: "/programs",
    method: "POST",
  });

  beforeEach(() => {
    mockHttps.mockReturnValue(mockReturnData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("행사를 생성한다", async () => {
    const body: PostProgramRequest = {
      category: "weekly",
      content: "content",
      deadLine: "2022-12-12",
      programGithubUrl: "https://github.com",
      title: "title",
      type: "demand",
      members: [{ memberId: 1 }],
      teams: [{ teamId: 1 }],
    };

    const result = await postProgram(body);

    expect(https).toHaveBeenCalledWith({
      data: body,
      method: "POST",
      url: "/programs",
    });

    expect(result).toEqual({ programId: 1 });
  });
});

// 프로그램 수정 api
describe("patchProgram", () => {
  const mockReturnData = getResponse({
    url: "/programs/:programId",
    method: "PATCH",
  });

  beforeEach(() => {
    mockHttps.mockReturnValue(mockReturnData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("프로그램을 수정한다", async () => {
    const body: PatchProgramBody = {
      title: "title",
      content: "content",
      deadLine: "2022-12-12",
      category: "weekly",
      type: "demand",
      members: [
        {
          memberId: 1,
          beforeAttendStatus: "attend",
          afterAttendStatus: "absent",
        },
      ],
      teams: [{ teamId: 1 }],
    };

    const programId = 1;

    await patchProgram({ programId, body });

    expect(https).toHaveBeenCalledWith({
      data: body,
      method: "PATCH",
      url: "/programs/1",
    });
  });
});

// 프로그램 수정/삭제 권한 확인
describe("getProgramAccessRight", () => {
  const mockReturnData = getResponse({
    url: "/programs/:programId/accessRight",
    method: "GET",
  });

  beforeEach(() => {
    mockHttps.mockReturnValue(mockReturnData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("프로그램 수정/삭제 권한을 확인한다", async () => {
    const result = await getProgramAccessRight(1);

    expect(https).toHaveBeenCalledWith({
      method: "GET",
      url: "/programs/1/accessRight",
    });

    expect(result).toEqual({ accessRight: "" });
    // expect(result).toEqual({ accessRight: "edit" }); // 만약 관리자라면, accessRight: "edit" 이 반환된다.
  });
});

// 프로그램 출석 상태 수정 api
describe("updateProgramAttendMode", () => {
  const mockReturnData = getResponse({
    url: "/programs/:programId",
    method: "POST",
  });

  beforeEach(() => {
    mockHttps.mockReturnValue(mockReturnData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("프로그램 출석 상태를 수정한다", async () => {
    const programId = 1;
    const attendMode: ProgramAttendStatus = "attend";
    const result = await updateProgramAttendMode(programId, attendMode);

    expect(https).toHaveBeenCalledWith({
      method: "POST",
      url: "/programs/1",
      params: {
        mode: "attend",
      },
    });
    expect(result).toEqual({ programId: 1 });
  });
});
