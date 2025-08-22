
import { supabase } from '../lib/supabase'

export async function getEntitlement(){
  const { data: { user } } = await supabase.auth.getUser()
  if(!user) return null
  const { data, error } = await supabase.from('entitlements').select('*').eq('user_id', user.id).single()
  if(error && error.code!=='PGRST116') throw error
  return data || { user_id: user.id, is_premium: false, tier: 'free' }
}

export async function setPremium({ tier='pro', valid_until=null, is_premium=true }){
  const { data: { user } } = await supabase.auth.getUser()
  if(!user) throw new Error('Not signed in')
  const { data, error } = await supabase.from('entitlements')
    .upsert({ user_id: user.id, tier, valid_until, is_premium, updated_at: new Date().toISOString() })
    .select('*').single()
  if(error) throw error
  return data
}
