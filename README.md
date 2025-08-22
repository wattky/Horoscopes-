
# Cosmic Love — Ultimate (60+ pages)

Production-ready skeleton with mobile-first UI, Tailwind, i18n (EN/CZ/SK/PL/HU), Supabase hooks, Netlify Functions (AI horoscope).

## Deploy on Netlify
- Build: `npm run build`
- Publish: `dist`
- Functions: `netlify/functions`

## Environment
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY` (optional)
- `VITE_STRIPE_CHECKOUT_URL` (optional)


## Supabase Setup
1. Create a Supabase project and copy your URL + anon key.
2. In **Project > SQL**, run `supabase_schema.sql` from the repo root.
3. In Netlify, add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY` (optional for serverless horoscope)
4. Redeploy. Sign in with magic link and start saving data.



## Partner Linking
- Page: `/partnerlink` → create invite by email and share code/link.
- Partner accepts at `/accept-invite/:code` → mutual `profiles.partner_id` linking.

## Shared Diary Visibility
- RLS allows your linked partner to read your diary entries.

## Admin Dashboard
- Page: `/admindashboard` with metrics and simple premium granting (requires Supabase service role for admin APIs if using `auth.admin`).

## Payments
- Quick way: set `VITE_STRIPE_CHECKOUT_URL` to a Stripe Checkout link.
- Advanced: use `/.netlify/functions/stripeCreateSession` with `STRIPE_SECRET_KEY` and handle webhooks at `/.netlify/functions/stripeWebhook` with `STRIPE_WEBHOOK_SECRET` to set entitlements.


## Premium Gating & Blurred Previews
- Reusable component: `src/components/PremiumLock.jsx`
- Hook: `src/hooks/useEntitlements.js`
- HOC: `src/hooks/withPremiumGate.jsx`
- Applied to: Advanced Horoscope, Instant Match (advanced), Tarot full spread, and more.
- Set `VITE_STRIPE_CHECKOUT_URL` for the Upgrade button.

## Partner Filters
- Mood Tracker & Horoscope History have toggles: **Mine | Partner | Both**.

## Secure Admin
- Only `admin@wattky.com` can access `/admindashboard` (client-side check).
- Function: `/.netlify/functions/adminGrantPremium` requires envs:
  - `SUPABASE_SERVICE_KEY`
  - `ADMIN_SECRET`
  - `VITE_SUPABASE_URL` (or `SUPABASE_URL`)
