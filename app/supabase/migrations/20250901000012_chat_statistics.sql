/*
 * -------------------------------------------------------
 * Section: Chat Statistics
 * Create statistics table for chat training performance tracking
 * -------------------------------------------------------
 */

-- Create chat statistics table
create table public.chat_stats (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.accounts(id) on delete cascade not null,

  -- Chat session statistics
  total_chats_attempted integer default 0,
  total_chats_completed integer default 0,
  total_messages_sent integer default 0,
  average_conversation_time decimal(5,1) default 0.0,
  average_messages_per_chat decimal(5,1) default 0.0,

  -- Performance statistics (AI evaluation 0-10)
  average_ai_score decimal(5,2) default 0.0,
  best_ai_score decimal(5,2) default 0.0,

  -- Score distribution (AI evaluation 0-10)
  scores_0_3 integer default 0,  -- Poor (0-3)
  scores_4_6 integer default 0,  -- Fair (4-6)
  scores_7_8 integer default 0,  -- Good (7-8)
  scores_9_10 integer default 0, -- Excellent (9-10)

  -- Conversation quality metrics
  shortest_chat integer default 0,  -- Minimum messages in a successful chat
  longest_chat integer default 0,             -- Maximum messages in any chat

  -- Performance by product type
  product_a_avg_score decimal(5,2) default 0.0,
  product_a_attempts integer default 0,
  product_b_avg_score decimal(5,2) default 0.0,
  product_b_attempts integer default 0,
  product_other_avg_score decimal(5,2) default 0.0,
  product_other_attempts integer default 0,

  -- Performance by platform type
  platform_a_avg_score decimal(5,2) default 0.0,
  platform_a_attempts integer default 0,
  platform_b_avg_score decimal(5,2) default 0.0,
  platform_b_attempts integer default 0,
  platform_other_avg_score decimal(5,2) default 0.0,
  platform_other_attempts integer default 0,
  
  -- Metadata
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  unique(user_id)
);

-- Indexes
create index if not exists idx_chat_stats_user_id on public.chat_stats(user_id);
create index if not exists idx_chat_stats_average_score on public.chat_stats(average_ai_score);
create index if not exists idx_chat_stats_total_completed on public.chat_stats(total_chats_completed);


-- Grants
grant select, insert, update, delete on table public.chat_stats to authenticated, service_role;

-- RLS
alter table public.chat_stats enable row level security;

-- Policies
create policy "Users can view own chat stats" on public.chat_stats
  for select using (auth.uid() = user_id);

create policy "Users can insert own chat stats" on public.chat_stats
  for insert with check (auth.uid() = user_id);

create policy "Users can update own chat stats" on public.chat_stats
  for update using (auth.uid() = user_id);

create policy "Admins can view all chat stats" on public.chat_stats
  for select using (
    auth.role() = 'authenticated' 
    AND public.has_permission(auth.uid(), 'stats.view')
  );

-- Functions
create or replace function public.handle_chat_stats_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create or replace function public.create_chat_stats()
returns trigger as $$
begin
  insert into public.chat_stats (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$ language plpgsql;

-- Triggers
create trigger handle_chat_stats_updated_at
  before update on public.chat_stats
  for each row
  execute function public.handle_chat_stats_updated_at();

create trigger on_account_created_create_chat_stats
  after insert on public.accounts
  for each row
  execute function public.create_chat_stats();
