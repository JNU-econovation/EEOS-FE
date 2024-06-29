"use client";
import { useRef } from "react";
import TeamList from "./TeamList";
import StatusToggleItem from "@/components/common/attendStatusToggle/StatusToggleItem";
import { useTeam } from "@/hooks/query/useTeamQuery";

const TeamManageSection = () => {
  const inputText = useRef("");
  const { data, isLoading } = useTeam();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(inputText.current);
  };

  return (
    <section>
      <form className="relative mt-6" onSubmit={onSubmit}>
        <input
          className="w-full rounded border px-4 py-6 text-lg outline-none"
          type="text"
          placeholder="팀을 등록해주세요!"
          name="teamName"
          autoComplete="off"
          onChange={(e) => {
            inputText.current = e.target.value;
          }}
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2">
          <StatusToggleItem text="등록" color="green" />
        </button>
      </form>

      {/*  */}
      <ul className="mt-6 grid grid-cols-2 gap-4">
        {isLoading && <div />}
        {data &&
          data.teams.map(({ teamId, teamName }) => (
            <TeamList key={teamId} teamName={teamName} />
          ))}
      </ul>
    </section>
  );
};

export default TeamManageSection;
