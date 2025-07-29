import { Check } from 'lucide-react';

interface CheckoutProgressProps {
  currentStep: 'cart' | 'checkout' | 'confirmation';
}

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  const steps = [
    { id: 'cart', label: 'Shopping Cart', completed: true },
    { id: 'checkout', label: 'Checkout', completed: currentStep === 'confirmation' },
    { id: 'confirmation', label: 'Order Confirmation', completed: currentStep === 'confirmation' }
  ];

  const getCurrentStepIndex = () => {
    switch (currentStep) {
      case 'cart': return 0;
      case 'checkout': return 1;
      case 'confirmation': return 2;
      default: return 0;
    }
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex || step.completed;
          
          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200
                    ${isCompleted 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : isActive 
                        ? 'border-primary text-primary bg-background' 
                        : 'border-muted-foreground text-muted-foreground bg-background'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span 
                  className={`
                    mt-2 text-xs font-medium text-center
                    ${isActive ? 'text-primary' : 'text-muted-foreground'}
                  `}
                >
                  {step.label}
                </span>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div 
                  className={`
                    w-16 h-0.5 mx-4 transition-all duration-200
                    ${index < currentStepIndex ? 'bg-primary' : 'bg-muted'}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
