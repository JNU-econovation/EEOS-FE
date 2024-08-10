import proxy from "./instance";
import { convertGitHubUrl } from "@/utils/convert";

type Presentation = {
  name: string;
  download_url: string;
};

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
    .then((res) => {
      console.log(res.data.data);
      return res.data.data as Presentation[];
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  return data;
};
