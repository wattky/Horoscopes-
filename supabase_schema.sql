
-- Run this in Supabase SQL editor

create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text unique,
  birthdate date,
  zodiac_sign text,
  partner_id uuid references profiles(id),
  created_at timestamptz default now()
);

create table if not exists moods (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade default auth.uid(),
  mood text check (mood in ('happy','neutral','sad','excited','anxious','romantic')),
  note text,
  created_at timestamptz default now()
);

create table if not exists diary (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade default auth.uid(),
  title text,
  content text,
  created_at timestamptz default now()
);

create table if not exists matches (
  id uuid primary key default gen_random_uuid(),
  user1 uuid references auth.users(id) on delete cascade default auth.uid(),
  user2 uuid references auth.users(id) on delete cascade,
  score int,
  details jsonb,
  created_at timestamptz default now()
);

create table if not exists horoscopes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade default auth.uid(),
  sign text,
  date date default current_date,
  text text,
  created_at timestamptz default now()
);

-- Row Level Security
alter table profiles enable row level security;
alter table moods enable row level security;
alter table diary enable row level security;
alter table matches enable row level security;
alter table horoscopes enable row level security;

-- Policies
create policy "Profiles are readable by owner" on profiles for select using (auth.uid() = id);
create policy "Profiles are upsertable by owner" on profiles for insert with check (auth.uid() = id);
create policy "Profiles are updatable by owner" on profiles for update using (auth.uid() = id);

create policy "Moods: owner can CRUD" on moods
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Diary: owner can CRUD" on diary
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Horoscopes: owner can CRUD" on horoscopes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Matches: owner read/write" on matches
  for all using (auth.uid() = user1) with check (auth.uid() = user1);


-- ===== Partner Invites =====
create table if not exists invitations (
  id uuid primary key default gen_random_uuid(),
  inviter_id uuid references auth.users(id) on delete cascade default auth.uid(),
  invitee_email text,
  code text unique not null,
  accepted_by uuid references auth.users(id),
  used_at timestamptz,
  created_at timestamptz default now()
);

alter table invitations enable row level security;
create policy "Invites: inviter can CRUD and invitee can read by code"
on invitations for all
  using (auth.uid() = inviter_id or accepted_by = auth.uid())
  with check (auth.uid() = inviter_id or accepted_by = auth.uid());

-- ===== Entitlements (Premium) =====
create table if not exists entitlements (
  user_id uuid references auth.users(id) on delete cascade primary key,
  is_premium boolean default false,
  tier text default 'free',
  valid_until timestamptz,
  updated_at timestamptz default now()
);

alter table entitlements enable row level security;
create policy "Entitlements: owner can read and update self"
on entitlements for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Seed entitlement on profile upsert (optional trigger)
-- (omitted for simplicity; front-end will upsert on login)

-- ===== Partner-aware Diary RLS =====
drop policy if exists "Diary: owner can CRUD" on diary;
create policy "Diary: owner or linked partner can SELECT"
  on diary for select
  using (
    user_id = auth.uid()
    or exists (
      select 1 from profiles p
      where p.id = auth.uid() and (p.partner_id = diary.user_id)
    )
  );

create policy "Diary: owner can INSERT"
  on diary for insert
  with check (user_id = auth.uid());

create policy "Diary: owner can UPDATE/DELETE own rows"
  on diary for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "Diary: owner can UPDATE/DELETE own rows d"
  on diary for delete using (user_id = auth.uid());
