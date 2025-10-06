-- Add advanced features columns to scooters table
ALTER TABLE public.scooters 
ADD COLUMN IF NOT EXISTS smart_display BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS gps_navigation BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS anti_theft_system BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS mobile_app_connectivity BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS led_lighting_system BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS regenerative_braking BOOLEAN DEFAULT FALSE;

-- Add technical specifications columns to scooters table
ALTER TABLE public.scooters 
ADD COLUMN IF NOT EXISTS power_output TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS torque TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS weight TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS connectivity_mobile_app TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS connectivity_gps_tracking TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS connectivity_bluetooth TEXT DEFAULT '';

-- Update existing records with default values
UPDATE public.scooters 
SET 
  smart_display = FALSE,
  gps_navigation = FALSE,
  anti_theft_system = FALSE,
  mobile_app_connectivity = FALSE,
  led_lighting_system = FALSE,
  regenerative_braking = FALSE,
  power_output = '',
  torque = '',
  weight = '',
  connectivity_mobile_app = '',
  connectivity_gps_tracking = '',
  connectivity_bluetooth = ''
WHERE 
  smart_display IS NULL OR 
  gps_navigation IS NULL OR 
  anti_theft_system IS NULL OR 
  mobile_app_connectivity IS NULL OR 
  led_lighting_system IS NULL OR 
  regenerative_braking IS NULL OR
  power_output IS NULL OR
  torque IS NULL OR
  weight IS NULL OR
  connectivity_mobile_app IS NULL OR
  connectivity_gps_tracking IS NULL OR
  connectivity_bluetooth IS NULL;
