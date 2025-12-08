/*
 * -------------------------------------------------------
 * Section: Roles Table
 * Create roles table for role-based access control
 * -------------------------------------------------------
 */
-- Create roles table
create table
  if not exists public.roles (
    name varchar(50) not null,
    hierarchy_level int not null check (hierarchy_level > 0),
    primary key (name),
    unique (hierarchy_level)
  );

-- Indexes
create index if not exists idx_roles_hierarchy_level on public.roles (hierarchy_level);

-- Revoke all on roles table from authenticated and service_role
revoke all on public.roles
from
  authenticated,
  service_role;

-- Grants
grant
select
  on table public.roles to authenticated,
  service_role;

-- RLS
alter table public.roles enable row level security;

-- Policies
create policy "Anyone can view roles" on public.roles for
select
  using (auth.role () = 'authenticated');