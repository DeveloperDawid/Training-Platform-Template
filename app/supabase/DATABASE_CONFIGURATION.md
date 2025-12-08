# Database Configuration Guide

This project uses a generic database schema that can be adapted to various domains. Before deploying, you need to configure the database schema to match your specific requirements.

## 1. Configure Enums (`migrations/20250901000001_enums.sql`)

The most important configuration is the `product_type` and `platform_type` enums. These define the categories used throughout the application for questions, cases, and statistics.

### Current Default Configuration:

```sql
-- Create product types enum
create type public.product_type as enum ('product_a', 'product_b', 'other');

-- Create platform types enum
create type public.platform_type as enum ('platform_a', 'platform_b', 'other');
```

### How to Customize:

Replace the placeholder values with your actual product and platform names.

**Example for a Cloud Training Platform:**

```sql
create type public.product_type as enum ('Compute', 'Storage', 'Database', 'Networking', 'Other');
create type public.platform_type as enum ('AWS', 'Azure', 'GCP', 'OnPremise', 'Other');
```

**Example for a Software Support Training Platform:**

```sql
create type public.product_type as enum ('CRM', 'ERP', 'Analytics', 'Other');
create type public.platform_type as enum ('Cloud', 'Desktop', 'Mobile', 'Other');
```

---

## 2. Update Statistics Tables

After modifying the enums, update the statistics tables to track performance per product/platform.

### Files to Update:

| File                                            | Purpose                         |
| ----------------------------------------------- | ------------------------------- |
| `migrations/20250901000010_case_statistics.sql` | Case study performance tracking |
| `migrations/20250901000011_mc_statistics.sql`   | Multiple choice quiz statistics |
| `migrations/20250901000012_chat_statistics.sql` | Chat training statistics        |

### Column Naming Convention:

For each product type, create columns following this pattern:

```sql
-- For product types
product_<your_product_name>_correct integer default 0,
product_<your_product_name>_total integer default 0,
-- OR for scores
product_<your_product_name>_avg_score decimal(5,2) default 0.0,
product_<your_product_name>_attempts integer default 0,

-- For platform types
platform_<your_platform_name>_correct integer default 0,
platform_<your_platform_name>_total integer default 0,
```

### Example (mc_statistics.sql):

If your products are `Compute`, `Storage`, `Database`:

```sql
-- Performance by product type
product_compute_correct integer default 0,
product_compute_total integer default 0,
product_storage_correct integer default 0,
product_storage_total integer default 0,
product_database_correct integer default 0,
product_database_total integer default 0,
product_other_correct integer default 0,
product_other_total integer default 0,
```

---

## 3. Seed Data (`seed.sql`)

The `seed.sql` file contains example data for development and testing. Replace the generic examples with your domain-specific content.

### Multiple Choice Questions:

```sql
INSERT INTO public.mc_questions (question_text, product_type, platform_type, difficulty, tags, option_1, option_2, option_3, option_4, correct_option)
VALUES
('Your specific question here?',
'YourProduct'::public.product_type, 'YourPlatform'::public.platform_type, 'Easy'::public.difficulty_level, ARRAY['tag1','tag2']::text[],
'Correct Answer', 'Wrong Answer 1', 'Wrong Answer 2', 'Wrong Answer 3', 1);
```

### Cases:

```sql
INSERT INTO public.cases (title, problem_description, solution, ai_instructions, product_type, platform_type, difficulty, tags)
VALUES
('Your Case Title',
'Detailed problem description...',
'The solution to the problem...',
'Instructions for AI to evaluate user responses...',
'YourProduct'::public.product_type,
'YourPlatform'::public.platform_type,
'Medium'::public.difficulty_level,
array['tag1','tag2']::text[]);
```

---

## 4. After Database Changes

After modifying the database schema, regenerate TypeScript types:

```bash
npx supabase gen types typescript --project-id <your-project-id> > lib/supabase/database.types.ts
```

---

## Quick Checklist

- [ ] Update `product_type` enum in `20250901000001_enums.sql`
- [ ] Update `platform_type` enum in `20250901000001_enums.sql`
- [ ] Update columns in `20250901000010_case_statistics.sql`
- [ ] Update columns in `20250901000011_mc_statistics.sql`
- [ ] Update columns in `20250901000012_chat_statistics.sql`
- [ ] Add your questions/cases to `seed.sql`
- [ ] Regenerate TypeScript types
- [ ] Update any frontend code that references product/platform types e.g. server actions
