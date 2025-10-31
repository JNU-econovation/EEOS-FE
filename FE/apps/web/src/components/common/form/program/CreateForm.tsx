"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormBtn from "@/components/common/form/FormBtn";
import CreateCategory from "@/components/common/form/program/CreateCategory";
import ProgramDate from "@/components/common/form/program/ProgramDate";
import ProgramTitle from "@/components/common/form/program/ProgramTitle";
import MarkdownEditor from "@/components/common/markdown/MarkdownEditor";
import Participant from "@/components/programCreate/Participant";
import ProgramGithubLinkInput from "@/components/programCreate/ProgramGithubLinkInput";
import ProgramTeamList from "@/components/programCreate/ProgramTeamList";
import FORM_INFO from "@/constants/FORM_INFO";
import MESSAGE from "@/constants/MESSAGE";
import ROUTES from "@/constants/ROUTES";
import {
  useCreateProgram,
  useSendSlackMessage,
} from "@/hooks/query/useProgramQuery";
import { useMemberSet } from "@/hooks/useMemberForm";
import { ProgramCategory } from "@/types/program";
import { TeamInputInfo } from "@/types/team";

// import { checkIsValidateGithubUrl } from "@/utils/github";

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
  const { mutate: sendSlackMessage } = useSendSlackMessage();

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

    //TODO: 백엔드에서 유효성 검사하도록 수정. 백엔드와 논의 필요
    // const isValidGithubUrl = checkIsValidateGithubUrl(programGithubUrl);
    const isValidGithubUrl = true;
    if (!isValidGithubUrl) {
      toast.error("올바른 Github URL을 입력해주세요.");
      return;
    }
    const toastId = toast.loading(MESSAGE.CREATE.PENDING);

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
        onSuccess: ({ programId }) => {
          const confirm = window.confirm(MESSAGE.SLACK_MESSAGE.CONFIRM);
          const sendMessage = () => {
            if (!confirm) return;
            sendSlackMessage(programId, {
              onSuccess: () => {
                alert(MESSAGE.SLACK_MESSAGE.SUCCESS);
              },
              onError: () => {
                const retry = window.confirm(MESSAGE.SLACK_MESSAGE.FAIL);
                if (retry) sendMessage();
              },
            });
          };

          sendMessage();
          reset();
          router.replace(ROUTES.ADMIN_DETAIL(programId));
          toast.update(toastId, {
            render: MESSAGE.CREATE.SUCCESS,
            type: "success",
            isLoading: false,
            closeOnClick: true,
            autoClose: 3000,
          });
        },
        onError: () => {
          toast.error(MESSAGE.CREATE.FAILED);
          toast.update(toastId, {
            render: MESSAGE.CREATE.FAILED,
            type: "error",
            isLoading: false,
            closeOnClick: true,
            autoClose: 3000,
          });
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
