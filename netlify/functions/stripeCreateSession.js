import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

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

  const { priceId, successUrl, cancelUrl } = body
  if (!priceId || !successUrl || !cancelUrl) {
    return { statusCode: 400, body: 'Missing Stripe params' }
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl
    })

    return { statusCode: 200, body: JSON.stringify({ id: session.id }) }
  } catch (err) {
    return { statusCode: 500, body: 'Stripe error: ' + err.message }
  }
}
