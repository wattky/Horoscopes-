
import { useEffect, useState } from 'react'
import { getEntitlement } from '../api/entitlements'

export function useEntitlements(){
  const [state,setState] = useState({ loading: true, isPremium: false, tier: 'free', row: null })
  useEffect(()=>{
    (async()=>{
      try{
        const row = await getEntitlement()
        setState({ loading:false, isPremium: !!row?.is_premium, tier: row?.tier || 'free', row })
      }catch(e){
        console.error(e); setState({ loading:false, isPremium:false, tier:'free', row:null })
      }
    })()
  },[])
  return state
}
