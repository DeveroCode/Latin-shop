import { useEffect, useMemo, useState } from "react";

const KITTY_COUNT = 25;

export default function KittyRain() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 8000);
    return () => clearTimeout(t);
  }, []);

  const kitties = useMemo(
    () =>
      Array.from({ length: KITTY_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 4,
        size: 40 + Math.random() * 40,
      })),
    []
  );

  if (!show) return null;

  return (
    <div className="kitty-rain pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {kitties.map((kitty) => (
        <img
          key={kitty.id}
          src="/animation/kitty.png"
          alt="hello kitty"
          className="absolute top-[-120px] opacity-90 animate-kitty-fall"
          style={{
            left: `${kitty.left}%`,
            width: kitty.size,
            animationDelay: `${kitty.delay}s`,
            animationDuration: `${kitty.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
