
import React from 'react'
import { Routes, Route, Link, useLocation, useParams } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import * as P from './pages'

function Nav(){
  const loc = useLocation()
  const items = [
    ['/', 'Home'],
    ['/dailyhoroscope', 'Horoscope'],
    ['/moodtracker', 'Mood'],
    ['/shareddiary', 'Diary'],
    ['/instantmatch', 'Match'],
    ['/partnerlink', 'Partner'],
    ['/premium', 'Premium'],
    ['/horoscopehistory','History'],
    ['/tarot','Tarot'],
  ]
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur border-t border-white/10">
      <div className="max-w-md mx-auto grid grid-cols-7 text-xs">
        {items.map(([to,label])=>(
          <Link key={to} to={to} className={`text-center py-2 ${loc.pathname===to?'font-semibold':''}`}>{label}</Link>
        ))}
      </div>
    </div>
  )
}

function LoginGate({ children }){
  const { user, loading, login, logout } = useAuth()
  const [email, setEmail] = React.useState('')
  if(loading) return <div className="p-4">Loading…</div>
  if(!user) return (
    <div className="p-4 space-y-3 max-w-md mx-auto">
      <h2 className="font-serif text-2xl">Sign in</h2>
      <input className="w-full p-3 rounded-2xl bg-white/10" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
      <button onClick={()=>login(email)} className="btn btn-primary">Send magic link</button>
    </div>
  )
  return <>{children}</>
}

function Shell(){
  return (
    <div className="min-h-screen pb-16 text-foreground">
      <div className="max-w-md mx-auto p-4">
        <Routes>
          <Route path="/" element={<P.Home/>} />
          <Route path="/dailyhoroscope" element={<LoginGate><P.DailyHoroscope/></LoginGate>} />
          <Route path="/moodtracker" element={<LoginGate><P.MoodTracker/></LoginGate>} />
          <Route path="/shareddiary" element={<LoginGate><P.SharedDiary/></LoginGate>} />
          <Route path="/instantmatch" element={<LoginGate><P.InstantMatch/></LoginGate>} />
          <Route path="/partnerlink" element={<LoginGate><P.PartnerLink/></LoginGate>} />
          <Route path="/accept-invite/:code" element={<LoginGate><P.AcceptInvite/></LoginGate>} />
          <Route path="/premium" element={<LoginGate><P.Premium/></LoginGate>} />
          <Route path="/admindashboard" element={<LoginGate><P.AdminDashboard/></LoginGate>} />
          {/* keep all other 60+ pages protected by default */}
          {Object.entries(P).map(([k,Comp])=> !['Home','DailyHoroscope','MoodTracker','SharedDiary','InstantMatch','PartnerLink','AcceptInvite','Premium','AdminDashboard','Settings','Profile'].includes(k) && (
            <Route key={k} path={`/${k.toLowerCase()}`} element={<LoginGate><Comp/></LoginGate>} />
          ))}
          <Route path="/profile" element={<LoginGate><P.Profile/></LoginGate>} />
          <Route path="/settings" element={<LoginGate><P.Settings/></LoginGate>} />
          <Route path="/horoscopehistory" element={<LoginGate><P.HoroscopeHistory/></LoginGate>} />
          <Route path="/tarot" element={<LoginGate><P.Tarot/></LoginGate>} />
        </Routes>
      </div>
      <Nav/>
    </div>
  )
}

export default function App(){ return <AuthProvider><Shell/></AuthProvider> }
