import React from 'react'
export function Button({children, className='', variant='default', size='md', ...props}){
  const base = 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl shadow-sm transition active:scale-[.98]'
  const v = variant==='ghost' ? 'bg-transparent hover:bg-muted' :
            variant==='secondary' ? 'bg-gray-100 hover:bg-gray-200' :
            'bg-black text-white hover:bg-gray-800'
  const s = size==='icon' ? 'w-9 h-9 p-0' : ''
  return <button className={`${base} ${v} ${s} ${className}`} {...props}>{children}</button>
}
