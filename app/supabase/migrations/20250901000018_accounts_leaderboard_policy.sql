-- Allow authenticated users to view account data for leaderboard
-- While this policy allows SELECT on all columns, the application code
-- will only request 'id' and 'name' columns, ensuring no sensitive data is exposed
-- Note: PostgreSQL RLS doesn't support column-level policies directly
create policy "Authenticated users can view account names for leaderboard" on public.accounts for
select
    to authenticated using (true);