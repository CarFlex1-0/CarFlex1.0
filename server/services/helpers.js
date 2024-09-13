// services/helpers.js
// Convert mph to m/s
function mphToMps(mph) {
  return mph * 0.44704;
}

// Convert kg to lbs
function kgToLbs(kg) {
  return kg * 2.20462;
}

// Convert lbs to kg
function lbsToKg(lbs) {
  return lbs * 0.453592;
}

// Check for required fields for Metric 1
function checkForMissingValuesMetric1(car) {
  if (!car || !car.engine || !car.engine.power || !car.engine.kerbWeight) {
    return "Required car values are missing";
  }
  return null;
}

// Check for required fields for Metric 2
function checkForMissingValuesMetric2(car) {
  if (
    !car ||
    !car.engine ||
    !car.engine.power ||
    !car.dimensions ||
    !car.dimensions.dragCoefficient ||
    !car.dimensions.width ||
    !car.dimensions.height
  ) {
    return "Required car values for Metric 2 are missing";
  }
  return null;
}

module.exports = {
  mphToMps,
  kgToLbs,
  lbsToKg,
  checkForMissingValuesMetric1,
  checkForMissingValuesMetric2,
};
