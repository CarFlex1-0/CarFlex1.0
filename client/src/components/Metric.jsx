import React, { useEffect, useState } from "react";

const Metric = () => {
  const [cars, setCars] = useState(null);
  useEffect(() => {
    const fetchCars = async () => {
      const response = await fetch("http://localhost:5000/api/cars");
      const json = await response.json();
      if (response.ok) {
        setCars(json);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="flex items-center justify-center pt-6 pb-2">
      <div className="carousel rounded-box w-64 ">
        {cars &&
          cars.map((car) => {
            return (
              <div
                className="carousel-item w-full border border-white"
                key={car._id}
              >
                <h2 className="text-black text-center text-xl">
                  {car.general.brand}
                </h2>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                  className="w-full"
                  alt="Tailwind CSS Carousel component"
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Metric;
