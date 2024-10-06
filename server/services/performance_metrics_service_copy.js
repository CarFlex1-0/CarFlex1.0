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

async function metricFunction1(id, bodyData) {
  try {
    const car = await getCarById(id);

    // Check for missing values
    const missingField = checkForMissingValuesMetric1(car);
    if (missingField) {
      console.error("Error: ", missingField);
      throw new Error(missingField);
    }

    // Extract values from the database
    const powerDb = car.engine.power.value; // in Hp
    const kerbWeightDb = car.engine.kerbWeight.value + 70; // in kg
    const stockAccelerationDb = car.performance.acceleration.value; // in seconds for 0-60 mph
    const dragCoefficientDb = car.dimensions.dragCoefficient.value; // dimensionless

    // Validate extracted values
    if (
      !powerDb ||
      !kerbWeightDb ||
      !stockAccelerationDb ||
      !dragCoefficientDb
    ) {
      const missingData = !powerDb
        ? "Power"
        : !kerbWeightDb
        ? "Kerb Weight"
        : !stockAccelerationDb
        ? "Stock Acceleration"
        : "Drag Coefficient";
      console.error(`Error: Missing ${missingData}`);
      throw new Error("Required data for calculation is missing.");
    }

    console.log(`Power (Hp): ${powerDb}`);
    console.log(`Kerb Weight (kg): ${kerbWeightDb}`);
    console.log(
      `Stock Acceleration (seconds for 0-60 mph): ${stockAccelerationDb}`
    );
    console.log(`Drag Coefficient: ${dragCoefficientDb}`);

    // Extract values from the request body
    const {
      power: powerBody,
      kerbWeight: kerbWeightBody,
      dragCoefficient: dragCoefficientBody,
    } = bodyData;

    // Calculate with DB values
    const powerWattsDb = powerDb * 745.7; // 1 Hp = 745.7 watts
    const velocityMps = mphToMps(60); // 60 mph to m/s
    const accelerationTimeDb = Math.sqrt(
      (2 * kerbWeightDb * Math.pow(velocityMps, 2)) /
        (powerWattsDb * (1 - dragCoefficientDb))
    );

    // Calculate with request body values
    const powerWattsBody = powerBody * 745.7; // Convert to watts
    const kerbWeightBodyWithDriver = kerbWeightBody + 70; // Adding 70kg for driver
    const accelerationTimeBody = Math.sqrt(
      (2 * kerbWeightBodyWithDriver * Math.pow(velocityMps, 2)) /
        (powerWattsBody * (1 - dragCoefficientBody))
    );

    console.log("AAAACC", accelerationTimeBody)
    return {
      // calculated_Acceleration_Time_DB: accelerationTimeDb.toFixed(2), // Calculated using DB
      calculated_Acceleration_Time_Body: accelerationTimeBody.toFixed(2), // Calculated using body values
    };
  } catch (error) {
    console.error("Error in metricFunction1:", error);
    throw error;
  }
}

async function metricFunction2(id, bodyData) {
  try {
    const car = await getCarById(id);

    // Check for missing values
    const missingField = checkForMissingValuesMetric2(car);
    if (missingField) {
      console.error("Error: ", missingField);
      throw new Error(missingField);
    }

    // DB Values
    const power = car.engine.power.value; // in Hp
    const dragCoefficient = car.dimensions.dragCoefficient.value; // dimensionless
    const width = car.dimensions.width.value / 1000; // mm to meters
    const height = car.dimensions.height.value / 1000; // mm to meters

    // Body Values (from the request)
    const {
      power: bodyPower,
      dragCoefficient: bodyDragCoefficient,
      width: bodyWidth,
      height: bodyHeight
    } = bodyData;

    // Convert DB power to watts
    const powerWatts = power * 746; // 1 Hp = 746 watts
    console.log(`DB Power (Hp): ${power}`);
    console.log(`DB Converted Power (Watts): ${powerWatts}`);

    // Calculate projected area (DB values)
    const area = width * height;
    console.log(`DB Projected Area (m²): ${area}`);

    // Air density (kg/m³)
    const airDensity = 1.25;
    console.log(`Air Density (kg/m³): ${airDensity}`);

    // Calculate max speed from DB values
    const maxSpeedMps = Math.cbrt(
      (2 * powerWatts) / (dragCoefficient * airDensity * area)
    );
    const maxSpeedKph = maxSpeedMps * 3.6; // m/s to km/h

    console.log(`DB Calculated Max Speed (km/h): ${maxSpeedKph.toFixed(2)}`);

    // Calculate max speed from Body values
    const bodyPowerWatts = bodyPower * 746;
    const bodyArea = (bodyWidth / 1000) * (bodyHeight / 1000); // Convert to meters
    const bodyMaxSpeedMps = Math.cbrt(
      (2 * bodyPowerWatts) / (bodyDragCoefficient * airDensity * bodyArea)
    );
    const bodyMaxSpeedKph = bodyMaxSpeedMps * 3.6; // m/s to km/h

    console.log(`Body Calculated Max Speed (km/h): ${bodyMaxSpeedKph.toFixed(2)}`);

    return {
      // stock_Max_Speed_kph: stockMaxSpeed.toFixed(2), // From DB
      // calculated_max_Speed_Kph_DB: maxSpeedKph.toFixed(2), // Calculated from DB values
      calculated_max_Speed_Kph_Body: bodyMaxSpeedKph.toFixed(2), // Calculated from body (provided) values
    };
  } catch (error) {
    console.error("Error in metricFunction2:", error);
    throw error;
  }
}

async function metricFunction3(id, bodyData) {
  try {
    const car = await getCarById(id);

    // Extract values from DB
    const torqueNm = car.engine.torque.value; // in Nm
    const rpm = car.engine.torque.rpm; // in RPM
    // const givenHorsepower = car.engine.power.value; // in Hp

    // Calculate horsepower using DB values
    const torqueLbFt = torqueNm * 0.73756; // Convert torque from Nm to lb-ft
    const calculatedHorsepowerDB = (torqueLbFt * rpm) / 5252;

    // Calculate power difference (optional)
    // const powerDifference = givenHorsepower - calculatedHorsepowerDB;

    // Calculate horsepower using Body values (from the request)
    const { torque: bodyTorqueNm, rpm: bodyRpm } = bodyData;

    // Convert body torque from Nm to lb-ft
    const bodyTorqueLbFt = bodyTorqueNm * 0.73756;

    // Calculate horsepower using body values
    const calculatedHorsepowerBody = (bodyTorqueLbFt * bodyRpm) / 5252;

    return {
      // calculated_Horsepower_DB: calculatedHorsepowerDB.toFixed(2), // Calculated from DB values
      calculated_Horsepower_Body: calculatedHorsepowerBody.toFixed(2), // Calculated from body (provided) values
      // power_difference: powerDifference.toFixed(2) // Include the power difference if needed
    };
  } catch (error) {
    console.error("Error in metricFunction3:", error);
    throw error;
  }
}


async function metricFunction4(id, bodyData) {
  try {
    const car = await getCarById(id);

    // Extract values from DB
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

    // Convert measurements from mm to cm for displacement calculation (DB Values)
    const boreInCm = boreDiameterInMm / 10; // Convert mm to cm
    const strokeInCm = pistonStrokeInMm / 10; // Convert mm to cm

    // Calculate engine displacement in cubic centimeters (cc) using DB values
    const calculatedDisplacementCc = (
      Math.pow(boreInCm / 2, 2) *
      Math.PI *
      strokeInCm *
      numberOfCylinders
    ).toFixed(2);

    // Calculate engine displacement using Body values (from the request)
    const { bodyNumberOfCylinders, bodyBoreDiameter, bodyPistonStroke } = bodyData;

    // Validate body values
    if (
      bodyNumberOfCylinders === undefined ||
      bodyBoreDiameter === undefined ||
      bodyPistonStroke === undefined
    ) {
      throw new Error("Missing required body parameters for calculations.");
    }

    // Convert body measurements from mm to cm for displacement calculation
    const bodyBoreInCm = bodyBoreDiameter / 10; // Convert mm to cm
    const bodyStrokeInCm = bodyPistonStroke / 10; // Convert mm to cm

    // Calculate engine displacement in cubic centimeters (cc) using Body values
    const calculatedBodyDisplacementCc = (
      Math.pow(bodyBoreInCm / 2, 2) *
      Math.PI *
      bodyStrokeInCm *
      bodyNumberOfCylinders
    ).toFixed(2);

    // Compare calculated displacement with original displacement
    const displacementDifference = Math.abs(
      originalDisplacementCc - calculatedDisplacementCc
    );

    // Return the results
    return {
      // stock_Displacement_Cc: originalDisplacementCc.toFixed(2), // From DB
      // calculated_Displacement_Cc_DB: calculatedDisplacementCc, // Calculated from DB values
      calculated_Displacement_Cc_Body: calculatedBodyDisplacementCc, // Calculated from body (provided) values
      // displacement_difference: displacementDifference.toFixed(2) // Difference in displacement
    };
  } catch (error) {
    console.error("Error in metricFunction4:", error);
    throw error;
  }
}

async function metricFunction5(id, bodyData) {
  try {
    const car = await getCarById(id);

    // Extract values from DB
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

    // Calculate maximum torque in lb-ft using DB values
    const torqueLbFt = (powerHp * 5252) / rpm;
    
    // Convert torque from lb-ft to Nm
    const torqueNm = torqueLbFt * 1.35582;

    // Compare calculated torque with given torque
    const torqueDifference = Math.abs(givenMaxTorqueNm - torqueNm);

    // Calculate torque using Body values (from the request)
    const { bodyPowerHp, bodyRpm } = bodyData;

    // Validate body values
    if (bodyPowerHp === undefined || bodyRpm === undefined) {
      throw new Error("Missing required body parameters for torque calculation.");
    }

    // Calculate maximum torque in lb-ft using Body values
    const bodyTorqueLbFt = (bodyPowerHp * 5252) / bodyRpm;
    
    // Convert body torque from lb-ft to Nm
    const bodyTorqueNm = bodyTorqueLbFt * 1.35582;

    // Compare calculated torque from body values with given torque
    const bodyTorqueDifference = Math.abs(givenMaxTorqueNm - bodyTorqueNm);

    // Return the results
    return {
      // stock_Max_Torque_Nm: givenMaxTorqueNm.toFixed(2), // Given torque in Nm
      // calculated_Max_Torque_Nm_DB: torqueNm.toFixed(2), // Calculated torque from DB values in Nm
      calculated_Max_Torque_Nm_Body: bodyTorqueNm.toFixed(2), // Calculated torque from body values in Nm
      // torque_difference_DB: torqueDifference.toFixed(2), // Difference in torque from DB values
      // torque_difference_Body: bodyTorqueDifference.toFixed(2) // Difference in torque from body values
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
