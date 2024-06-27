import TeamList from "./TeamList";
import StatusToggleItem from "@/components/common/attendStatusToggle/StatusToggleItem";

const teams = [
  {
    teamId: 1,
    teamName: "BlackCompany",
  },
  {
    teamId: 2,
    teamName: "Team Ponyo?",
  },
  {
    teamId: 3,
    teamName: "Buddies",
  },
  {
    teamId: 4,
    teamName: "Team Rocket",
  },
];

const TeamManageSection = () => {
  return (
    <section>
      <form className="relative mt-6">
        <input
          className="w-full rounded border px-4 py-6 text-lg outline-none"
          type="text"
          placeholder="팀을 등록해주세요!"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <StatusToggleItem text="등록" color="green" />
        </div>
      </form>

      {/*  */}
      <ul className="mt-6 grid grid-cols-2 gap-4">
        {teams.map(({ teamId, teamName }) => (
          <TeamList key={teamId} teamName={teamName} />
        ))}
      </ul>
    </section>
  );
};

export default TeamManageSection;
