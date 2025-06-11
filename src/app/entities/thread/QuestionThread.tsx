import AnimatedText from "@/app/entities/common/AnimatedText";
import { Button } from "@/components/ui/button";
import { BookMarked, Copy, CopyCheck, Plus, Share } from "lucide-react";
import { FormEvent, RefObject, useEffect, useRef, useState } from "react";
import { Message } from "@/app/lib/types/thread";
import ChatTools from "@/app/entities/thread/ChatTools";
import RelativeQuestions from "@/app/entities/thread/RelativeQuestions";

interface IChatResponse {
  session_id: string;
  messages: Message[];
}

const QuestionThread = (props: {
  result: IChatResponse;
  onComplete: () => void;
  showAction: boolean;
  copyComplete: boolean;
  onClick: (content: string) => void;
  onClickRelative: (e: FormEvent, query: string) => void;
  scrollToEnd: (ref: RefObject<HTMLDivElement>) => void;
  isStreaming?: boolean;
}) => {
  const relativeQuestions = [
    "공주대는 어떻게 탄생했나요?",
    "공주대의 캠퍼스에는 어떤 것들이 있나요?",
    "공주대의 학생소식에는 무슨 소식이 올라오나요?",
  ];
  const questionEndRef = useRef<HTMLDivElement>(null);

  const renderQuestion = (message: Message) => {
    return (
      message.message_type === "human" &&
      message.content && (
        <>
          <h2
            className={
              "transition animate-in duration-500 fade-in text-3xl  mb-4"
            }
          >
            {message.content}
          </h2>
          <hr className={"w-full mb-8"} />
        </>
      )
    );
  };
  const renderAnswer = (message: Message, isFinished: boolean) => {
    return (
      message.message_type === "ai" &&
      message.content && (
        <AnimatedText
          text={message.content}
          speed={10}
          onComplete={props.onComplete}
          isFinished={isFinished || false}
        />
      )
    );
  };

  useEffect(() => {
    if (
      questionEndRef.current !== null &&
      props.result.messages.length > 0 &&
      props.isStreaming
    ) {
      props.scrollToEnd(questionEndRef as RefObject<HTMLDivElement>);
    }
  }, [props.isStreaming, props.result.messages.length]);

  return (
    <div
      className={
        "max-w-5xl mx-auto w-full flex flex-1 flex-col items-start justify-start p-10 overflow-y-scroll"
      }
      ref={questionEndRef}
    >
      {props.result.messages.map((message, idx) => (
        <div
          key={message.id}
          className={`${message.message_type === "human" ? "pt-8 pb-0" : "pt-0 pb-8"} w-full`}
        >
          {renderQuestion(message)}
          {renderAnswer(message, idx !== props.result.messages.length - 1)}
          {idx === props.result.messages.length - 1 &&
            message.message_type === "human" && <PulseIndicator />}
          {props.showAction && message.message_type === "ai" && (
            <div className={"w-full mt-8"}>
              <ChatTools
                copyComplete={props.copyComplete}
                onCopyClick={props.onClick}
                content={message.content || ""}
              />
              <RelativeQuestions
                isLast={idx === props.result.messages.length - 1}
                onClickRelative={props.onClickRelative}
                relativeQuestions={relativeQuestions}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const PulseIndicator = () => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">답변 준비 중...</span>
        <div className="w-3 h-3 bg-warm-red-700 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default QuestionThread;
