var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv");
var cors = require("cors");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/db");
var locRoutes = require("./routes/location");

const scraperRoutes = require("./routes/scraper_routes");
const performanceMetricsRoutes = require("./routes/performance_metrics_routes");
const carRoutes = require("./routes/car_routes");

var app = express();

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Mohid Anwar Rotes
app.use("/api", scraperRoutes);
app.use("/api", performanceMetricsRoutes);
app.use("/api", carRoutes);

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
