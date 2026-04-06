const AnnouncementSection = () => {
  return (
    <section>
      <p className="text-xs font-medium text-[#767676]">일정 리마인드</p>
      <h2 className="text-lg font-semibold">에코노베이션 공지사항</h2>
      <ul className="flex flex-col gap-2">
        {/* <li className="rounded-lg bg-[#F2F2F7] p-2">공지사항 1</li>
        <li className="rounded-lg bg-[#F2F2F7] p-2">공지사항 2</li>
        <li className="rounded-lg bg-[#F2F2F7] p-2">공지사항 3</li> */}
        <div className="rounded-xl bg-[#F2F2F7] p-4 text-sm">
          <p>조만간 기능이 업데이트 될 예정입니다.</p>
          <p>조금만 기다려주세요! 😊</p>
        </div>
      </ul>
    </section>
  );
};

export default AnnouncementSection;
