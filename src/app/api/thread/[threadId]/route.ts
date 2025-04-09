import { NextRequest } from "next/server";
import dbConnect from "@/app/api/config/db";
import { ThreadModel } from "@/app/lib/models/thread";

export const GET = async (req: NextRequest) => {
  const threadId = req.nextUrl.pathname.split("/").pop();
  await dbConnect();

  const thread = await ThreadModel.findById(threadId);

  if (thread) {
    return Response.json(thread);
  } else {
    return Response.json(
      {
        title: "해당 스레드가 존재하지 않습니다.",
        messages: [
          {
            role: "assistant",
            content: "해당 스레드가 존재하지 않습니다.",
            createdAt: new Date(),
          },
        ],
      },
      { status: 404 },
    );
  }
};
