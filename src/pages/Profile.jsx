
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getMyProfile, upsertProfile } from '../api/profiles'

export default function Profile(){
  const { user, logout } = useAuth()
  const [profile, setProfile] = useState({ username:'', zodiac_sign:'', birthdate:'' })
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    (async ()=>{
      const p = await getMyProfile()
      if(p) setProfile({ username: p.username||'', zodiac_sign: p.zodiac_sign||'', birthdate: p.birthdate||'' })
      setLoading(false)
    })()
  },[])

  const save = async () => {
    await upsertProfile({ id: user.id, ...profile })
    alert('Saved')
  }

  if(loading) return <div>Loading…</div>
  return (
    <div className="space-y-3">
      <h2 className="font-serif text-2xl">Profile</h2>
      <input className="w-full p-3 rounded-2xl bg-white/10" placeholder="Username" value={profile.username} onChange={e=>setProfile({...profile, username:e.target.value})}/>
      <input className="w-full p-3 rounded-2xl bg-white/10" placeholder="Zodiac sign" value={profile.zodiac_sign} onChange={e=>setProfile({...profile, zodiac_sign:e.target.value})}/>
      <input className="w-full p-3 rounded-2xl bg-white/10" type="date" value={profile.birthdate} onChange={e=>setProfile({...profile, birthdate:e.target.value})}/>
      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={save}>Save</button>
        <button className="btn btn-ghost" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}
