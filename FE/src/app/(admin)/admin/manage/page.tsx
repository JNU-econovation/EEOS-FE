import CancleBtn from "@/components/manage/CancleBtn";
import MemberManageSection from "@/components/manage/member/MemberManageSection";
import TeamManageSection from "@/components/manage/team/TeamManageSection";

const AdminManagePage = () => {
  return (
    <div>
      <TeamManageSection />
      <div className="mt-20">
        <MemberManageSection />
      </div>
      <div className="mt-10 flex w-full justify-end">
        <CancleBtn />
      </div>
    </div>
  );
};

export default AdminManagePage;
