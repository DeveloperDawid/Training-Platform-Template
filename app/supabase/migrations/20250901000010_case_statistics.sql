/*
 * -------------------------------------------------------
 * Section: Case Statistics
 * Create statistics table for case study performance tracking
 * -------------------------------------------------------
 */

-- Create case statistics table
create table public.case_stats (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.accounts(id) on delete cascade not null,

  -- Case solving statistics
  total_cases_attempted integer default 0,
  total_cases_completed integer default 0,
  average_ai_score decimal(5,2) default 0.0,
  best_ai_score decimal(5,2) default 0.0,

  -- Score distribution (AI evaluation 1-10)
  scores_0_3 integer default 0,  -- Poor (0-3)
  scores_4_6 integer default 0,  -- Fair (4-6)
  scores_7_8 integer default 0,  -- Good (7-8)
  scores_9_10 integer default 0, -- Excellent (9-10)

  -- Performance by product type
  product_a_avg_score decimal(5,2) default 0.0,
  product_b_avg_score decimal(5,2) default 0.0,
  product_other_avg_score decimal(5,2) default 0.0,
  platform_a_avg_score decimal(5,2) default 0.0,
  platform_b_avg_score decimal(5,2) default 0.0,
  platform_other_avg_score decimal(5,2) default 0.0,

  -- Product type attempt counters
  product_a_attempts integer default 0,
  product_b_attempts integer default 0,
  product_other_attempts integer default 0,

  platform_a_attempts integer default 0,
  platform_b_attempts integer default 0,
  platform_other_attempts integer default 0,

  -- Metadata
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  unique(user_id)
);

-- Indexes
create index if not exists idx_case_stats_user_id on public.case_stats(user_id);
create index if not exists idx_case_stats_average_score on public.case_stats(average_ai_score);
create index if not exists idx_case_stats_total_completed on public.case_stats(total_cases_completed);

-- Grants
grant select, insert, update, delete on table public.case_stats to authenticated, service_role;

-- RLS
alter table public.case_stats enable row level security;

-- Policies
create policy "Users can view own case stats" on public.case_stats
  for select using (auth.uid() = user_id);

create policy "Users can insert own case stats" on public.case_stats
  for insert with check (auth.uid() = user_id);

create policy "Users can update own case stats" on public.case_stats
  for update using (auth.uid() = user_id);

create policy "Admins can view all case stats" on public.case_stats
  for select using (
    auth.role() = 'authenticated'
    AND public.has_permission(auth.uid(), 'stats.view')
  );

-- Functions
create or replace function public.handle_case_stats_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create or replace function public.create_case_stats()
returns trigger as $$
begin
  insert into public.case_stats (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$ language plpgsql;

-- Triggers
create trigger handle_case_stats_updated_at
  before update on public.case_stats
  for each row
  execute function public.handle_case_stats_updated_at();

create trigger on_account_created_create_case_stats
  after insert on public.accounts
  for each row
  execute function public.create_case_stats();
