
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, BarChart2, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend 
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { toast } from "@/hooks/use-toast";
import { supabase, isSupabaseConfigured } from "@/lib/supabase-client";

const ResultsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [creditScore, setCreditScore] = useState(0);
  const [scoreFactors, setScoreFactors] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      // Check if user is authenticated
      if (isSupabaseConfigured()) {
        const { data } = await supabase.auth.getSession();
        if (data?.session?.user) {
          setUserId(data.session.user.id);
        }
      }
    };
    fetchUserData();
  }, []);
  
  // Load score data on component mount
  useEffect(() => {
    // First try to get data from localStorage (from application)
    const loadScoreResult = () => {
      try {
        const resultData = localStorage.getItem('creditScoreResult');
        
        if (resultData) {
          const { score, factors, applicationId } = JSON.parse(resultData);
          setCreditScore(score);
          
          if (factors && factors.length) {
            // Map factors to score breakdown chart data
            const chartFactors = factors.map((factor: any, index: number) => {
              const colors = ["#1EAEDB", "#33C3F0", "#0FA0CE", "#7E69AB", "#6E59A5"];
              const values = [35, 30, 15, 10, 10]; // Default weighting
              
              return {
                name: factor.name,
                value: values[index] || 10,
                color: colors[index] || "#1EAEDB",
                impact: factor.impact,
                description: factor.description
              };
            });
            
            setScoreFactors(chartFactors);
          }
          
          // Generate recommendations based on score and factors
          generateRecommendations(score, factors);
        } else if (userId) {
          // If no local data but user is logged in, try to fetch from database
          fetchUserScoreHistory();
        } else {
          // No data available, show error and redirect
          toast({
            variant: "destructive",
            title: "No score data found",
            description: "Please complete an application first to view your results.",
          });
          navigate('/apply');
        }
      } catch (error) {
        console.error("Error loading score data:", error);
        toast({
          variant: "destructive",
          title: "Error loading results",
          description: "There was a problem loading your credit score results.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    // Fetch historical score data for authenticated users
    const fetchUserScoreHistory = async () => {
      if (!isSupabaseConfigured() || !userId) {
        setIsLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('credit_scores')
          .select('*')
          .eq('user_id', userId)
          .order('report_date', { ascending: true });
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Get most recent score
          const latestScore = data[data.length - 1];
          setCreditScore(latestScore.score);
          setScoreFactors(latestScore.factors?.map((factor: any, index: number) => ({
            ...factor,
            value: [35, 30, 15, 10, 10][index] || 10,
            color: ["#1EAEDB", "#33C3F0", "#0FA0CE", "#7E69AB", "#6E59A5"][index] || "#1EAEDB"
          })) || []);
          
          // Create trend data from history
          const history = data.map(item => ({
            month: new Date(item.report_date).toLocaleDateString('en-US', { month: 'short' }),
            score: item.score
          }));
          
          setTrendData(history);
          
          // Generate recommendations
          generateRecommendations(latestScore.score, latestScore.factors);
        } else {
          // No historical data found, redirect to application
          toast({
            variant: "warning",
            title: "No score data found",
            description: "Please complete an application first to view your results.",
          });
          navigate('/apply');
        }
      } catch (error) {
        console.error("Error fetching score history:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadScoreResult();
    
    // Generate sample trend data if none exists
    if (!trendData || trendData.length === 0) {
      const currentMonth = new Date().getMonth();
      const sampleTrend = [];
      
      // Generate sample trend over 6 months
      for (let i = 0; i < 6; i++) {
        const month = new Date(2023, currentMonth - (5 - i)).toLocaleDateString('en-US', { month: 'short' });
        const baseScore = Math.max(600, Math.min(creditScore - 60, 700)); // Start lower than current score
        const incrementPerMonth = (creditScore - baseScore) / 5; // Gradual improvement
        
        sampleTrend.push({
          month,
          score: Math.round(baseScore + (incrementPerMonth * i))
        });
      }
      
      setTrendData(sampleTrend);
    }
  }, [navigate, userId]);
  
  // Generate tailored recommendations based on score and factors
  const generateRecommendations = (score: number, factors: any[]) => {
    const baseRecommendations = [
      "Keep credit card balances below 30% of your limit",
      "Continue making payments on time to maintain your excellent payment history",
      "Avoid applying for new credit too frequently",
      "Consider diversifying your credit mix with different types of accounts",
    ];
    
    const customRecommendations: string[] = [];
    
    // Add factor-specific recommendations
    factors?.forEach(factor => {
      if (factor.impact === "Negative" || factor.impact === "Neutral") {
        switch (factor.name) {
          case "Payment History":
            customRecommendations.push("Set up automatic payments to ensure bills are paid on time");
            break;
          case "Credit Utilization":
            customRecommendations.push("Pay down credit card balances to reduce your utilization rate");
            break;
          case "Debt-to-Income":
            customRecommendations.push("Focus on paying off high-interest debt to improve your debt-to-income ratio");
            break;
          case "Recent Credit Inquiries":
            customRecommendations.push("Avoid applying for new credit for at least 6 months");
            break;
        }
      }
    });
    
    // Score-specific recommendations
    if (score < 650) {
      customRecommendations.push("Consider a secured credit card to rebuild your credit history");
      customRecommendations.push("Look into credit builder loans from credit unions");
    } else if (score < 700) {
      customRecommendations.push("Review your credit report for errors and dispute any inaccuracies");
      customRecommendations.push("Keep older credit accounts open to maintain your length of credit history");
    }
    
    // Use custom recommendations if available, otherwise use base recommendations
    setRecommendations(customRecommendations.length > 0 ? customRecommendations : baseRecommendations);
  };
  
  // Determine score rating and color
  const scoreRating = creditScore >= 750 ? "Excellent" : creditScore >= 700 ? "Good" : creditScore >= 650 ? "Fair" : "Needs Improvement";
  const scoreColor = creditScore >= 750 ? "text-green-400" : creditScore >= 700 ? "text-sky-400" : creditScore >= 650 ? "text-yellow-400" : "text-red-400";

  // Handle PDF download
  const downloadReport = () => {
    // In a real app, this would generate and download a PDF report
    toast({
      title: "Report Download Started",
      description: "Your credit score report PDF is being generated.",
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Report Download Complete",
        description: "Your credit score report has been downloaded.",
      });
    }, 2000);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-20 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Loading your credit score results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <Card className="max-w-4xl mx-auto bg-card/80 backdrop-blur-md border-border/60 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-bold text-primary text-glow">Your Credit Score Results</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Here is your comprehensive credit assessment with detailed analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-8 text-center">
            <p className="text-sm text-muted-foreground">Your Estimated Credit Score is</p>
            <p className={`text-7xl font-bold my-2 ${scoreColor} text-glow`}>{creditScore}</p>
            <p className={`text-2xl font-semibold ${scoreColor}`}>{scoreRating}</p>
            
            {/* Score range visualization */}
            <div className="relative h-8 w-full max-w-md mx-auto mt-6 bg-secondary/30 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-8 bg-primary/20 w-full"></div>
              <div className="absolute top-0 left-0 h-8 bg-primary" style={{width: `${(creditScore / 850) * 100}%`}}></div>
              <div className="absolute top-0 left-0 w-2 h-8 bg-white" style={{left: `${(creditScore / 850) * 100}%`}}></div>
              
              <div className="absolute top-10 left-0 text-xs">300</div>
              <div className="absolute top-10 left-1/2 -translate-x-1/2 text-xs">570</div>
              <div className="absolute top-10 right-0 text-xs">850</div>
            </div>
            
            <div className="flex justify-center space-x-6 mt-8 text-center text-xs">
              <div>
                <div className="w-4 h-4 bg-red-400 rounded-full mx-auto"></div>
                <p className="mt-1">Poor<br/>(300-579)</p>
              </div>
              <div>
                <div className="w-4 h-4 bg-yellow-400 rounded-full mx-auto"></div>
                <p className="mt-1">Fair<br/>(580-669)</p>
              </div>
              <div>
                <div className="w-4 h-4 bg-sky-400 rounded-full mx-auto"></div>
                <p className="mt-1">Good<br/>(670-739)</p>
              </div>
              <div>
                <div className="w-4 h-4 bg-green-400 rounded-full mx-auto"></div>
                <p className="mt-1">Excellent<br/>(740-850)</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            {/* Score Factors Chart */}
            <div className="text-left space-y-4 p-6 bg-secondary/30 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground flex items-center">
                <BarChart2 className="h-6 w-6 mr-2 text-primary" /> Score Breakdown
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={scoreFactors}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {scoreFactors.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                {scoreFactors.map((factor, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: factor.color }}></div>
                    {factor.name}: {factor.value}%
                    {factor.impact && (
                      <span className={`ml-2 text-xs ${
                        factor.impact === "Positive" ? "text-green-400" : 
                        factor.impact === "Negative" ? "text-red-400" : "text-yellow-400"
                      }`}>
                        ({factor.impact})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Score Trend Chart */}
            <div className="text-left space-y-4 p-6 bg-secondary/30 rounded-lg">
              <h3 className="text-xl font-semibold text-foreground flex items-center">
                <Info className="h-6 w-6 mr-2 text-primary" /> Score Trend
              </h3>
              <div className="h-64">
                <ChartContainer
                  config={{
                    score: { 
                      label: "Credit Score",
                      color: "#1EAEDB" 
                    }
                  }}
                >
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis domain={[600, 850]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line 
                      type="monotone"
                      dataKey="score"
                      name="Credit Score" 
                      stroke="var(--color-score, #1EAEDB)" 
                      activeDot={{ r: 8 }}
                      strokeWidth={3}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
              <p className="text-sm text-muted-foreground">
                {userId ? 
                  "Your credit score history over time." : 
                  "Example trend of credit score improvement over time."}
              </p>
            </div>
          </div>
          
          {/* Recommendations section */}
          <div className="text-left space-y-4 my-8 p-6 bg-secondary/30 rounded-lg">
            <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
              <CheckCircle className="h-6 w-6 mr-2 text-primary" />
              Recommendations to Improve Your Score
            </h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-3">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="pl-2">{recommendation}</li>
              ))}
            </ul>
          </div>
          
          {!userId && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertTriangle className="text-yellow-500 h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-yellow-500">Create an Account</p>
                <p className="text-sm text-muted-foreground mt-1">
                  To track your score improvements over time and get personalized recommendations, 
                  <a href="/login" className="text-primary hover:underline ml-1">sign up for an account</a>.
                </p>
              </div>
            </div>
          )}
          
          <p className="text-muted-foreground mb-6 text-center">
            This score is an estimate based on the information provided and our advanced AI models.
            For a detailed breakdown and personalized advice, download your full report.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 drop-shadow-primary"
              onClick={downloadReport}
            >
              <ArrowDown className="mr-2 h-5 w-5" /> Download Full Report (PDF)
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => navigate("/apply")}
            >
              Apply Again
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-8 text-center">
            Understanding your credit score is the first step towards financial empowerment.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsPage;
