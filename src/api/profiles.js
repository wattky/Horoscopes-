
import { supabase } from '../lib/supabase'
export async function upsertProfile(payload){
  const { data, error } = await supabase.from('profiles').upsert(payload).select('*').single()
  if(error) throw error; return data
}
export async function getMyProfile(){
  const { data: { user } } = await supabase.auth.getUser()
  if(!user) return null
  const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  if(error && error.code!=='PGRST116') throw error
  return data || null
}
