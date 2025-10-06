-- Add Advanced Features and Technical Specifications columns to scooters table
-- Run this in Supabase SQL Editor to enable full functionality

-- Add Advanced Features columns (Boolean)
ALTER TABLE public.scooters 
ADD COLUMN IF NOT EXISTS smart_display BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS gps_navigation BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS anti_theft_system BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS mobile_app_connectivity BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS led_lighting_system BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS regenerative_braking BOOLEAN DEFAULT FALSE;

-- Add Technical Specifications columns (Text)
ALTER TABLE public.scooters 
ADD COLUMN IF NOT EXISTS power_output TEXT,
ADD COLUMN IF NOT EXISTS torque TEXT,
ADD COLUMN IF NOT EXISTS weight TEXT,
ADD COLUMN IF NOT EXISTS connectivity_mobile_app TEXT,
ADD COLUMN IF NOT EXISTS connectivity_gps_tracking TEXT,
ADD COLUMN IF NOT EXISTS connectivity_bluetooth TEXT;

-- Update existing records with default values for boolean columns
UPDATE public.scooters SET 
  smart_display = FALSE,
  gps_navigation = FALSE,
  anti_theft_system = FALSE,
  mobile_app_connectivity = FALSE,
  led_lighting_system = FALSE,
  regenerative_braking = FALSE
WHERE smart_display IS NULL;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_scooters_smart_display ON public.scooters(smart_display);
CREATE INDEX IF NOT EXISTS idx_scooters_gps_navigation ON public.scooters(gps_navigation);
CREATE INDEX IF NOT EXISTS idx_scooters_anti_theft_system ON public.scooters(anti_theft_system);
CREATE INDEX IF NOT EXISTS idx_scooters_mobile_app_connectivity ON public.scooters(mobile_app_connectivity);
CREATE INDEX IF NOT EXISTS idx_scooters_led_lighting_system ON public.scooters(led_lighting_system);
CREATE INDEX IF NOT EXISTS idx_scooters_regenerative_braking ON public.scooters(regenerative_braking);

-- Verify the columns were added
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'scooters' 
AND table_schema = 'public'
AND column_name IN (
  'smart_display', 'gps_navigation', 'anti_theft_system', 
  'mobile_app_connectivity', 'led_lighting_system', 'regenerative_braking',
  'power_output', 'torque', 'weight', 
  'connectivity_mobile_app', 'connectivity_gps_tracking', 'connectivity_bluetooth'
)
ORDER BY column_name;
