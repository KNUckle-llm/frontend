"use client";
import { FormEvent, useState } from "react";
import QuestionInput from "@/app/entities/common/QuestionInput";
import { useRouter } from "next/navigation";
import axios from "axios";
import Footer from "@/app/entities/common/Footer";

export default function Home() {
  const [isFocused, setIsFocused] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [inputText, setInputText] = useState("");

  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputText) return;
    const response = await axios.post("/api/search", { inputText });
    setIsThinking(true);
    const data = response.data;
    if (data) {
      router.push("search/" + encodeURIComponent(inputText));

      const timeout = setTimeout(() => {
        setIsThinking(false);
      }, 2000);
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
