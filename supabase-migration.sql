-- Vera audit requests table
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS audit_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  website TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'archived'))
);

-- Enable RLS
ALTER TABLE audit_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the form)
CREATE POLICY "Allow anonymous inserts" ON audit_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can read (for admin dashboard later)
CREATE POLICY "Authenticated users can read" ON audit_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_audit_requests_created_at ON audit_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_requests_status ON audit_requests(status);
