-- Table
create table if not exists public.accounts (
  id uuid references auth.users on delete cascade not null,
  name varchar(255) not null,
  email varchar(320) unique,
  role varchar(50) references public.roles (name) default 'user' not null,
  picture_url varchar(1000),
  public_data jsonb default '{}'::jsonb not null,

  -- Metadata
  updated_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid references auth.users,
  updated_by uuid references auth.users,
  primary key (id)
);

-- Indexes
create index if not exists idx_accounts_id on public.accounts(id);
create index if not exists idx_accounts_email on public.accounts(email);
create index if not exists idx_accounts_name on public.accounts(name);
create index if not exists idx_accounts_role on public.accounts(role);
create index if not exists idx_accounts_created_at on public.accounts(created_at);


-- Revoke all on accounts table from authenticated and service_role
revoke all on public.accounts
from
  authenticated,
  service_role;

-- Open up access to accounts
grant
  select,
  insert,
  update,
  delete
on table public.accounts to authenticated,
service_role;

-- RLS
alter table public.accounts enable row level security;

create policy "Users can view own accounts" on public.accounts
  for select using (auth.uid() = id);

create policy "Users can insert own accounts" on public.accounts
  for insert with check (auth.uid() = id);

create policy "Users can update own accounts" on public.accounts
  for update using (auth.uid() = id);

create policy "Users can delete own accounts" on public.accounts
  for delete using (auth.uid() = id);

-- Functions (define BEFORE triggers)

create or replace function public.setup_new_user()
returns trigger
language plpgsql
security definer
set search_path = '' as $$
declare
  user_name text;
  picture_url text;
begin
  if new.raw_user_meta_data ->> 'name' is not null then
    user_name := new.raw_user_meta_data ->> 'name';
  end if;

  if user_name is null and new.email is not null then
    user_name := split_part(new.email, '@', 1);
  end if;

  if user_name is null then
    user_name := '';
  end if;

  if new.raw_user_meta_data ->> 'avatar_url' is not null then
    picture_url := new.raw_user_meta_data ->> 'avatar_url';
  else
    picture_url := null;
  end if;

  insert into public.accounts (
    id,
    name,
    picture_url,
    email
  )
  values (
    new.id,
    user_name,
    picture_url,
    new.email
  );

  return new;
end;
$$;

grant execute on function public.setup_new_user() to authenticated, service_role;

create or replace function public.handle_update_user_email()
returns trigger
language plpgsql
security definer
set search_path = '' as $$
begin
  update public.accounts
     set email = new.email
   where id = new.id;

  return new;
end;
$$;

grant execute on function public.handle_update_user_email() to authenticated, service_role;

create or replace function public.handle_accounts_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  new.updated_by = auth.uid();
  return new;
end;
$$ language plpgsql;

-- Triggers (AFTER functions exist)

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.setup_new_user();

create trigger on_auth_user_updated
after update of email on auth.users
for each row
execute procedure public.handle_update_user_email();

create trigger handle_accounts_updated_at
  before update on public.accounts
  for each row
  execute function public.handle_accounts_updated_at();

-- Grants
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on public.accounts to authenticated;

-- Function "public.user_workspace"
create or replace function public.user_workspace()
returns table (
  id uuid,
  role varchar(50),
  permissions public.app_permissions[]
)
set search_path = '' as $$
begin
  return query
  select
    a.id,
    a.role,
    array_agg(rp.permission)
  from public.accounts a
  left join public.role_permissions rp on rp.role = a.role
  where a.id = (select auth.uid())
  group by a.id, a.role;
end;
$$ language plpgsql;

grant execute on function public.user_workspace() to authenticated, service_role;
