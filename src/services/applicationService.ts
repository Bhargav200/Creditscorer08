
import { supabase, isSupabaseConfigured } from '@/lib/supabase-client'
import { calculateCreditScore } from './creditScoring'

interface ApplicationData {
  personal_info: {
    fullName: string
    email: string
    phone: string
    employmentStatus: string
  }
  financial_details: {
    creditAccounts: string
    creditUtilization: number
    paymentHistory: string
  }
  loan_info: {
    loanAmount: number
    loanPurpose: string
    loanTerm: string
  }
}

export const submitApplication = async (formData: any, userId?: string) => {
  // Calculate credit score using existing service - await the Promise
  const scoreResult = await calculateCreditScore(formData, userId || 'guest')
  
  if (!isSupabaseConfigured() || !supabase || !userId) {
    // Store in localStorage for guest users
    const applicationData = {
      ...formData,
      score: scoreResult.score,
      factors: scoreResult.factors,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem('creditScoreResult', JSON.stringify(applicationData))
    return { success: true, score: scoreResult.score, applicationId: 'guest' }
  }

  try {
    // Prepare application data
    const applicationData: ApplicationData = {
      personal_info: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        employmentStatus: formData.employmentStatus,
      },
      financial_details: {
        creditAccounts: formData.creditAccounts,
        creditUtilization: formData.creditUtilization,
        paymentHistory: formData.paymentHistory,
      },
      loan_info: {
        loanAmount: formData.loanAmount,
        loanPurpose: formData.loanPurpose,
        loanTerm: formData.loanTerm,
      },
    }

    // Insert application into database
    const { data: application, error: appError } = await supabase
      .from('credit_applications')
      .insert({
        user_id: userId,
        personal_info: applicationData.personal_info,
        financial_details: applicationData.financial_details,
        loan_info: applicationData.loan_info,
        status: 'completed',
        score: scoreResult.score,
        recommendations: scoreResult.factors,
      })
      .select()
      .single()

    if (appError) throw appError

    // Store credit score record
    const { error: scoreError } = await supabase
      .from('credit_scores')
      .insert({
        user_id: userId,
        score: scoreResult.score,
        factors: scoreResult.factors,
        report_date: new Date().toISOString(),
      })

    if (scoreError) throw scoreError

    // Also store in localStorage for immediate access
    localStorage.setItem('creditScoreResult', JSON.stringify({
      score: scoreResult.score,
      factors: scoreResult.factors,
      applicationId: application.id,
    }))

    return { 
      success: true, 
      score: scoreResult.score, 
      applicationId: application.id 
    }
  } catch (error) {
    console.error('Error submitting application:', error)
    // Fallback to localStorage
    const applicationData = {
      ...formData,
      score: scoreResult.score,
      factors: scoreResult.factors,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem('creditScoreResult', JSON.stringify(applicationData))
    return { success: true, score: scoreResult.score, applicationId: 'guest' }
  }
}

export const getUserApplications = async (userId: string) => {
  if (!isSupabaseConfigured() || !supabase) {
    return []
  }

  try {
    const { data, error } = await supabase
      .from('credit_applications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching applications:', error)
    return []
  }
}

export const getUserCreditScores = async (userId: string) => {
  if (!isSupabaseConfigured() || !supabase) {
    return []
  }

  try {
    const { data, error } = await supabase
      .from('credit_scores')
      .select('*')
      .eq('user_id', userId)
      .order('report_date', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching credit scores:', error)
    return []
  }
}
