/**
 * @url /attend/programs/:programId
 * @method GET
 * @description 본인의 출석 상태를 반환한다
 */
export const myAttendStatus = {
  name: "26기 홍길동",
  attendStatus: "attend", // attend, absent, late, nonResponse, nonRelated
};

/**
 * @url /attend/programs/:programId
 * @method PUT
 * @description 본인의 출석 상태 변경
 */
export const updateMyAttendStatus = {
  name: "26기 홍길동",
  attendStatus: "attend",
};
