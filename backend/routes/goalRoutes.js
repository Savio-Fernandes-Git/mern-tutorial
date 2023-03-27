// imports
const express = require("express");
const router = express.Router();

const {
    getGoals,
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal,
} = require("../controllers/goalController");

const { protectRoute } = require("../middleware/authMiddleware");

// cleaning up redundant routes with different HTTP methods
router.route("/").get(protectRoute, getGoals).post(protectRoute, setGoal);

router
    .route("/:id")
    .get(protectRoute, getGoal)
    .put(protectRoute, updateGoal)
    .delete(protectRoute, deleteGoal);

// exports
module.exports = router;
