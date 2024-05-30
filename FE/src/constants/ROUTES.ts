const ROUTES = {
  MAIN: "/main",
  GUEST_MAIN: "/guest/main",
  ADMIN_MAIN: "/admin/main",
  CREATE: "/create",
  DETAIL: (programId: number) => `/detail/${programId}`,
  GUEST_DETAIL: (programId: number) => `/guest/detail/${programId}`,
  EDIT: (programId: number) => `/edit/${programId}`,
  ERROR: "/error",
  LOGIN: "/login",
  LOGGIN_IN: "/login/logging-in",
  NAME_ERROR: "/login/name-error",
  TEAM_BUILDING: {
    CREATE: "/team-building/create",
    DETAIL: "/team-building/detail",
    RESULT: "/team-building/result",
  },
};

Object.freeze(ROUTES);
export default ROUTES;
