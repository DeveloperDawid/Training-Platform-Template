/*
 * -------------------------------------------------------
 * Section: Multiple Choice Statistics
 * Create statistics table for multiple choice quiz performance tracking
 * -------------------------------------------------------
 */

-- Create multiple choice statistics table
create table public.mc_stats (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.accounts(id) on delete cascade not null,

  -- Quiz statistics
  total_quizzes_completed integer default 0,
  total_questions_answered integer default 0,
  total_correct_answers integer default 0,
  average_score decimal(5,2) default 0.0,
  best_score decimal(5,2) default 0.0,

  -- Performance by product type
  product_a_correct integer default 0,
  product_a_total integer default 0,
  product_b_correct integer default 0,
  product_b_total integer default 0,
  product_other_correct integer default 0,
  product_other_total integer default 0,

  -- Performance by platform type
  platform_a_correct integer default 0,
  platform_a_total integer default 0,
  platform_b_correct integer default 0,
  platform_b_total integer default 0,
  platform_other_correct integer default 0,
  platform_other_total integer default 0,

  -- Metadata
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  unique(user_id)
);

-- Indexes
create index if not exists idx_mc_stats_user_id on public.mc_stats(user_id);
create index if not exists idx_mc_stats_average_score on public.mc_stats(average_score);
create index if not exists idx_mc_stats_total_questions on public.mc_stats(total_questions_answered);

-- Grants
grant select, insert, update, delete on table public.mc_stats to authenticated, service_role;

-- RLS
alter table public.mc_stats enable row level security;

-- Policies
create policy "Users can view own mc stats" on public.mc_stats
  for select using (auth.uid() = user_id);

create policy "Users can insert own mc stats" on public.mc_stats
  for insert with check (auth.uid() = user_id);

create policy "Users can update own mc stats" on public.mc_stats
  for update using (auth.uid() = user_id);

create policy "Admins can view all mc stats" on public.mc_stats
  for select using (
    auth.role() = 'authenticated'
    AND public.has_permission(auth.uid(), 'stats.view')
  );

-- Functions
create or replace function public.handle_mc_stats_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create or replace function public.create_mc_stats()
returns trigger as $$
begin
  insert into public.mc_stats (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$ language plpgsql;

-- Triggers
create trigger handle_mc_stats_updated_at
  before update on public.mc_stats
  for each row
  execute function public.handle_mc_stats_updated_at();

create trigger on_account_created_create_mc_stats
  after insert on public.accounts
  for each row
  execute function public.create_mc_stats();
