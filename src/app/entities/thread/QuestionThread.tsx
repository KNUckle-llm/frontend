import AnimatedText from "@/app/entities/common/AnimatedText";
import { Button } from "@/components/ui/button";
import { BookMarked, Copy, CopyCheck, Plus, Share } from "lucide-react";

interface IChatResponse {
  title: string;
  content: string;
}

const QuestionThread = (props: {
  result: IChatResponse;
  onComplete: () => void;
  showAction: boolean;
  copyComplete: boolean;
  onClick: () => void;
}) => (
  <div
    className={
      "max-w-5xl w-full h-full flex flex-col items-start justify-start p-10"
    }
  >
    <h1 className={"transition animate-in duration-500 fade-in text-3xl  mb-8"}>
      {props.result.title}
    </h1>
    <hr className={"w-full mb-8"} />
    <AnimatedText
      text={props.result.content}
      speed={10}
      onComplete={props.onComplete}
    />

    {props.showAction && (
      <div className={"w-full mt-8"}>
        <hr className={"w-full mb-8"} />
        <div className={"flex justify-end gap-2"}>
          <Button
            className={`group hover:cursor-pointer ${props.copyComplete && "bg-green-500/50 hover:bg-green-500/50"}`}
            onClick={props.onClick}
            variant={"ghost"}
          >
            {props.copyComplete ? (
              <CopyCheck className={"animate-grow"} size={8} />
            ) : (
              <Copy size={8} />
            )}
          </Button>
          <Button variant={"ghost"}>
            <Share size={8} />
          </Button>
        </div>
        <div>
          <h3 className={"inline-flex items-center font-bold gap-2 mt-8"}>
            <BookMarked size={20} />
            관련
          </h3>
          <ul
            className={
              "flex flex-col [&>li]:w-full [&>li]:justify-between [&>li]:py-2 [&>li]:border-t [&>li]:inline-flex [&>li]:items-center"
            }
          >
            <li>
              공주대는 어떻게 탄생했나요? <Plus />
            </li>
            <li>
              공주대의 캠퍼스에는 어떤 것들이 있나요? <Plus />
            </li>
            <li>
              공주대의 학생소식은 무슨 소식이 올라오나요? <Plus />
            </li>
          </ul>
        </div>
      </div>
    )}
  </div>
);
export default QuestionThread;
