-- ================================
-- COMPLETE DATABASE SETUP FOR SCOOTERS
-- Run this in Supabase SQL Editor
-- ================================

-- Create scooters table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.scooters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Basic Information
    name TEXT NOT NULL,
    description TEXT,
    price TEXT NOT NULL,
    max_speed TEXT NOT NULL,
    max_range TEXT NOT NULL,
    charge_time TEXT NOT NULL,
    
    -- Images
    image_1_url TEXT,
    image_2_url TEXT,
    image_3_url TEXT,
    thumbnail_url TEXT,
    
    -- Display Settings
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    
    -- Serial Numbers
    serial_number TEXT,
    motor_number TEXT,
    chassis_number TEXT,
    
    -- Inventory & Warranty
    total_sold INTEGER DEFAULT 0,
    units_in_stock INTEGER DEFAULT 0,
    warranty_period_months INTEGER DEFAULT 12,
    
    -- Advanced Features (Boolean)
    smart_display BOOLEAN DEFAULT false,
    gps_navigation BOOLEAN DEFAULT false,
    anti_theft_system BOOLEAN DEFAULT false,
    mobile_app_connectivity BOOLEAN DEFAULT false,
    led_lighting_system BOOLEAN DEFAULT false,
    regenerative_braking BOOLEAN DEFAULT false,
    
    -- Technical Specifications (Text)
    motor_output TEXT,
    battery TEXT,
    weight TEXT,
    connectivity_mobile_app TEXT,
    connectivity_gps_tracking TEXT,
    connectivity_bluetooth TEXT,
    
    -- Legacy fields (for backward compatibility)
    power_output TEXT,
    torque TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.scooters ENABLE ROW LEVEL SECURITY;

-- Enable real-time updates
ALTER TABLE public.scooters REPLICA IDENTITY FULL;

-- Add scooters table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.scooters;

-- ================================
-- RLS POLICIES FOR SCOOTERS
-- ================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view active scooters" ON public.scooters;
DROP POLICY IF EXISTS "Authenticated users can view all scooters" ON public.scooters;
DROP POLICY IF EXISTS "Admins can insert scooters" ON public.scooters;
DROP POLICY IF EXISTS "Admins can update scooters" ON public.scooters;
DROP POLICY IF EXISTS "Admins can delete scooters" ON public.scooters;

-- Policy: Anyone can view active scooters (public read)
CREATE POLICY "Anyone can view active scooters"
ON public.scooters
FOR SELECT
USING (is_active = true);

-- Policy: Authenticated users can view all scooters
CREATE POLICY "Authenticated users can view all scooters"
ON public.scooters
FOR SELECT
TO authenticated
USING (true);

-- Policy: Authenticated users can insert scooters
CREATE POLICY "Authenticated users can insert scooters"
ON public.scooters
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy: Authenticated users can update scooters
CREATE POLICY "Authenticated users can update scooters"
ON public.scooters
FOR UPDATE
TO authenticated
USING (true);

-- Policy: Authenticated users can delete scooters
CREATE POLICY "Authenticated users can delete scooters"
ON public.scooters
FOR DELETE
TO authenticated
USING (true);

-- ================================
-- INDEXES FOR PERFORMANCE
-- ================================

CREATE INDEX IF NOT EXISTS idx_scooters_is_active ON public.scooters(is_active);
CREATE INDEX IF NOT EXISTS idx_scooters_is_featured ON public.scooters(is_featured);
CREATE INDEX IF NOT EXISTS idx_scooters_display_order ON public.scooters(display_order);
CREATE INDEX IF NOT EXISTS idx_scooters_created_at ON public.scooters(created_at DESC);

-- Indexes for advanced features
CREATE INDEX IF NOT EXISTS idx_scooters_smart_display ON public.scooters(smart_display);
CREATE INDEX IF NOT EXISTS idx_scooters_gps_navigation ON public.scooters(gps_navigation);
CREATE INDEX IF NOT EXISTS idx_scooters_anti_theft_system ON public.scooters(anti_theft_system);
CREATE INDEX IF NOT EXISTS idx_scooters_mobile_app_connectivity ON public.scooters(mobile_app_connectivity);
CREATE INDEX IF NOT EXISTS idx_scooters_led_lighting_system ON public.scooters(led_lighting_system);
CREATE INDEX IF NOT EXISTS idx_scooters_regenerative_braking ON public.scooters(regenerative_braking);

-- Indexes for inventory
CREATE INDEX IF NOT EXISTS idx_scooters_total_sold ON public.scooters(total_sold);
CREATE INDEX IF NOT EXISTS idx_scooters_units_in_stock ON public.scooters(units_in_stock);

-- Indexes for serial numbers
CREATE INDEX IF NOT EXISTS idx_scooters_serial_number ON public.scooters(serial_number);
CREATE INDEX IF NOT EXISTS idx_scooters_motor_number ON public.scooters(motor_number);
CREATE INDEX IF NOT EXISTS idx_scooters_chassis_number ON public.scooters(chassis_number);

-- ================================
-- TRIGGER FOR UPDATED_AT
-- ================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON public.scooters;
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.scooters
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ================================
-- VERIFY COLUMNS
-- ================================

-- Check all columns exist
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'scooters' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Display success message
DO $$
BEGIN
    RAISE NOTICE '✅ Database setup complete! All columns have been created successfully.';
    RAISE NOTICE '📊 You can now use full CRUD operations in the Admin Dashboard.';
    RAISE NOTICE '🔄 Real-time updates are enabled for automatic synchronization.';
END $$;
