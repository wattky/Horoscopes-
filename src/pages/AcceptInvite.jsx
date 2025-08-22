
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { acceptInvite } from '../api/invitations'

export default function AcceptInvite(){
  const { code } = useParams()
  const [status, setStatus] = useState('ready')

  const accept = async () => {
    setStatus('working')
    try { await acceptInvite(code); setStatus('done') }
    catch (e) { console.error(e); setStatus('error') }
  }

  useEffect(()=>{ if(code) accept() }, [code])

  if(status==='working') return <div>Linking partners…</div>
  if(status==='done') return <div className="space-y-3"><div className="card rounded-3xl p-4">Partners linked 🎉</div><Link to="/partnerlink" className="btn btn-primary">Continue</Link></div>
  if(status==='error') return <div className="card rounded-3xl p-4">Invalid or used code.</div>
  return <div className="card rounded-3xl p-4">Ready to accept invite.</div>
}
