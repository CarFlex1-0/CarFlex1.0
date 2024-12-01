import React, { useEffect, useState } from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
import axiosInstance from "@services/axios";
import { useAuth } from "@contexts/auth_context";
import { useCartStore } from "@store/cartStore";

export default function Success() {
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams(); // Destructure to get the params
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart } = useCartStore(); // Add clearCart

 useEffect(() => {
   const confirmPayment = async () => {
     const paymentIntentId = searchParams.get("payment_intent");
      console.log('cart', cart)
     if (paymentIntentId) {
       try {
         // Check if cart exists and has items
         if (user && cart && cart.length > 0) {
          const cartItemsForBackend = cart.map((item) => ({
            prodId: item._id,
            // sellerId:item.seller,
            quantity: item.quantity,
          }));

          const response = await axiosInstance.post(
            "/transactions/confirm-payment",
            {
              paymentIntentId,
              buyerId: user._id,
              cart: cartItemsForBackend, // Send array of {_id, quantity}
              sellerId: cart[0].seller
            }
          );

           if (response.data.success) {
             setTransactionStatus("Payment confirmed and transaction saved!");
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
            <button
              onClick={()=>{
                navigate(-1);
              }}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Go to Home
            </button>
          )}
        </div>
      )}
    </div>
  );
}
