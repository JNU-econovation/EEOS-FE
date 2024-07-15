export const checkIsValidateGithubUrl = (githubUrl: string) => {
  if (!githubUrl || githubUrl == "") return false;
  const parsedUrl = new URL(githubUrl);

  const isGithubUrl = parsedUrl.hostname === "github.com";
  if (!isGithubUrl) return false;

  const parts = parsedUrl.pathname.split("/").filter(Boolean);
  if (parts.length < 2) return false;

  const treeIndex = parts.indexOf("tree");
  if (treeIndex !== -1 && parts.length <= treeIndex + 1) return false;

  return true;
};
