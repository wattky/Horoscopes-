
import { supabase } from '../lib/supabase'
export async function saveHoroscope(sign, text){
  const { error } = await supabase.from('horoscopes').insert({ sign, text })
  if(error) throw error
}
export async function listMyHoroscopes(){
  const { data, error } = await supabase.from('horoscopes').select('*').order('date',{ascending:false}).limit(30)
  if(error) throw error
  return data
}
