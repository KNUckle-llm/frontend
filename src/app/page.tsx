"use client";
import { FormEvent, FormEventHandler, useState } from "react";
import QuestionInput from "@/app/entities/common/QuestionInput";
import SidebarLayout from "@/app/entities/layout/SidebarLayout";

export default function Home() {
  const [isFocused, setIsFocused] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [inputText, setInputText] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("query send");
    setIsThinking(true);
    const timeout = setTimeout(() => {
      setIsThinking(false);
    }, 2000);
  };
  return (
    <section className={"w-full h-screen"}>
      <SidebarLayout>
        <div className={"h-full flex flex-col items-center justify-center"}>
          <h1 className={"text-4xl font-extralight mb-8"}>환영합니다.</h1>
          <QuestionInput
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            thinking={isThinking}
            onSubmit={onSubmit}
            inputText={inputText}
            setInputText={setInputText}
          />
        </div>
      </SidebarLayout>
    </section>
  );
}
