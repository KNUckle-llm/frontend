import { Button } from "@/components/ui/button";
import {
  ArrowRightFromLine,
  Book,
  House,
  ListPlus,
  MessageSquareText,
  Settings,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const openStyle = isOpen ? "w-64" : "w-18";
  const routes = [
    { name: "홈", path: "/", icon: <House size={20} /> },
    { name: "소식", path: "/news", icon: <MessageSquareText size={20} /> },
    {
      name: "라이브러리",
      path: "/threads",
      icon: <Book size={20} />,
    },
    { name: "로그인", icon: <User size={20} />, path: "/login" },
    { name: "설정", path: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <nav
      className={`flex flex-col justify-between items-center flex-shrink-0 transition-all duration-300 ${openStyle} h-full bg-neutral-100 py-2 px-1`}
    >
      <div className={"w-full flex py-4 justify-center gap-4 items-center"}>
        <Link href={"/"}>
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
      {isOpen && (
        <div
          className={
            "flex-grow py-12 flex flex-col gap-4 w-full px-2 text-neutral-500 font-bold"
          }
        >
          <Link
            href={"/"}
            className={
              "inline-flex justify-center items-center gap-2 m-2 p-2 text-center bg-white border hover:border-amber-800 rounded-lg hover:cursor-pointer"
            }
          >
            <ListPlus />
            새로운 스레드
          </Link>
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={
                "inline-flex items-center gap-4 p-2 px-3 border-none w-full bg-neutral-100 border hover:shadow-lg hover:cursor-pointer  justify-start border-t-0 border-x-0 shadow-none border-b shadow-gray-200 hover:bg-neutral-200/50 rounded-lg "
              }
            >
              {route.icon}
              {route.name}
            </Link>
          ))}
        </div>
      )}
      <div
        className={
          "border-t px-2 py-4 w-full flex flex-col justify-center items-stretch"
        }
      >
        <Button className={""} onClick={() => setIsOpen(!isOpen)}>
          <ArrowRightFromLine className={`${isOpen && `rotate-180`}`} />
        </Button>
      </div>
    </nav>
  );
};

export default Sidebar;
