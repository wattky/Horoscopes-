
import React from 'react'
import withPremiumGate from '../hooks/withPremiumGate'

function FullTarotSpread(){
  return (
    <div className="flex gap-2 justify-center">
      {Array.from({length:5}).map((_,i)=>(
        <div key={i} className="w-20 h-32 rounded-xl bg-white/10 flex items-center justify-center">🃏</div>
      ))}
    </div>
  )
}

const PremiumSpread = withPremiumGate(FullTarotSpread, {
  title: 'Unlock Full Tarot Spread',
  description: 'Reveal a 5-card reading with guidance & timing.',
  preview: (
    <div className="flex gap-2 justify-center">
      {Array.from({length:5}).map((_,i)=>(<div key={i} className="w-20 h-32 rounded-xl bg-gradient-to-b from-fuchsia-600/40 to-indigo-600/40" />))}
    </div>
  )
})

export default function Tarot(){
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl">Tarot</h2>
      <div className="card rounded-3xl p-4">Free card of the day: <span className="ml-2">The Star ✨</span></div>
      <PremiumSpread/>
    </div>
  )
}
