
import React, { useEffect, useState } from 'react'
import { getEntitlement } from '../api/entitlements'

export default function Premium(){
  const [ent, setEnt] = useState(null)
  const checkoutUrl = import.meta.env.VITE_STRIPE_CHECKOUT_URL

  useEffect(()=>{ (async()=> setEnt(await getEntitlement()))() }, [])

  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl">Premium</h2>
      {ent && (
        <div className="card rounded-3xl p-4">
          <div>Status: <b>{ent.is_premium ? 'Premium' : 'Free'}</b>{ent.tier ? ` (${ent.tier})` : ''}</div>
          {ent.valid_until && <div>Valid until: {new Date(ent.valid_until).toLocaleDateString()}</div>}
        </div>
      )}
      <div className="card rounded-3xl p-4">
        <div className="mb-2">Unlock deeper compatibility insights, unlimited AI readings, and couple analytics.</div>
        {checkoutUrl
          ? <a href={checkoutUrl} className="btn btn-primary">Go to Checkout</a>
          : <div className="opacity-70 text-sm">Set <code>VITE_STRIPE_CHECKOUT_URL</code> to enable.</div>}
      </div>
    </div>
  )
}
