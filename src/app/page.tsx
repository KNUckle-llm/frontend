"use client";
import { FormEvent, useState } from "react";
import QuestionInput from "@/app/entities/common/QuestionInput";
import { useRouter } from "next/navigation";
import axios from "axios";
import Footer from "@/app/entities/common/Footer";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [isFocused, setIsFocused] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [inputText, setInputText] = useState("");

  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!inputText) return;
      const session_id = uuidv4();
      const serverUrl = process.env.AI_SERVER_URL;
      const response = await axios.post(
        `${serverUrl || "http://localhost:8000"}/chat`,
        {
          question: inputText,
          session_id: session_id,
        },
      );
      setIsThinking(true);
      const data = response.data;

      if (data) {
        router.push("search/" + session_id);
      }
    } catch (error) {
      console.error("채팅 전송 실패", error);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div
      className={"relative h-full flex flex-col items-center justify-center"}
    >
      <h1 className={"text-4xl font-extralight mb-8"}>환영합니다.</h1>
      <QuestionInput
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        thinking={isThinking}
        onSubmit={onSubmit}
        inputText={inputText}
        setInputText={setInputText}
      />
      <Footer />
    </div>
  );
}
