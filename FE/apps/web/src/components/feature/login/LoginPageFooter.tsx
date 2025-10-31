const LoginLinks = [
  {
    name: "About EEOS",
    href: "https://triangular-attempt-ae3.notion.site/About-EEOS-721eab294aa04a729fa6afcd7cf21d4c?pvs=4",
  },
  {
    name: "EEOS Manual",
    href: "https://triangular-attempt-ae3.notion.site/EEOS-MANUAL-685d0760a36840979875bca08c03abef?pvs=4",
  },
  {
    name: "개인정보처리방침",
    href: "https://triangular-attempt-ae3.notion.site/7bfa5c21cf9c4d7fa24387e64540b573?pvs=4",
  },
  {
    name: "고객의 소리",
    href: "https://padlet.com/jsp8514/eeos-feedback-34nct436veaklw9e",
  },
];

const LoginPageFooter = () => {
  return (
    <ul className="mt-24 flex items-center justify-center gap-4">
      {LoginLinks.map(({ href, name }, index) => (
        <>
          <li key={`${name}-${index}`} className="text-gray-40">
            <a href={href} target="_blank">
              {name}
            </a>
          </li>
          <p key={`${name}-${index}`}>|</p>
        </>
      ))}
      <p className="cursor-default font-semibold">@Black Company</p>
    </ul>
  );
};

export default LoginPageFooter;
