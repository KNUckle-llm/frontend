import { Button } from "@/components/ui/button";
import { Copy, CopyCheck, Share } from "lucide-react";

interface ChatToolsProps {
  copyComplete: boolean;
  onCopyClick: (content: string) => void;
  content: string;
}

const ChatTools = ({ copyComplete, onCopyClick, content }: ChatToolsProps) => {
  return (
    <>
      <hr className={"w-full mb-8"} />
      <div className={"flex justify-end gap-2"}>
        <Button
          className={`group hover:cursor-pointer ${copyComplete && "bg-green-500/50 hover:bg-green-500/50"}`}
          onClick={() => onCopyClick(content || "")}
          variant={"ghost"}
        >
          {copyComplete ? (
            <CopyCheck className={"animate-grow"} size={8} />
          ) : (
            <Copy size={8} />
          )}
        </Button>
        <Button variant={"ghost"}>
          <Share size={8} />
        </Button>
      </div>
    </>
  );
};

export default ChatTools;
