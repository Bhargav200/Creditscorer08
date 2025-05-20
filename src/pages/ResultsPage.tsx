
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ResultsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Your Credit Score Results</CardTitle>
          <CardDescription>Here is your credit assessment.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Credit score display and analysis will be shown here.</p>
          {/* Placeholder for results */}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsPage;
