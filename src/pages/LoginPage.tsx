
import React from 'react'
import { Link } from 'react-router-dom'
import AuthForm from '@/components/auth/AuthForm'

const LoginPage = () => {
  return (
    <div className="w-full min-h-[90vh] flex items-center justify-center relative py-12">
      {/* Background elements */}
      <div className="absolute inset-0 bg-background overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-primary/20 via-transparent to-transparent blur-xl"></div>
        <div className="absolute bottom-[-30%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-primary/5 via-primary/10 to-transparent blur-xl"></div>
      </div>
      
      <div className="container max-w-lg mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Welcome</h1>
          <p className="text-muted-foreground">Sign in to your account or create a new one</p>
        </div>
        
        <AuthForm />
        
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
