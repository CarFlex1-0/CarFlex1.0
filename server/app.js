const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cluster = require("cluster");
const os = require("os");

const { connectDB } = require("./config/db");
const cron = require("./services/cron");
const numCPUs = os.cpus().length;

dotenv.config();
connectDB();

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Track worker load for dynamic distribution
  const workerStats = Array(numCPUs).fill(0);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();

    // Monitor message from workers (e.g., load updates)
    worker.on("message", (msg) => {
      if (msg.type === "updateLoad") {
        workerStats[msg.workerId] = msg.load;
      }
    });
  }

  // Periodically log worker loads
  // setInterval(() => {
  //   console.log("Current Worker Loads:", workerStats);
  // }, 5000);

  cluster.on("exit", (worker, code, signal) => {
    console.error(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

} else {
  // Worker process
  const app = express();

  // Middleware and routes
  app.use(cors());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(logger("dev"));

  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "jade");
  app.use(express.static(path.join(__dirname, "public")));

  // Routes
  const locRoutes = require("./routes/location");
  const scraperRoutes = require("./routes/scraper_routes");
  const performanceMetricsRoutes = require("./routes/performance_metrics_routes");
  const carRoutes = require("./routes/car_routes");
  const blogRoutes = require("./routes/blog_routes");
  const feedbackRoutes = require("./routes/feedback_routes");
  const questionRoutes = require("./routes/question");
  const answerRoutes = require("./routes/answer");
  const userRoutes = require("./routes/user");
  const paymentRoutes = require("./routes/payment");
  const subRoutes = require("./routes/subscription");
  const aiRoutes = require("./routes/ai_model");
  const carConfigRoutes = require("./routes/carConfig_routes");
  const productRoutes = require('./routes/product');
  const transactionRoutes = require('./routes/transaction');
  const orderRoutes = require('./routes/order')
  const adminRoutes = require('./routes/admin_routes');
  const sellerRoutes = require("./routes/seller")
  app.use("/api", scraperRoutes);
  app.use("/api", performanceMetricsRoutes);
  app.use("/api", carRoutes);
  app.use("/api", blogRoutes);
  app.use("/api", feedbackRoutes);
  app.use("/api/car-configs", carConfigRoutes);
  app.use("/api/location", locRoutes);
  app.use("/api/questions", questionRoutes);
  app.use("/api/answer", answerRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/payments", paymentRoutes);
  app.use("/api/transactions", transactionRoutes);
  app.use("/api/orders", orderRoutes)
  app.use("/api/seller", sellerRoutes)
  app.use("/api/", subRoutes);
  app.use("/api/ai", aiRoutes);
  app.use('/api/admin', adminRoutes);

  // Test endpoint
  app.get("/testing", (req, res) => {
    let total = 0;
    for (let i = 0; i < 5000000; i++) {
      total++;
    }
    res.json({ message: `Total: ${total}` });
    process.send({ type: "updateLoad", workerId: cluster.worker.id, load: total });
  });

  // Error handling
  app.use(function (req, res, next) {
    next(createError(404));
  });

  app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500).render("error");
  });

  const PORT = process.env.PORT || 4000 + cluster.worker.id; // Dynamic port assignment
  cron; // Initialize Cron job
  app.listen(PORT, () => {
    console.log(`✅ Worker ${cluster.worker.id} running on port ${PORT}...`);
    process.send({ type: "updateLoad", workerId: cluster.worker.id, load: 0 });
  });
}
