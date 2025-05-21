
import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase-types'

// These variables would be set by Lovable's Supabase integration
// They're here as placeholders
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
