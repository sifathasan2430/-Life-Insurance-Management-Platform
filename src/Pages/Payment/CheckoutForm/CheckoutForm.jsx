import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import Swal from "sweetalert2";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserAuthContext from "../../../Context/UserAuthContext";
import secureAxios from "../../../utils/firebaseAxios";


const CheckoutForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const stripe = useStripe()
  const elements = useElements();
  const { user } = useContext(UserAuthContext);

  // 1. Fetch payment by ID
  const {
    data: payment,
    isLoading: isPaymentLoading,
    error: paymentError,
  } = useQuery({
    queryKey: ["payment", id],
    queryFn: async () => {
      const res = await secureAxios.get(`/payments/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // 2. Create Stripe PaymentIntent
  const {
    data: intentData,
    isLoading: isIntentLoading,
    error: intentError,
  } = useQuery({
    queryKey: ["paymentIntent", payment?._id],
    queryFn: async () => {
      const res = await secureAxios.post("/create-payment-intent", {
        amount: payment?.amount * 100,
        currency: payment?.currency?.toLowerCase(),
        applicationId: payment?.applicationId,
        policyId: payment?.policyId,
        userEmail: user?.email,
      });
      return res.data;
    },
    enabled: !!payment && !!user?.email,
  });

  const clientSecret = intentData?.clientSecret;

  // 3. Handle Payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) return;

    // Create PaymentMethod
    const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (methodError) return;

    // Confirm Payment
    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });
    if (confirmError) return;

    if (paymentIntent.status === "succeeded") {
      try {
        // ✅ 1. Save payment as "Paid"
        await secureAxios.post(`/payments/${id}/confirm`, {
          paymentIntentId: paymentIntent.id,
          status: "Paid",
        });

        // ✅ 2. Update Policy to Active
        await secureAxios.patch(`policies/${payment.policyId}`, {
          isActive: true,
        });

        // ✅ 3. Show success and redirect
        Swal.fire({
          title: "Payment Successful",
          text: `You have paid ${payment.amount} ${payment.currency.toUpperCase()}`,
          icon: "success",
          confirmButtonText: "Go to Dashboard",
        }).then(() => navigate("/customer/dashboard/payment-status"));

      } catch (err) {
        console.error("Post-payment steps failed:", err);
      }
    }
  };

  if (isPaymentLoading || isIntentLoading)
    return <div className="text-center py-20">Loading...</div>;

  if (paymentError || intentError)
    return (
      <div className="text-center text-red-500">
        {paymentError?.message || intentError?.message}
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg p-8 rounded-xl mt-10 border">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#ff8c00]">
        Policy Payment Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Policy Title</label>
            <input
              type="text"
              value={payment.policyTitle}
              disabled
              className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="text"
              value={`${payment.amount} ${payment.currency.toUpperCase()}`}
              disabled
              className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Frequency</label>
            <input
              type="text"
              value={payment.paymentFrequency}
              disabled
              className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-700 capitalize"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Card Information</label>
            <div className="border p-3 rounded-md">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#32325d",
                      "::placeholder": { color: "#aab7c4" },
                    },
                    invalid: { color: "#9e2146" },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#ff8c00] hover:bg-[#e67c00] text-white"
          disabled={!stripe || !clientSecret || isIntentLoading}
        >
          {isIntentLoading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
          {isIntentLoading ? "Processing..." : `Pay ${payment.amount} ${payment.currency.toUpperCase()}`}
        </Button>
      </form>
      
    </div>
  );
};

export default CheckoutForm;
