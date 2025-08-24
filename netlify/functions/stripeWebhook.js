
import Stripe from 'stripe'

export default async (req, context) => {
  const key = process.env.STRIPE_SECRET_KEY
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if(!key || !secret) return new Response('Missing Stripe env', { status: 500 })

  const sig = req.headers.get('stripe-signature')
  const stripe = new Stripe(key, { apiVersion: '2024-06-20' })
  const rawBody = await req.text()
  let event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret)
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // NOTE: You'll need to map session.customer_email -> auth.users.email -> entitlements.user_id
  if(event.type === 'checkout.session.completed'){
    const email = event.data.object.customer_details.email
    // Netlify cannot query Supabase admin without service key here unless you add it.
    // Suggestion: forward to a Supabase Function or store mapping in metadata.
  }

  return new Response('ok', { status: 200 })
}

export const config = { path: "/.netlify/functions/stripeWebhook" }
