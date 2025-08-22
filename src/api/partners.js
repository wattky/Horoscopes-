
import { supabase } from '../lib/supabase'
export async function getPartnerProfile(){
  const { data: { user } } = await supabase.auth.getUser()
  if(!user) return null
  const { data: me } = await supabase.from('profiles').select('partner_id').eq('id', user.id).single()
  if(!me?.partner_id) return null
  const { data, error } = await supabase.from('profiles').select('*').eq('id', me.partner_id).single()
  if(error) throw error
  return data
}
