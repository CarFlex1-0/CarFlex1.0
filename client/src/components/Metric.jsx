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
    <div className="flex items-center justify-center pt-6 pb-6">
      <div className="carousel w-64 ">
        {cars &&
          cars.map((car) => {
            return (
              <div className="carousel-item w-full" key={car._id}>
                <div className="relative group cursor-pointer overflow-hidden duration-500 w-64 h-80 bg-zinc-800 text-gray-50 p-5">
                  <div className="">
                    <div className="group-hover:scale-110 w-full h-60 bg-blue-400 duration-500" />
                    <div className="absolute w-56 left-0 p-5 -bottom-16 duration-500 group-hover:-translate-y-12">
                      <div className="absolute -z-10 left-0 w-64 h-28 opacity-0 duration-500 group-hover:opacity-50 group-hover:bg-blue-900" />
                      <span className="text-xl font-bold">
                        {car.general.brand}
                      </span>
                      <p className="group-hover:opacity-100 w-56 duration-500 opacity-0">
                        {car.general.model}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Metric;
