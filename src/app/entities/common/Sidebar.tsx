import { Button } from "@/components/ui/button";
import { ArrowRightFromLine, MessageSquareText } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const openStyle = isOpen ? "w-64" : "w-18";
  return (
    <nav
      className={`flex flex-col justify-between items-center transition-all duration-300 ${openStyle} h-full bg-neutral-100 py-2 px-1`}
    >
      <div className={"my-4 w-12 h-12 bg-neutral-300 rounded-full "}></div>
      {isOpen && (
        <div className={"w-full px-2 py-4"}>
          <Button
            variant={"default"}
            className={
              "bg-neutral-100 border hover:shadow-lg  w-full hover:bg-neutral-100 hover:cursor-pointer text-black"
            }
          >
            <MessageSquareText />
            이전 대화
          </Button>
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
