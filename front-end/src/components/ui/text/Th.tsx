import type { ReactNode } from "react"

interface ThProps {
    children: ReactNode
}

export default function Th({children}: ThProps) {
  return<th className="text-gray-400 capitalize tracking-wide font-semibold pt-5 py-3">{children}</th>
}
