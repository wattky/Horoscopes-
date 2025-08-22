
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const ADMIN_EMAIL = 'admin@wattky.com'

export default function AdminDashboard(){
  const [me, setMe] = useState(null)
  const [stats, setStats] = useState({ users:0, moods:0, diary:0, premium:0 })
  const [list, setList] = useState([])
  const [email, setEmail] = useState('')

  useEffect(()=>{
    (async()=>{
      const { data: { user } } = await supabase.auth.getUser()
      setMe(user)
      if(user?.email !== ADMIN_EMAIL) return
      const { count: users } = await supabase.from('profiles').select('*', { count: 'exact', head: true })
      const { count: moods } = await supabase.from('moods').select('*', { count: 'exact', head: true })
      const { count: diary } = await supabase.from('diary').select('*', { count: 'exact', head: true })
      const { count: premium } = await supabase.from('entitlements').select('*', { count: 'exact', head: true }).eq('is_premium', true)
      setStats({ users: users||0, moods: moods||0, diary: diary||0, premium: premium||0 })
      const { data } = await supabase.from('profiles').select('id, username, partner_id, created_at').order('created_at',{ascending:false}).limit(20)
      setList(data||[])
    })()
  }, [])

  const grant = async () => {
    const res = await fetch('/.netlify/functions/adminGrantPremium', {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'x-admin-secret': import.meta.env.ADMIN_SECRET || 'set-in-netlify' },
      body: JSON.stringify({ email, tier:'pro', days:30 })
    })
    if(res.ok) alert('Granted'); else alert('Grant failed')
  }

  if(!me) return <div>Loading…</div>
  if(me.email !== ADMIN_EMAIL) return <div className="card rounded-3xl p-4">Not authorized.</div>

  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl">Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(stats).map(([k,v])=>(<div key={k} className="card rounded-3xl p-3"><div className="text-xs opacity-70">{k}</div><div className="text-2xl font-semibold">{v}</div></div>))}
      </div>
      <div className="card rounded-3xl p-4 space-y-2">
        <div className="font-semibold">Grant Premium (secure)</div>
        <input className="w-full p-3 rounded-2xl bg-white/10" placeholder="user@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="btn btn-primary" onClick={grant}>Grant</button>
        <div className="text-xs opacity-70">Requires ADMIN_SECRET env on Netlify functions.</div>
      </div>
      <div className="space-y-2">
        {list.map(p=>(
          <div key={p.id} className="card rounded-3xl p-3 text-sm">
            <div className="font-semibold">{p.username || p.id}</div>
            <div className="opacity-70">Partner: {p.partner_id || '—'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
