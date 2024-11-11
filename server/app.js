var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cron = require("./services/cron");

const { connectDB } = require("./config/db");
const locRoutes = require("./routes/location");

const scraperRoutes = require("./routes/scraper_routes");
const performanceMetricsRoutes = require("./routes/performance_metrics_routes");
const carRoutes = require("./routes/car_routes");
const blogRoutes = require("./routes/blog_routes");
const feedbackRoutes = require("./routes/feedback_routes");

const questionRoutes = require("./routes/question");
const answerRoutes = require("./routes/answer");
const userRoutes = require("./routes/user.routes");
const paymentRoutes = require("./routes/payment");
const subRoutes = require("./routes/subscription");
const aiRoutes = require("./routes/ai_model");
const carConfigRoutes = require("./routes/carConfig.routes");
const app = express();

dotenv.config();

connectDB();

app.use(cors());
// Increase payload limit
app.use(bodyParser.json({ limit: "50mb" })); // Adjust size as needed
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// OR using express.json() directly
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Mohid Anwar Rotes
app.use("/api", scraperRoutes);
app.use("/api", performanceMetricsRoutes);
app.use("/api", carRoutes);
app.use("/api", blogRoutes);
app.use("/api", feedbackRoutes);
app.use("/api/car-configs", carConfigRoutes);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
// Use the middleware correctly
app.use(express.json()); // To handle JSON requests
app.use(express.urlencoded({ extended: true })); // To handle form submissions

//Routes
app.use("/api/location", locRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answer", answerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/", subRoutes);
app.use("/api/ai", aiRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
const PORT = process.env.PORT || 4000;
cron; //Setting Cron Job for expiration of current user Subscription;
app
  .listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}...`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use. Trying another port...`);
      // Increment the port and try again
      app.listen(++PORT, () => {
        console.log(`✅ Server running on port ${PORT}...`);
      });
    } else {
      console.error(err);
    }
  });

module.exports = app;
