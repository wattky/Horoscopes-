
import React, { useState } from 'react'
import { cacheMatch } from '../api/matches'
import withPremiumGate from '../hooks/withPremiumGate'

function AdvancedCompatibility({ score }){
  return (
    <div className="space-y-2">
      <div className="h-28 rounded-2xl bg-white/10 flex items-center justify-center">Synastry heatmap preview</div>
      <div className="h-16 rounded-2xl bg-white/10 flex items-center justify-center">Aspect table preview</div>
    </div>
  )
}

export default function InstantMatch(){
  const [partnerId, setPartnerId] = useState('')
  const [score, setScore] = useState(null)

  const compute = async () => {
    const s = Math.floor(60 + Math.random()*40)
    setScore(s)
    await cacheMatch(partnerId, s, { basis: 'demo-algorithm-v1' })
  }

  const PremiumGate = withPremiumGate(AdvancedCompatibility, {
    title: 'Unlock Advanced Compatibility',
    description: 'Deep synastry charts, houses & aspects breakdown.',
    preview: <div className="h-28 rounded-2xl bg-gradient-to-r from-rose-600/40 to-purple-600/40" />
  })

  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl">Instant Match</h2>
      <input className="w-full p-3 rounded-2xl bg-white/10" placeholder="Partner user UUID" value={partnerId} onChange={e=>setPartnerId(e.target.value)} />
      <button className="btn btn-primary" onClick={compute}>Compute</button>
      {score && <div className="card rounded-3xl p-4">Compatibility score: <b>{score}</b>/100</div>}

      <PremiumGate score={score}/>
    </div>
  )
}
