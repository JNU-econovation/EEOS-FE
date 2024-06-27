import Title from "@/components/common/Title";
import TeamManageSection from "@/components/manage/team/TeamManageSection";

const AdminManagePage = () => {
  return (
    <div>
      <Title text="팀 관리하기" />
      <TeamManageSection />
    </div>
  );
};

export default AdminManagePage;
