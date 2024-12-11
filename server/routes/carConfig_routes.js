const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authenticate");
const {
  saveConfiguration,
  getConfigurations,
  getConfigurationById,
  deleteConfiguration,
  updateConfiguration,
  shareConfiguration,
  removeShare,
  rateConfiguration,
  getAllPublicConfigurations,
  getUserRating,
} = require("../controllers/car_config_controller");

router.use(authenticateToken);

// Base routes
router.route("/").post(saveConfiguration).get(getConfigurations);

// Put specific routes before parameter routes
router.post("/public", getAllPublicConfigurations);
router.post("/rate", rateConfiguration);
router.get("/rating/:configId", getUserRating);
router.post("/share", shareConfiguration);
router.delete("/share", removeShare);

// Parameter routes should come last
router.route("/:id")
  .get(getConfigurationById)
  .put(updateConfiguration)
  .delete(deleteConfiguration);

module.exports = router;
