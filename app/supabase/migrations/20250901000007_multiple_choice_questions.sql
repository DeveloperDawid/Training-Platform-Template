
/*
 * -------------------------------------------------------
 * Section: Multiple Choice Questions
 * Create multiple choice questions table for training
 * -------------------------------------------------------
 */

-- Create multiple choice questions table
create table mc_questions (
  id uuid default gen_random_uuid() primary key,
  question_text text not null,
  product_type public.product_type not null,
  platform_type public.platform_type not null,
  difficulty public.difficulty_level not null default 'easy',
  tags text[] default '{}',
  option_1 text not null,
  option_2 text not null,
  option_3 text not null,
  option_4 text not null,
  correct_option int not null check (correct_option in (1,2,3,4)) default 1,

  -- Metadata
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone,
  created_by uuid references auth.users on delete set null,
  updated_by uuid references auth.users on delete set null
);

-- Indexes
create index if not exists idx_mc_questions_difficulty on public.mc_questions(difficulty);
create index if not exists idx_mc_questions_created_at on public.mc_questions(created_at);
create index if not exists idx_mc_questions_question_text_English on public.mc_questions using gin(to_tsvector('English', question_text));
create index if not exists idx_mc_questions_question_text_english on public.mc_questions using gin(to_tsvector('english', question_text));

-- RLS
alter table public.mc_questions enable row level security;

-- Policies
create policy "Anyone can view multiple choice questions" on public.mc_questions
  for select using (auth.role() = 'authenticated');

create policy "Authenticated users can insert multiple choice questions" on public.mc_questions
  for insert
  with check (
    auth.role() = 'authenticated'
    AND public.has_permission(auth.uid(), 'tasks.write')
  );

create policy "Users can update own multiple choice questions" on public.mc_questions
  for update
  using (
    auth.role() = 'authenticated'
    AND public.has_permission(auth.uid(), 'tasks.write')
  );

create policy "Users can delete own multiple choice questions" on public.mc_questions
  for delete
  using (
    auth.role() = 'authenticated'
    AND public.has_permission(auth.uid(), 'tasks.delete')
  );

-- Functions
create or replace function public.handle_mc_questions_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  new.updated_by = auth.uid();
  return new;
end;
$$ language plpgsql;

create or replace function public.handle_mc_questions_created_by()
returns trigger as $$
begin
  new.created_by = auth.uid();
  new.created_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Triggers
create trigger handle_mc_questions_updated_at
  before update on public.mc_questions
  for each row
  execute function public.handle_mc_questions_updated_at();

create trigger handle_mc_questions_created_by
  before insert on public.mc_questions
  for each row
  execute function public.handle_mc_questions_created_by();
