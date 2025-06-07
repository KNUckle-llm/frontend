import AnimatedText from "@/app/entities/common/AnimatedText";
import { Button } from "@/components/ui/button";
import { BookMarked, Copy, CopyCheck, Plus, Share } from "lucide-react";
import { FormEvent, useState } from "react";
import { Message } from "@/app/lib/types/thread";
import ChatTools from "@/app/entities/thread/ChatTools";
import RelativeQuestions from "@/app/entities/thread/RelativeQuestions";

interface IChatResponse {
  title: string;
  messages: Message[];
}

const QuestionThread = (props: {
  result: IChatResponse;
  onComplete: () => void;
  showAction: boolean;
  copyComplete: boolean;
  onClick: (content: string) => void;
  onClickRelative: (e: FormEvent, query: string) => void;
}) => {
  const relativeQuestions = [
    "공주대는 어떻게 탄생했나요?",
    "공주대의 캠퍼스에는 어떤 것들이 있나요?",
    "공주대의 학생소식에는 무슨 소식이 올라오나요?",
  ];

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

  return (
    <div
      className={
        "max-w-5xl mx-auto w-full flex flex-col items-start justify-start p-10"
      }
    >
      {props.result.messages.map((message, idx) => (
        <div
          key={message.id}
          className={`${message.message_type === "human" ? "pt-8 pb-0" : "pt-0 pb-8"} w-full`}
        >
          {renderQuestion(message)}
          {renderAnswer(message, idx !== props.result.messages.length - 1)}

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

export default QuestionThread;
