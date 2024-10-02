export const checkIsValidateGithubUrl = (githubUrl: string) => {
  const urlPattern =
    /^https:\/\/github\.com\/JNU-econovation\/weekly_presentation\/tree\/(\d{4}-[12])\/(\d{4}-[12])\/(A_team|B_team)\/([1-9](st|nd|rd|th))$/;

  if (!urlPattern.test(githubUrl)) {
    return false;
  }

  return true;
  return true;
};
