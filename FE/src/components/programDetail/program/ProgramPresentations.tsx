import Title from "@/components/common/Title";
import usePresentations from "@/hooks/query/usePresentations";

const ProgramPresentations = () => {
  const { data: presentations, isLoading } = usePresentations(
    "https://github.com/JNU-econovation/weekly_presentation/tree/2024-1/2024-1/B_team/1st",
  );

  return (
    <section>
      <Title text="발표자료 " />
      {isLoading && <div>로딩중...</div>}
      {presentations?.map((presentation) => (
        <div key={presentation.name}>
          <a href={presentation.download_url}>{presentation.name}</a>
        </div>
      ))}
    </section>
  );
};

export default ProgramPresentations;
