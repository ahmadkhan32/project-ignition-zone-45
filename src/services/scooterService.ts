import { supabase } from "@/integrations/supabase/client";

export interface Scooter {
  id: string;
  name: string;
  description: string | null;
  price: string;
  max_speed: string;
  max_range: string;
  charge_time: string;
  battery_capacity?: string | null;
  motor_power?: string | null;
  weight?: string | null;
  features?: any;
  specs?: any;
  image_1_url: string | null;
  image_2_url: string | null;
  thumbnail_url: string | null;
  is_active: boolean;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface CreateScooterInput {
  name: string;
  description?: string;
  price: string;
  max_speed: string;
  max_range: string;
  charge_time: string;
  battery_capacity?: string;
  motor_power?: string;
  weight?: string;
  features?: any;
  specs?: any;
  image_1_url?: string;
  image_2_url?: string;
  thumbnail_url?: string;
  is_active?: boolean;
  is_featured?: boolean;
  display_order?: number;
}

export interface UpdateScooterInput extends Partial<CreateScooterInput> {
  id: string;
}

/**
 * ScooterService - Complete CRUD operations for scooters
 */
export class ScooterService {
  /**
   * CREATE - Add a new scooter
   */
  static async createScooter(input: CreateScooterInput) {
    const { data, error } = await supabase
      .from("scooters")
      .insert([
        {
          ...input,
          is_active: input.is_active ?? true,
          is_featured: input.is_featured ?? false,
          display_order: input.display_order ?? 0,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create scooter: ${error.message}`);
    }

    return data as Scooter;
  }

  /**
   * READ - Get all scooters
   */
  static async getAllScooters(activeOnly: boolean = false) {
    let query = supabase
      .from("scooters")
      .select("*")
      .order("display_order", { ascending: true });

    if (activeOnly) {
      query = query.eq("is_active", true);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch scooters: ${error.message}`);
    }

    return data as Scooter[];
  }

  /**
   * READ - Get a single scooter by ID
   */
  static async getScooterById(id: string) {
    const { data, error } = await supabase
      .from("scooters")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(`Failed to fetch scooter: ${error.message}`);
    }

    return data as Scooter;
  }

  /**
   * READ - Get featured scooters
   */
  static async getFeaturedScooters() {
    const { data, error } = await supabase
      .from("scooters")
      .select("*")
      .eq("is_featured", true)
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch featured scooters: ${error.message}`);
    }

    return data as Scooter[];
  }

  /**
   * UPDATE - Update an existing scooter
   */
  static async updateScooter(id: string, updates: Partial<CreateScooterInput>) {
    const { data, error } = await supabase
      .from("scooters")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update scooter: ${error.message}`);
    }

    return data as Scooter;
  }

  /**
   * UPDATE - Toggle scooter active status
   */
  static async toggleActiveStatus(id: string, isActive: boolean) {
    return this.updateScooter(id, { is_active: isActive });
  }

  /**
   * UPDATE - Toggle scooter featured status
   */
  static async toggleFeaturedStatus(id: string, isFeatured: boolean) {
    return this.updateScooter(id, { is_featured: isFeatured });
  }

  /**
   * DELETE - Remove a scooter
   */
  static async deleteScooter(id: string) {
    const { error } = await supabase
      .from("scooters")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(`Failed to delete scooter: ${error.message}`);
    }

    return true;
  }

  /**
   * STORAGE - Upload scooter image
   */
  static async uploadImage(file: File, scooterId: string, imageType: 'primary' | 'secondary' | 'thumbnail') {
    const fileExt = file.name.split('.').pop();
    const fileName = `${scooterId}_${imageType}_${Date.now()}.${fileExt}`;
    const filePath = `${scooterId}/${fileName}`;

    const { data, error } = await supabase.storage
      .from("scooter-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("scooter-images")
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  }

  /**
   * STORAGE - Delete scooter image
   */
  static async deleteImage(imageUrl: string) {
    // Extract file path from URL
    const urlParts = imageUrl.split('/scooter-images/');
    if (urlParts.length < 2) {
      throw new Error('Invalid image URL');
    }
    const filePath = urlParts[1];

    const { error } = await supabase.storage
      .from("scooter-images")
      .remove([filePath]);

    if (error) {
      throw new Error(`Failed to delete image: ${error.message}`);
    }

    return true;
  }

  /**
   * REALTIME - Subscribe to scooter changes
   */
  static subscribeToChanges(callback: (payload: any) => void) {
    const channel = supabase
      .channel("scooters-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "scooters",
        },
        callback
      )
      .subscribe();

    return channel;
  }

  /**
   * REALTIME - Unsubscribe from changes
   */
  static unsubscribe(channel: any) {
    supabase.removeChannel(channel);
  }
}

// Legacy functions for backward compatibility
export async function addScooter(payload: any, imageFile?: File) {
  return ScooterService.createScooter(payload);
}

export async function updateScooter(id: string, payload: any, imageFile?: File) {
  return ScooterService.updateScooter(id, payload);
}

export default ScooterService;
