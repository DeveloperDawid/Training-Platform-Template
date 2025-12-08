/*
 * -------------------------------------------------------
 * Section: Cases Table and Product Types
 * Create cases table for support case studies and training
 * -------------------------------------------------------
 */


-- Create cases table
create table if not exists public.cases (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  problem_description text not null,
  solution text not null,
  ai_instructions text, -- Optional instructions for AI to understand the case better
  product_type public.product_type not null,
  platform_type public.platform_type not null,
  difficulty public.difficulty_level not null default 'easy',
  tags text[] default '{}',

  -- Metadata
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone,
  created_by uuid references auth.users on delete set null,
  updated_by uuid references auth.users on delete set null
);

-- Indexes
create index if not exists idx_cases_tags on public.cases using gin(tags);
create index if not exists idx_cases_difficulty on public.cases(difficulty);
create index if not exists idx_cases_created_at on public.cases(created_at);
create index if not exists idx_cases_created_by on public.cases(created_by);
create index if not exists idx_cases_problem_description on public.cases using gin(to_tsvector('english', problem_description));
create index if not exists idx_cases_solution on public.cases using gin(to_tsvector('english', solution));
create index if not exists idx_cases_ai_instructions on public.cases using gin(to_tsvector('english', ai_instructions));


-- RLS
alter table public.cases enable row level security;

-- Policies
create policy "Anyone can view cases" on public.cases
  for select using (auth.role() = 'authenticated');

create policy "Authenticated users can insert cases" on public.cases
  for insert
  with check (
    auth.role() = 'authenticated'
    AND public.has_permission(auth.uid(), 'tasks.write')
  );

create policy "Users can update own cases" on public.cases
  for update
  using (
    auth.role() = 'authenticated'
    AND public.has_permission(auth.uid(), 'tasks.write')
  );

create policy "Users can delete own cases" on public.cases
  for delete
  using (
    auth.role() = 'authenticated'
    AND public.has_permission(auth.uid(), 'tasks.delete')
  );

-- Functions
create or replace function public.handle_cases_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  new.updated_by = auth.uid();
  return new;
end;
$$ language plpgsql;

create or replace function public.handle_cases_created_by()
returns trigger as $$
begin
  new.created_by = auth.uid();
  new.created_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Triggers
create trigger handle_cases_updated_at
  before update on public.cases
  for each row
  execute function public.handle_cases_updated_at();

create trigger handle_cases_created_by
  before insert on public.cases
  for each row
  execute function public.handle_cases_created_by();
