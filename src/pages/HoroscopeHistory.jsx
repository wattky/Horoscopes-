
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function HoroscopeHistory(){
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('mine') // mine | partner | both

  const getPartnerId = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if(!user) return null
    const { data: me } = await supabase.from('profiles').select('partner_id').eq('id', user.id).single()
    return me?.partner_id || null
  }

  const load = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const partnerId = await getPartnerId()
    let query = supabase.from('horoscopes').select('*').order('date',{ascending:false}).limit(60)
    if(filter === 'mine') query = query.eq('user_id', user.id)
    if(filter === 'partner' && partnerId) query = query.eq('user_id', partnerId)
    if(filter === 'both' && partnerId) query = query.in('user_id', [user.id, partnerId])
    const { data, error } = await query
    if(error) console.error(error)
    setItems(data || [])
  }

  useEffect(()=>{ load() }, [filter])

  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl">Horoscope History</h2>
      <div className="grid grid-cols-3 gap-2">
        {['mine','partner','both'].map(f=> (
          <button key={f} onClick={()=>setFilter(f)} className={`rounded-2xl p-2 ${filter===f?'bg-white/20':'bg-white/5'}`}>{f.title()}</button>
        ))}
      </div>
      <div className="space-y-2">
        {items.map(i=>(
          <div key={i.id} className="card rounded-3xl p-4">
            <div className="text-xs opacity-70">{i.sign} • {new Date(i.date).toLocaleDateString()}</div>
            <div className="whitespace-pre-wrap">{i.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
