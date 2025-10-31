import ROUTES from "@/constants/ROUTES";
import { useLogoutMutation } from "@/hooks/query/useAuthQuery";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Title from "../Title/Title";

const ERROR_TITLE = "ERROR";
const RETRY_BUTTON_TEXT = "Try again";
// const RETRY_BUTTON_TEXT = "Try again";

type FallbackProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resetErrorBoundary?: (...args: any[]) => void;
  retryButton?: boolean;
};

const ErrorFallback = ({
  error,
  resetErrorBoundary = () => {},
  retryButton = true,
}: FallbackProps) => {
  const router = useRouter();
  const { mutate: logout } = useLogoutMutation();
  const { reset } = useQueryErrorResetBoundary();
  const handleReset = () => {
    reset();
    resetErrorBoundary();
  };
  const handleLogout = () => {
    logout();
    router.push(ROUTES.LOGIN);
  };

  return (
    <div className="flex h-fit w-full min-w-[15rem] flex-col items-center justify-center gap-4 bg-background py-6">
      <Image
        src="/icons/error.svg"
        alt="에러 바운더리"
        width={60}
        height={60}
      />
      <Title text={ERROR_TITLE} textColor="error" />
      {error?.message && <p className="text-sm font-normal">{error.message}</p>}
      <div className="flex gap-2">
        {retryButton && (
          <button
            className="mt-2 rounded-lg bg-gray-200 px-4 py-2"
            onClick={handleReset}
          >
            {RETRY_BUTTON_TEXT}
          </button>
        )}
        <button
          className="mt-2 rounded-lg bg-error px-4 py-2 text-white"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};
export default ErrorFallback;
