import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");
  const path = searchParams.get("path");
  const branch = searchParams.get("branch");

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_API_TOKEN}`,
      },
    });

    if (!response.ok)
      throw new Error(`GitHub API responded with status ${response.status}`);

    const data = await response.json();
    const responseData = data
      .filter((item) => item.name !== "README.md")
      .map((item) => ({
        name: item.name.split(".")[0],
        download_url: item.html_url,
      }));

    return NextResponse.json(
      { responseData },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log("깃허브 요청 에러");
    console.error(error);
    return NextResponse.json(
      { error: "깃허브 요청 중 문제가 발생했습니다. 다시 시도해주세요." },
      { status: 500 },
    );
    // return NextResponse.json(
    //   {
    //     data: [],
    //   },
    //   {
    //     status: 200,
    //   },
    // );
  }
}
