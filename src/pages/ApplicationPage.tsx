
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase-client";
import { calculateCreditScore } from "@/services/creditScoring";
import { toast } from "@/hooks/use-toast";

import FormProgress from "@/components/application-form/FormProgress";
import PersonalInfoStep from "@/components/application-form/PersonalInfoStep";
import FinancialProfileStep from "@/components/application-form/FinancialProfileStep";
import LoanInformationStep from "@/components/application-form/LoanInformationStep";
import SubmissionStep from "@/components/application-form/SubmissionStep";

const steps = ["Personal Info", "Financial Profile", "Loan Information", "Review & Submit"];

const ApplicationPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      if (isSupabaseConfigured()) {
        const { data } = await supabase.auth.getSession();
        if (data?.session?.user) {
          setUserId(data.session.user.id);
        }
      }
    };
    
    checkAuth();
  }, []);
  
  const [formData, setFormData] = useState({
    // Personal Info
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
    
    // Financial Profile
    creditAccounts: "0",
    creditUtilization: "30",
    monthlyDebt: "0",
    monthlyExpenses: "0",
    creditHistory: "",
    paymentHistory: "",
    recentInquiries: "0",
    
    // Loan Information
    loanAmount: "",
    loanPurpose: "",
    loanTerm: "",
    hasCollateral: "no",
    collateralDescription: "",
    additionalInformation: "",
    
    // Submission
    termsAccepted: false,
    dataProcessingConsent: false,
    privacyPolicyAcknowledged: false,
  });

  const updateFormData = (stepData: any) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
  };

  const handleNext = (stepData: any) => {
    updateFormData(stepData);
    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Store application in database if authenticated
      let applicationId = null;
      
      if (isSupabaseConfigured() && userId) {
        // Save application to database
        const { data, error } = await supabase
          .from('credit_applications')
          .insert({
            user_id: userId,
            personal_info: {
              fullName: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              age: formData.age,
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode,
            },
            financial_details: {
              employmentStatus: formData.employmentStatus,
              annualIncome: formData.annualIncome,
              creditAccounts: formData.creditAccounts,
              creditUtilization: formData.creditUtilization,
              monthlyDebt: formData.monthlyDebt,
              monthlyExpenses: formData.monthlyExpenses,
              creditHistory: formData.creditHistory,
              paymentHistory: formData.paymentHistory,
              recentInquiries: formData.recentInquiries,
            },
            loan_info: {
              loanAmount: formData.loanAmount,
              loanPurpose: formData.loanPurpose,
              loanTerm: formData.loanTerm,
              hasCollateral: formData.hasCollateral,
              collateralDescription: formData.collateralDescription,
              additionalInformation: formData.additionalInformation,
            },
            status: 'submitted',
          })
          .select('id')
          .single();
          
        if (error) throw error;
        applicationId = data?.id;
      }
      
      // Calculate credit score using our enterprise-level service
      // Even for non-authenticated users, we provide a score estimate
      const effectiveUserId = userId || 'guest-user';
      const creditResult = await calculateCreditScore(formData, effectiveUserId);
      
      // Store the credit score in localStorage for retrieval on results page
      localStorage.setItem('creditScoreResult', JSON.stringify({
        score: creditResult.score,
        factors: creditResult.factors,
        applicationId
      }));
      
      toast({
        title: "Application Submitted",
        description: "Your credit score has been calculated successfully.",
      });
      
      // Navigate to results page
      navigate('/results');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "We encountered an error processing your application. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          <FormProgress steps={steps} currentStep={currentStep} />
          
          <div className="space-y-6 text-left">
            {currentStep === 0 && (
              <PersonalInfoStep 
                onNext={handleNext}
                defaultValues={{
                  fullName: formData.fullName,
                  email: formData.email,
                  phone: formData.phone,
                  age: formData.age,
                  employmentStatus: formData.employmentStatus,
                  annualIncome: formData.annualIncome,
                  address: formData.address,
                  city: formData.city,
                  state: formData.state,
                  zipCode: formData.zipCode,
                }}
              />
            )}
            
            {currentStep === 1 && (
              <FinancialProfileStep 
                onBack={handleBack}
                onNext={handleNext}
                defaultValues={{
                  creditAccounts: formData.creditAccounts,
                  creditUtilization: formData.creditUtilization,
                  monthlyDebt: formData.monthlyDebt,
                  monthlyExpenses: formData.monthlyExpenses,
                  creditHistory: formData.creditHistory,
                  paymentHistory: formData.paymentHistory,
                  recentInquiries: formData.recentInquiries,
                }}
              />
            )}
            
            {currentStep === 2 && (
              <LoanInformationStep 
                onBack={handleBack}
                onNext={handleNext}
                defaultValues={{
                  loanAmount: formData.loanAmount,
                  loanPurpose: formData.loanPurpose,
                  loanTerm: formData.loanTerm,
                  hasCollateral: formData.hasCollateral,
                  collateralDescription: formData.collateralDescription,
                  additionalInformation: formData.additionalInformation,
                }}
              />
            )}
            
            {currentStep === 3 && (
              <SubmissionStep 
                onBack={handleBack}
                onSubmit={handleSubmit}
                formData={formData}
                isLoading={isLoading}
                defaultValues={{
                  termsAccepted: formData.termsAccepted,
                  dataProcessingConsent: formData.dataProcessingConsent,
                  privacyPolicyAcknowledged: formData.privacyPolicyAcknowledged,
                }}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationPage;
