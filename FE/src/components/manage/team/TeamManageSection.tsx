"use client";

import { useState } from "react";
import TeamList from "./TeamList";
import StatusToggleItem from "@/components/common/StatusToggleItem";
import Title from "@/components/common/Title/Title";
import { useCreateTeam, useTeamQuery } from "@/hooks/query/useTeamQuery";

const TeamManageSection = () => {
  const [inputText, setInputText] = useState("");
  const { mutate: createTeam, isLoading: isCreating } = useCreateTeam();
  const { data, isLoading } = useTeamQuery();

  const createTeamWithName = (e) => {
    e.preventDefault();
    createTeam(inputText);
    setInputText("");
  };

  return (
    <section>
      <Title text="팀 관리하기" />
      <form className="relative mt-6" onSubmit={createTeamWithName}>
        <input
          className="w-full rounded border px-4 py-6 text-lg outline-none"
          type="text"
          placeholder="팀을 등록해주세요!"
          name="teamName"
          autoComplete="off"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2"
          disabled={isCreating}
        >
          <StatusToggleItem text="등록" color="green" />
        </button>
      </form>

      {/*  */}
      <ul className="mt-6 grid grid-cols-2 gap-4">
        {/* TODO:로더 적용하기 */}
        {isLoading && <></>}

        {data &&
          data.teams.map(({ teamId, teamName }, i) => (
            <TeamList
              key={`${teamId}-${teamName}-${i}`}
              teamId={teamId}
              teamName={teamName}
            />
          ))}
      </ul>
    </section>
  );
};

export default TeamManageSection;
