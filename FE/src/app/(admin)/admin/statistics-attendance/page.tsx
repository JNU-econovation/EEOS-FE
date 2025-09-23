import Title from "@/components/common/Title/Title";
import StatisticsAttendanceTabSection from "@/components/feature/statistics-attendance/StatisticsAttendanceTabSection";

const StatisticsAttendancePage = () => {
  return (
    <div>
      <Title text="출석 통계" textSize="2xl" />
      <div className="mt-8" />
      <StatisticsAttendanceTabSection />
    </div>
  );
};

export default StatisticsAttendancePage;
