
import React, { useState, useEffect } from 'react'
import { createInvite } from '../api/invitations'
import { getPartnerProfile } from '../api/partners'

export default function PartnerLink(){
  const [email, setEmail] = useState('')
  const [invite, setInvite] = useState(null)
  const [partner, setPartner] = useState(null)

  useEffect(()=>{ (async()=> setPartner(await getPartnerProfile()))() }, [])

  const send = async () => {
    const inv = await createInvite(email)
    setInvite(inv)
  }

  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl">Partner Linking</h2>
      {partner ? (
        <div className="card rounded-3xl p-4">Linked with: <b>{partner.username || partner.id}</b></div>
      ) : (
        <div className="card rounded-3xl p-4 space-y-3">
          <div>Invite your partner by email:</div>
          <input className="w-full p-3 rounded-2xl bg-white/10" placeholder="partner@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
          <button className="btn btn-primary" onClick={send}>Create invite</button>
          {invite && (
            <div className="pt-3 text-sm">
              Share this code with your partner: <b>{invite.code}</b><br/>
              Or direct link: <b>/accept-invite/{invite.code}</b>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
