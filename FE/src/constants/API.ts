const PROGRAM = {
  LIST: "/programs",
  CREATE: "/programs",
  GUEST_LIST: "/guest/programs",
  UPDATE: (programId: number) => `/programs/${programId}`,
  DELETE: (programId: number) => `/programs/${programId}`,
  DETAIL: (programId: number) => `/guest/programs/${programId}`,
  Edit_DETAIL: (programId: number) => `/programs/${programId}`,
  ACCESS_RIGHT: (programId: number) => `/programs/${programId}/accessRight`,
  SEND_MESSAGE: (programId: number) =>
    `/programs/${programId}/slack/notification`,
  UPDATE_ATTEND_MODE: (programId: number) => `/programs/${programId}`,
};

const MEMBER = {
  LIST: "/members",
  UPDATE: (memberId: number) => `/members/activeStatus/${memberId}`,
  DELETE: (memberId: number) => `/members/${memberId}`,
  ACTIVE_STATUS: (programId: number) => `/programs/${programId}/members`,
  ATTEND_STATUS: (programId: number) => `/attend/programs/${programId}/members`,
  FIRE_FINGER: (programId: number) =>
    `/attend/programs/fire-finger/${programId}`,
  ATTENDANCE_LIST: "/attend/programs",
  ATTENDANCE_SUMMARY: "/attend/summary",
};

const USER = {
  ATTEND_STATUS: (programId: number) => `/attend/programs/${programId}`,
  ACTIVE_STATUS: "/members/activeStatus",
};

const AUTH = {
  SLACK_LOGIN: "/auth/login/slack",
  TOKEN_REISSUE: "/auth/reissue",
  ADMIN_LOGIN: "/auth/login",
};

const TEAM_BUILDING = {
  CREATE: "/team-building",
  DETAIL: "/team-building",
  CLOSE: "/team-building/end",
  VALIDATE: "/team-building/validate",
  INPUT_STATUS: "/target/team-building",
  RESULT: "/team-building/result",
  SENTENCE: "/target/team-building",
  COMPLETE: "/team-building/complete",
  DELETE: "/team-building",
};

const TEAM = {
  LIST: "/teams",
  CREATE: "/teams",
  DELETE: (teamId: number) => `/teams/${teamId}`,
};

const QUESTION = {
  LIST: "comments",
  CREATE: "comments",
  UPDATE: (commentId: number) => `comments/${commentId}`,
  DELETE: (commentId: number) => `comments/${commentId}`,
};

const CALENDAR = {
  CREATE: "/calendars",
  FETCH: "/calendars",
  DELETE: (calendarId: number) => `/calendars/${calendarId}`,
};

Object.freeze(PROGRAM);
Object.freeze(MEMBER);
Object.freeze(USER);
Object.freeze(AUTH);
Object.freeze(TEAM_BUILDING);
Object.freeze(TEAM);
Object.freeze(QUESTION);
Object.freeze(CALENDAR);

export default {
  PROGRAM,
  MEMBER,
  USER,
  AUTH,
  TEAM_BUILDING,
  TEAM,
  QUESTION,
  CALENDAR,
};
