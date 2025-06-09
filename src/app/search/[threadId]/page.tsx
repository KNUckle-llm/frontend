"use client";

import QuestionThread from "@/app/entities/thread/QuestionThread";
import React, {
  FormEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useScrollStore } from "@/app/store/useScrollStore";
import { useParams } from "next/navigation";
import SVGLoadingSpinner from "@/app/entities/loading/SVGLoadingSpinner";
import { Message } from "@/app/lib/types/thread";
import { SubmitHandler, useForm } from "react-hook-form";
import InThreadQuestionInput from "@/app/entities/thread/InThreadQuestionInput";
import useDataFetch, {
  useDataFetchConfig,
} from "@/app/hooks/common/useDataFetch";

interface ISessionResponse {
  session_id: string;
  messages: Message[];
  last_updated: string;
  total_messages: number;
  created_at: string;
}

interface StreamingMessage {
  type: "start" | "chunk" | "end" | "error";
  content?: string;
  full_response?: string;
  message?: string;
  timestamp: string;
}

interface SearchPageProps {}

const SearchPage = ({}: SearchPageProps) => {
  const [result, setResult] = useState<ISessionResponse | null>(null);
  const [showAction, setShowAction] = useState(false);
  const [copyComplete, setCopyComplete] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  // 🔥 스트리밍 상태를 별도로 관리
  const [streamingState, setStreamingState] = useState({
    isStreaming: false,
    currentResponse: "",
    streamingMessageId: "",
    error: null as string | null,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

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
        top: mainRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

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

  useEffect(() => {
    if (streamingState.isStreaming && streamingState.currentResponse) {
      setResult((prev) => {
        if (!prev) return null;

        const updatedMessages = [...prev.messages];
        const streamingMessageIndex = updatedMessages.findIndex(
          (msg) => msg.id === streamingState.streamingMessageId,
        );

        if (streamingMessageIndex >= 0) {
          updatedMessages[streamingMessageIndex] = {
            ...updatedMessages[streamingMessageIndex],
            content: streamingState.currentResponse,
          };
        } else {
          const newStreamingMessage: Message = {
            id: streamingState.streamingMessageId,
            session_id: threadId as string,
            message_type: "ai",
            content: streamingState.currentResponse,
            createdAt: new Date(),
            timestamp: new Date().toISOString(),
          };
          updatedMessages.push(newStreamingMessage);
        }

        return {
          ...prev,
          messages: updatedMessages,
        };
      });
    }
  }, [
    streamingState.currentResponse,
    streamingState.isStreaming,
    streamingState.streamingMessageId,
    threadId,
  ]);

  useEffect(() => {
    if (
      !streamingState.isStreaming &&
      streamingState.streamingMessageId &&
      streamingState.currentResponse
    ) {
      setResult((prev) => {
        if (!prev) return null;

        const updatedMessages = prev.messages.map((msg) => {
          if (msg.id === streamingState.streamingMessageId) {
            return {
              ...msg,
              content: streamingState.currentResponse,
            };
          }
          return msg;
        });

        return {
          ...prev,
          messages: updatedMessages,
        };
      });

      // 스트리밍 상태 초기화
      setStreamingState({
        isStreaming: false,
        currentResponse: "",
        streamingMessageId: "",
        error: null,
      });
    }
  }, [
    streamingState.isStreaming,
    streamingState.streamingMessageId,
    streamingState.currentResponse,
  ]);

  // Form submit 함수
  const onSubmit: (data: { question: string }) => Promise<any> = async (data: {
    question: string;
  }) => {
    const { question } = data;

    if (!question.trim()) return;

    // 이전 요청 취소
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    scrollToBottom();
    setIsThinking(true);

    reset();

    // 🔥 사용자 질문 메시지 추가
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      session_id: threadId as string,
      message_type: "human",
      content: question.trim(),
      createdAt: new Date(),
      timestamp: new Date().toISOString(),
    };

    setResult((prev) => {
      if (!prev) {
        return {
          session_id: threadId as string,
          messages: [userMessage],
          last_updated: new Date().toISOString(),
          total_messages: 1,
          created_at: new Date().toISOString(),
        };
      } else {
        return {
          ...prev,
          messages: [...prev.messages, userMessage],
        };
      }
    });

    try {
      console.log("🚀 스트리밍 요청 시작:", question);

      const response = await fetch(`${serverUrl}/chat/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.trim(),
          session_id: threadId,
          stream: true,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // SSE 스트림 처리
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("응답 스트림을 읽을 수 없습니다");
      }

      let buffer = "";
      let streamingMessageId = "";
      let accumulatedResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data: StreamingMessage = JSON.parse(line.slice(6));
              console.log("스트리밍 데이터:", data);

              switch (data.type) {
                case "start":
                  streamingMessageId = `ai_${Date.now()}`;
                  accumulatedResponse = "";
                  setStreamingState({
                    isStreaming: true,
                    currentResponse: "",
                    streamingMessageId,
                    error: null,
                  });
                  console.log("스트리밍 시작:", data.timestamp);
                  break;

                case "chunk":
                  if (data.content) {
                    accumulatedResponse += data.content;
                    setStreamingState((prev) => ({
                      ...prev,
                      currentResponse: accumulatedResponse,
                    }));
                  }
                  break;

                case "end":
                  const finalResponse =
                    data.full_response || accumulatedResponse;
                  setStreamingState((prev) => ({
                    ...prev,
                    isStreaming: false,
                    currentResponse: finalResponse,
                  }));
                  console.log("스트리밍 완료:", data.timestamp);
                  break;

                case "error":
                  setStreamingState((prev) => ({
                    ...prev,
                    isStreaming: false,
                    error: data.message || "알 수 없는 오류가 발생했습니다",
                  }));
                  console.error("스트리밍 오류:", data.message);
                  break;
              }
            } catch (parseError) {
              console.error("JSON 파싱 오류:", parseError);
            }
          }
        }
      }

      console.log("🎉 스트리밍 완료");
    } catch (error: any) {
      console.error("스트리밍 오류:", error);

      if (error.name === "AbortError") {
        console.log("요청이 취소되었습니다");
      } else {
        setStreamingState((prev) => ({
          ...prev,
          isStreaming: false,
          error: error.message || "네트워크 오류가 발생했습니다",
        }));
      }
    } finally {
      setIsThinking(false);
    }
  };

  // 🔥 스크롤 자동 이동
  useEffect(() => {
    if (streamingState.currentResponse) {
      setTimeout(scrollToBottom, 100);
    }
  }, [streamingState.currentResponse]);

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
      {result && result.messages.length > 0 && !loading ? (
        <section className={"relative mx-auto max-w-5xl w-full"}>
          <QuestionThread
            result={result}
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
            handleSubmit={handleSubmit(onSubmit as SubmitHandler<any>)}
            register={register}
          />
        </section>
      ) : (
        <div className={"py-12"}>
          <SVGLoadingSpinner />
        </div>
      )}
    </ErrorBoundary>
  );
};

const ErrorBox = ({ error, resetErrorBoundary }: Partial<FallbackProps>) => {
  return (
    <div className="p-12 w-full h-full flex flex-col items-center justify-center">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong>예기치 않은 오류가 발생했습니다.</strong> {error}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700 cursor-pointer"
        onClick={resetErrorBoundary}
      >
        다시 시도하기
      </button>
    </div>
  );
};

export default SearchPage;
