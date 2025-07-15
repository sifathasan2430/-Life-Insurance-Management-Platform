import { useState } from "react";

import { useLocation } from "react-router-dom";
import QuotePage from "../../Pages/QuotePage/QuotePage";
import CheckoutForm from "../../Pages/Payment/CheckoutForm/CheckoutForm";
import ApplicationForm from "../../Pages/ApplicationForm/ApplicationForm";
import ProgressBar from "./ProgressBar/ProgressBar";
import PaymentPage from "../../Pages/Payment/Payment";

const MultiStepForm = () => {
  const location = useLocation();
  const policyInfo = location.state;
  const [step, setStep] = useState(0);
  const steps = ["Quote", "Application", "Payment"];

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <ProgressBar step={step} steps={steps} />

      {step === 0 && <QuotePage nextStep={nextStep} policyInfo={policyInfo} />}
      {step === 1 && (
        <ApplicationForm
          nextStep={nextStep}
          prevStep={prevStep}
          policyInfo={policyInfo}
        />
      )}
      {step === 2 && <PaymentPage prevStep={prevStep} />}
    </div>
  );
};

export default MultiStepForm;