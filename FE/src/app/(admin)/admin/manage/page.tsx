import MemberManageSection from "@/components/manage/member/MemberManageSection";
import TeamManageSection from "@/components/manage/team/TeamManageSection";

const AdminManagePage = () => {
  return (
    <div>
      <TeamManageSection />
      <div className="mt-20">
        <MemberManageSection />
      </div>
    </div>
  );
};

export default AdminManagePage;
