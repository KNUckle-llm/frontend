"use client";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import QuestionInput from "@/app/entities/common/QuestionInput";
import SidebarLayout from "@/app/entities/layout/SidebarLayout";
import { useRouter } from "next/navigation";
import QuestionThread from "@/app/entities/thread/QuestionThread";
import { useScrollStore } from "@/app/store/useScrollStore";
import axios from "axios";
import Footer from "@/app/entities/common/Footer";

interface IChatResponse {
  title: string;
  content: string;
}

export default function Home() {
  const [isFocused, setIsFocused] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<IChatResponse[]>();
  const [showAction, setShowAction] = useState(false);
  const [copyComplete, setCopyComplete] = useState(false);

  const router = useRouter();
  const mainRef = useScrollStore((state) => state.mainRef);

  const scrollToBottom = () => {
    if (mainRef && mainRef.current) {
      console.log("asdfas");
      mainRef.current?.scrollTo({
        top: mainRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputText) return;
    console.log("query send");
    setIsThinking(true);
    setResult([
      {
        title: inputText,
        content: `안녕하세요. ${inputText}에 대해서 설명해드리겠습니다. ${inputText}은........`,
      },
    ]);

    router.push("?q=" + encodeURIComponent(inputText));

    const timeout = setTimeout(() => {
      setIsThinking(false);
    }, 2000);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content || "").then(() => {
      setCopyComplete(true);
    });
    setCopyComplete(true);
    setTimeout(() => {
      setCopyComplete(false);
    }, 2000);
  };

  const onClickRelative = (e: FormEvent, relativeQuestion: string) => {
    console.log("click relative");
    e.preventDefault();
    if (!relativeQuestion) return;
    console.log("query send");
    setIsThinking(true);
    setResult((prev) => [
      ...(prev || []),
      {
        title: relativeQuestion,
        content: `안녕하세요. ${relativeQuestion}에 대해서 설명해드리겠습니다. ${relativeQuestion}은........`,
      },
    ]);

    const timeout = setTimeout(() => {
      setIsThinking(false);
    }, 2000);
  };

  return (
    <section className={"w-full h-screen"}>
      <SidebarLayout>
        {result ? (
          <QuestionThread
            result={result}
            onComplete={() => {
              setShowAction(true);
              scrollToBottom();
            }}
            showAction={showAction}
            copyComplete={copyComplete}
            onClick={copyToClipboard}
            onClickRelative={onClickRelative}
          />
        ) : (
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
            <Footer />
          </div>
        )}
      </SidebarLayout>
    </section>
  );
}
