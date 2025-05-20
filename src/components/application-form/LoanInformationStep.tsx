
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const loanInformationSchema = z.object({
  loanAmount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid loan amount",
  }),
  loanPurpose: z.string().min(1, "Please select a loan purpose"),
  loanTerm: z.string().min(1, "Please select a loan term"),
  hasCollateral: z.string(),
  collateralDescription: z.string().optional(),
  additionalInformation: z.string().optional(),
});

type LoanInformationStepProps = {
  onBack: () => void;
  onNext: (data: any) => void;
  defaultValues: any;
};

const LoanInformationStep = ({ onBack, onNext, defaultValues }: LoanInformationStepProps) => {
  const form = useForm<z.infer<typeof loanInformationSchema>>({
    resolver: zodResolver(loanInformationSchema),
    defaultValues: defaultValues || {
      loanAmount: "",
      loanPurpose: "",
      loanTerm: "",
      hasCollateral: "no",
      collateralDescription: "",
      additionalInformation: "",
    },
  });

  const watchHasCollateral = form.watch("hasCollateral");

  const handleSubmit = (data: z.infer<typeof loanInformationSchema>) => {
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="loanAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Loan Amount ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter loan amount"
                    className="mt-1 bg-background/70 border-border focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="loanPurpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Loan Purpose</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="mt-1 bg-background/70 border-border focus:border-primary">
                      <SelectValue placeholder="Select loan purpose" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="home">Home Purchase</SelectItem>
                    <SelectItem value="car">Vehicle Purchase</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                    <SelectItem value="medical">Medical Expenses</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="loanTerm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Loan Term</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="mt-1 bg-background/70 border-border focus:border-primary">
                      <SelectValue placeholder="Select loan term" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="6-months">6 months</SelectItem>
                    <SelectItem value="1-year">1 year</SelectItem>
                    <SelectItem value="2-years">2 years</SelectItem>
                    <SelectItem value="3-years">3 years</SelectItem>
                    <SelectItem value="5-years">5 years</SelectItem>
                    <SelectItem value="10-years">10 years</SelectItem>
                    <SelectItem value="15-years">15 years</SelectItem>
                    <SelectItem value="30-years">30 years</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasCollateral"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Do you have collateral?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="mt-1 bg-background/70 border-border focus:border-primary">
                      <SelectValue placeholder="Select yes or no" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {watchHasCollateral === "yes" && (
          <FormField
            control={form.control}
            name="collateralDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Describe your collateral</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the collateral you're offering (property, vehicle, etc.)"
                    className="mt-1 bg-background/70 border-border focus:border-primary resize-none h-24"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="additionalInformation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Additional Information (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any other information you'd like to provide about your loan request"
                  className="mt-1 bg-background/70 border-border focus:border-primary resize-none h-24"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between pt-4">
          <Button 
            type="button" 
            variant="outline" 
            size="lg" 
            onClick={onBack}
            className="border-primary text-primary hover:bg-primary/10"
          >
            Back
          </Button>
          <Button 
            type="submit" 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 drop-shadow-primary"
          >
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoanInformationStep;
