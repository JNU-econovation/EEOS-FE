"use client";
import ProgramWrapper from "./Program.compound";
import { AccessType } from "@/types/access";

interface ProgramProps {
  AccessType: AccessType;
}

const Program = ({ AccessType }: ProgramProps) => {
  //TODO: headless 하도록 변경하기
  return (
    <ProgramWrapper>
      <ProgramWrapper.CategoryTab />
      <ProgramWrapper.StatusTab />
      <ProgramWrapper.Content contentType={AccessType} />
    </ProgramWrapper>
  );
};

export default Program;
