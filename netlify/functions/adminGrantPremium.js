import { createClient } from '@supabase/supabase-js'

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const secret = event.headers['x-admin-secret']
  if (secret !== process.env.ADMIN_SECRET) {
    return { statusCode: 401, body: 'Unauthorized' }
  }

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' }
  }

  const { email, tier = 'pro', days = 30 } = body
  if (!email) return { statusCode: 400, body: 'Missing email' }

  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_KEY
  if (!url || !serviceKey) return { statusCode: 500, body: 'Missing Supabase service config' }

  const admin = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  })

  const { data, error: uerr } = await admin.auth.admin.listUsers()
  if (uerr) return { statusCode: 500, body: 'Auth list error' }

  const user = data.users.find(u => u.email === email)
  if (!user) return { statusCode: 404, body: 'User not found' }

  const valid_until = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()
  const { error } = await admin
    .from('entitlements')
    .upsert({ user_id: user.id, is_premium: true, tier, valid_until, updated_at: new Date().toISOString() })

  if (error) return { statusCode: 500, body: 'DB error' }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, user_id: user.id, tier, valid_until })
  }
}
