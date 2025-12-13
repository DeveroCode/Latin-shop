import type { ReactNode } from "react"

interface ThProps {
    children: ReactNode
}

export default function Th({children}: ThProps) {
  return<th className="text-gray-800 capitalize text-sm">{children}</th>
}
