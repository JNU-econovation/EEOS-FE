import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { SentenceRequest } from "../types";
import { https } from "@/apis/instance";
import API from "@/constants/API";
import MESSAGE from "@/constants/MESSAGE";

export interface CreateSentenceRequest extends SentenceRequest {}

export const createSentence = async (data: CreateSentenceRequest) => {
  await toast.promise(
    https({
      url: API.TEAM_BUILDING.SENTENCE,
      method: "POST",
      data,
    }),
    {
      pending: MESSAGE.CREATE.PENDING,
      success: MESSAGE.CREATE.SUCCESS,
      error: MESSAGE.CREATE.FAILED,
    },
  );
};

export const useCreateSentence = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [API.TEAM_BUILDING.SENTENCE],
    mutationFn: ({ content }: CreateSentenceRequest) =>
      createSentence({ content }),
    onSettled: () => {
      queryClient.invalidateQueries([API.TEAM_BUILDING.INPUT_STATUS]);
    },
  });
};
