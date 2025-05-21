
import { supabase, isSupabaseConfigured } from '@/lib/supabase-client'

// Constants
const CREDIT_SCORE_RANGE = {
  MIN: 300,
  MAX: 850
}

// Cache for already calculated scores to prevent redundant processing
const scoreCache = new Map<string, {
  score: number,
  timestamp: number,
  factors: any
}>()

// Cache expiration time (12 hours)
const CACHE_TTL = 12 * 60 * 60 * 1000

/**
 * Calculate credit score based on application data
 * Optimized for high volume: uses caching, batch processing capabilities
 */
export async function calculateCreditScore(applicationData: any, userId: string) {
  // Generate cache key from user ID and data checksum
  const cacheKey = `${userId}-${JSON.stringify(applicationData)}`
  
  // Check if we have a valid cached score
  const cached = scoreCache.get(cacheKey)
  if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
    console.log('Using cached credit score calculation')
    return cached
  }

  // Process data and calculate base score
  const baseScore = await processApplicationData(applicationData)
  
  // Apply enterprise-level risk adjustment factors
  const adjustedScore = applyRiskFactors(baseScore, applicationData)
  
  // Generate score explanation factors
  const factors = generateScoreFactors(applicationData, adjustedScore)
  
  // Save calculation to database if Supabase is configured
  if (isSupabaseConfigured()) {
    try {
      await saveScoreToDatabase(userId, adjustedScore, factors, applicationData)
    } catch (error) {
      console.error('Failed to save score to database:', error)
      // Continue anyway - we don't want to block the user experience
    }
  }

  // Cache the result
  const result = {
    score: adjustedScore,
    timestamp: Date.now(),
    factors
  }
  scoreCache.set(cacheKey, result)
  
  return result
}

/**
 * Process application data to calculate base score
 * This function could be expanded to use TensorFlow.js or call a backend ML model
 */
async function processApplicationData(data: any) {
  // Extract key features from application data
  const {
    creditAccounts = 0,
    creditUtilization = 30,
    monthlyDebt = 0,
    monthlyExpenses = 0,
    annualIncome = 0,
    employmentStatus = '',
    creditHistory = '',
    paymentHistory = '',
    recentInquiries = 0,
  } = data

  // Convert string values to numbers if needed
  const numCreditAccounts = Number(creditAccounts)
  const numCreditUtilization = Number(creditUtilization)
  const numMonthlyDebt = Number(monthlyDebt)
  const numMonthlyExpenses = Number(monthlyExpenses)
  const numAnnualIncome = Number(annualIncome)
  const numRecentInquiries = Number(recentInquiries)

  // Calculate debt-to-income ratio (important factor)
  const monthlyIncome = numAnnualIncome / 12
  const debtToIncomeRatio = monthlyIncome > 0 
    ? ((numMonthlyDebt + numMonthlyExpenses) / monthlyIncome) * 100 
    : 100

  // Calculate base score using weighted factors
  let baseScore = 500 // Start with a middle score

  // Employment status impact (0-60 points)
  if (employmentStatus === 'full-time') baseScore += 60
  else if (employmentStatus === 'part-time') baseScore += 40
  else if (employmentStatus === 'self-employed') baseScore += 35
  else if (employmentStatus === 'unemployed') baseScore += 0
  else baseScore += 20 // Other situations

  // Credit utilization impact (0-100 points)
  if (numCreditUtilization <= 10) baseScore += 100
  else if (numCreditUtilization <= 30) baseScore += 80
  else if (numCreditUtilization <= 50) baseScore += 50
  else if (numCreditUtilization <= 70) baseScore += 25
  else baseScore += 0

  // Payment history impact (0-150 points)
  if (paymentHistory === 'excellent') baseScore += 150
  else if (paymentHistory === 'good') baseScore += 120
  else if (paymentHistory === 'fair') baseScore += 80
  else if (paymentHistory === 'poor') baseScore += 30
  else baseScore += 0

  // Credit history length impact (0-80 points)
  if (creditHistory === 'over_10_years') baseScore += 80
  else if (creditHistory === '5_10_years') baseScore += 65
  else if (creditHistory === '2_5_years') baseScore += 50
  else if (creditHistory === 'less_than_2_years') baseScore += 30
  else baseScore += 0

  // Debt-to-income impact (0-70 points)
  if (debtToIncomeRatio <= 10) baseScore += 70
  else if (debtToIncomeRatio <= 20) baseScore += 60
  else if (debtToIncomeRatio <= 30) baseScore += 50
  else if (debtToIncomeRatio <= 40) baseScore += 30
  else baseScore += 10

  // Recent inquiries impact (0-40 points)
  if (numRecentInquiries === 0) baseScore += 40
  else if (numRecentInquiries === 1) baseScore += 30
  else if (numRecentInquiries <= 3) baseScore += 20
  else if (numRecentInquiries <= 5) baseScore += 10
  else baseScore += 0

  // Ensure score is within range
  return Math.max(CREDIT_SCORE_RANGE.MIN, Math.min(baseScore, CREDIT_SCORE_RANGE.MAX))
}

/**
 * Apply additional risk adjustment factors for enterprise-level accuracy
 */
function applyRiskFactors(baseScore: number, data: any) {
  // Advanced risk assessment could be applied here
  // For now, we'll use a simplified version
  
  // Industry-based adjustment
  const industryRiskAdjustment = 0 // Would be based on economic data/industry risks
  
  // Geographic risk adjustment
  const geoRiskAdjustment = 0 // Would be based on regional economic factors
  
  // Apply adjustments (limited to ±20 points)
  let adjustedScore = baseScore + industryRiskAdjustment + geoRiskAdjustment
  adjustedScore = Math.max(CREDIT_SCORE_RANGE.MIN, Math.min(adjustedScore, CREDIT_SCORE_RANGE.MAX))
  
  return adjustedScore
}

/**
 * Generate human-readable factors explaining the score
 * This simulates SHAP values in a simplified form
 */
function generateScoreFactors(data: any, finalScore: number) {
  // In a real implementation, this would use SHAP or other explainability methods
  // For now, we'll create a simplified version that highlights key factors
  
  // Extract key features from application data
  const {
    creditUtilization = 30,
    monthlyDebt = 0,
    monthlyExpenses = 0,
    annualIncome = 0,
    employmentStatus = '',
    creditHistory = '',
    paymentHistory = '',
    recentInquiries = 0,
  } = data

  // Convert string values to numbers if needed
  const numCreditUtilization = Number(creditUtilization)
  const numMonthlyDebt = Number(monthlyDebt)
  const numMonthlyExpenses = Number(monthlyExpenses)
  const numAnnualIncome = Number(annualIncome)
  const numRecentInquiries = Number(recentInquiries)

  // Calculate importance factors
  const factors = [
    {
      name: "Payment History",
      impact: paymentHistory === 'excellent' ? "Very Positive" : 
              paymentHistory === 'good' ? "Positive" : 
              paymentHistory === 'fair' ? "Neutral" : "Negative",
      description: "Your history of making payments on time"
    },
    {
      name: "Credit Utilization",
      impact: numCreditUtilization <= 30 ? "Positive" : 
              numCreditUtilization <= 50 ? "Neutral" : "Negative",
      description: `You're using ${numCreditUtilization}% of your available credit`
    },
    {
      name: "Debt-to-Income",
      impact: (numMonthlyDebt + numMonthlyExpenses) / (numAnnualIncome/12) <= 0.3 ? 
              "Positive" : "Negative",
      description: "The ratio of your debt payments to income"
    },
    {
      name: "Credit History Length",
      impact: creditHistory === 'over_10_years' || creditHistory === '5_10_years' ? 
              "Positive" : "Neutral",
      description: "The length of time you've had credit accounts"
    },
    {
      name: "Recent Credit Inquiries",
      impact: numRecentInquiries <= 1 ? "Positive" : 
              numRecentInquiries <= 3 ? "Neutral" : "Negative",
      description: `You have ${numRecentInquiries} recent credit inquiries`
    }
  ]
  
  return factors
}

/**
 * Save score to database for record keeping
 */
async function saveScoreToDatabase(userId: string, score: number, factors: any, applicationData: any) {
  if (!isSupabaseConfigured()) return
  
  try {
    const { error } = await supabase
      .from('credit_scores')
      .insert({
        user_id: userId,
        score,
        factors,
        report_date: new Date().toISOString(),
      })
    
    if (error) {
      console.error('Error saving credit score to database:', error)
    }
  } catch (error) {
    console.error('Error in database operation:', error)
  }
}
