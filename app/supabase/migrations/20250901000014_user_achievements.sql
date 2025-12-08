-- Create user achievements table
-- This table tracks which achievements each user has unlocked
CREATE TABLE
    user_achievements (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
        user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
        achievement_id UUID NOT NULL REFERENCES achievements (id) ON DELETE CASCADE,
        unlocked_at TIMESTAMP DEFAULT NOW (),
        xp_awarded BOOLEAN DEFAULT FALSE, -- Track if XP has been awarded for this achievement
        UNIQUE (user_id, achievement_id) -- Each user can only unlock each achievement once
    );

-- Create indexes for performance
CREATE INDEX idx_user_achievements_user_id ON user_achievements (user_id);

CREATE INDEX idx_user_achievements_achievement_id ON user_achievements (achievement_id);

-- Index for finding achievements where XP hasn't been awarded yet
CREATE INDEX idx_user_achievements_xp_awarded ON user_achievements (user_id, xp_awarded)
WHERE
    xp_awarded = FALSE;

-- Enable RLS (Row Level Security)
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- User achievements are only readable by the user
CREATE POLICY "Users can view their own achievements" ON user_achievements FOR
SELECT
    USING (auth.uid () = user_id);

-- Only system can insert achievements (via triggers)
CREATE POLICY "System can insert user achievements" ON user_achievements FOR INSERT
WITH
    CHECK (true);