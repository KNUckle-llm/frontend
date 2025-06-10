"use client";

import QuestionThread from "@/app/entities/thread/QuestionThread";
import { FormEvent, RefObject, useEffect, useRef, useState } from "react";
import { useScrollStore } from "@/app/store/useScrollStore";
import { useParams } from "next/navigation";
import SVGLoadingSpinner from "@/app/entities/loading/SVGLoadingSpinner";
import { Message } from "@/app/lib/types/thread";
import { SubmitHandler, useForm } from "react-hook-form";
import InThreadQuestionInput from "@/app/entities/thread/InThreadQuestionInput";
import useDataFetch, {
  useDataFetchConfig,
} from "@/app/hooks/common/useDataFetch";
import useSearchStore from "@/app/store/useSearchStore";

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
  const abortControllerRef = useRef<AbortController | null>(null);

  const [streamingState, setStreamingState] = useState({
    isStreaming: false,
    currentResponse: "",
    streamingMessageId: "",
    error: null as string | null,
  });

  const searchStore = useSearchStore((state) => state);
  const {
    setIsSearching,
    searchQuery,
    isSearching,
    sessionId,
    setSearchQuery,
    setSessionId,
  } = searchStore;

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

  // 메인페이지에서 가져온 검색어에 대한 요청
  useEffect(() => {
    const search = async () => {
      if (!searchQuery || !sessionId || loading) return;
      if (searchQuery && sessionId === threadId && isSearching && !loading) {
        console.log("메인 페이지 최초 검색 실행", searchQuery);
        setIsSearching(false);

        // onSubmit 함수 호출 (낙관적 업데이트는 onSubmit 내부에서 처리)
        await onSubmit({ question: searchQuery }, true);
        setSearchQuery("");
        setSessionId("");
      }
    };
    search();
  }, [loading]);

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

  // 스트리밍 완료 시 최종 메시지 업데이트
  useEffect(() => {
    if (
      !streamingState.isStreaming &&
      streamingState.streamingMessageId &&
      streamingState.currentResponse
    ) {
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
    refetch,
  ]);

  type onSubmitProps = (
    data: { question: string },
    isMain?: boolean,
  ) => Promise<any>;

  // Form submit 함수
  const onSubmit: onSubmitProps = async (
    data: { question: string },
    isMain,
  ) => {
    let { question } = data;

    // 메인 페이지에서 온 경우 searchQuery 사용
    if (isMain && searchQuery) {
      question = searchQuery.trim();
    }

    if (!question || !question.trim()) return;

    // 폼 리셋 (일반 submit의 경우만)
    if (!isMain) {
      reset();
    }

    // 이전 요청 취소
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setIsThinking(true);
    scrollToBottom();

    // 🔥 사용자 질문 메시지 추가 (낙관적 업데이트)
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      session_id: threadId as string,
      message_type: "human",
      content: question.trim(),
      createdAt: new Date(),
      timestamp: new Date().toISOString(),
    };

    console.log("낙관적인 유저의 질문 업데이트", userMessage);

    setResult((prev) => {
      if (!prev) {
        console.log("세션 정보 없음 - 새로운 세션 생성");
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
          total_messages: prev.total_messages + 1,
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
                  setIsThinking(false); // 스트리밍 시작되면 thinking 상태 해제
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
    return (
      <div className="p-12 w-full h-full flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>오류:</strong> {streamingState.error}
        </div>
      </div>
    );
  }

  return (
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
        isThinking={isThinking}
        handleSubmit={handleSubmit(onSubmit as SubmitHandler<any>)}
        register={register}
      />
    </section>
  );
};

export default SearchPage;
