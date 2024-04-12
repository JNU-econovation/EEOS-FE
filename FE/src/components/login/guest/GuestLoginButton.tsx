import StyledLoginButton from "../ui/StyledLoginButton";

export default function GuestLoginButton() {
  return (
    <StyledLoginButton
      linkUrl="main?category=all&status=active&page=1"
      buttonText="Visit to EEOS"
      imageUrl="/icons/blackCompany.svg"
      color="guest"
    />
  );
}
