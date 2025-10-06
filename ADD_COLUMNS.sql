-- Run this SQL in your Supabase SQL Editor to add the new columns

-- Add advanced features columns
ALTER TABLE public.scooters 
ADD COLUMN IF NOT EXISTS smart_display BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS gps_navigation BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS anti_theft_system BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS mobile_app_connectivity BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS led_lighting_system BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS regenerative_braking BOOLEAN DEFAULT FALSE;

-- Add technical specifications columns
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
  smart_display = COALESCE(smart_display, FALSE),
  gps_navigation = COALESCE(gps_navigation, FALSE),
  anti_theft_system = COALESCE(anti_theft_system, FALSE),
  mobile_app_connectivity = COALESCE(mobile_app_connectivity, FALSE),
  led_lighting_system = COALESCE(led_lighting_system, FALSE),
  regenerative_braking = COALESCE(regenerative_braking, FALSE),
  power_output = COALESCE(power_output, ''),
  torque = COALESCE(torque, ''),
  weight = COALESCE(weight, ''),
  connectivity_mobile_app = COALESCE(connectivity_mobile_app, ''),
  connectivity_gps_tracking = COALESCE(connectivity_gps_tracking, ''),
  connectivity_bluetooth = COALESCE(connectivity_bluetooth, '');
