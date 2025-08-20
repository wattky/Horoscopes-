import React from 'react'
export function Input(props){
  const { className='', ...rest } = props
  return <input className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring ${className}`} {...rest} />
}
