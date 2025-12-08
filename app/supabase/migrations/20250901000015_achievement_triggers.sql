-- Create achievement triggers
-- These triggers automatically unlock achievements when users reach certain milestones

-- Achievement trigger function
CREATE OR REPLACE FUNCTION check_achievements()
RETURNS TRIGGER AS $$
BEGIN
  -- This function only runs on UPDATE operations
  -- Chat achievements
  IF TG_TABLE_NAME = 'chat_stats' THEN
    
    -- First Chat (chat count > 0)
    IF NEW.total_chats_completed > 0 THEN
      INSERT INTO user_achievements (user_id, achievement_id)
      SELECT NEW.user_id, a.id
      FROM achievements a
      WHERE a.title = 'First Chat'
        AND NOT EXISTS (
          SELECT 1 FROM user_achievements ua 
          WHERE ua.user_id = NEW.user_id AND ua.achievement_id = a.id
        );
    END IF;
    
    -- Chat Rookie (5+ chats)
    IF NEW.total_chats_completed >= 5 THEN
      INSERT INTO user_achievements (user_id, achievement_id)
      SELECT NEW.user_id, a.id
      FROM achievements a
      WHERE a.title = 'Chat Rookie'
        AND NOT EXISTS (
          SELECT 1 FROM user_achievements ua 
          WHERE ua.user_id = NEW.user_id AND ua.achievement_id = a.id
        );
    END IF;
    
    -- Chat Expert (25+ chats)
    IF NEW.total_chats_completed >= 25 THEN
      INSERT INTO user_achievements (user_id, achievement_id)
      SELECT NEW.user_id, a.id
      FROM achievements a
      WHERE a.title = 'Chat Expert'
        AND NOT EXISTS (
          SELECT 1 FROM user_achievements ua 
          WHERE ua.user_id = NEW.user_id AND ua.achievement_id = a.id
        );
    END IF;
    
    -- Perfect Conversation (average score >= 10)
    IF NEW.average_ai_score >= 10 THEN
      INSERT INTO user_achievements (user_id, achievement_id)
      SELECT NEW.user_id, a.id
      FROM achievements a
      WHERE a.title = 'Perfect Conversation'
        AND NOT EXISTS (
          SELECT 1 FROM user_achievements ua 
          WHERE ua.user_id = NEW.user_id AND ua.achievement_id = a.id
        );
    END IF;
    
    -- Quick Responder (average messages <= 4)
    IF NEW.average_messages_per_chat <= 4 AND NEW.total_chats_completed > 0 THEN
      INSERT INTO user_achievements (user_id, achievement_id)
      SELECT NEW.user_id, a.id
      FROM achievements a
      WHERE a.title = 'Quick Responder'
        AND NOT EXISTS (
          SELECT 1 FROM user_achievements ua 
          WHERE ua.user_id = NEW.user_id AND ua.achievement_id = a.id
        );
    END IF;
    
    -- Training Beginner (general achievement for chat_stats)
    IF NEW.total_chats_completed > 0 THEN
      INSERT INTO user_achievements (user_id, achievement_id)
      SELECT NEW.user_id, a.id
      FROM achievements a
      WHERE a.title = 'Training Beginner'
        AND NOT EXISTS (
          SELECT 1 FROM user_achievements ua 
          WHERE ua.user_id = NEW.user_id AND ua.achievement_id = a.id
        );
    END IF;
    
  END IF;
  
  -- Case achievements
  IF TG_TABLE_NAME = 'case_stats' THEN
    
    -- Problem Solver (first case)
    IF NEW.total_cases_completed > 0 THEN
      INSERT INTO user_achievements (user_id, achievement_id)
      SELECT NEW.user_id, a.id
      FROM achievements a
      WHERE a.title = 'Problem Solver'
        AND NOT EXISTS (
          SELECT 1 FROM user_achievements ua 
          WHERE ua.user_id = NEW.user_id AND ua.achievement_id = a.id
        );
    END IF;
    
    -- Case Investigator (10+ cases)
    IF NEW.total_cases_completed >= 10 THEN
      INSERT INTO user_achievements (user_id, achievement_id)
      SELECT NEW.user_id, a.id
      FROM achievements a
      WHERE a.title = 'Case Investigator'
        AND NOT EXISTS (
          SELECT 1 FROM user_achievements ua 
          WHERE ua.user_id = NEW.user_id AND ua.achievement_id = a.id
        );
    END IF;
    
    -- Solution Master (50+ cases)
    IF NEW.total_cases_completed >= 50 THEN
      INSERT INTO user_achievements (user_id, achievement_id)
      SELECT NEW.user_id, a.id
      FROM achievements a
      WHERE a.title = 'Solution Master'
        AND NOT EXISTS (
          SELECT 1 FROM user_achievements ua 
          WHERE ua.user_id = NEW.user_id AND ua.achievement_id = a.id
        );
    END IF;
    
    -- Perfect Analysis (perfect score)
    IF NEW.average_ai_score >= 10 THEN
      INSERT INTO user_achievements (user_id, achievement_id)
      SELECT NEW.user_id, a.id
      FROM achievements a
      WHERE a.title = 'Perfect Analysis'
        AND NOT EXISTS (
          SELECT 1 FROM user_achievements ua 
          WHERE ua.user_id = NEW.user_id AND ua.achievement_id = a.id
        );
    END IF;
    
    -- Training Beginner (general achievement for case_stats)
    IF NEW.total_cases_completed > 0 THEN
      INSERT INTO user_achievements (user_id, achievement_id)
      SELECT NEW.user_id, a.id
      FROM achievements a
      WHERE a.title = 'Training Beginner'
        AND NOT EXISTS (
          SELECT 1 FROM user_achievements ua 
          WHERE ua.user_id = NEW.user_id AND ua.achievement_id = a.id
        );
    END IF;
    
  END IF;
  
  -- Multiple Choice achievements
  IF TG_TABLE_NAME = 'mc_stats' THEN
    
    -- Quiz Starter (first quiz)
    IF NEW.total_quizzes_completed > 0 THEN
      INSERT INTO user_achievements (user_id, achievement_id)
      SELECT NEW.user_id, a.id
      FROM achievements a
      WHERE a.title = 'Quiz Starter'
        AND NOT EXISTS (
          SELECT 1 FROM user_achievements ua 
          WHERE ua.user_id = NEW.user_id AND ua.achievement_id = a.id
        );
    END IF;
    
    -- Knowledge Seeker (20+ quizzes)
    IF NEW.total_quizzes_completed >= 20 THEN
      INSERT INTO user_achievements (user_id, achievement_id)
      SELECT NEW.user_id, a.id
      FROM achievements a
      WHERE a.title = 'Knowledge Seeker'
        AND NOT EXISTS (
          SELECT 1 FROM user_achievements ua 
          WHERE ua.user_id = NEW.user_id AND ua.achievement_id = a.id
        );
    END IF;
    
    -- Quiz Master (100+ quizzes)
    IF NEW.total_quizzes_completed >= 100 THEN
      INSERT INTO user_achievements (user_id, achievement_id)
      SELECT NEW.user_id, a.id
      FROM achievements a
      WHERE a.title = 'Quiz Master'
        AND NOT EXISTS (
          SELECT 1 FROM user_achievements ua 
          WHERE ua.user_id = NEW.user_id AND ua.achievement_id = a.id
        );
    END IF;
    
    -- Training Beginner (general achievement for mc_stats)
    IF NEW.total_quizzes_completed > 0 THEN
      INSERT INTO user_achievements (user_id, achievement_id)
      SELECT NEW.user_id, a.id
      FROM achievements a
      WHERE a.title = 'Training Beginner'
        AND NOT EXISTS (
          SELECT 1 FROM user_achievements ua 
          WHERE ua.user_id = NEW.user_id AND ua.achievement_id = a.id
        );
    END IF;
    
  END IF;
  
  -- General achievements - Training Beginner moved to specific table sections to avoid field conflicts

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers on all stats tables (only on UPDATE to avoid conflicts with initial user setup)
CREATE TRIGGER achievement_trigger_chat
    AFTER UPDATE ON chat_stats
    FOR EACH ROW
    EXECUTE FUNCTION check_achievements();

CREATE TRIGGER achievement_trigger_case
    AFTER UPDATE ON case_stats
    FOR EACH ROW
    EXECUTE FUNCTION check_achievements();

CREATE TRIGGER achievement_trigger_mc
    AFTER UPDATE ON mc_stats
    FOR EACH ROW
    EXECUTE FUNCTION check_achievements();