
import { supabase } from '../lib/supabase'
export async function addEntry(title, content){
  const { error } = await supabase.from('diary').insert({ title, content })
  if(error) throw error
}
export async function listEntries(){
  const { data, error } = await supabase.from('diary').select('*').order('created_at',{ascending:false}).limit(100)
  if(error) throw error
  return data
}
