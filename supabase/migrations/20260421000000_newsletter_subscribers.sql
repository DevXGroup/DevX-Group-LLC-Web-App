-- Newsletter subscribers table with double opt-in
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  confirmed BOOLEAN DEFAULT FALSE NOT NULL,
  confirmation_token UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  confirmed_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,
  ip_address TEXT,
  source TEXT DEFAULT 'website' NOT NULL
);

-- Fast token lookups (used on every confirmation/unsubscribe click)
CREATE INDEX IF NOT EXISTS idx_newsletter_token ON newsletter_subscribers (confirmation_token);

-- Rate limiting: count recent signups per IP
CREATE INDEX IF NOT EXISTS idx_newsletter_ip_time ON newsletter_subscribers (ip_address, subscribed_at);

-- Row Level Security — only service role key can access this table
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- No public policies: all access goes through the server-side service role
