// utils/transformData.js

async function transformData(scrapedData) {
  try {
    const transformedData = {
      general: {},
      performance: {},
      engine: {
        power: {},
        torque: {},
        bore: {},
        displacement: {},
        stroke: {},
        numberOfCylinders: null,
        valvesPerCylinder: null,
        oilCapacity: {},
        kerbWeight: {},
      },
      dimensions: {
        length: {},
        width: {},
        height: {},
        wheelbase: {},
        frontTrack: {},
        rearTrack: {},
        dragCoefficient: {},
      },
    };

    // Process General data
    if (scrapedData.General) {
      transformedData.general = {
        brand: scrapedData.General.Brand || "",
        model: scrapedData.General.Model || "",
        generation: scrapedData.General.Generation || "",
        modification: scrapedData.General["Modification_(Engine)"] || "",
        startOfProduction:
          parseYear(scrapedData.General.Start_of_production) || null,
        powertrainArchitecture:
          scrapedData.General.Powertrain_Architecture || "",
        bodyType: scrapedData.General.Body_type || "",
        seats: parseInt(scrapedData.General.Seats, 10) || null,
        doors: parseInt(scrapedData.General.Doors, 10) || null,
      };
    }

    // Process Performance data
    if (scrapedData.Performance) {
      transformedData.performance = {
        acceleration:
          parseAcceleration(
            scrapedData.Performance[
              "Acceleration_0_-_60_mph_(Calculated_by_Auto-Data.net)"
            ]
          ) || {},
        maxSpeed: parseMaxSpeed(scrapedData.Performance.Maximum_speed) || {},
        weightToPowerRatio:
          scrapedData.Performance["Weight-to-power_ratio"] || "",
        weightToTorqueRatio:
          scrapedData.Performance["Weight-to-torque_ratio"] || "",
      };
    }

    // Process Engine data
    if (scrapedData.Engine) {
      transformedData.engine = {
        power: parsePower(scrapedData.Engine.Power) || {},
        torque: parseTorque(scrapedData.Engine.Torque) || {},
        numberOfCylinders:
          parseInt(scrapedData.Engine.Number_of_cylinders, 10) || null,
        valvesPerCylinder:
          parseInt(scrapedData.Engine.Number_of_valves_per_cylinder, 10) ||
          null,
        oilCapacity:
          parseDimension(scrapedData.Engine.Engine_oil_capacity) || {},
        kerbWeight: parseKerbWeight(scrapedData.Engine.Kerb_Weight) || {},
        bore: parseBore(scrapedData.Engine.Cylinder_Bore) || {},
        displacement:
          parseDisplacement(scrapedData.Engine.Engine_displacement) || {},
        stroke: parseStroke(scrapedData.Engine.Piston_Stroke) || {},
      };
    }

    // Process Dimensions data
    if (scrapedData.Dimensions) {
      transformedData.dimensions = {
        length: parseDimension(scrapedData.Dimensions.Length) || {},
        width: parseDimension(scrapedData.Dimensions.Width) || {},
        height: parseDimension(scrapedData.Dimensions.Height) || {},
        wheelbase: parseDimension(scrapedData.Dimensions.Wheelbase) || {},
        frontTrack: parseDimension(scrapedData.Dimensions.Front_track) || {},
        rearTrack:
          parseDimension(scrapedData.Dimensions["Rear_(Back)_track"]) || {},
        dragCoefficient:
          parseDragCoefficient(
            scrapedData.Dimensions["Drag_coefficient_(Cd)"]
          ) || {},
      };
    }

    return transformedData;
  } catch (error) {
    console.error("Error transforming data:", error);
    throw error;
  }
}

// Parsing Functions
function parseYear(value) {
  const match = value?.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : null;
}

function parseDimension(value) {
  const match = value?.match(/(\d+\.?\d*)\s*(\w+)/);
  if (match) {
    return {
      value: parseFloat(match[1]),
      unit: match[2],
    };
  }
  return { value: null, unit: "" };
}

function parsePower(value) {
  const match = value?.match(/(\d+\.?\d*)\s*(\w+)\s*@\s*(\d+)-(\d+)\s*rpm/);
  if (match) {
    return {
      value: parseFloat(match[1]),
      unit: match[2],
      rpm: (parseInt(match[3]) + parseInt(match[4])) / 2, // Average RPM
    };
  }

  const singleMatch = value?.match(/(\d+\.?\d*)\s*(\w+)\s*@\s*(\d+)\s*rpm/);
  if (singleMatch) {
    return {
      value: parseFloat(singleMatch[1]),
      unit: singleMatch[2],
      rpm: parseInt(singleMatch[3]),
    };
  }

  return { value: null, unit: "", rpm: null }; // Default if no match found
}

function parseTorque(value) {
  const match = value?.match(/(\d+\.?\d*)\s*(\w+)\s*@?\s*(\d+(-\d+)?\s*rpm)?/);
  if (match) {
    return {
      value: parseFloat(match[1]),
      unit: match[2],
      rpm: match[3] ? parseInt(match[3].replace(/\s*rpm/, "")) : null,
    };
  }
  return { value: null, unit: "", rpm: null };
}

function parseKerbWeight(value) {
  const rangeMatch = value?.match(/(\d+)\s*-\s*(\d+)\s*(\w+)/);
  if (rangeMatch) {
    return {
      value: (parseFloat(rangeMatch[1]) + parseFloat(rangeMatch[2])) / 2,
      unit: rangeMatch[3],
    };
  }

  const singleMatch = value?.match(/(\d+)\s*(\w+)/);
  if (singleMatch) {
    return {
      value: parseFloat(singleMatch[1]),
      unit: singleMatch[2],
    };
  }

  return { value: null, unit: "" };
}

function parseAcceleration(value) {
  const match = value?.match(/(\d+\.?\d*)\s*sec/);
  if (match) {
    return {
      value: parseFloat(match[1]),
      unit: "sec",
    };
  }
  return { value: null, unit: "" };
}

function parseDragCoefficient(value) {
  const match = value?.match(/(\d+\.?\d*)/);
  if (match) {
    return {
      value: parseFloat(match[1]),
      unit: "none",
    };
  }
  return { value: null, unit: "" };
}

function parseMaxSpeed(value) {
  const match = value?.match(/(\d+\.?\d*)\s*(\w+)/);
  if (match) {
    return {
      value: parseFloat(match[1]), // km/h value
      unit: match[2], // km/h unit
    };
  }
  return { value: null, unit: "" };
}

function parseBore(value) {
  const match = value?.match(/(\d+\.?\d*)\s*mm/);
  if (match) {
    return {
      value: parseFloat(match[1]),
      unit: "mm",
    };
  }
  return { value: null, unit: "" };
}

function parseDisplacement(value) {
  const match = value?.match(/(\d+)\s*cm3/);
  if (match) {
    return {
      value: parseFloat(match[1]),
      unit: "cm3",
    };
  }
  return { value: null, unit: "" };
}

function parseStroke(value) {
  const match = value?.match(/(\d+\.?\d*)\s*mm/);
  if (match) {
    return {
      value: parseFloat(match[1]),
      unit: "mm",
    };
  }
  return { value: null, unit: "" };
}

module.exports = {
  transformData,
};
