"use client";

// import MemberTableWrapper from "../common/memberTable/MemberTableWrapper";
// import TabAsChild from "../common/tabs/TabAsChild/TabAsChild";
// // import ManageTable from "../manage/member/memberManageTable/ManageTable";
// import ParticipantTable from "./participantTable/ParticipantTable";
// import ACTIVE_STATUS from "@/constants/ACTIVE_STATUS";
// import { ActiveStatusWithAll } from "@/types/member";

interface MemberTableProps {
  members: Set<number>;
  setMembers: (memberId: number) => void;
  onClickHeaderCheckBox?: (selected: boolean) => void;
}

const Participant = ({} // members,
// setMembers,
// onClickHeaderCheckBox,
: MemberTableProps) => {
  return (
    // <TabAsChild<ActiveStatusWithAll>
    //   defaultSelected="all"
    //   options={Object.values(ACTIVE_STATUS.TAB_WITH_ALL)}
    //   tabSize="lg"
    //   baseColor="gray"
    //   pointColor="teal"
    //   align="line"
    // >
    //   {({ selectedItem }) => (
    //     <div className="mt-4">
    //       <ParticipantTable
    //         members={members}
    //         setMembers={setMembers}
    //         selectedActive={selectedItem}
    //         onClickHeaderCheckBox={onClickHeaderCheckBox}
    //       />
    //     </div>
    //   )}
    // </TabAsChild>
    <></>
  );
};

export default Participant;

{
  /* 
<MemberTableWrapper applyLayout>
<MemberTableWrapper.StatusTab />
<div className="overflow-x-scroll scrollbar-hide">
  <MemberTableWrapper.Header
    formType="create"
    onClickCheckBox={onClickHeaderCheckBox}
  />
  <MemberTableWrapper.CreateList
    members={members as Set<number>}
    setMembers={setMembers as (memberId: number) => void}
  />
</div>
</MemberTableWrapper> */
}
