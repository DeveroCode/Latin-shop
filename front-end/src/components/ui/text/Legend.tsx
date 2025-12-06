import type { ReactNode } from "react"

type LegendProps = {
    children: ReactNode
}

export default function Legend({children}: LegendProps) {
  return (
    <legend className="font-montserrat text-gray-800 capitalize tracking-wide">
      {children}
    </legend>
  )
}
