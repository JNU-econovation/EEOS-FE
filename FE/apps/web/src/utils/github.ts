//TODO: githubUrl이 유효한지 검사하는 함수. 현재는 백엔드에서만 유효성 검사 하도록 수정됨. 추후에 백엔드와 논의 필요
export const checkIsValidateGithubUrl = (githubUrl: string) => {
  const urlPattern =
    /^https:\/\/github\.com\/JNU-econovation\/weekly_presentation\/tree\/(\d{4}-[12])\/(\d{4}-[12])\/((?:[AaBb][-_]?[Tt]eam))\/([1-9](st|nd|rd|th))$/;

  if (!urlPattern.test(githubUrl)) {
    return false;
  }

  return true;
  return true;
};
