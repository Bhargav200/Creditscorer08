
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">About Our Credit Scoring System</CardTitle>
          <CardDescription>Understanding how we assess creditworthiness.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Our Credit Scorer Application utilizes advanced machine learning algorithms and robust financial modeling techniques
            to provide accurate and fair credit assessments. We are committed to transparency and security in handling your financial data.
          </p>
          <h3 className="text-xl font-semibold">Key Features:</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Real-time scoring capabilities.</li>
            <li>Powered by sophisticated AI/ML models (Logistic Regression, Random Forest, and Gradient Boosting).</li>
            <li>Data preprocessing using Pandas and NumPy for accuracy.</li>
            <li>Secure data handling and storage.</li>
          </ul>
          <h3 className="text-xl font-semibold">Why Credit Scoring Matters:</h3>
          <p className="text-muted-foreground">
            Credit scoring is a critical component of the financial ecosystem. It enables lenders to assess the risk associated with
            lending to individuals or businesses, promoting responsible lending practices. For borrowers, a good credit score can
            unlock access to better loan terms, lower interest rates, and more financial opportunities.
          </p>
          <p className="text-muted-foreground">
            Machine learning enhances traditional credit scoring by analyzing vast amounts of data and identifying complex patterns
            that might be missed by conventional methods. This leads to more accurate predictions, reduced bias, and improved
            financial inclusion.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
