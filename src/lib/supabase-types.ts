
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      credit_applications: {
        Row: {
          id: string
          created_at: string
          user_id: string
          personal_info: Json
          financial_details: Json
          loan_info: Json
          status: string
          score: number | null
          recommendations: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          personal_info: Json
          financial_details: Json
          loan_info: Json
          status?: string
          score?: number | null
          recommendations?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          personal_info?: Json
          financial_details?: Json
          loan_info?: Json
          status?: string
          score?: number | null
          recommendations?: Json | null
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string | null
          email: string
          phone: string | null
          address: Json | null
          notification_preferences: Json | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          email: string
          phone?: string | null
          address?: Json | null
          notification_preferences?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          email?: string
          phone?: string | null
          address?: Json | null
          notification_preferences?: Json | null
        }
      }
      credit_scores: {
        Row: {
          id: string
          created_at: string
          user_id: string
          score: number
          factors: Json | null
          report_date: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          score: number
          factors?: Json | null
          report_date?: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          score?: number
          factors?: Json | null
          report_date?: string
        }
      }
    }
    Views: {
      user_credit_history: {
        Row: {
          user_id: string
          application_count: number
          latest_score: number | null
          score_trend: Json | null
        }
        Insert: never
        Update: never
      }
    }
    Functions: {
      calculate_credit_score: {
        Args: {
          user_id: string
          application_id: string
        }
        Returns: number
      }
    }
  }
}
