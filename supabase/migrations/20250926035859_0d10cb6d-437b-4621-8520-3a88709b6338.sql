-- Create admin_users table for admin authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy for admin authentication (no RLS restrictions for login)
CREATE POLICY "Anyone can view admin users for authentication" ON public.admin_users FOR SELECT USING (true);

-- Insert admin user with proper password hash for 'admin123'
INSERT INTO public.admin_users (username, password_hash) VALUES
('KHAN', crypt('admin123', gen_salt('bf')));

-- Create trigger for updated_at timestamp
CREATE TRIGGER update_admin_users_updated_at 
BEFORE UPDATE ON public.admin_users 
FOR EACH ROW 
EXECUTE FUNCTION public.update_updated_at_column();