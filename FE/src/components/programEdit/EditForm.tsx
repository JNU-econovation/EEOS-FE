"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormBtn from "../common/form/FormBtn";
import CreateCategory from "../common/form/program/CreateCategory";
import { ProgramFormDataState } from "../common/form/program/CreateForm";
import ProgramDate from "../common/form/program/ProgramDate";
import ProgramTitle from "../common/form/program/ProgramTitle";
import LoadingSpinner from "../common/LoadingSpinner";
import MarkdownEditor from "../common/markdown/MarkdownEditor";
import ProgramGithubLinkInput from "../programCreate/ProgramGithubLinkInput";
import ProgramTeamList from "../programCreate/ProgramTeamList";
import ParticipantStateSection from "./ParticipantStateSection";
import { ProgramInfoDto } from "@/apis/dtos/program.dto";
import FORM_INFO from "@/constants/FORM_INFO";
import MESSAGE from "@/constants/MESSAGE";
import {
  useGetProgramByProgramId,
  useUpdateProgram,
} from "@/hooks/query/useProgramQuery";
import { useMemberMap } from "@/hooks/useMemberForm";
import { ProgramCategory } from "@/types/program";
import { TeamInputInfo } from "@/types/team";
import { checkIsValidateGithubUrl } from "@/utils/github";

const initialState: ProgramFormDataState = {
  title: "",
  deadLine: new Date().getTime().toString(),
  isDemand: false,
  category: "weekly",
  content: "",
  programGithubUrl: "",
  teamList: [],
};

interface EditFormProps {
  programId: number;
}
const EditForm = ({ programId }: EditFormProps) => {
  const route = useRouter();
  const { members, updateMembers } = useMemberMap();

  const { register, handleSubmit, getValues, reset, watch, setValue } =
    useForm<ProgramFormDataState>({
      defaultValues: initialState,
    });

  const { data: programInfo, isLoading: isProgrmaLoading } =
    useGetProgramByProgramId(+programId, true);

  const isDemand = watch("isDemand");

  const setData = (data: ProgramInfoDto) => {
    const { title, deadLine, content, category, type, programGithubUrl } = data;
    setValue("title", title);
    setValue("deadLine", deadLine);
    setValue("content", content);
    setValue("category", category);
    setValue("isDemand", type === "demand");
    setValue("programGithubUrl", programGithubUrl);
  };

  useEffect(() => {
    if (isProgrmaLoading) return;
    setData(programInfo);
  }, [programInfo]);

  const { mutate: updateProgramMutate } = useUpdateProgram({
    programId: +programId,
  });

  const onSubmit: SubmitHandler<ProgramFormDataState> = (data) => {
    // TODO: 함수로 분리하기
    const {
      title,
      content,
      deadLine,
      category,
      isDemand,
      programGithubUrl,
      teamList,
    } = data;

    if (!title || !content || !deadLine || !category || !programGithubUrl) {
      toast.error("모든 항목을 입력해주세요.");
      return;
    }

    const isValidGithubUrl = checkIsValidateGithubUrl(programGithubUrl);

    if (!isValidGithubUrl) {
      toast.error("올바른 Github URL을 입력해주세요.");
      return;
    }

    const toastId = toast.loading(MESSAGE.EDIT.PENDING);

    updateProgramMutate(
      {
        title,
        deadLine,
        content,
        category,
        type: isDemand ? "demand" : "notification",
        teams: teamList,
        programGithubUrl,
        members: Array.from(
          members,
          ([memberId, { beforeAttendStatus, afterAttendStatus }]) => ({
            memberId,
            beforeAttendStatus,
            afterAttendStatus,
          }),
        ),
      },
      {
        onSuccess: () => {
          toast.update(toastId, {
            render: MESSAGE.EDIT.SUCCESS,
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });

          reset();
          route.back();
        },
        onError: () => {
          toast.error(MESSAGE.EDIT.FAILED);
          toast.update(toastId, {
            render: MESSAGE.EDIT.FAILED,
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        },
      },
    );
  };

  const isLoading = isProgrmaLoading || !programInfo;

  if (isLoading) return <LoadingSpinner />;
  const handleReset = () => {
    reset();
    route.back();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <ProgramTitle
        register={register}
        prefix={isDemand && FORM_INFO.DEMAND_PREFIX}
        formType="create"
        isDemand={isDemand}
      />
      <div className="flex flex-col items-end gap-8 sm:flex-row">
        <ProgramDate setValue={setValue} getValues={getValues} />
        <CreateCategory
          selectedCategory={watch("category")}
          setCategory={(category: ProgramCategory) =>
            setValue("category", category)
          }
        />
      </div>
      <MarkdownEditor
        id={FORM_INFO.PROGRAM.CONTENT.id}
        label={FORM_INFO.PROGRAM.CONTENT.label}
        placeholder={FORM_INFO.PROGRAM.CONTENT.placeholder}
        value={watch("content")}
        onChange={(v) => setValue("content", v)}
      />
      <div className="my-4 flex flex-col gap-4">
        <ProgramGithubLinkInput register={register} />
        <ProgramTeamList
          selectedTeamList={watch("teamList")}
          handleTeamListChange={(teamList: TeamInputInfo[]) =>
            setValue("teamList", teamList)
          }
        />
      </div>
      <ParticipantStateSection
        programId={programId}
        setMembers={updateMembers}
      />
      <FormBtn
        submitText={FORM_INFO.SUBMIT_TEXT["edit"]}
        formReset={() => {
          route.back();
          handleReset;
        }}
      />
    </form>
  );
};

export default EditForm;
