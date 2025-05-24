import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, CheckCircle } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { submitApplication } from "@/services/applicationService";

const submissionSchema = z.object({
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  dataProcessingConsent: z.boolean().refine((val) => val === true, {
    message: "You must consent to data processing",
  }),
  privacyPolicyAcknowledged: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge the privacy policy",
  }),
});

type SubmissionStepProps = {
  onBack: () => void;
  onSubmit: () => void;
  formData: any;
  defaultValues: any;
  disabled?: boolean;
};

const SubmissionStep = ({ onBack, onSubmit, formData, defaultValues, disabled = false }: SubmissionStepProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const form = useForm<z.infer<typeof submissionSchema>>({
    resolver: zodResolver(submissionSchema),
    defaultValues: defaultValues || {
      termsAccepted: false,
      dataProcessingConsent: false,
      privacyPolicyAcknowledged: false,
    },
  });

  const handleSubmit = async (data: z.infer<typeof submissionSchema>) => {
    try {
      const result = await submitApplication(formData, user?.id);
      
      if (result.success) {
        toast({
          title: "Application Submitted",
          description: "Your credit score application has been submitted successfully!",
          duration: 5000,
        });
        
        // Navigate to results page
        setTimeout(() => {
          onSubmit();
          navigate("/results");
        }, 1000);
      } else {
        throw new Error("Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "There was an error submitting your application. Please try again.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="bg-secondary/30 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-primary">Application Summary</h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Personal Information</h4>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <p><span className="text-muted-foreground">Name:</span> {formData.fullName}</p>
                <p><span className="text-muted-foreground">Email:</span> {formData.email}</p>
                <p><span className="text-muted-foreground">Phone:</span> {formData.phone}</p>
                <p><span className="text-muted-foreground">Employment:</span> {formData.employmentStatus}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium">Financial Profile</h4>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <p><span className="text-muted-foreground">Credit Accounts:</span> {formData.creditAccounts}</p>
                <p><span className="text-muted-foreground">Credit Utilization:</span> {formData.creditUtilization}%</p>
                <p><span className="text-muted-foreground">Payment History:</span> {formData.paymentHistory}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium">Loan Information</h4>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <p><span className="text-muted-foreground">Loan Amount:</span> ${formData.loanAmount}</p>
                <p><span className="text-muted-foreground">Purpose:</span> {formData.loanPurpose}</p>
                <p><span className="text-muted-foreground">Term:</span> {formData.loanTerm}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I accept the terms and conditions of this credit score application.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dataProcessingConsent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I consent to the processing of my personal data for credit score calculation purposes.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="privacyPolicyAcknowledged"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I acknowledge that I have read and understood the privacy policy.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <p className="text-xs text-muted-foreground text-center pt-4 flex justify-center items-center">
          <ShieldCheck className="inline h-4 w-4 mr-1 text-primary" /> Your information is encrypted and secure.
        </p>

        <div className="flex justify-between pt-4">
          <Button 
            type="button" 
            variant="outline" 
            size="lg" 
            onClick={onBack}
            className="border-primary text-primary hover:bg-primary/10"
            disabled={disabled}
          >
            Back
          </Button>
          <Button 
            type="submit" 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 drop-shadow-primary flex items-center"
            disabled={disabled}
          >
            <CheckCircle className="mr-2 h-4 w-4" /> 
            {disabled ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SubmissionStep;
