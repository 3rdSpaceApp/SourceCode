

-- Add date_of_birth to users table for future age filtering 
-- Add date_of_birth to users table for future age filtering 
ALTER TABLE users
    ADD COLUMN IF NOT EXISTS date_of_birth DATE,
    ADD CONSTRAINT user_must_be_18 CHECK (date_of_birth IS NULL OR date_of_birth <= CURRENT_DATE - INTERVAL '18 years');
-- Function to filter matches by location and shared interests 
CREATE OR REPLACE FUNCTION filter_potential_matches(user_id UUID, radius_meters INTEGER DEFAULT 5000 )
RETURNS TABLE (
    match_id UUID,
    full_name TEXT,
    username TEXT,
    bio Text,
    avatar_url TEXT,
    interests TEXT[],
    location GEOGRAPHY(POINT),
    fade_progress FLOAT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.id,
        u.full_name,
        u.username, 
        u.bio, 
        u.avatar_url,
        u.interests,
        u.location,
        COALESCE(m.fade_progress, 0.0)
    FROM users u
    LEFT JOIN matches m ON (m.user_b = u.id OR m.user_a = u.id)
    WHERE u.id != user_id
        AND ST_DWithin(u.location, (SELECT location FROM users WHERE id = user_id), radius_meters)
        AND u.interests && (SELECT interests FROM users WHERE id = user_id);
END;
$$ LANGUAGE plpgsql;



-- Update fade_progress based on feedback score comparison and last interaction
CREATE OR REPLACE FUNCTION update_fade_progress()
RETURNS VOID AS $$
BEGIN
  WITH feedback_scores AS (
    SELECT
      m.id AS match_id,
      m.user_a,
      m.user_b,
      AVG(f.rating) AS avg_rating,
      GREATEST(EXTRACT(EPOCH FROM (NOW() - COALESCE(m.last_interaction, m.created_at))), 0) AS seconds_since_last
    FROM matches m
    LEFT JOIN dates d ON d.match_id = m.id
    LEFT JOIN feedback f ON f.date_id = d.id
    WHERE m.status = 'active'
    GROUP BY m.id, m.user_a, m.user_b
  ),
  ranked_feedback AS (
    SELECT
      *,
      RANK() OVER (PARTITION BY user_a ORDER BY avg_rating DESC) AS rank_a,
      RANK() OVER (PARTITION BY user_b ORDER BY avg_rating DESC) AS rank_b
    FROM feedback_scores
  )
  UPDATE matches
  SET fade_progress = LEAST(1.0,
    CASE
      WHEN rf.rank_a = 1 OR rf.rank_b = 1 THEN 0.0 -- top match doesn't fade
      ELSE GREATEST(0.0, rf.seconds_since_last / (3 * 24 * 60 * 60)) * (5.0 - rf.avg_rating) / 5.0 -- fade over 3 days, more if score is low
    END
  )
  FROM ranked_feedback rf
  WHERE matches.id = rf.match_id;
END;
$$ LANGUAGE plpgsql;


-- Enable pg_cron extension if available
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule the update_fade_progress function to run daily at 3 AM
SELECT cron.schedule(
  'daily_fade_update',
  '0 3 * * *',
  $$SELECT update_fade_progress();$$
);