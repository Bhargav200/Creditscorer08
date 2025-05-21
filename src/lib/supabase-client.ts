
import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase-types'

// Default values for development - these will be replaced by your actual Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

// Check if we have the required values before creating the client
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn(
    'Supabase URL or Anonymous Key is missing. Please connect your project to Supabase using the Supabase integration button in the top right corner.'
  )
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
