import Header from "@/components/common/header/Header";
import AuthValidate from "@/components/common/validate/Auth";

export default function GuestLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <AuthValidate isHaveToLoggedInRoute={false} />
      <main className="my-16 w-full px-3 sm:max-w-[800px] lg:max-w-[1112px]">
        {children}
      </main>
    </>
  );
}
