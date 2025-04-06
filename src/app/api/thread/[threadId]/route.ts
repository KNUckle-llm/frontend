import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  params: Promise<{ threadId: string }>,
) => {
  const { threadId } = await params;

  console.log(threadId);

  return Response.json({
    title: threadId || "제목",
    content: `안녕하세요. ${threadId}에 대해서 설명해드리겠습니다. ${threadId}은........`,
  });
};
