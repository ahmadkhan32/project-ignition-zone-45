-- Fix Storage Buckets for Project Ignition Zone
-- This script creates both required storage buckets with proper RLS policies

-- ============================================
-- 1. CREATE SCOOTER-IMAGES BUCKET
-- ============================================

-- Create scooter-images bucket (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'scooter-images',
  'scooter-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp'];

-- Drop existing policies for scooter-images (if any)
DROP POLICY IF EXISTS "Allow authenticated users to upload scooter images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to scooter images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update scooter images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete scooter images" ON storage.objects;

-- Create RLS policies for scooter-images bucket
CREATE POLICY "Allow authenticated users to upload scooter images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'scooter-images');

CREATE POLICY "Allow public read access to scooter images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'scooter-images');

CREATE POLICY "Allow authenticated users to update scooter images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'scooter-images');

CREATE POLICY "Allow authenticated users to delete scooter images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'scooter-images');

-- ============================================
-- 2. CREATE ADMIN-IMAGES BUCKET
-- ============================================

-- Create admin-images bucket (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'admin-images',
  'admin-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp'];

-- Drop existing policies for admin-images (if any)
DROP POLICY IF EXISTS "Admin images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload admin images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update admin images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete admin images" ON storage.objects;

-- Create RLS policies for admin-images bucket
CREATE POLICY "Admin images are publicly accessible" 
ON storage.objects
FOR SELECT 
USING (bucket_id = 'admin-images');

CREATE POLICY "Authenticated users can upload admin images" 
ON storage.objects
FOR INSERT 
WITH CHECK (
  bucket_id = 'admin-images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update admin images" 
ON storage.objects
FOR UPDATE 
USING (
  bucket_id = 'admin-images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete admin images" 
ON storage.objects
FOR DELETE 
USING (
  bucket_id = 'admin-images' 
  AND auth.role() = 'authenticated'
);

-- ============================================
-- 3. VERIFY BUCKETS CREATED
-- ============================================

-- Check if buckets exist
SELECT 
  id, 
  name, 
  public, 
  file_size_limit, 
  allowed_mime_types,
  created_at
FROM storage.buckets 
WHERE id IN ('scooter-images', 'admin-images')
ORDER BY id;

-- ============================================
-- 4. TEST BUCKET ACCESS
-- ============================================

-- Test that buckets are accessible
SELECT 
  'scooter-images' as bucket_name,
  CASE 
    WHEN EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'scooter-images') 
    THEN '✅ EXISTS' 
    ELSE '❌ MISSING' 
  END as status;

SELECT 
  'admin-images' as bucket_name,
  CASE 
    WHEN EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'admin-images') 
    THEN '✅ EXISTS' 
    ELSE '❌ MISSING' 
  END as status;
