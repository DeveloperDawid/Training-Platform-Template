export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          created_at: string
          created_by: string | null
          email: string | null
          id: string
          name: string
          picture_url: string | null
          public_data: Json
          role: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          email?: string | null
          id: string
          name: string
          picture_url?: string | null
          public_data?: Json
          role?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          name?: string
          picture_url?: string | null
          public_data?: Json
          role?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["name"]
          },
        ]
      }
      achievements: {
        Row: {
          category: string
          color: string | null
          created_at: string
          description: string
          icon: string | null
          id: string
          title: string
          xp_reward: number | null
        }
        Insert: {
          category: string
          color?: string | null
          created_at?: string
          description: string
          icon?: string | null
          id?: string
          title: string
          xp_reward?: number | null
        }
        Update: {
          category?: string
          color?: string | null
          created_at?: string
          description?: string
          icon?: string | null
          id?: string
          title?: string
          xp_reward?: number | null
        }
        Relationships: []
      }
      case_stats: {
        Row: {
          average_ai_score: number | null
          best_ai_score: number | null
          created_at: string
          id: string
          platform_a_attempts: number | null
          platform_a_avg_score: number | null
          platform_b_attempts: number | null
          platform_b_avg_score: number | null
          platform_other_attempts: number | null
          platform_other_avg_score: number | null
          product_a_attempts: number | null
          product_a_avg_score: number | null
          product_b_attempts: number | null
          product_b_avg_score: number | null
          product_other_attempts: number | null
          product_other_avg_score: number | null
          scores_0_3: number | null
          scores_4_6: number | null
          scores_7_8: number | null
          scores_9_10: number | null
          total_cases_attempted: number | null
          total_cases_completed: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          average_ai_score?: number | null
          best_ai_score?: number | null
          created_at?: string
          id?: string
          platform_a_attempts?: number | null
          platform_a_avg_score?: number | null
          platform_b_attempts?: number | null
          platform_b_avg_score?: number | null
          platform_other_attempts?: number | null
          platform_other_avg_score?: number | null
          product_a_attempts?: number | null
          product_a_avg_score?: number | null
          product_b_attempts?: number | null
          product_b_avg_score?: number | null
          product_other_attempts?: number | null
          product_other_avg_score?: number | null
          scores_0_3?: number | null
          scores_4_6?: number | null
          scores_7_8?: number | null
          scores_9_10?: number | null
          total_cases_attempted?: number | null
          total_cases_completed?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          average_ai_score?: number | null
          best_ai_score?: number | null
          created_at?: string
          id?: string
          platform_a_attempts?: number | null
          platform_a_avg_score?: number | null
          platform_b_attempts?: number | null
          platform_b_avg_score?: number | null
          platform_other_attempts?: number | null
          platform_other_avg_score?: number | null
          product_a_attempts?: number | null
          product_a_avg_score?: number | null
          product_b_attempts?: number | null
          product_b_avg_score?: number | null
          product_other_attempts?: number | null
          product_other_avg_score?: number | null
          scores_0_3?: number | null
          scores_4_6?: number | null
          scores_7_8?: number | null
          scores_9_10?: number | null
          total_cases_attempted?: number | null
          total_cases_completed?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      cases: {
        Row: {
          ai_instructions: string | null
          created_at: string
          created_by: string | null
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id: string
          platform_type: Database["public"]["Enums"]["platform_type"]
          problem_description: string
          product_type: Database["public"]["Enums"]["product_type"]
          solution: string
          tags: string[] | null
          title: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          ai_instructions?: string | null
          created_at?: string
          created_by?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          platform_type: Database["public"]["Enums"]["platform_type"]
          problem_description: string
          product_type: Database["public"]["Enums"]["product_type"]
          solution: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          ai_instructions?: string | null
          created_at?: string
          created_by?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          platform_type?: Database["public"]["Enums"]["platform_type"]
          problem_description?: string
          product_type?: Database["public"]["Enums"]["product_type"]
          solution?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      chat_stats: {
        Row: {
          average_ai_score: number | null
          average_conversation_time: number | null
          average_messages_per_chat: number | null
          best_ai_score: number | null
          created_at: string
          id: string
          longest_chat: number | null
          platform_a_attempts: number | null
          platform_a_avg_score: number | null
          platform_b_attempts: number | null
          platform_b_avg_score: number | null
          platform_other_attempts: number | null
          platform_other_avg_score: number | null
          product_a_attempts: number | null
          product_a_avg_score: number | null
          product_b_attempts: number | null
          product_b_avg_score: number | null
          product_other_attempts: number | null
          product_other_avg_score: number | null
          scores_0_3: number | null
          scores_4_6: number | null
          scores_7_8: number | null
          scores_9_10: number | null
          shortest_chat: number | null
          total_chats_attempted: number | null
          total_chats_completed: number | null
          total_messages_sent: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          average_ai_score?: number | null
          average_conversation_time?: number | null
          average_messages_per_chat?: number | null
          best_ai_score?: number | null
          created_at?: string
          id?: string
          longest_chat?: number | null
          platform_a_attempts?: number | null
          platform_a_avg_score?: number | null
          platform_b_attempts?: number | null
          platform_b_avg_score?: number | null
          platform_other_attempts?: number | null
          platform_other_avg_score?: number | null
          product_a_attempts?: number | null
          product_a_avg_score?: number | null
          product_b_attempts?: number | null
          product_b_avg_score?: number | null
          product_other_attempts?: number | null
          product_other_avg_score?: number | null
          scores_0_3?: number | null
          scores_4_6?: number | null
          scores_7_8?: number | null
          scores_9_10?: number | null
          shortest_chat?: number | null
          total_chats_attempted?: number | null
          total_chats_completed?: number | null
          total_messages_sent?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          average_ai_score?: number | null
          average_conversation_time?: number | null
          average_messages_per_chat?: number | null
          best_ai_score?: number | null
          created_at?: string
          id?: string
          longest_chat?: number | null
          platform_a_attempts?: number | null
          platform_a_avg_score?: number | null
          platform_b_attempts?: number | null
          platform_b_avg_score?: number | null
          platform_other_attempts?: number | null
          platform_other_avg_score?: number | null
          product_a_attempts?: number | null
          product_a_avg_score?: number | null
          product_b_attempts?: number | null
          product_b_avg_score?: number | null
          product_other_attempts?: number | null
          product_other_avg_score?: number | null
          scores_0_3?: number | null
          scores_4_6?: number | null
          scores_7_8?: number | null
          scores_9_10?: number | null
          shortest_chat?: number | null
          total_chats_attempted?: number | null
          total_chats_completed?: number | null
          total_messages_sent?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      mc_questions: {
        Row: {
          correct_option: number
          created_at: string
          created_by: string | null
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id: string
          option_1: string
          option_2: string
          option_3: string
          option_4: string
          platform_type: Database["public"]["Enums"]["platform_type"]
          product_type: Database["public"]["Enums"]["product_type"]
          question_text: string
          tags: string[] | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          correct_option?: number
          created_at?: string
          created_by?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          option_1: string
          option_2: string
          option_3: string
          option_4: string
          platform_type: Database["public"]["Enums"]["platform_type"]
          product_type: Database["public"]["Enums"]["product_type"]
          question_text: string
          tags?: string[] | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          correct_option?: number
          created_at?: string
          created_by?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          option_1?: string
          option_2?: string
          option_3?: string
          option_4?: string
          platform_type?: Database["public"]["Enums"]["platform_type"]
          product_type?: Database["public"]["Enums"]["product_type"]
          question_text?: string
          tags?: string[] | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      mc_stats: {
        Row: {
          average_score: number | null
          best_score: number | null
          created_at: string
          id: string
          platform_a_correct: number | null
          platform_a_total: number | null
          platform_b_correct: number | null
          platform_b_total: number | null
          platform_other_correct: number | null
          platform_other_total: number | null
          product_a_correct: number | null
          product_a_total: number | null
          product_b_correct: number | null
          product_b_total: number | null
          product_other_correct: number | null
          product_other_total: number | null
          total_correct_answers: number | null
          total_questions_answered: number | null
          total_quizzes_completed: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          average_score?: number | null
          best_score?: number | null
          created_at?: string
          id?: string
          platform_a_correct?: number | null
          platform_a_total?: number | null
          platform_b_correct?: number | null
          platform_b_total?: number | null
          platform_other_correct?: number | null
          platform_other_total?: number | null
          product_a_correct?: number | null
          product_a_total?: number | null
          product_b_correct?: number | null
          product_b_total?: number | null
          product_other_correct?: number | null
          product_other_total?: number | null
          total_correct_answers?: number | null
          total_questions_answered?: number | null
          total_quizzes_completed?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          average_score?: number | null
          best_score?: number | null
          created_at?: string
          id?: string
          platform_a_correct?: number | null
          platform_a_total?: number | null
          platform_b_correct?: number | null
          platform_b_total?: number | null
          platform_other_correct?: number | null
          platform_other_total?: number | null
          product_a_correct?: number | null
          product_a_total?: number | null
          product_b_correct?: number | null
          product_b_total?: number | null
          product_other_correct?: number | null
          product_other_total?: number | null
          total_correct_answers?: number | null
          total_questions_answered?: number | null
          total_quizzes_completed?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mc_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          id: number
          permission: Database["public"]["Enums"]["app_permissions"]
          role: string
        }
        Insert: {
          id?: number
          permission: Database["public"]["Enums"]["app_permissions"]
          role: string
        }
        Update: {
          id?: number
          permission?: Database["public"]["Enums"]["app_permissions"]
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["name"]
          },
        ]
      }
      roles: {
        Row: {
          hierarchy_level: number
          name: string
        }
        Insert: {
          hierarchy_level: number
          name: string
        }
        Update: {
          hierarchy_level?: number
          name?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          id: string
          unlocked_at: string | null
          user_id: string
          xp_awarded: boolean | null
        }
        Insert: {
          achievement_id: string
          id?: string
          unlocked_at?: string | null
          user_id: string
          xp_awarded?: boolean | null
        }
        Update: {
          achievement_id?: string
          id?: string
          unlocked_at?: string | null
          user_id?: string
          xp_awarded?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_stats: {
        Row: {
          created_at: string
          id: string
          last_activity_date: string | null
          streak_days: number | null
          total_sessions_cases: number | null
          total_sessions_chat: number | null
          total_sessions_mc: number | null
          total_time_seconds_cases: number | null
          total_time_seconds_chat: number | null
          total_time_seconds_mc: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_activity_date?: string | null
          streak_days?: number | null
          total_sessions_cases?: number | null
          total_sessions_chat?: number | null
          total_sessions_mc?: number | null
          total_time_seconds_cases?: number | null
          total_time_seconds_chat?: number | null
          total_time_seconds_mc?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_activity_date?: string | null
          streak_days?: number | null
          total_sessions_cases?: number | null
          total_sessions_chat?: number | null
          total_sessions_mc?: number | null
          total_time_seconds_cases?: number | null
          total_time_seconds_chat?: number | null
          total_time_seconds_mc?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_xp: {
        Row: {
          current_level: number
          id: string
          total_xp: number
          updated_at: string | null
          user_id: string
          xp_to_next_level: number
        }
        Insert: {
          current_level?: number
          id?: string
          total_xp?: number
          updated_at?: string | null
          user_id: string
          xp_to_next_level?: number
        }
        Update: {
          current_level?: number
          id?: string
          total_xp?: number
          updated_at?: string | null
          user_id?: string
          xp_to_next_level?: number
        }
        Relationships: []
      }
      xp_levels: {
        Row: {
          description: string
          level: number
          title: string
          xp_required: number
        }
        Insert: {
          description: string
          level: number
          title: string
          xp_required: number
        }
        Update: {
          description?: string
          level?: number
          title?: string
          xp_required?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_permission: {
        Args: {
          permission_name: Database["public"]["Enums"]["app_permissions"]
          user_id: string
        }
        Returns: boolean
      }
      user_workspace: {
        Args: never
        Returns: {
          id: string
          permissions: Database["public"]["Enums"]["app_permissions"][]
          role: string
        }[]
      }
    }
    Enums: {
      app_permissions:
        | "members.manage"
        | "tasks.write"
        | "tasks.delete"
        | "stats.view"
      difficulty_level: "easy" | "medium" | "hard"
      learning_module_type:
        | "multiple_choice"
        | "cases_ai"
        | "chat"
        | "knowledge_test"
      platform_type: "platform_a" | "platform_b" | "other"
      product_type: "product_a" | "product_b" | "other"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      app_permissions: [
        "members.manage",
        "tasks.write",
        "tasks.delete",
        "stats.view",
      ],
      difficulty_level: ["easy", "medium", "hard"],
      learning_module_type: [
        "multiple_choice",
        "cases_ai",
        "chat",
        "knowledge_test",
      ],
      platform_type: ["platform_a", "platform_b", "other"],
      product_type: ["product_a", "product_b", "other"],
    },
  },
} as const

