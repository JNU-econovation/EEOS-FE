import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import MESSAGE from "@/constants/MESSAGE";
import ROUTES from "@/constants/ROUTES";
import { useDeleteProgram } from "@/hooks/query/useProgramQuery";

const EditAndDeleteButton = ({ programId }) => {
  const router = useRouter();
  const { mutate: deleteProgram } = useDeleteProgram();

  const handleClickDelete = () => {
    if (confirm(MESSAGE.CONFIRM.DELETE)) {
      const toastId = toast.loading(MESSAGE.DELETE.PENDING);
      deleteProgram(programId, {
        onSuccess: () => {
          toast.update(toastId, {
            render: MESSAGE.DELETE.SUCCESS,
            type: "success",
            autoClose: 3000,
            isLoading: false,
            closeOnClick: true,
          });
          router.replace(ROUTES.ADMIN_MAIN);
        },
        onError: () =>
          toast.update(toastId, {
            type: "error",
            render: MESSAGE.DELETE.FAILED,
            autoClose: 3000,
            isLoading: false,
            closeOnClick: true,
          }),
      });
    }
  };

  return (
    <div className="flex items-end gap-3 sm:gap-6">
      <Link href={ROUTES.EDIT(programId)}>
        <Image
          src="/icons/pencil.svg"
          alt="프로그램 수정"
          width={22}
          height={22}
          className="h-[22px] w-[22px] hover:cursor-pointer"
        />
      </Link>
      <button onClick={handleClickDelete} type="button">
        <Image
          src="/icons/trash.svg"
          alt="프로그램 삭제"
          width={22}
          height={22}
          style={{ width: 22, height: 22 }}
          className="h-[22px] w-[22px] hover:cursor-pointer"
        />
      </button>
    </div>
  );
};
export default EditAndDeleteButton;
