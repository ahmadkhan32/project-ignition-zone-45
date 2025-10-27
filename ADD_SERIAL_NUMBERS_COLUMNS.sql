-- Add Serial Number, Motor Number, and Chassis Number columns to scooters table
-- Run this in Supabase SQL Editor

-- Add Serial Number, Motor Number, and Chassis Number columns
ALTER TABLE public.scooters 
ADD COLUMN IF NOT EXISTS serial_number TEXT,
ADD COLUMN IF NOT EXISTS motor_number TEXT,
ADD COLUMN IF NOT EXISTS chassis_number TEXT;

-- Add Image 3 URL column for third image
ALTER TABLE public.scooters 
ADD COLUMN IF NOT EXISTS image_3_url TEXT;

-- Add comments to the new columns
COMMENT ON COLUMN public.scooters.serial_number IS 'Serial number of the scooter';
COMMENT ON COLUMN public.scooters.motor_number IS 'Motor serial number';
COMMENT ON COLUMN public.scooters.chassis_number IS 'Chassis/Frame number';
COMMENT ON COLUMN public.scooters.image_3_url IS 'Third image URL for detailed view';

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_scooters_serial_number ON public.scooters(serial_number);
CREATE INDEX IF NOT EXISTS idx_scooters_motor_number ON public.scooters(motor_number);
CREATE INDEX IF NOT EXISTS idx_scooters_chassis_number ON public.scooters(chassis_number);

-- Verify the columns were added
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'scooters' 
AND table_schema = 'public'
AND column_name IN ('serial_number', 'motor_number', 'chassis_number', 'image_3_url')
ORDER BY column_name;
