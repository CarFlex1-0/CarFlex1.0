// services/performanceMetricsServices
const Car = require("../models/car");
const { mphToMps } = require("./helpers");

async function metricFunction1(bodyData) {
  try {
    const {
      p: powerBody,
      kW: kerbWeightBody,
      dC: dragCoefficientBody,
    } = bodyData;

    const powerWattsBody = powerBody * 745.7;
    const kerbWeightBodyWithDriver = kerbWeightBody + 70;
    const velocityMps = mphToMps(60);
    const accelerationTimeBody = Math.sqrt(
      (2 * kerbWeightBodyWithDriver * Math.pow(velocityMps, 2)) /
      (powerWattsBody * (1 - dragCoefficientBody))
    );

    return {
      acceleration: accelerationTimeBody.toFixed(2),
    };
  } catch (error) {
    console.error("Error in metricFunction1:", error);
    throw error;
  }
}

async function metricFunction2(bodyData) {
  try {
    const {
      p: bodyPower,
      dC: bodyDragCoefficient,
      w: bodyWidth,
      h: bodyHeight,
    } = bodyData;

    const bodyPowerWatts = bodyPower * 746;
    const bodyArea = (bodyWidth / 1000) * (bodyHeight / 1000);
    const airDensity = 1.25;
    const bodyMaxSpeedMps = Math.cbrt(
      (2 * bodyPowerWatts) / (bodyDragCoefficient * airDensity * bodyArea)
    );
    const bodyMaxSpeedKph = bodyMaxSpeedMps * 3.6;

    return {
      max_speed: bodyMaxSpeedKph.toFixed(2),
    };
  } catch (error) {
    console.error("Error in metric Function2:", error);
    throw error;
  }
}

async function metricFunction3(bodyData) {
  try {
    const { t: bodyTorqueNm, r: bodyRpm } = bodyData;

    const bodyTorqueLbFt = bodyTorqueNm * 0.73756;
    const calculatedHorsepowerBody = (bodyTorqueLbFt * bodyRpm) / 5252;

    return {
      hp: calculatedHorsepowerBody.toFixed(2),
    };
  } catch (error) {
    console.error("Error in metricFunction3:", error);
    throw error;
  }
}

async function metricFunction4(bodyData) {
  try {
    const {
      nOC: bodyNumberOfCylinders,
      bD: bodyBoreDiameter,
      pS: bodyPistonStroke,
    } = bodyData;

    if (
      bodyNumberOfCylinders === undefined ||
      bodyBoreDiameter === undefined ||
      bodyPistonStroke === undefined
    ) {
      throw new Error("Missing required body parameters for calculations.");
    }

    const bodyBoreInCm = bodyBoreDiameter / 10;
    const bodyStrokeInCm = bodyPistonStroke / 10;

    const calculatedBodyDisplacementCc = (
      Math.pow(bodyBoreInCm / 2, 2) *
      Math.PI *
      bodyStrokeInCm *
      bodyNumberOfCylinders
    ).toFixed(2);

    return {
      cc: calculatedBodyDisplacementCc,
    };
  } catch (error) {
    console.error("Error in metricFunction4:", error);
    throw error;
  }
}

async function metricFunction5(bodyData) {
  try {
    const { p: bodyPower, brpm: rpm } = bodyData;

    if (bodyPower === undefined || rpm === undefined) {
      throw new Error(
        "Missing required body parameters for torque calculation."
      );
    }

    const bodyTorqueLbFt = (bodyPower * 5252) / rpm;
    const bodyTorqueNm = bodyTorqueLbFt * 1.35582;

    return {
      torque: bodyTorqueNm.toFixed(2),
    };
  } catch (error) {
    console.error("Error in metricFunction5:", error);
    throw error;
  }
}

async function metricFunction6() {
  try {
    return {
      metric: "Metric 6 value",
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