-- Create admin-images bucket for admin dashboard image uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'admin-images',
  'admin-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/svg+xml', 'image/jpeg', 'image/jpg', 'image/png']
);

-- Create RLS policies for admin-images bucket
CREATE POLICY "Admin images are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'admin-images');

CREATE POLICY "Authenticated users can upload admin images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'admin-images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update admin images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'admin-images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete admin images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'admin-images' 
  AND auth.role() = 'authenticated'
);
