
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, BarChart2 } from "lucide-react"; // Icons for results page

const ResultsPage = () => {
  // Placeholder score
  const creditScore = 750;
  const scoreRating = creditScore >= 750 ? "Excellent" : creditScore >= 700 ? "Good" : creditScore >= 650 ? "Fair" : "Needs Improvement";
  const scoreColor = creditScore >= 750 ? "text-green-400" : creditScore >= 700 ? "text-sky-400" : creditScore >= 650 ? "text-yellow-400" : "text-red-400";


  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur-md border-border/60 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-bold text-primary text-glow">Your Credit Score Results</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Here is your comprehensive credit assessment.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 text-center">
          <div className="mb-8">
            <p className="text-sm text-muted-foreground">Your Estimated Credit Score is</p>
            <p className={`text-7xl font-bold my-2 ${scoreColor} text-glow`}>{creditScore}</p>
            <p className={`text-2xl font-semibold ${scoreColor}`}>{scoreRating}</p>
          </div>
          
          <div className="text-left space-y-4 my-8 p-6 bg-secondary/30 rounded-lg">
            <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
              <BarChart2 className="h-6 w-6 mr-2 text-primary" /> Key Factors
            </h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Payment History: Excellent</li>
              <li>Credit Utilization: Low</li>
              <li>Length of Credit History: Good</li>
              {/* More factors here */}
            </ul>
          </div>

          <p className="text-muted-foreground mb-6">
            This score is an estimate based on the information provided and our advanced AI models.
            For a detailed breakdown and personalized advice, download your full report.
          </p>
          
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 drop-shadow-primary">
            <ArrowDown className="mr-2 h-5 w-5" /> Download Full Report (PDF)
          </Button>

          <p className="text-xs text-muted-foreground mt-8">
            Understanding your credit score is the first step towards financial empowerment.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsPage;
