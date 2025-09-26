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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      audit_log: {
        Row: {
          action: string
          created_at: string
          id: string
          record_id: string | null
          table_name: string
          timestamp: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          record_id?: string | null
          table_name: string
          timestamp?: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          record_id?: string | null
          table_name?: string
          timestamp?: string
          user_id?: string
        }
        Relationships: []
      }
      challenge_templates: {
        Row: {
          category: string
          created_at: string | null
          difficulty_level: string
          estimated_time: number | null
          id: string
          max_points: number | null
          min_points: number | null
          template_prompt: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          difficulty_level: string
          estimated_time?: number | null
          id?: string
          max_points?: number | null
          min_points?: number | null
          template_prompt: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          difficulty_level?: string
          estimated_time?: number | null
          id?: string
          max_points?: number | null
          min_points?: number | null
          template_prompt?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      challenges: {
        Row: {
          category: string
          created_at: string
          description: string
          difficulty_level: string
          estimated_time: number | null
          generation_date: string | null
          id: string
          instructions: string | null
          is_active: boolean | null
          is_ai_generated: boolean | null
          points_reward: number | null
          template_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          difficulty_level: string
          estimated_time?: number | null
          generation_date?: string | null
          id?: string
          instructions?: string | null
          is_active?: boolean | null
          is_ai_generated?: boolean | null
          points_reward?: number | null
          template_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          difficulty_level?: string
          estimated_time?: number | null
          generation_date?: string | null
          id?: string
          instructions?: string | null
          is_active?: boolean | null
          is_ai_generated?: boolean | null
          points_reward?: number | null
          template_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenges_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "challenge_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      coach_conversations: {
        Row: {
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      coach_interactions: {
        Row: {
          coach_response: string
          context_used: Json | null
          conversation_id: string | null
          created_at: string
          id: string
          user_id: string
          user_message: string
        }
        Insert: {
          coach_response: string
          context_used?: Json | null
          conversation_id?: string | null
          created_at?: string
          id?: string
          user_id: string
          user_message: string
        }
        Update: {
          coach_response?: string
          context_used?: Json | null
          conversation_id?: string | null
          created_at?: string
          id?: string
          user_id?: string
          user_message?: string
        }
        Relationships: [
          {
            foreignKeyName: "coach_interactions_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "coach_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      comfort_zones: {
        Row: {
          category: string
          created_at: string
          enabled: boolean
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          enabled?: boolean
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          enabled?: boolean
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      files: {
        Row: {
          created_at: string | null
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          mime_type: string | null
          request_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          mime_type?: string | null
          request_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          mime_type?: string | null
          request_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "files_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "requests"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          price: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          price?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          price?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      product_highlights: {
        Row: {
          created_at: string
          display_order: number
          icon_type: string
          id: string
          product_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          icon_type?: string
          id?: string
          product_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          icon_type?: string
          id?: string
          product_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_highlights_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          image_1_url: string | null
          image_2_url: string | null
          name: string
          page_type: string
          preview_url: string | null
          price_type: string
          remix_url: string | null
          thumbnail_url: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_1_url?: string | null
          image_2_url?: string | null
          name: string
          page_type?: string
          preview_url?: string | null
          price_type?: string
          remix_url?: string | null
          thumbnail_url?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_1_url?: string | null
          image_2_url?: string | null
          name?: string
          page_type?: string
          preview_url?: string | null
          price_type?: string
          remix_url?: string | null
          thumbnail_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          confidence_level: number | null
          contact_details: Json | null
          created_at: string | null
          display_name: string | null
          email: string
          id: string
          onboarding_completed: boolean | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          confidence_level?: number | null
          contact_details?: Json | null
          created_at?: string | null
          display_name?: string | null
          email: string
          id: string
          onboarding_completed?: boolean | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          confidence_level?: number | null
          contact_details?: Json | null
          created_at?: string | null
          display_name?: string | null
          email?: string
          id?: string
          onboarding_completed?: boolean | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      reflections: {
        Row: {
          challenge_id: string
          confidence_rating: number
          created_at: string
          id: string
          lessons_learned: string | null
          mood: string | null
          reflection_text: string | null
          user_challenge_id: string
          user_id: string
        }
        Insert: {
          challenge_id: string
          confidence_rating: number
          created_at?: string
          id?: string
          lessons_learned?: string | null
          mood?: string | null
          reflection_text?: string | null
          user_challenge_id: string
          user_id: string
        }
        Update: {
          challenge_id?: string
          confidence_rating?: number
          created_at?: string
          id?: string
          lessons_learned?: string | null
          mood?: string | null
          reflection_text?: string | null
          user_challenge_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reflections_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reflections_user_challenge_id_fkey"
            columns: ["user_challenge_id"]
            isOneToOne: false
            referencedRelation: "user_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      requests: {
        Row: {
          created_at: string | null
          id: string
          message: string
          status: Database["public"]["Enums"]["request_status"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_challenge_preferences: {
        Row: {
          auto_reset_enabled: boolean | null
          created_at: string | null
          daily_challenge_count: number | null
          difficulty_preference: string | null
          last_reset_date: string | null
          preferred_categories: string[] | null
          timezone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auto_reset_enabled?: boolean | null
          created_at?: string | null
          daily_challenge_count?: number | null
          difficulty_preference?: string | null
          last_reset_date?: string | null
          preferred_categories?: string[] | null
          timezone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auto_reset_enabled?: boolean | null
          created_at?: string | null
          daily_challenge_count?: number | null
          difficulty_preference?: string | null
          last_reset_date?: string | null
          preferred_categories?: string[] | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_challenge_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_challenges: {
        Row: {
          assigned_date: string
          challenge_id: string
          completed_at: string | null
          created_at: string
          id: string
          points_earned: number | null
          proof_image_url: string | null
          proof_text: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_date?: string
          challenge_id: string
          completed_at?: string | null
          created_at?: string
          id?: string
          points_earned?: number | null
          proof_image_url?: string | null
          proof_text?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_date?: string
          challenge_id?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          points_earned?: number | null
          proof_image_url?: string | null
          proof_text?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_challenges_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_goals: {
        Row: {
          created_at: string
          goal: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          goal: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          goal?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          badges: Json | null
          challenges_completed: number | null
          created_at: string
          current_streak: number | null
          id: string
          last_challenge_date: string | null
          level: number | null
          longest_streak: number | null
          total_points: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          badges?: Json | null
          challenges_completed?: number | null
          created_at?: string
          current_streak?: number | null
          id?: string
          last_challenge_date?: string | null
          level?: number | null
          longest_streak?: number | null
          total_points?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          badges?: Json | null
          challenges_completed?: number | null
          created_at?: string
          current_streak?: number | null
          id?: string
          last_challenge_date?: string | null
          level?: number | null
          longest_streak?: number | null
          total_points?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_usage: {
        Row: {
          created_at: string
          credits_remaining: number
          credits_used: number
          id: string
          plan_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          credits_remaining?: number
          credits_used?: number
          id?: string
          plan_type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          credits_remaining?: number
          credits_used?: number
          id?: string
          plan_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      voice_generations: {
        Row: {
          audio_url: string | null
          created_at: string
          id: string
          text_content: string
          user_id: string
          voice_model: string
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          id?: string
          text_content: string
          user_id: string
          voice_model?: string
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          id?: string
          text_content?: string
          user_id?: string
          voice_model?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
      get_profiles_secure: {
        Args: Record<PropertyKey, never>
        Returns: {
          avatar_url: string
          confidence_level: number
          contact_details: Json
          created_at: string
          display_name: string
          email: string
          id: string
          onboarding_completed: boolean
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["user_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      request_status:
        | "pending"
        | "accepted"
        | "in-progress"
        | "completed"
        | "rejected"
      user_role: "admin" | "user"
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
    Enums: {
      request_status: [
        "pending",
        "accepted",
        "in-progress",
        "completed",
        "rejected",
      ],
      user_role: ["admin", "user"],
    },
  },
} as const
