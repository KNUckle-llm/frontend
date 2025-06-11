"use client";
import { useEffect, useRef, useState } from "react";
import Sidebar from "@/app/entities/common/Sidebar";
import { useScrollStore } from "@/app/store/useScrollStore";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const setMainRef = useScrollStore((state) => state.setMainRef);

  // 컴포넌트 마운트 시 ref를 스토어에 설정
  useEffect(() => {
    if (mainRef) {
      setMainRef(mainRef);
    }

    // 언마운트 시 ref 정리
    return () => setMainRef(null);
  }, [setMainRef]);

  return (
    <div className={"flex bg-neutral-100 h-full w-full overflow-hidden"}>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main
        ref={mainRef}
        className={
          "flex-1 min-w-0 overflow-y-scroll overflow-x-hidden  shadow-lg flex-grow rounded-md ml-0 m-2 bg-white"
        }
      >
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
