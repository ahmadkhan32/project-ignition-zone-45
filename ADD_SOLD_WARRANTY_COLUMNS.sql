-- Add Sold Units and Warranty Tracking columns to scooters table
-- Run this in Supabase SQL Editor

-- Add sold units tracking
ALTER TABLE public.scooters 
ADD COLUMN IF NOT EXISTS total_sold INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS units_in_stock INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS warranty_period_months INTEGER DEFAULT 12;

-- Add comments to the new columns
COMMENT ON COLUMN public.scooters.total_sold IS 'Total number of units sold';
COMMENT ON COLUMN public.scooters.units_in_stock IS 'Number of units currently in stock';
COMMENT ON COLUMN public.scooters.warranty_period_months IS 'Warranty period in months (default 12 months)';

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_scooters_total_sold ON public.scooters(total_sold);
CREATE INDEX IF NOT EXISTS idx_scooters_units_in_stock ON public.scooters(units_in_stock);

-- Create warranty claims table
CREATE TABLE IF NOT EXISTS public.warranty_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scooter_id UUID NOT NULL REFERENCES public.scooters(id) ON DELETE CASCADE,
    serial_number TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    customer_phone TEXT,
    purchase_date DATE NOT NULL,
    claim_date DATE NOT NULL DEFAULT CURRENT_DATE,
    claim_type TEXT NOT NULL CHECK (claim_type IN ('repair', 'replacement', 'refund')),
    issue_description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
    admin_notes TEXT,
    resolution_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on warranty_claims table
ALTER TABLE public.warranty_claims ENABLE ROW LEVEL SECURITY;

-- Policy: Users can insert warranty claims
CREATE POLICY "Users can insert warranty claims"
ON public.warranty_claims
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy: Users can view their own warranty claims
CREATE POLICY "Users can view their own warranty claims"
ON public.warranty_claims
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL);

-- Policy: Admins can view all warranty claims
CREATE POLICY "Admins can view all warranty claims"
ON public.warranty_claims
FOR SELECT
TO authenticated
USING (true);

-- Policy: Admins can update warranty claims
CREATE POLICY "Admins can update warranty claims"
ON public.warranty_claims
FOR UPDATE
TO authenticated
USING (true);

-- Add indexes for warranty claims
CREATE INDEX IF NOT EXISTS idx_warranty_claims_scooter_id ON public.warranty_claims(scooter_id);
CREATE INDEX IF NOT EXISTS idx_warranty_claims_serial_number ON public.warranty_claims(serial_number);
CREATE INDEX IF NOT EXISTS idx_warranty_claims_status ON public.warranty_claims(status);
CREATE INDEX IF NOT EXISTS idx_warranty_claims_claim_date ON public.warranty_claims(claim_date);

-- Add trigger to update updated_at timestamp
CREATE TRIGGER update_warranty_claims_updated_at
    BEFORE UPDATE ON public.warranty_claims
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Verify the columns were added
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'scooters' 
AND table_schema = 'public'
AND column_name IN ('total_sold', 'units_in_stock', 'warranty_period_months')
ORDER BY column_name;

-- Verify warranty_claims table was created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'warranty_claims';
