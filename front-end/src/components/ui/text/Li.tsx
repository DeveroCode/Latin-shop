import React from 'react'

export default function Li({children}: React.PropsWithChildren) {
  return <li className="text-gray-700 font-semibold line-clamp-6">{children}</li>
}
