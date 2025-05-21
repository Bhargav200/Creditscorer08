
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase-client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Database } from '@/lib/supabase-types'
import { useToast } from '@/hooks/use-toast'
import { Award, ChevronRight, Clock, History, TrendingUp } from 'lucide-react'

type CreditScore = Database['public']['Tables']['credit_scores']['Row']
type CreditApplication = Database['public']['Tables']['credit_applications']['Row']

const DashboardPage = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [scores, setScores] = useState<CreditScore[]>([])
  const [applications, setApplications] = useState<CreditApplication[]>([])
  const [latestScore, setLatestScore] = useState<number | null>(null)
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      
      if (error || !data?.user) {
        navigate('/login')
        return
      }
      
      setUser(data.user)
      fetchUserData(data.user.id)
    }
    
    checkUser()
  }, [navigate])

  const fetchUserData = async (userId: string) => {
    try {
      setLoading(true)
      
      // Fetch credit scores
      const { data: scoreData, error: scoreError } = await supabase
        .from('credit_scores')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      
      if (scoreError) throw scoreError
      
      if (scoreData && scoreData.length > 0) {
        setScores(scoreData)
        setLatestScore(scoreData[0].score)
      } else {
        // For demo purposes, create a mock score if none exists
        const mockScore = {
          id: 'mock-1',
          created_at: new Date().toISOString(),
          user_id: userId,
          score: 720,
          factors: {
            payment_history: 'good',
            credit_utilization: 'medium',
            credit_age: 'excellent',
            new_credit: 'good'
          },
          report_date: new Date().toISOString()
        }
        setScores([mockScore as CreditScore])
        setLatestScore(mockScore.score)
      }
      
      // Fetch applications
      const { data: appData, error: appError } = await supabase
        .from('credit_applications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      
      if (appError) throw appError
      
      if (appData) {
        setApplications(appData)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      toast({
        variant: "destructive",
        title: "Error fetching data",
        description: "Could not load your dashboard data. Please try again later."
      })
    } finally {
      setLoading(false)
    }
  }

  // Mock data for chart if needed
  const mockScoreHistory = [
    { month: 'Jan', score: 680 },
    { month: 'Feb', score: 695 },
    { month: 'Mar', score: 710 },
    { month: 'Apr', score: 700 },
    { month: 'May', score: 715 },
    { month: 'Jun', score: 720 },
  ]
  
  // Credit score helper functions
  const getScoreCategory = (score: number | null) => {
    if (!score) return { text: 'No Score', color: 'text-gray-500' }
    if (score >= 800) return { text: 'Excellent', color: 'text-green-500' }
    if (score >= 740) return { text: 'Very Good', color: 'text-emerald-500' }
    if (score >= 670) return { text: 'Good', color: 'text-blue-500' }
    if (score >= 580) return { text: 'Fair', color: 'text-yellow-500' }
    return { text: 'Poor', color: 'text-red-500' }
  }

  const getScoreProgress = (score: number | null) => {
    if (!score) return 0
    return (score / 850) * 100
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mb-4 mx-auto"></div>
          <p className="text-lg text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const scoreCategory = getScoreCategory(latestScore)

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Credit Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Credit Score Overview */}
        <Card className="col-span-1 lg:col-span-2 bg-card/60 backdrop-blur-sm border border-border/30 overflow-hidden hover:border-primary/30 transition-all">
          <CardHeader>
            <CardTitle>Credit Score</CardTitle>
            <CardDescription>Your current credit standing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <div className="text-5xl font-bold">{latestScore || 'N/A'}</div>
                <div className={`text-lg font-medium mt-2 ${scoreCategory.color}`}>
                  {scoreCategory.text}
                </div>
                <div className="mt-3">
                  <Progress className="w-40 h-3" value={getScoreProgress(latestScore)} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Score range: 300-850
                </div>
              </div>
              
              <div className="w-full md:w-3/5 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={scores.length > 1 ? scores.map(s => ({ 
                      month: new Date(s.created_at).toLocaleDateString('en-US', { month: 'short' }),
                      score: s.score
                    })).reverse() : mockScoreHistory}
                    margin={{ top: 20, right: 10, left: 10, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis domain={[500, 850]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Factors */}
        <Card className="bg-card/60 backdrop-blur-sm border border-border/30 overflow-hidden hover:border-primary/30 transition-all">
          <CardHeader>
            <CardTitle>Score Factors</CardTitle>
            <CardDescription>Key elements affecting your score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scores.length > 0 && scores[0].factors ? (
                Object.entries(scores[0].factors as Record<string, string>).map(([factor, rating]) => (
                  <div key={factor} className="flex justify-between items-center">
                    <div>
                      <div className="capitalize">{factor.replace('_', ' ')}</div>
                      <div className={`text-sm ${rating === 'excellent' 
                        ? 'text-green-500' 
                        : rating === 'good' 
                          ? 'text-blue-500' 
                          : rating === 'medium' 
                            ? 'text-yellow-500' 
                            : 'text-red-500'}`}>
                        {rating.charAt(0).toUpperCase() + rating.slice(1)}
                      </div>
                    </div>
                    <div className="w-24">
                      <Progress 
                        value={rating === 'excellent' 
                          ? 100 
                          : rating === 'good' 
                            ? 75 
                            : rating === 'medium' 
                              ? 50 
                              : 25} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                ))
              ) : (
                // Default factors if none exist
                <>
                  <div className="flex justify-between items-center">
                    <div>
                      <div>Payment History</div>
                      <div className="text-sm text-blue-500">Good</div>
                    </div>
                    <div className="w-24">
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div>Credit Utilization</div>
                      <div className="text-sm text-yellow-500">Medium</div>
                    </div>
                    <div className="w-24">
                      <Progress value={50} className="h-2" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div>Credit Age</div>
                      <div className="text-sm text-green-500">Excellent</div>
                    </div>
                    <div className="w-24">
                      <Progress value={90} className="h-2" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div>New Credit</div>
                      <div className="text-sm text-blue-500">Good</div>
                    </div>
                    <div className="w-24">
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Recent Applications */}
        <Card className="col-span-1 bg-card/60 backdrop-blur-sm border border-border/30 overflow-hidden hover:border-primary/30 transition-all">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Your credit applications history</CardDescription>
          </CardHeader>
          <CardContent>
            {applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map(app => (
                  <div key={app.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-3 text-primary/70" />
                      <div>
                        <div className="font-medium">{(app.loan_info as any)?.purpose || 'Loan Application'}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(app.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        app.status === 'approved' ? 'bg-green-100 text-green-800' :
                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'declined' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </div>
                      <Button variant="ghost" size="icon" className="ml-1">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <History className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No applications yet</p>
                <Button className="mt-4" onClick={() => navigate('/apply')}>
                  Start New Application
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Score Improvement */}
        <Card className="col-span-1 lg:col-span-2 bg-card/60 backdrop-blur-sm border border-border/30 overflow-hidden hover:border-primary/30 transition-all">
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>How to improve your credit score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-background/50">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 mr-2 text-emerald-500" />
                  <h3 className="text-lg font-medium">Reduce Credit Utilization</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Try to keep your credit card balances below 30% of your total available credit limit.
                </p>
              </div>
              
              <div className="p-4 rounded-lg border border-border bg-background/50">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 mr-2 text-blue-500" />
                  <h3 className="text-lg font-medium">Build Credit History</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Keep older credit accounts open to maintain a longer credit history.
                </p>
              </div>
              
              <div className="p-4 rounded-lg border border-border bg-background/50">
                <div className="flex items-center mb-2">
                  <Award className="h-5 w-5 mr-2 text-yellow-500" />
                  <h3 className="text-lg font-medium">Avoid Late Payments</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Set up automatic payments or reminders to ensure all bills are paid on time.
                </p>
              </div>
              
              <div className="p-4 rounded-lg border border-border bg-background/50">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
                  <h3 className="text-lg font-medium">Diversify Credit Mix</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Having a mix of credit types (credit cards, loans, mortgage) can improve your score.
                </p>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-6">
              View Detailed Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
