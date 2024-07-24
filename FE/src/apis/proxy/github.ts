import proxy from "./instance";
import { convertGitHubUrl } from "@/utils/convert";

export const getPresentations = async (githubUrl: string) => {
  const { branch, owner, path, repo } = convertGitHubUrl(githubUrl);

  const data = await proxy
    .get("/github", {
      params: {
        owner,
        repo,
        path,
        branch,
      },
    })
    .then((res) => res.data.data);

  console.log(data);
  return data;
};
