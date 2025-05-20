
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 18, {
    message: "You must be at least 18 years old",
  }),
  employmentStatus: z.string().min(1, "Please select your employment status"),
  annualIncome: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid income amount",
  }),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "Please enter a valid state"),
  zipCode: z.string().min(5, "Zip code must be at least 5 digits"),
});

type PersonalInfoStepProps = {
  onNext: (data: any) => void;
  defaultValues: any;
};

const PersonalInfoStep = ({ onNext, defaultValues }: PersonalInfoStepProps) => {
  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: defaultValues || {
      fullName: "",
      email: "",
      phone: "",
      age: "",
      employmentStatus: "",
      annualIncome: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof personalInfoSchema>) => {
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
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
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Age</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter your age"
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
            name="employmentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Employment Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="mt-1 bg-background/70 border-border focus:border-primary">
                      <SelectValue placeholder="Select employment status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="full-time">Full Time</SelectItem>
                    <SelectItem value="part-time">Part Time</SelectItem>
                    <SelectItem value="self-employed">Self Employed</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="annualIncome"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Annual Income ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter your annual income"
                    className="mt-1 bg-background/70 border-border focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your address"
                    className="mt-1 bg-background/70 border-border focus:border-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your city"
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
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">State</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your state"
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
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Zip Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your zip code"
                      className="mt-1 bg-background/70 border-border focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
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

export default PersonalInfoStep;
