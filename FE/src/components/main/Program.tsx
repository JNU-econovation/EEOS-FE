"use client";
import ProgramWrapper from "./Program.compound";

const Program = () => {
  return (
    <ProgramWrapper>
      <ProgramWrapper.CategoryTab />
      <ProgramWrapper.StatusTab />
      <ProgramWrapper.Content />
    </ProgramWrapper>
  );
};

export default Program;
