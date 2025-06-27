
-- Create wearable_data table for health metrics (this wasn't created due to the error)
CREATE TABLE IF NOT EXISTS public.wearable_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  device_name TEXT,
  device_type TEXT CHECK (device_type IN ('smartwatch', 'fitness_tracker', 'heart_monitor', 'other')),
  hrv_value NUMERIC,
  skin_temperature NUMERIC,
  heart_rate INTEGER,
  stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 10),
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on wearable_data
ALTER TABLE public.wearable_data ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for wearable_data
CREATE POLICY "Users can view their own wearable data" 
  ON public.wearable_data 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own wearable data" 
  ON public.wearable_data 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create user_preferences table for mood-based recommendations
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  preferred_scents TEXT[],
  preferred_sounds TEXT[],
  mood_preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on user_preferences
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_preferences
CREATE POLICY "Users can view their own preferences" 
  ON public.user_preferences 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences" 
  ON public.user_preferences 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences" 
  ON public.user_preferences 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Enable RLS on journal_entries if not already enabled
DO $$ 
BEGIN
  ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- Create missing RLS policies for journal_entries
DO $$ 
BEGIN
  CREATE POLICY "Users can view their own journal entries" 
    ON public.journal_entries 
    FOR SELECT 
    USING (auth.uid() = user_id);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ 
BEGIN
  CREATE POLICY "Users can create their own journal entries" 
    ON public.journal_entries 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ 
BEGIN
  CREATE POLICY "Users can update their own journal entries" 
    ON public.journal_entries 
    FOR UPDATE 
    USING (auth.uid() = user_id);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ 
BEGIN
  CREATE POLICY "Users can delete their own journal entries" 
    ON public.journal_entries 
    FOR DELETE 
    USING (auth.uid() = user_id);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
