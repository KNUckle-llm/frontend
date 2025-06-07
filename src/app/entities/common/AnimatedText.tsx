import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";

interface AnimatedTextProps {
  text: string;
  speed: number;
  onComplete: () => void;
  isFinished?: boolean;
}

const AnimatedText = ({
  text,
  speed,
  onComplete,
  isFinished,
}: AnimatedTextProps) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (isFinished) {
      setDisplayed(text);
      onComplete();
      return;
    }
    let index = text.startsWith(displayed) ? displayed.length : 0;
    if (!text.startsWith(displayed)) setDisplayed("");
    const interval = setInterval(() => {
      index++;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
        onComplete();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <ReactMarkdown
      // className={"text-lg whitespace-pre-line"}
      remarkPlugins={[remarkGfm]}
      components={{
        // 커스텀 스타일링
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mb-6">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold mb-4">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold mb-2 mb-2">{children}</h3>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 mb-4">{children}</ol>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-6 mb-4">{children}</ul>
        ),
        li: ({ children }) => <li className="mb-2">{children}</li>,
        strong: ({ children }) => (
          <strong className="font-semibold">{children}</strong>
        ),
        p: ({ children }) => <p className="mb-4 leading-7">{children}</p>,
      }}
    >
      {displayed}
    </ReactMarkdown>
  );
};

export default AnimatedText;
