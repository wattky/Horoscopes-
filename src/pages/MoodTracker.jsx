
import React, { useEffect, useState } from 'react'
import { saveMood, listMoods } from '../api/moods'
import { supabase } from '../lib/supabase'

export default function MoodTracker(){
  const [mood, setMood] = useState('happy')
  const [note, setNote] = useState('')
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
    if(!user) return setItems([])
    const partnerId = await getPartnerId()
    let query = supabase.from('moods').select('*').order('created_at',{ascending:false}).limit(120)
    if(filter === 'mine') query = query.eq('user_id', user.id)
    if(filter === 'partner' && partnerId) query = query.eq('user_id', partnerId)
    if(filter === 'both' && partnerId) query = query.in('user_id', [user.id, partnerId])
    const { data, error } = await query
    if(error) console.error(error)
    setItems(data || [])
  }

  useEffect(()=>{ load() }, [filter])

  const submit = async () => {
    await saveMood(mood, note)
    setNote('')
    await load()
  }

  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl">Mood</h2>
      <div className="grid grid-cols-3 gap-2">
        {['mine','partner','both'].map(f=> (
          <button key={f} onClick={()=>setFilter(f)} className={`rounded-2xl p-2 ${filter===f?'bg-white/20':'bg-white/5'}`}>{f.title()}</button>
        ))}
      </div>
      <select className="w-full p-3 rounded-2xl bg-white/10" value={mood} onChange={e=>setMood(e.target.value)}>
        {['happy','neutral','sad','excited','anxious','romantic'].map(m=><option key={m}>{m}</option>)}
      </select>
      <textarea className="w-full p-3 rounded-2xl bg-white/10" placeholder="Note…" value={note} onChange={e=>setNote(e.target.value)} />
      <button className="btn btn-primary" onClick={submit}>Save mood</button>

      <div className="space-y-2 pt-2">
        {items.map(i=>(
          <div key={i.id} className="card rounded-3xl p-3">
            <div className="text-xs opacity-70">{new Date(i.created_at).toLocaleString()}</div>
            <div className="font-semibold">{i.mood}</div>
            {i.note && <div className="opacity-90">{i.note}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
