import React, { createContext, useContext } from 'react'
const Ctx = createContext(null)

export function Select({value, onValueChange, children}){
  return <Ctx.Provider value={{value, onValueChange, items: []}}>{children}</Ctx.Provider>
}

export function SelectItem({ value, children }){
  const ctx = useContext(Ctx)
  // Items are collected by SelectContent using children prop
  return <option value={value}>{children}</option>
}

export function SelectContent({ children }){
  // This just renders children which are <option>s when used inside SelectTrigger
  return <>{children}</>
}

export function SelectTrigger({ children, className='' }){
  // We expect children to be a SelectContent with SelectItem options
  const ctx = useContext(Ctx)
  const options = []
  React.Children.forEach(children, (child)=>{
    if(child && child.props && child.props.children){
      // child is SelectContent
      React.Children.forEach(child.props.children, (opt)=>{
        if(opt && opt.props) options.push(opt)
      })
    }
  })
  return (
    <select className={`w-full px-3 py-2 border rounded-xl ${className}`}
      value={String(ctx?.value ?? '')}
      onChange={(e)=>ctx?.onValueChange?.(e.target.value)}>
      {options}
    </select>
  )
}

export function SelectValue(){ return null }
