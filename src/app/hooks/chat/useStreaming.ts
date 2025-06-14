import {
  BaseSyntheticEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ISessionResponse, Message } from "@/app/lib/types/thread";
import { SubmitHandler } from "react-hook-form";
import useSearchStore from "@/app/store/useSearchStore";

interface StreamingMessage {
  type: "start" | "chunk" | "end" | "error";
  content?: string;
  full_response?: string;
  message?: string;
  timestamp: string;
}

interface IData {
  question: string;
}

interface useStreamingProps {
  setResult: Dispatch<SetStateAction<ISessionResponse | null>>;
  scrollToBottom: () => void;
  threadId: string | null;
  setInitialStat: (message: Message) => void;
  loading?: boolean;
  resetForm: () => void;
}

const useStreaming = ({
  setResult,
  scrollToBottom,
  threadId,
  setInitialStat,
  loading,
  resetForm,
}: useStreamingProps) => {
  const [isThinking, setIsThinking] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const serverUrl = process.env.AI_SERVER_URL || "http://localhost:8000";

  // 🔥 스트리밍 상태를 별도로 관리
  const [streamingState, setStreamingState] = useState({
    isStreaming: false,
    currentResponse: "",
    streamingMessageId: "",
    error: null as string | null,
  });

  // 🔥 스트리밍 과정에서 누적되는 응답을 관리하는 ref 추가
  const accumulatedResponseRef = useRef("");
  const streamingMessageIdRef = useRef("");

  const {
    searchQuery,
    setSearchQuery,
    sessionId,
    setSessionId,
    isSearching,
    setIsSearching,
  } = useSearchStore((state) => state);

  // 메인페이지에서 가져온 검색어에 대한 요청
  useEffect(() => {
    const search = async () => {
      console.log("메인에서 검색한 것인지 검증");
      console.log("searchQuery:", searchQuery);
      console.log("sessionId:", sessionId);
      console.log("threadId:", threadId);

      if (!searchQuery || !sessionId || loading) return;
      if (searchQuery && sessionId === threadId && !loading) {
        console.log("메인 페이지 최초 검색 실행", searchQuery);
        setIsSearching(false);

        await onSubmit({ question: searchQuery });
        setSearchQuery("");
        setSessionId("");
      }
    };
    search();
  }, [loading]);

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

      // 🔥 ref도 초기화
      accumulatedResponseRef.current = "";
      streamingMessageIdRef.current = "";
    }
  }, [
    streamingState.isStreaming,
    streamingState.streamingMessageId,
    streamingState.currentResponse,
  ]);

  // 🔥 수정된 processEvent 함수
  const processEvent = (data: StreamingMessage) => {
    switch (data.type) {
      case "start":
        // 🔥 ref를 사용하여 값 초기화 및 저장
        streamingMessageIdRef.current = `ai_${Date.now()}`;
        accumulatedResponseRef.current = "";

        setStreamingState({
          isStreaming: true,
          currentResponse: "",
          streamingMessageId: streamingMessageIdRef.current,
          error: null,
        });
        setIsThinking(false);
        console.log("스트리밍 시작:", data.timestamp);
        break;

      case "chunk":
        if (data.content) {
          // 🔥 ref에 누적하고 상태 업데이트
          accumulatedResponseRef.current += data.content;

          setStreamingState((prev) => ({
            ...prev,
            currentResponse: accumulatedResponseRef.current,
          }));
        }
        break;

      case "end":
        const finalResponse =
          data.full_response || accumulatedResponseRef.current;
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
  };

  // Form submit 함수
  const onSubmit: SubmitHandler<IData> = async (
    data: IData,
    event?: BaseSyntheticEvent,
    isMain?: boolean,
  ) => {
    let { question } = data;

    if (isMain && searchQuery) {
      question = searchQuery.trim();
    }

    if (!question || !question.trim()) return;

    if (!isMain) {
      resetForm();
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    resetForm();
    const userMessage: Message = createOptimisticMessage(question);
    setIsThinking(true);
    addMessageToResult(userMessage);
    setTimeout(scrollToBottom, 100);

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

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("응답 스트림을 읽을 수 없습니다");
      }

      let buffer = "";

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
              // 🔥 수정된 함수 호출 - 매개변수 제거
              processEvent(data);
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

  const createOptimisticMessage = (question: string): Message => {
    return {
      id: `user_${Date.now()}`,
      session_id: threadId as string,
      message_type: "human",
      content: question.trim(),
      createdAt: new Date(),
      timestamp: new Date().toISOString(),
    };
  };

  const addMessageToResult = (message: Message) => {
    setResult((prev) => {
      const updatedMessages = prev?.messages || [];
      updatedMessages.push(message);
      return {
        session_id: prev?.session_id || (threadId as string),
        messages: updatedMessages,
        last_updated: new Date().toISOString(),
        created_at: prev?.created_at || new Date().toISOString(),
        total_messages: (prev?.total_messages || 0) + 1,
      };
    });
  };

  // 🔥 스크롤 자동 이동
  useEffect(() => {
    if (streamingState.currentResponse) {
      setTimeout(scrollToBottom, 100);
    }
  }, [streamingState.currentResponse]);

  return { isThinking, onSubmit, streamingState };
};

export default useStreaming;
