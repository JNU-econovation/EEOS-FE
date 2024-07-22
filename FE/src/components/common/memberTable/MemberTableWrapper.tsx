"use client";

import { useSetAtom } from "jotai";
import { createContext, useState } from "react";
import Header from "./compounds/Header";
import ListInCreateType from "./compounds/ListInCreateType";
import ListInEditType from "./compounds/ListInEditTypeProps";
import ListInManageType from "./compounds/ListInManageType";
import StatusTab from "./compounds/StatusTab";
import { memberTableCheckedAtom } from "@/store/memberTableCheckedAtom";
import { ActiveStatusWithAll } from "@/types/member";

interface MemberContextType {
  tab: {
    selectedActive: ActiveStatusWithAll;
    setSelectedActive: React.Dispatch<
      React.SetStateAction<ActiveStatusWithAll>
    >;
  };
  createData: {
    setChecked: (checked: boolean) => void;
  };
}

export const MemberContext = createContext<MemberContextType>(null);

interface MemberTableWrapperProps {
  applyLayout?: boolean;
  children: React.ReactNode;
}

/**
 * 레이아웃 : "space-y-6 pt-10"
 */
const MemberTableWrapper = ({
  applyLayout = false,
  children,
}: MemberTableWrapperProps) => {
  //tab 상태
  const [selectedActive, setSelectedActive] =
    useState<ActiveStatusWithAll>("all");

  const tab = {
    selectedActive,
    setSelectedActive,
  };

  //create
  const setChecked = useSetAtom(memberTableCheckedAtom);

  const createData = {
    setChecked,
  };

  return (
    <MemberContext.Provider value={{ tab, createData }}>
      <div className={applyLayout ? "space-y-6 pt-10" : ""}>{children}</div>
    </MemberContext.Provider>
  );
};

MemberTableWrapper.StatusTab = StatusTab;
MemberTableWrapper.Header = Header;
MemberTableWrapper.CreateList = ListInCreateType;
MemberTableWrapper.EditList = ListInEditType;
MemberTableWrapper.ManageList = ListInManageType;
export default MemberTableWrapper;
