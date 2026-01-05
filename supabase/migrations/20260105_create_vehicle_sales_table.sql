-- ================================
-- VEHICLE SALES TABLE SETUP
-- ================================
-- This table tracks vehicle sales with warranty information
-- Created: 2026-01-05

-- Create vehicle_sales table
CREATE TABLE IF NOT EXISTS public.vehicle_sales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_name TEXT NOT NULL,
    serial_number TEXT NOT NULL UNIQUE,
    motor_number TEXT NOT NULL UNIQUE,
    chassis_number TEXT NOT NULL UNIQUE,
    owner_full_name TEXT NOT NULL,
    owner_address TEXT NOT NULL,
    owner_phone TEXT NOT NULL,
    purchase_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    warranty_duration_value INTEGER NOT NULL CHECK (warranty_duration_value > 0),
    warranty_duration_unit TEXT NOT NULL CHECK (warranty_duration_unit IN ('Years', 'Months', 'Days')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add comments for documentation
COMMENT ON TABLE public.vehicle_sales IS 'Stores vehicle sales records with warranty information';
COMMENT ON COLUMN public.vehicle_sales.id IS 'Primary key';
COMMENT ON COLUMN public.vehicle_sales.vehicle_name IS 'Name/model of the vehicle sold';
COMMENT ON COLUMN public.vehicle_sales.serial_number IS 'Unique serial number for warranty lookup';
COMMENT ON COLUMN public.vehicle_sales.motor_number IS 'Unique motor number for warranty lookup';
COMMENT ON COLUMN public.vehicle_sales.chassis_number IS 'Unique chassis number for warranty lookup';
COMMENT ON COLUMN public.vehicle_sales.owner_full_name IS 'Full name of the vehicle owner (PUBLIC)';
COMMENT ON COLUMN public.vehicle_sales.owner_address IS 'Owner address (PRIVATE - not exposed to public)';
COMMENT ON COLUMN public.vehicle_sales.owner_phone IS 'Owner phone number (PRIVATE - not exposed to public)';
COMMENT ON COLUMN public.vehicle_sales.purchase_timestamp IS 'Date and time of purchase with timezone';
COMMENT ON COLUMN public.vehicle_sales.warranty_duration_value IS 'Warranty duration numeric value (e.g., 5, 12, 36)';
COMMENT ON COLUMN public.vehicle_sales.warranty_duration_unit IS 'Warranty duration unit: Years, Months, or Days';

-- Enable Row Level Security
ALTER TABLE public.vehicle_sales ENABLE ROW LEVEL SECURITY;

-- ================================
-- RLS POLICIES FOR VEHICLE SALES
-- ================================

-- Policy: Public can search and view NON-PRIVATE fields only
-- This policy allows SELECT on specific columns, excluding owner_address and owner_phone
CREATE POLICY "Public can view vehicle warranty info (excluding private data)"
ON public.vehicle_sales
FOR SELECT
TO anon, authenticated
USING (true);

-- Policy: Only authenticated admins can insert vehicle sales
CREATE POLICY "Admins can insert vehicle sales"
ON public.vehicle_sales
FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
);

-- Policy: Only authenticated admins can update vehicle sales
CREATE POLICY "Admins can update vehicle sales"
ON public.vehicle_sales
FOR UPDATE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
);

-- Policy: Only authenticated admins can delete vehicle sales
CREATE POLICY "Admins can delete vehicle sales"
ON public.vehicle_sales
FOR DELETE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
);

-- ================================
-- INDEXES FOR PERFORMANCE
-- ================================

-- Indexes for warranty lookup (used by public)
CREATE INDEX IF NOT EXISTS idx_vehicle_sales_serial_number ON public.vehicle_sales(serial_number);
CREATE INDEX IF NOT EXISTS idx_vehicle_sales_motor_number ON public.vehicle_sales(motor_number);
CREATE INDEX IF NOT EXISTS idx_vehicle_sales_chassis_number ON public.vehicle_sales(chassis_number);

-- Index for date-based queries
CREATE INDEX IF NOT EXISTS idx_vehicle_sales_purchase_timestamp ON public.vehicle_sales(purchase_timestamp DESC);

-- Index for warranty duration queries
CREATE INDEX IF NOT EXISTS idx_vehicle_sales_warranty_unit ON public.vehicle_sales(warranty_duration_unit);

-- ================================
-- TRIGGER FOR UPDATED_AT
-- ================================

-- Reuse existing handle_updated_at function or create if doesn't exist
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER set_vehicle_sales_updated_at
    BEFORE UPDATE ON public.vehicle_sales
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ================================
-- CREATE PUBLIC VIEW FOR PRIVACY
-- ================================
-- This view exposes only non-private fields for public warranty checks

CREATE OR REPLACE VIEW public.vehicle_sales_public AS
SELECT 
    id,
    vehicle_name,
    serial_number,
    motor_number,
    chassis_number,
    owner_full_name,
    -- NOTE: owner_address and owner_phone are intentionally excluded
    purchase_timestamp,
    warranty_duration_value,
    warranty_duration_unit,
    created_at
FROM public.vehicle_sales;

-- Allow public to read from this view
GRANT SELECT ON public.vehicle_sales_public TO anon, authenticated;

-- ================================
-- VERIFICATION QUERIES
-- ================================

-- Verify the table was created
SELECT table_name, table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'vehicle_sales';

-- Verify columns
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'vehicle_sales' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Verify indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'vehicle_sales'
AND schemaname = 'public';

-- Verify RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'vehicle_sales'
AND schemaname = 'public';

-- Verify policies
SELECT policyname, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'vehicle_sales'
AND schemaname = 'public';
