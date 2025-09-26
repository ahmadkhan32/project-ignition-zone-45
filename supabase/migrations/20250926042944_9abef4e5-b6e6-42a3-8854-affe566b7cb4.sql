-- Create a function to verify admin passwords
CREATE OR REPLACE FUNCTION public.verify_admin_password(username_input text, password_input text)
RETURNS TABLE(id uuid, username text) AS $$
BEGIN
  RETURN QUERY
  SELECT au.id, au.username
  FROM public.admin_users au
  WHERE au.username = username_input 
    AND au.password_hash = crypt(password_input, au.password_hash);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create login attempt tracking for security
CREATE TABLE IF NOT EXISTS public.admin_login_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  username text NOT NULL,
  success boolean NOT NULL DEFAULT false,
  attempted_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on login attempts
ALTER TABLE public.admin_login_attempts ENABLE ROW LEVEL SECURITY;

-- Create a function to check login attempts (brute force protection)
CREATE OR REPLACE FUNCTION public.check_login_attempts(ip_addr text, username_input text)
RETURNS boolean AS $$
DECLARE
  failed_attempts integer;
BEGIN
  -- Count failed attempts in the last 15 minutes
  SELECT COUNT(*) INTO failed_attempts
  FROM public.admin_login_attempts
  WHERE ip_address = ip_addr 
    AND username = username_input
    AND success = false 
    AND attempted_at > now() - interval '15 minutes';
  
  -- Allow login if less than 5 failed attempts
  RETURN failed_attempts < 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log login attempts
CREATE OR REPLACE FUNCTION public.log_login_attempt(ip_addr text, username_input text, success_flag boolean)
RETURNS void AS $$
BEGIN
  INSERT INTO public.admin_login_attempts (ip_address, username, success)
  VALUES (ip_addr, username_input, success_flag);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create tables for dynamic content management
CREATE TABLE IF NOT EXISTS public.site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text NOT NULL,
  section_key text NOT NULL,
  content_type text NOT NULL DEFAULT 'text', -- 'text', 'html', 'image', 'json'
  content_value text,
  meta_data jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(page_slug, section_key)
);

-- Enable RLS on site_content
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Create policies for site_content
CREATE POLICY "Anyone can view active site content" ON public.site_content
  FOR SELECT USING (is_active = true);

-- Create table for SEO management
CREATE TABLE IF NOT EXISTS public.page_seo (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text NOT NULL UNIQUE,
  meta_title text,
  meta_description text,
  canonical_url text,
  og_title text,
  og_description text,
  og_image text,
  keywords text[],
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on page_seo
ALTER TABLE public.page_seo ENABLE ROW LEVEL SECURITY;

-- Create policy for page_seo
CREATE POLICY "Anyone can view active page SEO" ON public.page_seo
  FOR SELECT USING (is_active = true);

-- Create table for navigation management
CREATE TABLE IF NOT EXISTS public.navigation_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  url text NOT NULL,
  icon_name text,
  sort_order integer DEFAULT 0,
  is_external boolean DEFAULT false,
  is_active boolean DEFAULT true,
  parent_id uuid REFERENCES public.navigation_items(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on navigation_items
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;

-- Create policy for navigation_items
CREATE POLICY "Anyone can view active navigation items" ON public.navigation_items
  FOR SELECT USING (is_active = true);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_site_content_updated_at ON public.site_content;
CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_page_seo_updated_at ON public.page_seo;
CREATE TRIGGER update_page_seo_updated_at
  BEFORE UPDATE ON public.page_seo
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_navigation_items_updated_at ON public.navigation_items;
CREATE TRIGGER update_navigation_items_updated_at
  BEFORE UPDATE ON public.navigation_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Insert default site content for homepage
INSERT INTO public.site_content (page_slug, section_key, content_type, content_value) VALUES
('home', 'hero_title', 'text', 'Revolutionize Your Ride'),
('home', 'hero_subtitle', 'text', 'Experience the future of transportation with our cutting-edge electric scooters'),
('home', 'hero_cta_text', 'text', 'Explore Our Scooters'),
('home', 'about_title', 'text', 'Why Choose EvolutionEV'),
('home', 'about_description', 'text', 'Leading the electric revolution with innovative, sustainable, and high-performance electric vehicles')
ON CONFLICT (page_slug, section_key) DO NOTHING;

-- Insert default SEO data
INSERT INTO public.page_seo (page_slug, meta_title, meta_description) VALUES
('home', 'EvolutionEV - Electric Scooters & Vehicles', 'Discover premium electric scooters and vehicles. Sustainable transportation solutions with cutting-edge technology and exceptional performance.'),
('scooters', 'Electric Scooters | EvolutionEV', 'Browse our collection of premium electric scooters. Find the perfect eco-friendly ride with advanced features and superior performance.'),
('technology', 'Technology & Innovation | EvolutionEV', 'Learn about our cutting-edge electric vehicle technology. Advanced battery systems, smart features, and sustainable innovation.'),
('gallery', 'Gallery | EvolutionEV', 'View our electric scooters and vehicles in action. High-quality photos and videos of our premium electric transportation solutions.'),
('about', 'About Us | EvolutionEV', 'Learn about EvolutionEV - pioneers in electric transportation. Our mission, values, and commitment to sustainable mobility.'),
('contact', 'Contact Us | EvolutionEV', 'Get in touch with EvolutionEV. Contact information, support, and inquiries about our electric vehicles and services.')
ON CONFLICT (page_slug) DO NOTHING;

-- Insert default navigation items
INSERT INTO public.navigation_items (label, url, sort_order) VALUES
('Home', '/', 0),
('Scooters', '/scooters', 1),
('Technology', '/technology', 2),
('Gallery', '/gallery', 3),
('About', '/about', 4),
('Contact', '/contact', 5)
ON CONFLICT DO NOTHING;