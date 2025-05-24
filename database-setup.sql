
-- Enable RLS
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  full_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  address JSONB,
  notification_preferences JSONB DEFAULT '{}'::jsonb
);

-- Create credit_applications table
CREATE TABLE IF NOT EXISTS credit_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  personal_info JSONB NOT NULL,
  financial_details JSONB NOT NULL,
  loan_info JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'declined', 'review', 'completed')),
  score INTEGER,
  recommendations JSONB
);

-- Create credit_scores table
CREATE TABLE IF NOT EXISTS credit_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 300 AND score <= 850),
  factors JSONB,
  report_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_scores ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for credit_applications
CREATE POLICY "Users can view own applications" ON credit_applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own applications" ON credit_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own applications" ON credit_applications
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for credit_scores
CREATE POLICY "Users can view own scores" ON credit_scores
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scores" ON credit_scores
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_credit_applications_user_id ON credit_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_applications_created_at ON credit_applications(created_at);
CREATE INDEX IF NOT EXISTS idx_credit_scores_user_id ON credit_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_scores_report_date ON credit_scores(report_date);

-- Create a view for user credit history
CREATE OR REPLACE VIEW user_credit_history AS
SELECT 
  cs.user_id,
  COUNT(ca.id) as application_count,
  MAX(cs.score) as latest_score,
  json_agg(
    json_build_object(
      'date', cs.report_date,
      'score', cs.score
    ) ORDER BY cs.report_date
  ) as score_trend
FROM credit_scores cs
LEFT JOIN credit_applications ca ON ca.user_id = cs.user_id
GROUP BY cs.user_id;
