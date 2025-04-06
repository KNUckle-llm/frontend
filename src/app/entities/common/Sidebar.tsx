import { Button } from "@/components/ui/button";
import {
  ArrowRightFromLine,
  House,
  MessageSquareText,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const openStyle = isOpen ? "w-64" : "w-18";
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
            "flex-grow py-12 flex flex-col gap-4 w-full px-2 py-4 text-neutral-500 font-bold"
          }
        >
          <button
            className={
              "m-2 p-2 bg-white border hover:border-amber-800 rounded-lg"
            }
          >
            새로운 스레드
          </button>
          <Link
            href={"/"}
            className={
              "inline-flex items-center gap-4 p-2 border-none w-full bg-neutral-100 border hover:shadow-lg hover:bg-neutral-100 hover:cursor-pointer  justify-start border-t-0 border-x-0 shadow-none border-b shadow-gray-200 hover:bg-neutral-200/50 rounded-lg "
            }
          >
            <House />홈
          </Link>
          <Link
            href={"/settings"}
            className={
              "inline-flex items-center gap-4 p-2 border-none w-full bg-neutral-100 border hover:shadow-lg hover:bg-neutral-100 hover:cursor-pointer  justify-start border-t-0 border-x-0 shadow-none border-b shadow-gray-200 hover:bg-neutral-200/50 rounded-lg "
            }
          >
            <Settings />
            설정
          </Link>
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
