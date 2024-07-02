import Title from "@/components/common/Title";
import CreateForm from "@/components/common/form/program/CreateForm";

const ProgramCreatePage = () => {
  return (
    <div className="space-y-12">
      <Title text="행사 생성" />
      <CreateForm />
    </div>
  );
};
export default ProgramCreatePage;
