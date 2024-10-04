import React, { useEffect, useState } from "react";
import axiosInstance from "@services/axios";
import { useAuth } from "@contexts/auth_context";
import { FaCheck } from "react-icons/fa";

const SubscriptionSelect = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const { user, drawerState } = useAuth();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const { data } = await axiosInstance.get("/subscriptions");
        if (Array.isArray(data)) {
          setSubscriptions(data);
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };
    fetchSubscriptions();
  }, []);

  const handleCheckout = async (priceId, planName) => {
    const { data } = await axiosInstance.post(
      "/payment/create-checkout-session",
      { priceId, planName, userId: user._id }
    );
    window.location.href = data.url; // Redirect to Stripe checkout
  };

  const subscriptionDetails = [
    {
      name: "Basic",
      price: "$ 5",
      period: "/month",
      description:
        "Get started for free. Limited functionality for casual car enthusiasts.",
      features: [
        "1 blog in 12 hours",
        "2 Car Parts Types for Overlay",
        "1 Team Member for Collaboration",
        "Limited Community support",
      ],
      popular: false,
    },
    {
      name: "Standard",
      price: "$ 10",
      period: "/month",
      description:
        "Our most popular plan! Perfect for serious car enthusiasts.",
      features: [
        "10 blogs in 12 hours",
        "Unlimited Car Parts Types for Overlay",
        "2 Team Members for Collaboration",
        "Unlimited Community support",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "$ 15",
      period: "/month",
      description: "Unlimited features for businesses and power users.",
      features: [
        "Unlimited blogs in 12 hours",
        "Unlimited Car Parts Types for Overlay",
        "4 Team Members for Collaboration",
        "Unlimited Community support",
      ],
      popular: false,
    },
  ];

  return (
    <div className={drawerState ? "blur bg-blue-950" : ""}>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl text-center text-white mb-8">
            Choose Your Subscription
          </h1>
          <p className="text-xl text-center text-white mb-12">
            Select the plan that best fits your needs and start your car
            enthusiast journey today!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {subscriptionDetails.map((sub, index) => (
              <div
                key={index}
                className={` bg-white/20 backdrop-blur-md rounded-lg shadow-lg overflow-hidden ${
                  sub.popular ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {sub.popular && (
                  <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h2 className="text-2xl text-white mb-2">{sub.name}</h2>
                  <p className="text-white mb-4">{sub.description}</p>
                  <p className="mt-4">
                    <span className="text-4xl font-extrabold text-white">
                      {sub.price}
                    </span>
                    <span className="text-white">{sub.period}</span>
                  </p>
                  <ul className="mt-6 space-y-4">
                    {sub.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <FaCheck className="flex-shrink-0 h-5 w-5 text-green-500 mt-1" />
                        <span className="ml-3 text-white">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      const subscription = subscriptions.find(
                        (s) => s.name.toLowerCase() === sub.name.toLowerCase()
                      );
                      if (subscription) {
                        handleCheckout(
                          subscription.stripePriceId,
                          subscription.name
                        );
                      } else {
                        console.error("Subscription not found:", sub.name);
                      }
                    }}
                    className={`mt-8 w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition duration-200 ${
                      sub.popular ? "bg-blue-600 hover:bg-blue-700" : ""
                    }`}
                  >
                    {sub.name === "Free" ? "Get Started" : "Subscribe Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSelect;
