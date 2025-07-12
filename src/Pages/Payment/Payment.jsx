import React from "react";

import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import MakePaymentPage from "./CheckoutForm/CheckoutForm";
import { Check } from "lucide-react";
import CheckoutForm from "./CheckoutForm/CheckoutForm";

// Replace with your real Stripe public key
const stripePromise = loadStripe("pk_test_51RhlJiIvwpUD3bp1kIxuw2aTvTrD7HHq3TzRDE79ykPqoju9icSGqEAsJDubjLr1bK1ErKUUoN7TUJCLvAwWA65j00WITJHTZ9");

const PaymentPage = () => {
  return (
 
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentPage;
