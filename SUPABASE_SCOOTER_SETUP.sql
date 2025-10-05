-- ================================
-- SCOOTERS TABLE SETUP
-- ================================

-- Create scooters table
CREATE TABLE IF NOT EXISTS public.scooters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price TEXT NOT NULL,
    max_speed TEXT NOT NULL,
    max_range TEXT NOT NULL,
    charge_time TEXT NOT NULL,
    battery_capacity TEXT,
    motor_power TEXT,
    weight TEXT,
    features JSONB,
    specs JSONB,
    image_1_url TEXT,
    image_2_url TEXT,
    thumbnail_url TEXT,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
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

-- Policy: Admins can insert scooters
CREATE POLICY "Admins can insert scooters"
ON public.scooters
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Policy: Admins can update scooters
CREATE POLICY "Admins can update scooters"
ON public.scooters
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Policy: Admins can delete scooters
CREATE POLICY "Admins can delete scooters"
ON public.scooters
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- ================================
-- STORAGE BUCKET FOR SCOOTER IMAGES
-- ================================

-- Create storage bucket for scooter images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'scooter-images',
    'scooter-images',
    true,
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- ================================
-- RLS POLICIES FOR STORAGE
-- ================================

-- Policy: Anyone can view scooter images
CREATE POLICY "Anyone can view scooter images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'scooter-images');

-- Policy: Admins can upload scooter images
CREATE POLICY "Admins can upload scooter images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'scooter-images' 
    AND public.has_role(auth.uid(), 'admin')
);

-- Policy: Admins can update scooter images
CREATE POLICY "Admins can update scooter images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
    bucket_id = 'scooter-images' 
    AND public.has_role(auth.uid(), 'admin')
);

-- Policy: Admins can delete scooter images
CREATE POLICY "Admins can delete scooter images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
    bucket_id = 'scooter-images' 
    AND public.has_role(auth.uid(), 'admin')
);

-- ================================
-- INDEXES FOR PERFORMANCE
-- ================================

CREATE INDEX IF NOT EXISTS idx_scooters_is_active ON public.scooters(is_active);
CREATE INDEX IF NOT EXISTS idx_scooters_is_featured ON public.scooters(is_featured);
CREATE INDEX IF NOT EXISTS idx_scooters_display_order ON public.scooters(display_order);
CREATE INDEX IF NOT EXISTS idx_scooters_created_at ON public.scooters(created_at DESC);

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

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.scooters
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ================================
-- SAMPLE DATA (OPTIONAL)
-- ================================

INSERT INTO public.scooters (
    name, 
    description, 
    price, 
    max_speed, 
    max_range, 
    charge_time,
    battery_capacity,
    motor_power,
    weight,
    is_active,
    is_featured,
    display_order,
    features,
    specs
) VALUES 
(
    'EV Sport Pro',
    'High-performance electric scooter with smart display and GPS navigation',
    '$4,999',
    '65 km/h',
    '85 km',
    '2.5 hrs',
    '3.2 kWh',
    '3000W',
    '45 kg',
    true,
    true,
    1,
    '["Smart Display", "GPS Navigation", "Anti-theft System", "LED Headlights", "Regenerative Braking"]'::jsonb,
    '{"battery": "3.2 kWh Lithium-ion", "motor": "3000W Brushless", "brakes": "Hydraulic Disc", "suspension": "Dual Hydraulic"}'::jsonb
),
(
    'City Cruiser',
    'Compact and lightweight scooter perfect for urban commuting',
    '$2,499',
    '45 km/h',
    '60 km',
    '3 hrs',
    '1.8 kWh',
    '1500W',
    '28 kg',
    true,
    false,
    2,
    '["Foldable Design", "LED Display", "USB Charging Port", "Anti-theft Alarm"]'::jsonb,
    '{"battery": "1.8 kWh Lithium-ion", "motor": "1500W Brushless", "brakes": "Disc Brakes", "suspension": "Front Hydraulic"}'::jsonb
),
(
    'Eco Rider',
    'Eco-friendly scooter with extended battery life',
    '$3,299',
    '50 km/h',
    '100 km',
    '4 hrs',
    '2.5 kWh',
    '2000W',
    '35 kg',
    true,
    false,
    3,
    '["Eco Mode", "Smart Battery Management", "LED Lights", "Digital Display"]'::jsonb,
    '{"battery": "2.5 kWh Lithium-ion", "motor": "2000W Brushless", "brakes": "Hydraulic Disc", "suspension": "Front Suspension"}'::jsonb
)
ON CONFLICT DO NOTHING;
