
import React from 'react'
import PremiumLock from '../components/PremiumLock'
import { useEntitlements } from './useEntitlements'

export default function withPremiumGate(Component, { title='Premium Feature', description='Unlock this feature to continue', preview=null } = {}){
  return function Wrapped(props){
    const { loading, isPremium } = useEntitlements()
    const checkoutUrl = import.meta.env.VITE_STRIPE_CHECKOUT_URL
    const onUpgrade = () => {
      if(checkoutUrl) window.location.href = checkoutUrl
      else alert('Set VITE_STRIPE_CHECKOUT_URL in Netlify to enable checkout.')
    }
    if(loading) return <div className="p-4">Loading…</div>
    if(!isPremium){
      return <PremiumLock title={title} description={description} preview={preview} onUpgrade={onUpgrade} />
    }
    return <Component {...props} />
  }
}
