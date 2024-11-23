import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "@services/axios";
import { Link } from "react-router-dom";
import { useAuth } from "@contexts/auth_context";
import { useCartStore } from "@store/cartStore";

export default function Success() {
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams(); // Destructure to get the params
  const { user } = useAuth();
  const { cart } = useCartStore();

  useEffect(() => {
    const confirmPayment = async () => {
      const paymentIntentId = searchParams.get("payment_intent"); // Now this should work
      if (paymentIntentId) {
        try {
          if(user){
            const response = await axiosInstance.post(
              "/transactions/confirm-payment",
              {
                paymentIntentId,
                user,
                cartId: cart.cart,
              }
            );
            if (response.data.success) {
              setTransactionStatus("Payment confirmed and transaction saved!");
              // navigate("/user/buy-parts"); // Redirect user to orders or home page
            } else {
              setTransactionStatus(
                "Payment confirmed but transaction saving failed."
              );
            }
          }
        } catch (error) {
          console.error("Error confirming payment:", error);
          setTransactionStatus("Payment confirmation failed.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setTransactionStatus("No payment intent found.");
        setIsLoading(false);
      }
    };

    confirmPayment();
  }, [searchParams, user, cart]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {isLoading ? (
        <div className="text-xl font-semibold">Confirming your payment...</div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold">{transactionStatus}</h2>
          {transactionStatus === "Payment confirmed and transaction saved!" && (
            <Link
              to="buy-parts"
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Go to Home
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
