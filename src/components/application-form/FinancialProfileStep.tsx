
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const financialProfileSchema = z.object({
  creditAccounts: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Please enter a valid number",
  }),
  creditUtilization: z.string(),
  monthlyDebt: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Please enter a valid amount",
  }),
  monthlyExpenses: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Please enter a valid amount",
  }),
  creditHistory: z.string().min(1, "Please select your credit history length"),
  paymentHistory: z.string().min(1, "Please select your payment history"),
  recentInquiries: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Please enter a valid number",
  }),
});

type FinancialProfileStepProps = {
  onBack: () => void;
  onNext: (data: any) => void;
  defaultValues: any;
};

const FinancialProfileStep = ({ onBack, onNext, defaultValues }: FinancialProfileStepProps) => {
  const form = useForm<z.infer<typeof financialProfileSchema>>({
    resolver: zodResolver(financialProfileSchema),
    defaultValues: defaultValues || {
      creditAccounts: "0",
      creditUtilization: "30",
      monthlyDebt: "0",
      monthlyExpenses: "0",
      creditHistory: "",
      paymentHistory: "",
      recentInquiries: "0",
    },
  });

  const handleSubmit = (data: z.infer<typeof financialProfileSchema>) => {
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="creditAccounts"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Number of Credit Accounts</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter number of credit accounts"
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
            name="creditUtilization"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Credit Utilization (%)</FormLabel>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Slider
                      defaultValue={[Number(field.value)]}
                      max={100}
                      step={1}
                      onValueChange={(vals) => {
                        field.onChange(String(vals[0]));
                      }}
                      className="mt-1"
                    />
                  </FormControl>
                  <span className="bg-background/70 border border-border px-2 py-1 rounded text-sm w-12 text-center">
                    {field.value}%
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="monthlyDebt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Monthly Debt Payments ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter monthly debt payments"
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
            name="monthlyExpenses"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Monthly Expenses ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter monthly expenses"
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
            name="creditHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Length of Credit History</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="mt-1 bg-background/70 border-border focus:border-primary">
                      <SelectValue placeholder="Select credit history length" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="more-than-10">More than 10 years</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Payment History</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="mt-1 bg-background/70 border-border focus:border-primary">
                      <SelectValue placeholder="Select payment history" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="perfect">Perfect (no late payments)</SelectItem>
                    <SelectItem value="excellent">Excellent (1-2 late payments)</SelectItem>
                    <SelectItem value="good">Good (occasional late payments)</SelectItem>
                    <SelectItem value="fair">Fair (several late payments)</SelectItem>
                    <SelectItem value="poor">Poor (frequent late payments)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recentInquiries"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Recent Credit Inquiries (last 2 years)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter number of recent inquiries"
                    className="mt-1 bg-background/70 border-border focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

export default FinancialProfileStep;
