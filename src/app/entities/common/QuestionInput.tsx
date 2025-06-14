"use client";
import { CircleDashed, CornerRightUp } from "lucide-react";
import { UseFormRegister } from "react-hook-form";

interface QuestionInputProps {
  thinking?: boolean;
  handleSubmit: () => void;
  register: UseFormRegister<any>;
}

const QuestionInput = ({
  thinking,
  handleSubmit,
  register,
}: QuestionInputProps) => {
  return (
    <form onSubmit={handleSubmit} className={"relative group"}>
      <input
        type={"text"}
        className={`w-[480px] h-12 rounded-lg group border p-2 outline-0  focus:px-6 focus:w-[520px] focus:h-16 transition-all duration-300 outline-neutral-300 focus:border-neutral-900  focus:text-xl `}
        autoComplete={"off"}
        placeholder={thinking ? "생각 중이에요.." : "무엇이든 질문하기..."}
        {...register("question", {
          required: { value: true, message: "질문을 입력해주세요." },
          minLength: {
            value: 2,
            message: "질문은 최소 2글자 이상이어야 합니다.",
          },
          maxLength: {
            value: 1000,
            message: "질문은 최대 1000글자까지 입력할 수 있습니다.",
          },
        })}
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
