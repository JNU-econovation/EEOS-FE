"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Participant from "../../../programCreate/Participant";
import CreateCategory from "./CreateCategory";
import ProgramTitle from "./ProgramTitle";
import FormBtn from "@/components/common/form/FormBtn";
import ProgramDate from "@/components/common/form/program/ProgramDate";
import MarkdownEditor from "@/components/common/markdown/MarkdownEditor";
import ProgramGithubLinkInput from "@/components/programCreate/ProgramGithubLinkInput";
import ProgramTeamList from "@/components/programCreate/ProgramTeamList";
import FORM_INFO from "@/constants/FORM_INFO";
import ROUTES from "@/constants/ROUTES";
import { useCreateProgram } from "@/hooks/query/useProgramQuery";
import { useMemberSet } from "@/hooks/useMemberForm";
import { ProgramCategory } from "@/types/program";
import { TeamInputInfo } from "@/types/team";

export interface ProgramFormDataState {
  title: string;
  deadLine: string;
  isDemand: boolean;
  category: ProgramCategory;
  content: string;
  programGithubUrl: string;
  teamList: TeamInputInfo[];
}

const initialState: ProgramFormDataState = {
  title: "",
  deadLine: new Date().getTime().toString(),
  isDemand: false,
  category: "weekly",
  content: "",
  programGithubUrl: "",
  teamList: [],
};

const CreateForm = () => {
  const router = useRouter();

  const { register, handleSubmit, getValues, reset, watch, setValue } =
    useForm<ProgramFormDataState>({
      defaultValues: initialState,
    });

  const { members, clearMembers, setAllMembers, updateMembers } =
    useMemberSet();

  const { mutate: createProgramMutate } = useCreateProgram();

  const isDemand = watch("isDemand");

  const onSubmit: SubmitHandler<ProgramFormDataState> = (data) => {
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

    createProgramMutate(
      {
        deadLine,
        content,
        category,
        type: isDemand ? "demand" : "notification",
        programGithubUrl: programGithubUrl,
        teams: teamList,
        members: Array.from(members, (memberId) => ({ memberId })),
        title: isDemand ? `${FORM_INFO.DEMAND_PREFIX} ${title}` : title,
      },
      {
        onSuccess: (programId) => {
          reset();
          router.replace(ROUTES.ADMIN_DETAIL(programId));
        },
      },
    );
  };

  const handleReset = () => {
    reset();
    router.back();
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
      <Participant
        members={members}
        setMembers={updateMembers}
        clearMembers={clearMembers}
        setAllMembers={setAllMembers}
      />
      <FormBtn
        submitText={FORM_INFO.SUBMIT_TEXT["create"]}
        formReset={handleReset}
      />
    </form>
  );
};

export default CreateForm;
