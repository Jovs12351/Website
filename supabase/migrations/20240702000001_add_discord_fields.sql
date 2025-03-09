-- Add Discord verification fields to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS discord_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS discord_username TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS discord_id TEXT;

-- Add Discord verification field to access_keys table
ALTER TABLE access_keys ADD COLUMN IF NOT EXISTS discord_verified BOOLEAN DEFAULT FALSE;

-- Enable realtime for these changes
alter publication supabase_realtime add table users;
