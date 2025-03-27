"use client";
import { useState } from "react";
import Sidebar from "@/app/entities/common/Sidebar";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const scrollToPosition = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={"flex bg-neutral-100 h-full"}>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main
        ref={mainRef}
        className={
          "overflow-y-scroll shadow-lg flex-grow rounded-md ml-0 m-2 bg-white"
        }
      >
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
