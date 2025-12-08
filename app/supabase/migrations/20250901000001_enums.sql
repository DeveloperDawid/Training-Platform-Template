/*
 * -------------------------------------------------------
 * Section: Application Enums
 * Create all enum types used throughout the application
 * -------------------------------------------------------
 */
-- Create enum for application permissions
create type public.app_permissions as enum (
  'members.manage', -- for team accounts
  'tasks.write',
  'tasks.delete',
  'stats.view'
);

-- Create enum for learning module types
create type public.learning_module_type as enum (
  'multiple_choice',
  'cases_ai',
  'chat',
  'knowledge_test'
);

-- Create difficulty enum for content progression
create type public.difficulty_level as enum ('easy', 'medium', 'hard');

-- Create product types enum
create type public.product_type as enum ('product_a', 'product_b', 'other');

-- Create platform types enum
create type public.platform_type as enum ('platform_a', 'platform_b', 'other');
