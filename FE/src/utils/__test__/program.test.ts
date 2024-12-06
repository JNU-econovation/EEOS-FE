import { AttendStatus } from "@/types/member";
import { getEditableStatus } from "../program";
import { ProgramAttendStatus, ProgramStatus } from "@/types/program";

describe("getEditableStatus", () => {
  let myAttendStatus: AttendStatus;
  let programStatus: ProgramStatus;
  let programAttendMode: ProgramAttendStatus;

  describe("행사 당일날", () => {
    describe("프로그램이 진행 중인 경우", () => {
      it("내 출석 상태가 미응답인 경우 EDITABLE를 반환한다", () => {
        // when
        programStatus = "active";
        programAttendMode = "attend";
        myAttendStatus = "nonResponse";

        // then
        const editableStatus = getEditableStatus({
          myAttendStatus,
          programStatus,
          programAttendMode,
        });

        expect(editableStatus).toBe("EDITABLE");
      });
      it("이미 응답을 한 경우 ALREADY_ATTENDED를 반환한다.", () => {
        // given
        programStatus = "active";
        programAttendMode = "attend";

        // when
        myAttendStatus = "attend";

        // then
        const editableStatus = getEditableStatus({
          myAttendStatus,
          programStatus,
          programAttendMode,
        });

        expect(editableStatus).toBe("ALREADY_ATTENDED");

        // when
        programAttendMode = "late";

        // then
        const editableStatus2 = getEditableStatus({
          myAttendStatus,
          programStatus,
          programAttendMode,
        });

        expect(editableStatus2).toBe("ALREADY_ATTENDED");
      });
      it("나와 관련이 없는 행사인 경우 NON_RELATED를 반환한다.", () => {
        // when
        programStatus = "active";
        programAttendMode = "attend";
        myAttendStatus = "nonRelated";

        // then
        const editableStatus = getEditableStatus({
          myAttendStatus,
          programStatus,
          programAttendMode,
        });

        expect(editableStatus).toBe("NON_RELATED");
      });
    });
    it("프로그램이 진행중이지 않은 경우 INACTIVE를 반환한다.", () => {
      // 프로그램 시작 날짜 이전인 경우
      // given
      programStatus = "end";

      // when
      programAttendMode = "end";
      myAttendStatus = "nonResponse";

      // then
      let editableStatus = getEditableStatus({
        myAttendStatus,
        programStatus,
        programAttendMode,
      });
      expect(editableStatus).toBe("INACTIVE");

      // 프로그램 종료 날짜 이후인 경우
      // when
      programAttendMode = "end";
      myAttendStatus = "attend";

      // then
      editableStatus = getEditableStatus({
        myAttendStatus,
        programStatus,
        programAttendMode,
      });
      expect(editableStatus).toBe("INACTIVE");

      // when
      programAttendMode = "end";
      myAttendStatus = "late";

      // then
      editableStatus = getEditableStatus({
        myAttendStatus,
        programStatus,
        programAttendMode,
      });
      expect(editableStatus).toBe("INACTIVE");

      // when
      programAttendMode = "end";
      myAttendStatus = "absent";

      // then
      editableStatus = getEditableStatus({
        myAttendStatus,
        programStatus,
        programAttendMode,
      });
      expect(editableStatus).toBe("INACTIVE");
    });
  }),
    it("행사 당일이 아닌 날인 경우 INACTIVE를 반환한다", () => {
      // given
      programStatus = "end";
      programAttendMode = "end";

      // when
      myAttendStatus = "absent";

      // then
      let editableStatus = getEditableStatus({
        myAttendStatus,
        programStatus,
        programAttendMode,
      });
      expect(editableStatus).toBe("INACTIVE");

      // when
      myAttendStatus = "attend";

      // then
      editableStatus = getEditableStatus({
        myAttendStatus,
        programStatus,
        programAttendMode,
      });
      expect(editableStatus).toBe("INACTIVE");

      // when
      myAttendStatus = "late";

      // then
      editableStatus = getEditableStatus({
        myAttendStatus,
        programStatus,
        programAttendMode,
      });
      expect(editableStatus).toBe("INACTIVE");
    });
  it("나와 관련이 없는 행사인 경우 NON_RELATED를 반환한다.", () => {
    //when
    programStatus = "active";
    programAttendMode = "attend";
    myAttendStatus = "nonRelated";

    //then
    const editableStatus = getEditableStatus({
      myAttendStatus,
      programStatus,
      programAttendMode,
    });
    expect(editableStatus).toBe("NON_RELATED");
  });
});
