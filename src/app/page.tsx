"use client";
import { useState } from "react";
import QuestionInput from "@/app/entities/common/QuestionInput";
import SidebarLayout from "@/app/entities/layout/SidebarLayout";

export default function Home() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className={"w-full h-screen"}>
      <SidebarLayout>
        <div className={"h-full flex flex-col items-center justify-center"}>
          <h1 className={"text-4xl font-extralight mb-8"}>
            환영합니다. Jeongwoo 님
          </h1>
          <QuestionInput
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            thinking={false}
          />
        </div>
      </SidebarLayout>
    </section>
  );
}
