import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  speed: number;
  onComplete: () => void;
}

const AnimatedText = ({ text, speed, onComplete }: AnimatedTextProps) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
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

  return <p className={"text-lg whitespace-pre-line"}>{displayed}</p>;
};

export default AnimatedText;
