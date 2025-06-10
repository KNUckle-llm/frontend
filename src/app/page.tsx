"use client";
import { useRef, useState } from "react";
import QuestionInput from "@/app/entities/common/QuestionInput";
import { useRouter } from "next/navigation";
import axios from "axios";
import Footer from "@/app/entities/common/Footer";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import useSearchStore from "@/app/store/useSearchStore";

export default function Home() {
  const [isThinking, setIsThinking] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, watch, reset } = useForm<{
    question: string;
  }>();
  const { setSearchQuery, setIsSearching, setSessionId } = useSearchStore();
  const inputText = useRef("");
  inputText.current = watch("question") || "";

  const onSubmit = handleSubmit(async (data: { question: string }) => {
    try {
      const { question } = data;
      if (!question) return;
      setIsThinking(true);
      // 세션 아이디 생성 후 전역상태로 저장 후 이동
      const session_id = uuidv4();
      setSearchQuery(question);
      setIsSearching(true);
      setSessionId(session_id);
      reset();
      router.push("search/" + session_id);
    } catch (error) {
      console.error("채팅 전송 실패", error);
    } finally {
      setIsThinking(false);
    }
  });

  return (
    <div
      className={"relative h-full flex flex-col items-center justify-center"}
    >
      <h1 className={"text-4xl font-extralight mb-8"}>환영합니다.</h1>
      <QuestionInput
        thinking={isThinking}
        handleSubmit={onSubmit}
        register={register}
      />
      <Footer />
    </div>
  );
}
