import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/Dashboard/Card";


const PopularPlanType = {
  NO: 0,
  YES: 1,
};

const pricingList = [
  {
    title: "Free",
    popular: 0,
    price: 0,
    description:
      "Get started for free. Limited functionality for casual car enthusiasts.",
    buttonText: "Get Started",
    benefitList: [
      "1 blog in 12 hours",
      "2 Car Parts Types for Overlay",
      "1 Team Member for Collaboration",
      "Limited Community support",
    ],
  },
  {
    title: "Premium",
    popular: 1,
    price: 1000,
    description:
      "Our most popular plan! Perfect for serious car enthusiasts.",
    buttonText: "Start Free Trial",
    benefitList: [
      "10 blogs in 12 hours",
      "Unlimited Car Parts Types for Overlay",
      "2 Team Member for Collaboration",
      "Unlimited Community support",
    ],
  },
  {
    title: "Enterprise",
    popular: 0,
    price: 1800,
    description:
      "Unlimited features for businesses and power users.",
    buttonText: "Contact Us",
    benefitList: [
      "Unlimited blogs in 12 hours",
      "Unlimited Car Parts Types for Overlay",
      "4 Team Members for Collaboration",
      "Unlimited Community support",
    ],
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Get
        <span className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
          {" "}
          Unlimited{" "}
        </span>
        Access
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        Unleash Your Car Vision - emphasizes the creative freedom CarFlex offers.
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingList.map((pricing) => (
          <Card
            key={pricing.title}
            className={
              pricing.popular === PopularPlanType.YES
                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <div className="bg-primary text-white rounded-full px-2 text-sm">
                    Most Popular
                  </div>
                ) : null}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">PKR {pricing.price}</span>
                <span className="text-muted-foreground"> /month</span>
              </div>
              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <button className="btn w-full">{pricing.buttonText}</button>
            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />

            <CardFooter className="flex">
              <div className="space-y-4">
                {pricing.benefitList.map((benefit) => (
                  <span key={benefit} className="flex">
                    <span className="text-green-500">✓</span>
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
