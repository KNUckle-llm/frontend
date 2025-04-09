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

export const DELETE = async (req: NextRequest) => {
  const threadId = req.nextUrl.pathname.split("/").pop();
  await dbConnect();

  try {
    const deletedThread = await ThreadModel.findByIdAndDelete(threadId);

    if (deletedThread) {
      return Response.json({
        success: true,
        message: "스레드가 성공적으로 삭제되었습니다.",
      });
    } else {
      return Response.json(
        {
          success: false,
          message: "해당 스레드를 찾을 수 없습니다.",
        },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("스레드 삭제 중 오류 발생:", error);
    return Response.json(
      {
        success: false,
        message: "스레드 삭제 중 오류가 발생했습니다.",
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
};
