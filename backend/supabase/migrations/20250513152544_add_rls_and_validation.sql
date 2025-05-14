-- Enable RLS on the users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own profile
CREATE POLICY "User can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "User can edit own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Add validation constraints to user profile fields
ALTER TABLE users
  ALTER COLUMN full_name TYPE VARCHAR(100),
  ADD CONSTRAINT bio_length CHECK (char_length(bio) <= 300);