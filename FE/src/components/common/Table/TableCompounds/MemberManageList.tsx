import classNames from "classnames";
import Image from "next/image";
import Selector from "../../Selector/Selector";
import { useTableContext } from "../TableWrapper";
import { MemberActiveStatusInfoDto } from "@/apis/dtos/member.dto";
import ACTIVE_STATUS from "@/constants/ACTIVE_STATUS";
import DEPARTMENTS, {
  findDepartmentEnNameFromKoName,
} from "@/constants/DEPARTMENT";
import DEPARTMENT from "@/constants/DEPARTMENT";
import {
  useDeleteMember,
  usePutUpdateMemberDepartment,
  useUpdateMemberActiveStatus,
} from "@/hooks/query/useMemberQuery";

interface MemberManageListProps {
  memberList: MemberActiveStatusInfoDto[];
}
const MemberManageList = ({ memberList }: MemberManageListProps) => {
  const { columnWidths } = useTableContext();
  const { mutate: deleteMember } = useDeleteMember();
  const { mutate: updateMemberActiveStatus } = useUpdateMemberActiveStatus();
  const { mutate: updateMemberDepartment } = usePutUpdateMemberDepartment();

  const handleDeleteMember = (memberId: number) => {
    const ok = confirm("정말로 삭제하시겠습니까?");
    ok && deleteMember({ memberId });
  };

  const listGridStyle = `grid-cols-[${columnWidths}]`;
  const listColumnStyle = classNames(
    "grid h-20 w-fit items-center justify-items-center gap-4 border-b-2 border-stroke-10 bg-background px-10 sm:w-full",
    listGridStyle,
  );

  return (
    <>
      {memberList.map(({ activeStatus, memberId, name, department }) => (
        <div className={listColumnStyle} key={memberId}>
          <span>
            {department === "none"
              ? "-"
              : DEPARTMENT.DEPARTMENT_DETAILS[department]?.koName}
          </span>
          <span className="font-bold">{name}</span>
          <div className="flex w-full items-center justify-around">
            <Selector
              defaultValue={activeStatus}
              onValueChange={(value) => {
                updateMemberActiveStatus({
                  memberId,
                  activeStatus: value as keyof typeof ACTIVE_STATUS.TAB,
                });
              }}
            >
              <Selector.Trigger
                showText={(selectedValue) =>
                  ACTIVE_STATUS.TAB[selectedValue].text
                }
              />
              <Selector.Content>
                {Object.keys(ACTIVE_STATUS.TAB).map((key) => (
                  <Selector.MenuItem key={key} value={key}>
                    {ACTIVE_STATUS.TAB[key].text}
                  </Selector.MenuItem>
                ))}
              </Selector.Content>
            </Selector>
            <Selector
              defaultValue={DEPARTMENT.DEPARTMENT_DETAILS[department]?.koName}
              onValueChange={(value) => {
                updateMemberDepartment({
                  userId: memberId,
                  department: findDepartmentEnNameFromKoName(value),
                });
              }}
            >
              <Selector.Trigger />
              <Selector.Content>
                {["부서 선택", ...DEPARTMENTS.DEPARTMENTS].map((dept) => (
                  <Selector.MenuItem key={dept} value={dept}>
                    {dept}
                  </Selector.MenuItem>
                ))}
              </Selector.Content>
            </Selector>
          </div>
          <button onClick={() => handleDeleteMember(memberId)}>
            <Image
              src="/icons/trash.svg"
              width={22}
              height={22}
              alt="Delete Btn"
            />
          </button>
        </div>
      ))}
    </>
  );
};

export default MemberManageList;
