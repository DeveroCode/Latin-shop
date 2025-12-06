import type { ReactNode } from "react"

type PProps = {
    children: ReactNode
}
export default function P({children}: PProps) {
  return  <p className="text-2xl font-bold">{children}</p>
}
