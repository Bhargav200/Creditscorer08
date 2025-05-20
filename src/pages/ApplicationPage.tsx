
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";

const ApplicationPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <Card className="max-w-3xl mx-auto bg-card/80 backdrop-blur-md border-border/60 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-bold text-primary text-glow">Credit Score Application</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Please fill out the secure form below to get your credit score.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Placeholder for the multi-step form */}
          <div className="space-y-6 text-left">
            <div>
              <Label htmlFor="fullName" className="text-base">Full Name</Label>
              <Input type="text" id="fullName" placeholder="Enter your full name" className="mt-1 bg-background/70 border-border focus:border-primary" />
            </div>
            <div>
              <Label htmlFor="email" className="text-base">Email Address</Label>
              <Input type="email" id="email" placeholder="Enter your email" className="mt-1 bg-background/70 border-border focus:border-primary" />
            </div>
            <div className="flex justify-center pt-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 drop-shadow-primary">
                Start Application
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center pt-4">
              <ShieldCheck className="inline h-4 w-4 mr-1 text-primary" /> Your information is encrypted and secure.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationPage;
