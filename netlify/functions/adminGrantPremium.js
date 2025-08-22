
import { createClient } from '@supabase/supabase-js'

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })
  const secret = req.headers.get('x-admin-secret')
  if (secret !== process.env.ADMIN_SECRET) return new Response('Unauthorized', { status: 401 })

  const { email, tier='pro', days=30 } = await req.json()
  if(!email) return new Response('Missing email', { status: 400 })

  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_KEY
  if(!url || !serviceKey) return new Response('Missing Supabase service config', { status: 500 })

  const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } })

  // find user by email
  const { data: { users }, error: uerr } = await admin.auth.admin.listUsers()
  if(uerr) return new Response('Auth list error', { status: 500 })
  const user = users.find(u => u.email === email)
  if(!user) return new Response('User not found', { status: 404 })

  const valid_until = new Date(Date.now() + days*24*60*60*1000).toISOString()
  const { error } = await admin.from('entitlements').upsert({ user_id: user.id, is_premium: true, tier, valid_until, updated_at: new Date().toISOString() })
  if(error) return new Response('DB error', { status: 500 })

  return Response.json({ ok: true, user_id: user.id, tier, valid_until })
}

export const config = { path: "/.netlify/functions/adminGrantPremium" }
