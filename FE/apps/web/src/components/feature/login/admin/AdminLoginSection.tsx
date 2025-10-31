import LoginForm from "./LoginForm";
import { EeosAdminLogo } from "@/components/icons";

interface AdminLoginSectionProps {
  changeLoginType: () => void;
}
const AdminLoginSection = ({ changeLoginType }: AdminLoginSectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="rounded-lg border bg-gray-10 p-8">
        <EeosAdminLogo />
        <LoginForm />
        <button
          className="mt-4 w-full rounded-lg bg-gray-20 p-2 font-semibold"
          disabled
        >
          ID / PW 찾기
        </button>
      </div>
      {/* TODO: 명세서 수정 필요 */}
      <p className="mx-auto flex select-none" onClick={changeLoginType}>
        이전으로 돌아가기
      </p>
    </div>
  );
};

export default AdminLoginSection;
