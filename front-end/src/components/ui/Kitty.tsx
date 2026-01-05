import { useState } from "react";

type data = {
    id: number;
    left: number;
    drift: number;
    delay: number;
    duration: number;
    size: number;
}


export default function Kitty({ data, interactive }: { data: data; interactive: boolean }) {
  const [jump, setJump] = useState(false);

  const handleClick = () => {
    if (!interactive) return;
    setJump(true);
    setTimeout(() => setJump(false), 600);
  };

  return (
    <img
      src="/animation/kitty.png"
      alt="hello kitty"
      onClick={handleClick}
      className={`
        absolute
        ${interactive ? "kitty-ground pointer-events-auto cursor-pointer" : "animate-kitty-fall"}
        ${jump ? "kitty-jump" : ""}
      `}
      style={{
        left: `${data.left}%`,
        width: data.size,
        animationDelay: `${data.delay}s`,
        animationDuration: `${data.duration}s`,
        ["--drift" as string]: `${data.drift}px`,
      }}
    />
  );
}
