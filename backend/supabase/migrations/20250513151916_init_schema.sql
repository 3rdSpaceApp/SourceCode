-- 1. Enable essential extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 2. Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  interests TEXT[],
  location GEOGRAPHY(POINT),
  date_preferences JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Matches table
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_a UUID REFERENCES users(id) ON DELETE CASCADE,
  user_b UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('active', 'fading', 'closed')) DEFAULT 'active',
  fade_progress FLOAT DEFAULT 0.0,
  last_interaction TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_pair UNIQUE (user_a, user_b)
);

-- 4. Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Dates table
CREATE TABLE IF NOT EXISTS dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  venue_id UUID,
  proposed_by UUID REFERENCES users(id),
  status TEXT CHECK (status IN ('pending', 'confirmed', 'completed')),
  scheduled_for TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date_id UUID REFERENCES dates(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  private_notes TEXT,
  shared_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Optional: Match cap logic
CREATE OR REPLACE FUNCTION check_match_cap()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM matches 
      WHERE (user_a = NEW.user_a OR user_b = NEW.user_a) 
      AND status = 'active') >= 3 THEN
    RAISE EXCEPTION 'User already has 3 active matches';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER enforce_match_cap
BEFORE INSERT ON matches
FOR EACH ROW EXECUTE FUNCTION check_match_cap();