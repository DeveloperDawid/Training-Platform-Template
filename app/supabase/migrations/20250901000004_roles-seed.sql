/*
 * -------------------------------------------------------
 * Section: Roles Seed Data
 * Insert default roles and permissions
 * -------------------------------------------------------
 */
-- Insert default roles
insert into
    public.roles (name, hierarchy_level)
values
    ('admin', 1),
    ('trainer', 2),
    ('user', 3);

-- Insert role permissions
insert into
    public.role_permissions (role, permission)
values
    ('admin', 'members.manage'),
    ('admin', 'tasks.write'),
    ('admin', 'tasks.delete'),
    ('admin', 'stats.view'),
    ('trainer', 'tasks.write'),
    ('trainer', 'tasks.delete');