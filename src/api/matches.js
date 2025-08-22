
import { supabase } from '../lib/supabase'
export async function listMatches(){
  const { data, error } = await supabase.from('matches').select('*').order('created_at',{ascending:false}).limit(50)
  if(error) throw error
  return data
}
export async function cacheMatch(user2, score, details){
  const { error } = await supabase.from('matches').insert({ user2, score, details })
  if(error) throw error
}
