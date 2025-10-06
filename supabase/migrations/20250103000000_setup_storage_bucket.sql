-- Create storage bucket for scooter images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'scooter-images',
  'scooter-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml']
);

-- Create RLS policies for the bucket
-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload scooter images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'scooter-images');

-- Allow public read access to images
CREATE POLICY "Allow public read access to scooter images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'scooter-images');

-- Allow authenticated users to update their own images
CREATE POLICY "Allow authenticated users to update scooter images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'scooter-images');

-- Allow authenticated users to delete images
CREATE POLICY "Allow authenticated users to delete scooter images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'scooter-images');
