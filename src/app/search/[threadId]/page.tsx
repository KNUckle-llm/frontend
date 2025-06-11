"use client";

import QuestionThread from "@/app/entities/thread/QuestionThread";
import React, {
  FormEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useScrollStore } from "@/app/store/useScrollStore";
import { useParams } from "next/navigation";
import SVGLoadingSpinner from "@/app/entities/loading/SVGLoadingSpinner";
import { ISessionResponse, Message } from "@/app/lib/types/thread";
import { SubmitHandler, useForm } from "react-hook-form";
import InThreadQuestionInput from "@/app/entities/thread/InThreadQuestionInput";
import useDataFetch, {
  useDataFetchConfig,
} from "@/app/hooks/common/useDataFetch";
import ErrorBox from "@/app/entities/error/ErrorBox";
import useStreaming from "@/app/hooks/chat/useStreaming";

interface SearchPageProps {}

interface IData {
  question: string;
}

const SearchPage = ({}: SearchPageProps) => {
  const [result, setResult] = useState<ISessionResponse | null>(null);
  const [showAction, setShowAction] = useState(false);
  const [copyComplete, setCopyComplete] = useState(false);
  // const [isThinking, setIsThinking] = useState(false);

  // Form
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
  const serverUrl = process.env.AI_SERVER_URL || "http://localhost:8000";

  const [initialStat, setInitialStat] = useState<Message | null>();

  const getThreadDataConfig: useDataFetchConfig = {
    url: `${serverUrl}/chat/history/${threadId}`,
    method: "GET",
    onSuccess: (data: ISessionResponse) => {
      setResult(data);
    },
    dependencies: [threadId],
  };
  const { loading, error, refetch } =
    useDataFetch<ISessionResponse>(getThreadDataConfig);

  const scrollToBottom = () => {
    if (mainRef && mainRef.current) {
      mainRef.current?.scrollTo({
        top: mainRef.current.scrollHeight + 200,
        behavior: "smooth",
      });
    }
  };

  const { onSubmit, streamingState, isThinking } = useStreaming({
    setResult,
    scrollToBottom,
    setInitialStat,
    loading,
    resetForm: reset,
    threadId: threadId as string,
  });

  const scrollToEnd = (ref: RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
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

  // useEffect(() => {
  //   if (initialStat && isThinking) {
  //     setResult((prev) => {
  //       if (!prev) {
  //         console.log("세션 정보 없음 - 새로운 세션 생성");
  //         return {
  //           session_id: threadId as string,
  //           messages: [initialStat],
  //           last_updated: new Date().toISOString(),
  //           total_messages: 1,
  //           created_at: new Date().toISOString(),
  //         };
  //       } else {
  //         return {
  //           ...prev,
  //           messages: [...prev.messages, initialStat],
  //           total_messages: prev.total_messages + 1,
  //         };
  //       }
  //     });
  //     setInitialStat(null);
  //   }
  // }, [initialStat, isThinking]);

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

  if (streamingState.error) {
    return <ErrorBox error={streamingState.error} />;
  }

  return (
    <ErrorBoundary fallback={<ErrorBox />}>
      <section className={"relative mx-auto max-w-5xl w-full"}>
        <QuestionThread
          result={result!}
          onComplete={() => {
            setShowAction(true);
          }}
          showAction={showAction}
          copyComplete={copyComplete}
          onClick={copyToClipboard}
          onClickRelative={onClickRelative}
          scrollToEnd={scrollToEnd}
          isStreaming={streamingState.isStreaming}
        />

        <InThreadQuestionInput
          isThinking={isThinking || streamingState.isStreaming}
          handleSubmit={handleSubmit(onSubmit as SubmitHandler<IData>)}
          register={register}
        />
      </section>
    </ErrorBoundary>
  );
};

export default SearchPage;
