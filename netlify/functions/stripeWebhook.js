import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const sig = event.headers['stripe-signature']
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

  let stripeEvent
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      endpointSecret
    )
  } catch (err) {
    return { statusCode: 400, body: `Webhook Error: ${err.message}` }
  }

  // Example handling
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object
    console.log('✅ Payment success for', session.customer_email)
    // TODO: mark user as premium in Supabase
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) }
}
