
import React, { useState } from 'react'
import { saveHoroscope } from '../api/horoscopes'
import withPremiumGate from '../hooks/withPremiumGate'

function AdvancedInsights({ text }){
  // Pretend chart preview
  return <div className="h-24 rounded-2xl bg-white/10 flex items-center justify-center">Advanced insight chart here</div>
}

function DailyHoroscopeInner(){
  const [sign, setSign] = useState('Aries')
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    setLoading(true)
    try{
      const res = await fetch('/.netlify/functions/generateHoroscope', {
        method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ sign, lang:'en' })
      })
      const { text } = await res.json()
      setText(text)
      await saveHoroscope(sign, text)
    }finally{ setLoading(false) }
  }

  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl">Daily Horoscope</h2>
      <select className="w-full p-3 rounded-2xl bg-white/10" value={sign} onChange={e=>setSign(e.target.value)}>
        {['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'].map(s=><option key={s}>{s}</option>)}
      </select>
      <button className="btn btn-primary" disabled={loading} onClick={generate}>{loading?'Generating…':'Generate'}</button>
      {text && <div className="card rounded-3xl p-4 whitespace-pre-wrap">{text}</div>}

      {/* Premium gated advanced section */}
      {withPremiumGate(()=>(
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">Advanced Insights</h3>
          <AdvancedInsights text={text}/>
        </div>
      ),{
        title:'Unlock Advanced Horoscope',
        description:'Deeper planetary transits, love windows, and actionable rituals.',
        preview:<div className='h-24 rounded-2xl bg-gradient-to-r from-fuchsia-600/50 to-indigo-600/50' />
      })({})}
    </div>
  )
}

export default DailyHoroscopeInner
