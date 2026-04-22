-- Tracks sent newsletter issues for idempotency and history
CREATE TABLE IF NOT EXISTS newsletter_issues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  html_body TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  sent_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  recipient_count INTEGER DEFAULT 0 NOT NULL
);

-- Fast recent-issue lookup (used by idempotency check in /api/newsletter/send)
CREATE INDEX IF NOT EXISTS idx_newsletter_issues_sent_at ON newsletter_issues (sent_at DESC);

-- Row Level Security — only service role key can access
ALTER TABLE newsletter_issues ENABLE ROW LEVEL SECURITY;
