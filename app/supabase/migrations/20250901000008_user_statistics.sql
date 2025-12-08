/*
 * -------------------------------------------------------
 * Section: User Statistics
 * Create user statistics tables for learning analytics
 * -------------------------------------------------------
 */

-- Create user statistics table
create table public.user_stats (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.accounts(id) on delete cascade not null,
  
  -- Multiple Choice sessions and time
  total_sessions_mc integer default 0,
  total_time_seconds_mc integer default 0,
  
  -- Case study sessions and time
  total_sessions_cases integer default 0,
  total_time_seconds_cases integer default 0,

  -- Chat sessions and time 
  total_sessions_chat integer default 0,
  total_time_seconds_chat integer default 0,

  -- General stats
  streak_days integer default 0,
  last_activity_date date,

  -- Metadata
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  unique(user_id)
);

-- Indexes
create index if not exists idx_user_stats_user_id on public.user_stats(user_id);
create index if not exists idx_user_stats_last_activity on public.user_stats(last_activity_date);
create index if not exists idx_user_stats_streak on public.user_stats(streak_days);

-- Grants
grant select, insert, update, delete on table public.user_stats to authenticated, service_role;

-- RLS
alter table public.user_stats enable row level security;

-- Policies
create policy "Users can view own stats" on public.user_stats
  for select using (auth.uid() = user_id);

create policy "Users can insert own stats" on public.user_stats
  for insert with check (auth.uid() = user_id);

create policy "Users can update own stats" on public.user_stats
  for update using (auth.uid() = user_id);

create policy "Admins can view all stats" on public.user_stats
  for select using (
    auth.role() = 'authenticated' 
    AND public.has_permission(auth.uid(), 'stats.view')
  );

-- Functions
create or replace function public.handle_user_stats_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Triggers
create trigger handle_user_stats_updated_at
  before update on public.user_stats
  for each row
  execute function public.handle_user_stats_updated_at();

create or replace function public.create_user_stats()
returns trigger as $$
begin
  insert into public.user_stats (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$ language plpgsql;

create trigger on_account_created_create_stats
  after insert on public.accounts
  for each row
  execute function public.create_user_stats();