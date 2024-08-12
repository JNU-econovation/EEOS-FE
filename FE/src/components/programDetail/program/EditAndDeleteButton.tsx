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
      deleteProgram(programId, {
        onSettled: () => toast.loading(MESSAGE.DELETE.PENDING),
        onSuccess: () => {
          toast.success(MESSAGE.DELETE.SUCCESS);
          router.replace(ROUTES.MAIN);
        },
        onError: () => toast.error(MESSAGE.DELETE.FAILED),
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
