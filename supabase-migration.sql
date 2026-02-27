-- Vera audit requests table
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS audit_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  website TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed', 'archived'))
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

-- ============================================
-- Audit Results Table
-- ============================================

CREATE TABLE IF NOT EXISTS audit_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID REFERENCES audit_requests(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  
  -- Summary counts
  critical_count INTEGER DEFAULT 0,
  warning_count INTEGER DEFAULT 0,
  info_count INTEGER DEFAULT 0,
  
  -- Performance metrics
  load_time_ms INTEGER,
  page_size_kb INTEGER,
  
  -- Check results (stored as JSONB for flexibility)
  seo_results JSONB,
  security_results JSONB,
  mobile_results JSONB,
  performance_results JSONB,
  
  -- Full issues list
  issues JSONB,
  
  -- Report
  report_markdown TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE audit_results ENABLE ROW LEVEL SECURITY;

-- Allow service role to insert (for the audit bot)
CREATE POLICY "Service role can insert" ON audit_results
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow anon to insert (for direct API calls)
CREATE POLICY "Allow anon inserts" ON audit_results
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Authenticated users can read
CREATE POLICY "Authenticated users can read results" ON audit_results
  FOR SELECT
  TO authenticated
  USING (true);

-- Index
CREATE INDEX IF NOT EXISTS idx_audit_results_request_id ON audit_results(request_id);
CREATE INDEX IF NOT EXISTS idx_audit_results_score ON audit_results(score);
