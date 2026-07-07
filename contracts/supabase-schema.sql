-- CampusPots Supabase Schema
-- The smart contract is the source of truth for balances.
-- Supabase stores metadata for rich UX.

-- Profiles table
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pots table
CREATE TABLE pots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chain_pot_id BIGINT UNIQUE NOT NULL,
  creator_address TEXT NOT NULL REFERENCES profiles(wallet_address),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  goal_amount NUMERIC NOT NULL,
  token_address TEXT NOT NULL,
  token_symbol TEXT DEFAULT 'USDC',
  deadline BIGINT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'withdrawn', 'cancelled')),
  metadata_uri TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pots_creator ON pots(creator_address);
CREATE INDEX idx_pots_status ON pots(status);

-- Contributions table
CREATE TABLE contributions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pot_id UUID NOT NULL REFERENCES pots(id) ON DELETE CASCADE,
  chain_pot_id BIGINT NOT NULL,
  contributor_address TEXT NOT NULL,
  display_name TEXT,
  amount NUMERIC NOT NULL,
  token_symbol TEXT DEFAULT 'USDC',
  message TEXT,
  tx_hash TEXT,
  source_chain TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contributions_pot ON contributions(pot_id);
CREATE INDEX idx_contributions_contributor ON contributions(contributor_address);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pots ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Profiles are publicly readable" ON profiles FOR SELECT USING (true);
CREATE POLICY "Pots are publicly readable" ON pots FOR SELECT USING (true);
CREATE POLICY "Contributions are publicly readable" ON contributions FOR SELECT USING (true);

-- Authenticated write policies
CREATE POLICY "Users can upsert their own profile" ON profiles
  FOR INSERT WITH CHECK (wallet_address = auth.jwt() ->> 'wallet_address');

CREATE POLICY "Users can create pots" ON pots
  FOR INSERT WITH CHECK (creator_address = auth.jwt() ->> 'wallet_address');

CREATE POLICY "Anyone can record a contribution" ON contributions
  FOR INSERT WITH CHECK (true);
