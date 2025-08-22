
import { supabase } from '../lib/supabase'

export async function createInvite(invitee_email){
  const code = Math.random().toString(36).slice(2,8).toUpperCase()
  const { data, error } = await supabase.from('invitations').insert({ invitee_email, code }).select('*').single()
  if(error) throw error
  return data
}

export async function acceptInvite(code){
  const { data: { user } } = await supabase.auth.getUser()
  if(!user) throw new Error('Not signed in')
  // claim invite
  const { data, error } = await supabase
    .from('invitations')
    .update({ accepted_by: user.id, used_at: new Date().toISOString() })
    .eq('code', code).select('*').single()
  if(error) throw error
  // mutual link in profiles.partner_id
  await supabase.from('profiles').upsert({ id: user.id })
  const { data: inviter } = await supabase.from('profiles').select('id, partner_id').eq('id', data.inviter_id).single()
  await supabase.from('profiles').upsert({ id: data.inviter_id, partner_id: user.id })
  await supabase.from('profiles').upsert({ id: user.id, partner_id: data.inviter_id })
  return data
}
