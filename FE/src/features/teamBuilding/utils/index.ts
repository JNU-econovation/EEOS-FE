import { InputStatus } from "../types";

export const getType = (inputStatus: InputStatus) => {
  if (inputStatus === "incomplete") return "default";
  if (inputStatus === "complete") return "viewer";
};
