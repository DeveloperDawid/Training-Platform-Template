/*
 * -------------------------------------------------------
 * Section: Achievements System
 * Master table for all available achievements
 * -------------------------------------------------------
 */

-- Create achievements master table
create table public.achievements (
  id uuid default gen_random_uuid() primary key,
  title varchar(100) not null,
  description text not null,
  icon varchar(50) default 'Trophy',
  color varchar(50) default 'bg-gray-100',
  category varchar(30) not null,
  xp_reward integer default 10,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert basic achievements
insert into public.achievements (title, description, icon, color, category, xp_reward)
values
  -- Chat achievements
  (
    'First Chat',
    'Complete your first chat training session',
    'MessageCircle',
    'bg-blue-100',
    'chat',
    10
  ),
  (
    'Chat Rookie',
    'Complete 5 chat sessions',
    'MessageSquare',
    'bg-blue-200',
    'chat',
    25
  ),
  (
    'Chat Expert',
    'Complete 25 chat sessions',
    'Crown',
    'bg-blue-300',
    'chat',
    100
  ),
  (
    'Perfect Conversation',
    'Get a perfect 10/10 AI score in chat',
    'Star',
    'bg-yellow-200',
    'chat',
    50
  ),
  (
    'Quick Responder',
    'Complete a chat with less than 5 messages',
    'Zap',
    'bg-purple-200',
    'chat',
    30
  ),
  -- Case achievements  
  (
    'Problem Solver',
    'Solve your first case',
    'CheckCircle',
    'bg-green-100',
    'case',
    10
  ),
  (
    'Case Investigator',
    'Solve 10 cases',
    'Search',
    'bg-green-200',
    'case',
    50
  ),
  (
    'Solution Master',
    'Solve 50 cases',
    'Trophy',
    'bg-green-300',
    'case',
    200
  ),
  (
    'Perfect Analysis',
    'Get a perfect score on a case evaluation',
    'Target',
    'bg-yellow-200',
    'case',
    50
  ),
  -- Multiple Choice achievements
  (
    'Quiz Starter',
    'Complete your first multiple choice quiz',
    'BookOpen',
    'bg-purple-100',
    'mc',
    10
  ),
  (
    'Knowledge Seeker',
    'Complete 20 multiple choice quizzes',
    'Brain',
    'bg-purple-200',
    'mc',
    75
  ),
  (
    'Quiz Master',
    'Complete 100 multiple choice quizzes',
    'GraduationCap',
    'bg-purple-300',
    'mc',
    300
  ),
  -- General achievements
  (
    'Training Beginner',
    'Complete any training for the first time',
    'Play',
    'bg-orange-100',
    'general',
    5
  ),
  (
    'Dedicated Learner',
    'Train for 3 consecutive days',
    'Calendar',
    'bg-orange-200',
    'general',
    100
  );

-- Update achievement descriptions to mention XP rewards
UPDATE public.achievements
SET description = description || ' (+' || xp_reward || ' XP)'
WHERE description NOT LIKE '%XP)';

-- Indexes
create index idx_achievements_category on public.achievements(category);
create index idx_achievements_title on public.achievements(title);

-- RLS
alter table public.achievements enable row level security;

-- Policies
create policy "Achievements are publicly readable" 
  on public.achievements for select
  using (true);