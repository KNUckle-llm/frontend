"use client";

import QuestionThread from "@/app/entities/thread/QuestionThread";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useScrollStore } from "@/app/store/useScrollStore";
import axios from "axios";
import { useParams } from "next/navigation";
import SVGLoadingSpinner from "@/app/entities/loading/SVGLoadingSpinner";
import { Message } from "@/app/lib/types/thread";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm, UseFormHandleSubmit } from "react-hook-form";
import InThreadQuestionInput from "@/app/entities/thread/InThreadQuestionInput";

interface IChatResponse {
  title: string;
  messages: Message[];
}
interface SearchPageProps {}

const SearchPage = ({}: SearchPageProps) => {
  const [result, setResult] = useState<IChatResponse>();
  const [showAction, setShowAction] = useState(false);
  const [copyComplete, setCopyComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const inputText = useRef("");
  inputText.current = watch("question") || "";
  const mainRef = useScrollStore((state) => state.mainRef);
  const params = useParams();
  const threadId = params.threadId;

  useEffect(() => {
    getThreadData();
  }, []);

  const getThreadData = async () => {
    const serverUrl = process.env.AI_SERVER_URL || "http://localhost:8000";
    const response = await axios.get(`${serverUrl}/chat/history/${threadId}`);
    const data = await response.data;
    setResult(data);
    setLoading(false);
  };

  const scrollToBottom = () => {
    if (mainRef && mainRef.current) {
      mainRef.current?.scrollTo({
        top: mainRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
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
    e.preventDefault();
    if (!relativeQuestion) return;
  };

  // Form
  const onSubmit: (data: { question: string }) => Promise<any> = async (data: {
    question: string;
  }) => {
    const { question } = data;

    if (!question) return;
    setIsThinking(true);
    reset();

    try {
      const serverUrl = process.env.AI_SERVER_URL || "http://localhost:8000";
      const response = await axios.post(`${serverUrl}/chat`, {
        question: question,
        session_id: threadId,
      });

      getThreadData();
      scrollToBottom();
    } catch (error) {
      console.error("Error submitting question:", error);
      setIsThinking(false);
      return;
    } finally {
      setIsThinking(false);
    }
  };

  if (loading) {
    return (
      <div className={"p-12 w-full h-full flex items-center justify-center"}>
        <div
          className={
            "bg-neutral-800 rounded-lg flex flex-col items-center justify-center gap-4 p-8 text-white"
          }
        >
          <div className={"w-1/3 animate-pulse"}>
            <SVGLoadingSpinner className={""} />
          </div>
          <span className={"text-xl text-center animate-pulse "}>
            답변을 준비하는 중입니다.
          </span>
        </div>
      </div>
    );
  }

  return result && result.messages.length > 0 && !loading ? (
    <section
      className={
        "relative w-full h-full flex flex-col items-center justify-between"
      }
    >
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
      <InThreadQuestionInput
        isThinking={isThinking}
        handleSubmit={handleSubmit(onSubmit as SubmitHandler<any>)}
        register={register}
      />
    </section>
  ) : (
    <div className={"py-12"}>
      <SVGLoadingSpinner />
    </div>
  );
};

export default SearchPage;
