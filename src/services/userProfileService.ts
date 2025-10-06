import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  date_of_birth: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  created_at: string;
  updated_at: string;
}

export class UserProfileService {
  // Get user profile by user ID
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles' as any)
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Unexpected error fetching user profile:', error);
      return null;
    }
  }

  // Get current user's profile
  static async getCurrentUserProfile(): Promise<UserProfile | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return null;
      }

      return await this.getUserProfile(user.id);
    } catch (error) {
      console.error('Error getting current user profile:', error);
      return null;
    }
  }

  // Update user profile
  static async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_profiles' as any)
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user profile:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Unexpected error updating user profile:', error);
      return false;
    }
  }

  // Create user profile (usually called automatically on signup)
  static async createUserProfile(profileData: Omit<UserProfile, 'created_at' | 'updated_at'>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_profiles' as any)
        .insert([{
          ...profileData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);

      if (error) {
        console.error('Error creating user profile:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Unexpected error creating user profile:', error);
      return false;
    }
  }

  // Delete user profile
  static async deleteUserProfile(userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_profiles' as any)
        .delete()
        .eq('id', userId);

      if (error) {
        console.error('Error deleting user profile:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Unexpected error deleting user profile:', error);
      return false;
    }
  }

  // Get all user profiles (admin only)
  static async getAllUserProfiles(): Promise<UserProfile[]> {
    try {
      const { data, error } = await supabase
        .from('user_profiles' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all user profiles:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Unexpected error fetching all user profiles:', error);
      return [];
    }
  }
}
