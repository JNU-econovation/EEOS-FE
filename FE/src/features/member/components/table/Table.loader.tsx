import { MemberTableItemLoader } from "./TableItem.loader";

export const MemberTableLoader = () => {
  return (
    <>
      {[...Array(4)].map((_, index) => (
        <MemberTableItemLoader key={index} />
      ))}
    </>
  );
};
