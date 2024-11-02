import { checkIsValidateGithubUrl } from "./github";

const WEEK = ["일", "월", "화", "수", "목", "금", "토"];

export const formatTimestamp = (
  timestamp: string,
  type: "default" | "short" = "default",
) => {
  const date = new Date(parseInt(timestamp));
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const dayOfWeek = WEEK[date.getDay()];

  return type === "default"
    ? `${year}년 ${month}월 ${day}일 (${dayOfWeek})`
    : `${year}-${month}-${day} (${dayOfWeek})`;
};

// text에서 문자열 제거
//TODO: 이름 명확하게 수정
export const convertText = (text: string, str: string) => {
  return text.replace(str, "");
};

//githubUrl을 owner, repo, branch, path로 분리
export const convertGitHubUrl = (githubUrl: string) => {
  // const isValidateGithubUrl = checkIsValidateGithubUrl(githubUrl);
  // if (!isValidateGithubUrl) throw new Error("올바르지 않은 깃허브 url입니다.");

  const parsedUrl = new URL(githubUrl);
  const parts = parsedUrl.pathname.split("/").filter(Boolean);

  const owner = parts[0];
  const repo = parts[1];
  let branch = "main";
  let path = "";

  const treeIndex = parts.indexOf("tree");
  if (treeIndex !== -1 && parts.length > treeIndex + 1) {
    branch = parts[treeIndex + 1];
    path = parts.slice(treeIndex + 2).join("/");
  }

  return { owner, repo, branch, path };
};
