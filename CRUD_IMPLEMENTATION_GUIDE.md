# Complete CRUD Implementation Guide

## ✅ What's Been Implemented

Your project now has a **complete CRUD (Create, Read, Update, Delete) system** for scooters with:

### 1. **Database Setup** 📊
- Full scooters table with all necessary fields
- Row Level Security (RLS) policies
- Real-time subscriptions enabled
- Automatic timestamps (created_at, updated_at)
- Performance indexes

### 2. **Storage Setup** 🖼️
- Dedicated storage bucket for scooter images
- Public image access
- Admin-only upload/delete permissions
- 5MB file size limit
- Support for JPEG, PNG, WebP, GIF formats

### 3. **Service Layer** 🔧
Complete ScooterService class with:

#### CREATE Operations:
- `createScooter(input)` - Add new scooters
- `uploadImage(file, scooterId, imageType)` - Upload images

#### READ Operations:
- `getAllScooters(activeOnly)` - Get all scooters
- `getScooterById(id)` - Get single scooter
- `getFeaturedScooters()` - Get featured scooters only

#### UPDATE Operations:
- `updateScooter(id, updates)` - Update scooter details
- `toggleActiveStatus(id, isActive)` - Toggle active/inactive
- `toggleFeaturedStatus(id, isFeatured)` - Toggle featured status

#### DELETE Operations:
- `deleteScooter(id)` - Remove scooter
- `deleteImage(imageUrl)` - Remove images

#### REAL-TIME Operations:
- `subscribeToChanges(callback)` - Listen to database changes
- `unsubscribe(channel)` - Stop listening

### 4. **Admin UI Components** 🎨
- **ScooterManager**: Full CRUD interface with real-time updates
- **AdminDashboard**: Protected admin panel
- Form validation and error handling
- Toast notifications for user feedback
- Responsive card-based layout

## 📋 Setup Instructions

### Step 1: Run Database Migration

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `SUPABASE_SCOOTER_SETUP.sql`
4. Click **Run** to execute the migration

This will create:
- ✅ Scooters table
- ✅ RLS policies
- ✅ Storage bucket
- ✅ Indexes
- ✅ Sample data (3 scooters)

### Step 2: Verify Setup

1. Go to **Table Editor** → Check if `scooters` table exists
2. Go to **Storage** → Check if `scooter-images` bucket exists
3. Go to **Database** → **Roles** → Verify RLS is enabled

### Step 3: Create Your First Admin User

Run this SQL after registering your admin account:

```sql
-- Replace 'your-user-uuid' with your actual user ID
INSERT INTO public.user_roles (user_id, role)
VALUES ('your-user-uuid', 'admin');
```

### Step 4: Test CRUD Operations

1. **Login**: Go to `/admin/login`
2. **Access Dashboard**: You'll be redirected to `/admin/dashboard`
3. **Create**: Click "Add New Scooter" button
4. **Read**: View all scooters in the list
5. **Update**: Click edit button on any scooter
6. **Delete**: Click delete button (with confirmation)

## 🔐 Security Features

### Row Level Security (RLS)
- ✅ Public can view active scooters
- ✅ Authenticated users can view all scooters
- ✅ Only admins can create/update/delete
- ✅ Role-based access control

### Storage Security
- ✅ Public read access to images
- ✅ Admin-only upload/update/delete
- ✅ File type restrictions
- ✅ File size limits (5MB)

## 📱 Using the Service Layer

### Example: Create a Scooter

```typescript
import { ScooterService } from '@/services/scooterService';

const newScooter = await ScooterService.createScooter({
  name: "Thunder X",
  description: "High-speed electric scooter",
  price: "$5,999",
  max_speed: "75 km/h",
  max_range: "100 km",
  charge_time: "2 hrs",
  is_featured: true
});
```

### Example: Get All Active Scooters

```typescript
const activeScooters = await ScooterService.getAllScooters(true);
```

### Example: Update a Scooter

```typescript
await ScooterService.updateScooter('scooter-id', {
  price: "$4,499",
  is_featured: false
});
```

### Example: Upload Image

```typescript
const imageUrl = await ScooterService.uploadImage(
  fileObject,
  'scooter-id',
  'primary'
);

// Then update scooter with image URL
await ScooterService.updateScooter('scooter-id', {
  image_1_url: imageUrl
});
```

### Example: Real-time Updates

```typescript
useEffect(() => {
  const channel = ScooterService.subscribeToChanges((payload) => {
    console.log('Scooter changed:', payload);
    // Refresh your data here
  });

  return () => {
    ScooterService.unsubscribe(channel);
  };
}, []);
```

## 🎯 Available Routes

- `/admin/login` - Admin login
- `/admin/register` - Admin registration
- `/admin/forgot-password` - Password recovery
- `/admin/reset-password` - Reset password
- `/admin/dashboard` - Main dashboard (protected)
- `/scooters` - Public scooter listing

## 🚀 Next Steps

1. **Run the SQL migration** in Supabase
2. **Register an admin account** at `/admin/register`
3. **Assign admin role** using SQL
4. **Login and test CRUD operations**
5. **Customize the UI** to match your brand

## 📚 File Structure

```
src/
├── services/
│   └── scooterService.ts          # Complete CRUD service
├── components/
│   └── admin/
│       └── ScooterManager.tsx     # Admin CRUD UI
├── pages/
│   └── admin/
│       ├── AdminLogin.tsx         # Login page
│       ├── AdminRegistration.tsx  # Registration page
│       ├── AdminDashboard.tsx     # Dashboard with CRUD
│       ├── ForgotPassword.tsx     # Password recovery
│       └── ResetPassword.tsx      # Password reset
├── hooks/
│   └── useAdminAuth.ts            # Authentication hook
└── integrations/
    └── supabase/
        └── client.ts              # Supabase client

Database:
└── SUPABASE_SCOOTER_SETUP.sql     # Complete DB setup
```

## 🔍 Troubleshooting

### Can't see scooters in dashboard?
- Check if RLS policies are created
- Verify your user has admin role
- Check browser console for errors

### Can't upload images?
- Verify storage bucket is created
- Check file size (< 5MB)
- Verify file type (JPEG, PNG, WebP, GIF)

### Real-time not working?
- Check if table has `REPLICA IDENTITY FULL`
- Verify table is added to `supabase_realtime` publication
- Check Supabase project settings

## 📖 Additional Resources

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Supabase Realtime Documentation](https://supabase.com/docs/guides/realtime)

---

**Your CRUD system is now complete and production-ready! 🎉**
