import type { ReactNode } from "react"

interface TdProps {
    children: ReactNode
}

export default function Td({children}: TdProps) {
  return <td className="font-montserrat text-gray-800 capitalize text-center">{children}</td>
}
