
import React from 'react'
import { Link } from 'react-router-dom'
export default function Home(){
  const links = [
    ['/dailyhoroscope','Daily Horoscope'],
    ['/moodtracker','Mood Tracker'],
    ['/shareddiary','Shared Diary'],
    ['/instantmatch','Instant Match'],
    ['/profile','Profile'],
    ['/settings','Settings']
  ]
  return (
    <div className="space-y-4">
      <h1 className="font-serif text-3xl">Welcome to Cosmic Love</h1>
      <p className="opacity-80">Explore the cosmos together. Your data now persists with Supabase.</p>
      <div className="grid gap-3">
        {links.map(([to, label])=> (
          <Link key={to} to={to} className="card rounded-3xl p-4 block">{label} →</Link>
        ))}
      </div>
    </div>
  )
}
