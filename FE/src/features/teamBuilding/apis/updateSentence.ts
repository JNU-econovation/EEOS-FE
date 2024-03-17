import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { SentenceRequest } from "../types";
import { https } from "@/utils/axios";
import API from "@/constants/API";
import MESSAGE from "@/constants/MESSAGE";

interface UpdateSentenceRequest extends SentenceRequest {}

const updateSentence = async (data: UpdateSentenceRequest) => {
  await toast.promise(
    https({
      url: API.TEAM_BUILDING.SENTENCE,
      method: "PUT",
      data,
    }),
    {
      pending: MESSAGE.EDIT.PENDING,
      success: MESSAGE.EDIT.SUCCESS,
      error: MESSAGE.EDIT.FAILED,
    },
  );
};

export const useUpdateSentence = () => {
  const QueryClient = useQueryClient();
  return useMutation({
    mutationKey: [API.TEAM_BUILDING.SENTENCE],
    mutationFn: ({ content }: UpdateSentenceRequest) =>
      updateSentence({ content }),
    onSettled: () => {
      QueryClient.invalidateQueries([API.TEAM_BUILDING.INPUT_STATUS]);
    },
  });
};
