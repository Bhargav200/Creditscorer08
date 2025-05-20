
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, BarChart2, Info } from "lucide-react";
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

const ResultsPage = () => {
  const navigate = useNavigate();
  
  // Placeholder score - in a real app, this would come from an API
  const creditScore = 750;
  const scoreRating = creditScore >= 750 ? "Excellent" : creditScore >= 700 ? "Good" : creditScore >= 650 ? "Fair" : "Needs Improvement";
  const scoreColor = creditScore >= 750 ? "text-green-400" : creditScore >= 700 ? "text-sky-400" : creditScore >= 650 ? "text-yellow-400" : "text-red-400";
  
  // Score breakdown data for charts
  const scoreFactors = [
    { name: "Payment History", value: 35, color: "#1EAEDB" },
    { name: "Credit Utilization", value: 30, color: "#33C3F0" },
    { name: "Length of History", value: 15, color: "#0FA0CE" },
    { name: "Credit Mix", value: 10, color: "#7E69AB" },
    { name: "New Credit", value: 10, color: "#6E59A5" },
  ];
  
  // Historical score trend data
  const trendData = [
    { month: "Jan", score: 690 },
    { month: "Feb", score: 705 },
    { month: "Mar", score: 720 },
    { month: "Apr", score: 735 },
    { month: "May", score: 742 },
    { month: "Jun", score: 750 },
  ];

  // Recommendations based on score
  const recommendations = [
    "Keep credit card balances below 30% of your limit",
    "Continue making payments on time to maintain your excellent payment history",
    "Avoid applying for new credit too frequently",
    "Consider diversifying your credit mix with different types of accounts",
  ];

  const downloadReport = () => {
    // In a real app, this would generate and download a PDF report
    alert("PDF report download would start in a real app");
  };

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
                {scoreFactors.map((factor) => (
                  <li key={factor.name} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: factor.color }}></div>
                    {factor.name}: {factor.value}%
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
                Your credit score has been improving steadily over the last 6 months.
              </p>
            </div>
          </div>
          
          {/* Recommendations section */}
          <div className="text-left space-y-4 my-8 p-6 bg-secondary/30 rounded-lg">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Recommendations to Improve Your Score
            </h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-3">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="pl-2">{recommendation}</li>
              ))}
            </ul>
          </div>
          
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
