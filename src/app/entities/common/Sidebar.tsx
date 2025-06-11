import { Button } from "@/components/ui/button";
import {
  ArrowRightFromLine,
  BookOpen,
  House,
  Info,
  ListPlus,
  MessageSquareText,
  Settings,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const openStyle = isOpen ? "w-64" : "w-18";
  const routes = [
    { name: "홈", path: "/", icon: <House size={20} /> },
    { name: "서비스 소개", path: "/intro", icon: <Info size={20} /> },
    // { name: "소식", path: "/news", icon: <MessageSquareText size={20} /> },
    {
      name: "이전에 나눈 대화들",
      path: "/threads",
      icon: <BookOpen size={20} />,
    },
    { name: "로그인", icon: <User size={20} />, path: "/login" },
    { name: "설정", path: "/settings", icon: <Settings size={20} /> },
  ];
  const path = usePathname();

  return (
    <nav
      className={`flex flex-col justify-between items-center flex-shrink-0 transition-all duration-300 ${openStyle} h-full bg-neutral-100 py-2 px-1`}
    >
      <div className={"w-full flex py-4 justify-center gap-4 items-center"}>
        <Link href={"/"} onClick={() => setIsOpen(true)}>
          <Image
            src={"/assets/logo.png"}
            width={300}
            height={300}
            alt={"로고"}
            className={"my-4 w-12 h-12 bg-neutral-300 rounded-full "}
          />
        </Link>
        {isOpen && (
          <span className={"text-nowrap  text-2xl font-light"}>KNUckle</span>
        )}
      </div>
      <div
        className={
          "flex-grow py-12 flex flex-col gap-4 w-full px-2 text-neutral-500 font-bold"
        }
      >
        <Link
          href={"/"}
          className={`inline-flex justify-center items-center gap-2 m-2 p-2 text-center bg-white border hover:border-outer-space-500 hover:bg-outer-space-200/80 hover:text-black duration-300 transition-colors rounded-lg hover:cursor-pointer ${!isOpen && "invisible text-nowrap"} text-nowrap line-clamp-1`}
        >
          <ListPlus />
          새로운 스레드
        </Link>
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={`inline-flex items-center gap-4 p-2 px-3 border-none w-full border hover:shadow-lg hover:cursor-pointer  justify-start border-t-0 border-x-0 shadow-none border-b shadow-gray-200   rounded-lg text-nowrap line-clamp-1 ${path === route.path ? "bg-outer-space-400 text-white" : "hover:bg-outer-space-200/50 hover:text-neutral-500"}`}
          >
            {route.icon}
            {isOpen && route.name}
          </Link>
        ))}
      </div>

      <div
        className={
          "border-t px-2 py-4 w-full flex flex-col justify-center items-end"
        }
      >
        <button
          className={
            "bg-transparent w-8 text-black hover:text-neutral-700 cursor-pointer"
          }
          onClick={() => setIsOpen(!isOpen)}
        >
          <ArrowRightFromLine
            size={20}
            className={`${isOpen && `rotate-180`}`}
          />
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
