// components/StreamingChat.tsx
"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

function StreamingChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { chatState, sendMessage, stopStreaming, clearChat } =
    useStreamingChat();

  // 메시지가 추가될 때마다 스크롤을 맨 아래로
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, chatState.currentResponse]);

  // 스트리밍 응답을 실시간으로 표시
  useEffect(() => {
    if (chatState.currentResponse && chatState.isLoading) {
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (
          lastMessage &&
          lastMessage.type === "assistant" &&
          lastMessage.isStreaming
        ) {
          // 기존 스트리밍 메시지 업데이트
          return prev.map((msg, index) =>
            index === prev.length - 1
              ? { ...msg, content: chatState.currentResponse }
              : msg,
          );
        } else {
          // 새 스트리밍 메시지 추가
          return [
            ...prev,
            {
              id: Date.now().toString(),
              type: "assistant",
              content: chatState.currentResponse,
              timestamp: new Date(),
              isStreaming: true,
            },
          ];
        }
      });
    }
  }, [chatState.currentResponse, chatState.isLoading]);

  // 스트리밍 완료 시 메시지 상태 업데이트
  useEffect(() => {
    if (chatState.fullResponse && !chatState.isLoading) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.isStreaming
            ? { ...msg, content: chatState.fullResponse, isStreaming: false }
            : msg,
        ),
      );
    }
  }, [chatState.fullResponse, chatState.isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || chatState.isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      await sendMessage(input.trim());
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
  };

  const handleClear = () => {
    clearChat();
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white">
      {/* 헤더 */}
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">🏫 공주대학교 AI 도우미</h1>
          <div className="flex gap-2">
            <span className="text-sm opacity-75">
              세션: {chatState.sessionId}
            </span>
            <button
              onClick={handleClear}
              className="px-3 py-1 bg-blue-500 hover:bg-blue-400 rounded text-sm"
            >
              대화 초기화
            </button>
          </div>
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-lg mb-2">🤖 안녕하세요!</p>
            <p>공주대학교에 관한 궁금한 점을 물어보세요.</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-3xl px-4 py-2 rounded-lg ${
                message.type === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 shadow-sm"
              }`}
            >
              {message.type === "assistant" && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-blue-600">
                    🤖 KNU AI
                  </span>
                  {message.isStreaming && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500">응답 중...</span>
                    </div>
                  )}
                </div>
              )}

              <div
                className={`whitespace-pre-wrap ${
                  message.type === "user" ? "text-white" : "text-gray-800"
                }`}
                dangerouslySetInnerHTML={{
                  __html: message.content.replace(/\n/g, "<br>"),
                }}
              />

              <div
                className={`text-xs mt-1 ${
                  message.type === "user" ? "text-blue-100" : "text-gray-400"
                }`}
              >
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {/* 오류 메시지 */}
        {chatState.error && (
          <div className="flex justify-start">
            <div className="max-w-3xl px-4 py-2 rounded-lg bg-red-50 border border-red-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-red-600">
                  ⚠️ 오류
                </span>
              </div>
              <div className="text-red-700">{chatState.error}</div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <div className="border-t bg-white p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="공주대학교에 대해 궁금한 점을 물어보세요..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={chatState.isLoading}
          />

          {chatState.isLoading ? (
            <button
              type="button"
              onClick={stopStreaming}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium"
            >
              중지
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-medium"
            >
              전송
            </button>
          )}
        </form>

        <div className="text-xs text-gray-500 mt-2 text-center">
          💡 팁: 학과 정보, 입학 안내, 학사 일정 등을 물어보세요
        </div>
      </div>
    </div>
  );
}

// pages/chat.tsx 또는 app/chat/page.tsx
function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <StreamingChat />
    </div>
  );
}

export default ChatPage;
