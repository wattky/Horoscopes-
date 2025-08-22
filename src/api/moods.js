
import { supabase } from '../lib/supabase'
export async function saveMood(mood, note=''){
  const { error } = await supabase.from('moods').insert({ mood, note })
  if(error) throw error
}
export async function listMoods(){
  const { data, error } = await supabase.from('moods').select('*').order('created_at',{ascending:false}).limit(60)
  if(error) throw error
  return data
}
