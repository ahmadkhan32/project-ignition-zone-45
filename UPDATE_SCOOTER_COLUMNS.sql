-- Update Scooter Table Columns
-- Replace power_output with motor_output and torque with battery

-- First, add the new columns
ALTER TABLE scooters 
ADD COLUMN IF NOT EXISTS motor_output TEXT,
ADD COLUMN IF NOT EXISTS battery TEXT;

-- Copy data from old columns to new columns (if they exist)
-- Always ensure motor_output has W unit and battery has Ah unit
UPDATE scooters 
SET motor_output = CONCAT(REGEXP_REPLACE(power_output, '[^0-9.]', '', 'g'), 'W')
WHERE power_output IS NOT NULL AND motor_output IS NULL;

UPDATE scooters 
SET battery = CONCAT(REGEXP_REPLACE(torque, '[^0-9.]', '', 'g'), 'Ah')
WHERE torque IS NOT NULL AND battery IS NULL;

-- Drop the old columns (uncomment these lines after verifying the data migration)
-- ALTER TABLE scooters DROP COLUMN IF EXISTS power_output;
-- ALTER TABLE scooters DROP COLUMN IF EXISTS torque;

-- Add comments to the new columns
COMMENT ON COLUMN scooters.motor_output IS 'Motor output specification (e.g., 3500W)';
COMMENT ON COLUMN scooters.battery IS 'Battery specification (e.g., 20Ah)';
