const performanceMetricsService = require("../services/performance_metrics_service_copy");

exports.getMetric1 = async (req, res) => {
  const { id } = req.params;
  const {bodyData} = req.body;
// console.log("BODY DATA", power);
  try {
    const result = await performanceMetricsService.metricFunction1(id, bodyData);
    res.status(200).json({
      message: "Metric 1 fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch Metric 1",
      details: error.message,
    });
  }
};

exports.getMetric2 = async (req, res) => {
  const { id } = req.params;
  const bodyData = req.body; // Get body data from the request
  try {
    const result = await performanceMetricsService.metricFunction2(id, bodyData); // Pass bodyData to metricFunction2
    res.status(200).json({
      message: "Metric 2 fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch Metric 2",
      details: error.message,
    });
  }
};

exports.getMetric3 = async (req, res) => {
  const { id } = req.params;
  const bodyData = req.body;
  try {
    const result = await performanceMetricsService.metricFunction3(id, bodyData);
    res.status(200).json({
      message: "Metric 3 fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch Metric 3",
      details: error.message,
    });
  }
};

exports.getMetric4 = async (req, res) => {
  const { id } = req.params;
  const bodyData = req.body;
  try {
    const result = await performanceMetricsService.metricFunction4(id, bodyData);
    res.status(200).json({
      message: "Metric 4 fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch Metric 4",
      details: error.message,
    });
  }
};

exports.getMetric5 = async (req, res) => {
  const { id } = req.params;
  const bodyData = req.body;
  try {
    const result = await performanceMetricsService.metricFunction5(id, bodyData);
    res.status(200).json({
      message: "Metric 5 fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch Metric 5",
      details: error.message,
    });
  }
};

exports.getMetric6 = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await performanceMetricsService.metricFunction6(id);
    res.status(200).json({
      message: "Metric 6 fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch Metric 6",
      details: error.message,
    });
  }
};
