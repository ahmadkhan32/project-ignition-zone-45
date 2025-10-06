# Supabase Authentication & RLS Setup Guide

## 🔐 Complete Authentication System Implemented

Your project now includes:
- ✅ Email/Password authentication
- ✅ OAuth (Google & GitHub) login
- ✅ Forgot password functionality
- ✅ Password reset flow
- ✅ Secure session management
- ✅ Protected admin routes

## 📍 Admin Routes

- `/admin/login` - Admin login page
- `/admin/register` - Admin registration page
- `/admin/forgot-password` - Password recovery
- `/admin/reset-password` - Reset password page
- `/admin/dashboard` - Admin dashboard (protected)
- `/admin/add-scooter` - Add scooter form (protected)

## 🔧 Required Supabase Configuration

### 1. Configure OAuth Providers (Optional)

#### For Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `https://scpdntuuikcqasmfxkeq.supabase.co/auth/v1/callback`
4. In Supabase Dashboard → Authentication → Providers → Google:
   - Enable Google provider
   - Add your Client ID and Secret

#### For GitHub OAuth:
1. Go to GitHub Settings → Developer Settings → OAuth Apps
2. Create new OAuth app
3. Add callback URL: `https://scpdntuuikcqasmfxkeq.supabase.co/auth/v1/callback`
4. In Supabase Dashboard → Authentication → Providers → GitHub:
   - Enable GitHub provider
   - Add your Client ID and Secret

### 2. Configure Email Settings

In Supabase Dashboard → Authentication → URL Configuration:
- **Site URL**: `https://your-domain.com` (or your preview URL)
- **Redirect URLs**: Add your preview and production URLs

In Authentication → Email Templates:
- Customize confirmation, reset password, and magic link emails

### 3. Create User Roles System (CRITICAL FOR SECURITY)

Run this SQL in Supabase SQL Editor:

```sql
-- Create enum for user roles
create type public.app_role as enum ('admin', 'moderator', 'user');

-- Create user_roles table
create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique (user_id, role)
);

-- Enable RLS on user_roles
alter table public.user_roles enable row level security;

-- Create security definer function to check user role
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- RLS Policies for user_roles table
create policy "Users can view their own roles"
on public.user_roles
for select
to authenticated
using (auth.uid() = user_id);

create policy "Admins can view all roles"
on public.user_roles
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can insert roles"
on public.user_roles
for insert
to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update roles"
on public.user_roles
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete roles"
on public.user_roles
for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));
```

### 4. Assign Admin Role to Users

After a user registers, manually assign them admin role:

```sql
-- Replace 'user-uuid-here' with the actual user ID
insert into public.user_roles (user_id, role)
values ('user-uuid-here', 'admin');
```

### 5. Update Scooters Table RLS (if needed)

```sql
-- Example: Allow admins to manage scooters
create policy "Admins can manage scooters"
on public.scooters
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'));
```

## 🛡️ Security Features

- ✅ No localStorage-based authentication (security risk eliminated)
- ✅ Proper Supabase session management
- ✅ Row Level Security (RLS) ready
- ✅ Password validation (minimum 6 characters)
- ✅ Email confirmation support
- ✅ Secure password reset flow
- ✅ Role-based access control (RBAC)

## 📱 Testing Authentication

1. **Register**: Go to `/admin/register` and create an account
2. **Confirm Email**: Check your email and click confirmation link (if enabled)
3. **Assign Admin Role**: Use SQL to grant admin role to your user
4. **Login**: Go to `/admin/login` and sign in
5. **Access Dashboard**: You should be redirected to `/admin/dashboard`

## 🔄 Password Reset Flow

1. User goes to `/admin/forgot-password`
2. Enters email address
3. Receives reset link via email
4. Clicks link → redirected to `/admin/reset-password`
5. Enters new password
6. Redirected to login page

## 🚀 Next Steps

1. Run the user roles SQL migration in Supabase
2. Configure OAuth providers (optional)
3. Set correct Site URL and Redirect URLs
4. Register a test admin account
5. Assign admin role via SQL
6. Test the complete authentication flow

## 📚 Documentation

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [OAuth Providers Setup](https://supabase.com/docs/guides/auth/social-login)
