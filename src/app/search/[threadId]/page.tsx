"use client";

import QuestionThread from "@/app/entities/thread/QuestionThread";
import { FormEvent, useEffect, useState } from "react";
import { useScrollStore } from "@/app/store/useScrollStore";
import axios from "axios";
import { useParams } from "next/navigation";
import SVGLoadingSpinner from "@/app/entities/loading/SVGLoadingSpinner";
import { Message } from "@/app/lib/models/thread";

interface IChatResponse {
  title: string;
  messages: Message[];
}
interface SearchPageProps {}

const SearchPage = ({}: SearchPageProps) => {
  const [result, setResult] = useState<IChatResponse>();
  const [showAction, setShowAction] = useState(false);
  const [copyComplete, setCopyComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const mainRef = useScrollStore((state) => state.mainRef);
  const params = useParams();
  const threadId = params.threadId;

  useEffect(() => {
    getThreadData();
  }, []);

  const getThreadData = async () => {
    const response = await axios.get(`/api/thread/${threadId}`);
    const data = await response.data;
    setResult(data);
    setLoading(false);
  };

  const scrollToBottom = () => {
    if (mainRef && mainRef.current) {
      mainRef.current?.scrollTo({
        top: mainRef.current.scrollHeight,
        behavior: "smooth",
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
    console.log("click relative");
    e.preventDefault();
    if (!relativeQuestion) return;
    // setResult((prev) => [
    //   ...(prev || []),
    //   {
    //     title: relativeQuestion,
    //     content: `안녕하세요. ${relativeQuestion}에 대해서 설명해드리겠습니다. ${relativeQuestion}은........`,
    //   },
    // ]);
  };

  return result && result.messages.length > 0 && !loading ? (
    <QuestionThread
      result={result}
      onComplete={() => {
        setShowAction(true);
        scrollToBottom();
      }}
      showAction={showAction}
      copyComplete={copyComplete}
      onClick={copyToClipboard}
      onClickRelative={onClickRelative}
    />
  ) : (
    <div className={"py-12"}>
      <SVGLoadingSpinner />
    </div>
  );
};
export default SearchPage;
