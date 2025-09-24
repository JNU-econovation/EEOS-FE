//"department" : "행사부" | "관리부" | "홍보부" | "회장단" // 부서 추가

// const DEPARTMENTS = ["행사부", "관리부", "홍보부", "회장단"];

const DEPARTMENT_DETAILS = {
  president: {
    departmentId: 101,
    enName: "president",
    koName: "회장단",
  },
  marketing: {
    departmentId: 102,
    enName: "marketing",
    koName: "홍보부",
  },
  management: {
    departmentId: 103,
    enName: "management",
    koName: "관리부",
  },
  event: {
    departmentId: 104,
    enName: "event",
    koName: "행사부",
  },
  none: {
    departmentId: 105,
    enName: "none",
    koName: "해당없음",
  },
} as const;

const DEPARTMENTS = [
  DEPARTMENT_DETAILS.president.koName,
  DEPARTMENT_DETAILS.marketing.koName,
  DEPARTMENT_DETAILS.management.koName,
  DEPARTMENT_DETAILS.event.koName,
] as const;

export const findDepartmentEnNameFromKoName = (koName) => {
  let result = Object.keys(DEPARTMENT_DETAILS)
    .map((key) => [DEPARTMENT_DETAILS[key].koName, key])
    .find(([ko, en]) => ko === koName)?.[1];

  if (!result) result = "none";
  return result;
};

export default { DEPARTMENTS, DEPARTMENT_DETAILS };
