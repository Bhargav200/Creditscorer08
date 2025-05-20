
import { CheckCircle } from "lucide-react";

type FormProgressProps = {
  steps: string[];
  currentStep: number;
};

const FormProgress = ({ steps, currentStep }: FormProgressProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <div key={step} className="flex flex-col items-center flex-1">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 
                ${isActive ? "border-primary bg-primary/10 text-primary" : 
                  isCompleted ? "border-primary bg-primary text-primary-foreground" : 
                  "border-muted-foreground/30 text-muted-foreground"}
                mb-2 transition-all duration-200
              `}>
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span className={`text-xs font-medium ${
                isActive || isCompleted ? "text-primary" : "text-muted-foreground"
              }`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
      <div className="relative mt-2">
        <div className="absolute top-0 h-1 bg-muted-foreground/30 w-full"></div>
        <div 
          className="absolute top-0 h-1 bg-primary transition-all duration-300" 
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default FormProgress;
