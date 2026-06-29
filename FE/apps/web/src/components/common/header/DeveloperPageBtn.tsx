const DEVELOPER_PAGE_URL = process.env.NEXT_PUBLIC_DEVELOPER_PAGE_URL;

const DeveloperPageBtn = () => {
  if (!DEVELOPER_PAGE_URL) return null;

  return (
    <a
      href={DEVELOPER_PAGE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg bg-gradient-to-r from-tertiary-20 to-slack px-4 py-2 text-sm font-medium text-background transition-colors"
    >
      개발자 페이지
    </a>
  );
};

export default DeveloperPageBtn;
