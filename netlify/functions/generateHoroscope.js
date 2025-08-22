import { createClient } from '@supabase/supabase-js'

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' }
  }

  const { user_id, sign, content } = body
  if (!user_id || !sign || !content) {
    return { statusCode: 400, body: 'Missing required fields' }
  }

  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_KEY
  if (!url || !serviceKey) {
    return { statusCode: 500, body: 'Missing Supabase config' }
  }

  const supabase = createClient(url, serviceKey)

  const { error } = await supabase
    .from('horoscopes')
    .insert({ user_id, sign, content, created_at: new Date().toISOString() })

  if (error) return { statusCode: 500, body: 'DB error' }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) }
}
