
import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase-types'

// Default to empty strings when environment variables are not available
// This allows the app to build/run, but functionality requiring Supabase will be disabled
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Check if Supabase environment variables are properly set
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase environment variables are missing. Please connect your project to Supabase through the Lovable interface (green Supabase button in the top right).'
  )
}

// Create Supabase client with fallback handling - only create if we have valid config
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null

// Helper function to check if Supabase connection is valid
export const isSupabaseConfigured = () => {
  return Boolean(supabase && supabaseUrl && supabaseAnonKey)
}
