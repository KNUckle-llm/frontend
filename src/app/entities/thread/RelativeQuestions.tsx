import { BookMarked, Plus } from "lucide-react";
import { FormEvent } from "react";

interface RelativeQuestionsProps {
  isLast: boolean;
  onClickRelative: (e: FormEvent, query: string) => void;
  relativeQuestions: string[];
}

const RelativeQuestions = ({
  isLast,
  onClickRelative,
  relativeQuestions,
}: RelativeQuestionsProps) => {
  return (
    isLast && (
      <div
        className={
          "min-h-[160px] mb-4 transition animate-in duration-500 fade-in"
        }
      >
        <h3 className={"inline-flex items-center font-bold gap-2 mt-8"}>
          <BookMarked size={20} />
          관련
        </h3>
        <ul
          className={
            "flex flex-col [&>li]:w-full [&>li]:justify-between [&>li]:py-2 [&>li]:border-t [&>li]:inline-flex [&>li]:items-center [&>li]:hover:bg-gray-100 [&>li]:cursor-pointer [&>li]:px-2"
          }
        >
          {relativeQuestions.map((q, index) => (
            <li
              key={index}
              onClick={(e) => {
                onClickRelative(e, q);
              }}
              className={"w-full"}
            >
              {q} <Plus />
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default RelativeQuestions;
