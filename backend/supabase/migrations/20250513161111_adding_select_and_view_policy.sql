-- Allow authenticated users to select from users
CREATE POLICY "Authenticated can view users"
  ON users FOR SELECT
  TO authenticated
  USING (true);

-- Same for matches if necessary
CREATE POLICY "Authenticated can view matches"
  ON matches FOR SELECT
  TO authenticated
  USING (true);