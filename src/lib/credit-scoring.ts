
import { supabase } from './supabase-client'
import { Database } from './supabase-types'

type CreditApplication = Database['public']['Tables']['credit_applications']['Row']

// This is a simplified credit scoring algorithm for demonstration purposes
// In a real application, this would be more complex and typically executed on the server side
export const calculateCreditScore = async (applicationId: string): Promise<{
  score: number;
  factors: Record<string, string>;
  recommendations: string[];
}> => {
  try {
    // Fetch the application data
    const { data: application, error } = await supabase
      .from('credit_applications')
      .select('*')
      .eq('id', applicationId)
      .single()
    
    if (error) throw error
    if (!application) throw new Error('Application not found')
    
    // Extract data from application
    const personalInfo = application.personal_info as any
    const financialDetails = application.financial_details as any
    const loanInfo = application.loan_info as any
    
    // Calculate base score (simplified algorithm)
    let score = 650 // Starting base score
    const factors: Record<string, string> = {}
    const recommendations: string[] = []
    
    // Adjust for income to debt ratio
    const monthlyIncome = financialDetails.monthly_income || 0
    const monthlyDebt = financialDetails.monthly_debt || 0
    const debtToIncomeRatio = monthlyDebt / monthlyIncome
    
    if (debtToIncomeRatio <= 0.2) {
      score += 50
      factors.debt_to_income = 'excellent'
    } else if (debtToIncomeRatio <= 0.36) {
      score += 30
      factors.debt_to_income = 'good'
    } else if (debtToIncomeRatio <= 0.42) {
      score += 10
      factors.debt_to_income = 'medium'
    } else {
      score -= 30
      factors.debt_to_income = 'poor'
      recommendations.push('Consider paying down existing debt to improve your debt-to-income ratio.')
    }
    
    // Adjust for payment history
    const latePayments = financialDetails.late_payments || 0
    
    if (latePayments === 0) {
      score += 70
      factors.payment_history = 'excellent'
    } else if (latePayments <= 1) {
      score += 30
      factors.payment_history = 'good'
    } else if (latePayments <= 3) {
      score -= 10
      factors.payment_history = 'medium'
      recommendations.push('Set up automatic payments to avoid late payments in the future.')
    } else {
      score -= 50
      factors.payment_history = 'poor'
      recommendations.push('Prioritize consistent on-time payments for all accounts.')
    }
    
    // Adjust for credit utilization
    const creditLimit = financialDetails.credit_limit || 0
    const creditBalance = financialDetails.credit_balance || 0
    const utilizationRatio = creditLimit > 0 ? creditBalance / creditLimit : 1
    
    if (utilizationRatio <= 0.1) {
      score += 50
      factors.credit_utilization = 'excellent'
    } else if (utilizationRatio <= 0.3) {
      score += 30
      factors.credit_utilization = 'good'
    } else if (utilizationRatio <= 0.5) {
      score -= 10
      factors.credit_utilization = 'medium'
      recommendations.push('Try to keep your credit card balances below 30% of your credit limits.')
    } else {
      score -= 50
      factors.credit_utilization = 'poor'
      recommendations.push('High credit utilization is negatively impacting your score. Consider paying down card balances.')
    }
    
    // Adjust for credit history
    const creditAge = financialDetails.credit_history_years || 0
    
    if (creditAge >= 7) {
      score += 50
      factors.credit_age = 'excellent'
    } else if (creditAge >= 3) {
      score += 30
      factors.credit_age = 'good'
    } else if (creditAge >= 1) {
      score += 10
      factors.credit_age = 'medium'
      recommendations.push('Keep older accounts open to build credit history.')
    } else {
      score -= 10
      factors.credit_age = 'poor'
      recommendations.push('Your credit history is limited. Consider credit-building products.')
    }
    
    // Adjust for loan amount request
    const requestedAmount = loanInfo.amount || 0
    const annualIncome = monthlyIncome * 12
    const loanToIncomeRatio = requestedAmount / annualIncome
    
    if (loanToIncomeRatio <= 0.2) {
      score += 20
      factors.loan_amount = 'excellent'
    } else if (loanToIncomeRatio <= 0.4) {
      score += 10
      factors.loan_amount = 'good'
    } else if (loanToIncomeRatio <= 0.6) {
      score -= 10
      factors.loan_amount = 'medium'
    } else {
      score -= 30
      factors.loan_amount = 'poor'
      recommendations.push('The requested loan amount is high relative to your income.')
    }
    
    // Add general recommendations if needed
    if (Object.keys(recommendations).length === 0) {
      recommendations.push('Continue your good credit habits to maintain your score.')
    }
    
    // Ensure score is within valid range
    score = Math.max(300, Math.min(score, 850))
    
    return {
      score,
      factors,
      recommendations
    }
  } catch (error) {
    console.error('Error calculating credit score:', error)
    throw error
  }
}

export const saveScore = async (userId: string, applicationId: string, scoreResult: {
  score: number;
  factors: Record<string, string>;
}) => {
  try {
    // Save score to credit_scores table
    const { error: scoreError } = await supabase
      .from('credit_scores')
      .insert({
        user_id: userId,
        score: scoreResult.score,
        factors: scoreResult.factors,
        report_date: new Date().toISOString()
      })
    
    if (scoreError) throw scoreError
    
    // Update application with score
    const { error: appError } = await supabase
      .from('credit_applications')
      .update({
        score: scoreResult.score,
        status: scoreResult.score >= 670 ? 'approved' : scoreResult.score >= 580 ? 'review' : 'declined'
      })
      .eq('id', applicationId)
    
    if (appError) throw appError
    
    return true
  } catch (error) {
    console.error('Error saving score:', error)
    throw error
  }
}
