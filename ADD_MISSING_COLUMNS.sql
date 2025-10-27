-- ================================
-- ADD MISSING COLUMNS TO EXISTING SCOOTERS TABLE
-- Run this in Supabase SQL Editor to fix the "Advanced features columns need to be added" issue
-- ================================

-- Add Image 3 URL column
ALTER TABLE public.scooters 
ADD COLUMN IF NOT EXISTS image_3_url TEXT;

-- Add Serial Numbers columns
ALTER TABLE public.scooters 
ADD COLUMN IF NOT EXISTS serial_number TEXT,
ADD COLUMN IF NOT EXISTS motor_number TEXT,
ADD COLUMN IF NOT EXISTS chassis_number TEXT;

-- Add Inventory & Warranty columns
ALTER TABLE public.scooters 
ADD COLUMN IF NOT EXISTS total_sold INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS units_in_stock INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS warranty_period_months INTEGER DEFAULT 12;

-- Add Advanced Features columns (Boolean)
ALTER TABLE public.scooters 
ADD COLUMN IF NOT EXISTS smart_display BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS gps_navigation BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS anti_theft_system BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS mobile_app_connectivity BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS led_lighting_system BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS regenerative_braking BOOLEAN DEFAULT false;

-- Add Technical Specifications columns (Text)
ALTER TABLE public.scooters 
ADD COLUMN IF NOT EXISTS motor_output TEXT,
ADD COLUMN IF NOT EXISTS battery TEXT,
ADD COLUMN IF NOT EXISTS weight TEXT,
ADD COLUMN IF NOT EXISTS connectivity_mobile_app TEXT,
ADD COLUMN IF NOT EXISTS connectivity_gps_tracking TEXT,
ADD COLUMN IF NOT EXISTS connectivity_bluetooth TEXT;

-- Add Legacy fields (for backward compatibility)
ALTER TABLE public.scooters 
ADD COLUMN IF NOT EXISTS power_output TEXT,
ADD COLUMN IF NOT EXISTS torque TEXT;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_scooters_smart_display ON public.scooters(smart_display);
CREATE INDEX IF NOT EXISTS idx_scooters_gps_navigation ON public.scooters(gps_navigation);
CREATE INDEX IF NOT EXISTS idx_scooters_anti_theft_system ON public.scooters(anti_theft_system);
CREATE INDEX IF NOT EXISTS idx_scooters_mobile_app_connectivity ON public.scooters(mobile_app_connectivity);
CREATE INDEX IF NOT EXISTS idx_scooters_led_lighting_system ON public.scooters(led_lighting_system);
CREATE INDEX IF NOT EXISTS idx_scooters_regenerative_braking ON public.scooters(regenerative_braking);
CREATE INDEX IF NOT EXISTS idx_scooters_total_sold ON public.scooters(total_sold);
CREATE INDEX IF NOT EXISTS idx_scooters_units_in_stock ON public.scooters(units_in_stock);
CREATE INDEX IF NOT EXISTS idx_scooters_serial_number ON public.scooters(serial_number);
CREATE INDEX IF NOT EXISTS idx_scooters_motor_number ON public.scooters(motor_number);
CREATE INDEX IF NOT EXISTS idx_scooters_chassis_number ON public.scooters(chassis_number);

-- Verify the columns were added successfully
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'scooters' 
AND table_schema = 'public'
AND column_name IN (
  'image_3_url',
  'serial_number', 'motor_number', 'chassis_number',
  'total_sold', 'units_in_stock', 'warranty_period_months',
  'smart_display', 'gps_navigation', 'anti_theft_system',
  'mobile_app_connectivity', 'led_lighting_system', 'regenerative_braking',
  'motor_output', 'battery', 'weight',
  'connectivity_mobile_app', 'connectivity_gps_tracking', 'connectivity_bluetooth',
  'power_output', 'torque'
)
ORDER BY column_name;

-- Display success message
DO $$
BEGIN
    RAISE NOTICE '✅ All missing columns have been added successfully!';
    RAISE NOTICE '📊 You can now use full CRUD operations without warnings.';
    RAISE NOTICE '🔄 Advanced features and technical specifications are now stored permanently.';
END $$;
