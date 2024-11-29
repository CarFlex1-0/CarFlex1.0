import React, { useState } from "react";
import { MdShoppingCartCheckout } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axiosInstance from "@services/axios";
import { useAuth } from "@contexts/auth_context";
import CheckoutForm from "./CheckoutForm";
import { useCartStore } from "@store/cartStore";
const stripePromise = loadStripe(
  "pk_test_51Q1QpgRvj7mbFOgpvfcFuSGS4IfsHgpsllZldFxBtOcJIdfsXZZt14HdUhlYzPmtwliaCEvDYWFvpoQOK2FalADO00lmngkquk"
);
export default function Cart({ cart, updateQuantity, totalPrice }) {
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const {setCart} = useCartStore();
  const handleCheckOut = async () => {
    try {
     
      setCart(cart);
      
      const response = await axiosInstance.post(
        "/transactions/create-payment-intent",
        {
          cart,
          user,
        }
      );
      
      setClientSecret(response.data.clientSecret);
      // setCart([])
    } catch (error) {
      console.log("error", error);
    }
  };
  const appearance = {
    theme: "stripe",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";
  return (
    <div className="backdrop-blur-md bg-white/10 p-4 rounded-lg shadow-lg mt-12">
      <h2 className="text-2xl font-semibold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p className="">Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-4">
            {cart.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center mb-2"
              >
                <span className="flex-grow">
                  {item.name} (x{item.quantity})
                </span>
                <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>

                <div className="flex items-center ms-12">
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <p className="mx-2">{item.quantity}</p>
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-lg">
            <strong>Total Price:</strong> Rs. {totalPrice.toFixed(2)}
          </p>
          <div className="mt-6 flex justify-center">
            <button
              className="btn btn-wide bg-green-600 hover:bg-orange-600 text-white font-semibold"
              onClick={handleCheckOut}
            >
              <MdShoppingCartCheckout size={20} />
              Checkout
            </button>
          </div>
        </>
      )}
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
