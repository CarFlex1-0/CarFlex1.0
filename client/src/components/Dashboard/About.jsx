import React from 'react';
import { Card, Typography, Button } from '@mui/material';

const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src="../../../public/assets/images/test.png"
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="flex flex-col justify-between">
            <div className="pb-6">
              <Typography variant="h3" className="font-bold">
                <span className="bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
                  About{" "}
                </span>
                CarFlex
              </Typography>
              <Typography variant="body1" className="text-xl text-muted-foreground mt-4">
                CarFlex aims to provide users with a user-friendly and personalized experience for visualizing and customizing their vehicles. With a focus on user-friendly interfaces, reliability, and security, CarFlex sets out to cater to the needs of automotive enthusiasts; new and seasoned. Overall, CarFlex aims to redefine the automotive modification landscape by setting new standards in innovation, user experience, and industry relevance.
              </Typography>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};

const Statistics = () => {
  const stats = [
    {
      quantity: "2.7K+",
      description: "Users",
    },
    {
      quantity: "1.8K+",
      description: "Subscribers",
    },
    {
      quantity: "112",
      description: "Downloads",
    },
    {
      quantity: "4",
      description: "Products",
    },
  ];

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ quantity, description }) => (
          <Card key={description} className="space-y-2 text-center p-4">
            <Typography variant="h4" className="font-bold">{quantity}</Typography>
            <Typography variant="body1" className="text-muted-foreground">{description}</Typography>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default About ;
