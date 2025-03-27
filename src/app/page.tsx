"use client";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import QuestionInput from "@/app/entities/common/QuestionInput";
import SidebarLayout from "@/app/entities/layout/SidebarLayout";
import { useRouter } from "next/navigation";
import QuestionThread from "@/app/entities/thread/QuestionThread";

interface IChatResponse {
  title: string;
  content: string;
}

export default function Home() {
  const [isFocused, setIsFocused] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<IChatResponse>();
  const [showAction, setShowAction] = useState(false);
  const [copyComplete, setCopyComplete] = useState(false);

  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputText) return;
    console.log("query send");
    setIsThinking(true);
    setResult({
      title: inputText,
      content:
        "공주대학교(Kongju National University)는 대한민국 충청남도 공주시에 위치한 국립대학교입니다. 다음은 공주대학교에 대한 주요 정보입니다:\n" +
        "1. 역사: 1948년 공주사범대학으로 설립되었으며, 이후 1991년 공주대학교로 승격되었습니다.\n" +
        "2. 캠퍼스: 주 캠퍼스는 공주시에 있으며, 예산캠퍼스와 천안캠퍼스도 운영하고 있습니다.\n" +
        "3. 학과 및 전공: 사범대학, 인문사회과학대학, 자연과학대학, 간호보건대학, 예술대학, 공과대학, 산업과학대학 등 다양한 단과대학을 갖추고 있습니다.\n" +
        "4. 특성화: 원래 사범대학에서 출발했기 때문에 교원 양성 분야에서 전통과 명성이 있습니다.\n" +
        "5. 규모: 약 2만 명 이상의 학생들이 재학 중이며, 다양한 학과와 연구 프로그램을 제공합니다.\n" +
        "6. 국제교류: 여러 나라의 대학들과 학술 교류 및 학생 교환 프로그램을 운영하고 있습니다.\n" +
        "7. 연구 및 발전: 다양한 연구소와 센터를 통해 학문적 발전과 지역사회 발전에 기여하고 있습니다.\n" +
        "공주대학교는 교육, 연구, 사회 봉사의 세 가지 기능을 수행하며, 지역사회와의 협력 및 국제적 경쟁력 강화에 중점을 두고 있습니다.",
    });

    router.push("?q=" + encodeURIComponent(inputText));

    const timeout = setTimeout(() => {
      setIsThinking(false);
    }, 2000);
  };

  useEffect(() => {}, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result?.content || "").then(() => {
      setCopyComplete(true);
    });
    setCopyComplete(true);
    setTimeout(() => {
      setCopyComplete(false);
    }, 2000);
  };

  return (
    <section className={"w-full h-screen"}>
      <SidebarLayout>
        {result ? (
          <QuestionThread
            result={result}
            onComplete={() => setShowAction(true)}
            showAction={showAction}
            copyComplete={copyComplete}
            onClick={copyToClipboard}
          />
        ) : (
          <div className={"h-full flex flex-col items-center justify-center"}>
            <h1 className={"text-4xl font-extralight mb-8"}>환영합니다.</h1>
            <QuestionInput
              isFocused={isFocused}
              setIsFocused={setIsFocused}
              thinking={isThinking}
              onSubmit={onSubmit}
              inputText={inputText}
              setInputText={setInputText}
            />
          </div>
        )}
      </SidebarLayout>
    </section>
  );
}
