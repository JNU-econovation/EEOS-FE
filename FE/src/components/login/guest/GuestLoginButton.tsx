import StyledLoginButton from "../ui/StyledLoginButton";

export default function GuestLoginButton() {
  return (
    <StyledLoginButton
      linkUrl="/guest/main"
      buttonText="Visit to EEOS"
      imageUrl="/icons/blackCompany.svg"
      color="guest"
    />
  );
}
