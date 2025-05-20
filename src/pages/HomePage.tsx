
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Intelligent Credit Scoring
          </CardTitle>
          <CardDescription className="mt-4 text-lg leading-8 text-muted-foreground">
            Secure your financial future with our advanced, real-time credit assessment platform. Get accurate insights quickly and reliably.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <p className="mb-8 text-muted-foreground">
            Our system leverages cutting-edge machine learning models to provide fair and precise credit scores, helping you make informed financial decisions.
          </p>
          <Link to="/apply">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Apply for Credit Score
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Fast & Accurate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Receive your credit assessment in minutes with high precision.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Secure & Confidential</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Your data is protected with enterprise-grade security measures.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Transparent Process</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Understand the factors influencing your score.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
