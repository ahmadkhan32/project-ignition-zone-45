export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          id: string
          password_hash: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          password_hash: string
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          password_hash?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      company_milestones: {
        Row: {
          created_at: string
          description: string
          id: string
          is_active: boolean | null
          sort_order: number | null
          title: string
          updated_at: string
          year: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          is_active?: boolean | null
          sort_order?: number | null
          title: string
          updated_at?: string
          year: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          is_active?: boolean | null
          sort_order?: number | null
          title?: string
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
      contact_info: {
        Row: {
          additional_data: Json | null
          created_at: string
          id: string
          info_type: string
          is_active: boolean | null
          sort_order: number | null
          title: string
          updated_at: string
          value: string
        }
        Insert: {
          additional_data?: Json | null
          created_at?: string
          id?: string
          info_type: string
          is_active?: boolean | null
          sort_order?: number | null
          title: string
          updated_at?: string
          value: string
        }
        Update: {
          additional_data?: Json | null
          created_at?: string
          id?: string
          info_type?: string
          is_active?: boolean | null
          sort_order?: number | null
          title?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          id: string
          is_active: boolean | null
          question: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          question: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          question?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      hero_content: {
        Row: {
          background_image: string | null
          created_at: string
          cta_link: string | null
          cta_text: string | null
          description: string | null
          id: string
          is_active: boolean | null
          section_key: string
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          background_image?: string | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          section_key: string
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          background_image?: string | null
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          section_key?: string
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      scooters: {
        Row: {
          battery_capacity: number
          charging_time_hours: number
          created_at: string
          description: string | null
          features: Json | null
          id: string
          image_url: string | null
          is_active: boolean | null
          is_featured: boolean | null
          model: string
          name: string
          power_kw: number
          price: number
          range_km: number
          sort_order: number | null
          top_speed: number
          torque_nm: number
          updated_at: string
          weight_kg: number
        }
        Insert: {
          battery_capacity: number
          charging_time_hours: number
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          model: string
          name: string
          power_kw: number
          price: number
          range_km: number
          sort_order?: number | null
          top_speed: number
          torque_nm: number
          updated_at?: string
          weight_kg: number
        }
        Update: {
          battery_capacity?: number
          charging_time_hours?: number
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          model?: string
          name?: string
          power_kw?: number
          price?: number
          range_km?: number
          sort_order?: number | null
          top_speed?: number
          torque_nm?: number
          updated_at?: string
          weight_kg?: number
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          setting_key: string
          setting_type: string
          setting_value: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key: string
          setting_type: string
          setting_value: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key?: string
          setting_type?: string
          setting_value?: Json
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          id: string
          is_active: boolean | null
          linkedin_url: string | null
          name: string
          position: string
          sort_order: number | null
          twitter_url: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          linkedin_url?: string | null
          name: string
          position: string
          sort_order?: number | null
          twitter_url?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          linkedin_url?: string | null
          name?: string
          position?: string
          sort_order?: number | null
          twitter_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      technology_features: {
        Row: {
          created_at: string
          description: string
          icon_name: string
          id: string
          is_active: boolean | null
          sort_order: number | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          icon_name: string
          id?: string
          is_active?: boolean | null
          sort_order?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          icon_name?: string
          id?: string
          is_active?: boolean | null
          sort_order?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          location: string | null
          name: string
          rating: number | null
          role: string | null
          sort_order: number | null
          text: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          location?: string | null
          name: string
          rating?: number | null
          role?: string | null
          sort_order?: number | null
          text: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          location?: string | null
          name?: string
          rating?: number | null
          role?: string | null
          sort_order?: number | null
          text?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
