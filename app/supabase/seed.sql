
-- Seed data for development and testing
-- Password for test user: 'password123'

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at",
                            "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token",
                            "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at",
                            "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin",
                            "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change",
                            "phone_change_token", "phone_change_sent_at", "email_change_token_current",
                            "email_change_confirm_status", "banned_until", "reauthentication_token",
                            "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous")
VALUES ('00000000-0000-0000-0000-000000000000', 'b73eb03e-fb7a-424d-84ff-18e2791ce0b4', 'authenticated',
        'authenticated', 'test@example.com', '$2a$10$b3ZPpU6TU3or30QzrXnZDuATPAx2pPq3JW.sNaneVY3aafMSuR4yi',
        '2024-04-20 08:38:00.860548+00', NULL, '', '2024-04-20 08:37:43.343769+00', '', NULL, '', '', NULL,
        '2024-04-20 08:38:00.93864+00', '{"provider": "email", "providers": ["email"]}',
        '{"sub": "b73eb03e-fb7a-424d-84ff-18e2791ce0b4", "email": "test@example.com", "email_verified": false, "phone_verified": false}',
        NULL, '2024-04-20 08:37:43.3385+00', '2024-04-20 08:38:00.942809+00', NULL, NULL, '', '', NULL, '', 0, NULL, '',
        NULL, false, NULL, false);

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at",
                            "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token",
                            "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at",
                            "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin",
                            "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change",
                            "phone_change_token", "phone_change_sent_at", "email_change_token_current",
                            "email_change_confirm_status", "banned_until", "reauthentication_token",
                            "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous")
VALUES ('00000000-0000-0000-0000-000000000001', 'b73eb03e-fb7a-424d-84ff-18e2791ce0b5', 'authenticated',
        'authenticated', 'test1@example.com', '$2a$10$b3ZPpU6TU3or30QzrXnZDuATPAx2pPq3JW.sNaneVY3aafMSuR4yi',
        '2024-04-20 08:38:00.860548+00', NULL, '', '2024-04-20 08:37:43.343769+00', '', NULL, '', '', NULL,
        '2024-04-20 08:38:00.93864+00', '{"provider": "email", "providers": ["email"]}',
        '{"sub": "b73eb03e-fb7a-424d-84ff-18e2791ce0b5", "email": "test1@example.com", "email_verified": false, "phone_verified": false}',
        NULL, '2024-04-20 08:37:43.3385+00', '2024-04-20 08:38:00.942809+00', NULL, NULL, '', '', NULL, '', 0, NULL, '',
        NULL, false, NULL, false);

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at",
                                 "updated_at", "id")
VALUES ('b73eb03e-fb7a-424d-84ff-18e2791ce0b4', 'b73eb03e-fb7a-424d-84ff-18e2791ce0b4',
        '{"sub": "b73eb03e-fb7a-424d-84ff-18e2791ce0b4", "email": "test@example.com", "email_verified": false, "phone_verified": false}',
        'email', '2024-04-20 08:37:43.342194+00', '2024-04-20 08:37:43.342218+00', '2024-04-20 08:37:43.342218+00',
        '4392e228-a6d8-4295-a7d6-baed50c33e7c');

update public.accounts
set role = 'admin'
where id = 'b73eb03e-fb7a-424d-84ff-18e2791ce0b4';

INSERT INTO public.mc_questions (question_text, product_type, platform_type, difficulty, tags, option_1, option_2, option_3, option_4, correct_option)
VALUES

-- ########################################
-- ## Category: product_a + platform_a
-- ########################################
('Product A on Platform A - Easy Question?',
'product_a'::public.product_type, 'platform_a'::public.platform_type, 'easy'::public.difficulty_level, ARRAY['basics']::text[],
'Correct Answer', 'Wrong Answer 1', 'Wrong Answer 2', 'Wrong Answer 3', 1),

('Product A on Platform A - Medium Question?',
'product_a'::public.product_type, 'platform_a'::public.platform_type, 'medium'::public.difficulty_level, ARRAY['intermediate']::text[],
'Wrong Answer 1', 'Correct Answer', 'Wrong Answer 2', 'Wrong Answer 3', 2),

('Product A on Platform A - Hard Question?',
'product_a'::public.product_type, 'platform_a'::public.platform_type, 'hard'::public.difficulty_level, ARRAY['advanced']::text[],
'Wrong Answer 1', 'Wrong Answer 2', 'Correct Answer', 'Wrong Answer 3', 3),

-- ########################################
-- ## Category: product_a + platform_b
-- ########################################
('Product A on Platform B - Easy Question?',
'product_a'::public.product_type, 'platform_b'::public.platform_type, 'easy'::public.difficulty_level, ARRAY['basics']::text[],
'Correct Answer', 'Wrong Answer 1', 'Wrong Answer 2', 'Wrong Answer 3', 1),

('Product A on Platform B - Medium Question?',
'product_a'::public.product_type, 'platform_b'::public.platform_type, 'medium'::public.difficulty_level, ARRAY['intermediate']::text[],
'Wrong Answer 1', 'Correct Answer', 'Wrong Answer 2', 'Wrong Answer 3', 2),

('Product A on Platform B - Hard Question?',
'product_a'::public.product_type, 'platform_b'::public.platform_type, 'hard'::public.difficulty_level, ARRAY['advanced']::text[],
'Wrong Answer 1', 'Wrong Answer 2', 'Correct Answer', 'Wrong Answer 3', 3),

-- ########################################
-- ## Category: product_a + other platform
-- ########################################
('Product A on Other Platform - Easy Question?',
'product_a'::public.product_type, 'other'::public.platform_type, 'easy'::public.difficulty_level, ARRAY['basics']::text[],
'Correct Answer', 'Wrong Answer 1', 'Wrong Answer 2', 'Wrong Answer 3', 1),

('Product A on Other Platform - Medium Question?',
'product_a'::public.product_type, 'other'::public.platform_type, 'medium'::public.difficulty_level, ARRAY['intermediate']::text[],
'Wrong Answer 1', 'Correct Answer', 'Wrong Answer 2', 'Wrong Answer 3', 2),

('Product A on Other Platform - Hard Question?',
'product_a'::public.product_type, 'other'::public.platform_type, 'hard'::public.difficulty_level, ARRAY['advanced']::text[],
'Wrong Answer 1', 'Wrong Answer 2', 'Correct Answer', 'Wrong Answer 3', 3),

-- ########################################
-- ## Category: product_b + platform_a
-- ########################################
('Product B on Platform A - Easy Question?',
'product_b'::public.product_type, 'platform_a'::public.platform_type, 'easy'::public.difficulty_level, ARRAY['basics']::text[],
'Correct Answer', 'Wrong Answer 1', 'Wrong Answer 2', 'Wrong Answer 3', 1),

('Product B on Platform A - Medium Question?',
'product_b'::public.product_type, 'platform_a'::public.platform_type, 'medium'::public.difficulty_level, ARRAY['intermediate']::text[],
'Wrong Answer 1', 'Correct Answer', 'Wrong Answer 2', 'Wrong Answer 3', 2),

('Product B on Platform A - Hard Question?',
'product_b'::public.product_type, 'platform_a'::public.platform_type, 'hard'::public.difficulty_level, ARRAY['advanced']::text[],
'Wrong Answer 1', 'Wrong Answer 2', 'Correct Answer', 'Wrong Answer 3', 3),

-- ########################################
-- ## Category: product_b + platform_b
-- ########################################
('Product B on Platform B - Easy Question?',
'product_b'::public.product_type, 'platform_b'::public.platform_type, 'easy'::public.difficulty_level, ARRAY['basics']::text[],
'Correct Answer', 'Wrong Answer 1', 'Wrong Answer 2', 'Wrong Answer 3', 1),

('Product B on Platform B - Medium Question?',
'product_b'::public.product_type, 'platform_b'::public.platform_type, 'medium'::public.difficulty_level, ARRAY['intermediate']::text[],
'Wrong Answer 1', 'Correct Answer', 'Wrong Answer 2', 'Wrong Answer 3', 2),

('Product B on Platform B - Hard Question?',
'product_b'::public.product_type, 'platform_b'::public.platform_type, 'hard'::public.difficulty_level, ARRAY['advanced']::text[],
'Wrong Answer 1', 'Wrong Answer 2', 'Correct Answer', 'Wrong Answer 3', 3),

-- ########################################
-- ## Category: product_b + other platform
-- ########################################
('Product B on Other Platform - Easy Question?',
'product_b'::public.product_type, 'other'::public.platform_type, 'easy'::public.difficulty_level, ARRAY['basics']::text[],
'Correct Answer', 'Wrong Answer 1', 'Wrong Answer 2', 'Wrong Answer 3', 1),

('Product B on Other Platform - Medium Question?',
'product_b'::public.product_type, 'other'::public.platform_type, 'medium'::public.difficulty_level, ARRAY['intermediate']::text[],
'Wrong Answer 1', 'Correct Answer', 'Wrong Answer 2', 'Wrong Answer 3', 2),

('Product B on Other Platform - Hard Question?',
'product_b'::public.product_type, 'other'::public.platform_type, 'hard'::public.difficulty_level, ARRAY['advanced']::text[],
'Wrong Answer 1', 'Wrong Answer 2', 'Correct Answer', 'Wrong Answer 3', 3),

-- ########################################
-- ## Category: other product + platform_a
-- ########################################
('Other Product on Platform A - Easy Question?',
'other'::public.product_type, 'platform_a'::public.platform_type, 'easy'::public.difficulty_level, ARRAY['basics']::text[],
'Correct Answer', 'Wrong Answer 1', 'Wrong Answer 2', 'Wrong Answer 3', 1),

('Other Product on Platform A - Medium Question?',
'other'::public.product_type, 'platform_a'::public.platform_type, 'medium'::public.difficulty_level, ARRAY['intermediate']::text[],
'Wrong Answer 1', 'Correct Answer', 'Wrong Answer 2', 'Wrong Answer 3', 2),

('Other Product on Platform A - Hard Question?',
'other'::public.product_type, 'platform_a'::public.platform_type, 'hard'::public.difficulty_level, ARRAY['advanced']::text[],
'Wrong Answer 1', 'Wrong Answer 2', 'Correct Answer', 'Wrong Answer 3', 3),

-- ########################################
-- ## Category: other product + platform_b
-- ########################################
('Other Product on Platform B - Easy Question?',
'other'::public.product_type, 'platform_b'::public.platform_type, 'easy'::public.difficulty_level, ARRAY['basics']::text[],
'Correct Answer', 'Wrong Answer 1', 'Wrong Answer 2', 'Wrong Answer 3', 1),

('Other Product on Platform B - Medium Question?',
'other'::public.product_type, 'platform_b'::public.platform_type, 'medium'::public.difficulty_level, ARRAY['intermediate']::text[],
'Wrong Answer 1', 'Correct Answer', 'Wrong Answer 2', 'Wrong Answer 3', 2),

('Other Product on Platform B - Hard Question?',
'other'::public.product_type, 'platform_b'::public.platform_type, 'hard'::public.difficulty_level, ARRAY['advanced']::text[],
'Wrong Answer 1', 'Wrong Answer 2', 'Correct Answer', 'Wrong Answer 3', 3),

-- ########################################
-- ## Category: other product + other platform
-- ########################################
('Other Product on Other Platform - Easy Question?',
'other'::public.product_type, 'other'::public.platform_type, 'easy'::public.difficulty_level, ARRAY['basics']::text[],
'Correct Answer', 'Wrong Answer 1', 'Wrong Answer 2', 'Wrong Answer 3', 1),

('Other Product on Other Platform - Medium Question?',
'other'::public.product_type, 'other'::public.platform_type, 'medium'::public.difficulty_level, ARRAY['intermediate']::text[],
'Wrong Answer 1', 'Correct Answer', 'Wrong Answer 2', 'Wrong Answer 3', 2),

('Other Product on Other Platform - Hard Question?',
'other'::public.product_type, 'other'::public.platform_type, 'hard'::public.difficulty_level, ARRAY['advanced']::text[],
'Wrong Answer 1', 'Wrong Answer 2', 'Correct Answer', 'Wrong Answer 3', 3);

-- ############################################
-- ## Training Cases (one per category combo)
-- ############################################

INSERT INTO public.cases (title, problem_description, solution, ai_instructions, product_type, platform_type, difficulty, tags) VALUES
-- product_a + platform_a
('Product A Platform A: Easy Case',
'A basic issue with Product A on Platform A. The system shows a simple warning message.',
'Check the configuration and restart the service.',
'Guide the user through basic troubleshooting steps.',
'product_a'::public.product_type, 'platform_a'::public.platform_type, 'easy'::public.difficulty_level,
array['basics','configuration']::text[]),

('Product A Platform A: Medium Case',
'An intermediate issue with Product A on Platform A. Performance degradation noticed.',
'Analyze logs, identify bottleneck, apply optimization.',
'Help user understand performance metrics and optimization techniques.',
'product_a'::public.product_type, 'platform_a'::public.platform_type, 'medium'::public.difficulty_level,
array['performance','optimization']::text[]),

('Product A Platform A: Hard Case',
'A complex issue with Product A on Platform A. System crash with data corruption.',
'Perform data recovery, apply patches, implement failover.',
'Guide through advanced recovery procedures and root cause analysis.',
'product_a'::public.product_type, 'platform_a'::public.platform_type, 'hard'::public.difficulty_level,
array['recovery','advanced']::text[]),

-- product_a + platform_b
('Product A Platform B: Easy Case',
'A basic issue with Product A on Platform B.',
'Simple configuration adjustment needed.',
'Guide through basic setup.',
'product_a'::public.product_type, 'platform_b'::public.platform_type, 'easy'::public.difficulty_level,
array['basics']::text[]),

('Product A Platform B: Medium Case',
'An intermediate issue with Product A on Platform B.',
'Integration troubleshooting required.',
'Help with integration debugging.',
'product_a'::public.product_type, 'platform_b'::public.platform_type, 'medium'::public.difficulty_level,
array['integration']::text[]),

('Product A Platform B: Hard Case',
'A complex issue with Product A on Platform B.',
'Advanced debugging and patching required.',
'Guide through complex troubleshooting.',
'product_a'::public.product_type, 'platform_b'::public.platform_type, 'hard'::public.difficulty_level,
array['advanced']::text[]),

-- product_b + platform_a
('Product B Platform A: Easy Case',
'A basic issue with Product B on Platform A.',
'Simple restart resolves the issue.',
'Guide through restart procedure.',
'product_b'::public.product_type, 'platform_a'::public.platform_type, 'easy'::public.difficulty_level,
array['basics']::text[]),

('Product B Platform A: Medium Case',
'An intermediate issue with Product B on Platform A.',
'Configuration tuning needed.',
'Help optimize configuration.',
'product_b'::public.product_type, 'platform_a'::public.platform_type, 'medium'::public.difficulty_level,
array['configuration']::text[]),

('Product B Platform A: Hard Case',
'A complex issue with Product B on Platform A.',
'Deep system analysis required.',
'Guide through advanced analysis.',
'product_b'::public.product_type, 'platform_a'::public.platform_type, 'hard'::public.difficulty_level,
array['advanced']::text[]),

-- product_b + platform_b
('Product B Platform B: Easy Case',
'A basic issue with Product B on Platform B.',
'Update to latest version.',
'Guide through update process.',
'product_b'::public.product_type, 'platform_b'::public.platform_type, 'easy'::public.difficulty_level,
array['update']::text[]),

('Product B Platform B: Medium Case',
'An intermediate issue with Product B on Platform B.',
'Security configuration adjustment.',
'Help with security settings.',
'product_b'::public.product_type, 'platform_b'::public.platform_type, 'medium'::public.difficulty_level,
array['security']::text[]),

('Product B Platform B: Hard Case',
'A complex issue with Product B on Platform B.',
'Complete system overhaul needed.',
'Guide through major changes.',
'product_b'::public.product_type, 'platform_b'::public.platform_type, 'hard'::public.difficulty_level,
array['advanced']::text[]);
