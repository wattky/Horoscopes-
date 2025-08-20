import React from 'react'
export function Textarea(props){
  const { className='', ...rest } = props
  return <textarea className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring ${className}`} rows={4} {...rest} />
}
