-- Create access_keys table
CREATE TABLE IF NOT EXISTS access_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  key_value TEXT NOT NULL,
  key_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_revoked BOOLEAN DEFAULT FALSE,
  last_used_at TIMESTAMP WITH TIME ZONE
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS access_keys_user_id_idx ON access_keys(user_id);

-- Create index on expires_at for cleanup jobs
CREATE INDEX IF NOT EXISTS access_keys_expires_at_idx ON access_keys(expires_at);

-- Enable row level security
ALTER TABLE access_keys ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own keys" ON access_keys;
CREATE POLICY "Users can view their own keys"
  ON access_keys FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own keys" ON access_keys;
CREATE POLICY "Users can insert their own keys"
  ON access_keys FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own keys" ON access_keys;
CREATE POLICY "Users can update their own keys"
  ON access_keys FOR UPDATE
  USING (auth.uid() = user_id);

-- Enable realtime
alter publication supabase_realtime add table access_keys;