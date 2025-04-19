-- Enable essential extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- For auth security
CREATE EXTENSION IF NOT EXISTS "postgis";  -- For location-based matching

-- 1. Users (Supabase Auth integration)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  interests TEXT[], -- Array for match scoring (e.g., ["hiking", "art"])
  location GEOGRAPHY(POINT), -- Lat/long for proximity
  date_preferences JSONB, -- e.g., {"venue_types": ["cafes", "parks"]}
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Venues (Partnered date locations)
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT,
  location GEOGRAPHY(POINT),
  venue_type TEXT, -- "restaurant", "park", "museum"
  partner_tier TEXT CHECK (partner_tier IN ('basic', 'premium', 'featured')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Matches (With fade logic)
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_a UUID REFERENCES users(id) ON DELETE CASCADE,
  user_b UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('active', 'fading', 'closed')) DEFAULT 'active',
  fade_progress FLOAT DEFAULT 0.0, -- 0.0 (new) → 1.0 (fully faded)
  last_interaction TIMESTAMPTZ, -- Used to auto-fade stale matches
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_pair UNIQUE (user_a, user_b) -- Prevent duplicates
);

-- 4. Dates (Scheduled meetups)
CREATE TABLE dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  venue_id UUID REFERENCES venues(id),
  proposed_by UUID REFERENCES users(id),
  status TEXT CHECK (status IN ('pending', 'confirmed', 'completed')),
  scheduled_for TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Messages (In-app chat)
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Feedback (Post-date reflections)
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date_id UUID REFERENCES dates(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  private_notes TEXT,
  shared_notes TEXT, -- Visible to match if both opt in
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. User constraints (Enforce 3-match cap)
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

CREATE TRIGGER enforce_match_cap
BEFORE INSERT ON matches
FOR EACH ROW EXECUTE FUNCTION check_match_cap();