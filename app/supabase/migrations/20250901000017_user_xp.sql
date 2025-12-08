CREATE TABLE
    user_xp (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
        total_xp BIGINT DEFAULT 0 NOT NULL,
        current_level INT DEFAULT 1 NOT NULL,
        xp_to_next_level BIGINT DEFAULT 100 NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW (),
        UNIQUE (user_id)
    );

-- Indexes for user_xp
create index if not exists idx_user_xp_id on public.user_xp (id);

create index if not exists idx_user_xp_user_id on public.user_xp (user_id);

create index if not exists idx_user_xp_total_xp on public.user_xp (total_xp);

create index if not exists idx_user_xp_current_level on public.user_xp (current_level);

create index if not exists idx_user_xp_updated_at on public.user_xp (updated_at);

-- Revoke all on user_xp table from authenticated and service_role
revoke all on public.user_xp
from
    authenticated,
    service_role;

-- Open up access to user_xp
grant
select
,
    insert,
update,
delete on table public.user_xp to authenticated,
service_role;

-- RLS for user_xp
alter table public.user_xp enable row level security;

create policy "Users can view own user_xp" on public.user_xp for
select
    using (auth.uid () = user_id);

create policy "Users can insert own user_xp" on public.user_xp for insert
with
    check (auth.uid () = user_id);

create policy "Users can update own user_xp" on public.user_xp for
update using (auth.uid () = user_id);

create policy "Users can delete own user_xp" on public.user_xp for delete using (auth.uid () = user_id);

-- Functions
create or replace function public.handle_user_xp_updated_at()
returns trigger as $$
begin
  new.updated_at = NOW();
  return new;
end;
$$ language plpgsql;

create or replace function public.create_user_xp()
returns trigger as $$
begin
  insert into public.user_xp (user_id, total_xp, current_level, xp_to_next_level)
  values (new.id, 0, 1, 100)
  on conflict (user_id) do nothing;
  return new;
end;
$$ language plpgsql;

-- Triggers
create trigger handle_user_xp_updated_at
  before update on public.user_xp
  for each row
  execute function public.handle_user_xp_updated_at();

create trigger on_account_created_create_user_xp
  after insert on public.accounts
  for each row
  execute function public.create_user_xp();

  -- Add policy to allow all authenticated users to view all user_xp data for leaderboard
create policy "All users can view all user_xp for leaderboard" on public.user_xp for select
    using (auth.role() = 'authenticated');