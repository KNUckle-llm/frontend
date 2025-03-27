"use client";
import { CircleDashed, CornerRightUp } from "lucide-react";
import { FormEventHandler, useState } from "react";

interface QuestionInputProps {
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
  thinking?: boolean;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  inputText: string;
  setInputText: (inputText: string) => void;
}
const QuestionInput = ({
  isFocused,
  setIsFocused,
  thinking,
  onSubmit,
  inputText,
  setInputText,
}: QuestionInputProps) => {
  return (
    <form onSubmit={onSubmit} className={"relative group"}>
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onFocus={() => setIsFocused(true)}
        className={`w-[480px] h-12 rounded-lg group border p-2 outline-0  focus:px-6 focus:w-[520px] focus:h-16 transition-all duration-300 outline-neutral-300 focus:border-neutral-900  focus:text-xl`}
        placeholder={thinking ? "생각 중이에요.." : "무엇이든 질문하기..."}
      />
      <button
        className={
          "absolute top-1/2 right-4 border  group group-focus-within:border-neutral-300 rounded-full p-2 -translate-y-1/2 hover:bg-neutral-100"
        }
      >
        {thinking ? (
          <CircleDashed className={"animate-spin "} size={12} />
        ) : (
          <CornerRightUp size={12} />
        )}
      </button>
    </form>
  );
};

export default QuestionInput;
