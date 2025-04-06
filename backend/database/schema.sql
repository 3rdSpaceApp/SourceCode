-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    username TEXT UNIQUE,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT now()
);

-- Matches table
CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_one UUID REFERENCES users(id),
    user_two UUID REFERENCES users(id),
    match_status TEXT CHECK (match_status IN ('active', 'faded', 'closed')) DEFAULT 'active',
    date_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT now()
);

-- Messages table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID REFERENCES matches(id),
    sender_id UUID REFERENCES users(id),
    message_text TEXT,
    sent_at TIMESTAMP DEFAULT now()
);

-- Post-Date Feedback
CREATE TABLE date_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID REFERENCES matches(id),
    submitted_by UUID REFERENCES users(id),
    reflection TEXT,
    submitted_at TIMESTAMP DEFAULT now()
);
