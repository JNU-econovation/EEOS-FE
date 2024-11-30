import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

/**
 * selectedCommentId
 * 선택된 질문의 id
 * -1이면 선택된 질문이 없음
 */
const selectedCommentId = atom(-1);
const selectedCommentContent = atom("");
const questionInput = atomWithStorage("questionInput", "");
const commentType = atom<"ANONYMOUS" | "NON_ANONYMOUS">("NON_ANONYMOUS");

const dashboardAtoms = {
  selectedCommentId,
  selectedCommentContent,
  questionInput,
  commentType,
};

export default dashboardAtoms;
