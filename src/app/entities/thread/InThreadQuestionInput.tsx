import { Button } from "@/components/ui/button";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

interface InThreadQuestionInputProps {
  handleSubmit: () => Promise<void>;
  register: UseFormRegister<any>;
  isThinking: boolean;
}

const InThreadQuestionInput = ({
  handleSubmit,
  register,
  isThinking,
}: InThreadQuestionInputProps) => {
  return (
    <div
      className={
        "sticky bottom-3 m-3 rounded-lg bg-white p-2 border border-black shadow-md focus:shadow-lg"
      }
    >
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="이 스레드에 추가 질문하기..."
          className="flex-1 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-300"
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
        <Button
          type="submit"
          className=" cursor-pointer bg-neutral-800 text-white"
          disabled={isThinking}
        >
          {isThinking ? "생각 중..." : "질문하기"}
        </Button>
      </form>
    </div>
  );
};

export default InThreadQuestionInput;
