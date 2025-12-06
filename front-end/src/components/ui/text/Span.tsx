import type { ReactNode } from "react";

interface SpanProps {
  children: ReactNode;
}

export default function Span({ children }: SpanProps) {
  return <span className="text-gray-500 text-xs">{children}</span>;
}
