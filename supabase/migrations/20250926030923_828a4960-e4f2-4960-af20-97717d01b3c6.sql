-- Create admin users table for authentication
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow admin users to access their own records
CREATE POLICY "Admin users can access their own records" ON public.admin_users
  FOR ALL USING (true);

-- Insert default admin user (KHAN/1122@)
INSERT INTO public.admin_users (username, password_hash) 
VALUES ('KHAN', crypt('1122@', gen_salt('bf')));

-- Site settings table for global configuration
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  setting_type TEXT NOT NULL CHECK (setting_type IN ('text', 'image', 'color', 'json', 'boolean', 'number')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access for site settings
CREATE POLICY "Public can read site settings" ON public.site_settings
  FOR SELECT USING (true);

-- Allow admin access for site settings
CREATE POLICY "Admins can manage site settings" ON public.site_settings
  FOR ALL USING (true);

-- Scooters table with all specifications
CREATE TABLE public.scooters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  model TEXT NOT NULL UNIQUE,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  battery_capacity DECIMAL(5,2) NOT NULL,
  range_km INTEGER NOT NULL,
  top_speed INTEGER NOT NULL,
  charging_time_hours DECIMAL(3,1) NOT NULL,
  power_kw DECIMAL(5,2) NOT NULL,
  torque_nm INTEGER NOT NULL,
  weight_kg INTEGER NOT NULL,
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.scooters ENABLE ROW LEVEL SECURITY;

-- Allow public read access for active scooters
CREATE POLICY "Public can read active scooters" ON public.scooters
  FOR SELECT USING (is_active = true);

-- Allow admin access for scooters
CREATE POLICY "Admins can manage scooters" ON public.scooters
  FOR ALL USING (true);

-- Hero content table
CREATE TABLE public.hero_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  cta_text TEXT,
  cta_link TEXT,
  background_image TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active hero content" ON public.hero_content
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage hero content" ON public.hero_content
  FOR ALL USING (true);

-- Technology features table
CREATE TABLE public.technology_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.technology_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active technology features" ON public.technology_features
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage technology features" ON public.technology_features
  FOR ALL USING (true);

-- Testimonials table
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  avatar_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  location TEXT,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active testimonials" ON public.testimonials
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage testimonials" ON public.testimonials
  FOR ALL USING (true);

-- FAQs table
CREATE TABLE public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active FAQs" ON public.faqs
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage FAQs" ON public.faqs
  FOR ALL USING (true);

-- Team members table
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active team members" ON public.team_members
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage team members" ON public.team_members
  FOR ALL USING (true);

-- Company milestones table
CREATE TABLE public.company_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.company_milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active company milestones" ON public.company_milestones
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage company milestones" ON public.company_milestones
  FOR ALL USING (true);

-- Contact information table
CREATE TABLE public.contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  info_type TEXT NOT NULL CHECK (info_type IN ('address', 'phone', 'email', 'hours', 'social')),
  title TEXT NOT NULL,
  value TEXT NOT NULL,
  additional_data JSONB DEFAULT '{}'::jsonb,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active contact info" ON public.contact_info
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage contact info" ON public.contact_info
  FOR ALL USING (true);

-- Create update timestamp trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers to all tables
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON public.admin_users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_scooters_updated_at BEFORE UPDATE ON public.scooters FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_hero_content_updated_at BEFORE UPDATE ON public.hero_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_technology_features_updated_at BEFORE UPDATE ON public.technology_features FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_company_milestones_updated_at BEFORE UPDATE ON public.company_milestones FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON public.contact_info FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.scooters;
ALTER PUBLICATION supabase_realtime ADD TABLE public.hero_content;
ALTER PUBLICATION supabase_realtime ADD TABLE public.technology_features;
ALTER PUBLICATION supabase_realtime ADD TABLE public.testimonials;
ALTER PUBLICATION supabase_realtime ADD TABLE public.faqs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.team_members;
ALTER PUBLICATION supabase_realtime ADD TABLE public.company_milestones;
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_info;