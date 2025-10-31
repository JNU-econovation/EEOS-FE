import StyledLinkButton from "../../../common/Button/StyledLinkButton";

const GuestLoginBtn = () => {
  return (
    <StyledLinkButton
      linkUrl="/guest/main"
      buttonText="Visit EEOS"
      imageUrl="/icons/blackCompany.svg"
      color="guest"
    />
  );
};

export default GuestLoginBtn;
