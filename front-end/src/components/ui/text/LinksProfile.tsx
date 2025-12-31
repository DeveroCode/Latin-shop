import type { linksProfile } from '@/types/index'
import { NavLink } from 'react-router-dom'
import Span from './Span'

type LinksProfileProps = {
    link: linksProfile
}

export default function LinksProfile({ link }: LinksProfileProps) {
  return (
    <div className='w-80 bg-white border border-gray-300 shadow-md rounded-md p-4'>
      <NavLink
      to={link.url}
      end={false}
      className={""}>
        {link.icon && <link.icon className="w-4 h-4 mr-2" />}
       <div className='flex flex-col'>
         {link.name}
        <Span>{link.description}</Span>
       </div>
    </NavLink>
    </div>
  )
}
