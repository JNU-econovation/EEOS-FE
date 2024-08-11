import {
  MemberActiveStatusInfoDto,
  MemberAttendStatusInfoDto,
  MemberInfoDto,
} from "../dtos/member.dto";
import { https } from "../instance";
import {
  deleteMember,
  getMembersByActiveStatus,
  getProgramMembersByActiveStatus,
  getProgramMembersByAttendStatus,
  updateMemberActiveStatus,
} from "../member";

jest.mock("../instance");

// 활동 상태별 회원 정보 조회 api
describe("getMembersByActiveStatus", () => {
  const mockReturnData = {
    status: 200,
    message: "정보 조회 성공",
    data: {
      data: {
        members: [
          {
            memeberId: 1,
            name: "00기 홍길동",
            activeStatus: "active",
          },
        ],
      },
    },
  };

  beforeEach(() => {
    https.mockReturnValue(mockReturnData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("request", () => {
    it("/members 위치로 get 요청을 보낸다. 파라미터로 activeStatus 를 넣는다", async () => {
      const activeStatus = "all";

      await getMembersByActiveStatus(activeStatus);

      expect(https).toBeCalledWith({
        url: "/members",
        method: "GET",
        params: { activeStatus },
      });
    });
  });

  describe("response", () => {
    it("회원 정보 리스트를 반환한다", async () => {
      const result = await getMembersByActiveStatus("all");

      expect(result[0]).toBeInstanceOf(MemberActiveStatusInfoDto);
    });
  });
});

// 해당 프로그램의 활동 상태별 회원 정보 조회 api
describe("getProgramMembersByActiveStatus", () => {
  describe("request", () => {
    it("/programs/{programId}/members 위치로 get 요청을 보낸다. 파라미터로 activeStatus 를 넣는다", async () => {
      const activeStatus = "all";

      await getProgramMembersByActiveStatus(1, activeStatus);

      expect(https).toBeCalledWith({
        url: `/programs/1/members`,
        method: "GET",
        params: { activeStatus },
      });
    });
  });

  describe("response", () => {
    const mockReturnData = {
      status: 200,
      message: "정보 조회 성공",
      data: {
        data: {
          members: [
            {
              memeberId: 1,
              name: "00기 홍길동",
              activeStatus: "active",
            },
          ],
        },
      },
    };

    beforeEach(() => {
      https.mockReturnValue(mockReturnData);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("회원 정보 리스트를 반환한다", async () => {
      const result = await getProgramMembersByActiveStatus(1, "all");

      expect(result[0]).toBeInstanceOf(MemberInfoDto);
    });
  });
});

// 해당 프로그램의 출석 상태별 회원 정보 조회 api
describe("getProgramMembersByAttendStatus", () => {
  describe("request", () => {
    it("/programs/{programId}/members/attend-status 위치로 get 요청을 보낸다. 파라미터로 attendStatus 를 넣는다", async () => {
      const attendStatus = "attend";

      await getProgramMembersByAttendStatus(1, attendStatus);

      expect(https).toBeCalledWith({
        url: `/attend/programs/1/members`,
        method: "GET",
        params: { attendStatus },
      });
    });
  });

  describe("response", () => {
    const mockReturnData = {
      status: 200,
      message: "정보 조회 성공",
      data: {
        data: {
          members: [
            {
              memeberId: 1,
              name: "00기 홍길동",
              attendStatus: "attend",
            },
          ],
        },
      },
    };

    beforeEach(() => {
      https.mockReturnValue(mockReturnData);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("회원 정보 리스트를 반환한다", async () => {
      const result = await getProgramMembersByAttendStatus(1, "attend");

      expect(result[0]).toBeInstanceOf(MemberAttendStatusInfoDto);
    });
  });
});

// 회원 활동 상태 변경 api
describe("updateMemberActiveStatus", () => {
  describe("request", () => {
    it("/members/{memberId}/active-status 위치로 put 요청을 보낸다", async () => {
      const memberId = 1;
      const activeStatus = "am";

      await updateMemberActiveStatus(memberId, activeStatus);

      expect(https).toBeCalledWith({
        url: `/members/activeStatus/1`,
        method: "PUT",
        data: activeStatus,
      });
    });
  });

  describe("response", () => {
    const mockReturnData = {
      data: {
        status: 200,
        message: "응답 성공",
        data: {
          name: "00기 홍길동",
          activeStatus: "am",
        },
      },
    };
    beforeEach(() => {
      https.mockReturnValue(mockReturnData);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("정보 수정 성공 메시지를 반환한다", async () => {
      const result = await updateMemberActiveStatus(1, "am");

      expect(result).toEqual({
        name: "00기 홍길동",
        activeStatus: "am",
      });
    });
  });
});

// 회원 삭제 api
describe("deleteMember", () => {
  describe("request", () => {
    it("/members/{memberId} 위치로 delete 요청을 보낸다", async () => {
      const memberId = 1;

      await deleteMember(memberId);

      expect(https).toBeCalledWith({
        url: `/members/${memberId}`,
        method: "DELETE",
      });
    });
  });

  describe("response", () => {
    const mockReturnData = {
      data: {
        data: {
          status: 200,
          message: "삭제 성공",
        },
      },
    };

    beforeEach(() => {
      https.mockReturnValue(mockReturnData);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("삭제 성공 메시지를 반환한다", async () => {
      const result = await deleteMember(1);

      expect(result).toEqual({
        status: 200,
        message: "삭제 성공",
      });
    });
  });
});
