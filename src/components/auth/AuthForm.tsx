
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { isSupabaseConfigured } from '@/lib/supabase-client'

// Define form schemas
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

const registerSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  fullName: z.string().min(2, { message: "Please enter your full name" }),
})

type LoginFormValues = z.infer<typeof loginSchema>
type RegisterFormValues = z.infer<typeof registerSchema>

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [formType, setFormType] = useState<'login' | 'register'>('login')
  const { toast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, signUp } = useAuth()

  const from = location.state?.from?.pathname || '/dashboard'

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
  })

  // Handle login submission
  const onLoginSubmit = async (data: LoginFormValues) => {
    if (!isSupabaseConfigured()) {
      toast({
        variant: "destructive",
        title: "Configuration Error",
        description: "Please connect your project to Supabase to use authentication.",
      })
      return
    }

    setIsLoading(true)
    try {
      await signIn(data.email, data.password)
      navigate(from, { replace: true })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing in",
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle register submission
  const onRegisterSubmit = async (data: RegisterFormValues) => {
    if (!isSupabaseConfigured()) {
      toast({
        variant: "destructive",
        title: "Configuration Error",
        description: "Please connect your project to Supabase to use authentication.",
      })
      return
    }

    setIsLoading(true)
    try {
      await signUp(data.email, data.password, data.fullName)
      setFormType('login')
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error creating account",
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isSupabaseConfigured()) {
    return (
      <div className="w-full max-w-md mx-auto bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/30">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold">Supabase Configuration Required</h3>
          <p className="text-sm text-muted-foreground">
            To use authentication features, please connect your project to Supabase using the green button in the top right corner.
          </p>
          <Button onClick={() => navigate('/')} variant="outline">
            Return to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/30">
      <Tabs value={formType} onValueChange={(value) => setFormType(value as 'login' | 'register')}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="register">
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
              <FormField
                control={registerForm.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AuthForm
