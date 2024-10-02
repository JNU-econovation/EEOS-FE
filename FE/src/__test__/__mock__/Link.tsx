export const Link = jest.fn(({ children, href }) => (
  <a role="link" href={href} onClick={(e) => e.preventDefault()}>
    {children}
  </a>
));
