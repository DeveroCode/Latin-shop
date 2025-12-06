import type React from "react";

export default function ErrorAlert({children}: React.PropsWithChildren) {
  return (
    <div className='py-2 px-5 bg-white rounded-sm mt-5 shadow border-l-2 border-l-red-600 border border-red-200'>
     <p className='text-gray-700 text-start text-xs capitalize'>{children}</p>
    </div>
  )
}
