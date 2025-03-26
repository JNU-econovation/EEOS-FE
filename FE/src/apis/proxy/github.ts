import proxy from "./instance";
import { convertGitHubUrl } from "@/utils/convert";

type Presentation = {
  name: string;
  download_url: string;
};

export const getPresentations = async (
  githubUrl: string,
): Promise<Presentation[]> => {
  const { branch, owner, path, repo } = convertGitHubUrl(githubUrl);

  try {
    const response = await proxy.get("/github", {
      params: {
        owner,
        repo,
        path,
        branch,
      },
    });

    return response.data.responseData;
  } catch (error) {
    console.log("깃허브 요청 에러");
    console.error;
    return [];
  }
};
