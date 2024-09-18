// services/performanceMetricsServices
const Car = require("../models/car");
const {
  mphToMps,
  checkForMissingValuesMetric1,
  checkForMissingValuesMetric2,
} = require("./helpers");

async function getCarById(id) {
  try {
    const car = await Car.findById(id).exec();
    if (!car) {
      throw new Error("Car not found");
    }
    return car;
  } catch (error) {
    console.error("Error fetching car:", error);
    throw error;
  }
}

async function metricFunction1(id) {
  try {
    const car = await getCarById(id);

    // Check for missing values
    const missingField = checkForMissingValuesMetric1(car);
    if (missingField) {
      console.error("Error: ", missingField);
      throw new Error(missingField);
    }

    // Extract values
    const power = car.engine.power.value; // in Hp
    const kerbWeight = car.engine.kerbWeight.value + 70; // in kg
    const stockAcceleration = car.performance.acceleration.value; // in seconds for 0-60 mph
    const dragCoefficient = car.dimensions.dragCoefficient.value; // dimensionless

    // Validate extracted values
    if (!power || !kerbWeight || !stockAcceleration || !dragCoefficient) {
      const missingData = !power
        ? "Power"
        : !kerbWeight
        ? "Kerb Weight"
        : !stockAcceleration
        ? "Stock Acceleration"
        : "Drag Coefficient";
      console.error(`Error: Missing ${missingData}`);
      throw new Error("Required data for calculation is missing.");
    }

    console.log(`Power (Hp): ${power}`);
    console.log(`Kerb Weight (kg): ${kerbWeight}`);
    console.log(
      `Stock Acceleration (seconds for 0-60 mph): ${stockAcceleration}`
    );
    console.log(`Drag Coefficient: ${dragCoefficient}`);

    // Convert power to watts
    const powerWatts = power * 745.7; // 1 Hp = 745.7 watts
    console.log(`Converted Power (Watts): ${powerWatts}`);

    // Convert 60 mph to meters per second
    const velocityMps = mphToMps(60); // 60 mph to m/s
    console.log(`Velocity (m/s): ${velocityMps}`);

    // Calculate acceleration using a more realistic approach
    const accelerationTime = Math.sqrt(
      (2 * kerbWeight * Math.pow(velocityMps, 2)) /
        (powerWatts * (1 - dragCoefficient))
    );

    console.log(
      `Calculated 0-60 time (seconds): ${accelerationTime.toFixed(2)}`
    );
    console.log(`Stock 0-60 time: ${stockAcceleration}`);

    return {
      stock_Acceleration_Time: stockAcceleration.toFixed(2),
      calculated_Acceleration_Time: accelerationTime.toFixed(2),
    };
  } catch (error) {
    console.error("Error in metricFunction1:", error);
    throw error;
  }
}

async function metricFunction2(id) {
  try {
    const car = await getCarById(id);

    // Check for missing values
    const missingField = checkForMissingValuesMetric2(car);
    if (missingField) {
      console.error("Error: ", missingField);
      throw new Error(missingField);
    }

    // Extract values
    const power = car.engine.power.value; // in Hp
    const dragCoefficient = car.dimensions.dragCoefficient.value; // dimensionless
    const width = car.dimensions.width.value / 1000; // mm to meters
    const height = car.dimensions.height.value / 1000; // mm to meters
    const stockMaxSpeed = car.performance.maxSpeed.value; // in km/h

    // Convert power to watts
    const powerWatts = power * 746; // 1 Hp = 746 watts
    console.log(`Power (Hp): ${power}`);
    console.log(`Converted Power (Watts): ${powerWatts}`);

    // Calculate projected area
    const area = width * height;
    console.log(`Projected Area (m²): ${area}`);

    // Air density (kg/m³)
    const airDensity = 1.25;
    console.log(`Air Density (kg/m³): ${airDensity}`);

    // Calculate maximum speed
    const maxSpeedMps = Math.cbrt(
      (2 * powerWatts) / (dragCoefficient * airDensity * area)
    );
    const maxSpeedKph = maxSpeedMps * 3.6; // m/s to km/h

    console.log(`Calculated Max Speed (km/h): ${maxSpeedKph.toFixed(2)}`);

    return {
      stock_Max_Speed_kph: stockMaxSpeed.toFixed(2),
      calculated_max_Speed_Kph: maxSpeedKph.toFixed(2),
    };
  } catch (error) {
    console.error("Error in metricFunction2:", error);
    throw error;
  }
}

// async function metricFunction3(id) {
//   try {
//     const car = await getCarById(id);

//     // Check for missing values
//     if (!car || !car.engine || !car.engine.torque || !car.engine.power) {
//       throw new Error("Required car values for Metric 3 are missing");
//     }

//     // Extract values
//     const torqueNm = car.engine.torque.value; // in Nm
//     const rpm = car.engine.torque.rpm; // Engine RPM
//     const givenPowerHp = car.engine.power.value; // in Hp (Given)

//     // Convert torque from Nm to lb-ft
//     const torqueLbFt = torqueNm * 0.73756;

//     // Calculate horsepower
//     const calculatedHorsepower = (torqueLbFt * rpm) / 5252;

//     // Compare calculated horsepower with the given value
//     const powerDifference = Math.abs(calculatedHorsepower - givenPowerHp);

//     console.log(`Given Horsepower (Hp): ${givenPowerHp}`);
//     console.log(
//       `Calculated Horsepower (Hp): ${calculatedHorsepower.toFixed(2)}`
//     );
//     console.log(`Difference in Horsepower (Hp): ${powerDifference.toFixed(2)}`);

//     return {
//       givenHorsepower: givenPowerHp.toFixed(2),
//       calculatedHorsepower: calculatedHorsepower.toFixed(2),
//       powerDifference: powerDifference.toFixed(2),
//     };
//   } catch (error) {
//     console.error("Error in metricFunction3:", error);
//     throw error;
//   }
// }
async function metricFunction3(id) {
  try {
    const car = await getCarById(id);

    // Extract values
    const torqueNm = car.engine.torque.value; // in Nm
    const rpm = car.engine.torque.rpm; // in RPM
    const givenHorsepower = car.engine.power.value; // in Hp

    // Convert torque from Nm to lb-ft
    const torqueLbFt = torqueNm * 0.73756;

    // Calculate horsepower
    const calculatedHorsepower = (torqueLbFt * rpm) / 5252;

    // Calculate power difference
    const powerDifference = givenHorsepower - calculatedHorsepower;

    return {
      stock_Horsepower: givenHorsepower.toFixed(2),
      calculated_Horsepower: calculatedHorsepower.toFixed(2),
    };
  } catch (error) {
    console.error("Error in metricFunction3:", error);
    throw error;
  }
}

async function metricFunction4(id) {
  try {
    const car = await getCarById(id);

    // Extract values
    const numberOfCylinders = car.engine.numberOfCylinders; // Number of cylinders
    const boreDiameterInMm = car.engine.bore.value; // Bore diameter in mm
    const pistonStrokeInMm = car.engine.stroke.value; // Stroke length in mm
    const originalDisplacementCc = car.engine.displacement.value; // Original displacement in cm³

    // Validate extracted values
    if (
      numberOfCylinders === undefined ||
      boreDiameterInMm === undefined ||
      pistonStrokeInMm === undefined ||
      originalDisplacementCc === undefined
    ) {
      throw new Error("Missing required engine parameters for calculations.");
    }

    // Convert measurements from mm to cm for displacement calculation
    const boreInCm = boreDiameterInMm / 10; // Convert mm to cm
    const strokeInCm = pistonStrokeInMm / 10; // Convert mm to cm

    // Calculate engine displacement in cubic centimeters (cc)
    const calculatedDisplacementCc = (
      Math.pow(boreInCm / 2, 2) *
      Math.PI *
      strokeInCm *
      numberOfCylinders
    ).toFixed(2);

    // Compare calculated displacement with original displacement
    const displacementDifference = Math.abs(
      originalDisplacementCc - calculatedDisplacementCc
    );

    // Return the results
    return {
      stock_Displacement_Cc: originalDisplacementCc.toFixed(2),
      calculated_Displacement_Cc: calculatedDisplacementCc,
      // Difference in displacement
    };
  } catch (error) {
    console.error("Error in metricFunction4:", error);
    throw error;
  }
}

async function metricFunction5(id) {
  try {
    const car = await getCarById(id);

    // Extract values
    const powerHp = car.engine.power.value; // Power in Hp
    const rpm = car.engine.power.rpm; // RPM
    const givenMaxTorqueNm = car.engine.torque.value; // Given max torque in Nm

    // Validate extracted values
    if (
      powerHp === undefined ||
      rpm === undefined ||
      givenMaxTorqueNm === undefined
    ) {
      throw new Error(
        "Missing required engine parameters for torque calculation."
      );
    }

    // Calculate maximum torque in lb-ft
    const torqueLbFt = (powerHp * 5252) / rpm;

    // Convert torque from lb-ft to Nm
    const torqueNm = torqueLbFt * 1.35582;

    // Compare calculated torque with given torque
    const torqueDifference = Math.abs(givenMaxTorqueNm - torqueNm);

    // Return the results
    return {
      stock_Max_Torque_Nm: givenMaxTorqueNm.toFixed(2), // Given torque in Nm
      calculated_Max_Torque_Nm: torqueNm.toFixed(2), // Calculated torque in Nm
    };
  } catch (error) {
    console.error("Error in metricFunction5:", error);
    throw error;
  }
}

async function metricFunction6(id) {
  try {
    const car = await getCarById(id);
    // Your custom logic here
    return {
      metric: "Metric 6 value", // Replace with actual metric calculation
    };
  } catch (error) {
    console.error("Error in metricFunction6:", error);
    throw error;
  }
}

module.exports = {
  metricFunction1,
  metricFunction2,
  metricFunction3,
  metricFunction4,
  metricFunction5,
  metricFunction6,
};
