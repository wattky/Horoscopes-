import React from 'react'
export function Slider({value=[0], max=100, step=1, onValueChange}){
  return <input type="range" value={value[0]} max={max} step={step} onChange={e=>onValueChange?.([Number(e.target.value)])} />
}
