
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ApplicationPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Credit Score Application</CardTitle>
          <CardDescription>Please fill out the form below to get your credit score.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">The multi-step application form will be implemented here.</p>
          {/* Placeholder for the form */}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationPage;
