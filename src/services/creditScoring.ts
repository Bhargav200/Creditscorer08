
export interface CreditScoreResult {
  score: number
  factors: Record<string, string>
  recommendations: string[]
}

export const calculateCreditScore = async (
  formData: any, 
  userId: string
): Promise<CreditScoreResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  let score = 650 // Base score
  const factors: Record<string, string> = {}
  const recommendations: string[] = []
  
  // Calculate based on financial data
  const creditUtilization = parseInt(formData.creditUtilization) || 0
  const loanAmount = parseInt(formData.loanAmount) || 0
  
  // Credit Utilization Factor
  if (creditUtilization <= 10) {
    score += 50
    factors.credit_utilization = 'excellent'
  } else if (creditUtilization <= 30) {
    score += 30
    factors.credit_utilization = 'good'
  } else if (creditUtilization <= 50) {
    score += 10
    factors.credit_utilization = 'fair'
  } else {
    score -= 30
    factors.credit_utilization = 'poor'
    recommendations.push('Reduce your credit card balances to improve your credit utilization ratio')
  }
  
  // Payment History Factor
  if (formData.paymentHistory === 'excellent') {
    score += 70
    factors.payment_history = 'excellent'
  } else if (formData.paymentHistory === 'good') {
    score += 40
    factors.payment_history = 'good'
  } else if (formData.paymentHistory === 'fair') {
    score += 10
    factors.payment_history = 'fair'
    recommendations.push('Continue making on-time payments to improve your payment history')
  } else {
    score -= 50
    factors.payment_history = 'poor'
    recommendations.push('Focus on making all payments on time to rebuild your payment history')
  }
  
  // Employment Status Factor
  if (formData.employmentStatus === 'full-time') {
    score += 30
    factors.employment = 'stable'
  } else if (formData.employmentStatus === 'part-time') {
    score += 15
    factors.employment = 'moderate'
  } else if (formData.employmentStatus === 'self-employed') {
    score += 10
    factors.employment = 'variable'
  } else {
    score -= 20
    factors.employment = 'unstable'
    recommendations.push('Stable employment can help improve your creditworthiness')
  }
  
  // Loan Amount Factor
  if (loanAmount < 10000) {
    score += 20
    factors.loan_amount = 'low_risk'
  } else if (loanAmount < 50000) {
    score += 10
    factors.loan_amount = 'moderate_risk'
  } else {
    score -= 10
    factors.loan_amount = 'high_risk'
    recommendations.push('Consider a smaller loan amount to improve approval chances')
  }
  
  // Credit Accounts Factor
  const accountCount = parseInt(formData.creditAccounts) || 0
  if (accountCount >= 3 && accountCount <= 8) {
    score += 25
    factors.credit_mix = 'good'
  } else if (accountCount < 3) {
    score += 5
    factors.credit_mix = 'limited'
    recommendations.push('Having a diverse mix of credit accounts can improve your score')
  } else {
    score -= 15
    factors.credit_mix = 'excessive'
    recommendations.push('Too many credit accounts may negatively impact your score')
  }
  
  // Ensure score stays within realistic bounds
  score = Math.max(300, Math.min(850, score))
  
  // Add general recommendations if score is below certain thresholds
  if (score < 650) {
    recommendations.push('Consider working with a credit counselor to develop a credit improvement plan')
  }
  
  if (score < 600) {
    recommendations.push('Focus on paying down existing debt and avoid new credit applications')
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Great job! Continue your current credit management practices')
  }
  
  return {
    score,
    factors,
    recommendations
  }
}
