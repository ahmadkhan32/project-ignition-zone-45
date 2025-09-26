import { supabase } from '@/integrations/supabase/client';

export const setupAdminUser = async () => {
  try {
    // Check if admin user already exists
    const { data: existingAdmin } = await supabase
      .from('admin_users')
      .select('username')
      .eq('username', 'KHAN')
      .single();

    if (existingAdmin) {
      console.log('Admin user KHAN already exists');
      return true;
    }

    // Insert admin user with hashed password
    // Password: admin123 (pre-hashed with bcrypt)
    const { data, error } = await supabase
      .from('admin_users')
      .insert({
        username: 'KHAN',
        password_hash: '$2a$12$rQEKhPqJrZvUyN5tEKYdPugRVa5YWlEWdq7FjJjP9lEOHmOgG.Ql.',
        email: 'admin@evolutionev.com',
        is_active: true
      });

    if (error) {
      console.error('Error creating admin user:', error);
      return false;
    }

    console.log('Admin user KHAN created successfully');
    return true;
  } catch (error) {
    console.error('Setup admin user error:', error);
    return false;
  }
};