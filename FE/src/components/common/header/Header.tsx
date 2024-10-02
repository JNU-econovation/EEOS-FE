import HeaderNavSection from "./HeaderNavSection";
import Logo from "./Logo";

interface HeaderProps {
  isAdmin?: boolean;
}

const Header = ({ isAdmin = false }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between rounded-b-xl bg-background px-2 py-4 shadow-sm sm:px-32">
      <Logo isAdmin={isAdmin} />
      <HeaderNavSection isAdmin={isAdmin} />
    </header>
  );
};
export default Header;
