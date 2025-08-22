-- Demo accounts only, no history data
insert into auth.users (id, email, encrypted_password)
values
  ('00000000-0000-0000-0000-000000000001', 'demo_free@example.com', crypt('password123', gen_salt('bf'))),
  ('00000000-0000-0000-0000-000000000002', 'demo_premium@example.com', crypt('password123', gen_salt('bf'))),
  ('00000000-0000-0000-0000-000000000003', 'admin@wattky.com', crypt('password123', gen_salt('bf')));

-- Entitlements: premium flag for demo_premium and admin
insert into public.entitlements (user_id, is_premium)
values
  ('00000000-0000-0000-0000-000000000002', true),
  ('00000000-0000-0000-0000-000000000003', true);
