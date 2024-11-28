import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

/**
 * 선택된 질문의 id
 * -1이면 선택된 질문이 없음
 */
const selectedCommentId = atom(-1);
const selectedCommentContent = atom("");
const questionInput = atomWithStorage("questionInput", "");

const dashboardAtoms = {
  selectedCommentId,
  selectedCommentContent,
  questionInput,
};

export default dashboardAtoms;
