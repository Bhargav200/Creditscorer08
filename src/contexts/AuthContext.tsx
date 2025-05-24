
import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from '@/lib/supabase-client'
import { useToast } from '@/hooks/use-toast'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) {
      setLoading(false)
      return
    }

    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw error
    }

    toast({
      title: "Welcome back!",
      description: "You have successfully signed in.",
    })
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      throw error
    }

    // Create profile record
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: email,
          full_name: fullName,
        })

      if (profileError) {
        console.error("Error creating profile:", profileError)
      }
    }

    toast({
      title: "Account created",
      description: "Please check your email to confirm your account.",
    })
  }

  const signOut = async () => {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }

    const { error } = await supabase.auth.signOut()

    if (error) {
      throw error
    }

    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    })
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
