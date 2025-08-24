
import Stripe from 'stripe'
export default async (req) => {
  const key = process.env.STRIPE_SECRET_KEY
  if(!key) return new Response('Missing STRIPE_SECRET_KEY', { status: 500 })
  const stripe = new Stripe(key, { apiVersion: '2024-06-20' })
  const body = await req.json()
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: body.priceId, quantity: 1 }],
    success_url: body.successUrl,
    cancel_url: body.cancelUrl,
  })
  return Response.json({ url: session.url })
}
