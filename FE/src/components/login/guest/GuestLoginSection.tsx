import GuestLoginButton from "./GuestLoginButton";

const GuestLoginSection = ({ title }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-light">{title}</p>
      <GuestLoginButton />
    </div>
  );
};

export default GuestLoginSection;
